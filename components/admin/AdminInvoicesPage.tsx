'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminEmptyState from './AdminEmptyState';
import { invokeAdminFunction } from '../../lib/admin/actions';

export default function AdminInvoicesPage() {
  const [message, setMessage] = useState('');

  async function createInvoice() {
    const result = await invokeAdminFunction('create-sevdesk-invoice', { order_id: 'selected-order' });
    setMessage(result.message);
  }

  return (
    <div className="grid gap-6">
      <AdminCard title="Rechnungen" action={<AdminButton type="button" onClick={createInvoice}>sevDesk-Rechnung erstellen</AdminButton>}>
        <AdminEmptyState title="Noch keine Rechnungen" text="Rechnungen werden aus Bestellungen erzeugt, in sevDesk gespeichert und als PDF im privaten Bucket invoice-pdfs abgelegt." />
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
