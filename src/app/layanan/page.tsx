import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Layanan Pengiriman Kendaraan",
  description: "Berbagai pilihan layanan pengiriman mobil dan motor antar kota dan antar pulau di seluruh Indonesia.",
  url: "https://kirimkendaraan.co.id/layanan",
});

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Layanan" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Layanan", url: "https://kirimkendaraan.co.id/layanan" }
  ]);

  return (
    <main className="min-h-screen pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        title="Layanan Kami"
        description="Pilih layanan pengiriman kendaraan yang paling sesuai dengan kebutuhan waktu, budget, dan jenis kendaraan Anda."
      />
      <ServicesSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}