'use client';

import { getSupabaseBrowserClient } from '../supabase/client';

export async function invokeAdminFunction<TBody extends Record<string, unknown>>(name: string, body: TBody) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, message: 'Supabase ist noch nicht konfiguriert.' };
  }

  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) return { ok: false, message: error.message };

  return { ok: true, message: 'Aktion wurde ausgeführt.', data };
}
