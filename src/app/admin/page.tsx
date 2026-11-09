"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, RefreshCw, Search } from "lucide-react";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  ORDER_STATUSES,
  STATUS_META,
  formatDateTime,
  getMyRole,
  listOrders,
  type Order,
  type OrderStatus,
  type StaffRole,
} from "@/lib/orders";
import { OrderDrawer } from "@/components/admin/OrderDrawer";
import { HppCalculator } from "@/components/admin/HppCalculator";
import { PartnerPanel } from "@/components/admin/PartnerPanel";
import { RecapPanel } from "@/components/admin/RecapPanel";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { brand } from "@/config/data";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */

function SetupNotice() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="glass w-full max-w-lg rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold">Supabase belum dikonfigurasi</h1>
        <p className="mt-4 leading-relaxed text-ink-2">
          Panel admin butuh dua environment variable. Salin dari Supabase Dashboard → Settings →
          API, lalu simpan di <code className="text-brand">.env.local</code>:
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-line-2 bg-bg p-4 text-sm text-ink-2">
          {`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...`}
        </pre>
        <p className="mt-5 text-sm text-ink-3">
          Jalankan juga <code className="text-brand">supabase/schema.sql</code> di SQL Editor untuk
          membuat tabel dan aturan aksesnya.
        </p>
      </div>
    </div>
  );
}

