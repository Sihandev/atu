import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { articlesList } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Panduan | KirimKendaraan",
  description: "Kumpulan artikel, tips, dan panduan lengkap seputar pengiriman kendaraan antar kota dan antar pulau di Indonesia.",
};

export default function ArtikelIndexPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Artikel & Panduan</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tips, trik, dan informasi penting seputar dunia logistik dan pengiriman kendaraan.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesList.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                date={article.date}
                image={article.image}
                href={`/artikel/${article.id}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
