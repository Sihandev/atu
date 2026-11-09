-- =====================================================================
--  Kirim Mobilku — alur "depan & belakang" dengan Alyssa Auto Logistik
--  Jalankan SEKALI di Supabase Dashboard > SQL Editor, SETELAH schema.sql
--  dan quotation-and-vehicle-details.sql. Aman dijalankan ulang.
--
--  Isi:
--    1. Status baru: diteruskan, harga_diterima, penawaran_dikirim
--    2. Kolom harga modal (dari Alyssa), waktu diteruskan, dan status bayar
--    3. Peran akun: 'admin' (kamu) dan 'partner' (Alyssa)
--    4. Fungsi khusus partner — partner TIDAK bisa membaca tabel orders,
--       jadi harga jual, margin, dan catatan internal kamu tidak terlihat.
--
--  URUTAN YANG AMAN
--    a. Jalankan file ini dulu. Semua akun yang sudah ada saat ini otomatis
--       jadi 'admin' (supaya kamu tidak terkunci).
--    b. Baru buat akun papa di Authentication > Users (Auto Confirm User).
--    c. Jalankan satu baris di bawah (bagian "Menambah akun partner").
--
--  Kalau muncul error "unsafe use of new value of enum type" (55P04),
--  jalankan tiga baris ALTER TYPE di bagian 1 sendirian lebih dulu, lalu
--  jalankan sisa file ini.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Status baru. Disisipkan sebelum 'dikonfirmasi' supaya urutan enum
--    mengikuti urutan alur: baru → diteruskan → harga_diterima →
--    penawaran_dikirim → dikonfirmasi → dijemput → ... → selesai.
-- ---------------------------------------------------------------------
alter type order_status add value if not exists 'diteruskan'        before 'dikonfirmasi';
alter type order_status add value if not exists 'harga_diterima'    before 'dikonfirmasi';
alter type order_status add value if not exists 'penawaran_dikirim' before 'dikonfirmasi';

-- ---------------------------------------------------------------------
-- 2. Kolom baru di orders
-- ---------------------------------------------------------------------
alter table public.orders add column if not exists partner_price    numeric(14,2); -- harga modal dari Alyssa
alter table public.orders add column if not exists forwarded_at     timestamptz;   -- kapan diteruskan ke Alyssa
alter table public.orders add column if not exists customer_paid_at timestamptz;   -- pelanggan sudah bayar
alter table public.orders add column if not exists partner_paid_at  timestamptz;   -- Alyssa sudah dibayar

-- ---------------------------------------------------------------------
-- 3. Peran akun. Tabel ini tidak bisa dibaca langsung dari browser;
--    hanya lewat fungsi di bawah.
-- ---------------------------------------------------------------------
create table if not exists public.staff_roles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  role       text not null check (role in ('admin', 'partner')),
  created_at timestamptz not null default now()
);

alter table public.staff_roles enable row level security;
revoke all on public.staff_roles from anon, authenticated;

-- Semua akun yang sudah ada sekarang = admin, supaya tidak ada yang terkunci.
insert into public.staff_roles (user_id, role)
select id, 'admin' from auth.users
on conflict (user_id) do nothing;

create or replace function public.my_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.staff_roles where user_id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.staff_roles where user_id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.my_role()  from public, anon;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.my_role()  to authenticated;
grant execute on function public.is_admin() to authenticated;

-- Tabel orders: sekarang hanya 'admin' yang boleh baca / ubah langsung.
-- (Sebelumnya semua akun yang login boleh — itu kenapa sign-up harus mati.)
drop policy if exists "admins can read orders" on public.orders;
create policy "admins can read orders"
  on public.orders for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins can update orders" on public.orders;
create policy "admins can update orders"
  on public.orders for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 4. Fungsi untuk partner (Alyssa).
--    plpgsql sengaja dipakai (bukan sql) karena fungsi ini memakai nilai
--    enum yang baru ditambahkan di atas.
-- ---------------------------------------------------------------------

