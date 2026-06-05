create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  first_name text,
  last_name text,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  email text not null unique,
  phone text,
  newsletter_consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  type text not null default 'shipping' check (type in ('shipping', 'billing')),
  first_name text not null,
  last_name text not null,
  street text not null,
  house_number text not null,
  postal_code text not null,
  city text not null,
  country text not null default 'DE',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  fragrance_family text,
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  sku text not null unique,
  ean text,
  price numeric(12, 2) not null check (price >= 0),
  tax_rate numeric(5, 2) not null default 19.00,
  stock integer not null default 0 check (stock >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  weight numeric(10, 3) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (product_id, size)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'Neu' check (status in ('Neu', 'Bezahlt', 'In Bearbeitung', 'Versandbereit', 'Versendet', 'Abgeschlossen', 'Storniert', 'Retoure')),
  payment_status text not null default 'Offen',
  shipping_status text not null default 'Nicht erstellt',
  invoice_status text not null default 'Nicht erstellt',
  subtotal numeric(12, 2) not null default 0,
  shipping_cost numeric(12, 2) not null default 0,
  discount_total numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  total_price numeric(12, 2) not null check (total_price >= 0)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  status text not null,
  amount numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'sevdesk',
  provider_invoice_id text,
  invoice_number text,
  pdf_url text,
  status text not null default 'Nicht erstellt',
  error_message text,
  created_at timestamptz not null default now(),
  unique (order_id, provider)
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'dhl',
  tracking_number text,
  tracking_url text,
  label_url text,
  status text not null default 'Nicht erstellt',
  error_message text,
  created_at timestamptz not null default now(),
  unique (order_id, provider)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_variant_id uuid not null references public.product_variants(id) on delete cascade,
  type text not null check (type in ('manual', 'receipt', 'order_paid', 'cancel', 'return', 'correction')),
  quantity integer not null,
  reason text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  brevo_contact_id text,
  double_opt_in_token text,
  consent_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  preview_text text,
  html_content text not null,
  status text not null default 'draft' check (status in ('draft', 'test', 'scheduled', 'sent', 'cancelled')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null check (type in ('percent', 'fixed')),
  value numeric(12, 2) not null check (value > 0),
  minimum_order_value numeric(12, 2),
  max_uses integer,
  used_count integer not null default 0,
  active boolean not null default true,
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.integration_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  action text not null,
  status text not null check (status in ('success', 'error', 'warning', 'info')),
  related_order_id uuid references public.orders(id) on delete set null,
  request_id text,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists customers_user_id_idx on public.customers(user_id);
create index if not exists addresses_customer_id_idx on public.addresses(customer_id);
create index if not exists product_variants_product_id_idx on public.product_variants(product_id);
create index if not exists orders_customer_id_created_at_idx on public.orders(customer_id, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists invoices_order_id_idx on public.invoices(order_id);
create index if not exists shipments_order_id_idx on public.shipments(order_id);
create index if not exists inventory_movements_variant_created_at_idx on public.inventory_movements(product_variant_id, created_at desc);
create index if not exists integration_logs_created_at_idx on public.integration_logs(created_at desc);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where user_id = auth.uid() limit 1;
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.addresses enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.invoices enable row level security;
alter table public.shipments enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_campaigns enable row level security;
alter table public.discount_codes enable row level security;
alter table public.integration_logs enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_admin_all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "profiles_own_select" on public.profiles for select using (user_id = auth.uid());
create policy "profiles_own_update" on public.profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid() and role = 'customer');

create policy "customers_admin_all" on public.customers for all using (public.is_admin()) with check (public.is_admin());
create policy "customers_own_select" on public.customers for select using (user_id = auth.uid());
create policy "customers_own_update" on public.customers for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "addresses_admin_all" on public.addresses for all using (public.is_admin()) with check (public.is_admin());
create policy "addresses_customer_own_select" on public.addresses for select using (
  exists (select 1 from public.customers c where c.id = addresses.customer_id and c.user_id = auth.uid())
);
create policy "addresses_customer_own_write" on public.addresses for all using (
  exists (select 1 from public.customers c where c.id = addresses.customer_id and c.user_id = auth.uid())
) with check (
  exists (select 1 from public.customers c where c.id = addresses.customer_id and c.user_id = auth.uid())
);

create policy "products_public_active_read" on public.products for select using (status = 'active');
create policy "products_admin_all" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "variants_public_active_read" on public.product_variants for select using (
  active = true and exists (select 1 from public.products p where p.id = product_variants.product_id and p.status = 'active')
);
create policy "variants_admin_all" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());

create policy "orders_admin_all" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "orders_customer_own_select" on public.orders for select using (
  exists (select 1 from public.customers c where c.id = orders.customer_id and c.user_id = auth.uid())
);

create policy "order_items_admin_all" on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "order_items_customer_own_select" on public.order_items for select using (
  exists (
    select 1
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where o.id = order_items.order_id and c.user_id = auth.uid()
  )
);

create policy "payments_admin_all" on public.payments for all using (public.is_admin()) with check (public.is_admin());
create policy "payments_customer_own_select" on public.payments for select using (
  exists (
    select 1
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where o.id = payments.order_id and c.user_id = auth.uid()
  )
);

create policy "invoices_admin_all" on public.invoices for all using (public.is_admin()) with check (public.is_admin());
create policy "invoices_customer_own_select" on public.invoices for select using (
  exists (
    select 1
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where o.id = invoices.order_id and c.user_id = auth.uid()
  )
);

create policy "shipments_admin_all" on public.shipments for all using (public.is_admin()) with check (public.is_admin());
create policy "shipments_customer_own_select" on public.shipments for select using (
  exists (
    select 1
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where o.id = shipments.order_id and c.user_id = auth.uid()
  )
);

create policy "inventory_movements_admin_all" on public.inventory_movements for all using (public.is_admin()) with check (public.is_admin());

create policy "newsletter_subscribers_admin_all" on public.newsletter_subscribers for all using (public.is_admin()) with check (public.is_admin());
create policy "newsletter_subscribers_public_pending_insert" on public.newsletter_subscribers for insert with check (status = 'pending');
create policy "newsletter_campaigns_admin_all" on public.newsletter_campaigns for all using (public.is_admin()) with check (public.is_admin());

create policy "discount_codes_admin_all" on public.discount_codes for all using (public.is_admin()) with check (public.is_admin());
create policy "discount_codes_public_active_read" on public.discount_codes for select using (
  active = true
  and (starts_at is null or starts_at <= now())
  and (expires_at is null or expires_at > now())
  and (max_uses is null or used_count < max_uses)
);

create policy "integration_logs_admin_all" on public.integration_logs for all using (public.is_admin()) with check (public.is_admin());
create policy "audit_logs_admin_all" on public.audit_logs for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.apply_inventory_delta(
  variant_id uuid,
  delta integer,
  movement_type text,
  movement_reason text,
  actor uuid default auth.uid()
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.product_variants
  set stock = greatest(stock + delta, 0)
  where id = variant_id;

  insert into public.inventory_movements (product_variant_id, type, quantity, reason, created_by)
  values (variant_id, movement_type, delta, movement_reason, actor);
end;
$$;

create or replace function public.sync_inventory_from_order_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  item record;
begin
  if tg_op = 'UPDATE'
    and old.payment_status is distinct from new.payment_status
    and new.payment_status in ('Bezahlt', 'paid', 'succeeded')
  then
    for item in select variant_id, quantity from public.order_items where order_id = new.id and variant_id is not null loop
      perform public.apply_inventory_delta(item.variant_id, -item.quantity, 'order_paid', 'Bestand durch bezahlte Bestellung reduziert', null);
    end loop;
  end if;

  if tg_op = 'UPDATE'
    and old.status is distinct from new.status
    and new.status in ('Storniert', 'Retoure')
    and old.status not in ('Storniert', 'Retoure')
  then
    for item in select variant_id, quantity from public.order_items where order_id = new.id and variant_id is not null loop
      perform public.apply_inventory_delta(
        item.variant_id,
        item.quantity,
        case when new.status = 'Storniert' then 'cancel' else 'return' end,
        'Bestand durch Storno oder Retoure erhöht',
        null
      );
    end loop;
  end if;

  return new;
end;
$$;

drop trigger if exists orders_sync_inventory on public.orders;
create trigger orders_sync_inventory
after update of payment_status, status on public.orders
for each row execute function public.sync_inventory_from_order_status();

insert into storage.buckets (id, name, public)
values
  ('invoice-pdfs', 'invoice-pdfs', false),
  ('shipping-labels', 'shipping-labels', false),
  ('newsletter-assets', 'newsletter-assets', false)
on conflict (id) do nothing;

create policy "invoice_pdfs_admin_all" on storage.objects for all using (
  bucket_id = 'invoice-pdfs' and public.is_admin()
) with check (
  bucket_id = 'invoice-pdfs' and public.is_admin()
);
create policy "invoice_pdfs_customer_own_read" on storage.objects for select using (
  bucket_id = 'invoice-pdfs' and auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "shipping_labels_admin_all" on storage.objects for all using (
  bucket_id = 'shipping-labels' and public.is_admin()
) with check (
  bucket_id = 'shipping-labels' and public.is_admin()
);
create policy "newsletter_assets_admin_all" on storage.objects for all using (
  bucket_id = 'newsletter-assets' and public.is_admin()
) with check (
  bucket_id = 'newsletter-assets' and public.is_admin()
);

with upserted_products as (
  insert into public.products (name, slug, description, fragrance_family, status)
  values
    ('Noir Cerice', 'noir-cerice', 'Dunkler Kirschduft mit schwarzer Rose, Ebenholz und rauchiger Ambra.', 'Dunkel. Fruchtig. Rauchig.', 'active'),
    ('Luna Solea', 'luna-solea', 'Goldener Duft mit Pfirsich, Mango, Osmanthus und Vanille-Amber.', 'Golden. Warm. Cremig.', 'active')
  on conflict (slug) do update
    set name = excluded.name,
        description = excluded.description,
        fragrance_family = excluded.fragrance_family,
        status = excluded.status
  returning id, slug
)
insert into public.product_variants (product_id, size, sku, ean, price, tax_rate, stock, low_stock_threshold, weight, active)
select p.id, v.size, v.sku, v.ean, v.price, 19.00, v.stock, v.low_stock_threshold, v.weight, true
from upserted_products p
join (
  values
    ('noir-cerice', '50 ml', 'VAL-NC-050', null::text, 129.00::numeric, 24, 8, 0.450::numeric),
    ('noir-cerice', '100 ml', 'VAL-NC-100', null::text, 169.00::numeric, 18, 6, 0.620::numeric),
    ('luna-solea', '50 ml', 'VAL-LS-050', null::text, 129.00::numeric, 26, 8, 0.450::numeric),
    ('luna-solea', '100 ml', 'VAL-LS-100', null::text, 169.00::numeric, 16, 6, 0.620::numeric)
) as v(slug, size, sku, ean, price, stock, low_stock_threshold, weight) on v.slug = p.slug
on conflict (sku) do update
  set price = excluded.price,
      tax_rate = excluded.tax_rate,
      stock = greatest(public.product_variants.stock, excluded.stock),
      low_stock_threshold = excluded.low_stock_threshold,
      weight = excluded.weight,
      active = excluded.active;

insert into public.discount_codes (code, type, value, minimum_order_value, max_uses, active)
values ('WELCOME10', 'percent', 10.00, null, null, true)
on conflict (code) do update
  set type = excluded.type,
      value = excluded.value,
      minimum_order_value = excluded.minimum_order_value,
      max_uses = excluded.max_uses,
      active = excluded.active;
