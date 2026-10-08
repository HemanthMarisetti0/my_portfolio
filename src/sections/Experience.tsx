import { ExperienceCard } from '@/components/ExperienceCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        sectionId="experience"
        eyebrow="Experience"
        title="Building production software, end to end."
        description="From full-stack intern to software developer at Atelia Softwares, building production healthcare applications for web and mobile."
      />

      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-0 left-[0.9rem] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent sm:left-[1.4rem]"
        />
        <ol className="relative space-y-8">
          {experience.map((item) => (
            <ExperienceCard key={`${item.role}-${item.company}`} item={item} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
