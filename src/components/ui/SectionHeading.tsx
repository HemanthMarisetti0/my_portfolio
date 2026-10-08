import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Used to build the heading id that the parent <section> is labelled by. */
  sectionId: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ sectionId, eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <Reveal className={cn('mb-12 max-w-2xl sm:mb-16', centered && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent" />
        {eyebrow}
      </p>
      <h2 id={`${sectionId}-title`} className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}
