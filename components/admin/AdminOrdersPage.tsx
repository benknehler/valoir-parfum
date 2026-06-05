'use client';

import { useMemo, useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminFilters from './AdminFilters';
import AdminTable from './AdminTable';
import { orderStatuses } from '../../lib/admin/data';
import type { AdminOrder } from '../../lib/admin/types';
import { invokeAdminFunction, updateOrderStatus } from '../../lib/admin/actions';
import { useAdminOrders } from '../../lib/admin/useAdminData';

export default function AdminOrdersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const orders = useAdminOrders(refreshKey);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Alle');
  const [message, setMessage] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const rows = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch = `${order.orderNumber} ${order.customer} ${order.email}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'Alle' || order.status === status;
        return matchesSearch && matchesStatus;
      }),
    [orders, search, status]
  );

  const selectedOrder = rows.find((order) => order.id === selectedOrderId) || rows[0];

  async function runIntegration(functionName: string) {
    if (!selectedOrder) {
      setMessage('Bitte wähle zuerst eine Bestellung aus.');
      return;
    }
    const result = await invokeAdminFunction(functionName, { order_id: selectedOrder.id });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  async function updateSelectedOrder(changes: Record<string, string>) {
    if (!selectedOrder) {
      setMessage('Bitte wähle zuerst eine Bestellung aus.');
      return;
    }
    const result = await updateOrderStatus(selectedOrder.id, changes);
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
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
              {
                key: 'select',
                label: 'Auswahl',
                render: (row) => (
                  <AdminButton type="button" variant={selectedOrderId === row.id ? 'primary' : 'secondary'} onClick={() => setSelectedOrderId(row.id)}>
                    Auswählen
                  </AdminButton>
                ),
              },
            ]}
          />
        </div>
      </AdminCard>
      <AdminCard title="Schnelle Aktionen">
        <div className="flex flex-wrap gap-3">
          <AdminButton type="button" variant="secondary" onClick={() => updateSelectedOrder({ status: 'In Bearbeitung' })}>In Bearbeitung</AdminButton>
          <AdminButton type="button" variant="secondary" onClick={() => updateSelectedOrder({ status: 'Retoure' })}>Retoure markieren</AdminButton>
          <AdminButton type="button" variant="danger" onClick={() => updateSelectedOrder({ status: 'Storniert', payment_status: 'Storniert' })}>Bestellung stornieren</AdminButton>
          <AdminButton type="button" onClick={() => runIntegration('create-sevdesk-invoice')}>sevDesk-Rechnung erstellen</AdminButton>
          <AdminButton type="button" onClick={() => runIntegration('create-dhl-label')}>DHL-Label erstellen</AdminButton>
        </div>
        {selectedOrder && <p className="mt-4 text-sm text-slate-500">Aktuelle Auswahl: {selectedOrder.orderNumber}</p>}
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
    </div>
  );
}
