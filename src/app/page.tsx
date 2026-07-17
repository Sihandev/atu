import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  CarFront,
  ChevronRight,
  Clock3,
  Container as ContainerIcon,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { OrbitalFleet } from "@/components/3d/OrbitalFleet";
import { QuoteForm } from "@/components/sections/QuoteForm";

const services = [
  {
    index: "01",
    title: "Car Carrier",
    copy: "Kapasitas armada besar untuk pengiriman dealer, fleet, dan kendaraan pribadi antarkota.",
    icon: Truck,
    href: "/layanan/car-carrier",
  },
  {
    index: "02",
    title: "Enclosed Transport",
    copy: "Proteksi tertutup untuk kendaraan premium, klasik, koleksi, dan unit bernilai tinggi.",
    icon: ContainerIcon,
    href: "/layanan/towing",
  },
  {
    index: "03",
    title: "Inter-island",
    copy: "Koordinasi darat dan RoRo dalam satu alur dengan visibilitas status sepanjang perjalanan.",
    icon: Radar,
    href: "/layanan/antar-pulau",
  },
];

const steps = [
  ["01", "Rancang rute", "Tim kami menyusun metode, jadwal, dan proteksi sesuai kendaraan Anda."],
  ["02", "Inspeksi digital", "Kondisi kendaraan dicatat sebelum loading dan serah terima."],
  ["03", "Bergerak presisi", "Update milestone membuat perjalanan tetap terlihat dari awal hingga tujuan."],
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f4efe6] text-[#111318]">
      <section className="relative min-h-screen border-b border-black/10">
        <div className="pointer-events-none absolute inset-0 orbital-grid opacity-70" />

        <header className="relative z-30 mx-auto flex h-24 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="KirimKendaraan home">
            <span className="grid h-10 w-10 place-items-center bg-[#1557e8] text-lg font-black text-white">K</span>
            <span className="text-lg font-extrabold tracking-[-0.04em]">KirimKendaraan</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Navigasi utama">
            <Link href="/layanan" className="transition-colors hover:text-[#1557e8]">Layanan</Link>
            <Link href="/rute" className="transition-colors hover:text-[#1557e8]">Jangkauan</Link>
            <Link href="/cara-pengiriman" className="transition-colors hover:text-[#1557e8]">Cara Kerja</Link>
            <Link href="/tentang" className="transition-colors hover:text-[#1557e8]">Perusahaan</Link>
            <Link href="/artikel" className="transition-colors hover:text-[#1557e8]">Insight</Link>
          </nav>
          <Link
            href="/cek-tarif"
            className="group inline-flex items-center gap-3 rounded-full bg-[#111318] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
          >
            Cek tarif <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1500px] items-center px-5 pb-10 md:px-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative z-20 pb-10 pt-12 lg:pb-24 lg:pt-8">
            <div className="mb-8 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1557e8]">
              <span className="h-px w-10 bg-[#1557e8]" />
              Vehicle logistics / Indonesia
            </div>
            <h1 className="max-w-[780px] text-[clamp(4rem,8.2vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.085em]">
              Move with
              <span className="block font-serif font-normal italic tracking-[-0.07em]">precision.</span>
              <span className="block text-[#1557e8]">Arrive</span>
              ahead.
            </h1>
            <p className="mt-9 max-w-lg text-base leading-7 text-black/60 md:text-lg">
              Pengiriman kendaraan premium antarpulau—dirancang untuk memberi visibilitas, keamanan, dan kepastian dari garasi hingga tujuan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/cek-tarif" className="group inline-flex items-center justify-center gap-5 bg-[#1557e8] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#0d43c4]">
                Mulai pengiriman <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/tracking" className="group inline-flex items-center justify-center gap-5 border border-black/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] transition-all hover:border-black hover:bg-white/50">
                Track kendaraan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative -mx-5 min-h-[520px] lg:-ml-[18%] lg:mr-[-8%] lg:min-h-[720px]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/og.png"
                alt="Armada car carrier KirimKendaraan"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="orbital-poster object-cover object-right mix-blend-multiply"
              />
              <div className="absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-[#f4efe6] via-[#f4efe6]/85 to-transparent" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1557e8]/15" />
            <OrbitalFleet />
          </div>
        </div>

        <div className="relative z-20 border-t border-black/10 bg-[#111318] text-white">
          <div className="mx-auto grid max-w-[1500px] divide-y divide-white/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-10">
            <div className="flex items-center gap-3 py-6 md:pr-8">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9ff3b] opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#c9ff3b]" />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">Network active</p>
                <p className="mt-1 text-sm font-semibold">Nationwide operations</p>
              </div>
            </div>
            {[
              ["12K+", "Kendaraan terkirim"],
              ["98.7%", "Tepat waktu"],
              ["34", "Provinsi terjangkau"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-center gap-4 py-6 md:px-8">
                <span className="text-3xl font-black tracking-[-0.06em]">{value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111318] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1420px]">
          <div className="grid gap-10 border-b border-white/15 pb-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7da5ff]">Built for movement</p>
              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.065em] md:text-7xl">
                Bukan sekadar pindah.
                <span className="block text-white/35">Kami menjaga momentum.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="max-w-2xl text-xl leading-8 text-white/60">
                Dari satu kendaraan pribadi hingga mutasi armada perusahaan, setiap perjalanan dirancang dengan metode, proteksi, dan kontrol yang tepat.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.index}
                  href={service.href}
                  className="group border-b border-white/15 py-12 transition-colors hover:bg-white/[0.035] lg:border-r lg:px-9 first:lg:pl-0 last:lg:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#7da5ff]">{service.index}</span>
                    <Icon className="h-6 w-6 text-white/35 transition-colors group-hover:text-[#7da5ff]" />
                  </div>
                  <h3 className="mt-20 text-3xl font-bold tracking-[-0.04em]">{service.title}</h3>
                  <p className="mt-4 max-w-sm leading-7 text-white/50">{service.copy}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Eksplorasi <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-[#f4efe6] px-5 py-24 md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 orbital-grid opacity-40" />
        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1557e8]">Precision workflow</p>
              <h2 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                Tiga tahap.
                <span className="block font-serif font-normal italic text-[#1557e8]">Satu kendali.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-8 text-black/55">
                Proses yang jelas mengurangi asumsi. Anda tahu siapa yang menangani kendaraan, bagaimana unit bergerak, dan kapan tiba.
              </p>
              <Link href="/cara-pengiriman" className="mt-9 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-bold">
                Lihat proses lengkap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map(([number, title, copy]) => (
                <article key={number} className="group grid gap-8 border border-black/12 bg-white/55 p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white md:grid-cols-[90px_1fr_auto] md:p-10">
                  <span className="font-mono text-xs text-[#1557e8]">{number}</span>
                  <div>
                    <h3 className="text-3xl font-bold tracking-[-0.045em]">{title}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-black/55">{copy}</p>
                  </div>
                  <ArrowDownRight className="h-6 w-6 text-black/30 transition-transform group-hover:rotate-45 group-hover:text-[#1557e8]" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1557e8] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1420px]">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                {[
                  [ShieldCheck, "Inspeksi terdokumentasi"],
                  [BadgeCheck, "Proteksi perjalanan"],
                  [Clock3, "Milestone real-time"],
                ].map(([Icon, label]) => {
                  const TagIcon = Icon as typeof ShieldCheck;
                  return (
                    <span key={label as string} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold">
                      <TagIcon className="h-4 w-4" /> {label as string}
                    </span>
                  );
                })}
              </div>
              <h2 className="mt-10 max-w-4xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-8xl">
                Ready when
                <span className="block text-[#c9ff3b]">you are.</span>
              </h2>
            </div>
            <div className="border-l border-white/25 pl-8">
              <p className="max-w-lg text-xl leading-8 text-white/75">
                Ceritakan kendaraan dan tujuan Anda. Tim kami akan menyusun metode pengiriman yang paling masuk akal—tanpa bahasa rumit.
              </p>
              <Link href="/cek-tarif" className="mt-8 inline-flex items-center gap-5 bg-[#c9ff3b] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#111318]">
                Dapatkan estimasi <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-24 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#1557e8]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1557e8]">Quick quote</p>
            </div>
            <h2 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl">
              Rute berikutnya dimulai di sini.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-black/15 pt-8">
              <div>
                <CarFront className="h-6 w-6 text-[#1557e8]" />
                <p className="mt-3 text-sm font-semibold">Semua jenis kendaraan</p>
              </div>
              <div>
                <MapPin className="h-6 w-6 text-[#1557e8]" />
                <p className="mt-3 text-sm font-semibold">Jangkauan nasional</p>
              </div>
            </div>
          </div>
          <div className="orbital-quote">
            <QuoteForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#111318] px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-[#1557e8] font-black">K</span>
            <span className="font-bold">KirimKendaraan</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/55">
            <Link href="/kebijakan-privasi">Privasi</Link>
            <Link href="/syarat-ketentuan">Syarat</Link>
            <Link href="/kebijakan-klaim">Klaim</Link>
            <Link href="/kontak">Kontak</Link>
          </div>
          <p className="text-xs text-white/35">© {new Date().getFullYear()} KirimKendaraan.</p>
        </div>
      </footer>
    </main>
  );
}
