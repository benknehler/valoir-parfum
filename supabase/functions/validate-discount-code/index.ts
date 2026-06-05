import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';
import { getAdminClient, sanitizeError } from '../_shared/supabaseAdmin.ts';

function calculateDiscount(type: string, value: number, subtotal: number) {
  if (type === 'percent') return Math.round((subtotal * value) / 100 * 100) / 100;
  return Math.min(value, subtotal);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();
  if (req.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const code = String(body.code || '').trim().toUpperCase();
    const subtotal = Number(body.subtotal || 0);

    if (!code) return jsonResponse({ ok: false, error: 'Bitte gib einen Rabattcode ein.' }, 400);
    if (!subtotal || subtotal <= 0) return jsonResponse({ ok: false, error: 'Der Warenkorb ist leer.' }, 400);

    const supabase = getAdminClient();
    const { data: discount, error } = await supabase
      .from('discount_codes')
      .select('id,code,type,value,minimum_order_value,max_uses,used_count,active,starts_at,expires_at')
      .eq('code', code)
      .maybeSingle();

    if (error) throw error;
    if (!discount) return jsonResponse({ ok: false, error: 'Der Rabattcode ist nicht gültig.' }, 404);
    if (!discount.active) return jsonResponse({ ok: false, error: 'Der Rabattcode ist nicht aktiv.' }, 400);

    const now = Date.now();
    if (discount.starts_at && new Date(discount.starts_at).getTime() > now) {
      return jsonResponse({ ok: false, error: 'Der Rabattcode ist noch nicht gültig.' }, 400);
    }
    if (discount.expires_at && new Date(discount.expires_at).getTime() <= now) {
      return jsonResponse({ ok: false, error: 'Der Rabattcode ist abgelaufen.' }, 400);
    }
    if (discount.max_uses !== null && discount.used_count >= discount.max_uses) {
      return jsonResponse({ ok: false, error: 'Der Rabattcode wurde bereits vollständig eingelöst.' }, 400);
    }
    if (discount.minimum_order_value !== null && subtotal < Number(discount.minimum_order_value)) {
      return jsonResponse({
        ok: false,
        error: `Der Mindestbestellwert beträgt ${Number(discount.minimum_order_value).toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })}.`,
      }, 400);
    }

    const discountTotal = calculateDiscount(discount.type, Number(discount.value), subtotal);
    return jsonResponse({
      ok: true,
      code: discount.code,
      type: discount.type,
      value: Number(discount.value),
      discountTotal,
      total: Math.max(subtotal - discountTotal, 0),
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
