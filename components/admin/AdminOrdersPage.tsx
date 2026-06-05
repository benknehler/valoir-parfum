'use client';

import { useMemo, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminFilters from './AdminFilters';
import AdminTable from './AdminTable';
import { orderStatuses } from '../../lib/admin/data';
import type { AdminOrder } from '../../lib/admin/types';
import { invokeAdminFunction } from '../../lib/admin/actions';
import { useAdminOrders } from '../../lib/admin/useAdminData';

export default function AdminOrdersPage() {
  const orders = useAdminOrders();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Alle');
  const [message, setMessage] = useState('');

  const rows = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch = `${order.orderNumber} ${order.customer} ${order.email}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'Alle' || order.status === status;
        return matchesSearch && matchesStatus;
      }),
    [orders, search, status]
  );

  async function runIntegration(functionName: string) {
    const result = await invokeAdminFunction(functionName, { order_id: rows[0]?.id });
    setMessage(result.message);
  }

  return (
    <div className="grid gap-6">
      <AdminCard title="Bestellverwaltung">
        <div className="grid gap-5">
          <AdminFilters search={search} onSearch={setSearch} status={status} onStatus={setStatus} statuses={orderStatuses} />
          <AdminTable<AdminOrder>
            rows={rows}
            columns={[
              { key: 'order', label: 'Bestellung', render: (row) => <span className="font-semibold text-slate-950">{row.orderNumber}</span> },
              { key: 'customer', label: 'Kunde', render: (row) => <div><p>{row.customer}</p><p className="text-xs text-slate-500">{row.email}</p></div> },
              { key: 'status', label: 'Status', render: (row) => <AdminBadge tone="blue">{row.status}</AdminBadge> },
              { key: 'payment', label: 'Zahlung', render: (row) => <AdminBadge tone={row.paymentStatus === 'Bezahlt' ? 'green' : 'amber'}>{row.paymentStatus}</AdminBadge> },
              { key: 'shipping', label: 'Versand', render: (row) => row.shippingStatus },
              { key: 'invoice', label: 'Rechnung', render: (row) => row.invoiceStatus },
              { key: 'total', label: 'Summe', render: (row) => row.total },
            ]}
          />
        </div>
      </AdminCard>
      <AdminCard title="Schnelle Aktionen">
        <div className="flex flex-wrap gap-3">
          <AdminButton type="button" variant="secondary">Bestellung bearbeiten</AdminButton>
          <AdminButton type="button" variant="secondary">Retoure markieren</AdminButton>
          <AdminButton type="button" variant="danger">Bestellung stornieren</AdminButton>
          <AdminButton type="button" onClick={() => runIntegration('create-sevdesk-invoice')}>sevDesk-Rechnung erstellen</AdminButton>
          <AdminButton type="button" onClick={() => runIntegration('create-dhl-label')}>DHL-Label erstellen</AdminButton>
        </div>
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
    </div>
  );
}
