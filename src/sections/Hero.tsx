import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'
import { scrollToSection } from '@/lib/utils'

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <HeroBackground />

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.15)}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {site.isAvailable && (
            <motion.div variants={fadeUp}>
              <AvailabilityBadge label={site.availability} />
            </motion.div>
          )}

          <motion.h1
            id="home-title"
            variants={fadeUp}
            className="mt-8 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-fg sm:text-7xl lg:text-[5.25rem]"
          >
            Hi, I&apos;m <span className="text-gradient">{site.name}</span>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-xl leading-snug font-medium tracking-tight text-balance text-fg/85 sm:text-2xl">
            {site.headline}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {site.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              href="#projects"
              size="lg"
              iconRight={ArrowRight}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
            >
              View Projects
            </Button>
            <Button
              href="#contact"
              size="lg"
              variant="secondary"
              icon={Mail}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              Contact Me
            </Button>
            {site.resumeUrl && (
              <Button href={site.resumeUrl} download={site.resumeFileName} size="lg" variant="ghost" icon={Download}>
                Resume
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('about')
        }}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 rounded-full border border-line p-2 text-subtle transition-colors hover:text-fg md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ArrowDown className="size-4" aria-hidden="true" />
      </motion.a>
    </section>
  )
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid mask-fade-radial absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/2 size-[24rem] -translate-x-1/2 animate-drift rounded-full bg-accent/15 blur-[100px] sm:size-[38rem] sm:bg-accent/20 sm:blur-[120px] dark:bg-accent/10 dark:sm:bg-accent/15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  )
}
