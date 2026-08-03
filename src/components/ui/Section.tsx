"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Dark band with light type — used for CTA sections. */
  tone?: "surface" | "ink";
}

export function Section({
  className,
  children,
  id,
  tone = "surface",
  ...props
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-24", tone === "ink" && "bg-on-surface text-white", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      {...(props as React.ComponentProps<typeof motion.section>)}
    >
      {children}
    </motion.section>
  );
}
