'use client';

import { publicSupabaseAnonKey, publicSupabaseUrl } from '../supabase/client';

export type DiscountValidation = {
  ok: boolean;
  code?: string;
  type?: 'percent' | 'fixed';
  value?: number;
  discountTotal?: number;
  total?: number;
  message?: string;
};

export async function validateDiscountCode(code: string, subtotal: number): Promise<DiscountValidation> {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return { ok: false, message: 'Bitte gib einen Rabattcode ein.' };
  }

  const response = await fetch(`${publicSupabaseUrl}/functions/v1/validate-discount-code`, {
    method: 'POST',
    headers: {
      apikey: publicSupabaseAnonKey,
      Authorization: `Bearer ${publicSupabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: cleanCode, subtotal }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.ok) {
    return { ok: false, message: payload?.error || 'Der Rabattcode konnte nicht geprüft werden.' };
  }

  return payload as DiscountValidation;
}
