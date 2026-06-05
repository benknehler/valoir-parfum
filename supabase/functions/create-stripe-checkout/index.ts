import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';
import { getAdminClient, logIntegration, sanitizeError } from '../_shared/supabaseAdmin.ts';

type CartInput = {
  id?: string;
  size?: string;
  quantity?: number;
};

type ResolvedLine = {
  productId: string;
  productSlug: string;
  variantId: string;
  size: string;
  name: string;
  description: string;
  sku: string;
  quantity: number;
  unitAmount: number;
  image: string;
};

const stripeApiVersion = '2026-02-25.clover';
const defaultBaseUrl = 'https://benknehler.github.io/valoir-parfum';
const allowedHosts = new Set(['benknehler.github.io', 'localhost', '127.0.0.1']);

function getOrigin(req: Request, requestedOrigin?: string) {
  const fallback = Deno.env.get('APP_BASE_URL') || defaultBaseUrl;
  const candidate = requestedOrigin || req.headers.get('origin') || fallback;

  try {
    const url = new URL(candidate);
    if (!allowedHosts.has(url.hostname)) return fallback;
    const path = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
    return `${url.protocol}//${url.host}${path}`;
  } catch {
    return fallback;
  }
}

function imageForProduct(origin: string, slug: string) {
  const file = slug === 'luna-solea' ? 'luna-solea-studio.jpg' : 'noir-cerice-studio.jpg';
  return `${origin}/images/${file}`;
}

async function stripePost(secretKey: string, path: string, params: URLSearchParams) {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': stripeApiVersion,
    },
    body: params,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error?.message || `Stripe request failed with status ${response.status}`);
  }

  return payload;
}

async function stripeGet(secretKey: string, path: string) {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Stripe-Version': stripeApiVersion,
    },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error?.message || `Stripe request failed with status ${response.status}`);
  }
  return payload;
}

async function resolveLine(supabase: ReturnType<typeof getAdminClient>, item: CartInput, origin: string): Promise<ResolvedLine> {
  const slug = String(item.id || '').trim();
  const size = String(item.size || '').trim();
  const quantity = Math.max(1, Math.min(Number(item.quantity || 1), 10));

  const { data: product, error } = await supabase
    .from('products')
    .select('id,slug,name,description,status,product_variants(id,size,sku,price,stock,active)')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!product || product.status !== 'active') throw new Error(`Produkt ist nicht aktiv: ${slug}`);

  const variant = (product.product_variants || []).find((entry: any) => entry.size === size);
  if (!variant || !variant.active) throw new Error(`Variante ist nicht aktiv: ${product.name} ${size}`);
  if (Number(variant.price || 0) <= 0) throw new Error(`Für ${product.name} ${size} ist kein gültiger Preis hinterlegt.`);
  if (Number(variant.stock || 0) < quantity) throw new Error(`Für ${product.name} ${size} ist nicht genug Bestand verfügbar.`);

  return {
    productId: product.id,
    productSlug: product.slug,
    variantId: variant.id,
    size: variant.size,
    name: product.name,
    description: product.description || 'Valoir Parfum',
    sku: variant.sku,
    quantity,
    unitAmount: Math.round(Number(variant.price) * 100),
    image: imageForProduct(origin, product.slug),
  };
}

function appendLineItem(params: URLSearchParams, index: number, line: ResolvedLine) {
  params.set(`line_items[${index}][quantity]`, String(line.quantity));
  params.set(`line_items[${index}][price_data][currency]`, 'eur');
  params.set(`line_items[${index}][price_data][unit_amount]`, String(line.unitAmount));
  params.set(`line_items[${index}][price_data][product_data][name]`, `${line.name} · ${line.size}`);
  params.set(`line_items[${index}][price_data][product_data][description]`, line.description);
  params.set(`line_items[${index}][price_data][product_data][images][0]`, line.image);
  params.set(`line_items[${index}][price_data][product_data][metadata][product_id]`, line.productId);
  params.set(`line_items[${index}][price_data][product_data][metadata][variant_id]`, line.variantId);
  params.set(`line_items[${index}][price_data][product_data][metadata][sku]`, line.sku);
}

function calculateDiscount(type: string, value: number, subtotalCents: number) {
  if (type === 'percent') return Math.round((subtotalCents * value) / 100);
  return Math.min(Math.round(value * 100), subtotalCents);
}

