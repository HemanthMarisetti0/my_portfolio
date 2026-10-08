import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TagList } from '@/components/ui/Tag'
import { capabilities } from '@/data/capabilities'
import { fadeUp, inView, stagger } from '@/lib/motion'

export function WhatIBuild() {
  return (
    <Section id="what-i-build" className="border-y border-line bg-bg-subtle/60">
      <SectionHeading
        sectionId="what-i-build"
        eyebrow="What I build"
        title="The kinds of problems I like to solve."
        description="Most of my work sits where product, interface and infrastructure meet. These are the areas I spend my time in."
      />

      <motion.ul
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={stagger(0.08)}
      >
        {capabilities.map(({ title, description, icon: Icon, tags }, i) => (
          <motion.li key={title} variants={fadeUp}>
            <SpotlightCard as="article" className="h-full p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-subtle" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
              <TagList items={tags} className="mt-6" label={`${title} technologies`} />
            </SpotlightCard>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
