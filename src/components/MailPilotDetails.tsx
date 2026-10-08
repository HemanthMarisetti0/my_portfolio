import { motion } from 'framer-motion'
import { ArrowUpRight, CircleAlert, Lightbulb, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { featuredProject, mailPilotCaseStudy } from '@/data/projects'
import { fadeUp, inView, stagger } from '@/lib/motion'
import { GitHubIcon } from './icons/BrandIcons'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { TagList } from './ui/Tag'
import { ArchitectureDiagram } from './visuals/ArchitectureDiagram'
import { ScreenshotFrame } from './visuals/ScreenshotFrame'

/** Full MailPilot case study: problem → solution, product visual, architecture and features. */
export function MailPilotDetails() {
  const project = featuredProject
  const { problem, solution, tools, highlights } = mailPilotCaseStudy

  return (
    <article aria-labelledby="mailpilot-title" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-[28rem] rounded-full bg-accent/15 blur-[110px]"
      />

      <motion.div
        className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08, 0.1)}
      >
        <div className="min-w-0">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Featured project
            </span>
            <span className="font-mono text-xs text-subtle">{project.category}</span>
          </motion.div>

          <motion.h3 variants={fadeUp} id="mailpilot-title" className="mt-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {project.name}
            <span className="block text-xl font-normal tracking-tight text-muted sm:text-2xl">{project.tagline}</span>
          </motion.h3>

          <motion.p variants={fadeUp} className="mt-5 leading-relaxed text-muted sm:text-lg">
            {project.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2.5">
            <Button href={project.links.github} variant="secondary" icon={GitHubIcon} ariaLabel={`${project.name} source code on GitHub`}>
              GitHub
            </Button>
            <Button href={project.links.demo} iconRight={ArrowUpRight} ariaLabel={`${project.name} live demo`}>
              Live Demo
            </Button>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="min-w-0 space-y-3 self-center">
          <CaseStudyBlock icon={CircleAlert} label="Problem" text={problem} />
          <CaseStudyBlock icon={Lightbulb} label="Solution" text={solution} accent />
        </motion.div>
      </motion.div>

      {project.screenshot && (
        <Reveal delay={0.15} y={28} className="relative px-6 pb-10 sm:px-10">
          <div className="bg-grid mask-fade-radial pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <figure className="relative">
            <ScreenshotFrame screenshot={project.screenshot} eager />
            <figcaption className="mt-3 text-center text-xs text-subtle">The MailPilot assistant, live at {project.screenshot.url}</figcaption>
          </figure>
        </Reveal>
      )}

      <div className="relative space-y-10 border-t border-line p-6 sm:p-10">
        {project.architecture && <ArchitectureDiagram architecture={project.architecture} />}

        <div>
          <h4 className="mb-5 font-mono text-xs tracking-[0.18em] text-subtle uppercase">How the agent works</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <ToolGroup
              icon={Zap}
              title="Runs immediately"
              text="Read tools the agent can call freely, up to 8 tool rounds per message."
              tools={tools.read}
            />
            <ToolGroup
              icon={ShieldCheck}
              title="Needs your approval"
              text="These only create a pending approval card. Nothing changes until you approve it."
              tools={tools.approval}
              accent
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((group) => (
            <div key={group.title} className="rounded-xl border border-line bg-surface p-5">
              <h4 className="text-sm font-semibold text-fg">{group.title}</h4>
              <ul className="mt-3 space-y-2">
                {group.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-snug text-muted">
                    <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h4 className="mb-5 font-mono text-xs tracking-[0.18em] text-subtle uppercase">Key features</h4>
            <motion.ul className="grid gap-2.5 sm:grid-cols-2" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.04)}>
              {project.features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-fg/90"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <h4 className="mb-5 font-mono text-xs tracking-[0.18em] text-subtle uppercase">Tech stack</h4>
            <TagList items={project.stack} label="MailPilot tech stack" />
          </div>
        </div>
      </div>
    </article>
  )
}

interface ToolGroupProps {
  icon: typeof Zap
  title: string
  text: string
  tools: string[]
  accent?: boolean
}

function ToolGroup({ icon: Icon, title, text, tools, accent }: ToolGroupProps) {
  return (
    <div className={accent ? 'rounded-xl border border-warning/25 bg-warning/[0.05] p-5' : 'rounded-xl border border-line bg-surface p-5'}>
      <div className="flex items-center gap-2.5">
        <Icon className={accent ? 'size-4 text-warning' : 'size-4 text-success'} aria-hidden="true" />
        <h5 className="text-sm font-semibold text-fg">{title}</h5>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={title}>
        {tools.map((tool) => (
          <li key={tool} className="rounded-md border border-line bg-bg/50 px-2 py-0.5 font-mono text-xs text-fg/85">
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface CaseStudyBlockProps {
  icon: typeof Lightbulb
  label: string
  text: string
  accent?: boolean
}

function CaseStudyBlock({ icon: Icon, label, text, accent }: CaseStudyBlockProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-line bg-surface p-4">
      <span
        className={
          accent
            ? 'grid size-8 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent'
            : 'grid size-8 shrink-0 place-items-center rounded-lg bg-fg/[0.05] text-muted'
        }
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-fg">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  )
}
