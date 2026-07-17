import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqs } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | KirimKendaraan",
  description: "Pertanyaan yang sering diajukan mengenai layanan pengiriman kendaraan kami.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Pertanyaan Umum (FAQ)</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan seputar layanan pengiriman kendaraan kami.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
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

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">Tidak menemukan jawaban yang Anda cari?</p>
              <a href="/kontak" className="text-blue-600 font-semibold hover:underline">
                Hubungi Tim Dukungan Kami
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
