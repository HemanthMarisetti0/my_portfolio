import { motion } from 'framer-motion'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { Fragment } from 'react'
import type { Architecture, ArchitectureNode } from '@/data/types'
import { fadeUp, inView, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Grid columns of the main nodes on large screens (connectors sit in the even columns).
const COLUMN_START = ['lg:col-start-1', 'lg:col-start-3', 'lg:col-start-5', 'lg:col-start-7']

/** Left-to-right flow of a project's main pieces, with an optional node hanging below one of them. */
export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { caption, nodes, branch, note } = architecture
  const NoteIcon = note.tone === 'accent' ? ShieldCheck : ShieldAlert

  return (
    <motion.figure
      className="relative overflow-hidden rounded-2xl border border-line bg-bg-subtle p-5 sm:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger(0.12)}
    >
      <div className="bg-grid mask-fade-radial pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <figcaption className="relative mb-6 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">Architecture</span>
        <span className="font-mono text-xs text-subtle">{caption}</span>
      </figcaption>

      <ol className="relative grid grid-cols-1 lg:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr_2.5rem_1fr]">
        {nodes.map((node, i) => (
          <Fragment key={node.title}>
            {i > 0 && <Connector />}
            <Node node={node} />
          </Fragment>
        ))}

        {branch && (
          <>
            <li aria-hidden="true" className={cn(COLUMN_START[branch.under], 'lg:row-start-2')}>
              <Connector vertical />
            </li>
            <Node node={branch.node} className={cn(COLUMN_START[branch.under], 'lg:row-start-3')} />
          </>
        )}
      </ol>

      <motion.p
        variants={fadeUp}
        className={cn(
          'relative mt-6 flex items-start gap-2.5 rounded-xl border p-3.5 text-sm leading-relaxed text-muted',
          note.tone === 'accent' ? 'border-accent/25 bg-accent/[0.06]' : 'border-warning/25 bg-warning/[0.06]',
        )}
      >
        <NoteIcon className={cn('mt-0.5 size-4 shrink-0', note.tone === 'accent' ? 'text-accent' : 'text-warning')} aria-hidden="true" />
        <span>
          <span className="font-medium text-fg">{note.title}</span> {note.text}
        </span>
      </motion.p>
    </motion.figure>
  )
}

function Node({ node, className }: { node: ArchitectureNode; className?: string }) {
  const { icon: NodeIcon, title, detail, tech, highlight } = node

  return (
    <motion.li variants={fadeUp} className={className}>
      <div
        className={
          highlight
            ? 'border-gradient h-full rounded-xl p-4 shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--accent)_55%,transparent)]'
            : 'h-full rounded-xl border border-line bg-surface-strong p-4'
        }
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-line bg-fg/[0.03] text-accent">
            <NodeIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-fg">{title}</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">{detail}</p>
        <p className="mt-1 font-mono text-[0.68rem] text-subtle">{tech}</p>
      </div>
    </motion.li>
  )
}

/** Line with a travelling dot: vertical on mobile, horizontal on large screens (unless forced vertical). */
function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <li aria-hidden="true" className="flex items-center justify-center">
      {/* vertical */}
      <span className={vertical ? 'relative block h-8 w-px bg-line-strong' : 'relative block h-8 w-px bg-line-strong lg:hidden'}>
        <span className="absolute left-1/2 size-1.5 -translate-x-1/2 animate-flow-y rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
      </span>
      {/* horizontal */}
      {!vertical && (
        <span className="relative hidden h-px w-full bg-line-strong lg:block">
          <span className="absolute top-1/2 size-1.5 -translate-y-1/2 animate-flow-x rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
        </span>
      )}
    </li>
  )
}
