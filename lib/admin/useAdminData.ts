'use client';

import { useEffect, useMemo, useState } from 'react';
import type {
  AdminCustomer,
  AdminDiscount,
  AdminInvoice,
  AdminLog,
  AdminOrder,
  AdminProduct,
  AdminShipment,
  AdminShopSettings,
  AdminSubscriber,
} from './types';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../supabase/client';

function currency(value: number | string | null | undefined) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
}

function date(value: string | null | undefined) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function useAdminOrders(refreshKey = 0) {
  const [rows, setRows] = useState<AdminOrder[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('orders')
        .select('id,order_number,status,payment_status,shipping_status,invoice_status,total,created_at,customers(email)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!active || !data) return;
      setRows(
        data.map((order: any) => ({
          id: order.id,
          orderNumber: order.order_number,
          customer: order.customers?.email || 'Gastkunde',
          email: order.customers?.email || '-',
          status: order.status,
          paymentStatus: order.payment_status,
          shippingStatus: order.shipping_status,
          invoiceStatus: order.invoice_status,
          total: currency(order.total),
          totalValue: Number(order.total || 0),
          createdAt: date(order.created_at),
          createdAtIso: order.created_at,
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminCustomers(refreshKey = 0) {
  const [rows, setRows] = useState<AdminCustomer[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('customers')
        .select('id,email,phone,newsletter_consent,created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((customer: any) => ({
          id: customer.id,
          name: customer.email,
          email: customer.email,
          phone: customer.phone || '-',
          newsletter: customer.newsletter_consent ? 'Zugestimmt' : 'Nicht bestätigt',
          createdAt: date(customer.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminProducts(refreshKey = 0) {
  const [rows, setRows] = useState<AdminProduct[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('products')
        .select('id,name,slug,fragrance_family,status,product_variants(id,size,sku,price,stock,low_stock_threshold,weight,active)')
        .order('created_at', { ascending: true });

      if (!active || !data) return;
      setRows(
        data.map((product: any) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
            family: product.fragrance_family || '-',
            status: product.status === 'active' ? 'Aktiv' : product.status,
            variants: (product.product_variants || []).map((variant: any) => ({
              id: variant.id,
              size: variant.size,
              sku: variant.sku,
              price: currency(variant.price),
              rawPrice: Number(variant.price || 0),
              stock: variant.stock,
              lowStockThreshold: variant.low_stock_threshold,
              weight: `${Number(variant.weight || 0).toLocaleString('de-DE')} kg`,
              rawWeight: Number(variant.weight || 0),
              active: variant.active,
            })),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useIntegrationLogs(refreshKey = 0) {
  const [rows, setRows] = useState<AdminLog[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('integration_logs')
        .select('id,provider,action,status,request_id,error_message,created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((log: any) => ({
          id: log.id,
          provider: log.provider,
          action: log.action,
          status: log.status,
          errorMessage: log.error_message || '',
          requestId: log.request_id || '-',
          createdAt: date(log.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminDiscounts(refreshKey = 0) {
  const [rows, setRows] = useState<AdminDiscount[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('discount_codes')
        .select('id,code,type,value,minimum_order_value,max_uses,usage_limit_per_customer,used_count,active,starts_at,expires_at')
        .order('created_at', { ascending: false });

      if (!active || !data) return;
      setRows(
        data.map((discount: any) => ({
          id: discount.id,
          code: discount.code,
          type: discount.type,
          value: Number(discount.value || 0),
          minimumOrderValue: discount.minimum_order_value === null ? null : Number(discount.minimum_order_value),
          maxUses: discount.max_uses,
          usageLimitPerCustomer: discount.usage_limit_per_customer,
          usedCount: discount.used_count,
          active: discount.active,
          startsAt: discount.starts_at,
          expiresAt: discount.expires_at,
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminInvoices(refreshKey = 0) {
  const [rows, setRows] = useState<AdminInvoice[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('invoices')
        .select('id,order_id,provider,invoice_number,pdf_url,status,error_message,created_at,orders(order_number)')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((invoice: any) => ({
          id: invoice.id,
          orderId: invoice.order_id,
          orderNumber: invoice.orders?.order_number || '-',
          provider: invoice.provider,
          invoiceNumber: invoice.invoice_number || '-',
          pdfUrl: invoice.pdf_url || '-',
          status: invoice.status,
          errorMessage: invoice.error_message || '',
          createdAt: date(invoice.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminShipments(refreshKey = 0) {
  const [rows, setRows] = useState<AdminShipment[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('shipments')
        .select('id,order_id,provider,tracking_number,tracking_url,label_url,status,error_message,created_at,orders(order_number)')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((shipment: any) => ({
          id: shipment.id,
          orderId: shipment.order_id,
          orderNumber: shipment.orders?.order_number || '-',
          provider: shipment.provider,
          trackingNumber: shipment.tracking_number || '-',
          trackingUrl: shipment.tracking_url || '',
          labelUrl: shipment.label_url || '-',
          status: shipment.status,
          errorMessage: shipment.error_message || '',
          createdAt: date(shipment.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminSubscribers(refreshKey = 0) {
  const [rows, setRows] = useState<AdminSubscriber[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('newsletter_subscribers')
        .select('id,email,status,consent_at,created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((subscriber: any) => ({
          id: subscriber.id,
          email: subscriber.email,
          status: subscriber.status,
          consentAt: date(subscriber.consent_at),
          createdAt: date(subscriber.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return rows;
}

export function useAdminSettings(refreshKey = 0) {
  const [settings, setSettings] = useState<AdminShopSettings | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!.from('shop_settings').select('*').eq('id', true).maybeSingle();
      if (active && data) setSettings(data as AdminShopSettings);
    }

    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return settings;
}

export function useDashboardMetrics() {
  const orders = useAdminOrders();
  const products = useAdminProducts();
  const customers = useAdminCustomers();

  return useMemo(() => {
    const openOrders = orders.filter((order) => ['Neu', 'Bezahlt', 'In Bearbeitung'].includes(order.status)).length;
    const ready = orders.filter((order) => order.status === 'Versandbereit').length;
    const shipped = orders.filter((order) => order.status === 'Versendet').length;
    const returns = orders.filter((order) => order.status === 'Retoure').length;
    const today = new Date();
    const paidOrders = orders.filter((order) => order.paymentStatus === 'Bezahlt');
    const todayRevenue = paidOrders
      .filter((order) => {
        const createdAt = new Date(order.createdAtIso);
        return (
          createdAt.getFullYear() === today.getFullYear() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getDate() === today.getDate()
        );
      })
      .reduce((sum, order) => sum + order.totalValue, 0);
    const monthRevenue = paidOrders
      .filter((order) => {
        const createdAt = new Date(order.createdAtIso);
        return createdAt.getFullYear() === today.getFullYear() && createdAt.getMonth() === today.getMonth();
      })
      .reduce((sum, order) => sum + order.totalValue, 0);
    const lowStock = products.flatMap((product) => product.variants).filter((variant) => variant.stock <= variant.lowStockThreshold).length;

    return [
      { label: 'Umsatz heute', value: currency(todayRevenue), detail: 'Bezahlte Tagesbestellungen', tone: 'neutral' as const },
      { label: 'Umsatz diesen Monat', value: currency(monthRevenue), detail: 'Bezahlte Monatsbestellungen', tone: 'blue' as const },
      { label: 'Offene Bestellungen', value: String(openOrders), detail: 'Neu oder in Bearbeitung', tone: 'amber' as const },
      { label: 'Versandbereit', value: String(ready), detail: 'Label oder Packliste erforderlich', tone: 'purple' as const },
      { label: 'Versendet', value: String(shipped), detail: 'Mit Trackingnummer versehen', tone: 'green' as const },
      { label: 'Retouren', value: String(returns), detail: 'Zur Prüfung markiert', tone: 'red' as const },
      { label: 'Newsletter-Abonnenten', value: String(customers.filter((customer) => customer.newsletter === 'Zugestimmt').length), detail: 'Bestätigte Kontakte', tone: 'green' as const },
      { label: 'Lagerwarnungen', value: String(lowStock), detail: 'Unter Mindestbestand', tone: 'amber' as const },
    ];
  }, [customers, orders, products]);
}
