import Link from "next/link";
import { ArrowRight, BadgeCheck, MoveRight, Radar, ShieldCheck, Truck } from "lucide-react";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HeroMedia } from "@/components/sections/HeroMedia";
import { Aurora } from "@/components/ui/Aurora";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Spotlight } from "@/components/ui/Spotlight";
import { brand, coverage, servicesList, routesList, trustPoints } from "@/config/data";

/* Served from /public so the site does not depend on Google's temporary
   Stitch CDN URLs, which expire and would leave the hero and every service
   tile blank in production. Replace these with real fleet photography when
   it is available — same filenames, no code change needed. */
const IMG = {
  hero: "/img/hero-car-carrier.jpg",
  selfDrive: "/img/self-drive.jpg",
  towing: "/img/towing.jpg",
  roro: "/img/roro.jpg",
};

const featured = [
  { id: "car-carrier", kicker: "Logistik", image: IMG.hero },
  { id: "self-drive", kicker: "Personal", image: IMG.selfDrive },
  { id: "towing", kicker: "Eksklusif", image: IMG.towing },
  { id: "antar-pulau", kicker: "Maritim", image: IMG.roro },
]
  .map((tile) => {
    const service = servicesList.find((s) => s.id === tile.id);
    return service ? { ...tile, title: service.title, description: service.description } : null;
  })
  .filter((tile): tile is NonNullable<typeof tile> => tile !== null);

