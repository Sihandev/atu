export const ALYSSA_TRACKING_API = "https://alyssaautologistik.up.railway.app/api/public/trips";

const TRIP_ID_PATTERN = /TRIP-[A-Z0-9-]+/i;

export function extractTripId(input: string): string | null {
  const match = input.trim().match(TRIP_ID_PATTERN);
  return match ? match[0].toUpperCase() : null;
}

export interface TrackingCheckpoint {
  date?: string | null;
  lat?: number | string | null;
  lng?: number | string | null;
  status?: string | null;
  ts?: string | null;
}

export interface TrackingLeg {
  asal?: string | null;
  eta?: string | null;
  status?: string | null;
  tipe?: string | null;
  tujuan?: string | null;
}

export interface AlyssaTrip {
  trip_id: string;
  updated_at?: string | null;
  nama_driver?: string | null;
  nopol?: string | null;
  tipe_kendaraan?: string | null;
  vehicle_type?: string | null;
  route?: string | { asal?: string; tujuan?: string } | null;
  progress?: {
    handover_complete?: boolean;
    initial_complete?: boolean;
  } | null;
  daily_checkpoints?: TrackingCheckpoint[] | null;
  legs?: TrackingLeg[] | null;
}

export function trackingLabel(trip: AlyssaTrip): string {
  if (trip.progress?.handover_complete) return "Telah diterima";
  const activeLeg = [...(trip.legs ?? [])].reverse().find((leg) => leg.status);
  if (activeLeg?.status) return activeLeg.status;
  if (trip.progress?.initial_complete) return "Dalam proses pengiriman";
  return "Menunggu proses operasional";
}

export function trackingRoute(trip: AlyssaTrip): string {
  if (typeof trip.route === "string" && trip.route.trim()) return trip.route;
  if (trip.route && typeof trip.route === "object") {
    const route = [trip.route.asal, trip.route.tujuan].filter(Boolean).join(" → ");
    if (route) return route;
  }
  const legs = trip.legs ?? [];
  return [legs[0]?.asal, legs.at(-1)?.tujuan].filter(Boolean).join(" → ") || "Rute diproses";
}

export function formatTrackingTime(value?: string | null): string {
  if (!value) return "Waktu belum tersedia";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Makassar",
  });
}
