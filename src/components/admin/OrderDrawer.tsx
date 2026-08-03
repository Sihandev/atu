"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  ORDER_STATUSES,
  STATUS_META,
  formatDateTime,
  updateOrder,
  type Order,
  type OrderStatus,
} from "@/lib/orders";
import { cn } from "@/lib/utils";

function Field({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <dt className="font-mono text-label-sm text-ink-3 uppercase">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}

/**
 * The caller passes `key={order.id}`, so opening a different order remounts
 * this component with fresh initial state. That is why the draft fields can
 * be seeded straight from props instead of being re-synced in an effect.
 */
export function OrderDrawer({
  order,
  onClose,
  onSaved,
}: {
  order: Order | null;
  onClose: () => void;
  onSaved: (order: Order) => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "baru");
  const [adminNotes, setAdminNotes] = useState(order?.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!order) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, onClose]);

  if (!order) return null;

  const dirty = status !== order.status || adminNotes !== (order.admin_notes ?? "");

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateOrder(order.id, { status, admin_notes: adminNotes || null });
      onSaved(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const waLink = `https://wa.me/${order.customer_phone.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Tutup detail"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />

      <aside className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-line bg-surface">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/90 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="font-mono text-label-sm text-ink-3 uppercase">Detail Pesanan</p>
            <h2 className="mt-1 font-display text-2xl font-bold">{order.order_code}</h2>
            <p className="mt-1 text-sm text-ink-2">Masuk {formatDateTime(order.created_at)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-8 px-6 py-6">
          <section>
            <h3 className="mb-4 font-mono text-label-sm text-brand uppercase">Pelanggan</h3>
            <dl className="grid grid-cols-2 gap-5">
              <Field label="Nama" value={order.customer_name} />
              <Field label="WhatsApp" value={order.customer_phone} />
              <Field label="Email" value={order.customer_email} />
            </dl>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-primary mt-5 text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi via WhatsApp
            </a>
          </section>

          <section className="border-t border-line pt-6">
            <h3 className="mb-4 font-mono text-label-sm text-brand uppercase">Pengiriman</h3>
            <dl className="grid grid-cols-2 gap-5">
              <Field label="Asal" value={order.origin} />
              <Field label="Tujuan" value={order.destination} />
              <Field label="Layanan" value={order.service_id} />
              <Field label="Tanggal Diinginkan" value={order.preferred_date} />
              <Field label="Alamat Jemput" value={order.pickup_address} />
              <Field label="Alamat Antar" value={order.delivery_address} />
            </dl>
          </section>

          <section className="border-t border-line pt-6">
            <h3 className="mb-4 font-mono text-label-sm text-brand uppercase">Kendaraan</h3>
            <dl className="grid grid-cols-2 gap-5">
              <Field label="Jenis" value={order.vehicle_type} />
              <Field label="Merek" value={order.vehicle_brand} />
              <Field label="Model" value={order.vehicle_model} />
              <Field label="Tahun" value={order.vehicle_year} />
              <Field label="Kondisi" value={order.running_condition} />
            </dl>
          </section>

          {order.notes && (
            <section className="border-t border-line pt-6">
              <h3 className="mb-3 font-mono text-label-sm text-brand uppercase">
                Catatan Pelanggan
              </h3>
              <p className="leading-relaxed whitespace-pre-wrap text-ink-2">{order.notes}</p>
            </section>
          )}

          <section className="border-t border-line pt-6">
            <h3 className="mb-4 font-mono text-label-sm text-brand uppercase">Status</h3>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    status === s
                      ? STATUS_META[s].className
                      : "border-line-2 text-ink-2 hover:border-brand hover:text-brand"
                  )}
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>

            <label
              htmlFor="admin-notes"
              className="mt-6 mb-2 block font-mono text-label-sm text-ink-3 uppercase"
            >
              Catatan Internal
            </label>
            <textarea
              id="admin-notes"
              rows={4}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Hanya terlihat oleh admin."
              className="w-full rounded-2xl border border-line-2 bg-bg px-4 py-3 text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
            />

            {error && (
              <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </p>
            )}
          </section>
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-line bg-surface/90 px-6 py-4 backdrop-blur-xl">
          <span className="text-sm text-ink-3">
            {dirty ? "Ada perubahan belum disimpan" : `Diperbarui ${formatDateTime(order.updated_at)}`}
          </span>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className="u-btn u-btn-primary text-sm disabled:pointer-events-none disabled:opacity-40"
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
