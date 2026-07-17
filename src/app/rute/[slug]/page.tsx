import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { routesList } from "@/config/data";
import { ArrowRight, Clock, ShieldCheck, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface RoutePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const p = await params;
  const route = routesList.find(r => r.id === p.slug);

  if (!route) return { title: "Rute Tidak Ditemukan" };

  return {
    title: `Kirim Mobil ${route.origin} ke ${route.destination} | KirimKendaraan`,
    description: `Layanan pengiriman kendaraan dari ${route.origin} ke ${route.destination}. Estimasi waktu ${route.duration}.`,
  };
}

export default async function RouteDetailPage({ params }: RoutePageProps) {
  const p = await params;
  const route = routesList.find(r => r.id === p.slug);

  if (!route) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-1.5 mb-8 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-sm font-medium text-slate-300">Rute Populer</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="text-3xl md:text-5xl font-bold">{route.origin}</div>
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 text-blue-400">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="md:hidden text-blue-400">
                <ArrowRight className="w-8 h-8 rotate-90" />
              </div>
              <div className="text-3xl md:text-5xl font-bold">{route.destination}</div>
            </div>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Layanan pengiriman kendaraan profesional, aman, dan tepat waktu untuk rute {route.origin} ke {route.destination}.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-6 py-4 border border-slate-700">
                <Clock className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-400">Estimasi Waktu</div>
                  <div className="font-semibold">{route.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-6 py-4 border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-400">Metode Tersedia</div>
                  <div className="font-semibold">{route.methods.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Proses & Transit
                </h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-slate-700">
                    <strong>Info Transit:</strong> {route.transit}
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold text-slate-900 mb-4">Tahapan Perjalanan:</h3>
                    <div className="space-y-4">
                      {route.process.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 z-10">
                              {idx + 1}
                            </div>
                            {idx !== route.process.length - 1 && (
                              <div className="w-px h-full bg-slate-200 mt-2 -mb-2"></div>
                            )}
                          </div>
                          <div className="pt-1 pb-4">
                            <p className="text-slate-700 font-medium">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {route.faq.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Pertanyaan Seputar Rute Ini</h3>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                    {route.faq.map((faq, idx) => (
                      <FAQAccordion
                        key={idx}
                        question={faq.question}
                        answer={faq.answer}
                        className={idx === route.faq.length - 1 ? "border-b-0" : ""}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Faktor Penentu Harga</h3>
                <ul className="space-y-3">
                  {route.priceFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start text-slate-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Tertarik dengan Rute ini?</h3>
                <p className="text-slate-600 text-sm mb-6">Dapatkan penawaran harga terbaik untuk pengiriman dari {route.origin} ke {route.destination}.</p>
                <Button className="w-full" asChild>
                  <Link href={`/cek-tarif?origin=${route.origin}&destination=${route.destination}`}>
                    Minta Penawaran Harga
                  </Link>
                </Button>
              </div>

              {route.relatedRoutes.length > 0 && (
                <div className="pt-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Rute Terkait</h3>
                  <div className="space-y-2">
                    {route.relatedRoutes.map((rr, idx) => (
                      <Link key={idx} href={`/rute/kirim-mobil-${rr}`} className="block text-blue-600 font-medium hover:underline text-sm">
                        Kirim Mobil {rr.replace('-', ' ke ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return routesList.map((route) => ({
    slug: route.id,
  }));
}
