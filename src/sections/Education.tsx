import { motion } from 'framer-motion'
import { CalendarDays, GraduationCap } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { education } from '@/data/education'
import { fadeUp, inView, stagger } from '@/lib/motion'

export function Education() {
  return (
    <Section id="education" className="border-y border-line bg-bg-subtle/60">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          sectionId="education"
          eyebrow="Education"
          title="Where the foundations came from."
          description="The academic grounding behind the engineering, and a habit of learning that has continued ever since."
        />

        <motion.ol className="space-y-4 self-center" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
          {education.map((item) => (
            <motion.li key={`${item.degree}-${item.institution}`} variants={fadeUp}>
              <SpotlightCard as="article" className="p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-accent-2/15 text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-fg">{item.degree}</h3>
                    <p className="mt-0.5 text-[0.95rem] text-fg/85">{item.field}</p>
                    <p className="mt-2 text-sm text-muted">{item.institution}</p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-fg/[0.03] px-3 py-1 font-mono text-xs text-subtle">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {item.period}
                    </p>
                    {item.details.length > 0 && (
                      <ul className="mt-5 space-y-1.5 border-t border-line pt-5">
                        {item.details.map((detail) => (
                          <li key={detail} className="flex gap-2.5 text-sm text-muted">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  )
}
