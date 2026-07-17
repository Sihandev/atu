import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PopularRoutesSection } from "@/components/sections/PopularRoutesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Rute Pengiriman Kendaraan",
  description: "Daftar rute pengiriman kendaraan yang kami layani antar kota dan antar pulau di seluruh Indonesia.",
  url: "https://kirimkendaraan.co.id/rute",
});

export default function RoutesPage() {
  const breadcrumbItems = [
    { label: "Rute" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Rute", url: "https://kirimkendaraan.co.id/rute" }
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
        title="Rute Pengiriman"
        description="Kami melayani pengiriman kendaraan ke seluruh pelosok Nusantara dengan berbagai pilihan moda transportasi."
      />
      <PopularRoutesSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}