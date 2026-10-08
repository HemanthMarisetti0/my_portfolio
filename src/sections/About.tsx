import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutParagraphs, interests, quickFacts } from '@/data/about'
import { fadeUp, inView, stagger } from '@/lib/motion'

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        sectionId="about"
        eyebrow="About"
        title={
          <>
            Engineer by craft, <span className="text-subtle">product-minded by habit.</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === 0 ? 'text-lg leading-relaxed text-fg/90 sm:text-xl' : 'leading-relaxed text-muted sm:text-lg'}>
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="bg-bg p-4">
                  <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-subtle uppercase">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="mb-5 font-mono text-xs tracking-[0.18em] text-subtle uppercase">What I enjoy</h3>
          </Reveal>
          <motion.ul className="space-y-2.5" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.06)}>
            {interests.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={fadeUp}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors duration-200 hover:border-line-strong"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-fg/[0.03] text-muted transition-colors duration-200 group-hover:text-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-[0.95rem] text-fg/90">{label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
