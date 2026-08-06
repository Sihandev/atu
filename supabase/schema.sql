-- =====================================================================
--  Alyssa Express — order storage & admin access
--  Run this once in the Supabase SQL Editor.
--
--  SECURITY MODEL — read this before changing anything.
--
--  The anon key ships inside the browser bundle. That is expected with
--  Supabase, but it means the frontend can NEVER be the thing that keeps
--  data private. Every guarantee below is enforced here, in the database:
--
--    * anonymous visitors may INSERT an order and nothing else.
--      They cannot read, update or delete — not even their own row.
--    * only signed-in admins may read or modify orders.
--
--  So a visitor can submit the public form, but cannot list other
--  customers' names, phone numbers or addresses.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Order status. Kept as an enum so a typo can never reach the database.
-- ---------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum (
      'baru',            -- just submitted, not yet contacted
      'dikonfirmasi',    -- agreed with the customer
      'dijemput',        -- vehicle picked up
      'dalam_perjalanan',
      'tiba',            -- arrived at destination
      'selesai',
      'batal'
    );
  end if;
end $$;

-- ---------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------
create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- Human-readable reference shown to the customer (AAL-XXXX-XXXX).
  order_code       text not null unique,

  customer_name    text not null,
  customer_phone   text not null,
  customer_email   text,

  service_id       text,
  origin           text not null,
  destination      text not null,

  vehicle_type     text,
  vehicle_brand    text,
  vehicle_model    text,
  vehicle_year     int,
  running_condition text,

  pickup_address   text,
  delivery_address text,
  preferred_date   date,
  notes            text,

  status           order_status not null default 'baru',
  -- Internal only. Never rendered on the public site.
  admin_notes      text,

  -- Admin pastes the provider link once; customers only ever receive the
  -- KirimKendaraan order code. The public RPC below reveals no order data.
  tracking_url          text,
  tracking_trip_id      text,
  tracking_connected_at timestamptz,

  -- Loose validation so obviously bad rows cannot be inserted.
  constraint orders_name_not_blank  check (length(btrim(customer_name)) > 1),
  constraint orders_phone_not_blank check (length(btrim(customer_phone)) >= 8)
);

-- Existing projects also receive the tracking columns when this script is
-- run again; CREATE TABLE IF NOT EXISTS alone would not add them.
alter table public.orders add column if not exists tracking_url text;
alter table public.orders add column if not exists tracking_trip_id text;
alter table public.orders add column if not exists tracking_connected_at timestamptz;

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_code_idx       on public.orders (order_code);
create index if not exists orders_tracking_trip_idx
  on public.orders (tracking_trip_id)
  where tracking_trip_id is not null;

-- Keep updated_at honest instead of trusting the client to send it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- Table privileges
--
-- RLS is only consulted *after* Postgres has checked table-level GRANTs, so
-- policies alone are not enough — without these every request fails with
-- "permission denied for table orders". Granting anon INSERT only (and no
-- SELECT) is itself a second layer of defence: even if an RLS policy were
-- ever loosened by mistake, anon still could not read a row.
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant insert          on public.orders to anon;
grant select, update  on public.orders to authenticated;

-- Note the omissions: anon gets no select/update/delete, and nobody gets
-- delete at all.

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.orders enable row level security;

-- Public form: submit only.
drop policy if exists "anon can submit an order" on public.orders;
create policy "anon can submit an order"
  on public.orders for insert
  to anon
  with check (true);

-- Signed-in staff: full read.
drop policy if exists "admins can read orders" on public.orders;
create policy "admins can read orders"
  on public.orders for select
  to authenticated
  using (true);

-- Signed-in staff: update status and internal notes.
drop policy if exists "admins can update orders" on public.orders;
create policy "admins can update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

-- Deliberately no DELETE policy. Orders are cancelled via the 'batal'
-- status so the record survives; nobody can erase history from the UI.

-- Public tracking lookup. SECURITY DEFINER intentionally bypasses the table
-- SELECT policy, but returns one non-customer field for one exact random code.
create or replace function public.lookup_tracking_trip(p_order_code text)
returns table (tracking_trip_id text)
language sql
security definer
set search_path = public
stable
as $$
  select o.tracking_trip_id
  from public.orders as o
  where upper(o.order_code) = upper(btrim(p_order_code))
    and o.tracking_trip_id is not null
    and o.status <> 'batal'
  limit 1;
$$;

revoke all on function public.lookup_tracking_trip(text) from public;
grant execute on function public.lookup_tracking_trip(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Creating the admin account
-- ---------------------------------------------------------------------
--  Supabase Dashboard → Authentication → Users → "Add user"
--  Enter the admin email + password and tick "Auto Confirm User".
--
--  Then turn OFF public sign-up so nobody can register themselves into
--  the admin panel:
--  Authentication → Providers → Email → disable "Enable sign ups".
--
--  Any confirmed user can read orders, which is why sign-up must be off.
-- ---------------------------------------------------------------------
