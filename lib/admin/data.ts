import type { AdminCustomer, AdminLog, AdminMetric, AdminNavItem, AdminOrder, AdminProduct } from './types';

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

export const dashboardMetrics: AdminMetric[] = [
  { label: 'Umsatz heute', value: '0,00 €', detail: 'Noch keine bezahlten Bestellungen heute', tone: 'neutral' },
  { label: 'Umsatz diesen Monat', value: '0,00 €', detail: 'Wird aus bezahlten Bestellungen berechnet', tone: 'blue' },
  { label: 'Offene Bestellungen', value: '0', detail: 'Neu oder in Bearbeitung', tone: 'amber' },
  { label: 'Versandbereit', value: '0', detail: 'Label oder Packliste erforderlich', tone: 'purple' },
  { label: 'Versendet', value: '0', detail: 'Mit Trackingnummer versehen', tone: 'green' },
  { label: 'Retouren', value: '0', detail: 'Zur Prüfung markiert', tone: 'red' },
  { label: 'Newsletter-Abonnenten', value: '0', detail: 'Bestätigte Kontakte', tone: 'green' },
  { label: 'Lagerwarnungen', value: '0', detail: 'Unter Mindestbestand', tone: 'amber' },
];

export const fallbackOrders: AdminOrder[] = [
  {
    id: 'setup-order',
    orderNumber: 'Noch keine Bestellung',
    customer: 'Supabase verbinden',
    email: 'admin@valoir.local',
    status: 'Neu',
    paymentStatus: 'Offen',
    shippingStatus: 'Nicht erstellt',
    invoiceStatus: 'Nicht erstellt',
    total: '0,00 €',
    createdAt: 'Setup',
  },
];

export const fallbackProducts: AdminProduct[] = [
  {
    id: 'noir-cerice',
    name: 'Noir Cerice',
    slug: 'noir-cerice',
    family: 'Dunkel. Fruchtig. Rauchig.',
    status: 'Aktiv',
    variants: [
      { size: '50 ml', sku: 'VAL-NC-050', price: '129,00 €', stock: 24, lowStockThreshold: 8, weight: '0,45 kg', active: true },
      { size: '100 ml', sku: 'VAL-NC-100', price: '169,00 €', stock: 18, lowStockThreshold: 6, weight: '0,62 kg', active: true },
    ],
  },
  {
    id: 'luna-solea',
    name: 'Luna Solea',
    slug: 'luna-solea',
    family: 'Golden. Warm. Cremig.',
    status: 'Aktiv',
    variants: [
      { size: '50 ml', sku: 'VAL-LS-050', price: '129,00 €', stock: 26, lowStockThreshold: 8, weight: '0,45 kg', active: true },
      { size: '100 ml', sku: 'VAL-LS-100', price: '169,00 €', stock: 16, lowStockThreshold: 6, weight: '0,62 kg', active: true },
    ],
  },
];

export const fallbackCustomers: AdminCustomer[] = [
  {
    id: 'setup-customer',
    name: 'Noch keine Kundendaten',
    email: 'Supabase Auth und RLS verbinden',
    phone: '-',
    newsletter: 'Nicht bestätigt',
    createdAt: 'Setup',
  },
];

export const fallbackLogs: AdminLog[] = [
  {
    id: 'setup-log',
    provider: 'System',
    action: 'Supabase Projekt verbinden',
    status: 'Offen',
    requestId: '-',
    createdAt: 'Setup',
  },
];

export const orderStatuses = ['Neu', 'Bezahlt', 'In Bearbeitung', 'Versandbereit', 'Versendet', 'Abgeschlossen', 'Storniert', 'Retoure'];

export const integrationCards = [
  { provider: 'sevDesk', status: 'Nicht verbunden', lastSuccess: '-', lastError: 'API-Key fehlt' },
  { provider: 'DHL', status: 'Nicht verbunden', lastSuccess: '-', lastError: 'API-Zugang fehlt' },
  { provider: 'Brevo', status: 'Nicht verbunden', lastSuccess: '-', lastError: 'Listen-ID fehlt' },
  { provider: 'Stripe', status: 'Vorbereitet', lastSuccess: '-', lastError: '-' },
];
