import { getSupabase } from "@/lib/supabase";

export const ORDER_STATUSES = [
  "baru",
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
  dikonfirmasi: { label: "Dikonfirmasi", className: "bg-brand/15 text-brand border-brand/30" },
  dijemput: { label: "Dijemput", className: "bg-brand/15 text-brand border-brand/30" },
  dalam_perjalanan: {
    label: "Dalam Perjalanan",
    className: "bg-brand-2/15 text-brand-2 border-brand-2/30",
  },
  tiba: { label: "Tiba di Tujuan", className: "bg-ok/15 text-ok border-ok/30" },
  selesai: { label: "Selesai", className: "bg-ok/20 text-ok border-ok/40" },
  batal: { label: "Batal", className: "bg-ink-3/15 text-ink-3 border-ink-3/30" },
};

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
}

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

export async function createOrder(input: NewOrder): Promise<Order> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .insert({ ...input, order_code: generateOrderCode() })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Order;
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
      "status" | "admin_notes" | "tracking_url" | "tracking_trip_id" | "tracking_connected_at"
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

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
