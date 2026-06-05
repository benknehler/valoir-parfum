alter table public.discount_codes
  add column if not exists usage_limit_per_customer integer check (usage_limit_per_customer is null or usage_limit_per_customer > 0);

create table if not exists public.discount_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  discount_code_id uuid not null references public.discount_codes(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  email text,
  amount numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists discount_code_redemptions_code_idx
  on public.discount_code_redemptions(discount_code_id, created_at desc);
create index if not exists discount_code_redemptions_customer_idx
  on public.discount_code_redemptions(customer_id, discount_code_id);
create index if not exists discount_code_redemptions_email_idx
  on public.discount_code_redemptions(lower(email), discount_code_id);

create unique index if not exists payments_provider_payment_unique
  on public.payments(provider, provider_payment_id)
  where provider_payment_id is not null;

create table if not exists public.shop_settings (
  id boolean primary key default true check (id),
  shipping_cost numeric(12, 2) not null default 4.90,
  free_shipping_threshold numeric(12, 2) not null default 100.00,
  tax_rate numeric(5, 2) not null default 19.00,
  contact_email text,
  shipper_name text,
  shipper_street text,
  shipper_house_number text,
  shipper_postal_code text,
  shipper_city text,
  shipper_country text not null default 'DE',
  legal_company_name text,
  legal_represented_by text,
  legal_street text,
  legal_house_number text,
  legal_postal_code text,
  legal_city text,
  legal_country text not null default 'DE',
  legal_vat_id text,
  legal_court text,
  privacy_contact_email text,
  updated_at timestamptz not null default now()
);

insert into public.shop_settings (id, contact_email)
values (true, 'studio@valoir.parfum')
on conflict (id) do nothing;

alter table public.discount_code_redemptions enable row level security;
alter table public.shop_settings enable row level security;

drop policy if exists "discount_code_redemptions_admin_all" on public.discount_code_redemptions;
create policy "discount_code_redemptions_admin_all"
  on public.discount_code_redemptions for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "discount_code_redemptions_customer_own_select" on public.discount_code_redemptions;
create policy "discount_code_redemptions_customer_own_select"
  on public.discount_code_redemptions for select
  using (
    exists (
      select 1
      from public.customers c
      where c.id = discount_code_redemptions.customer_id
        and c.user_id = auth.uid()
    )
  );

drop policy if exists "shop_settings_admin_all" on public.shop_settings;
create policy "shop_settings_admin_all"
  on public.shop_settings for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "shop_settings_public_read" on public.shop_settings;
create policy "shop_settings_public_read"
  on public.shop_settings for select
  using (true);

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
  if auth.role() in ('anon', 'authenticated') and not public.is_admin() then
    raise exception 'Admin role required';
  end if;

  update public.product_variants
  set stock = greatest(stock + delta, 0)
  where id = variant_id;

  insert into public.inventory_movements (product_variant_id, type, quantity, reason, created_by)
  values (variant_id, movement_type, delta, movement_reason, actor);
end;
$$;

grant usage on schema public to anon, authenticated;
grant select on public.products, public.product_variants, public.discount_codes, public.shop_settings to anon;
grant select, insert, update, delete on
  public.profiles,
  public.customers,
  public.addresses,
  public.products,
  public.product_variants,
  public.orders,
  public.order_items,
  public.payments,
  public.invoices,
  public.shipments,
  public.inventory_movements,
  public.newsletter_subscribers,
  public.newsletter_campaigns,
  public.discount_codes,
  public.discount_code_redemptions,
  public.integration_logs,
  public.audit_logs,
  public.shop_settings
to authenticated;

grant execute on function public.current_user_role() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
revoke execute on function public.apply_inventory_delta(uuid, integer, text, text, uuid) from anon;
grant execute on function public.apply_inventory_delta(uuid, integer, text, text, uuid) to authenticated;
