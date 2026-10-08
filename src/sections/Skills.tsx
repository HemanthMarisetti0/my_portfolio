import { motion } from 'framer-motion'
import { SkillCard } from '@/components/SkillCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillCategories } from '@/data/skills'
import { inView, stagger } from '@/lib/motion'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        sectionId="skills"
        eyebrow="Skills"
        title="A toolkit for the whole stack."
        description="The languages, frameworks and tools I use to take a product from interface to database."
      />

      <motion.div
        className="grid gap-4 lg:grid-cols-6"
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={stagger(0.07)}
      >
        {skillCategories.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </motion.div>
    </Section>
  )
}
