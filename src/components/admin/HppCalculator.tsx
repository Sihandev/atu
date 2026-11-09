"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Plus, RotateCcw } from "lucide-react";

import {
  DEFAULT_SETTINGS,
  PAYMENT_TERMS,
  RISK_LEVELS,
  ROUNDINGS,
  SEGMENTS,
  SHIPPING_MODES,
  TIER_LABELS,
  VEHICLE_TYPES,
  calculate,
  formatIDR,
  type HppSettings,
  type RiskLevel,
  type SegmentKey,
} from "@/lib/hpp";
import { updateOrder, type Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */

type FormState = {
  customer: string;
  origin: string;
  destination: string;
  vehicleType: string;
  customVehicles: string[];
  /** Moda yang dipilih, mis. "Kapal Laut + Car Carrier". */
  method: string;
  paymentDays: number;
  riskLevel: RiskLevel;
  /** Harga modal dari Alyssa. */
  hpp: number;
  note: string;
  /** Pesanan yang sedang dihitung, kalau ada. */
  orderId: string;
};

type Saved = { form: FormState; settings: HppSettings };

const STORAGE_KEY = "kirim-mobilku:hpp-calculator:v2";

const initialForm = (): FormState => ({
  customer: "",
  origin: "",
  destination: "",
  vehicleType: VEHICLE_TYPES[0],
  customVehicles: [],
  method: "",
  paymentDays: 0,
  riskLevel: "Normal",
  hpp: 0,
  note: "",
  orderId: "",
});

function load(): Saved {
  const fallback: Saved = { form: initialForm(), settings: DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    return {
      form: { ...fallback.form, ...parsed.form },
      settings: {
        ...DEFAULT_SETTINGS,
        ...parsed.settings,
        margins: { ...DEFAULT_SETTINGS.margins, ...parsed.settings?.margins },
        riskPct: { ...DEFAULT_SETTINGS.riskPct, ...parsed.settings?.riskPct },
      },
    };
  } catch {
    return fallback;
  }
}

/* ------------------------------------------------------------------ */

const fieldCls =
  "w-full rounded-xl border border-line-2 bg-bg px-4 py-2.5 text-sm focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none";
const labelCls = "mb-2 block font-mono text-label-sm text-ink-3 uppercase";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6">
      <h2 className="mb-5 font-mono text-label-sm text-accent uppercase">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

/** Input rupiah: tampil dengan pemisah ribuan, simpan sebagai angka. */
function MoneyInput({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <input
      inputMode="numeric"
      aria-label={label}
      value={value ? value.toLocaleString("id-ID") : ""}
      placeholder="0"
      onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")) || 0)}
      className={cn(fieldCls, "text-right font-mono")}
    />
  );
}

function PctInput({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <input
      type="number"
      min={0}
      step="any"
      aria-label={label}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      className="w-full min-w-14 rounded-lg border border-line-2 bg-bg px-2 py-1.5 text-center font-mono text-sm focus:border-brand focus:outline-none"
    />
  );
}

/* ------------------------------------------------------------------ */

export function HppCalculator({
  orders,
  onOrderUpdated,
}: {
  orders: Order[];
  onOrderUpdated: (order: Order) => void;
}) {
  /* Mounted only after sign-in on the client, so reading storage in the
     initialiser cannot cause a hydration mismatch. */
  const [saved] = useState(load);
  const [form, setForm] = useState<FormState>(saved.form);
  const [settings, setSettings] = useState<HppSettings>(saved.settings);
  const [newVehicle, setNewVehicle] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [applying, setApplying] = useState<SegmentKey | null>(null);
  const [applyMsg, setApplyMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, settings }));
    } catch {
      /* private mode / quota — the calculator still works, just not persisted */
    }
  }, [form, settings]);

  const patch = (next: Partial<FormState>) => setForm((f) => ({ ...f, ...next }));

  const result = useMemo(
    () =>
      calculate(
        { hpp: form.hpp, riskLevel: form.riskLevel, paymentDays: form.paymentDays },
        settings
      ),
    [form.hpp, form.riskLevel, form.paymentDays, settings]
  );

  const openOrders = useMemo(
    () => orders.filter((o) => o.status !== "selesai" && o.status !== "batal"),
    [orders]
  );
  const order = orders.find((o) => o.id === form.orderId) ?? null;

  const vehicleOptions = [...VEHICLE_TYPES, ...form.customVehicles];
  const activeModes = form.method
    .split("+")
    .map((m) => m.trim())
    .filter(Boolean);

  const toggleMode = (mode: string) => {
    const next = activeModes.includes(mode)
      ? activeModes.filter((m) => m !== mode)
      : [...activeModes, mode];
    patch({ method: next.join(" + ") });
  };

  /** Pick an order and pre-fill what we already know about it. */
  const selectOrder = (id: string) => {
    const o = orders.find((x) => x.id === id);
    setApplyMsg(null);
    if (!o) return patch({ orderId: "" });
    const vehicle = o.vehicle_type && VEHICLE_TYPES.includes(o.vehicle_type as never)
      ? o.vehicle_type
      : form.vehicleType;
    patch({
      orderId: id,
      customer: o.customer_name,
      origin: o.origin,
      destination: o.destination,
      vehicleType: vehicle,
      hpp: o.partner_price ?? form.hpp,
    });
  };

  const applyToOrder = async (key: SegmentKey, price: number) => {
    if (!order || !price) return;
    const label = SEGMENTS.find((s) => s.key === key)?.label ?? key;
    if (
      order.quoted_price &&
      order.quoted_price !== price &&
      !window.confirm(
        `${order.order_code} sudah punya harga ${formatIDR(order.quoted_price)}. Ganti dengan ${formatIDR(price)} (${label})?`
      )
    ) {
      return;
    }
    setApplying(key);
    setApplyMsg(null);
    try {
      const updated = await updateOrder(order.id, {
        partner_price: form.hpp,
        quoted_price: price,
        quote_created_at: new Date().toISOString(),
      });
      onOrderUpdated(updated);
      setApplyMsg({ ok: true, text: `Tersimpan ke ${order.order_code}: ${formatIDR(price)}` });
    } catch (e) {
      setApplyMsg({ ok: false, text: e instanceof Error ? e.message : "Gagal menyimpan." });
    } finally {
      setApplying(null);
    }
  };

  const setMargin = (key: SegmentKey, tier: number, value: number) =>
    setSettings((s) => ({
      ...s,
      margins: { ...s.margins, [key]: s.margins[key].map((m, i) => (i === tier ? value : m)) },
    }));

  const reset = () => {
    if (!window.confirm("Kosongkan semua isian? Pengaturan margin tetap dipertahankan.")) return;
    setForm(initialForm());
    setApplyMsg(null);
  };

  const copySummary = async () => {
    const term = PAYMENT_TERMS.find((t) => t.days === form.paymentDays)?.label ?? "Cash";
    const text = [
      `KALKULASI HARGA — ${form.customer || "(tanpa nama)"}`,
      `Rute: ${form.origin || "—"} → ${form.destination || "—"}`,
      `Kendaraan: ${form.vehicleType} · Metode: ${form.method || "—"}`,
      `Pembayaran: ${term} · Risiko rute: ${form.riskLevel}`,
      "",
      `HPP (dari Alyssa): ${formatIDR(result.hpp)}`,
      `Proteksi risiko: ${formatIDR(result.risk)}`,
      `Bunga dana talang: ${formatIDR(result.funding)}`,
      "",
      ...SEGMENTS.map((s) => {
        const q = result.segments.find((x) => x.key === s.key)!;
        return `${s.label} (${q.marginPct}%): ${formatIDR(q.price)}`;
      }),
      form.note ? `\nCatatan: ${form.note}` : "",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Salin ringkasan ini:", text);
    }
  };

  const addVehicle = () => {
    const name = (newVehicle ?? "").trim();
    setNewVehicle(null);
    if (!name || vehicleOptions.some((v) => v.toLowerCase() === name.toLowerCase())) return;
    patch({ customVehicles: [...form.customVehicles, name], vehicleType: name });
  };

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-6">
        <Card title="Pesanan">
          <Field label="Hitung untuk pesanan (opsional)">
            <select
              value={form.orderId}
              onChange={(e) => selectOrder(e.target.value)}
              className={fieldCls}
            >
              <option value="">— Hitung bebas, tanpa pesanan —</option>
              {openOrders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.order_code} · {o.customer_name} · {o.origin} → {o.destination}
                </option>
              ))}
            </select>
          </Field>
          <p className="mt-2 text-xs text-ink-3">
            Memilih pesanan mengisi rute dan pelanggan otomatis, dan hasilnya bisa langsung dipakai
            sebagai harga penawaran.
          </p>
          <Field label="Nama PT / pelanggan korporat" className="mt-4">
            <input
              value={form.customer}
              onChange={(e) => patch({ customer: e.target.value })}
              placeholder="Ketik nama PT — otomatis tersimpan"
              className={fieldCls}
            />
          </Field>
        </Card>

        <Card title="Data rute & kondisi">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kota asal">
              <input
                value={form.origin}
                onChange={(e) => patch({ origin: e.target.value })}
                placeholder="Jakarta"
                className={fieldCls}
              />
            </Field>
            <Field label="Kota tujuan">
              <input
                value={form.destination}
                onChange={(e) => patch({ destination: e.target.value })}
                placeholder="Banjarmasin"
                className={fieldCls}
              />
            </Field>
          </div>

          <div className="mt-4">
            <span className={labelCls}>Tipe kendaraan</span>
            {newVehicle === null ? (
              <div className="flex gap-2">
                <select
                  value={form.vehicleType}
                  onChange={(e) => patch({ vehicleType: e.target.value })}
                  className={fieldCls}
                  aria-label="Tipe kendaraan"
                >
                  {vehicleOptions.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setNewVehicle("")}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-line-2 px-4 text-sm text-accent transition-colors hover:border-brand"
                >
                  <Plus className="h-4 w-4" /> Baru
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={newVehicle}
                  onChange={(e) => setNewVehicle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addVehicle();
                    }
                    if (e.key === "Escape") setNewVehicle(null);
                  }}
                  placeholder="Nama tipe baru, mis. Van"
                  className={fieldCls}
                />
                <button type="button" onClick={addVehicle} className="u-btn u-btn-primary shrink-0">
                  Simpan
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span className={labelCls}>Moda pengiriman</span>
            <div className="flex flex-wrap gap-2">
              {SHIPPING_MODES.map((m) => {
                const active = activeModes.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMode(m)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                      active
                        ? "border-brand bg-brand text-white"
                        : "border-line-2 text-ink-2 hover:border-brand hover:text-brand"
                    )}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            <input
              value={form.method}
              onChange={(e) => patch({ method: e.target.value })}
              placeholder="atau ketik manual, mis. Kapal Laut + Car Carrier"
              className={cn(fieldCls, "mt-3")}
              aria-label="Metode pengiriman"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Term of payment">
              <select
                value={form.paymentDays}
                onChange={(e) => patch({ paymentDays: Number(e.target.value) })}
                className={fieldCls}
              >
                {PAYMENT_TERMS.map((t) => (
                  <option key={t.label} value={t.days}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Kategori risiko rute">
              <select
                value={form.riskLevel}
                onChange={(e) => patch({ riskLevel: e.target.value as RiskLevel })}
                className={fieldCls}
              >
                {RISK_LEVELS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card title="Harga modal (HPP)">
          <Field label="Harga dari Alyssa Auto Logistik">
            <MoneyInput
              label="Harga dari Alyssa"
              value={form.hpp}
              onChange={(hpp) => patch({ hpp })}
            />
          </Field>
          <p className="mt-2 text-xs text-ink-3">
            Satu angka saja: harga yang Alyssa berikan untuk order ini. Rincian biaya (kapal,
            towing, dan lainnya) diurus di sisi Alyssa.
          </p>

          <Field label="Catatan (tampil di daftar harga pelanggan)" className="mt-4">
            <textarea
              value={form.note}
              onChange={(e) => patch({ note: e.target.value })}
              rows={3}
              placeholder="Contoh: Sudah termasuk biaya penyeberangan Merak-Bakauheni"
              className={fieldCls}
            />
          </Field>
        </Card>

        <Card title="Pengaturan margin & biaya">
          <p className="mb-4 text-sm text-ink-2">
            Margin dihitung dari HPP, lalu dipilih menurut tier HPP di bawah. Angka yang diubah
            tersimpan otomatis di browser ini.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-ink-3">
                  <th className="pb-2 text-left font-mono text-label-sm font-medium uppercase">
                    Margin %
                  </th>
                  {TIER_LABELS.map((t, i) => (
                    <th
                      key={t}
                      className={cn(
                        "px-1 pb-2 text-center font-mono text-label-sm font-medium",
                        i === result.tier && result.hpp > 0 && "text-brand"
                      )}
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEGMENTS.map((s) => (
                  <tr key={s.key}>
                    <th className="py-1 pr-3 text-left font-medium text-ink-2">{s.label}</th>
                    {settings.margins[s.key].map((m, i) => (
                      <td key={i} className="p-1">
                        <PctInput
                          label={`${s.label} tier ${TIER_LABELS[i]}`}
                          value={m}
                          onChange={(v) => setMargin(s.key, i, v)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <span className={labelCls}>Proteksi risiko (% dari HPP)</span>
              <div className="grid grid-cols-2 gap-2">
                {RISK_LEVELS.map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm text-ink-2">
                    <span className="w-24 shrink-0">{r}</span>
                    <PctInput
                      label={`Proteksi ${r}`}
                      value={settings.riskPct[r]}
                      onChange={(v) =>
                        setSettings((s) => ({ ...s, riskPct: { ...s.riskPct, [r]: v } }))
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Field label="Bunga dana talang (% per tahun)">
                <PctInput
                  label="Bunga dana talang per tahun"
                  value={settings.fundingAnnualPct}
                  onChange={(v) => setSettings((s) => ({ ...s, fundingAnnualPct: v }))}
                />
              </Field>
              <Field label="Pembulatan harga jual">
                <select
                  value={settings.roundingStep}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, roundingStep: Number(e.target.value) }))
                  }
                  className={fieldCls}
                >
                  {ROUNDINGS.map((r) => (
                    <option key={r.step} value={r.step}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSettings(DEFAULT_SETTINGS)}
            className="mt-5 text-xs text-ink-3 underline hover:text-brand"
          >
            Kembalikan pengaturan ke bawaan
          </button>
        </Card>
      </div>

      {/* Result */}
      <aside className="space-y-4 lg:sticky lg:top-6">
        <section className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="font-mono text-label-sm text-accent uppercase">Hasil kalkulasi</h2>
          <p className="mt-1 text-sm text-ink-3">
            {order ? `${order.order_code} · ` : ""}
            {form.origin || "Asal"} → {form.destination || "Tujuan"} · {form.vehicleType}
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <Row label="HPP (dari Alyssa)" value={formatIDR(result.hpp)} strong />
            <Row label={`Proteksi risiko (${form.riskLevel})`} value={formatIDR(result.risk)} />
            <Row label="Bunga dana talang" value={formatIDR(result.funding)} />
            <Row
              label={`Tier HPP ${result.hpp > 0 ? TIER_LABELS[result.tier] : "—"}`}
              value={form.method || "—"}
              muted
            />
          </dl>

          <div className="mt-5 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-ink-3">
                  <th className="px-3 py-2 text-left font-mono text-label-sm font-medium uppercase">
                    Segmen
                  </th>
                  <th className="px-3 py-2 text-right font-mono text-label-sm font-medium uppercase">
                    Harga jual
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.segments.map((q) => {
                  const seg = SEGMENTS.find((s) => s.key === q.key)!;
                  return (
                    <tr key={q.key} className="border-t border-line">
                      <td className="px-3 py-2.5">
                        <div className="font-medium text-ink">{seg.label}</div>
                        <div className="text-xs text-ink-3">
                          margin {q.marginPct}% · untung {formatIDR(q.profit)}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <div className="font-mono font-semibold text-brand">
                          {q.price ? formatIDR(q.price) : "—"}
                        </div>
                        {order && q.price > 0 && (
                          <button
                            type="button"
                            disabled={applying !== null}
                            onClick={() => applyToOrder(q.key, q.price)}
                            className="mt-1 text-xs font-semibold text-accent hover:underline disabled:opacity-50"
                          >
                            {applying === q.key ? "Menyimpan…" : "Pakai untuk pesanan"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {applyMsg && (
            <p
              className={cn(
                "mt-3 rounded-xl border px-3 py-2 text-xs",
                applyMsg.ok
                  ? "border-ok/30 bg-ok/10 text-ok"
                  : "border-err/30 bg-err/10 text-err"
              )}
            >
              {applyMsg.text}
            </p>
          )}

          <div className="mt-5 flex gap-2">
            <button type="button" onClick={copySummary} className="u-btn u-btn-primary flex-1">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Tersalin" : "Salin ringkasan"}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label="Kosongkan isian"
              className="grid w-12 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={muted ? "text-ink-3" : "text-ink-2"}>{label}</dt>
      <dd
        className={cn(
          "text-right font-mono",
          strong ? "text-base font-semibold text-ink" : muted ? "text-ink-3" : "text-ink"
        )}
      >
        {value}
      </dd>
    </div>
  );
}
