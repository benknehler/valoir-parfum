export type AdminColumn<TRow> = {
  key: string;
  label: string;
  render: (row: TRow) => React.ReactNode;
};

export default function AdminTable<TRow extends { id: string }>({ columns, rows }: { columns: AdminColumn<TRow>[]; rows: TRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border-b border-slate-200 px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={columns.length}>
                  Keine Einträge vorhanden.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 align-middle text-slate-700">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
