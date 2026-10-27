"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileText, Link2, MessageCircle, Printer, Send, X } from "lucide-react";
import {
  ORDER_STATUSES,
  STATUS_META,
  formatDateTime,
  updateOrder,
  type Order,
  type OrderStatus,
} from "@/lib/orders";
import { cn } from "@/lib/utils";
import { extractTripId } from "@/lib/tracking";
import {
  formatRupiah,
  QuotationSheet,
  quoteNumber,
} from "@/components/admin/QuotationSheet";

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
  const [trackingUrl, setTrackingUrl] = useState(order?.tracking_url ?? "");
  const [quotedPrice, setQuotedPrice] = useState(order?.quoted_price?.toString() ?? "");
  const [quoteValidUntil, setQuoteValidUntil] = useState(order?.quote_valid_until ?? "");
  const [quotePaymentTerms, setQuotePaymentTerms] = useState(order?.quote_payment_terms ?? "");
  const [quoteNotes, setQuoteNotes] = useState(order?.quote_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!order) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, onClose]);

  if (!order) return null;

  const dirty =
    status !== order.status ||
    adminNotes !== (order.admin_notes ?? "") ||
    trackingUrl !== (order.tracking_url ?? "") ||
    quotedPrice !== (order.quoted_price?.toString() ?? "") ||
    quoteValidUntil !== (order.quote_valid_until ?? "") ||
    quotePaymentTerms !== (order.quote_payment_terms ?? "") ||
    quoteNotes !== (order.quote_notes ?? "");

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const tripId = trackingUrl ? extractTripId(trackingUrl) : null;
      if (trackingUrl && !tripId) {
        throw new Error("Link tracking tidak valid. Paste link Alyssa lengkap atau ID TRIP-nya.");
      }
      const updated = await updateOrder(order.id, {
        status,
        admin_notes: adminNotes || null,
        tracking_url: trackingUrl.trim() || null,
        tracking_trip_id: tripId,
        tracking_connected_at:
          tripId && tripId !== order.tracking_trip_id
            ? new Date().toISOString()
            : tripId
              ? order.tracking_connected_at
              : null,
        quoted_price: quotedPrice ? Number(quotedPrice) : null,
        quote_valid_until: quoteValidUntil || null,
        quote_payment_terms: quotePaymentTerms.trim() || null,
        quote_notes: quoteNotes.trim() || null,
        quote_created_at:
          quotedPrice && (!order.quote_created_at || quotedPrice !== order.quoted_price?.toString())
            ? new Date().toISOString()
            : order.quote_created_at,
      });
      onSaved(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const waLink = `https://wa.me/${order.customer_phone.replace(/\D/g, "")}`;
  const numericPrice = quotedPrice ? Number(quotedPrice) : null;
  const vehicleSummary = [
    order.vehicle_brand,
    order.vehicle_model,
    order.vehicle_variant,
    order.vehicle_year,
  ].filter(Boolean).join(" ");
  const quoteMessage = [
    `Halo ${order.customer_name},`,
    "",
    `Berikut penawaran resmi dari Kirim Mobilku (${quoteNumber(order)}):`,
    `Rute: ${order.origin} → ${order.destination}`,
    `Kendaraan: ${vehicleSummary || order.vehicle_type || "Unit kendaraan"}`,
    `Harga penawaran: ${formatRupiah(numericPrice)}`,
    quoteValidUntil
      ? `Berlaku hingga: ${new Date(`${quoteValidUntil}T00:00:00`).toLocaleDateString("id-ID")}`
      : "",
    quotePaymentTerms ? `Pembayaran: ${quotePaymentTerms}` : "",
    quoteNotes ? `Catatan: ${quoteNotes}` : "",
    "",
    `Nomor pesanan: ${order.order_code}`,
    "Silakan balas pesan ini untuk konfirmasi atau pertanyaan lebih lanjut. Terima kasih.",
  ].filter(Boolean).join("\n");
  const quoteWaLink = `${waLink}?text=${encodeURIComponent(quoteMessage)}`;

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
              <Field label="Varian" value={order.vehicle_variant} />
              <Field label="Warna" value={order.vehicle_color} />
              <Field label="Nomor Polisi" value={order.vehicle_plate} />
              <Field label="Transmisi" value={order.vehicle_transmission} />
              <Field label="Bahan Bakar" value={order.vehicle_fuel} />
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

          <section className="rounded-3xl border border-brand/20 bg-brand/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-mono text-label-sm text-brand uppercase">Penawaran Harga</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Isi harga lalu kirim ringkasannya ke WhatsApp pelanggan atau cetak penawaran A4.
                </p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <FileText className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">Harga Total</span>
                <div className="flex rounded-2xl border border-line-2 bg-surface focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
                  <span className="px-4 py-3 font-semibold text-ink-2">Rp</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={quotedPrice}
                    onChange={(event) => setQuotedPrice(event.target.value)}
                    placeholder="0"
                    className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-ink outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">Berlaku Hingga</span>
                <input
                  type="date"
                  value={quoteValidUntil}
                  onChange={(event) => setQuoteValidUntil(event.target.value)}
                  className="w-full rounded-2xl border border-line-2 bg-surface px-4 py-3 text-ink focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">Ketentuan Pembayaran</span>
              <input
                value={quotePaymentTerms}
                onChange={(event) => setQuotePaymentTerms(event.target.value)}
                placeholder="Contoh: DP 50%, pelunasan sebelum unit diserahkan"
                className="w-full rounded-2xl border border-line-2 bg-surface px-4 py-3 text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-label-sm text-ink-3 uppercase">Catatan Penawaran</span>
              <textarea
                rows={3}
                value={quoteNotes}
                onChange={(event) => setQuoteNotes(event.target.value)}
                placeholder="Yang termasuk dalam harga, asuransi, jadwal, atau ketentuan lain."
                className="w-full rounded-2xl border border-line-2 bg-surface px-4 py-3 text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={quoteWaLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!numericPrice}
                className={cn("u-btn u-btn-primary text-sm", !numericPrice && "pointer-events-none opacity-40")}
              >
                <Send className="h-4 w-4" /> Kirim ke WhatsApp
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                disabled={!numericPrice}
                className="u-btn u-btn-outline text-sm disabled:pointer-events-none disabled:opacity-40"
              >
                <Printer className="h-4 w-4" /> Cetak Penawaran
              </button>
            </div>
          </section>

          <section className="border-t border-line pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-mono text-label-sm text-brand uppercase">
                  Tracking Operasional
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Paste link tracking dari sistem Alyssa. Pelanggan tetap melihatnya lewat website
                  ini menggunakan kode {order.order_code}.
                </p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Link2 className="h-5 w-5" />
              </div>
            </div>

            <label
              htmlFor="tracking-url"
              className="mt-5 mb-2 block font-mono text-label-sm text-ink-3 uppercase"
            >
              Link Alyssa / Trip ID
            </label>
            <input
              id="tracking-url"
              type="text"
              value={trackingUrl}
              onChange={(e) => setTrackingUrl(e.target.value)}
              placeholder="https://alyssaautologistiks.up.railway.app/track/TRIP-..."
              className="w-full rounded-2xl border border-line-2 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
            />
            {extractTripId(trackingUrl) && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-ok/30 bg-ok/10 px-3 py-1 font-mono text-xs text-ok">
                  Terhubung: {extractTripId(trackingUrl)}
                </span>
                {trackingUrl.startsWith("http") && (
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    Buka sumber <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </section>

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
      <QuotationSheet
        order={order}
        price={numericPrice}
        validUntil={quoteValidUntil}
        paymentTerms={quotePaymentTerms}
        notes={quoteNotes}
      />
    </div>
  );
}
