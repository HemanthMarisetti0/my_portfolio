import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { easeOut } from '@/lib/motion'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

/** Accessible dialog: traps focus, closes on Escape / backdrop click, restores focus on close. */
export function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Kept in a ref so a new onClose identity doesn't re-run the focus effect.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    // Embedded pages (e.g. HackerRank) can scroll the page behind the dialog; put it back on close.
    const scrollY = window.scrollY
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.scrollTo({ top: scrollY, behavior: 'instant' })
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative flex max-h-[92svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-bg shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)] sm:max-h-[88svh] sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <header className="flex items-center justify-between gap-4 border-b border-line bg-bg/90 px-5 py-4 backdrop-blur sm:px-8">
              <div className="min-w-0">
                <h2 id="modal-title" className="truncate text-lg font-semibold tracking-tight text-fg">
                  {title}
                </h2>
                {subtitle && <p className="truncate text-sm text-muted">{subtitle}</p>}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>
            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
