import { Briefcase, Check } from 'lucide-react'
import type { Experience } from '@/data/types'
import { formatDuration, formatPeriod } from '@/lib/date'
import { Reveal } from './ui/Reveal'
import { TagList } from './ui/Tag'

export function ExperienceCard({ item }: { item: Experience }) {
  const current = !item.end

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Timeline node */}
      <span className="absolute top-1 left-0 grid size-[1.875rem] place-items-center rounded-full border border-line-strong bg-bg sm:left-2" aria-hidden="true">
        {current ? (
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
            <span className="relative size-2.5 rounded-full bg-accent" />
          </span>
        ) : (
          <Briefcase className="size-3.5 text-muted" />
        )}
      </span>

      <Reveal>
        <article className="rounded-2xl border border-line bg-surface p-6 backdrop-blur sm:p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-fg">{item.role}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">
                {item.company} <span className="text-subtle">· {item.location}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              <span className="font-mono text-xs text-subtle">{formatPeriod(item.start, item.end)}</span>
              <span
                className={
                  current
                    ? 'inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent'
                    : 'inline-flex items-center gap-1.5 rounded-full border border-line bg-fg/[0.04] px-2.5 py-0.5 text-xs font-medium text-muted'
                }
              >
                {formatDuration(item.start, item.end)}
              </span>
            </div>
          </header>

          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{item.summary}</p>

          <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {item.responsibilities.map((point) => (
              <li key={point} className="flex gap-3 text-[0.95rem] leading-snug text-fg/90">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent/12 text-accent" aria-hidden="true">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-line pt-6">
            <TagList items={item.technologies} label="Technologies used" />
          </div>
        </article>
      </Reveal>
    </li>
  )
}
