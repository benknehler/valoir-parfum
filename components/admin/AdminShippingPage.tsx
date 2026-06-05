'use client';

import { useState } from 'react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { invokeAdminFunction } from '../../lib/admin/actions';
import { useAdminOrders, useAdminShipments } from '../../lib/admin/useAdminData';
import AdminTable from './AdminTable';
import AdminBadge from './AdminBadge';
import type { AdminShipment } from '../../lib/admin/types';

export default function AdminShippingPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const orders = useAdminOrders(refreshKey);
  const shipments = useAdminShipments(refreshKey);
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  async function createLabel() {
    const selectedOrderId = orderId || orders[0]?.id;
    if (!selectedOrderId) {
      setMessage('Bitte wähle zuerst eine Bestellung aus.');
      return;
    }
    const result = await invokeAdminFunction('create-dhl-label', { order_id: selectedOrderId });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  return (
    <AdminCard title="Versandlabels" action={<AdminButton type="button" onClick={createLabel}>DHL-Label erstellen</AdminButton>}>
      <label className="mb-5 grid max-w-xl gap-2 text-sm font-medium text-slate-700">
        Bestellung
        <select className="h-11 rounded-xl border border-slate-200 px-3" value={orderId} onChange={(event) => setOrderId(event.target.value)}>
          <option value="">Erste verfügbare Bestellung</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>{order.orderNumber} · {order.customer}</option>
          ))}
        </select>
      </label>
      <AdminTable<AdminShipment>
        rows={shipments}
        columns={[
          { key: 'order', label: 'Bestellung', render: (row) => row.orderNumber },
          { key: 'provider', label: 'Provider', render: (row) => row.provider },
          { key: 'tracking', label: 'Tracking', render: (row) => row.trackingNumber },
          { key: 'status', label: 'Status', render: (row) => <AdminBadge tone={row.status === 'Erstellt' ? 'green' : 'amber'}>{row.status}</AdminBadge> },
          { key: 'label', label: 'Label', render: (row) => row.labelUrl },
          { key: 'created', label: 'Erstellt', render: (row) => row.createdAt },
        ]}
      />
      {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
    </AdminCard>
  );
}
