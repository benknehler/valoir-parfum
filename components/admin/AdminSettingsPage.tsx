'use client';

import { FormEvent, useState } from 'react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { saveShopSettings } from '../../lib/admin/actions';
import { useAdminSettings } from '../../lib/admin/useAdminData';

export default function AdminSettingsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const settings = useAdminSettings(refreshKey);
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await saveShopSettings({
      shipping_cost: Number(form.get('shipping_cost') || 0),
      free_shipping_threshold: Number(form.get('free_shipping_threshold') || 0),
      tax_rate: Number(form.get('tax_rate') || 19),
      contact_email: String(form.get('contact_email') || ''),
      shipper_name: String(form.get('shipper_name') || ''),
      shipper_street: String(form.get('shipper_street') || ''),
      shipper_house_number: String(form.get('shipper_house_number') || ''),
      shipper_postal_code: String(form.get('shipper_postal_code') || ''),
      shipper_city: String(form.get('shipper_city') || ''),
      shipper_country: String(form.get('shipper_country') || 'DE'),
      legal_company_name: String(form.get('legal_company_name') || ''),
      legal_represented_by: String(form.get('legal_represented_by') || ''),
      legal_street: String(form.get('legal_street') || ''),
      legal_house_number: String(form.get('legal_house_number') || ''),
      legal_postal_code: String(form.get('legal_postal_code') || ''),
      legal_city: String(form.get('legal_city') || ''),
      legal_country: String(form.get('legal_country') || 'DE'),
      legal_vat_id: String(form.get('legal_vat_id') || ''),
      legal_court: String(form.get('legal_court') || ''),
      privacy_contact_email: String(form.get('privacy_contact_email') || ''),
    });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  const legalComplete = Boolean(settings?.legal_company_name && settings?.legal_street && settings?.legal_city);

  return (
    <div className="grid gap-6">
      {!legalComplete && (
        <AdminCard title="Rechtliche Angaben">
          <p className="text-sm leading-6 text-amber-700">
            Rechtliche Pflichtangaben sind unvollständig. Ergänze Unternehmensname, Anschrift und verantwortliche Person vor dem Live-Verkauf.
          </p>
        </AdminCard>
      )}
      <AdminCard title="Shop-Einstellungen">
        <form className="grid gap-5" key={settings ? 'settings-loaded' : 'settings-empty'} onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Versandkosten
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipping_cost" type="number" step="0.01" defaultValue={settings?.shipping_cost ?? 4.9} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Kostenloser Versand ab
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="free_shipping_threshold" type="number" step="0.01" defaultValue={settings?.free_shipping_threshold ?? 100} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Steuersatz
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="tax_rate" type="number" step="0.01" defaultValue={settings?.tax_rate ?? 19} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="contact_email" placeholder="Kontaktmail" defaultValue={settings?.contact_email || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="privacy_contact_email" placeholder="Datenschutz-Kontaktmail" defaultValue={settings?.privacy_contact_email || ''} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_name" placeholder="Absender Name" defaultValue={settings?.shipper_name || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_street" placeholder="Absender Straße" defaultValue={settings?.shipper_street || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_house_number" placeholder="Hausnummer" defaultValue={settings?.shipper_house_number || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_postal_code" placeholder="PLZ" defaultValue={settings?.shipper_postal_code || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_city" placeholder="Ort" defaultValue={settings?.shipper_city || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="shipper_country" placeholder="Land" defaultValue={settings?.shipper_country || 'DE'} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_company_name" placeholder="Unternehmensname" defaultValue={settings?.legal_company_name || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_represented_by" placeholder="Vertreten durch" defaultValue={settings?.legal_represented_by || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_vat_id" placeholder="USt-IdNr." defaultValue={settings?.legal_vat_id || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_street" placeholder="Straße" defaultValue={settings?.legal_street || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_house_number" placeholder="Hausnummer" defaultValue={settings?.legal_house_number || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_postal_code" placeholder="PLZ" defaultValue={settings?.legal_postal_code || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_city" placeholder="Ort" defaultValue={settings?.legal_city || ''} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_country" placeholder="Land" defaultValue={settings?.legal_country || 'DE'} />
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="legal_court" placeholder="Registergericht" defaultValue={settings?.legal_court || ''} />
          </div>
          <AdminButton type="submit">Einstellungen speichern</AdminButton>
        </form>
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
    </div>
  );
}
