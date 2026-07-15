import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { articles } from "@/config/data";

export function ArticlesPreview() {
  return (
    <Section id="artikel" className="bg-white">
      <Container>
        <SectionHeading
          title="Informasi & Tips"
          subtitle="Baca artikel terbaru kami untuk panduan lengkap seputar pengiriman kendaraan dan logistik."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <ArticleCard
              key={idx}
              title={article.title}
              date={article.date}
              image={article.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