function LoginCard({ onSignedIn }: { onSignedIn: (session: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError("Email atau kata sandi salah.");
      return;
    }
    if (data.session) onSignedIn(data.session);
  };

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-3xl p-8">
        <p className="font-mono text-label-sm text-accent uppercase">{brand.name}</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Panel Admin</h1>
        <p className="mt-2 text-sm text-ink-2">Masuk untuk mengelola pesanan.</p>

        <label htmlFor="email" className="mt-7 mb-2 block font-mono text-label-sm text-ink-3 uppercase">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-line-2 bg-bg px-4 py-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
        />

        <label
          htmlFor="password"
          className="mt-4 mb-2 block font-mono text-label-sm text-ink-3 uppercase"
        >
          Kata Sandi
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-line-2 bg-bg px-4 py-3 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
        />

        {error && (
          <p className="mt-4 rounded-xl border border-err/30 bg-err/10 px-4 py-3 text-sm text-err">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="u-btn u-btn-primary mt-6 w-full disabled:opacity-50"
        >
          {busy ? "Memeriksa…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  /* Nothing to check when the project is unconfigured, so start settled and
     avoid flipping this from inside an effect. */
  const [checking, setChecking] = useState(isSupabaseConfigured);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "semua">("semua");
  const [selected, setSelected] = useState<Order | null>(null);
  const [tab, setTab] = useState<"pesanan" | "kalkulator" | "rekap">("pesanan");
  /* undefined = still asking the database; null = signed in but no role. */
  const [role, setRole] = useState<StaffRole | null | undefined>(undefined);
  const [roleError, setRoleError] = useState<string | null>(null);

  /* Restore an existing session, then follow auth changes. */
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setOrders(await listOrders());
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Gagal memuat pesanan.");
    } finally {
      setLoading(false);
    }
  }, []);

  /* Which side of the business is this account? Drives the whole panel. */
  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    let active = true;
    queueMicrotask(async () => {
      if (!active) return;
      setRole(undefined);
      setRoleError(null);
      try {
        const next = await getMyRole();
        if (active) setRole(next);
      } catch (e) {
        if (active) {
          setRole(null);
          setRoleError(e instanceof Error ? e.message : "Gagal memeriksa hak akses.");
        }
      }
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const isAdmin = role === "admin";

  useEffect(() => {
    if (!session || !isAdmin) return;
    let active = true;
    /* Deferred so the first state update lands after this effect commits
       rather than synchronously inside it. */
    queueMicrotask(() => {
      if (active) refresh();
    });
    return () => {
      active = false;
    };
  }, [session, isAdmin, refresh]);

  useEffect(() => {
    if (!session || !isAdmin) return;
    const supabase = getSupabase();
    const channel = supabase
      .channel("admin-orders-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => void refresh()
      )
      .subscribe();
    const fallback = window.setInterval(() => void refresh(), 30_000);
    return () => {
      window.clearInterval(fallback);
      void supabase.removeChannel(channel);
    };
  }, [session, isAdmin, refresh]);

  const counts = useMemo(() => {
    const base = { semua: orders.length } as Record<string, number>;
    for (const s of ORDER_STATUSES) base[s] = 0;
    for (const o of orders) base[o.status] = (base[o.status] ?? 0) + 1;
    return base;
  }, [orders]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "semua" && o.status !== filter) return false;
      if (!q) return true;
      return [o.order_code, o.customer_name, o.customer_phone, o.origin, o.destination]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, query, filter]);

  if (!isSupabaseConfigured) return <SetupNotice />;
  if (checking) {
    return <div className="grid min-h-screen place-items-center text-ink-2">Memuat…</div>;
  }
  if (!session) return <LoginCard onSignedIn={setSession} />;
  if (role === undefined) {
    return <div className="grid min-h-screen place-items-center text-ink-2">Memuat…</div>;
  }
  if (role === null) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="glass w-full max-w-md rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold">Akun belum punya akses</h1>
          <p className="mt-4 leading-relaxed text-ink-2">
            {roleError ??
              `${session.user.email} belum diberi peran admin atau partner. Minta admin menambahkannya.`}
          </p>
          <button
            type="button"
            onClick={() => getSupabase().auth.signOut()}
            className="u-btn u-btn-primary mt-6 text-sm"
          >
            Keluar
          </button>
        </div>
      </div>
    );
  }

  const heading =
    role === "partner"
      ? "Order dari Kirim Mobilku"
      : tab === "kalkulator"
        ? "Kalkulator HPP"
        : tab === "rekap"
          ? "Rekap Untung"
          : "Pesanan";

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-label-sm text-accent uppercase">{brand.name}</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em]">
            {heading}
          </h1>
          {isAdmin && tab === "kalkulator" && (
            <p className="mt-1 text-sm text-ink-3">
              HPP + margin + proteksi risiko + bunga dana talang
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-ink-2 sm:block">{session.user.email}</span>
          {isAdmin && (
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand"
              aria-label="Muat ulang"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </button>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => getSupabase().auth.signOut()}
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-brand hover:text-brand"
            aria-label="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {isAdmin && (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Menu admin">
          {(
            [
              ["pesanan", "Pesanan"],
              ["kalkulator", "Kalkulator HPP"],
              ["rekap", "Rekap Untung"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-all",
                tab === id
                  ? "border-brand bg-brand text-white"
                  : "border-line-2 text-ink-2 hover:border-brand hover:text-brand"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      {role === "partner" ? (
        <PartnerPanel />
      ) : tab === "kalkulator" ? (
        <HppCalculator
          orders={orders}
          onOrderUpdated={(updated) =>
            setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
          }
        />
      ) : tab === "rekap" ? (
        <RecapPanel orders={orders} />
      ) : (
        <>
      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari resi, nama, kota…"
            className="w-full rounded-full border border-line-2 bg-surface py-2.5 pr-4 pl-11 text-sm focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
          />
        </div>

        {(["semua", ...ORDER_STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              filter === s
                ? "border-brand bg-brand text-white"
                : "border-line-2 text-ink-2 hover:border-brand hover:text-brand"
            )}
          >
            {s === "semua" ? "Semua" : STATUS_META[s].label}
            <span className="ml-2 opacity-60">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      {loadError && (
        <p className="mt-6 rounded-2xl border border-err/30 bg-err/10 px-5 py-4 text-sm text-err">
          {loadError}
        </p>
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-surface">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-3">
              {["Resi", "Pelanggan", "Rute", "Kendaraan", "Masuk", "Status"].map((h) => (
                <th key={h} className="px-5 py-4 font-mono text-label-sm font-medium uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr
                key={o.id}
                onClick={() => setSelected(o)}
                className="cursor-pointer border-b border-line transition-colors last:border-0 hover:bg-surface-2"
              >
                <td className="px-5 py-4 font-mono text-brand">{o.order_code}</td>
                <td className="px-5 py-4">
                  <div className="font-medium text-ink">{o.customer_name}</div>
                  <div className="text-ink-3">{o.customer_phone}</div>
                </td>
                <td className="px-5 py-4 text-ink-2">
                  {o.origin} → {o.destination}
                </td>
                <td className="px-5 py-4 text-ink-2">
                  {[o.vehicle_brand, o.vehicle_model].filter(Boolean).join(" ") || "—"}
                </td>
                <td className="px-5 py-4 text-ink-3">{formatDateTime(o.created_at)}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full border px-3 py-1 text-xs",
                      STATUS_META[o.status].className
                    )}
                  >
                    {STATUS_META[o.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && visible.length === 0 && (
          <p className="px-5 py-16 text-center text-ink-3">
            {orders.length === 0
              ? "Belum ada pesanan masuk."
              : "Tidak ada pesanan yang cocok dengan filter ini."}
          </p>
        )}
      </div>
        </>
      )}

      <OrderDrawer
        key={selected?.id}
        order={selected}
        onClose={() => setSelected(null)}
        onSaved={(updated) => {
          setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
          setSelected(updated);
        }}
      />
    </div>
  );
}
