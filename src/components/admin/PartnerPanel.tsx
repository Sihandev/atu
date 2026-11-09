"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";

import {
  ORDER_STATUSES,
  formatDateTime,
  listPartnerOrders,
  partnerUpdateOrder,
  type OrderStatus,
  type PartnerOrder,
} from "@/lib/orders";
import { extractTripId } from "@/lib/tracking";
import { formatRupiah } from "@/components/admin/QuotationSheet";
import { cn } from "@/lib/utils";

/** What the partner sees. The admin's own labels ("Penawaran Dikirim", etc.)
 *  describe the sales side and mean nothing to the operations side. */
const PARTNER_LABEL: Record<OrderStatus, string> = {
  baru: "Baru",
  diteruskan: "Menunggu harga dari Anda",
  harga_diterima: "Harga terkirim",
  penawaran_dikirim: "Menunggu pelanggan",
  dikonfirmasi: "Deal — siap diproses",
  dijemput: "Dijemput",
  dalam_perjalanan: "Dalam perjalanan",
  tiba: "Tiba di tujuan",
  selesai: "Selesai",
  batal: "Batal",
};

const OPERATIONAL: OrderStatus[] = ["dijemput", "dalam_perjalanan", "tiba", "selesai"];

/** Status moves a partner is allowed to make — mirrors the database function,
 *  which is the real gatekeeper. */
function allowedStatuses(current: OrderStatus): OrderStatus[] {
  if (current === "diteruskan") return [current, "harga_diterima"];
  if (ORDER_STATUSES.indexOf(current) >= ORDER_STATUSES.indexOf("dikonfirmasi")) {
    return [...new Set([current, ...OPERATIONAL])];
  }
  return [current];
}

const inputCls =
  "w-full rounded-xl border border-line-2 bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none";

function Info({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <dt className="font-mono text-label-sm text-ink-3 uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}

function OrderCard({ order, onSaved }: { order: PartnerOrder; onSaved: () => void }) {
  const [open, setOpen] = useState(order.status === "diteruskan");
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [price, setPrice] = useState(order.partner_price?.toString() ?? "");
  const [tracking, setTracking] = useState(order.tracking_url ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = allowedStatuses(order.status);
  const dirty =
    status !== order.status ||
    price !== (order.partner_price?.toString() ?? "") ||
    tracking !== (order.tracking_url ?? "");
  const vehicle = [order.vehicle_brand, order.vehicle_model, order.vehicle_variant, order.vehicle_year]
    .filter(Boolean)
    .join(" ");

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const tripId = tracking.trim() ? extractTripId(tracking) : null;
      if (tracking.trim() && !tripId) {
        throw new Error("Link tracking tidak valid. Paste link lengkap atau ID TRIP-nya.");
      }
      /* Entering a price on a freshly forwarded order is the same thing as
         replying with a price, so move it along without a second click. */
      const nextStatus: OrderStatus =
        order.status === "diteruskan" && status === "diteruskan" && price ? "harga_diterima" : status;
      await partnerUpdateOrder(order.id, {
        status: nextStatus,
        partner_price: price ? Number(price) : null,
        tracking_url: tracking.trim() || null,
        tracking_trip_id: tripId,
      });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="rounded-3xl border border-line bg-surface">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <div className="font-mono text-brand">{order.order_code}</div>
          <div className="mt-1 truncate font-medium text-ink">
            {order.origin} → {order.destination}
          </div>
          <div className="truncate text-sm text-ink-3">{vehicle || order.vehicle_type || "—"}</div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              order.status === "diteruskan"
                ? "border-accent/30 bg-accent/15 text-accent"
                : "border-line-2 text-ink-2"
            )}
          >
            {PARTNER_LABEL[order.status]}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-ink-3 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      {open && (
        <div className="space-y-6 border-t border-line px-5 py-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Info label="Kendaraan" value={vehicle || order.vehicle_type} />
            <Info label="Warna" value={order.vehicle_color} />
            <Info label="Nomor polisi" value={order.vehicle_plate} />
            <Info
              label="Transmisi / BBM"
              value={[order.vehicle_transmission, order.vehicle_fuel].filter(Boolean).join(" / ")}
            />
            <Info label="Kondisi" value={order.running_condition} />
            <Info label="Tanggal diinginkan" value={order.preferred_date} />
            <Info label="Alamat jemput" value={order.pickup_address} />
            <Info label="Alamat antar" value={order.delivery_address} />
            <Info label="Catatan" value={order.notes} />
            <Info label="Diteruskan" value={order.forwarded_at ? formatDateTime(order.forwarded_at) : null} />
          </dl>

          {order.customer_name ? (
            <div className="rounded-2xl border border-ok/30 bg-ok/10 p-4 text-sm">
              <div className="font-mono text-label-sm text-ok uppercase">Kontak pelanggan</div>
              <div className="mt-2 text-ink">
                {order.customer_name} ·{" "}
                <a
                  href={`https://wa.me/${order.customer_phone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline"
                >
                  {order.customer_phone}
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-ink-3">
              Kontak pelanggan akan muncul setelah order deal.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">
                Harga untuk order ini
              </span>
              <div className="flex rounded-xl border border-line-2 bg-bg focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
                <span className="px-4 py-2.5 text-sm font-semibold text-ink-2">Rp</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="min-w-0 flex-1 bg-transparent py-2.5 pr-4 text-sm text-ink outline-none"
                />
              </div>
              {order.partner_price ? (
                <span className="mt-1 block text-xs text-ink-3">
                  Tersimpan: {formatRupiah(order.partner_price)}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                disabled={options.length < 2}
                className={cn(inputCls, "disabled:opacity-60")}
              >
                {options.map((s) => (
                  <option key={s} value={s}>
                    {PARTNER_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">
              Link tracking / Trip ID
            </span>
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="https://alyssaautologistik.up.railway.app/track/TRIP-..."
              className={inputCls}
            />
          </label>

          {error && (
            <p className="rounded-xl border border-err/30 bg-err/10 px-4 py-3 text-sm text-err">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className="u-btn u-btn-primary text-sm disabled:pointer-events-none disabled:opacity-40"
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      )}
    </article>
  );
}

export function PartnerPanel() {
  const [orders, setOrders] = useState<PartnerOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setOrders(await listPartnerOrders());
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Gagal memuat order.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    /* Deferred so the first state update lands after this effect commits. */
    queueMicrotask(() => {
      if (active) void refresh();
    });
    const poll = window.setInterval(() => void refresh(), 30_000);
    return () => {
      active = false;
      window.clearInterval(poll);
    };
  }, [refresh]);

  const waiting = orders.filter((o) => o.status === "diteruskan").length;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-2">
          {waiting > 0 ? `${waiting} order menunggu harga dari Anda.` : "Tidak ada order yang menunggu harga."}
        </p>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand"
          aria-label="Muat ulang"
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
        </button>
      </div>

      {loadError && (
        <p className="mt-6 rounded-2xl border border-err/30 bg-err/10 px-5 py-4 text-sm text-err">
          {loadError}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <OrderCard key={`${o.id}:${o.status}:${o.partner_price}:${o.tracking_url}`} order={o} onSaved={() => void refresh()} />
        ))}
      </div>

      {!loading && !loadError && orders.length === 0 && (
        <p className="py-16 text-center text-ink-3">Belum ada order yang diteruskan.</p>
      )}
    </div>
  );
}
