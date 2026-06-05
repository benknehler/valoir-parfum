import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { auditLog, logIntegration, requireAdmin, sanitizeError } from '../_shared/supabaseAdmin.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';

type OrderItem = {
  quantity: number;
  unit_price: number;
  total_price: number;
  products?: { name?: string } | null;
  product_variants?: { sku?: string; size?: string; tax_rate?: number } | null;
};

async function sevdeskFetch(path: string, init: RequestInit = {}) {
  const baseUrl = Deno.env.get('SEVDESK_API_BASE_URL') || 'https://my.sevdesk.de/api/v1';
  const apiKey = Deno.env.get('SEVDESK_API_KEY');
  if (!apiKey) throw new Error('SEVDESK_API_KEY is missing.');

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
    ...init,
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`sevDesk request failed with ${response.status}: ${text.slice(0, 500)}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return response.arrayBuffer();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();

  try {
    const { supabase, user } = await requireAdmin(req);
    const body = await req.json().catch(() => ({}));

    if (body.action === 'test_connection') {
      await sevdeskFetch('/Contact?limit=1');
      await logIntegration(supabase, { provider: 'sevdesk', action: 'test_connection', status: 'success' });
      return jsonResponse({ ok: true, message: 'sevDesk-Verbindung erfolgreich.' });
    }

    const orderId = body.order_id;
    if (!orderId) return jsonResponse({ ok: false, error: 'order_id is required.' }, 400);

    const { data: existingInvoice } = await supabase
      .from('invoices')
      .select('*')
      .eq('order_id', orderId)
      .eq('provider', 'sevdesk')
      .maybeSingle();

    if (existingInvoice?.provider_invoice_id && existingInvoice.status !== 'error') {
      return jsonResponse({ ok: true, existing: true, invoice: existingInvoice });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, customers(*), order_items(*, products(name), product_variants(sku,size,tax_rate))')
      .eq('id', orderId)
      .single();

    if (orderError || !order) throw new Error(orderError?.message || 'Order not found.');

    const { data: address } = await supabase
      .from('addresses')
      .select('*')
      .eq('customer_id', order.customer_id)
      .eq('type', 'billing')
      .maybeSingle();

    const customerEmail = order.customers?.email || 'rechnung@valoir.local';
    const contactPayload = {
      familyname: address?.last_name || order.customers?.email || 'Valoir Kunde',
      name: `${address?.first_name || ''} ${address?.last_name || ''}`.trim() || customerEmail,
      customerNumber: order.order_number,
      category: { id: 3, objectName: 'Category' },
      email: customerEmail,
    };

    const contactResult = await sevdeskFetch('/Contact', {
      method: 'POST',
      body: JSON.stringify(contactPayload),
    });
    const contactId = contactResult?.objects?.id ?? contactResult?.objects?.[0]?.id ?? contactResult?.id;

    const items = (order.order_items || []) as OrderItem[];
    const invoicePayload = {
      invoice: {
        objectName: 'Invoice',
        invoiceNumber: null,
        contact: { id: contactId, objectName: 'Contact' },
        invoiceDate: new Date().toISOString().slice(0, 10),
        header: `Rechnung ${order.order_number}`,
        headText: 'Vielen Dank für deine Bestellung bei Valoir Parfum.',
        footText: 'Der Rechnungsbetrag wurde über den gewählten Zahlungsanbieter verarbeitet.',
        timeToPay: 0,
        discount: Number(order.discount_total || 0),
        addressName: contactPayload.name,
        addressStreet: `${address?.street || ''} ${address?.house_number || ''}`.trim(),
        addressZip: address?.postal_code || '',
        addressCity: address?.city || '',
        addressCountry: { id: 1, objectName: 'StaticCountry' },
        status: 100,
      },
      invoicePosSave: items.map((item) => ({
        objectName: 'InvoicePos',
        quantity: item.quantity,
        price: item.unit_price,
        name: `${item.products?.name || 'Valoir Parfum'} ${item.product_variants?.size || ''}`.trim(),
        unity: { id: 1, objectName: 'Unity' },
        taxRate: item.product_variants?.tax_rate ?? 19,
      })),
      filename: `valoir-${order.order_number}.pdf`,
    };

    if (Number(order.shipping_cost || 0) > 0) {
      invoicePayload.invoicePosSave.push({
        objectName: 'InvoicePos',
        quantity: 1,
        price: Number(order.shipping_cost),
        name: 'Versand',
        unity: { id: 1, objectName: 'Unity' },
        taxRate: 19,
      });
    }

    const created = await sevdeskFetch('/Invoice/Factory/saveInvoice', {
      method: 'POST',
      body: JSON.stringify(invoicePayload),
    });
    const invoice = created?.objects?.invoice ?? created?.objects ?? created;
    const invoiceId = invoice?.id;
    const invoiceNumber = invoice?.invoiceNumber ?? order.order_number;

    let pdfPath: string | null = null;
    try {
      const pdfResponse = await sevdeskFetch(`/Invoice/${invoiceId}/getPdf`);
      const pdfBytes = pdfResponse instanceof ArrayBuffer ? pdfResponse : Uint8Array.from(atob(pdfResponse?.objects?.content || ''), (char) => char.charCodeAt(0));
      pdfPath = `${order.customers?.user_id || 'admin'}/${order.order_number}.pdf`;
      await supabase.storage.from('invoice-pdfs').upload(pdfPath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });
    } catch (pdfError) {
      await logIntegration(supabase, {
        provider: 'sevdesk',
        action: 'download_invoice_pdf',
        status: 'warning',
        related_order_id: orderId,
        error_message: String(sanitizeError(pdfError)),
      });
    }

    const { data: savedInvoice } = await supabase
      .from('invoices')
      .upsert(
        {
          order_id: orderId,
          provider: 'sevdesk',
          provider_invoice_id: String(invoiceId),
          invoice_number: invoiceNumber,
          pdf_url: pdfPath,
          status: 'Erstellt',
          error_message: null,
        },
        { onConflict: 'order_id,provider' }
      )
      .select()
      .single();

    await supabase.from('orders').update({ invoice_status: 'Erstellt' }).eq('id', orderId);
    await logIntegration(supabase, { provider: 'sevdesk', action: 'create_invoice', status: 'success', related_order_id: orderId });
    await auditLog(supabase, {
      admin_user_id: user.id,
      action: 'Admin erstellt Rechnung',
      entity_type: 'order',
      entity_id: orderId,
      details: { provider_invoice_id: invoiceId, invoice_number: invoiceNumber },
    });

    return jsonResponse({ ok: true, invoice: savedInvoice });
  } catch (error) {
    if (error instanceof Response) return error;
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
