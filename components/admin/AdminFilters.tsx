import { Search } from 'lucide-react';

export default function AdminFilters({
  search,
  onSearch,
  status,
  onStatus,
  statuses = [],
}: {
  search: string;
  onSearch: (value: string) => void;
  status?: string;
  onStatus?: (value: string) => void;
  statuses?: string[];
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full sm:max-w-sm">
        <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <span className="sr-only">Suchen</span>
        <input
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-500"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Suchen"
        />
      </label>
      {statuses.length > 0 && onStatus && (
        <select
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-500"
          value={status}
          onChange={(event) => onStatus(event.target.value)}
        >
          <option value="Alle">Alle Status</option>
          {statuses.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
