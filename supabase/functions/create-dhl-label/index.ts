import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { auditLog, logIntegration, requireAdmin, sanitizeError } from '../_shared/supabaseAdmin.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';

type OrderItem = {
  quantity: number;
  product_variants?: { weight?: number; sku?: string } | null;
};

function dhlAuthHeader() {
  const user = Deno.env.get('DHL_USER') || '';
  const password = Deno.env.get('DHL_PASSWORD') || '';
  return `Basic ${btoa(`${user}:${password}`)}`;
}

async function dhlFetch(path: string, init: RequestInit = {}) {
  const baseUrl = Deno.env.get('DHL_API_BASE_URL');
  const apiKey = Deno.env.get('DHL_API_KEY');
  if (!baseUrl || !apiKey) throw new Error('DHL_API_BASE_URL or DHL_API_KEY is missing.');

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
    ...init,
    headers: {
      Authorization: dhlAuthHeader(),
      'DHL-API-Key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DHL request failed with ${response.status}: ${text.slice(0, 500)}`);
  }

  return response.json();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();

  try {
    const { supabase, user } = await requireAdmin(req);
    const body = await req.json().catch(() => ({}));

    if (body.action === 'test_connection') {
      await dhlFetch('/parcel/de/shipping/v2/products');
      await logIntegration(supabase, { provider: 'dhl', action: 'test_connection', status: 'success' });
      return jsonResponse({ ok: true, message: 'DHL-Verbindung erfolgreich.' });
    }

    const orderId = body.order_id;
    if (!orderId) return jsonResponse({ ok: false, error: 'order_id is required.' }, 400);

    const { data: existingShipment } = await supabase
      .from('shipments')
      .select('*')
      .eq('order_id', orderId)
      .eq('provider', 'dhl')
      .maybeSingle();

    if (existingShipment?.tracking_number && existingShipment.status !== 'error') {
      return jsonResponse({ ok: true, existing: true, shipment: existingShipment });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, customers(*), order_items(quantity, product_variants(weight,sku))')
      .eq('id', orderId)
      .single();

    if (orderError || !order) throw new Error(orderError?.message || 'Order not found.');

    const { data: address, error: addressError } = await supabase
      .from('addresses')
      .select('*')
      .eq('customer_id', order.customer_id)
      .eq('type', 'shipping')
      .maybeSingle();

    if (addressError || !address) throw new Error(addressError?.message || 'Shipping address missing.');

    const { data: settings } = await supabase.from('shop_settings').select('*').eq('id', true).maybeSingle();

    const items = (order.order_items || []) as OrderItem[];
    const weightKg = Math.max(
      0.1,
      items.reduce((sum, item) => sum + Number(item.product_variants?.weight || 0.45) * item.quantity, 0)
    );

    const payload = {
      profile: 'STANDARD_GRUPPENPROFIL',
      shipments: [
        {
          product: 'V01PAK',
          billingNumber: Deno.env.get('DHL_BILLING_NUMBER'),
          refNo: order.order_number,
          shipper: {
            name1: settings?.shipper_name || 'Valoir Parfum',
            addressStreet: Deno.env.get('DHL_SHIPPER_STREET') || settings?.shipper_street || '',
            addressHouse: Deno.env.get('DHL_SHIPPER_HOUSE_NUMBER') || settings?.shipper_house_number || '',
            postalCode: Deno.env.get('DHL_SHIPPER_POSTAL_CODE') || settings?.shipper_postal_code || '',
            city: Deno.env.get('DHL_SHIPPER_CITY') || settings?.shipper_city || '',
            country: settings?.shipper_country === 'DE' ? 'DEU' : settings?.shipper_country || 'DEU',
          },
          consignee: {
            name1: `${address.first_name} ${address.last_name}`.trim(),
            addressStreet: address.street,
            addressHouse: address.house_number,
            postalCode: address.postal_code,
            city: address.city,
            country: address.country === 'DE' ? 'DEU' : address.country,
            email: order.customers?.email,
          },
          details: {
            dim: { uom: 'mm', height: 120, length: 220, width: 160 },
            weight: { uom: 'kg', value: Number(weightKg.toFixed(3)) },
          },
        },
      ],
    };

    const created = await dhlFetch('/parcel/de/shipping/v2/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const item = created?.items?.[0] ?? created?.shipments?.[0] ?? created;
    const trackingNumber = item?.shipmentNo ?? item?.trackingNumber ?? item?.shipmentNumber;
    const trackingUrl = trackingNumber ? `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${trackingNumber}` : null;
    const labelBase64 = item?.label?.b64 ?? item?.labelData ?? item?.label?.labelData;
    let labelPath: string | null = null;

    if (labelBase64) {
      const labelBytes = Uint8Array.from(atob(labelBase64), (char) => char.charCodeAt(0));
      labelPath = `${order.order_number}.pdf`;
      await supabase.storage.from('shipping-labels').upload(labelPath, labelBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });
    }

    const { data: savedShipment } = await supabase
      .from('shipments')
      .upsert(
        {
          order_id: orderId,
          provider: 'dhl',
          tracking_number: trackingNumber,
          tracking_url: trackingUrl,
          label_url: labelPath,
          status: 'Erstellt',
          error_message: null,
        },
        { onConflict: 'order_id,provider' }
      )
      .select()
      .single();

    await supabase.from('orders').update({ shipping_status: 'Versandbereit', status: 'Versandbereit' }).eq('id', orderId);
    await logIntegration(supabase, { provider: 'dhl', action: 'create_label', status: 'success', related_order_id: orderId });
    await auditLog(supabase, {
      admin_user_id: user.id,
      action: 'Admin erstellt DHL-Label',
      entity_type: 'order',
      entity_id: orderId,
      details: { tracking_number: trackingNumber, weight_kg: weightKg },
    });

    return jsonResponse({ ok: true, shipment: savedShipment });
  } catch (error) {
    if (error instanceof Response) return error;
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
