export type AdminRole = 'admin' | 'customer';

export type AdminStatusTone = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple';

export type AdminNavItem = {
  label: string;
  href: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: AdminStatusTone;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  invoiceStatus: string;
  total: string;
  totalValue: number;
  createdAt: string;
  createdAtIso: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  family: string;
  status: string;
  variants: Array<{
    size: string;
    id: string;
    sku: string;
    price: string;
    rawPrice: number;
    stock: number;
    lowStockThreshold: number;
    weight: string;
    rawWeight: number;
    active: boolean;
  }>;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  newsletter: string;
  createdAt: string;
};

export type AdminLog = {
  id: string;
  provider: string;
  action: string;
  status: string;
  errorMessage?: string;
  requestId: string;
  createdAt: string;
};

export type AdminDiscount = {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minimumOrderValue: number | null;
  maxUses: number | null;
  usageLimitPerCustomer: number | null;
  usedCount: number;
  active: boolean;
  startsAt: string | null;
  expiresAt: string | null;
};

export type AdminInvoice = {
  id: string;
  orderId: string;
  orderNumber: string;
  provider: string;
  invoiceNumber: string;
  status: string;
  pdfUrl: string;
  errorMessage: string;
  createdAt: string;
};

export type AdminShipment = {
  id: string;
  orderId: string;
  orderNumber: string;
  provider: string;
  trackingNumber: string;
  trackingUrl: string;
  labelUrl: string;
  status: string;
  errorMessage: string;
  createdAt: string;
};

export type AdminSubscriber = {
  id: string;
  email: string;
  status: string;
  consentAt: string;
  createdAt: string;
};

export type AdminShopSettings = {
  shipping_cost: number;
  free_shipping_threshold: number;
  tax_rate: number;
  contact_email: string | null;
  shipper_name: string | null;
  shipper_street: string | null;
  shipper_house_number: string | null;
  shipper_postal_code: string | null;
  shipper_city: string | null;
  shipper_country: string | null;
  legal_company_name: string | null;
  legal_represented_by: string | null;
  legal_street: string | null;
  legal_house_number: string | null;
  legal_postal_code: string | null;
  legal_city: string | null;
  legal_country: string | null;
  legal_vat_id: string | null;
  legal_court: string | null;
  privacy_contact_email: string | null;
};
