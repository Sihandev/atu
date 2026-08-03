"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar pinned to the very top edge, tracking scroll depth. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-[linear-gradient(90deg,#0b5fff,#00c2ff_55%,#ff9d00)]"
    />
  );
}
