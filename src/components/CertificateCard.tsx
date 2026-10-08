import { motion } from 'framer-motion'
import { ArrowUpRight, Award, Expand } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Certification } from '@/data/certifications'
import { fadeUp } from '@/lib/motion'

interface CertificateCardProps {
  certification: Certification
  /** Called for certificates that can be embedded; others open their link in a new tab. */
  onOpen: (certification: Certification) => void
}

export function CertificateCard({ certification, onOpen }: CertificateCardProps) {
  const { title, issuer, kind, note, image, embedUrl, link } = certification

  const preview = (
    <>
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="bg-grid mask-fade-radial absolute inset-0 opacity-60" />
          <Award className="relative size-9 text-subtle" />
        </div>
      )}
      <span className="absolute inset-0 grid place-items-center bg-bg/0 transition-colors duration-300 group-hover:bg-bg/40">
        <PreviewHint icon={embedUrl ? Expand : ArrowUpRight}>{embedUrl ? 'View certificate' : `Open on ${issuer}`}</PreviewHint>
      </span>
    </>
  )

  const previewClasses = 'relative block w-full overflow-hidden bg-white aspect-[7/5]'

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong"
    >
      <div className="relative border-b border-line">
        {embedUrl ? (
          <button type="button" onClick={() => onOpen(certification)} aria-label={`View ${title} certificate`} className={previewClasses}>
            {preview}
          </button>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} certificate on ${issuer}`} className={previewClasses}>
            {preview}
          </a>
        )}
        <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-line bg-bg/80 px-2.5 py-0.5 text-[0.68rem] font-medium text-fg/85 backdrop-blur">
          {kind}
        </span>
      </div>

      <div className="flex flex-1 items-start gap-3 p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent">
          <Award className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm leading-snug font-semibold text-fg">{title}</h3>
          <p className="mt-0.5 text-xs text-muted">
            {issuer}
            {note && <span className="text-subtle"> · {note}</span>}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

function PreviewHint({ icon: Icon, children }: { icon: typeof Expand; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-line-strong bg-surface-strong/90 px-3.5 py-1.5 text-xs font-medium text-fg opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  )
}
