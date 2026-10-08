import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const THEME_COLORS: Record<Theme, string> = { dark: '#07080b', light: '#fbfbfd' }

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle }
}
