import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}

/**
 * Card with a soft radial highlight that follows the pointer.
 * Position is written to CSS variables directly, so moving the mouse never re-renders React.
 */
export function SpotlightCard({ children, className, as: Tag = 'div' }: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onPointerMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklab, var(--accent) 9%, transparent), transparent 60%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  )
}
