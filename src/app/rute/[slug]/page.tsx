import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { routes, processSteps, faqs } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { CheckCircle2, Clock, MapPin, Truck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const route = routes.find((r) => r.id === slug);
  if (!route) return {};

  return generateSEO({
    title: `Pengiriman Kendaraan dari ${route.from} ke ${route.to}`,
    description: `Layanan ekspedisi pengiriman kendaraan dari ${route.from} tujuan ${route.to}. Estimasi waktu ${route.time} via ${route.type}.`,
    url: `https://kirimkendaraan.co.id/rute/${slug}`,
  });
}

export default async function RouteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const route = routes.find((r) => r.id === slug);

  if (!route) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Rute", href: "/rute" },
    { label: `${route.from} - ${route.to}` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Rute", url: "https://kirimkendaraan.co.id/rute" },
    { name: `${route.from} ke ${route.to}`, url: `https://kirimkendaraan.co.id/rute/${slug}` }
  ]);

  const faqSchema = generateFAQSchema(faqs);

  return (
    <main className="min-h-screen pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        title={`Pengiriman Kendaraan ${route.from} - ${route.to}`}
        description={`Layanan ekspedisi terpercaya untuk rute ${route.from} menuju ${route.to}.`}
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Informasi Rute" />
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Pengiriman kendaraan dari kota {route.from} ke {route.to} merupakan salah satu rute yang sering kami layani.
                Dengan pengalaman yang luas, kami memastikan kendaraan Anda tiba dengan aman melalui prosedur standar yang ketat.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
                 <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-lg text-slate-900">Asal: {route.from}</span>
                 </div>
                 <div className="flex items-center gap-4 mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-lg text-slate-900">Tujuan: {route.to}</span>
                 </div>
                 <div className="flex items-center gap-4 mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-lg text-slate-900">Estimasi: {route.time}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-lg text-slate-900">Jalur: {route.type}</span>
                 </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Metode yang Tersedia</h3>
               <ul className="space-y-3 mb-8">
                 {route.methods.map((method, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-slate-700">
                     <CheckCircle2 className="h-5 w-5 text-blue-600" />
                     {method}
                   </li>
                 ))}
               </ul>

               <h3 className="text-xl font-bold text-slate-900 mb-4">Penjelasan Transit (Jika Ada)</h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-6">
                 Untuk pengiriman antar pulau atau lintas provinsi panjang, kendaraan kemungkinan akan singgah di pool atau pelabuhan utama sebelum dilanjutkan ke tujuan akhir.
               </p>

               <h3 className="text-xl font-bold text-slate-900 mb-4">Faktor Penentu Harga</h3>
               <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                 <li>Jenis dan Dimensi Kendaraan</li>
                 <li>Lokasi pasti penjemputan & tujuan (Door to door)</li>
                 <li>Asuransi (Opsional)</li>
               </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 border-t border-slate-200">
        <Container>
           <SectionHeading title="Proses Penjemputan & Pengiriman" centered />
           <div className="max-w-2xl mx-auto">
            {processSteps.map((step, idx) => (
              <ProcessStep
                key={idx}
                step={step.step}
                title={step.title}
                description={step.description}
                isLast={idx === processSteps.length - 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white border-t border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="FAQ Rute Ini"
              subtitle={`Pertanyaan umum seputar pengiriman dari ${route.from} ke ${route.to}.`}
              centered
            />
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              {faqs.map((faq, idx) => (
                <FAQAccordion
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  className={idx === faqs.length - 1 ? "border-b-0" : ""}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}