import AdminBadge from './AdminBadge';
import { AdminButton } from './AdminButton';
import AdminCard from './AdminCard';

export default function AdminDiscountsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <AdminCard title="Rabattcode erstellen">
        <form className="grid gap-4">
          <input className="h-11 rounded-xl border border-slate-200 px-3" defaultValue="WELCOME10" aria-label="Code" />
          <select className="h-11 rounded-xl border border-slate-200 px-3" aria-label="Typ">
            <option>Prozent-Rabatt</option>
            <option>Fixbetrag</option>
          </select>
          <input className="h-11 rounded-xl border border-slate-200 px-3" defaultValue="10" aria-label="Wert" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" placeholder="Mindestbestellwert" />
          <input className="h-11 rounded-xl border border-slate-200 px-3" placeholder="Maximale Nutzungen" />
          <AdminButton type="button">Gutschein speichern</AdminButton>
        </form>
      </AdminCard>
      <AdminCard title="Aktive Codes">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-950">WELCOME10</p>
              <p className="mt-1 text-sm text-slate-500">10 % Newsletter-Code · Mindestwert optional</p>
            </div>
            <AdminBadge tone="green">Aktiv</AdminBadge>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
