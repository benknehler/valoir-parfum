'use client';

import { useEffect, useMemo, useState } from 'react';
import { fallbackCustomers, fallbackLogs, fallbackOrders, fallbackProducts } from './data';
import type { AdminCustomer, AdminLog, AdminOrder, AdminProduct } from './types';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../supabase/client';

function currency(value: number | string | null | undefined) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
}

function date(value: string | null | undefined) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function useAdminOrders() {
  const [rows, setRows] = useState<AdminOrder[]>(fallbackOrders);

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
          createdAt: date(order.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return rows;
}

export function useAdminCustomers() {
  const [rows, setRows] = useState<AdminCustomer[]>(fallbackCustomers);

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
  }, []);

  return rows;
}

export function useAdminProducts() {
  const [rows, setRows] = useState<AdminProduct[]>(fallbackProducts);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('products')
        .select('id,name,slug,fragrance_family,status,product_variants(size,sku,price,stock,low_stock_threshold,weight,active)')
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
            size: variant.size,
            sku: variant.sku,
            price: currency(variant.price),
            stock: variant.stock,
            lowStockThreshold: variant.low_stock_threshold,
            weight: `${Number(variant.weight || 0).toLocaleString('de-DE')} kg`,
            active: variant.active,
          })),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return rows;
}

export function useIntegrationLogs() {
  const [rows, setRows] = useState<AdminLog[]>(fallbackLogs);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let active = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase!
        .from('integration_logs')
        .select('id,provider,action,status,request_id,created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!active || !data) return;
      setRows(
        data.map((log: any) => ({
          id: log.id,
          provider: log.provider,
          action: log.action,
          status: log.status,
          requestId: log.request_id || '-',
          createdAt: date(log.created_at),
        }))
      );
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return rows;
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
    const lowStock = products.flatMap((product) => product.variants).filter((variant) => variant.stock <= variant.lowStockThreshold).length;

    return [
      { label: 'Umsatz heute', value: '0,00 €', detail: 'Live-Summe aus bezahlten Tagesbestellungen', tone: 'neutral' as const },
      { label: 'Umsatz diesen Monat', value: '0,00 €', detail: 'Live-Summe aus bezahlten Monatsbestellungen', tone: 'blue' as const },
      { label: 'Offene Bestellungen', value: String(openOrders), detail: 'Neu oder in Bearbeitung', tone: 'amber' as const },
      { label: 'Versandbereit', value: String(ready), detail: 'Label oder Packliste erforderlich', tone: 'purple' as const },
      { label: 'Versendet', value: String(shipped), detail: 'Mit Trackingnummer versehen', tone: 'green' as const },
      { label: 'Retouren', value: String(returns), detail: 'Zur Prüfung markiert', tone: 'red' as const },
      { label: 'Newsletter-Abonnenten', value: String(customers.filter((customer) => customer.newsletter === 'Zugestimmt').length), detail: 'Bestätigte Kontakte', tone: 'green' as const },
      { label: 'Lagerwarnungen', value: String(lowStock), detail: 'Unter Mindestbestand', tone: 'amber' as const },
    ];
  }, [customers, orders, products]);
}
