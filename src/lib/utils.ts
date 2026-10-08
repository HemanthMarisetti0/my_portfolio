/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Placeholder values are written as `[Something]` in the data files. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim())
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

/** Builds a mailto link, passing placeholders through untouched so they render as disabled. */
export function mailto(email: string) {
  return isPlaceholder(email) ? email : `mailto:${email}`
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Smooth-scrolls to a section and keeps the URL hash in sync. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
}
