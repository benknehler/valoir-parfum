'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

export const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nvmaejcfuxkbrzlthqlc.supabase.co';
export const publicSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_2ePeqZ5Wx1IxPeSGAibB7A_2S7An2vE';

export function isSupabaseConfigured() {
  return Boolean(publicSupabaseUrl && publicSupabaseAnonKey);
}

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;

  if (!browserClient) {
    browserClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}
