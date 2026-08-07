-- Alyssa Express — vehicle detail and quotation upgrade
-- Safe to run repeatedly in Supabase Dashboard > SQL Editor.

alter table public.orders add column if not exists vehicle_variant text;
alter table public.orders add column if not exists vehicle_color text;
alter table public.orders add column if not exists vehicle_plate text;
alter table public.orders add column if not exists vehicle_transmission text;
alter table public.orders add column if not exists vehicle_fuel text;

alter table public.orders add column if not exists quoted_price numeric(14,2);
alter table public.orders add column if not exists quote_valid_until date;
alter table public.orders add column if not exists quote_payment_terms text;
alter table public.orders add column if not exists quote_notes text;
alter table public.orders add column if not exists quote_created_at timestamptz;

grant insert on public.orders to anon;
grant select, update on public.orders to authenticated;
