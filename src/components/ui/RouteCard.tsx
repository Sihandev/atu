import { cn } from "@/lib/utils";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface RouteCardProps {
  from: string;
  to: string;
  time: string;
  type: string;
  className?: string;
  href?: string;
}

export function RouteCard({ from, to, time, type, className, href }: RouteCardProps) {
  const CardContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="text-sm text-ink-3 mb-1">Dari</div>
          <div className="font-bold text-ink text-lg">{from}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-bg-2 flex items-center justify-center text-ink-3 group-hover:bg-brand-soft group-hover:text-brand transition-colors">
          <ArrowRight className="w-5 h-5" />
        </div>
        <div className="flex-1 text-right">
          <div className="text-sm text-ink-3 mb-1">Tujuan</div>
          <div className="font-bold text-ink text-lg">{to}</div>
        </div>
      </div>

      <div className="pt-6 border-t border-line flex items-center justify-between">
        <div className="flex items-center text-sm font-medium text-ink-2">
          <Clock className="w-4 h-4 mr-2 text-ink-3" />
          {time}
        </div>
        <div className="flex items-center text-sm font-medium text-ink-2">
          <ShieldCheck className="w-4 h-4 mr-2 text-ink-3" />
          {type}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block group bg-surface rounded-[14px] border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-lift)]", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group bg-surface rounded-[14px] border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-lift)]", className)}>
      {CardContent}
    </div>
  );
}
