"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up once, the first time it scrolls into view.
 *
 * The server render and first client render both emit the *final* figure, so
 * crawlers and no-JS visitors never see a zero — which would misstate the
 * business. The count-up only applies to instances that start below the fold,
 * where resetting to zero is invisible to the reader.
 */
export function Counter({ to, suffix = "", duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
    // Already visible: keep the final figure rather than flashing back to zero
    // just for the sake of an animation.
    if (alreadyOnScreen) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;

    // Deferred a frame so we never setState synchronously inside the effect.
    const armed = requestAnimationFrame(() => {
      setValue(0);

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer?.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            // easeOutExpo — quick off the mark, long settle
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setValue(Math.round(eased * to));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.4 }
      );

      observer.observe(node);
    });

    return () => {
      cancelAnimationFrame(armed);
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}
