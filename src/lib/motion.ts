import type { Variants } from 'framer-motion'

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
}

export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}

/** Shared viewport settings for scroll-reveal animations. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
