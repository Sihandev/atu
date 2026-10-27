import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqs } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering diajukan mengenai layanan pengiriman kendaraan kami.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-[84px]">
      <Navbar />

      <Section className="interior-hero">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">Pertanyaan Umum (FAQ)</h1>
            <p className="text-xl text-ink-2 leading-relaxed">
              Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan seputar layanan pengiriman kendaraan kami.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-surface rounded-2xl shadow-sm border border-line p-6 md:p-8">
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
              <p className="text-ink-2 mb-4">Tidak menemukan jawaban yang Anda cari?</p>
              <a href="/kontak" className="text-brand font-semibold hover:underline">
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
