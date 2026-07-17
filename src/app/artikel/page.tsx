import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Artikel & Informasi Logistik",
  description: "Kumpulan artikel, tips, dan panduan lengkap seputar pengiriman kendaraan di Indonesia.",
  url: "https://kirimkendaraan.co.id/artikel",
});

export default function ArticlesPage() {
  const breadcrumbItems = [
    { label: "Artikel" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Artikel", url: "https://kirimkendaraan.co.id/artikel" }
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
        title="Pusat Informasi Pengiriman"
        description="Temukan berbagai tips bermanfaat, prosedur, dan update terbaru mengenai layanan pengiriman kendaraan."
      />

      {/* We reuse the ArticlesPreview which maps the articles from data.ts */}
      <div className="py-8">
        <ArticlesPreview />
      </div>

      <Footer />
    </main>
  );
}