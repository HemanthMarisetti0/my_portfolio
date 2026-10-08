import { ArrowUp } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { site } from '@/data/site'
import { scrollToSection } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-fg">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="mt-1 text-xs text-subtle">Designed &amp; built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        </div>
        <div className="flex items-center gap-3">
          <SocialLinks />
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
