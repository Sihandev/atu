import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Cara Pengiriman Kendaraan",
  description: "Langkah-langkah mudah untuk mengirimkan kendaraan Anda antar kota atau antar pulau dengan aman dan terpercaya.",
  url: "https://kirimkendaraan.co.id/cara-pengiriman",
});

export default function ProcessPage() {
  const breadcrumbItems = [
    { label: "Cara Pengiriman" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Cara Pengiriman", url: "https://kirimkendaraan.co.id/cara-pengiriman" }
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
        title="Proses Pengiriman yang Jelas"
        description="Kami membuat proses logistik pengiriman kendaraan menjadi sederhana, terstruktur, dan transparan untuk kenyamanan Anda."
      />
      <div className="py-8 bg-white">
        {/* Reuse the existing section, possibly adding more context visually around it */}
        <HowItWorksSection />
      </div>
      <FinalCTA />
      <Footer />
    </main>
  );
}