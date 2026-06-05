'use client';

import { FormEvent, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { saveDiscountCode, setDiscountActive } from '../../lib/admin/actions';
import { useAdminDiscounts } from '../../lib/admin/useAdminData';

export default function AdminDiscountsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const discounts = useAdminDiscounts(refreshKey);
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await saveDiscountCode({
      code: String(form.get('code') || ''),
      type: String(form.get('type') || 'percent') as 'percent' | 'fixed',
      value: Number(form.get('value') || 0),
      minimumOrderValue: form.get('minimumOrderValue') ? Number(form.get('minimumOrderValue')) : null,
      maxUses: form.get('maxUses') ? Number(form.get('maxUses')) : null,
      usageLimitPerCustomer: form.get('usageLimitPerCustomer') ? Number(form.get('usageLimitPerCustomer')) : null,
      startsAt: form.get('startsAt') ? new Date(String(form.get('startsAt'))).toISOString() : null,
      expiresAt: form.get('expiresAt') ? new Date(String(form.get('expiresAt'))).toISOString() : null,
      active: form.get('active') === 'on',
    });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  async function toggle(id: string, active: boolean) {
    const result = await setDiscountActive(id, active);
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <AdminCard title="Rabattcode erstellen">
        <form className="grid gap-4" onSubmit={submit}>
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="code" defaultValue="WELCOME10" aria-label="Code" />
          <select className="h-11 rounded-xl border border-slate-200 px-3" name="type" aria-label="Typ">
            <option value="percent">Prozent-Rabatt</option>
            <option value="fixed">Fixbetrag</option>
          </select>
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="value" type="number" step="0.01" min="0" defaultValue="10" aria-label="Wert" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="minimumOrderValue" type="number" step="0.01" min="0" aria-label="Mindestbestellwert" placeholder="Mindestbestellwert" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="maxUses" type="number" min="1" aria-label="Maximale Nutzungen" placeholder="Maximale Nutzungen" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="usageLimitPerCustomer" type="number" min="1" aria-label="Nutzung pro Kunde" placeholder="Nutzung pro Kunde" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="startsAt" type="datetime-local" aria-label="Startdatum" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" name="expiresAt" type="datetime-local" aria-label="Ablaufdatum" />
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input name="active" type="checkbox" defaultChecked />
            Aktiv
          </label>
          <AdminButton type="submit">Gutschein speichern</AdminButton>
        </form>
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
      <AdminCard title="Aktive Codes">
        <div className="grid gap-3">
          {discounts.length === 0 && <p className="text-sm text-slate-500">Keine Gutscheine vorhanden.</p>}
          {discounts.map((discount) => (
            <div key={discount.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-950">{discount.code}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {discount.type === 'percent' ? `${discount.value} %` : `${discount.value.toLocaleString('de-DE')} €`} · genutzt {discount.usedCount}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <AdminBadge tone={discount.active ? 'green' : 'neutral'}>{discount.active ? 'Aktiv' : 'Inaktiv'}</AdminBadge>
                  <AdminButton type="button" variant="secondary" onClick={() => toggle(discount.id, !discount.active)}>
                    {discount.active ? 'Deaktivieren' : 'Aktivieren'}
                  </AdminButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
