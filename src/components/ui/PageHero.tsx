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
    <section
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(178deg,var(--sky)_0%,var(--sky-2)_60%,var(--ground)_100%)] py-16 md:py-24",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -right-40 top-[-220px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(157,190,221,0.35),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-[rgba(22,50,79,0.12)] lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-2 top-1/2 hidden h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-[rgba(22,50,79,0.08)] lg:block"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display mb-6 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.06] tracking-[-0.02em] text-[var(--ink)]">
            {title}
          </h1>
          {description && (
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
