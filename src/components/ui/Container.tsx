import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10 lg:px-[var(--spacing-margin-desktop)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
