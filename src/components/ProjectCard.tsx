import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { Project } from '@/data/types'
import { fadeUp } from '@/lib/motion'
import { GitHubIcon } from './icons/BrandIcons'
import { Button } from './ui/Button'
import { Tag } from './ui/Tag'
import { ScreenshotFrame } from './visuals/ScreenshotFrame'

const VISIBLE_TAGS = 4

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

/** Compact project card for the grid; "More details" opens the full view. */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const extraTags = project.stack.length - VISIBLE_TAGS

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      aria-labelledby={`card-${project.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_28px_70px_-35px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
    >
      {/* Visual preview: a cropped peek at the product mockup. Clicking it also opens details. */}
      <div
        className="relative h-60 cursor-pointer overflow-hidden border-b border-line bg-bg-subtle"
        onClick={() => onOpen(project)}
        aria-hidden="true"
      >
        <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
        <div className="absolute -top-20 left-1/2 size-64 -translate-x-1/2 rounded-full bg-accent/20 opacity-70 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-6 top-7 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
          <ScreenshotFrame screenshot={project.screenshot} zoomed />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-subtle via-bg-subtle/70 to-transparent" />

        {project.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg/80 px-2.5 py-1 text-[0.7rem] font-medium text-accent backdrop-blur">
            <Sparkles className="size-3" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.7rem] tracking-wide text-accent">{project.category}</p>
        <h3 id={`card-${project.id}`} className="mt-2 text-xl font-semibold tracking-tight text-fg">
          {project.name}
        </h3>
        <p className="text-sm text-muted">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, VISIBLE_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {extraTags > 0 && (
            <li>
              <Tag className="text-subtle">+{extraTags}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
          <Button size="sm" iconRight={ArrowRight} onClick={() => onOpen(project)} ariaLabel={`More details about ${project.name}`}>
            More details
          </Button>
          <Button href={project.links.github} size="sm" variant="ghost" icon={GitHubIcon} ariaLabel={`${project.name} source code on GitHub`}>
            Code
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
