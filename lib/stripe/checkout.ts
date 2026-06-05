'use client';

import { publicSupabaseAnonKey, publicSupabaseUrl } from '../supabase/client';

type CheckoutItem = {
  id: string;
  size: string;
  quantity: number;
};

export async function createStripeCheckoutSession(items: CheckoutItem[]) {
  if (!items.length) {
    throw new Error('Dein Warenkorb ist leer.');
  }

  const response = await fetch(`${publicSupabaseUrl}/functions/v1/create-stripe-checkout`, {
    method: 'POST',
    headers: {
      apikey: publicSupabaseAnonKey,
      Authorization: `Bearer ${publicSupabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      origin: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ''}`,
      items: items.map((item) => ({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.url) {
    throw new Error(payload?.error || 'Stripe Checkout konnte nicht gestartet werden.');
  }

  return payload.url as string;
}
