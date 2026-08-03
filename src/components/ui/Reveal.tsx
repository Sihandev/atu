"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay — use to stagger siblings. */
  delay?: number;
  /** Travel distance in px. Keep it small; long travel reads cheap. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
}

export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
