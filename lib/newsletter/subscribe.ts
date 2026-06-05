'use client';

import { publicSupabaseAnonKey, publicSupabaseUrl } from '../supabase/client';

export async function subscribeNewsletter(email: string, source = 'website') {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('Bitte gib eine gültige E-Mail-Adresse ein.');
  }

  const response = await fetch(`${publicSupabaseUrl}/functions/v1/subscribe-brevo-newsletter`, {
    method: 'POST',
    headers: {
      apikey: publicSupabaseAnonKey,
      Authorization: `Bearer ${publicSupabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: cleanEmail,
      source,
      redirection_url: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ''}/neu/`,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || 'Die Newsletter-Anmeldung konnte nicht gespeichert werden.');
  }

  return payload;
}
