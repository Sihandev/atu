import { getPublicSupabase, getSupabase } from "@/lib/supabase";

/** Order matches the database enum, which follows the real flow:
 *  intake → forwarded to Alyssa → price back → quote sent → deal → fulfilment. */
export const ORDER_STATUSES = [
  "baru",
  "diteruskan",
  "harga_diterima",
  "penawaran_dikirim",
  "dikonfirmasi",
  "dijemput",
  "dalam_perjalanan",
  "tiba",
  "selesai",
  "batal",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Label + colour per status, so the badge never falls back to a raw enum. */
export const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
  baru: { label: "Baru", className: "bg-accent/15 text-accent border-accent/30" },
  diteruskan: { label: "Diteruskan ke Alyssa", className: "bg-accent/15 text-accent border-accent/30" },
  harga_diterima: { label: "Harga dari Alyssa", className: "bg-accent/15 text-accent border-accent/30" },
  penawaran_dikirim: { label: "Penawaran Dikirim", className: "bg-brand/15 text-brand border-brand/30" },
  dikonfirmasi: { label: "Deal", className: "bg-brand/15 text-brand border-brand/30" },
  dijemput: { label: "Dijemput", className: "bg-brand/15 text-brand border-brand/30" },
  dalam_perjalanan: {
    label: "Dalam Perjalanan",
    className: "bg-brand-2/15 text-brand-2 border-brand-2/30",
  },
  tiba: { label: "Tiba di Tujuan", className: "bg-ok/15 text-ok border-ok/30" },
  selesai: { label: "Selesai", className: "bg-ok/20 text-ok border-ok/40" },
  batal: { label: "Batal", className: "bg-ink-3/15 text-ink-3 border-ink-3/30" },
};

/** Statuses that only make sense to us internally. Customers see the generic
 *  label instead, so the public tracking page never reveals the partner. */
const INTERNAL_STATUSES: readonly OrderStatus[] = [
  "diteruskan",
  "harga_diterima",
  "penawaran_dikirim",
];

export function publicStatusLabel(status: OrderStatus): string {
  if (INTERNAL_STATUSES.includes(status)) return "Pesanan diproses";
  return STATUS_META[status]?.label ?? "Sedang diproses";
}

/** Orders that have reached "deal" or later and not been cancelled — the ones
 *  that count towards revenue. */
export function isDeal(status: OrderStatus): boolean {
  return ORDER_STATUSES.indexOf(status) >= ORDER_STATUSES.indexOf("dikonfirmasi") && status !== "batal";
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_id: string | null;
  origin: string;
  destination: string;
  vehicle_type: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  vehicle_year: number | null;
  vehicle_variant: string | null;
  vehicle_color: string | null;
  vehicle_plate: string | null;
  vehicle_transmission: string | null;
  vehicle_fuel: string | null;
  running_condition: string | null;
  pickup_address: string | null;
  delivery_address: string | null;
  preferred_date: string | null;
  notes: string | null;
  status: OrderStatus;
  admin_notes: string | null;
  tracking_url: string | null;
  tracking_trip_id: string | null;
  tracking_connected_at: string | null;
  quoted_price: number | null;
  quote_valid_until: string | null;
  quote_payment_terms: string | null;
  quote_notes: string | null;
  quote_created_at: string | null;
  /** Harga modal dari Alyssa. */
  partner_price: number | null;
  forwarded_at: string | null;
  customer_paid_at: string | null;
  partner_paid_at: string | null;
}

/** What a partner account may see: no selling price, margin or internal notes. */
export interface PartnerOrder {
  id: string;
  order_code: string;
  created_at: string;
  forwarded_at: string | null;
  status: OrderStatus;
  origin: string;
  destination: string;
  vehicle_type: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  vehicle_year: number | null;
  vehicle_variant: string | null;
  vehicle_color: string | null;
  vehicle_plate: string | null;
  vehicle_transmission: string | null;
  vehicle_fuel: string | null;
  running_condition: string | null;
  pickup_address: string | null;
  delivery_address: string | null;
  preferred_date: string | null;
  notes: string | null;
  partner_price: number | null;
  partner_paid_at: string | null;
  tracking_url: string | null;
  tracking_trip_id: string | null;
  /** Null until the order is a deal. */
  customer_name: string | null;
  customer_phone: string | null;
}

