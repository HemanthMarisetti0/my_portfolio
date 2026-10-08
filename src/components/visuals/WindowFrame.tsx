import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Minimal app-window chrome used by the project mockups. */
export function WindowFrame({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line-strong bg-surface-strong shadow-[0_30px_80px_-30px_rgb(0_0_0/0.55)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-fg/[0.02] px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
        </div>
        <div className="mx-auto min-w-0 truncate rounded-md border border-line bg-bg/60 px-3 py-0.5 font-mono text-[0.65rem] whitespace-nowrap text-subtle">{title}</div>
        <div className="w-[42px]" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
