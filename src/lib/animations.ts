import type { Variants } from 'framer-motion';

// Custom cubic-bezier for spring-like easing
// Type-safe easing for Framer Motion variants
export const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: springEase },
  },
};

export const fadeUpFastVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: springEase },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: springEase },
  },
};
