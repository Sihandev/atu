import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { brand, coverage, servicesList } from "@/config/data";

const company = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Cara Pengiriman", href: "/cara-pengiriman" },
  { label: "Artikel", href: "/artikel" },
];

const help = [
  { label: "FAQ", href: "/faq" },
  { label: "Kontak", href: "/kontak" },
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];

function Column({ heading, items }: { heading: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="mb-6 font-bold text-white">{heading}</h5>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    /* Picks up where the CTA band's gradient ends so the two read as one
       continuous surface instead of showing a seam. */
    <footer className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#02060f_0%,#01030a_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,194,255,0.55),transparent)]"
      />
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-gutter px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-[var(--spacing-margin-desktop)]">
        <div>
          <div className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white">{brand.name}</div>
          <p className="mt-1 font-mono text-label-sm tracking-widest text-accent uppercase">
            {brand.legalName}
          </p>
          <p className="mt-6 text-white/60">
            {brand.tagline} — antar kota dan antar pulau, menjangkau {coverage.provinces}+ provinsi
            dan {coverage.cities}+ kota di Indonesia.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/50">
            {brand.address}
          </p>
          <p className="mt-3 text-sm text-white/50">
            Operasional: {brand.hours}
          </p>
          <p className="mt-3 text-sm text-white/50">NPWP {brand.npwp}</p>
        </div>

        <Column heading="Perusahaan" items={company} />
        <Column
          heading="Layanan"
          items={servicesList.map((s) => ({ label: s.title, href: `/layanan/${s.id}` }))}
        />
        <Column heading="Bantuan" items={help} />
      </div>

      <div className="mx-auto max-w-[var(--container-max)] px-6 pb-12 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
        <h5 className="mb-6 font-bold text-white">Hubungi Kami</h5>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          {/* Email is only rendered if the business actually publishes one. */}
          {brand.email && (
            <a
              href={`mailto:${brand.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
          <a
            href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
            className="font-display text-lg text-white transition-colors hover:text-accent"
          >
            {brand.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} {brand.legalName}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
