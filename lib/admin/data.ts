import type { AdminNavItem } from './types';

export const adminNav: AdminNavItem[] = [
  { label: 'Übersicht', href: '/admin' },
  { label: 'Bestellungen', href: '/admin/bestellungen' },
  { label: 'Kunden', href: '/admin/kunden' },
  { label: 'Produkte', href: '/admin/produkte' },
  { label: 'Lagerbestand', href: '/admin/lagerbestand' },
  { label: 'Rechnungen', href: '/admin/rechnungen' },
  { label: 'Versand', href: '/admin/versand' },
  { label: 'Newsletter', href: '/admin/newsletter' },
  { label: 'Gutscheine', href: '/admin/gutscheine' },
  { label: 'Integrationen', href: '/admin/integrationen' },
  { label: 'Einstellungen', href: '/admin/einstellungen' },
];

export const orderStatuses = ['Neu', 'Bezahlt', 'In Bearbeitung', 'Versandbereit', 'Versendet', 'Abgeschlossen', 'Storniert', 'Retoure'];

export const integrationCards = [
  { provider: 'sevDesk', functionName: 'create-sevdesk-invoice' },
  { provider: 'DHL', functionName: 'create-dhl-label' },
  { provider: 'Brevo', functionName: 'send-brevo-campaign' },
  { provider: 'Stripe', functionName: 'create-stripe-checkout' },
];
