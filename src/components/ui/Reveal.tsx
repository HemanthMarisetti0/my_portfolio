import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut, inView } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades and lifts its children into view once, the first time they scroll on screen. */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut, delay } },
  }

  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={inView} variants={variants}>
      {children}
    </motion.div>
  )
}