const heroStats = [
  { label: "Provinsi", value: coverage.provinces, suffix: "+" },
  { label: "Kota Tujuan", value: coverage.cities, suffix: "+" },
  { label: "Pelabuhan", value: coverage.ports, suffix: "+" },
  { label: "Ketepatan", value: coverage.onTimeRate, suffix: "%" },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative flex min-h-[94vh] items-center overflow-hidden pt-20">
          <HeroMedia
            src={IMG.hero}
            alt="Truk car carrier membawa kendaraan melintasi jembatan saat matahari terbit"
          />

          <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-6 py-20 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
            <Reveal className="max-w-3xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-label-sm text-accent-2 uppercase">
                  {brand.tagline}
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[1.0] font-extrabold tracking-[-0.04em] text-white">
                Kendaraan &amp; alat berat,
                <br />
                <span className="text-gradient-inv">sampai dengan utuh.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
                Antar kota dan antar pulau, menjangkau {coverage.provinces}+ provinsi dan{" "}
                {coverage.cities}+ kota. Terasuransi penuh, dilacak lewat GPS, dan didampingi tim
                yang siaga 24 jam.
              </p>

              <div className="mt-11 flex flex-wrap gap-4">
                <Link href="/cek-tarif" className="u-btn u-btn-accent u-btn-sheen px-8 py-4">
                  <span className="sheen" />
                  Cek Tarif Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/rute" className="u-btn u-btn-glass-dark px-8 py-4">
                  Lihat Rute
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-20">
              <div className="grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 px-5 py-6">
                    <div className="font-display text-3xl font-extrabold text-white">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1.5 font-mono text-label-sm text-white/55 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ROUTE TICKER ────────────────────────────────────── */}
        <section className="ticker-wrap relative overflow-hidden border-y border-line bg-surface py-5">
          <div className="ticker">
            {[0, 1].map((pass) => (
              <div key={pass} className="flex shrink-0 items-center" aria-hidden={pass === 1}>
                {routesList.map((route) => (
                  <span key={route.id} className="flex items-center gap-4 px-8">
                    <span className="font-mono text-label-sm text-brand uppercase">
                      {route.origin} → {route.destination}
                    </span>
                    <span className="text-sm text-ink-2">{route.duration}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── LAYANAN ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-28">
          <Aurora className="opacity-70" />

          <div className="relative mx-auto max-w-[var(--container-max)] px-6 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
            <Reveal className="mb-16 max-w-2xl">
              <span className="kicker mb-5">Layanan Unggulan</span>
              <h2 className="font-display text-headline-lg">
                Satu solusi untuk <span className="text-gradient">setiap muatan.</span>
              </h2>
              <p className="mt-5 text-lg text-ink-2">
                Dari mobil pribadi sampai alat berat 30 ton — metode, armada, dan proteksi kami
                sesuaikan dengan jenis muatan dan jarak tempuhnya.
              </p>
            </Reveal>

            <div className="flex h-auto flex-col gap-5 md:h-[540px] md:flex-row">
              {featured.map((tile, i) => (
                <Reveal key={tile.id} delay={i * 0.08} className="service-row-expand group flex-grow">
                  <Link
                    href={`/layanan/${tile.id}`}
                    className="relative block h-72 overflow-hidden rounded-[1.75rem] md:h-[540px]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                      style={{ backgroundImage: `url("${tile.image}")` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,15,0.96)_0%,rgba(5,11,26,0.45)_40%,transparent_74%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(60,57,168,0.66),transparent_58%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="grain absolute inset-0" />
                    <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-white/12 ring-inset" />

                    <div className="absolute bottom-0 left-0 w-full p-7">
                      <span className="mb-2.5 block font-mono text-label-sm text-accent-2 uppercase">
                        {tile.kicker}
                      </span>
                      <h3 className="font-display text-2xl leading-tight font-bold text-white">
                        {tile.title}
                      </h3>
                      <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm leading-relaxed text-white/80">
                            {tile.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent-2">
                            Pelajari Selengkapnya
                            <MoveRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENTO ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-y border-line bg-bg-2 py-28">
          <Aurora className="opacity-60" />

          <div className="relative mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-5 px-6 md:px-10 lg:grid-cols-4 lg:px-[var(--spacing-margin-desktop)]">
            <Reveal className="lg:col-span-2">
              <Spotlight className="glass flex h-full flex-col justify-between rounded-[1.75rem] p-10">
                <div>
                  <span className="kicker mb-5">Jangkauan Nasional</span>
                  <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.15] font-bold">
                    {coverage.provinces}+ provinsi, {coverage.cities}+ kota, dan {coverage.ports}+
                    pelabuhan terhubung lewat{" "}
                    <span className="text-gradient">jalur darat dan laut.</span>
                  </p>
                </div>
                <div className="mt-14 flex gap-10">
                  <div>
                    <div className="font-display text-4xl font-extrabold text-brand">
                      <Counter to={coverage.shipments} suffix="+" />
                    </div>
                    <div className="mt-1.5 font-mono text-label-sm text-ink-2 uppercase">
                      Pengiriman Selesai
                    </div>
                  </div>
                  <div className="w-px self-stretch bg-line-2" />
                  <div>
                    <div className="font-display text-4xl font-extrabold text-accent">
                      <Counter to={coverage.onTimeRate} suffix="%" />
                    </div>
                    <div className="mt-1.5 font-mono text-label-sm text-ink-2 uppercase">
                      Ketepatan Waktu
                    </div>
                  </div>
                </div>
              </Spotlight>
            </Reveal>

            {[
              {
                icon: ShieldCheck,
                title: "Inspeksi Terdokumentasi",
                copy: "Kondisi kendaraan dicatat dan difoto sebelum dan sesudah pengiriman.",
                grad: "bg-grad-brand",
              },
              {
                icon: Radar,
                title: "Pelacakan GPS",
                copy: "Posisi unit dipantau sepanjang perjalanan, didukung tim yang siaga 24 jam.",
                grad: "bg-grad-accent",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.08}>
                <Spotlight className="glass group flex h-full flex-col items-center justify-center rounded-[1.75rem] p-8 text-center">
                  <div
                    className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${card.grad} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="mb-2 font-display text-xl font-bold">{card.title}</h5>
                  <p className="text-sm leading-relaxed text-ink-2">{card.copy}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── TRACKING ────────────────────────────────────────── */}
        <section className="relative mx-auto max-w-[var(--container-max)] px-6 py-20 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
          <Reveal>
            <Spotlight className="relative overflow-hidden rounded-[2.25rem] bg-grad-ink p-8 md:p-16 lg:p-20">
              <Aurora className="opacity-45" />
              <div className="absolute inset-0 rounded-[2.25rem] ring-1 ring-white/10 ring-inset" />

              <div className="relative z-10 grid items-center gap-14 md:grid-cols-2">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                    </span>
                    <span className="font-mono text-label-sm text-white/70 uppercase">
                      Pelacakan Real-Time
                    </span>
                  </div>

                  <h2 className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-white">
                    Lacak <span className="text-gradient-inv">kiriman Anda.</span>
                  </h2>
                  <p className="mt-6 text-lg text-white/60">
                    Masukkan nomor resi untuk melihat posisi kendaraan dan perkiraan waktu tiba.
                  </p>

                  <form
                    action="/tracking"
                    className="mt-9 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-2 backdrop-blur-xl transition-all focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/20"
                  >
                    <label htmlFor="resi" className="sr-only">
                      Nomor resi
                    </label>
                    <input
                      id="resi"
                      name="resi"
                      type="text"
                      placeholder="AAL-0000-0000"
                      className="w-full min-w-0 flex-1 border-none bg-transparent px-5 py-3 font-display text-lg tracking-wider text-white uppercase placeholder:text-white/35 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="u-btn u-btn-accent u-btn-sheen shrink-0 px-7 py-3"
                    >
                      <span className="sheen" />
                      Lacak
                    </button>
                  </form>
                </div>

                <div className="hidden md:block">
                  <div className="rotate-2 rounded-[1.5rem] bg-[linear-gradient(150deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-px transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0">
                    <div className="rounded-[1.5rem] bg-[#090b2b]/92 p-6 backdrop-blur-xl">
                      <div className="mb-7 flex items-center gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-grad-brand">
                          <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-white">AAL-8829-1922</div>
                          <div className="font-mono text-label-sm text-ok uppercase">
                            Contoh tampilan
                          </div>
                        </div>
                      </div>

                      {[
                        { label: "Tahap 1", text: "Penjemputan & inspeksi", done: true },
                        { label: "Tahap 2", text: "Perjalanan menuju tujuan", done: false },
                      ].map((step, i, arr) => (
                        <div key={step.label} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={
                                step.done
                                  ? "h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(105,40,180,0.22)]"
                                  : "h-2.5 w-2.5 rounded-full border border-white/30"
                              }
                            />
                            {i < arr.length - 1 && (
                              <div className="h-12 w-px bg-[linear-gradient(180deg,rgba(105,40,180,0.7),rgba(255,255,255,0.08))]" />
                            )}
                          </div>
                          <div className="-mt-1">
                            <div className="font-mono text-label-sm text-white/40 uppercase">
                              {step.label}
                            </div>
                            <div className="mt-1 text-sm text-white">{step.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Spotlight>
          </Reveal>
        </section>

        {/* ── STANDAR KERJA ───────────────────────────────────── */}
        <section className="relative overflow-hidden pb-28">
          <div className="relative mx-auto max-w-[var(--container-max)] px-6 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
            <Reveal className="mb-14 max-w-2xl">
              <span className="kicker mb-5">Standar Kerja</span>
              <h2 className="font-display text-headline-lg">
                Cara kami <span className="text-gradient">menjaga muatan Anda.</span>
              </h2>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point, i) => (
                <Reveal key={point} delay={i * 0.06}>
                  <Spotlight className="glass flex h-full items-start gap-4 rounded-2xl p-6">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-label-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-ink">{point}</span>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="relative bg-grad-ink py-28">
            <Aurora className="opacity-55" />
            <div className="grain absolute inset-0" />
            <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 text-center md:px-10 lg:px-[var(--spacing-margin-desktop)]">
              <Reveal>
                <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.03] font-extrabold tracking-[-0.035em] text-white">
                  Siap kirim <span className="text-gradient-inv">kendaraan Anda?</span>
                </h2>
                <p className="mx-auto mt-7 max-w-xl text-lg text-white/60">
                  Ceritakan unit dan tujuan Anda. Kami susun metode yang paling masuk akal, lengkap
                  dengan estimasi biayanya.
                </p>
                <div className="mt-11 flex flex-wrap justify-center gap-4">
                  <Link href="/cek-tarif" className="u-btn u-btn-accent u-btn-sheen px-8 py-4">
                    <span className="sheen" />
                    Cek Tarif Gratis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/kontak" className="u-btn u-btn-glass-dark px-8 py-4">
                    Hubungi Admin
                  </Link>
                </div>
                <p className="mt-8 inline-flex items-center gap-2 font-mono text-label-sm text-white/45 uppercase">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  Operasional {brand.hours}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
