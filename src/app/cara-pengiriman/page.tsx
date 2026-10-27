import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { brand, processSteps } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Pengiriman",
  description: `Proses dan tahapan mudah mengirim kendaraan bersama ${brand.name}.`,
};

export default function CaraPengirimanPage() {
  return (
    <main className="min-h-screen pt-[84px]">
      <Navbar />

      <Section className="interior-hero">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">Cara Pengiriman</h1>
            <p className="text-xl text-ink-2 leading-relaxed">
              Kami merancang proses pengiriman yang transparan, mudah diikuti, dan minim birokrasi demi kenyamanan Anda.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background visual element */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-surface-3 -translate-x-1/2 hidden md:block" />

        <Container>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="mb-12 last:mb-0 relative">
                <ProcessStep
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  className="bg-surface rounded-2xl shadow-sm border border-line p-6 md:p-8"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-soft py-16 border-y border-line">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-ink mb-6">Dokumen yang Perlu Disiapkan</h2>
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-line text-left">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-soft text-brand flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-ink-2"><strong>Fotokopi KTP</strong> Pengirim dan Penerima kendaraan.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-soft text-brand flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-ink-2"><strong>STNK (Surat Tanda Nomor Kendaraan)</strong> Asli atau Fotokopi, bergantung pada syarat spesifik rute pelayaran antar pulau.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-soft text-brand flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">✓</div>
                  <p className="text-ink-2"><strong>Surat Jalan Kepolisian</strong> (Kami dapat membantu menguruskan jika diperlukan untuk rute khusus).</p>
                </li>
              </ul>
              <p className="mt-6 text-sm text-ink-3 italic">* BPKB asli sebaiknya tidak dikirimkan bersama kendaraan, dan cukup dibawa sendiri atau dikirim via kurir dokumen terpisah.</p>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
