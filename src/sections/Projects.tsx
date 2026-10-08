import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { MiniProjectCard } from '@/components/MiniProjectCard'
import { MailPilotDetails } from '@/components/MailPilotDetails'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectDetails } from '@/components/ProjectDetails'
import { Modal } from '@/components/ui/Modal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProject, otherProjects, projects } from '@/data/projects'
import type { Project } from '@/data/types'
import { inView, stagger } from '@/lib/motion'

export function Projects() {
  const [open, setOpen] = useState(false)
  // Kept separately from `open` so the content stays rendered during the close animation.
  const [active, setActive] = useState<Project | null>(null)

  const openProject = useCallback((project: Project) => {
    setActive(project)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <Section id="projects">
      <SectionHeading
        sectionId="projects"
        eyebrow="Projects"
        title="Things I've built."
        description="Real applications solving real problems: AI agents for your inbox and your documents, and a tool I use at home. Open any project for the full breakdown."
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={stagger(0.1)}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={openProject} />
        ))}
      </motion.div>

      <h3 className="mt-16 mb-5 font-mono text-xs tracking-[0.18em] text-subtle uppercase">More projects</h3>
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={stagger(0.08)}
      >
        {otherProjects.map((project) => (
          <MiniProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <Modal open={open} onClose={close} title={active?.name ?? ''} subtitle={active?.tagline}>
        {active && (active.id === featuredProject.id ? <MailPilotDetails /> : <ProjectDetails project={active} />)}
      </Modal>
    </Section>
  )
}
