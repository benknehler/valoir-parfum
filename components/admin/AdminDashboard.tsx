'use client';

import AdminBadge from './AdminBadge';
import AdminCard from './AdminCard';
import AdminTable from './AdminTable';
import { useAdminOrders, useAdminProducts, useAdminSettings, useDashboardMetrics } from '../../lib/admin/useAdminData';
import type { AdminOrder } from '../../lib/admin/types';

export default function AdminDashboard() {
  const dashboardMetrics = useDashboardMetrics();
  const orders = useAdminOrders();
  const products = useAdminProducts();
  const settings = useAdminSettings();
  const openTasks = [
    !settings?.legal_company_name ? 'Rechtliche Betreiberangaben ergänzen' : '',
    !settings?.shipper_street ? 'Absenderadresse für DHL hinterlegen' : '',
    'Stripe Webhook mit Live-Schlüssel testen',
    'sevDesk, DHL und Brevo Zugangsdaten in Supabase Secrets prüfen',
  ].filter(Boolean);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <AdminCard key={metric.label}>
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{metric.detail}</p>
          </AdminCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <AdminCard title="Letzte Bestellungen">
          <AdminTable<AdminOrder>
            rows={orders}
            columns={[
              { key: 'order', label: 'Bestellung', render: (row) => <span className="font-semibold text-slate-950">{row.orderNumber}</span> },
              { key: 'customer', label: 'Kunde', render: (row) => row.customer },
              { key: 'status', label: 'Status', render: (row) => <AdminBadge tone="amber">{row.status}</AdminBadge> },
              { key: 'total', label: 'Summe', render: (row) => row.total },
            ]}
          />
        </AdminCard>
        <AdminCard title="Offene Aufgaben">
          <div className="grid gap-3">
            {openTasks.map((task) => (
              <div key={task} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                {task}
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Lagerwarnungen">
        <div className="grid gap-3 md:grid-cols-2">
          {products.flatMap((product) =>
            product.variants.map((variant) => (
              <div key={`${product.id}-${variant.sku}`} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-slate-950">{product.name} · {variant.size}</p>
                  <p className="mt-1 text-sm text-slate-500">SKU {variant.sku}</p>
                </div>
                <AdminBadge tone={variant.stock <= variant.lowStockThreshold ? 'amber' : 'green'}>{variant.stock} Stück</AdminBadge>
              </div>
            ))
          )}
        </div>
      </AdminCard>
    </div>
  );
}
