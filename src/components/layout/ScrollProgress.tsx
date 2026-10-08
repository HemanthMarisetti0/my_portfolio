import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar at the very top that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
      style={{ scaleX }}
    />
  )
}
