import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  href?: string;
}

export function ServiceCard({ title, description, icon: Icon, className, href }: ServiceCardProps) {
  const photo = href?.includes("towing") ? "/img/towing.jpg" : href?.includes("pulau") ? "/img/roro.jpg" : href?.includes("drive") || href?.includes("motor") ? "/img/self-drive.jpg" : "/img/hero-car-carrier.jpg";
  const CardContent = (
    <>
      <div className="relative -mx-8 -mt-8 mb-7 h-52 overflow-hidden"><Image src={photo} alt={title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-ink transition-colors group-hover:text-brand">
        {title}
      </h3>
      <p className="text-ink-2 leading-relaxed">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block overflow-hidden rounded-lg border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group rounded-[14px] border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]", className)}>
      {CardContent}
    </div>
  );
}
