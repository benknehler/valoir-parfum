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
  createdAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  family: string;
  status: string;
  variants: Array<{
    size: string;
    sku: string;
    price: string;
    stock: number;
    lowStockThreshold: number;
    weight: string;
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
  requestId: string;
  createdAt: string;
};