export type StaffRole = "admin" | "partner";

/** Everything the public form is allowed to send. Status and admin_notes are
 *  deliberately absent — the database defaults status to 'baru'. */
export type NewOrder = Pick<
  Order,
  "customer_name" | "customer_phone" | "origin" | "destination"
> &
  Partial<
    Pick<
      Order,
      | "customer_email"
      | "service_id"
      | "vehicle_type"
      | "vehicle_brand"
      | "vehicle_model"
      | "vehicle_year"
      | "vehicle_variant"
      | "vehicle_color"
      | "vehicle_plate"
      | "vehicle_transmission"
      | "vehicle_fuel"
      | "running_condition"
      | "pickup_address"
      | "delivery_address"
      | "preferred_date"
      | "notes"
    >
  >;

/** AAL-XXXX-XXXX, using crypto rather than Math.random so two submissions in
 *  the same millisecond cannot collide on the unique index. */
export function generateOrderCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no I/O/0/1
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => alphabet[b % alphabet.length]);
  return `AAL-${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

export async function createOrder(input: NewOrder): Promise<Pick<Order, "order_code">> {
  const supabase = getPublicSupabase();
  const orderCode = generateOrderCode();
  let { error } = await supabase
    .from("orders")
    .insert({ ...input, order_code: orderCode });

  /* Keep the public form usable during the short window between a Vercel
   * deploy and the one-time database migration. Once the columns exist the
   * first insert succeeds and all detail fields are stored. */
  if (error?.message.includes("column")) {
    const {
      vehicle_variant: _vehicleVariant,
      vehicle_color: _vehicleColor,
      vehicle_plate: _vehiclePlate,
      vehicle_transmission: _vehicleTransmission,
      vehicle_fuel: _vehicleFuel,
      ...compatibleInput
    } = input;
    void [_vehicleVariant, _vehicleColor, _vehiclePlate, _vehicleTransmission, _vehicleFuel];
    ({ error } = await supabase
      .from("orders")
      .insert({ ...compatibleInput, order_code: orderCode }));
  }

  if (error) throw new Error(error.message);
  return { order_code: orderCode };
}

export async function listOrders(): Promise<Order[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Order[];
}

export async function updateOrder(
  id: string,
  patch: Partial<
    Pick<
      Order,
      | "status"
      | "admin_notes"
      | "tracking_url"
      | "tracking_trip_id"
      | "tracking_connected_at"
      | "quoted_price"
      | "quote_valid_until"
      | "quote_payment_terms"
      | "quote_notes"
      | "quote_created_at"
      | "partner_price"
      | "forwarded_at"
      | "customer_paid_at"
      | "partner_paid_at"
    >
  >
): Promise<Order> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Order;
}

/** Role of the signed-in account. Falls back to "admin" when the role
 *  function does not exist yet, so the panel keeps working until
 *  supabase/partner-and-profit.sql has been run. */
export async function getMyRole(): Promise<StaffRole | null> {
  const { data, error } = await getSupabase().rpc("my_role");
  if (error) {
    const missing = error.code === "PGRST202" || error.code === "42883";
    if (missing) return "admin";
    throw new Error(error.message);
  }
  return data === "admin" || data === "partner" ? data : null;
}

export async function listPartnerOrders(): Promise<PartnerOrder[]> {
  const { data, error } = await getSupabase().rpc("partner_list_orders");
  if (error) throw new Error(error.message);
  return (data ?? []) as PartnerOrder[];
}

export async function partnerUpdateOrder(
  id: string,
  patch: {
    status: OrderStatus;
    partner_price: number | null;
    tracking_url: string | null;
    tracking_trip_id: string | null;
  }
): Promise<void> {
  const { error } = await getSupabase().rpc("partner_update_order", {
    p_id: id,
    p_status: patch.status,
    p_partner_price: patch.partner_price,
    p_tracking_url: patch.tracking_url,
    p_tracking_trip_id: patch.tracking_trip_id,
  });
  if (error) throw new Error(error.message);
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
