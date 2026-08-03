import { cn } from "@/lib/utils";

/**
 * Atmospheric background: three drifting orbs plus a grain pass.
 * Purely decorative, so it stays out of the accessibility tree.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("grain pointer-events-none absolute inset-0", className)}>
      <div className="aurora">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
