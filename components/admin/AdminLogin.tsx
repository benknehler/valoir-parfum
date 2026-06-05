'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AdminButton } from './AdminButton';
import { AdminLoginShell } from './AdminShell';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../../lib/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    if (!isSupabaseConfigured()) {
      setMessage('Supabase ENV ist noch nicht gesetzt.');
      setLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace(redirect);
  }

  return (
    <AdminLoginShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Valoir Admin</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-950">Anmelden</h1>
      <form className="mt-8 grid gap-4" onSubmit={submit}>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          E-Mail-Adresse
          <input
            className="h-12 rounded-xl border border-slate-200 px-3 text-slate-950 outline-none focus:border-slate-500"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Passwort
          <input
            className="h-12 rounded-xl border border-slate-200 px-3 text-slate-950 outline-none focus:border-slate-500"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <AdminButton type="submit" disabled={loading}>
          {loading ? 'Wird geprüft...' : 'Einloggen'}
        </AdminButton>
      </form>
      {message && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{message}</p>}
    </AdminLoginShell>
  );
}
