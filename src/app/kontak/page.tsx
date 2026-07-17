import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { brand } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = generateSEO({
  title: "Hubungi Kami",
  description: "Silakan hubungi tim customer service kami untuk informasi lebih lanjut mengenai pengiriman kendaraan Anda.",
  url: "https://kirimkendaraan.co.id/kontak",
});

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Kontak" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Kontak", url: "https://kirimkendaraan.co.id/kontak" }
  ]);

  return (
    <main className="min-h-screen pt-[72px] bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        title="Hubungi Kami"
        description="Tim support kami siap membantu Anda dengan informasi harga, jadwal, dan panduan pengiriman kendaraan."
      />

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Telepon / WhatsApp</h3>
            <p className="text-slate-600 mb-6">Tersedia Senin-Minggu, 08:00 - 17:00 WIB</p>
            <WhatsAppButton className="w-full" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
            <p className="text-slate-600 mb-6">Kirimkan pertanyaan detail Anda kepada kami.</p>
            <a href={`mailto:${brand.email}`} className="text-blue-600 font-semibold hover:underline">
              {brand.email}
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lokasi Pool</h3>
            <p className="text-slate-600 mb-6">Penyerahan kendaraan dapat dilakukan di lokasi pool terdekat.</p>
            <span className="text-slate-800 font-medium">
              Jakarta • Surabaya • Bali • Makassar
            </span>
          </div>
        </div>
      </Container>

      <FinalCTA />
      <Footer />
    </main>
  );
}