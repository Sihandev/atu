"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { getSupabase } from "@/lib/supabase";
import {
  ALYSSA_TRACKING_API,
  formatTrackingTime,
  trackingLabel,
  trackingRoute,
  type AlyssaTrip,
  type TrackingCheckpoint,
} from "@/lib/tracking";

type ViewState = "idle" | "loading" | "found" | "not-found" | "error";

function mapsUrl(checkpoint: TrackingCheckpoint) {
  if (checkpoint.lat === null || checkpoint.lat === undefined) return null;
  if (checkpoint.lng === null || checkpoint.lng === undefined) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(`${checkpoint.lat},${checkpoint.lng}`)}`;
}

function vehicleLabel(trip: AlyssaTrip) {
  return [trip.tipe_kendaraan || trip.vehicle_type, trip.nopol].filter(Boolean).join(" · ") || "Unit kendaraan";
}

export default function TrackingPage() {
  const [resi, setResi] = useState("");
  const [searchedCode, setSearchedCode] = useState("");
  const [tripId, setTripId] = useState<string | null>(null);
  const [trip, setTrip] = useState<AlyssaTrip | null>(null);
  const [state, setState] = useState<ViewState>("idle");
  const [message, setMessage] = useState("");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchTrip = useCallback(async (id: string, quiet = false) => {
    if (!quiet) setState("loading");
    try {
      const response = await fetch(`${ALYSSA_TRACKING_API}/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        if (response.status === 404) {
          setTrip(null);
          setState("not-found");
          setMessage("Data perjalanan belum tersedia di sistem operasional.");
          return;
        }
        throw new Error(`Tracking API merespons ${response.status}`);
      }
      const data = (await response.json()) as AlyssaTrip;
      setTrip(data);
      setTripId(id);
      setState("found");
      setLastChecked(new Date());
    } catch {
      if (!quiet) {
        setState("error");
        setMessage("Server tracking sedang tidak dapat dihubungi. Silakan coba lagi sebentar.");
      }
    }
  }, []);

  const search = useCallback(async (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) return;
    setResi(code);
    setSearchedCode(code);
    setTrip(null);
    setTripId(null);
    setMessage("");
    setState("loading");

    try {
      const { data, error } = await getSupabase().rpc("lookup_tracking_trip", {
        p_order_code: code,
      });
      if (error) throw error;
      const linkedTripId = Array.isArray(data) ? data[0]?.tracking_trip_id : null;
      if (!linkedTripId) {
        setState("not-found");
        setMessage("Nomor resi belum terhubung ke tracking operasional.");
        return;
      }
      await fetchTrip(linkedTripId);
    } catch {
      setState("error");
      setMessage("Tracking belum dapat dibuka. Pastikan nomor resi benar lalu coba lagi.");
    }
  }, [fetchTrip]);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("resi");
    if (!initial) return;
    const timer = window.setTimeout(() => void search(initial), 0);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!tripId || state !== "found") return;
    const timer = window.setInterval(() => void fetchTrip(tripId, true), 30_000);
    return () => window.clearInterval(timer);
  }, [fetchTrip, state, tripId]);

  const checkpoints = [...(trip?.daily_checkpoints ?? [])].reverse();
  const legs = trip?.legs ?? [];

  return (
    <main className="min-h-screen bg-bg pt-[72px] text-ink">
      <Navbar />

      <section className="relative overflow-hidden border-b border-line bg-grad-ink px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(11,95,255,0.32),transparent_36%),radial-gradient(circle_at_18%_90%,rgba(255,157,0,0.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-accent backdrop-blur-xl">
            <Route className="h-6 w-6" />
          </div>
          <span className="font-mono text-label-sm text-accent-2 uppercase">Live vehicle tracking</span>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.045em] text-white">
            Perjalanan dalam kendali.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Masukkan nomor resi KirimKendaraan untuk melihat progres kendaraan terbaru.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void search(resi);
            }}
            className="mx-auto mt-9 flex max-w-2xl items-center gap-2 rounded-full border border-white/15 bg-white/8 p-2 backdrop-blur-xl focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/15"
          >
            <Search className="ml-4 h-5 w-5 shrink-0 text-white/45" />
            <label htmlFor="tracking-code" className="sr-only">Nomor resi</label>
            <input
              id="tracking-code"
              value={resi}
              onChange={(event) => setResi(event.target.value.toUpperCase())}
              placeholder="AAL-XXXX-XXXX"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 font-mono text-base tracking-wider text-white uppercase placeholder:text-white/30 focus:outline-none md:text-lg"
            />
            <button
              type="submit"
              disabled={!resi.trim() || state === "loading"}
              className="u-btn u-btn-accent u-btn-sheen shrink-0 px-5 py-3 disabled:opacity-50 md:px-7"
            >
              <span className="sheen" />
              {state === "loading" ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Lacak"}
              {state !== "loading" && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto min-h-[430px] max-w-5xl px-6 py-12 md:px-10 md:py-16">
        {state === "idle" && (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [ShieldCheck, "Data aman", "Hanya informasi perjalanan yang relevan ditampilkan."],
              [RefreshCw, "Pembaruan otomatis", "Posisi dan progres dicek kembali setiap 30 detik."],
              [Truck, "Satu kode resi", "Tidak perlu membuka sistem operasional lain."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className="glass rounded-3xl p-6">
                  <CardIcon className="mb-5 h-6 w-6 text-brand" />
                  <h2 className="font-display text-lg font-bold">{String(title)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{String(copy)}</p>
                </div>
              );
            })}
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10">
              <RefreshCw className="h-6 w-6 animate-spin text-brand" />
            </div>
            <p className="font-display text-xl font-bold">Menghubungkan data perjalanan</p>
            <p className="mt-2 text-sm text-ink-2">Mohon tunggu sebentar.</p>
          </div>
        )}

        {(state === "not-found" || state === "error") && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center md:p-12">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
            <h2 className="mt-5 font-display text-2xl font-bold">
              {state === "not-found" ? "Tracking belum ditemukan" : "Tracking belum bisa dibuka"}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-2">{message}</p>
            {searchedCode && <p className="mt-4 font-mono text-sm text-ink-3">{searchedCode}</p>}
          </div>
        )}

        {state === "found" && trip && (
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[2rem] bg-grad-ink p-7 text-white md:p-10">
              <div className="absolute right-0 top-0 h-52 w-52 translate-x-1/4 -translate-y-1/3 rounded-full bg-brand/30 blur-3xl" />
              <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <div className="flex items-center gap-2 font-mono text-label-sm text-white/45 uppercase">
                    <span className="h-2 w-2 rounded-full bg-ok shadow-[0_0_0_5px_rgba(34,197,94,0.13)]" />
                    Terhubung ke operasional
                  </div>
                  <p className="mt-5 font-mono text-sm tracking-wider text-white/50">{searchedCode}</p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{trackingLabel(trip)}</h2>
                  <p className="mt-3 flex items-center gap-2 text-white/65">
                    <MapPin className="h-4 w-4 text-accent" /> {trackingRoute(trip)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-xl">
                  <p className="font-mono text-label-sm text-white/40 uppercase">Kendaraan</p>
                  <p className="mt-1 font-display font-bold">{vehicleLabel(trip)}</p>
                  <p className="mt-2 font-mono text-xs text-white/40">{trip.trip_id}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="glass rounded-[2rem] p-6 md:p-8">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div>
                    <span className="kicker">Riwayat posisi</span>
                    <h3 className="mt-2 font-display text-2xl font-bold">Checkpoint perjalanan</h3>
                  </div>
                  <MapPin className="h-6 w-6 text-brand" />
                </div>

                {checkpoints.length ? (
                  <div className="space-y-0">
                    {checkpoints.map((checkpoint, index) => {
                      const map = mapsUrl(checkpoint);
                      return (
                        <div key={`${checkpoint.ts}-${index}`} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span className={`mt-1 h-3 w-3 rounded-full ${index === 0 ? "bg-brand shadow-[0_0_0_5px_rgba(11,95,255,0.12)]" : "bg-line-2"}`} />
                            {index < checkpoints.length - 1 && <span className="h-full min-h-16 w-px bg-line-2" />}
                          </div>
                          <div className="pb-7">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-display font-bold">{checkpoint.status || "Pembaruan lokasi"}</p>
                              {index === 0 && <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand uppercase">Terbaru</span>}
                            </div>
                            <p className="mt-1 text-sm text-ink-3">{formatTrackingTime(checkpoint.ts || checkpoint.date)}</p>
                            {map && (
                              <a href={map} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                                Lihat titik di peta <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="rounded-2xl bg-bg-2 p-5 text-sm leading-relaxed text-ink-2">
                    Belum ada checkpoint lokasi. Status perjalanan tetap akan diperbarui otomatis.
                  </p>
                )}
              </div>

              <div className="space-y-5">
                <div className="glass rounded-[2rem] p-6">
                  <Clock3 className="h-5 w-5 text-accent" />
                  <p className="mt-5 font-mono text-label-sm text-ink-3 uppercase">Terakhir diperiksa</p>
                  <p className="mt-2 font-display text-lg font-bold">{lastChecked ? formatTrackingTime(lastChecked.toISOString()) : "Baru saja"}</p>
                  <button onClick={() => tripId && void fetchTrip(tripId)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                    <RefreshCw className="h-4 w-4" /> Perbarui sekarang
                  </button>
                </div>

                <div className="glass rounded-[2rem] p-6">
                  <p className="font-mono text-label-sm text-ink-3 uppercase">Tahapan rute</p>
                  <div className="mt-5 space-y-4">
                    {legs.length ? legs.map((leg, index) => (
                      <div key={`${leg.asal}-${leg.tujuan}-${index}`} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                        <div>
                          <p className="text-sm font-semibold">{[leg.asal, leg.tujuan].filter(Boolean).join(" → ") || `Tahap ${index + 1}`}</p>
                          <p className="mt-1 text-xs text-ink-3">{leg.status || leg.tipe || "Dijadwalkan"}{leg.eta ? ` · ETA ${formatTrackingTime(leg.eta)}` : ""}</p>
                        </div>
                      </div>
                    )) : <p className="text-sm text-ink-2">Detail tahapan sedang disiapkan.</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
