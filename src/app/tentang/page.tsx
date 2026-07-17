import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { brand } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Tentang Kami",
  description: `Pelajari lebih lanjut tentang ${brand.name}, visi, misi, dan komitmen kami dalam memberikan layanan pengiriman kendaraan terbaik di Indonesia.`,
  url: "https://kirimkendaraan.co.id/tentang",
});

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Tentang Kami" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Tentang", url: "https://kirimkendaraan.co.id/tentang" }
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
        title="Tentang Kami"
        description={`${brand.name} didirikan dengan tujuan menyederhanakan proses pengiriman kendaraan antar kota dan antar pulau di Indonesia dengan mengedepankan keamanan dan transparansi.`}
      />

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Misi Kami</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Kami menyadari bahwa mengirimkan aset berharga seperti kendaraan seringkali menimbulkan kekhawatiran bagi pemiliknya. Oleh karena itu, misi utama kami adalah memberikan ketenangan pikiran.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Kami beroperasi secara transparan sebagai fasilitator logistik kendaraan terpercaya. Dengan sistem dokumentasi yang ketat, jaringan mitra armada yang handal, dan customer service yang proaktif, kami memastikan setiap perpindahan kendaraan Anda tercatat dan terlindungi.
            </p>
          </div>
          <div className="bg-slate-100 rounded-3xl aspect-square flex items-center justify-center p-12">
             <div className="text-center">
               <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-4xl font-bold mx-auto mb-6">
                 K
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">{brand.name}</h3>
               <p className="text-slate-500">Aman, Cepat, Terpercaya.</p>
             </div>
          </div>
        </div>
      </Container>

      <FinalCTA />
      <Footer />
    </main>
  );
}