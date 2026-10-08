import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-fg/[0.03] px-2 py-0.5 font-mono text-[0.72rem] leading-5 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagList({ items, className, label }: { items: string[]; className?: string; label?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}
