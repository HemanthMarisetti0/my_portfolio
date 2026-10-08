import { ArrowUpRight, Download } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { socialLinks } from '@/components/ui/SocialLinks'
import { site } from '@/data/site'
import { cn, isExternal, isPlaceholder } from '@/lib/utils'

export function Contact() {
  return (
    <Section id="contact" className="pb-28 sm:pb-36">
      <Reveal>
        <div className="border-gradient relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-grid mask-fade-radial absolute inset-0 opacity-50" />
            <div className="absolute -top-40 -left-20 size-[32rem] rounded-full bg-accent/15 blur-[120px]" />
            <div className="absolute -right-20 -bottom-40 size-[28rem] rounded-full bg-accent-2/10 blur-[120px]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div className="flex flex-col">
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">Contact</p>
              <h2 id="contact-title" className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance text-fg sm:text-5xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">
                I&apos;m always interested in interesting engineering problems, ambitious products and opportunities to build
                meaningful software.
              </p>

              <ul className="mt-10 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <ContactLink {...link} />
                  </li>
                ))}
              </ul>

              {site.resumeUrl && (
                <div className="mt-8 lg:mt-auto lg:pt-10">
                  <Button href={site.resumeUrl} download={site.resumeFileName} variant="secondary" icon={Download}>
                    Download Resume
                  </Button>
                </div>
              )}
            </div>

            <ContactForm />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function ContactLink({ label, href, icon: Icon, display }: (typeof socialLinks)[number]) {
  const placeholder = isPlaceholder(href)
  const external = isExternal(href)
  const shown = display.replace(/^https?:\/\/(www\.)?/, '')

  const inner = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-fg/[0.03] text-muted transition-colors group-hover:text-accent">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-subtle">{label}</span>
        <span className="block truncate text-sm font-medium text-fg">{shown}</span>
      </span>
      {!placeholder && (
        <ArrowUpRight
          className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  const classes = 'group flex items-center gap-3.5 rounded-2xl border border-line bg-surface-strong/60 p-3 backdrop-blur transition-colors'

  if (placeholder) {
    return (
      <div className={cn(classes, 'opacity-60')} title={`Placeholder: set your ${label} in src/data/site.ts`}>
        {inner}
      </div>
    )
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(classes, 'hover:border-line-strong hover:bg-surface-strong')}
    >
      {inner}
    </a>
  )
}
