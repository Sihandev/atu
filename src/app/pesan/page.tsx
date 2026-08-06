"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, MessageCircle, PackageCheck } from "lucide-react";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { createOrder, type NewOrder } from "@/lib/orders";
import { isSupabaseConfigured } from "@/lib/supabase";
import { brand, servicesList } from "@/config/data";

const field =
  "w-full rounded-xl border border-line-2 bg-surface px-4 py-3 text-ink placeholder:text-ink-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none";
const labelCls = "mb-2 block font-mono text-label-sm text-ink-3 uppercase";

export default function OrderPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const text = (key: string) => {
      const value = form.get(key);
      const trimmed = typeof value === "string" ? value.trim() : "";
      return trimmed === "" ? undefined : trimmed;
    };
    const year = text("vehicle_year");

    const payload: NewOrder = {
      customer_name: text("customer_name")!,
      customer_phone: text("customer_phone")!,
      origin: text("origin")!,
      destination: text("destination")!,
      customer_email: text("customer_email"),
      service_id: text("service_id"),
      vehicle_type: text("vehicle_type"),
      vehicle_brand: text("vehicle_brand"),
      vehicle_model: text("vehicle_model"),
      vehicle_year: year ? Number(year) : undefined,
      running_condition: text("running_condition"),
      pickup_address: text("pickup_address"),
      delivery_address: text("delivery_address"),
      preferred_date: text("preferred_date"),
      notes: text("notes"),
    };

    try {
      const order = await createOrder(payload);
      setOrderCode(order.order_code);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Pesanan gagal dikirim. Silakan coba lagi atau hubungi kami via WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const wa = `https://wa.me/${brand.phone.replace(/\D/g, "")}`;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[900px] px-6 pt-32 pb-24 md:px-10">
        {orderCode ? (
          <div className="glass overflow-hidden rounded-3xl text-center">
            <div className="bg-grad-ink px-8 py-10 text-white md:px-12">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-grad-brand">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em]">
              Pesanan diterima
            </h1>
            <p className="mt-4 text-white/65">
              Data pesanan sudah masuk ke admin. Tim kami akan memeriksa detail dan menghubungi
              Anda melalui WhatsApp.
            </p>
            <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-left backdrop-blur-xl">
              <div>
                <p className="font-mono text-label-sm text-white/45 uppercase">Nomor resi</p>
                <p className="mt-1 font-mono text-xl tracking-wider text-accent-2">{orderCode}</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(orderCode);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                }}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Salin nomor resi"
              >
                {copied ? <Check className="h-4 w-4 text-ok" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            </div>

            <div className="px-8 py-8 md:px-12">
              <div className="mx-auto flex max-w-md items-start gap-4 rounded-2xl border border-accent/25 bg-accent/8 p-4 text-left">
                <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display font-bold text-ink">Status: Sedang diproses</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    Pesanan menunggu konfirmasi admin. Perubahan status dapat dilihat menggunakan
                    resi di atas.
                  </p>
                </div>
              </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={wa} className="u-btn u-btn-primary" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Konfirmasi via WhatsApp
              </a>
              <Link href={`/tracking?resi=${encodeURIComponent(orderCode)}`} className="u-btn u-btn-outline">
                Lihat Status Pesanan
              </Link>
            </div>
            </div>
          </div>
        ) : (
          <>
            <span className="kicker mb-5">Formulir Pemesanan</span>
            <h1 className="font-display text-headline-lg">
              Ceritakan kendaraan <span className="text-gradient">dan tujuan Anda.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              Isi data di bawah, kami hitung metode dan estimasi biayanya, lalu menghubungi Anda
              lewat WhatsApp.
            </p>

            {!isSupabaseConfigured && (
              <p className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-ink">
                Penyimpanan pesanan belum dikonfigurasi, jadi formulir ini belum bisa dikirim.
                Sementara ini silakan{" "}
                <a href={wa} className="font-semibold text-brand underline">
                  hubungi kami via WhatsApp
                </a>
                .
              </p>
            )}

            <form onSubmit={onSubmit} className="mt-12 space-y-10">
              <fieldset>
                <legend className="mb-5 font-mono text-label-sm text-brand uppercase">
                  Data Anda
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="customer_name" className={labelCls}>
                      Nama <span className="text-accent">*</span>
                    </label>
                    <input id="customer_name" name="customer_name" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="customer_phone" className={labelCls}>
                      WhatsApp <span className="text-accent">*</span>
                    </label>
                    <input
                      id="customer_phone"
                      name="customer_phone"
                      required
                      inputMode="tel"
                      placeholder="08xxxxxxxxxx"
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="customer_email" className={labelCls}>
                      Email (opsional)
                    </label>
                    <input id="customer_email" name="customer_email" type="email" className={field} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-t border-line pt-8">
                <legend className="mb-5 font-mono text-label-sm text-brand uppercase">
                  Rute &amp; Layanan
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="origin" className={labelCls}>
                      Kota Asal <span className="text-accent">*</span>
                    </label>
                    <input id="origin" name="origin" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="destination" className={labelCls}>
                      Kota Tujuan <span className="text-accent">*</span>
                    </label>
                    <input id="destination" name="destination" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="service_id" className={labelCls}>
                      Layanan
                    </label>
                    <select id="service_id" name="service_id" defaultValue="" className={field}>
                      <option value="">Belum tahu / minta saran</option>
                      {servicesList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferred_date" className={labelCls}>
                      Tanggal Diinginkan
                    </label>
                    <input id="preferred_date" name="preferred_date" type="date" className={field} />
                  </div>
                  <div>
                    <label htmlFor="pickup_address" className={labelCls}>
                      Alamat Penjemputan
                    </label>
                    <input id="pickup_address" name="pickup_address" className={field} />
                  </div>
                  <div>
                    <label htmlFor="delivery_address" className={labelCls}>
                      Alamat Pengantaran
                    </label>
                    <input id="delivery_address" name="delivery_address" className={field} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-t border-line pt-8">
                <legend className="mb-5 font-mono text-label-sm text-brand uppercase">
                  Kendaraan
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vehicle_type" className={labelCls}>
                      Jenis
                    </label>
                    <select id="vehicle_type" name="vehicle_type" defaultValue="" className={field}>
                      <option value="">Pilih jenis</option>
                      <option>Mobil</option>
                      <option>Motor</option>
                      <option>Alat Berat</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="running_condition" className={labelCls}>
                      Kondisi
                    </label>
                    <select
                      id="running_condition"
                      name="running_condition"
                      defaultValue=""
                      className={field}
                    >
                      <option value="">Pilih kondisi</option>
                      <option>Hidup / bisa jalan</option>
                      <option>Mati / mogok</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="vehicle_brand" className={labelCls}>
                      Merek
                    </label>
                    <input id="vehicle_brand" name="vehicle_brand" className={field} />
                  </div>
                  <div>
                    <label htmlFor="vehicle_model" className={labelCls}>
                      Model
                    </label>
                    <input id="vehicle_model" name="vehicle_model" className={field} />
                  </div>
                  <div>
                    <label htmlFor="vehicle_year" className={labelCls}>
                      Tahun
                    </label>
                    <input
                      id="vehicle_year"
                      name="vehicle_year"
                      type="number"
                      min="1950"
                      max="2100"
                      className={field}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border-t border-line pt-8">
                <label htmlFor="notes" className={labelCls}>
                  Catatan Tambahan
                </label>
                <textarea id="notes" name="notes" rows={4} className={field} />
              </fieldset>

              {error && (
                <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting || !isSupabaseConfigured}
                  className="u-btn u-btn-primary px-8 py-4 disabled:pointer-events-none disabled:opacity-40"
                >
                  {submitting ? "Mengirim…" : "Kirim Pesanan"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href={wa} className="u-btn u-btn-outline" target="_blank" rel="noopener noreferrer">
                  Tanya dulu via WhatsApp
                </a>
              </div>
            </form>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
