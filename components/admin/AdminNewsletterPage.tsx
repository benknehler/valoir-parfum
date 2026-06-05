'use client';

import { FormEvent, useState } from 'react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { invokeAdminFunction } from '../../lib/admin/actions';
import { useAdminSubscribers } from '../../lib/admin/useAdminData';
import AdminTable from './AdminTable';
import AdminBadge from './AdminBadge';
import type { AdminSubscriber } from '../../lib/admin/types';

export default function AdminNewsletterPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const subscribers = useAdminSubscribers(refreshKey);
  const [message, setMessage] = useState('');

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await invokeAdminFunction('subscribe-brevo-newsletter', { email: form.get('email') });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  async function sendCampaign(formElement: HTMLFormElement, mode: 'test' | 'send' | 'draft') {
    const form = new FormData(formElement);
    const result = await invokeAdminFunction('send-brevo-campaign', {
      mode,
      title: form.get('title'),
      subject: form.get('subject'),
      preview_text: form.get('previewText'),
      html_content: form.get('htmlContent'),
    });
    setMessage(result.message);
  }

  function handleCampaignSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendCampaign(event.currentTarget, 'test');
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
        <form className="grid gap-4" onSubmit={handleCampaignSubmit}>
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="title" placeholder="Kampagnenname" required />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="subject" placeholder="Betreff" required />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="previewText" placeholder="Vorschautext" />
          <textarea className="min-h-36 rounded-xl border border-slate-200 p-3" name="htmlContent" placeholder="HTML-Inhalt" required />
          <div className="flex flex-wrap gap-3">
            <AdminButton type="submit" variant="secondary">Testmail senden</AdminButton>
            <AdminButton
              type="button"
              onClick={(event) => {
                const form = event.currentTarget.form;
                if (form) sendCampaign(form, 'send');
              }}
            >
              Kampagne senden
            </AdminButton>
          </div>
        </form>
      </AdminCard>
      <div className="xl:col-span-2">
        <AdminCard title="Abonnenten">
          <AdminTable<AdminSubscriber>
            rows={subscribers}
            columns={[
              { key: 'email', label: 'E-Mail', render: (row) => row.email },
              { key: 'status', label: 'Status', render: (row) => <AdminBadge tone={row.status === 'confirmed' ? 'green' : 'amber'}>{row.status}</AdminBadge> },
              { key: 'consent', label: 'Zustimmung', render: (row) => row.consentAt },
              { key: 'created', label: 'Erstellt', render: (row) => row.createdAt },
            ]}
          />
          {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
        </AdminCard>
      </div>
    </div>
  );
}
