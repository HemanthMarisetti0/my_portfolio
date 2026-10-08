import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { CertificateCard } from '@/components/CertificateCard'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications, type Certification } from '@/data/certifications'
import { inView, stagger } from '@/lib/motion'

export function Certifications() {
  const [open, setOpen] = useState(false)
  // Kept separately from `open` so the iframe stays rendered during the close animation.
  const [active, setActive] = useState<Certification | null>(null)

  const openCertificate = useCallback((certification: Certification) => {
    setActive(certification)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <Section id="certifications" className="border-y border-line bg-bg-subtle/60">
      <SectionHeading
        sectionId="certifications"
        eyebrow="Certifications"
        title="Certified, and still learning."
        description="Courses, internships and skill certifications. Open any certificate to see the original."
      />

      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={stagger(0.06)}
      >
        {certifications.map((certification) => (
          <CertificateCard key={certification.title} certification={certification} onOpen={openCertificate} />
        ))}
      </motion.div>

      <Modal open={open} onClose={close} title={active ? `${active.title} certificate` : ''} subtitle={active?.issuer}>
        {active?.embedUrl && (
          <div className="flex flex-col">
            <iframe
              src={active.embedUrl}
              title={`${active.title} certificate`}
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="h-[70svh] w-full border-0 bg-white"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-8">
              <p className="text-sm text-muted">Certificate not loading here? Open it on {active.issuer}.</p>
              <Button href={active.link} size="sm" variant="secondary" iconRight={ArrowUpRight}>
                Open in new tab
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
