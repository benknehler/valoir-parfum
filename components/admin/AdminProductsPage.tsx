'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { updateVariant } from '../../lib/admin/actions';
import { useAdminProducts } from '../../lib/admin/useAdminData';

export default function AdminProductsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const products = useAdminProducts(refreshKey);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [message, setMessage] = useState('');
  const selectedVariant = products.flatMap((product) => product.variants.map((variant) => ({ product, variant }))).find((entry) => entry.variant.id === selectedVariantId);

  useEffect(() => {
    if (!selectedVariantId && products[0]?.variants[0]?.id) {
      setSelectedVariantId(products[0].variants[0].id);
    }
  }, [products, selectedVariantId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedVariant) return;
    const form = new FormData(event.currentTarget);
    const result = await updateVariant(selectedVariant.variant.id, {
      price: Number(form.get('price') || 0),
      stock: Number(form.get('stock') || 0),
      lowStockThreshold: Number(form.get('lowStockThreshold') || 0),
      weight: Number(form.get('weight') || 0),
      active: form.get('active') === 'on',
    });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="grid gap-6">
      {products.map((product) => (
        <AdminCard key={product.id} title={product.name} action={<AdminBadge tone="green">{product.status}</AdminBadge>}>
          <p className="mb-5 text-sm text-slate-500">{product.family}</p>
          <div className="grid gap-3">
            {product.variants.map((variant) => (
              <div key={variant.sku} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                <div>
                  <p className="font-semibold text-slate-950">{variant.size}</p>
                  <p className="mt-1 text-xs text-slate-500">SKU {variant.sku}</p>
                </div>
                <span className="text-sm text-slate-600">{variant.price}</span>
                <AdminBadge tone={variant.stock <= variant.lowStockThreshold ? 'amber' : 'green'}>{variant.stock} Stück</AdminBadge>
                <AdminButton type="button" variant={selectedVariantId === variant.id ? 'primary' : 'secondary'} onClick={() => setSelectedVariantId(variant.id)}>
                  Bearbeiten
                </AdminButton>
              </div>
            ))}
          </div>
        </AdminCard>
      ))}
      {selectedVariant && (
        <AdminCard title={`${selectedVariant.product.name} · ${selectedVariant.variant.size} bearbeiten`}>
          <form className="grid gap-4 md:grid-cols-5" key={selectedVariant.variant.id} onSubmit={submit}>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Preis
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="price" type="number" step="0.01" min="0" defaultValue={selectedVariant.variant.rawPrice} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Bestand
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="stock" type="number" min="0" defaultValue={selectedVariant.variant.stock} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Mindestbestand
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="lowStockThreshold" type="number" min="0" defaultValue={selectedVariant.variant.lowStockThreshold} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Gewicht kg
              <input className="h-11 rounded-xl border border-slate-200 px-3" name="weight" type="number" step="0.001" min="0" defaultValue={selectedVariant.variant.rawWeight} />
            </label>
            <label className="flex items-end gap-3 text-sm font-medium text-slate-700">
              <input className="mb-3 h-4 w-4" name="active" type="checkbox" defaultChecked={selectedVariant.variant.active} />
              Aktiv
            </label>
            <div className="md:col-span-5">
              <AdminButton type="submit">Variante speichern</AdminButton>
            </div>
          </form>
          {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
        </AdminCard>
      )}
    </div>
  );
}
