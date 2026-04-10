import { useReducedMotion, type Variants } from 'framer-motion'

export const EASING = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASING },
  },
}

export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING },
  },
}

export const staggerContainer = (staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
})

// No-op variants — used when prefers-reduced-motion is active
const noopVariants: Variants = { hidden: {}, visible: {} }

/**
 * Hook: returns animated variants or no-ops based on prefers-reduced-motion.
 * Must be called at the top level of a 'use client' component.
 *
 * Usage:
 *   const up = useMotionSafe(fadeUp)
 *   <motion.div variants={up} ...>
 */
export function useMotionSafe(animated: Variants): Variants {
  const reduce = useReducedMotion()
  return reduce ? noopVariants : animated
}
