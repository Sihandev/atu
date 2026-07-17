import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TrustSection } from "@/components/sections/TrustSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | KirimKendaraan",
  description: "Mengenal lebih dekat layanan pengiriman kendaraan terpercaya di Indonesia.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tentang Kami</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Kami adalah penyedia layanan logistik kendaraan yang berdedikasi untuk memberikan pengalaman pengiriman yang aman, transparan, dan dapat diandalkan ke seluruh pelosok Indonesia.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <SectionHeading
                title="Misi Kami"
                subtitle="Memberikan ketenangan pikiran bagi setiap pemilik kendaraan saat memindahkan aset berharganya."
              />
              <div className="prose prose-slate prose-lg mt-6">
                <p>
                  Pengiriman kendaraan seringkali menjadi proses yang membingungkan dan penuh kekhawatiran bagi banyak orang. Di <strong>KirimKendaraan</strong>, kami hadir untuk mengubah stigma tersebut.
                </p>
                <p>
                  Dengan pengalaman melayani berbagai rute di Indonesia, kami memahami betul tantangan logistik di negara kepulauan. Oleh karena itu, kami menggabungkan standar operasional yang ketat, komunikasi yang proaktif, dan jaringan mitra pengangkut profesional untuk memastikan kendaraan Anda tiba dengan selamat.
                </p>
                <p>
                  Kami beroperasi secara mandiri dan transparan, tanpa mengklaim kepemilikan aset yang bukan milik kami, namun bertanggung jawab penuh atas setiap proses pengiriman yang diamanatkan kepada kami.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-slate-200 rounded-2xl h-80 md:h-[500px] w-full flex items-center justify-center text-slate-400">
              <span className="text-lg">Gambar Operasional Logistik</span>
            </div>
          </div>
        </Container>
      </Section>

      <TrustSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
