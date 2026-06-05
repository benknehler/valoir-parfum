'use client';

import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';
import AdminTable from './AdminTable';
import { integrationCards } from '../../lib/admin/data';
import { useIntegrationLogs } from '../../lib/admin/useAdminData';
import type { AdminLog } from '../../lib/admin/types';

export default function AdminIntegrationsPage() {
  const logs = useIntegrationLogs();

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {integrationCards.map((card) => (
          <AdminCard key={card.provider}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-950">{card.provider}</h2>
                <p className="mt-2 text-sm text-slate-500">Letzter Erfolg: {card.lastSuccess}</p>
                <p className="mt-1 text-sm text-slate-500">Letzter Fehler: {card.lastError}</p>
              </div>
              <AdminBadge tone={card.status === 'Vorbereitet' ? 'blue' : 'amber'}>{card.status}</AdminBadge>
            </div>
            <div className="mt-5 flex gap-2">
              <AdminButton type="button" variant="secondary">Verbindung testen</AdminButton>
              <AdminButton type="button" variant="secondary">Logs</AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>
      <AdminCard title="Integrationslogs">
        <AdminTable<AdminLog>
          rows={logs}
          columns={[
            { key: 'provider', label: 'Provider', render: (row) => row.provider },
            { key: 'action', label: 'Aktion', render: (row) => row.action },
            { key: 'status', label: 'Status', render: (row) => <AdminBadge tone="amber">{row.status}</AdminBadge> },
            { key: 'request', label: 'Request ID', render: (row) => row.requestId },
            { key: 'created', label: 'Zeit', render: (row) => row.createdAt },
          ]}
        />
      </AdminCard>
    </div>
  );
}
