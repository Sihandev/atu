import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { processSteps } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Pengiriman | KirimKendaraan",
  description: "Proses dan tahapan mudah mengirim kendaraan bersama KirimKendaraan.",
};

export default function CaraPengirimanPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Cara Pengiriman</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Kami merancang proses pengiriman yang transparan, mudah diikuti, dan minim birokrasi demi kenyamanan Anda.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background visual element */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

        <Container>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="mb-12 last:mb-0 relative">
                <ProcessStep
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-blue-50 py-16 border-y border-blue-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Dokumen yang Perlu Disiapkan</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 text-left">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-slate-700"><strong>Fotokopi KTP</strong> Pengirim dan Penerima kendaraan.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-slate-700"><strong>STNK (Surat Tanda Nomor Kendaraan)</strong> Asli atau Fotokopi, bergantung pada syarat spesifik rute pelayaran antar pulau.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-slate-700"><strong>Surat Jalan Kepolisian</strong> (Kami dapat membantu menguruskan jika diperlukan untuk rute khusus).</p>
                </li>
              </ul>
              <p className="mt-6 text-sm text-slate-500 italic">* BPKB asli sebaiknya tidak dikirimkan bersama kendaraan, dan cukup dibawa sendiri atau dikirim via kurir dokumen terpisah.</p>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
