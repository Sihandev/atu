import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  href?: string;
}

export function ServiceCard({ title, description, icon: Icon, className, href }: ServiceCardProps) {
  const CardContent = (
    <>
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1", className)}>
      {CardContent}
    </div>
  );
}
