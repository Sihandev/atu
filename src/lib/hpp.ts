/**
 * Kalkulator HPP → harga jual.
 *
 *   Harga jual = HPP + Margin + Proteksi risiko + Bunga dana talang
 *
 * Semua angka persentase di sini bisa diubah dari panel admin; nilai di bawah
 * hanya titik awal. Fungsi-fungsi di file ini murni (tanpa React/DOM) supaya
 * mudah dites.
 */

/** Batas atas tiap tier HPP (rupiah). Tier terakhir tidak punya batas. */
export const TIER_LIMITS = [1_000_000, 3_000_000, 8_000_000, 15_000_000, 25_000_000] as const;
export const TIER_LABELS = ["<1jt", "1-3jt", "3-8jt", "8-15jt", "15-25jt", ">25jt"] as const;

export type SegmentKey = "eksp1" | "eksp2" | "sales1" | "sales2" | "corp1" | "corp2";

export const SEGMENTS: { key: SegmentKey; label: string; short: string }[] = [
  { key: "eksp1", label: "Ekspedisi 1", short: "Eksp1" },
  { key: "eksp2", label: "Ekspedisi 2", short: "Eksp2" },
  { key: "sales1", label: "Sales 1", short: "Sales1" },
  { key: "sales2", label: "Sales 2", short: "Sales2" },
  { key: "corp1", label: "Corporate 1", short: "Corp1" },
  { key: "corp2", label: "Corporate 2", short: "Corp2" },
];

/** Margin (% dari HPP) per segmen, satu angka per tier HPP. */
export type MarginTable = Record<SegmentKey, number[]>;

export const DEFAULT_MARGINS: MarginTable = {
  eksp1: [20, 12, 9, 6, 4, 2.5],
  eksp2: [15, 10, 7, 5, 3, 2],
  sales1: [30, 18, 15, 10, 7, 5],
  sales2: [25, 15, 12, 8, 6, 4],
  corp1: [55, 40, 32, 25, 18, 12],
  corp2: [45, 35, 28, 22, 15, 10],
};

export const RISK_LEVELS = ["Normal", "Waspada", "Tinggi", "Sangat tinggi"] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

/** Proteksi risiko, % dari HPP. */
export const DEFAULT_RISK_PCT: Record<RiskLevel, number> = {
  Normal: 0,
  Waspada: 2,
  Tinggi: 4,
  "Sangat tinggi": 7,
};

/** Jangka waktu pembayaran → jumlah hari dana kita tertahan. */
export const PAYMENT_TERMS = [
  { label: "Cash", days: 0 },
  { label: "Net 7", days: 7 },
  { label: "Net 14", days: 14 },
  { label: "Net 30", days: 30 },
  { label: "Net 45", days: 45 },
  { label: "Net 60", days: 60 },
] as const;

export const ROUNDINGS = [
  { label: "Tanpa pembulatan", step: 1 },
  { label: "Naik ke Rp1.000", step: 1_000 },
  { label: "Naik ke Rp10.000", step: 10_000 },
  { label: "Naik ke Rp50.000", step: 50_000 },
] as const;

export const SHIPPING_MODES = [
  "Self Drive",
  "Kapal Laut",
  "Container",
  "Car Carrier",
  "Towing",
  "Self Loader",
  "Low Bed",
] as const;

export const VEHICLE_TYPES = [
  "Sedan",
  "SUV",
  "MPV",
  "Hatchback",
  "Pickup",
  "Truk",
  "Motor",
  "Alat Berat",
] as const;

export type HppInput = {
  /** Harga modal dari Alyssa Auto Logistik. */
  hpp: number;
  riskLevel: RiskLevel;
  paymentDays: number;
};

export type HppSettings = {
  margins: MarginTable;
  riskPct: Record<RiskLevel, number>;
  /** Biaya dana talang, % per tahun. */
  fundingAnnualPct: number;
  roundingStep: number;
};

export const DEFAULT_SETTINGS: HppSettings = {
  margins: DEFAULT_MARGINS,
  riskPct: DEFAULT_RISK_PCT,
  fundingAnnualPct: 18,
  roundingStep: 10_000,
};

export type SegmentQuote = {
  key: SegmentKey;
  marginPct: number;
  margin: number;
  price: number;
  /** Laba kotor sesudah pembulatan: harga jual − HPP. */
  profit: number;
  /** Laba kotor sebagai % dari harga jual. */
  profitOfPricePct: number;
};

export type HppResult = {
  hpp: number;
  tier: number;
  risk: number;
  funding: number;
  segments: SegmentQuote[];
};

export function tierIndex(hpp: number): number {
  const i = TIER_LIMITS.findIndex((limit) => hpp < limit);
  return i === -1 ? TIER_LIMITS.length : i;
}

function roundUp(value: number, step: number): number {
  if (step <= 1) return Math.round(value);
  return Math.ceil(value / step) * step;
}

export function calculate(input: HppInput, settings: HppSettings): HppResult {
  const hpp = input.hpp || 0;
  const tier = tierIndex(hpp);
  const risk = (hpp * (settings.riskPct[input.riskLevel] ?? 0)) / 100;
  const funding = (hpp * settings.fundingAnnualPct * input.paymentDays) / 100 / 365;

  const segments = SEGMENTS.map(({ key }): SegmentQuote => {
    const marginPct = settings.margins[key][tier] ?? 0;
    const margin = (hpp * marginPct) / 100;
    const price = hpp > 0 ? roundUp(hpp + margin + risk + funding, settings.roundingStep) : 0;
    const profit = price - hpp;
    return {
      key,
      marginPct,
      margin,
      price,
      profit,
      profitOfPricePct: price > 0 ? (profit / price) * 100 : 0,
    };
  });

  return { hpp, tier, risk, funding, segments };
}

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
