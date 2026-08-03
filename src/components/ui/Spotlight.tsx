"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders a next/link when provided, a plain div otherwise. */
  href?: string;
  /** Adds the masked gradient hairline that lights up near the cursor. */
  edge?: boolean;
  children: React.ReactNode;
}

/**
 * Writes the pointer position into --mx/--my so the CSS in globals.css can
 * draw a radial wash (and optional border highlight) that tracks the cursor.
 * Coordinates are written straight to style — no state, so no re-render.
 */
export function Spotlight({ href, edge = true, className, children, ...props }: SpotlightProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const { clientX, clientY } = event;

    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${clientX - rect.left}px`);
      node.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  const classes = cn("spotlight", edge && "edge-glow", className);

  if (href) {
    return (
      <Link
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onPointerMove={onPointerMove}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onPointerMove}
      className={classes}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}
