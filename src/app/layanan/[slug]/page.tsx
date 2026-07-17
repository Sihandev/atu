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
import { services, processSteps, faqs, brand } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};

  return generateSEO({
    title: `Layanan ${service.title}`,
    description: service.description,
    url: `https://kirimkendaraan.co.id/layanan/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Layanan", href: "/layanan" },
    { label: service.title }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "Layanan", url: "https://kirimkendaraan.co.id/layanan" },
    { name: service.title, url: `https://kirimkendaraan.co.id/layanan/${slug}` }
  ]);

  const serviceSchema = generateServiceSchema(
    service.title,
    service.description,
    `https://kirimkendaraan.co.id/layanan/${slug}`
  );

  const faqSchema = generateFAQSchema(faqs); // Placeholder for service-specific FAQs

  return (
    <main className="min-h-screen pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        title={`Layanan ${service.title}`}
        description={service.description}
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Detail Layanan" />
              <div className="prose prose-slate max-w-none text-slate-600 mb-12">
                <p>
                  Layanan {service.title} dari {brand.name} dirancang untuk memberikan solusi terbaik bagi pengiriman kendaraan Anda. Kami mengutamakan keamanan, kecepatan, dan transparansi dalam setiap tahap pengiriman.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Sangat Cocok Untuk:</h3>
                <ul className="space-y-3 list-none p-0">
                  {service.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                       <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
                       <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Faktor Estimasi</h3>

               <div className="mb-8">
                 <h4 className="font-semibold text-slate-800 mb-3">Faktor Penentu Waktu (Durasi):</h4>
                 <ul className="space-y-2">
                   {service.durationFactors.map((factor, idx) => (
                     <li key={idx} className="flex items-center gap-2 text-slate-600">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                       {factor}
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                 <h4 className="font-semibold text-slate-800 mb-3">Faktor Penentu Harga:</h4>
                 <ul className="space-y-2">
                   {service.priceFactors.map((factor, idx) => (
                     <li key={idx} className="flex items-center gap-2 text-slate-600">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                       {factor}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 border-t border-slate-200">
        <Container>
           <SectionHeading title="Proses Pengiriman" centered />
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
              title="FAQ Layanan"
              subtitle="Pertanyaan umum seputar layanan ini."
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