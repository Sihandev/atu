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

  -- Loose validation so obviously bad rows cannot be inserted.
  constraint orders_name_not_blank  check (length(btrim(customer_name)) > 1),
  constraint orders_phone_not_blank check (length(btrim(customer_phone)) >= 8)
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_code_idx       on public.orders (order_code);

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
