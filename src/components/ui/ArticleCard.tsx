import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="aspect-[16/9] w-full bg-surface-2 overflow-hidden relative">
        <Image src={image} alt={title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <time className="mb-3 block text-sm font-medium text-brand">{date}</time>
        <h3 className="mb-4 text-xl font-bold leading-snug text-ink group-hover:text-brand transition-colors">
          {title}
        </h3>
        <div className="inline-flex items-center text-sm font-medium text-ink transition-colors group-hover:text-brand">
          Baca Selengkapnya
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-300 hover:shadow-[var(--shadow-lift)]", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-300 hover:shadow-[var(--shadow-lift)]", className)}>
      {CardContent}
    </div>
  );
}
