import { brand } from "@/config/data";
import { formatDateTime, type Order } from "@/lib/orders";

export function formatRupiah(value: number | null): string {
  if (!value) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function quoteNumber(order: Order): string {
  return `PEN-${order.order_code.replace(/^AAL-/, "")}`;
}

export function QuotationSheet({
  order,
  price,
  validUntil,
  paymentTerms,
  notes,
}: {
  order: Order;
  price: number | null;
  validUntil: string;
  paymentTerms: string;
  notes: string;
}) {
  const vehicle = [
    order.vehicle_brand,
    order.vehicle_model,
    order.vehicle_variant,
    order.vehicle_year,
  ].filter(Boolean).join(" ");

  return (
    <article className="quotation-print-root" aria-hidden="true">
      <div className="quote-accent" />
      <div className="quote-page">
        <header className="quote-header">
          <div>
            <p className="quote-brand">{brand.name}</p>
            <p className="quote-legal">{brand.legalName}</p>
          </div>
          <div className="quote-company-contact">
            <p>{brand.address}</p>
            <p>{brand.phone}</p>
          </div>
        </header>

        <div className="quote-title-row">
          <div>
            <p className="quote-eyebrow">PENAWARAN HARGA</p>
            <h1>Pengiriman Kendaraan</h1>
          </div>
          <dl className="quote-meta">
            <div><dt>Nomor</dt><dd>{quoteNumber(order)}</dd></div>
            <div><dt>Tanggal</dt><dd>{new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</dd></div>
            <div><dt>Berlaku hingga</dt><dd>{validUntil ? new Date(`${validUntil}T00:00:00`).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—"}</dd></div>
          </dl>
        </div>

        <section className="quote-customer">
          <p className="quote-section-label">DITUJUKAN KEPADA</p>
          <h2>{order.customer_name}</h2>
          <p>{order.customer_phone}{order.customer_email ? ` · ${order.customer_email}` : ""}</p>
        </section>

        <section className="quote-service-card">
          <div>
            <p className="quote-section-label">RUTE PENGIRIMAN</p>
            <h3>{order.origin} <span>→</span> {order.destination}</h3>
            <p>{order.pickup_address || "Lokasi penjemputan dikonfirmasi kemudian"}</p>
            <p>{order.delivery_address || "Lokasi pengantaran dikonfirmasi kemudian"}</p>
          </div>
          <div>
            <p className="quote-section-label">KENDARAAN</p>
            <h3>{vehicle || order.vehicle_type || "Unit kendaraan"}</h3>
            <p>{[order.vehicle_color, order.vehicle_plate, order.running_condition].filter(Boolean).join(" · ")}</p>
            <p>{order.service_id || "Metode pengiriman menyesuaikan kebutuhan"}</p>
          </div>
        </section>

        <section className="quote-price">
          <div>
            <p className="quote-section-label">TOTAL PENAWARAN</p>
            <p>Biaya pengiriman sesuai detail di atas</p>
          </div>
          <strong>{formatRupiah(price)}</strong>
        </section>

        <section className="quote-terms">
          <div>
            <p className="quote-section-label">KETENTUAN PEMBAYARAN</p>
            <p>{paymentTerms || "Pembayaran dan jadwal pengiriman dikonfirmasi bersama pelanggan."}</p>
          </div>
          {notes && <div><p className="quote-section-label">CATATAN PENAWARAN</p><p>{notes}</p></div>}
        </section>

        <footer className="quote-footer">
          <div>
            <p>Terima kasih atas kepercayaan Anda kepada {brand.name}.</p>
            <small>Referensi pesanan: {order.order_code} · Dibuat {formatDateTime(new Date().toISOString())}</small>
          </div>
          <div className="quote-signature">
            <p>Hormat kami,</p>
            <div className="quote-sign-line" />
            <strong>{brand.legalName}</strong>
          </div>
        </footer>
      </div>
    </article>
  );
}
