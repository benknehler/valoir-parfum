'use client';

import { getSupabaseBrowserClient } from '../supabase/client';

async function getAdminContext() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false as const, message: 'Supabase-Konfiguration fehlt.' };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    return { ok: false as const, message: 'Bitte melde dich erneut im Admin-Bereich an.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', sessionData.session.user.id)
    .maybeSingle();

  if (profile?.role !== 'admin') {
    return { ok: false as const, message: 'Für diese Aktion ist die Admin-Rolle erforderlich.' };
  }

  return { ok: true as const, supabase, userId: sessionData.session.user.id };
}

async function writeAudit(
  supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>,
  userId: string,
  action: string,
  entityType: string,
  entityId?: string,
  details: Record<string, unknown> = {}
) {
  await supabase.from('audit_logs').insert({
    admin_user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId || null,
    details,
  });
}

export async function invokeAdminFunction<TBody extends Record<string, unknown>>(name: string, body: TBody) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const { data, error } = await context.supabase.functions.invoke(name, { body });
  if (error) return { ok: false, message: error.message };
  if (data?.ok === false) return { ok: false, message: data.error || 'Die Aktion konnte nicht ausgeführt werden.', data };

  return { ok: true, message: data?.message || 'Aktion wurde ausgeführt.', data };
}

export async function updateOrderStatus(orderId: string, changes: Record<string, string>) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const { error } = await context.supabase.from('orders').update(changes).eq('id', orderId);
  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin ändert Bestellung', 'order', orderId, changes);
  return { ok: true, message: 'Bestellung wurde aktualisiert.' };
}

export async function updateVariant(
  variantId: string,
  input: { price: number; stock: number; lowStockThreshold: number; weight: number; active: boolean }
) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const { error } = await context.supabase
    .from('product_variants')
    .update({
      price: input.price,
      stock: input.stock,
      low_stock_threshold: input.lowStockThreshold,
      weight: input.weight,
      active: input.active,
    })
    .eq('id', variantId);

  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin ändert Produktvariante', 'product_variant', variantId, input);
  return { ok: true, message: 'Produktvariante wurde gespeichert.' };
}

export async function bookInventoryMovement(input: { variantId: string; type: string; quantity: number; reason: string }) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const positiveTypes = new Set(['receipt', 'return', 'cancel']);
  const delta = positiveTypes.has(input.type) ? Math.abs(input.quantity) : -Math.abs(input.quantity);
  const { error } = await context.supabase.rpc('apply_inventory_delta', {
    variant_id: input.variantId,
    delta,
    movement_type: input.type,
    movement_reason: input.reason,
    actor: context.userId,
  });

  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin ändert Lagerbestand', 'product_variant', input.variantId, {
    type: input.type,
    quantity: delta,
    reason: input.reason,
  });
  return { ok: true, message: 'Lagerbewegung wurde gespeichert.' };
}

export async function saveDiscountCode(input: {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minimumOrderValue: number | null;
  maxUses: number | null;
  usageLimitPerCustomer: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  active: boolean;
}) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const code = input.code.trim().toUpperCase();
  if (!code) return { ok: false, message: 'Bitte gib einen Code ein.' };

  const { data, error } = await context.supabase
    .from('discount_codes')
    .upsert(
      {
        code,
        type: input.type,
        value: input.value,
        minimum_order_value: input.minimumOrderValue,
        max_uses: input.maxUses,
        usage_limit_per_customer: input.usageLimitPerCustomer,
        starts_at: input.startsAt || null,
        expires_at: input.expiresAt || null,
        active: input.active,
      },
      { onConflict: 'code' }
    )
    .select('id')
    .single();

  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin speichert Gutschein', 'discount_code', data.id, { code });
  return { ok: true, message: 'Gutschein wurde gespeichert.' };
}

export async function setDiscountActive(id: string, active: boolean) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const { error } = await context.supabase.from('discount_codes').update({ active }).eq('id', id);
  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin ändert Gutscheinstatus', 'discount_code', id, { active });
  return { ok: true, message: active ? 'Gutschein wurde aktiviert.' : 'Gutschein wurde deaktiviert.' };
}

export async function saveShopSettings(input: Record<string, string | number | null>) {
  const context = await getAdminContext();
  if (!context.ok) return context;

  const { error } = await context.supabase
    .from('shop_settings')
    .upsert({ id: true, ...input, updated_at: new Date().toISOString() }, { onConflict: 'id' });

  if (error) return { ok: false, message: error.message };

  await writeAudit(context.supabase, context.userId, 'Admin ändert Einstellungen', 'shop_settings', undefined, input);
  return { ok: true, message: 'Einstellungen wurden gespeichert.' };
}
