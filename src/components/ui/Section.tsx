import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** id of the heading that labels this section, for screen readers. */
  labelledBy?: string
}

export function Section({ id, children, className, labelledBy = `${id}-title` }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-24 sm:py-32', className)}>
      <Container>{children}</Container>
    </section>
  )
}
