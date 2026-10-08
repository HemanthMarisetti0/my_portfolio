import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Icon } from '@/data/types'
import { cn, isExternal, isPlaceholder } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  /** With an href this renders a link; without one it renders a <button>. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: Icon
  iconRight?: Icon
  /** Pass a filename to trigger a download instead of navigation. */
  download?: string
  className?: string
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-fg text-bg shadow-[0_1px_0_0_rgb(255_255_255/0.15)_inset,0_8px_24px_-8px_color-mix(in_oklab,var(--accent)_60%,transparent)] hover:bg-fg/90',
  secondary: 'border border-line-strong bg-surface text-fg backdrop-blur hover:border-fg/25 hover:bg-fg/[0.06]',
  ghost: 'text-muted hover:bg-fg/[0.06] hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
}

const press = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
} as const

/**
 * Button or link styled as a button. Placeholder hrefs (e.g. `[GitHub URL]`) render as a
 * disabled element with a hint, so the site never ships a broken link.
 */
export function Button({
  href,
  type = 'button',
  disabled,
  children,
  variant = 'primary',
  size = 'md',
  icon: LeadingIcon,
  iconRight: TrailingIcon,
  download,
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {LeadingIcon && <LeadingIcon className="size-4 shrink-0" aria-hidden="true" />}
      {children}
      {TrailingIcon && (
        <TrailingIcon
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (href === undefined) {
    return (
      <motion.button type={type} disabled={disabled} aria-label={ariaLabel} onClick={onClick} className={classes} {...(disabled ? {} : press)}>
        {content}
      </motion.button>
    )
  }

  if (isPlaceholder(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={ariaLabel ? `${ariaLabel} (link not configured yet)` : undefined}
        title={`Placeholder: replace ${href} in src/data`}
        className={cn(classes, 'cursor-not-allowed opacity-50 saturate-0')}
      >
        {content}
      </span>
    )
  }

  const external = isExternal(href)

  return (
    <motion.a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      {...press}
    >
      {content}
    </motion.a>
  )
}
