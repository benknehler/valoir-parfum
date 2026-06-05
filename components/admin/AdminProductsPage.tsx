'use client';

import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { useAdminProducts } from '../../lib/admin/useAdminData';

export default function AdminProductsPage() {
  const products = useAdminProducts();

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
                <AdminButton type="button" variant="secondary">Bearbeiten</AdminButton>
              </div>
            ))}
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
