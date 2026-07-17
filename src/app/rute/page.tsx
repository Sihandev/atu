import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RouteCard } from "@/components/ui/RouteCard";
import { routesList } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rute Pengiriman Kendaraan | KirimKendaraan",
  description: "Daftar rute populer pengiriman kendaraan antar kota dan antar pulau di Indonesia.",
};

export default function RuteIndexPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Rute Pengiriman Populer</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Jelajahi berbagai rute pengiriman kendaraan yang kami layani ke seluruh penjuru Nusantara.
              Temukan informasi estimasi waktu dan metode untuk rute Anda.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routesList.map((route, index) => (
              <RouteCard
                key={index}
                from={route.origin}
                to={route.destination}
                time={route.duration}
                type={route.methods.join(" / ")}
                href={`/rute/\${route.id}`}
              />
            ))}
          </div>
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak Menemukan Rute Anda?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">Kami melayani pengiriman ke hampir seluruh wilayah di Indonesia. Hubungi kami untuk rute spesifik Anda.</p>
            <a href="/cek-tarif" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Tanyakan Rute via WhatsApp
            </a>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
