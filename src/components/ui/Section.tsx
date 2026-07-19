"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

export function Section({
  className,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-24 lg:py-32", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      {...props as React.ComponentProps<typeof motion.section>}
    >
      {children}
    </motion.section>
  );
}
