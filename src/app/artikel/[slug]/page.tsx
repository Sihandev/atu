import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { articlesList, servicesList } from "@/config/data";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const p = await params;
  const article = articlesList.find(a => a.id === p.slug);

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `\${article.title} | KirimKendaraan`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const p = await params;
  const article = articlesList.find(a => a.id === p.slug);

  if (!article) {
    notFound();
  }

  // Simple mock Markdown to JSX conversion for the sake of the exercise
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }

      if (paragraph.match(/^\d+\. /)) {
        const items = paragraph.split('\n').map(item => item.replace(/^\d+\. /, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 mb-6">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{__html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></li>
            ))}
          </ol>
        );
      }

      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.replace(/^- /, ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 mb-6">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{__html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></li>
            ))}
          </ul>
        );
      }

      return <p key={idx} className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></p>;
    });
  };

  const readingTime = Math.ceil(article.content.split(' ').length / 200) + " Menit Baca";

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="py-12 md:py-20">
        <Container>
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/artikel" className="hover:text-blue-600">Artikel</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{article.title}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-slate-500 mb-10 pb-10 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime}</span>
                </div>
              </div>

              {/* Placeholder Image */}
              <div className="w-full h-64 md:h-96 bg-slate-200 rounded-2xl mb-10 flex items-center justify-center text-slate-400">
                <span className="text-lg">Featured Image: {article.image}</span>
              </div>

              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">{article.excerpt}</p>
                {renderContent(article.content)}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              {/* Table of Contents (Mock) */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Daftar Isi</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {article.content.split('\n\n').filter(p => p.startsWith('### ')).map((h, i) => (
                    <li key={i} className="hover:text-blue-600 cursor-pointer">
                      {h.replace('### ', '')}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Services */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Layanan Terkait</h3>
                <div className="space-y-4">
                  {servicesList.slice(0, 3).map((svc, i) => (
                    <Link key={i} href={`/layanan/\${svc.id}`} className="block group">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 group-hover:border-blue-300 group-hover:shadow-sm transition-all">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{svc.title}</div>
                        <div className="text-sm text-slate-500 mt-1 line-clamp-2">{svc.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Artikel Lainnya</h3>
                <div className="space-y-4">
                  {articlesList.filter(a => a.id !== article.id).slice(0, 3).map((a, i) => (
                    <Link key={i} href={`/artikel/\${a.id}`} className="block group">
                      <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {a.title}
                      </div>
                      <div className="text-xs text-slate-500">{a.date}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <Footer />

      {/* Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "datePublished": new Date(article.date).toISOString(),
            "description": article.excerpt,
            "author": {
              "@type": "Organization",
              "name": "KirimKendaraan"
            }
          })
        }}
      />
    </main>
  );
}

export function generateStaticParams() {
  return articlesList.map((article) => ({
    slug: article.id,
  }));
}
