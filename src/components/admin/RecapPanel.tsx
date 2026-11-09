"use client";

import { useMemo } from "react";

import { isDeal, type Order } from "@/lib/orders";
import { formatRupiah } from "@/components/admin/QuotationSheet";
import { cn } from "@/lib/utils";

type Month = {
  key: string;
  label: string;
  orders: number;
  revenue: number;
  cost: number;
  profit: number;
  /** Deal orders still missing a cost price, so profit is understated. */
  incomplete: number;
  /** Customer money not yet received. */
  receivable: number;
  /** Alyssa's share not yet paid. */
  payable: number;
};

function monthOf(iso: string): { key: string; label: string } {
  const d = new Date(iso);
  return {
    key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    label: d.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
  };
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "warn" }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-5">
      <div className="font-mono text-label-sm text-ink-3 uppercase">{label}</div>
      <div
        className={cn(
          "mt-3 font-display text-2xl font-extrabold tracking-[-0.02em]",
          tone === "ok" && "text-ok",
          tone === "warn" && "text-accent"
        )}
      >
        {value}
      </div>
    </div>
  );
}

/** Profit recap per month. Only orders that reached "deal" and carry a selling
 *  price count; the month is the month the order came in. */
export function RecapPanel({ orders }: { orders: Order[] }) {
  const { months, total } = useMemo(() => {
    const byMonth = new Map<string, Month>();
    for (const o of orders) {
      if (!isDeal(o.status) || !o.quoted_price) continue;
      const { key, label } = monthOf(o.created_at);
      const m =
        byMonth.get(key) ??
        { key, label, orders: 0, revenue: 0, cost: 0, profit: 0, incomplete: 0, receivable: 0, payable: 0 };
      m.orders += 1;
      m.revenue += o.quoted_price;
      if (o.partner_price) {
        m.cost += o.partner_price;
        m.profit += o.quoted_price - o.partner_price;
        if (!o.partner_paid_at) m.payable += o.partner_price;
      } else {
        m.incomplete += 1;
      }
      if (!o.customer_paid_at) m.receivable += o.quoted_price;
      byMonth.set(key, m);
    }
    const list = [...byMonth.values()].sort((a, b) => b.key.localeCompare(a.key));
    const sum = list.reduce(
      (acc, m) => ({
        orders: acc.orders + m.orders,
        revenue: acc.revenue + m.revenue,
        profit: acc.profit + m.profit,
        incomplete: acc.incomplete + m.incomplete,
        receivable: acc.receivable + m.receivable,
        payable: acc.payable + m.payable,
      }),
      { orders: 0, revenue: 0, profit: 0, incomplete: 0, receivable: 0, payable: 0 }
    );
    return { months: list, total: sum };
  }, [orders]);

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total untung" value={formatRupiah(total.profit)} tone="ok" />
        <Stat label="Omzet (deal)" value={formatRupiah(total.revenue)} />
        <Stat label="Belum dibayar pelanggan" value={formatRupiah(total.receivable)} tone="warn" />
        <Stat label="Belum dibayar ke Alyssa" value={formatRupiah(total.payable)} tone="warn" />
      </div>

      {total.incomplete > 0 && (
        <p className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm text-ink-2">
          {total.incomplete} order deal belum punya harga modal dari Alyssa, jadi untungnya belum
          terhitung. Isi di detail pesanan.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-surface">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-3">
              {["Bulan", "Order", "Omzet", "Modal", "Untung", "Belum dibayar pelanggan", "Belum dibayar ke Alyssa"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-5 py-4 font-mono text-label-sm font-medium uppercase",
                      i > 0 && "text-right"
                    )}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {months.map((m) => (
              <tr key={m.key} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-ink capitalize">{m.label}</td>
                <td className="px-5 py-4 text-right">{m.orders}</td>
                <td className="px-5 py-4 text-right font-mono">{formatRupiah(m.revenue)}</td>
                <td className="px-5 py-4 text-right font-mono">{formatRupiah(m.cost)}</td>
                <td
                  className={cn(
                    "px-5 py-4 text-right font-mono font-semibold",
                    m.profit < 0 ? "text-err" : "text-ok"
                  )}
                >
                  {m.profit < 0 ? "-" : ""}
                  {formatRupiah(Math.abs(m.profit))}
                </td>
                <td className="px-5 py-4 text-right font-mono">{formatRupiah(m.receivable)}</td>
                <td className="px-5 py-4 text-right font-mono">{formatRupiah(m.payable)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {months.length === 0 && (
          <p className="px-5 py-16 text-center text-ink-3">
            Belum ada order deal dengan harga penawaran. Rekap muncul setelah ada order yang
            dikonfirmasi.
          </p>
        )}
      </div>
    </div>
  );
}
