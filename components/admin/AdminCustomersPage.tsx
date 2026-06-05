'use client';

import { useMemo, useState } from 'react';
import AdminBadge from './AdminBadge';
import AdminCard from './AdminCard';
import AdminFilters from './AdminFilters';
import AdminTable from './AdminTable';
import type { AdminCustomer } from '../../lib/admin/types';
import { useAdminCustomers } from '../../lib/admin/useAdminData';

export default function AdminCustomersPage() {
  const customers = useAdminCustomers();
  const [search, setSearch] = useState('');
  const rows = useMemo(
    () => customers.filter((customer) => `${customer.name} ${customer.email}`.toLowerCase().includes(search.toLowerCase())),
    [customers, search]
  );

  return (
    <AdminCard title="Kunden">
      <div className="grid gap-5">
        <AdminFilters search={search} onSearch={setSearch} />
        <AdminTable<AdminCustomer>
          rows={rows}
          columns={[
            { key: 'name', label: 'Name', render: (row) => <span className="font-semibold text-slate-950">{row.name}</span> },
            { key: 'email', label: 'E-Mail', render: (row) => row.email },
            { key: 'phone', label: 'Telefon', render: (row) => row.phone },
            { key: 'newsletter', label: 'Newsletter', render: (row) => <AdminBadge tone="neutral">{row.newsletter}</AdminBadge> },
            { key: 'created', label: 'Erstellt', render: (row) => row.createdAt },
          ]}
        />
      </div>
    </AdminCard>
  );
}
