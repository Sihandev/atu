/**
 * Motion is slow and weighted — short travel, long duration, no bounce.
 * Anything springy reads cheap at this scale of typography.
 */
const ease = [0.22, 0.61, 0.21, 1] as [number, number, number, number];

export const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};
