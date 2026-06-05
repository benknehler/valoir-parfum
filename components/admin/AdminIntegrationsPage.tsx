'use client';

import { useState } from 'react';
import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminTable from './AdminTable';
import { integrationCards } from '../../lib/admin/data';
import { useIntegrationLogs } from '../../lib/admin/useAdminData';
import type { AdminLog } from '../../lib/admin/types';
import { invokeAdminFunction } from '../../lib/admin/actions';

export default function AdminIntegrationsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState('');
  const logs = useIntegrationLogs(refreshKey);

  async function testConnection(functionName: string) {
    const body =
      functionName === 'send-brevo-campaign'
        ? { action: 'test_connection' }
        : functionName === 'create-stripe-checkout'
          ? { action: 'test_connection' }
          : { action: 'test_connection' };
    const result = await invokeAdminFunction(functionName, body);
    setMessage(result.message);
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {integrationCards.map((card) => (
          <AdminCard key={card.provider}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-950">{card.provider}</h2>
                <p className="mt-2 text-sm text-slate-500">Status wird über Verbindungstest und Integrationslogs geprüft.</p>
              </div>
              <AdminBadge tone="blue">Serverseitig</AdminBadge>
            </div>
            <div className="mt-5 flex gap-2">
              <AdminButton type="button" variant="secondary" onClick={() => testConnection(card.functionName)}>Verbindung testen</AdminButton>
              <AdminButton type="button" variant="secondary" onClick={() => document.getElementById('integration-logs')?.scrollIntoView({ behavior: 'smooth' })}>Logs</AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>
      {message && <p className="rounded-xl bg-white p-4 text-sm text-slate-600 shadow-sm">{message}</p>}
      <AdminCard title="Integrationslogs">
        <div id="integration-logs" />
        <AdminTable<AdminLog>
          rows={logs}
          columns={[
            { key: 'provider', label: 'Provider', render: (row) => row.provider },
            { key: 'action', label: 'Aktion', render: (row) => row.action },
            { key: 'status', label: 'Status', render: (row) => <AdminBadge tone={row.status === 'success' ? 'green' : row.status === 'error' ? 'red' : 'amber'}>{row.status}</AdminBadge> },
            { key: 'request', label: 'Request ID', render: (row) => row.requestId },
            { key: 'created', label: 'Zeit', render: (row) => row.createdAt },
          ]}
        />
      </AdminCard>
    </div>
  );
}
