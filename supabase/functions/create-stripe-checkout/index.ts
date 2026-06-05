import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';

type CartInput = {
  id?: string;
  size?: string;
  quantity?: number;
};

type CatalogVariant = {
  productId: string;
  size: string;
  name: string;
  description: string;
  sku: string;
  unitAmount: number;
  image: string;
};

const stripeApiVersion = '2026-02-25.clover';
const defaultBaseUrl = 'https://benknehler.github.io/valoir-parfum';
const allowedHosts = new Set(['benknehler.github.io', 'localhost', '127.0.0.1']);

const catalog: CatalogVariant[] = [
  {
    productId: 'noir-cerice',
    size: '50 ml',
    name: 'Noir Cerice',
    description: 'Dunkler Kirschduft mit schwarzer Rose, Ebenholz und rauchiger Ambra.',
    sku: 'VAL-NC-050',
    unitAmount: 12900,
    image: `${defaultBaseUrl}/images/noir-cerice-studio.jpg`,
  },
  {
    productId: 'noir-cerice',
    size: '100 ml',
    name: 'Noir Cerice',
    description: 'Dunkler Kirschduft mit schwarzer Rose, Ebenholz und rauchiger Ambra.',
    sku: 'VAL-NC-100',
    unitAmount: 16900,
    image: `${defaultBaseUrl}/images/noir-cerice-studio.jpg`,
  },
  {
    productId: 'luna-solea',
    size: '50 ml',
    name: 'Luna Solea',
    description: 'Goldener Duft mit Pfirsich, Mango, Osmanthus und Vanille-Amber.',
    sku: 'VAL-LS-050',
    unitAmount: 12900,
    image: `${defaultBaseUrl}/images/luna-solea-studio.jpg`,
  },
  {
    productId: 'luna-solea',
    size: '100 ml',
    name: 'Luna Solea',
    description: 'Goldener Duft mit Pfirsich, Mango, Osmanthus und Vanille-Amber.',
    sku: 'VAL-LS-100',
    unitAmount: 16900,
    image: `${defaultBaseUrl}/images/luna-solea-studio.jpg`,
  },
];

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

function getVariant(item: CartInput) {
  return catalog.find((variant) => variant.productId === item.id && variant.size === item.size);
}

function appendLineItem(params: URLSearchParams, index: number, item: CartInput, variant: CatalogVariant) {
  const quantity = Math.max(1, Math.min(Number(item.quantity || 1), 10));

  params.set(`line_items[${index}][quantity]`, String(quantity));
  params.set(`line_items[${index}][price_data][currency]`, 'eur');
  params.set(`line_items[${index}][price_data][unit_amount]`, String(variant.unitAmount));
  params.set(`line_items[${index}][price_data][product_data][name]`, `${variant.name} · ${variant.size}`);
  params.set(`line_items[${index}][price_data][product_data][description]`, variant.description);
  params.set(`line_items[${index}][price_data][product_data][images][0]`, variant.image);
  params.set(`line_items[${index}][price_data][product_data][metadata][product_id]`, variant.productId);
  params.set(`line_items[${index}][price_data][product_data][metadata][sku]`, variant.sku);
}

async function stripeRequest(secretKey: string, params: URLSearchParams) {
  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();
  if (req.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405);

  try {
    const secretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secretKey) {
      return jsonResponse({ ok: false, error: 'Stripe ist serverseitig noch nicht konfiguriert.' }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? (body.items as CartInput[]) : [];
    if (!items.length) return jsonResponse({ ok: false, error: 'Der Warenkorb ist leer.' }, 400);

    const origin = getOrigin(req, body.origin);
    const params = new URLSearchParams();
    let subtotal = 0;

    params.set('mode', 'payment');
    params.set('success_url', `${origin}/warenkorb/?stripe=success&session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/warenkorb/?stripe=cancelled`);
    params.set('locale', 'de');
    params.set('billing_address_collection', 'required');
    params.set('shipping_address_collection[allowed_countries][0]', 'DE');
    params.set('shipping_address_collection[allowed_countries][1]', 'AT');
    params.set('shipping_address_collection[allowed_countries][2]', 'CH');
    params.set('phone_number_collection[enabled]', 'true');
    params.set('allow_promotion_codes', 'true');
    params.set('metadata[brand]', 'Valoir Parfum');

    items.forEach((item, index) => {
      const variant = getVariant(item);
      if (!variant) {
        throw new Error(`Unbekanntes Produkt oder Größe: ${item.id || '-'} ${item.size || '-'}`);
      }
      const quantity = Math.max(1, Math.min(Number(item.quantity || 1), 10));
      subtotal += variant.unitAmount * quantity;
      appendLineItem(params, index, item, variant);
    });

    const shippingAmount = subtotal >= 10000 ? 0 : 490;
    params.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(shippingAmount));
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur');
    params.set('shipping_options[0][shipping_rate_data][display_name]', shippingAmount === 0 ? 'Kostenloser Versand' : 'Standardversand');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]', 'business_day');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]', '2');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]', 'business_day');
    params.set('shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]', '4');

    const session = await stripeRequest(secretKey, params);
    return jsonResponse({ ok: true, id: session.id, url: session.url });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Stripe Checkout konnte nicht gestartet werden.' }, 500);
  }
});
