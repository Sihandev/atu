import { cn } from "@/lib/utils";

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({ step, title, description, isLast = false, className }: ProcessStepProps) {
  return (
    <div className={cn("relative flex gap-6 md:gap-8", className)}>
      {!isLast && (
        <div className="absolute left-6 md:left-8 top-16 bottom-0 w-px bg-slate-200 -ml-px" aria-hidden="true" />
      )}
      <div className="relative z-10 flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 border-4 border-white shadow-sm">
        {step}
      </div>
      <div className="pt-2 pb-12">
        <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-lg">{description}</p>
      </div>
    </div>
  );
}
