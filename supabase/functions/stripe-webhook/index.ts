import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { jsonResponse } from '../_shared/cors.ts';
import { getAdminClient, logIntegration, sanitizeError } from '../_shared/supabaseAdmin.ts';

type CartLine = {
  p: string;
  pu: string;
  v: string;
  s: string;
  sku: string;
  q: number;
  u: number;
};

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSha256(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toHex(new Uint8Array(signature));
}

async function verifyStripeSignature(rawBody: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader) throw new Error('Stripe signature header missing.');
  const parts = Object.fromEntries(signatureHeader.split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  if (!parts.t || !parts.v1) throw new Error('Stripe signature header invalid.');

  const expected = await hmacSha256(secret, `${parts.t}.${rawBody}`);
  if (expected !== parts.v1) throw new Error('Stripe signature verification failed.');
}

function splitName(name?: string | null) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: 'Valoir', lastName: 'Kunde' };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts.at(-1) || parts[0] };
}

function orderNumber(sessionId: string) {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `VAL-${date}-${sessionId.slice(-6).toUpperCase()}`;
}

async function upsertAddress(supabase: ReturnType<typeof getAdminClient>, customerId: string, type: 'shipping' | 'billing', details: any) {
  const address = details?.address;
  if (!address) return;
  const { firstName, lastName } = splitName(details?.name);

  await supabase.from('addresses').insert({
    customer_id: customerId,
    type,
    first_name: firstName,
    last_name: lastName,
    street: address.line1 || '',
    house_number: address.line2 || '',
    postal_code: address.postal_code || '',
    city: address.city || '',
    country: address.country || 'DE',
  });
}

async function handleCheckoutCompleted(session: any) {
  const supabase = getAdminClient();
  const sessionId = String(session.id);

  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id,order_id')
    .eq('provider', 'stripe')
    .eq('provider_payment_id', sessionId)
    .maybeSingle();

  if (existingPayment) return { ok: true, existing: true, order_id: existingPayment.order_id };

  const email = String(session.customer_details?.email || session.customer_email || '').trim().toLowerCase();
  if (!email) throw new Error('Stripe session has no customer email.');

  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .upsert(
      {
        email,
        phone: session.customer_details?.phone || null,
      },
      { onConflict: 'email' }
    )
    .select()
    .single();

  if (customerError) throw customerError;

  const subtotal = Number(session.amount_subtotal || 0) / 100;
  const shippingCost = Number(session.total_details?.amount_shipping || session.metadata?.shipping_cents || 0) / 100;
  const discountTotal = Number(session.total_details?.amount_discount || session.metadata?.discount_cents || 0) / 100;
  const total = Number(session.amount_total || 0) / 100;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber(sessionId),
      customer_id: customer.id,
      status: 'Neu',
      payment_status: 'Offen',
      shipping_status: 'Nicht erstellt',
      invoice_status: 'Nicht erstellt',
      subtotal,
      shipping_cost: shippingCost,
      discount_total: discountTotal,
      total,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  await Promise.all([
    upsertAddress(supabase, customer.id, 'shipping', session.shipping_details),
    upsertAddress(supabase, customer.id, 'billing', session.customer_details),
  ]);

  const cart = JSON.parse(session.metadata?.cart_json || '[]') as CartLine[];
  if (!cart.length) throw new Error('Stripe session metadata has no cart.');

  await supabase.from('order_items').insert(
    cart.map((line) => ({
      order_id: order.id,
      product_id: line.pu,
      variant_id: line.v,
      quantity: Number(line.q),
      unit_price: Number(line.u) / 100,
      total_price: (Number(line.u) * Number(line.q)) / 100,
    }))
  );

  await supabase.from('payments').insert({
    order_id: order.id,
    provider: 'stripe',
    provider_payment_id: sessionId,
    status: session.payment_status || 'paid',
    amount: total,
  });

  if (session.metadata?.discount_code_id && discountTotal > 0) {
    const { data: discount } = await supabase
      .from('discount_codes')
      .select('id,used_count')
      .eq('id', session.metadata.discount_code_id)
      .maybeSingle();

    if (discount) {
      await supabase.from('discount_codes').update({ used_count: Number(discount.used_count || 0) + 1 }).eq('id', discount.id);
      await supabase.from('discount_code_redemptions').insert({
        discount_code_id: discount.id,
        order_id: order.id,
        customer_id: customer.id,
        email,
        amount: discountTotal,
      });
    }
  }

  await supabase.from('orders').update({ payment_status: 'Bezahlt', status: 'Bezahlt' }).eq('id', order.id);
  await logIntegration(supabase, { provider: 'stripe', action: 'checkout_session_completed', status: 'success', related_order_id: order.id, request_id: sessionId });

  return { ok: true, order_id: order.id };
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405);

  try {
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) return jsonResponse({ ok: false, error: 'Stripe Webhook Secret fehlt.' }, 500);

    const rawBody = await req.text();
    await verifyStripeSignature(rawBody, req.headers.get('Stripe-Signature'), webhookSecret);

    const event = JSON.parse(rawBody);
    if (event.type === 'checkout.session.completed') {
      const result = await handleCheckoutCompleted(event.data.object);
      return jsonResponse(result);
    }

    return jsonResponse({ ok: true, ignored: event.type });
  } catch (error) {
    const supabase = getAdminClient();
    await logIntegration(supabase, { provider: 'stripe', action: 'webhook', status: 'error', error_message: String(sanitizeError(error)) });
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
