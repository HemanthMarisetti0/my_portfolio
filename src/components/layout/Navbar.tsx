import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { navigation } from '@/data/navigation'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrolled } from '@/hooks/useScrolled'
import { easeOut } from '@/lib/motion'
import { cn, scrollToSection } from '@/lib/utils'

const sectionIds = navigation.map((item) => item.id)

export function Navbar() {
  const scrolled = useScrolled(12)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    // Close the mobile menu if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
    }
  }, [open])

  const navigate = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()
    setOpen(false)
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || open ? 'border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo onNavigate={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface p-1 backdrop-blur">
              {navigation.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => navigate(e, item.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200',
                        isActive ? 'text-fg' : 'text-muted hover:text-fg',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full border border-line-strong bg-fg/[0.07]"
                          transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden lg:block">
              <Button href="#contact" size="sm" iconRight={ArrowUpRight} onClick={(e) => navigate(e, 'contact')}>
                Let&apos;s talk
              </Button>
            </div>
            <MenuButton ref={menuButtonRef} open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </Container>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              className="fixed inset-0 top-16 -z-10 bg-bg/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="menu"
              id="mobile-menu"
              aria-label="Mobile"
              className="border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <Container className="pt-2 pb-6">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                >
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.id}
                      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                      className="border-b border-line last:border-b-0"
                    >
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${item.id}`}
                        onClick={(e) => navigate(e, item.id)}
                        aria-current={active === item.id ? 'location' : undefined}
                        className={cn(
                          'flex items-center justify-between py-3.5 text-lg font-medium tracking-tight transition-colors',
                          active === item.id ? 'text-fg' : 'text-muted hover:text-fg',
                        )}
                      >
                        {item.label}
                        <span className="font-mono text-xs text-subtle" aria-hidden="true">
                          0{index + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <SocialLinks />
                  {site.resumeUrl && (
                    <Button href={site.resumeUrl} download={site.resumeFileName} variant="secondary" size="sm" icon={Download}>
                      Resume
                    </Button>
                  )}
                </div>
              </Container>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

interface MenuButtonProps {
  open: boolean
  onToggle: () => void
  ref: React.Ref<HTMLButtonElement>
}

function MenuButton({ open, onToggle, ref }: MenuButtonProps) {
  const line = 'absolute left-1/2 h-[1.5px] w-4 -translate-x-1/2 rounded-full bg-current'
  const transition = { duration: 0.25, ease: easeOut }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="relative grid size-9 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-line-strong lg:hidden"
    >
      <motion.span className={line} style={{ top: 14 }} animate={open ? { top: 17.25, rotate: 45 } : { top: 14, rotate: 0 }} transition={transition} />
      <motion.span className={line} style={{ top: 20.5 }} animate={open ? { top: 17.25, rotate: -45 } : { top: 20.5, rotate: 0 }} transition={transition} />
    </button>
  )
}
