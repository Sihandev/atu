import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { servicesList } from "@/config/data";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const p = await params;
  const service = servicesList.find(s => s.id === p.slug);

  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return {
    title: `\${service.title} | KirimKendaraan`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const p = await params;
  const service = servicesList.find(s => s.id === p.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{service.hero}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {service.explanation}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cocok Digunakan Untuk</h2>
              <ul className="space-y-4">
                {service.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-slate-700">{useCase}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Dokumentasi & Keamanan</h3>
                <p className="text-slate-700 leading-relaxed">{service.docsAndSafety}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Faktor Penentu Harga</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  {service.priceFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Faktor Penentu Durasi</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  {service.durationFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 py-16 md:py-24 border-y border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proses Layanan</h2>
            <p className="text-slate-600 text-lg">Tahapan jelas dari awal hingga kendaraan tiba di tujuan.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {service.process.map((step, idx) => (
              <ProcessStep
                key={idx}
                step={`0${idx + 1}`}
                title={step}
                description=""
                className="bg-white"
              />
            ))}
          </div>
        </Container>
      </Section>

      {service.faq.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan Seputar Layanan Ini</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                {service.faq.map((faq, idx) => (
                  <FAQAccordion
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                    className={idx === service.faq.length - 1 ? "border-b-0" : ""}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section className="py-12 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Cek Rute Terkait Layanan Ini:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {service.relatedRoutes.map((route, idx) => (
                <a key={idx} href={`/rute/kirim-mobil-${route}`} className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                  {route.replace('-', ' ke ').replace(/\b\w/g, l => l.toUpperCase())}
                </a>
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

export function generateStaticParams() {
  return servicesList.map((service) => ({
    slug: service.id,
  }));
}
