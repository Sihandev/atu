import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqs } from "@/config/data";
import { generateSEO, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Tanya Jawab (FAQ)",
  description: "Daftar pertanyaan yang sering ditanyakan seputar layanan pengiriman mobil dan motor.",
  url: "https://kirimkendaraan.co.id/faq",
});

export default function FAQPage() {
  const breadcrumbItems = [
    { label: "FAQ" }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "https://kirimkendaraan.co.id/" },
    { name: "FAQ", url: "https://kirimkendaraan.co.id/faq" }
  ]);

  const faqSchema = generateFAQSchema(faqs);

  return (
    <main className="min-h-screen pt-[72px] bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        title="Tanya Jawab"
        description="Punya pertanyaan seputar layanan kami? Temukan jawaban lengkapnya di sini."
      />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
          {faqs.map((faq, idx) => (
            <FAQAccordion
              key={idx}
              question={faq.question}
              answer={faq.answer}
              className={idx === faqs.length - 1 ? "border-b-0" : ""}
            />
          ))}
        </div>
      </Container>

      <FinalCTA />
      <Footer />
    </main>
  );
}