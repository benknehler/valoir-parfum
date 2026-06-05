'use client';

import { FormEvent, useState } from 'react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminEmptyState from './AdminEmptyState';
import { invokeAdminFunction } from '../../lib/admin/actions';

export default function AdminNewsletterPage() {
  const [message, setMessage] = useState('');

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await invokeAdminFunction('subscribe-brevo-newsletter', { email: form.get('email') });
    setMessage(result.message);
  }

  async function sendCampaign() {
    const result = await invokeAdminFunction('send-brevo-campaign', {
      campaign_id: 'draft',
      mode: 'test',
    });
    setMessage(result.message);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <AdminCard title="Newsletter-Anmeldung testen">
        <form className="grid gap-4" onSubmit={subscribe}>
          <input className="h-11 rounded-xl border border-slate-200 px-3" type="email" name="email" placeholder="E-Mail-Adresse" required />
          <AdminButton type="submit">Double-Opt-In vorbereiten</AdminButton>
        </form>
      </AdminCard>
      <AdminCard title="Kampagne">
        <div className="grid gap-4">
          <input className="h-11 rounded-xl border border-slate-200 px-3" placeholder="Betreff" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" placeholder="Vorschautext" />
          <textarea className="min-h-36 rounded-xl border border-slate-200 p-3" placeholder="HTML-Inhalt" />
          <div className="flex flex-wrap gap-3">
            <AdminButton type="button" variant="secondary" onClick={sendCampaign}>Testmail senden</AdminButton>
            <AdminButton type="button">Kampagne planen</AdminButton>
          </div>
        </div>
      </AdminCard>
      <div className="xl:col-span-2">
        <AdminCard title="Abonnenten">
          <AdminEmptyState title="Keine Fake-Abonnenten" text="Bestätigte Kontakte erscheinen hier nach Brevo Double-Opt-In und werden in newsletter_subscribers gespeichert." />
          {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
        </AdminCard>
      </div>
    </div>
  );
}
