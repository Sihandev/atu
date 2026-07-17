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
          <div className="text-sm text-slate-500 mb-1">Dari</div>
          <div className="font-bold text-slate-900 text-lg">{from}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </div>
        <div className="flex-1 text-right">
          <div className="text-sm text-slate-500 mb-1">Tujuan</div>
          <div className="font-bold text-slate-900 text-lg">{to}</div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center text-sm font-medium text-slate-600">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          {time}
        </div>
        <div className="flex items-center text-sm font-medium text-slate-600">
          <ShieldCheck className="w-4 h-4 mr-2 text-slate-400" />
          {type}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block group bg-white rounded-2xl border border-slate-200 p-6 transition-all hover:shadow-xl hover:border-blue-200 hover:-translate-y-1", className)}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cn("group bg-white rounded-2xl border border-slate-200 p-6 transition-all hover:shadow-xl hover:border-blue-200 hover:-translate-y-1", className)}>
      {CardContent}
    </div>
  );
}
