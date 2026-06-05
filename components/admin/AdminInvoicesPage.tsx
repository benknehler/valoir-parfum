'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import { invokeAdminFunction } from '../../lib/admin/actions';
import { useAdminInvoices, useAdminOrders } from '../../lib/admin/useAdminData';
import AdminTable from './AdminTable';
import AdminBadge from './AdminBadge';
import type { AdminInvoice } from '../../lib/admin/types';

export default function AdminInvoicesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const orders = useAdminOrders(refreshKey);
  const invoices = useAdminInvoices(refreshKey);
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  async function createInvoice() {
    const selectedOrderId = orderId || orders[0]?.id;
    if (!selectedOrderId) {
      setMessage('Bitte wähle zuerst eine Bestellung aus.');
      return;
    }
    const result = await invokeAdminFunction('create-sevdesk-invoice', { order_id: selectedOrderId });
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="grid gap-6">
      <AdminCard title="Rechnungen" action={<AdminButton type="button" onClick={createInvoice}>sevDesk-Rechnung erstellen</AdminButton>}>
        <label className="mb-5 grid max-w-xl gap-2 text-sm font-medium text-slate-700">
          Bestellung
          <select className="h-11 rounded-xl border border-slate-200 px-3" value={orderId} onChange={(event) => setOrderId(event.target.value)}>
            <option value="">Erste verfügbare Bestellung</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>{order.orderNumber} · {order.customer}</option>
            ))}
          </select>
        </label>
        <AdminTable<AdminInvoice>
          rows={invoices}
          columns={[
            { key: 'order', label: 'Bestellung', render: (row) => row.orderNumber },
            { key: 'provider', label: 'Provider', render: (row) => row.provider },
            { key: 'number', label: 'Nummer', render: (row) => row.invoiceNumber },
            { key: 'status', label: 'Status', render: (row) => <AdminBadge tone={row.status === 'Erstellt' ? 'green' : 'amber'}>{row.status}</AdminBadge> },
            { key: 'pdf', label: 'PDF', render: (row) => row.pdfUrl },
            { key: 'created', label: 'Erstellt', render: (row) => row.createdAt },
          ]}
        />
        {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
      </AdminCard>
      <AdminCard title="PDF Storage">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <FileText size={18} aria-hidden="true" />
          Private PDFs liegen in Supabase Storage und sind nur für Admins oder den jeweiligen Kunden lesbar.
        </div>
      </AdminCard>
    </div>
  );
}
