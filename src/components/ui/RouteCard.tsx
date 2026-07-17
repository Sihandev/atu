"use client";

import { ArrowRight, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface RouteCardProps {
  from: string;
  to: string;
  time: string;
  type: string;
  className?: string;
}

export function RouteCard({ from, to, time, type, className }: RouteCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn("rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-slate-900">{from}</div>
        <ArrowRight className="h-5 w-5 text-slate-400 mx-2 flex-shrink-0" />
        <div className="text-lg font-semibold text-slate-900">{to}</div>
      </div>
      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center text-sm text-slate-600">
          <Clock className="mr-2 h-4 w-4 text-blue-500" />
          Estimasi: {time}
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <Truck className="mr-2 h-4 w-4 text-blue-500" />
          Via: {type}
        </div>
      </div>
    </motion.div>
  );
}
