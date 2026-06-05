import AdminCard from './AdminCard';

const groups = [
  ['Absenderadresse', 'Wird für DHL-Labels verwendet.'],
  ['Steuersätze', 'Standard: 19 % für Parfumvarianten.'],
  ['Rechnungsnummern', 'sevDesk ist führend, lokale IDs werden gespeichert.'],
  ['Audit Logs', 'Admin-Aktionen werden revisionssicher protokolliert.'],
];

export default function AdminSettingsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map(([title, text]) => (
        <AdminCard key={title} title={title}>
          <p className="text-sm leading-6 text-slate-600">{text}</p>
        </AdminCard>
      ))}
    </div>
  );
}
