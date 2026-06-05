'use client';

import { FormEvent, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { bookInventoryMovement } from '../../lib/admin/actions';
import { useAdminProducts } from '../../lib/admin/useAdminData';

export default function AdminInventoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const products = useAdminProducts(refreshKey);
  const [message, setMessage] = useState('');

  const variants = products.flatMap((product) => product.variants.map((variant) => ({ product, variant })));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await bookInventoryMovement({
      variantId: String(form.get('variantId') || ''),
      type: String(form.get('type') || 'receipt'),
      quantity: Number(form.get('quantity') || 1),
      reason: String(form.get('reason') || 'Bestandsbuchung'),
    });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  function exportCsv() {
    const rows = [
      ['Produkt', 'Größe', 'SKU', 'Bestand', 'Mindestbestand', 'Gewicht'],
      ...variants.map(({ product, variant }) => [
        product.name,
        variant.size,
        variant.sku,
        String(variant.stock),
        String(variant.lowStockThreshold),
        String(variant.rawWeight),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `valoir-lagerbestand-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
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
                <AdminButton type="button" variant="secondary" onClick={exportCsv}>CSV Export</AdminButton>
              </div>
            ))
          )}
        </div>
      </AdminCard>
      <AdminCard title="Bestand buchen">
        <form className="grid gap-4" onSubmit={submit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Variante
            <select className="h-11 rounded-xl border border-slate-200 px-3" name="variantId" required>
              {variants.map(({ product, variant }) => (
                <option key={variant.id} value={variant.id}>{product.name} · {variant.size}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Typ
            <select className="h-11 rounded-xl border border-slate-200 px-3" name="type">
              <option value="receipt">Wareneingang</option>
              <option value="correction">Korrektur</option>
              <option value="return">Retoure</option>
              <option value="cancel">Storno</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Menge
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="quantity" type="number" min="1" defaultValue="1" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Grund
            <input className="h-11 rounded-xl border border-slate-200 px-3" name="reason" defaultValue="Wareneingang" />
          </label>
          <AdminButton type="submit">Bewegung speichern</AdminButton>
        </form>
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
    </div>
  );
}
