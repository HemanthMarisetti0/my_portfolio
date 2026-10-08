import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { MiniProject } from '@/data/types'
import { fadeUp } from '@/lib/motion'
import { GitHubIcon } from './icons/BrandIcons'
import { Button } from './ui/Button'
import { TagList } from './ui/Tag'

/** Small text-only card for minor projects: name, one line, stack and links. */
export function MiniProjectCard({ project }: { project: MiniProject }) {
  return (
    <motion.article
      variants={fadeUp}
      aria-labelledby={`mini-${project.id}`}
      className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong"
    >
      <h4 id={`mini-${project.id}`} className="font-semibold tracking-tight text-fg">
        {project.name}
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>
      <TagList items={project.stack} className="mt-4" label="Tech stack" />
      <div className="mt-auto flex flex-wrap items-center gap-1 pt-4">
        <Button href={project.links.github} size="sm" variant="ghost" icon={GitHubIcon} ariaLabel={`${project.name} source code on GitHub`}>
          Code
        </Button>
        {project.links.demo && (
          <Button href={project.links.demo} size="sm" variant="ghost" iconRight={ArrowUpRight} ariaLabel={`${project.name} live demo`}>
            Live demo
          </Button>
        )}
      </div>
    </motion.article>
  )
}
