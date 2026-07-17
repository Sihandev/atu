import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { articles } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return {};

  return generateSEO({
    title: article.title,
    description: article.excerpt,
    url: `https://kirimkendaraan.co.id/artikel/${slug}`,
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Artikel", href: "/artikel" },
    { label: article.title }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Artikel", url: "https://kirimkendaraan.co.id/artikel" },
    { name: article.title, url: `https://kirimkendaraan.co.id/artikel/${slug}` }
  ]);

  const articleSchema = generateArticleSchema(
    article.title,
    article.excerpt,
    `https://kirimkendaraan.co.id/artikel/${slug}`,
    article.date
  );

  return (
    <main className="min-h-screen pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        title={article.title}
        description={`Dipublikasikan pada: ${article.date} • Estimasi membaca: 3 menit`}
      />

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-slate prose-lg max-w-none text-slate-700">
               <p className="lead text-xl text-slate-500 mb-8 font-medium">
                 {article.excerpt}
               </p>

               {/* Simplified structured content rendering for this exercise */}
               <p>
                 {article.content}
               </p>

               {/* Placeholders for actual MDX/rich content rendering */}
               <h3>Langkah Pertama</h3>
               <p>Pastikan semua dokumen kendaraan lengkap, seperti fotokopi STNK dan KTP pengirim. BPKB sebaiknya disimpan oleh pemilik kendaraan dan tidak ikut disertakan dalam pengiriman.</p>

               <h3>Pengecekan Fisik</h3>
               <p>Sebelum diserahterimakan, lakukan pengecekan fisik bersama petugas. Catat semua baret atau cacat yang sudah ada sebelumnya pada form serah terima. Kosongkan barang berharga dari dalam kendaraan.</p>

               <h3>Pilih Layanan Terpercaya</h3>
               <p>Pastikan Anda menggunakan jasa ekspedisi yang memiliki legalitas jelas, kantor fisik, dan opsi asuransi pengiriman untuk keamanan maksimal.</p>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <div className="sticky top-28 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4">Daftar Isi</h4>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li><a href="#" className="hover:text-blue-600">Persiapan Dokumen</a></li>
                  <li><a href="#" className="hover:text-blue-600">Pengecekan Fisik</a></li>
                  <li><a href="#" className="hover:text-blue-600">Memilih Jasa Pengiriman</a></li>
                </ul>

                <h4 className="font-bold text-slate-900 mb-4">Layanan Terkait</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li><Link href="/layanan/kirim-mobil" className="hover:text-blue-600 font-medium">Kirim Mobil Antar Pulau &rarr;</Link></li>
                  <li><Link href="/layanan/car-carrier" className="hover:text-blue-600 font-medium">Layanan Car Carrier &rarr;</Link></li>
                </ul>
             </div>
          </div>
        </div>
      </Container>

      <FinalCTA />
      <Footer />
    </main>
  );
}