import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
