"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Hero backdrop with a slow parallax drift and a gentle scale-out, driven by
 * scroll rather than a looping animation so the movement feels anchored.
 * Layered gradients do the legibility work; grain kills the banding.
 */
export function HeroMedia({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y, scale, opacity }} className="h-full w-full">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url("${src}")` }}
          role="img"
          aria-label={alt}
        />
      </motion.div>

      {/* Legibility stack: horizontal ink wash, a bottom fade that resolves to
          whatever the page background currently is (so it works in both
          themes), and a brand vignette up top for the navbar to sit on. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,15,0.9)_0%,rgba(5,11,26,0.62)_38%,rgba(5,11,26,0.14)_68%,transparent_100%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(2,6,15,0.5) 0%, transparent 22%, transparent 60%, var(--c-bg) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(0,194,255,0.3),transparent_60%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_88%_88%,rgba(255,157,0,0.22),transparent_62%)] mix-blend-screen" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
