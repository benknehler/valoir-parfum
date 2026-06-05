'use client';

import { FormEvent, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { useAdminProducts } from '../../lib/admin/useAdminData';

export default function AdminInventoryPage() {
  const products = useAdminProducts();
  const [message, setMessage] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Bestandsänderungen werden nach Supabase als inventory_movement gespeichert, sobald das Backend verbunden ist.');
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <AdminCard title="Lagerbestand">
        <div className="grid gap-3">
          {products.flatMap((product) =>
            product.variants.map((variant) => (
              <div key={variant.sku} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                <div>
                  <p className="font-semibold text-slate-950">{product.name} · {variant.size}</p>
                  <p className="mt-1 text-xs text-slate-500">Mindestbestand {variant.lowStockThreshold} · Gewicht {variant.weight}</p>
                </div>
                <AdminBadge tone={variant.stock <= variant.lowStockThreshold ? 'amber' : 'green'}>{variant.stock} Stück</AdminBadge>
                <AdminButton type="button" variant="secondary">CSV Export</AdminButton>
              </div>
            ))
          )}
        </div>
      </AdminCard>
      <AdminCard title="Bestand buchen">
        <form className="grid gap-4" onSubmit={submit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Typ
            <select className="h-11 rounded-xl border border-slate-200 px-3">
              <option>Wareneingang</option>
              <option>Korrektur</option>
              <option>Retoure</option>
              <option>Storno</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Menge
            <input className="h-11 rounded-xl border border-slate-200 px-3" type="number" min="1" defaultValue="1" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Grund
            <input className="h-11 rounded-xl border border-slate-200 px-3" placeholder="z. B. Wareneingang" />
          </label>
          <AdminButton type="submit">Bewegung speichern</AdminButton>
        </form>
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
    </div>
  );
}
