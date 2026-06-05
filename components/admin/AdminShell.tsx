'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { adminNav } from '../../lib/admin/data';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../../lib/supabase/client';

function SetupNotice() {
  return (
    <div className="min-h-screen bg-slate-100 px-5 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Supabase Setup</p>
        <h1 className="mt-4 text-3xl font-semibold">Supabase-Konfiguration erforderlich</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Lege die Werte aus `.env.example` in deiner Umgebung an und führe die Migrationen aus `supabase/migrations` in deinem
          Valoir-Supabase-Projekt aus. Danach prüft dieser Bereich Login, Rolle und RLS über Supabase Auth.
        </p>
      </div>
    </div>
  );
}

function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<'checking' | 'allowed' | 'blocked' | 'setup'>('checking');
  const isLogin = pathname?.startsWith('/admin/login');

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      if (!isSupabaseConfigured()) {
        if (active) setState('setup');
        return;
      }

      if (isLogin) {
        if (active) setState('allowed');
        return;
      }

      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase!.auth.getSession();

      if (!sessionData.session) {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || '/admin')}`);
        return;
      }

      const { data: profile, error } = await supabase!
        .from('profiles')
        .select('role,email,first_name,last_name')
        .eq('user_id', sessionData.session.user.id)
        .maybeSingle();

      if (!active) return;
      if (error || profile?.role !== 'admin') {
        setState('blocked');
        return;
      }

      setState('allowed');
    }

    checkAccess();
    return () => {
      active = false;
    };
  }, [isLogin, pathname, router]);

  if (state === 'setup') return <SetupNotice />;
  if (state === 'checking') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 text-sm font-medium text-slate-500">
        Zugriff wird geprüft...
      </div>
    );
  }
  if (state === 'blocked') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 px-5">
        <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Kein Admin-Zugriff</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Dein Konto besitzt nicht die Rolle `admin`.</p>
        </div>
      </div>
    );
  }

  return children;
}

function AdminNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <Link href="/admin" className="flex items-center gap-3 text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white">
              <ShieldCheck size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Valoir Admin</span>
              <span className="block text-xs text-slate-500">Commerce Backend</span>
            </span>
          </Link>
          <button className="rounded-xl p-2 text-slate-500 lg:hidden" type="button" onClick={onClose} aria-label="Menü schließen">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          {adminNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-5 text-xs leading-5 text-slate-500">
          API-Schlüssel bleiben serverseitig in Supabase Edge Functions.
        </div>
      </aside>
    </>
  );
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = useMemo(() => adminNav.find((item) => item.href === pathname)?.label || 'Admin', [pathname]);
  const isLogin = pathname?.startsWith('/admin/login');

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-950">
      <div className="lg:grid lg:grid-cols-[20rem_1fr]">
        <AdminNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="min-w-0">
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/85 px-5 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 lg:hidden" type="button" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
                <Menu size={20} aria-hidden="true" />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin</p>
                <h1 className="text-xl font-semibold text-slate-950">{title}</h1>
              </div>
            </div>
            <Link href="/neu" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Website ansehen
            </Link>
          </header>
          <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <AdminFrame>{children}</AdminFrame>
    </AdminGate>
  );
}

export function AdminLoginShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 px-5 py-10 font-sans text-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {children}
        <p className="mt-6 text-xs leading-5 text-slate-500">Nach dem Login wird die Rolle `admin` in Supabase `profiles` geprüft. Ziel: {redirect}</p>
      </div>
    </div>
  );
}
