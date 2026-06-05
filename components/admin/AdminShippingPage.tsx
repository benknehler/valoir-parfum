'use client';

import { useState } from 'react';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminEmptyState from './AdminEmptyState';
import { invokeAdminFunction } from '../../lib/admin/actions';

export default function AdminShippingPage() {
  const [message, setMessage] = useState('');

  async function createLabel() {
    const result = await invokeAdminFunction('create-dhl-label', { order_id: 'selected-order' });
    setMessage(result.message);
  }

  return (
    <AdminCard title="Versandlabels" action={<AdminButton type="button" onClick={createLabel}>DHL-Label erstellen</AdminButton>}>
      <AdminEmptyState title="Keine offenen Labels" text="DHL-Labels werden aus Bestellung, Adresse, Absenderdaten und Variantengewicht erzeugt. Doppelte Labels werden serverseitig verhindert." />
      {message && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{message}</p>}
    </AdminCard>
  );
}
