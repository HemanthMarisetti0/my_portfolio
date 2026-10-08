import { useEffect } from 'react'

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = overflow
    }
  }, [locked])
}