async function validateDiscount(supabase: ReturnType<typeof getAdminClient>, code: string, subtotalCents: number) {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) return null;

  const { data: discount, error } = await supabase
    .from('discount_codes')
    .select('id,code,type,value,minimum_order_value,max_uses,used_count,active,starts_at,expires_at')
    .eq('code', cleanCode)
    .maybeSingle();

  if (error) throw error;
  if (!discount || !discount.active) throw new Error('Der Rabattcode ist nicht gültig.');

  const now = Date.now();
  if (discount.starts_at && new Date(discount.starts_at).getTime() > now) throw new Error('Der Rabattcode ist noch nicht gültig.');
  if (discount.expires_at && new Date(discount.expires_at).getTime() <= now) throw new Error('Der Rabattcode ist abgelaufen.');
  if (discount.max_uses !== null && discount.used_count >= discount.max_uses) throw new Error('Der Rabattcode wurde bereits vollständig eingelöst.');
  if (discount.minimum_order_value !== null && subtotalCents < Math.round(Number(discount.minimum_order_value) * 100)) {
    throw new Error('Der Mindestbestellwert für diesen Rabattcode ist noch nicht erreicht.');
  }

  return {
    id: discount.id,
    code: discount.code,
    type: discount.type,
    value: Number(discount.value),
    amount: calculateDiscount(discount.type, Number(discount.value), subtotalCents),
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();
  if (req.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405);

  try {
    const secretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secretKey) {
      return jsonResponse({ ok: false, error: 'Stripe ist serverseitig nicht konfiguriert.' }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const supabase = getAdminClient();

    if (body.action === 'test_connection') {
      await stripeGet(secretKey, '/balance');
      await logIntegration(supabase, { provider: 'stripe', action: 'test_connection', status: 'success' });
      return jsonResponse({ ok: true, message: 'Stripe-Verbindung erfolgreich.' });
    }

    const items = Array.isArray(body.items) ? (body.items as CartInput[]) : [];
    if (!items.length) return jsonResponse({ ok: false, error: 'Der Warenkorb ist leer.' }, 400);

    const origin = getOrigin(req, body.origin);
    const lines = await Promise.all(items.map((item) => resolveLine(supabase, item, origin)));
    const subtotalCents = lines.reduce((sum, line) => sum + line.unitAmount * line.quantity, 0);
    const shippingAmount = subtotalCents >= 10000 ? 0 : 490;
    const discount = await validateDiscount(supabase, String(body.discountCode || ''), subtotalCents);

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', `${origin}/warenkorb/?stripe=success&session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/warenkorb/?stripe=cancelled`);
    params.set('locale', 'de');
    params.set('billing_address_collection', 'required');
    params.set('shipping_address_collection[allowed_countries][0]', 'DE');
    params.set('shipping_address_collection[allowed_countries][1]', 'AT');
    params.set('shipping_address_collection[allowed_countries][2]', 'CH');
    params.set('phone_number_collection[enabled]', 'true');
    params.set('metadata[brand]', 'Valoir Parfum');
    params.set('metadata[cart_json]', JSON.stringify(lines.map((line) => ({
      p: line.productSlug,
      pu: line.productId,
      v: line.variantId,
      s: line.size,
      sku: line.sku,
      q: line.quantity,
      u: line.unitAmount,
    }))));
    params.set('metadata[subtotal_cents]', String(subtotalCents));
    params.set('metadata[shipping_cents]', String(shippingAmount));
    if (discount) {
      params.set('metadata[discount_code_id]', discount.id);
      params.set('metadata[discount_code]', discount.code);
      params.set('metadata[discount_cents]', String(discount.amount));
    } else {
      params.set('allow_promotion_codes', 'true');
    }

    lines.forEach((line, index) => appendLineItem(params, index, line));

    params.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(shippingAmount));
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur');
    params.set('shipping_options[0][shipping_rate_data][display_name]', shippingAmount === 0 ? 'Kostenloser Versand' : 'Standardversand');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]', 'business_day');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]', '2');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]', 'business_day');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]', '4');

    if (discount?.amount) {
      const couponParams = new URLSearchParams();
      couponParams.set('name', `Valoir ${discount.code}`);
      couponParams.set('duration', 'once');
      if (discount.type === 'percent') {
        couponParams.set('percent_off', String(discount.value));
      } else {
        couponParams.set('amount_off', String(discount.amount));
        couponParams.set('currency', 'eur');
      }
      const coupon = await stripePost(secretKey, '/coupons', couponParams);
      params.set('discounts[0][coupon]', coupon.id);
    }

    const session = await stripePost(secretKey, '/checkout/sessions', params);
    return jsonResponse({ ok: true, id: session.id, url: session.url });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Stripe Checkout konnte nicht gestartet werden.' }, 500);
  }
});
