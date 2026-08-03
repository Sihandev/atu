import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  /** Small uppercase kicker shown above the title. */
  label?: string;
  centered?: boolean;
  tone?: "surface" | "ink";
}

export function SectionHeading({
  title,
  subtitle,
  label,
  centered = false,
  tone = "surface",
  className,
  ...props
}: SectionHeadingProps) {
  const onInk = tone === "ink";

  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)} {...props}>
      {label && (
        <div className="mb-4 flex items-center gap-3" style={centered ? { justifyContent: "center" } : undefined}>
          <span className="h-[2px] w-12 bg-secondary" />
          <span className="font-mono text-label-sm tracking-widest text-secondary uppercase">
            {label}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "font-display text-headline-lg",
          onInk ? "text-white" : "text-on-surface",
          centered && "mx-auto max-w-3xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            onInk ? "text-surface-variant/70" : "text-on-surface-variant",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
