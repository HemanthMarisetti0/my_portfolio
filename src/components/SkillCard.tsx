import { motion } from 'framer-motion'
import type { SkillCategory } from '@/data/types'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { SpotlightCard } from './ui/SpotlightCard'

export function SkillCard({ category }: { category: SkillCategory }) {
  const { title, description, icon: CategoryIcon, skills, span } = category

  return (
    <motion.div variants={fadeUp} className={cn('h-full', span)}>
      <SpotlightCard as="article" className="h-full p-6 sm:p-7">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-fg">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-fg/[0.03] text-accent">
            <CategoryIcon className="size-[1.15rem]" aria-hidden="true" />
          </span>
        </header>

        <ul className="flex flex-wrap gap-2" aria-label={`${title} skills`}>
          {skills.map(({ name, icon: SkillIcon }) => (
            <li
              key={name}
              className="group/skill inline-flex items-center gap-2 rounded-lg border border-line bg-bg/40 px-2.5 py-1.5 text-sm text-fg/90 transition-colors duration-200 hover:border-line-strong hover:bg-fg/[0.04]"
            >
              <SkillIcon
                className="size-3.5 text-subtle transition-colors duration-200 group-hover/skill:text-accent"
                aria-hidden="true"
              />
              {name}
            </li>
          ))}
        </ul>
      </SpotlightCard>
    </motion.div>
  )
}
