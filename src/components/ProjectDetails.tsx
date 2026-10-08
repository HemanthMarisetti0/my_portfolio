import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/types'
import { GitHubIcon } from './icons/BrandIcons'
import { Button } from './ui/Button'
import { TagList } from './ui/Tag'
import { ArchitectureDiagram } from './visuals/ArchitectureDiagram'
import { ScreenshotFrame } from './visuals/ScreenshotFrame'

/** Full project view shown inside the "More details" modal. */
export function ProjectDetails({ project }: { project: Project }) {
  const { highlights = [], badge } = project
  const BadgeIcon = badge?.icon

  return (
    <article aria-labelledby={`project-${project.id}`} className="group relative">
      <div className="grid">
        {/* Screenshot */}
        <div className="relative flex min-w-0 items-center justify-center overflow-hidden border-b border-line bg-bg-subtle px-6 py-10 sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
            <div className="absolute -top-16 -left-10 size-72 rounded-full bg-accent/25 opacity-70 blur-[90px]" />
            <div className="absolute -right-10 -bottom-20 size-56 rounded-full bg-accent-2/15 blur-[90px]" />
          </div>

          <div className="relative w-full max-w-4xl">
            <ScreenshotFrame screenshot={project.screenshot} eager />

            {badge && BadgeIcon && (
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-strong bg-surface-strong/90 py-1.5 pr-3.5 pl-2 text-xs font-medium whitespace-nowrap text-fg shadow-xl backdrop-blur-md sm:left-auto sm:-right-5 sm:translate-x-0">
                <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white">
                  <BadgeIcon className="size-3.5" aria-hidden="true" />
                </span>
                {badge.label}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-line bg-fg/[0.03] px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-accent">
              {project.category}
            </span>
          </div>

          <h3 id={`project-${project.id}`} className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-1 text-lg tracking-tight text-muted">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          {highlights.length > 0 && (
            <ul className="mt-7 space-y-2.5">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-3.5 rounded-xl border border-line bg-bg/40 p-3.5 transition-colors duration-200 hover:border-line-strong"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">{title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <h4 className="mt-7 mb-3 font-mono text-[0.7rem] tracking-[0.18em] text-subtle uppercase">Features</h4>
          <ul className="flex flex-wrap gap-1.5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-fg/80"
              >
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-5 border-t border-line pt-6">
              <TagList items={project.stack} label="Tech stack" />
              <div className="flex flex-wrap gap-2.5">
                <Button href={project.links.github} variant="secondary" size="sm" icon={GitHubIcon} ariaLabel={`${project.name} source code on GitHub`}>
                  GitHub
                </Button>
                <Button href={project.links.demo} size="sm" iconRight={ArrowUpRight} ariaLabel={`${project.name} live demo`}>
                  Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {project.architecture && (
        <div className="border-t border-line p-6 sm:p-10">
          <ArchitectureDiagram architecture={project.architecture} />
        </div>
      )}
    </article>
  )
}
