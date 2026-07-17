import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { servicesList } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Pengiriman Kendaraan | KirimKendaraan",
  description: "Eksplorasi berbagai layanan pengiriman kendaraan kami: Kirim Mobil, Motor, Towing, Car Carrier, dan Antar Pulau.",
};

export default function LayananIndexPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Layanan Kami</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Solusi logistik kendaraan terlengkap untuk berbagai kebutuhan. Pilih layanan yang paling sesuai dengan durasi dan anggaran Anda.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={`/layanan/${service.id}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
