import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  date: string;
  image: string;
  className?: string;
  href?: string;
}

export function ArticleCard({ title, date, image, className, href }: ArticleCardProps) {
  const CardContent = (
    <>
      <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-200" />
        {/* Placeholder for actual image since we use local/optimized assets */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
           Image Placeholder
        </div>
      </div>
      <div className="p-6">
        <time className="mb-3 block text-sm font-medium text-blue-600">{date}</time>
        <h3 className="mb-4 text-xl font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <div className="inline-flex items-center text-sm font-medium text-slate-900 transition-colors group-hover:text-blue-600">
          Baca Selengkapnya
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg", className)}>
      {CardContent}
    </div>
  );
}
