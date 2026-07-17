import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, description, className, children }: PageHeroProps) {
  return (
    <section className={cn("relative bg-slate-900 py-16 md:py-24 overflow-hidden", className)}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl transform translate-y-1/2" />
      </div>
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}