-- Daftar order yang sudah diteruskan. Harga jual, margin, penawaran, dan
-- catatan internal TIDAK ikut. Nama & nomor pelanggan baru dibuka setelah
-- deal, karena baru saat itu partner butuh menghubungi pelanggan.
create or replace function public.partner_list_orders()
returns table (
  id uuid,
  order_code text,
  created_at timestamptz,
  forwarded_at timestamptz,
  status text,
  origin text,
  destination text,
  vehicle_type text,
  vehicle_brand text,
  vehicle_model text,
  vehicle_year int,
  vehicle_variant text,
  vehicle_color text,
  vehicle_plate text,
  vehicle_transmission text,
  vehicle_fuel text,
  running_condition text,
  pickup_address text,
  delivery_address text,
  preferred_date date,
  notes text,
  partner_price numeric,
  partner_paid_at timestamptz,
  tracking_url text,
  tracking_trip_id text,
  customer_name text,
  customer_phone text
)
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  if coalesce((select s.role from public.staff_roles s where s.user_id = auth.uid()), '')
       not in ('partner', 'admin') then
    raise exception 'Tidak punya akses' using errcode = '42501';
  end if;

  return query
  select
    o.id, o.order_code, o.created_at, o.forwarded_at, o.status::text,
    o.origin, o.destination,
    o.vehicle_type, o.vehicle_brand, o.vehicle_model, o.vehicle_year,
    o.vehicle_variant, o.vehicle_color, o.vehicle_plate,
    o.vehicle_transmission, o.vehicle_fuel, o.running_condition,
    o.pickup_address, o.delivery_address, o.preferred_date, o.notes,
    o.partner_price, o.partner_paid_at, o.tracking_url, o.tracking_trip_id,
    case when o.status >= 'dikonfirmasi' then o.customer_name  end,
    case when o.status >= 'dikonfirmasi' then o.customer_phone end
  from public.orders o
  where o.status >= 'diteruskan'
    and o.status <> 'batal'
  order by o.created_at desc;
end $$;

-- Partner hanya boleh mengubah: status operasional, harga modal, dan
-- link tracking. Alur status dijaga di sini, bukan di frontend.
create or replace function public.partner_update_order(
  p_id uuid,
  p_status text,
  p_partner_price numeric,
  p_tracking_url text,
  p_tracking_trip_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  cur order_status;
  nxt order_status;
begin
  if coalesce((select s.role from public.staff_roles s where s.user_id = auth.uid()), '')
       not in ('partner', 'admin') then
    raise exception 'Tidak punya akses' using errcode = '42501';
  end if;

  select o.status into cur from public.orders o where o.id = p_id;
  if not found or cur = 'batal' or cur < 'diteruskan' then
    raise exception 'Pesanan tidak tersedia' using errcode = '42501';
  end if;

  nxt := cur;
  if p_status is not null and p_status <> cur::text then
    nxt := p_status::order_status;
    if nxt = 'harga_diterima' then
      if cur <> 'diteruskan' then
        raise exception 'Harga hanya bisa dikirim untuk order yang baru diteruskan';
      end if;
    elsif nxt in ('dijemput', 'dalam_perjalanan', 'tiba', 'selesai') then
      if cur < 'dikonfirmasi' then
        raise exception 'Order belum deal, belum bisa diproses';
      end if;
    else
      raise exception 'Status tidak diizinkan untuk partner';
    end if;
  end if;

  update public.orders o
  set status = nxt,
      partner_price = p_partner_price,
      tracking_url = nullif(btrim(p_tracking_url), ''),
      tracking_trip_id = nullif(btrim(p_tracking_trip_id), ''),
      tracking_connected_at = case
        when nullif(btrim(p_tracking_trip_id), '') is null then null
        when p_tracking_trip_id is distinct from o.tracking_trip_id then now()
        else o.tracking_connected_at
      end
  where o.id = p_id;
end $$;

revoke all on function public.partner_list_orders() from public, anon;
revoke all on function public.partner_update_order(uuid, text, numeric, text, text) from public, anon;
grant execute on function public.partner_list_orders() to authenticated;
grant execute on function public.partner_update_order(uuid, text, numeric, text, text) to authenticated;

-- ---------------------------------------------------------------------
-- Menambah akun partner (jalankan setelah akun papa dibuat di
-- Authentication > Users). Ganti emailnya:
--
--   insert into public.staff_roles (user_id, role)
--   select id, 'partner' from auth.users where email = 'email-papa@contoh.com'
--   on conflict (user_id) do update set role = 'partner';
--
-- Akun tanpa baris di staff_roles tidak punya akses apa pun.
-- ---------------------------------------------------------------------
