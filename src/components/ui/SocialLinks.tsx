import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { site } from '@/data/site'
import type { Icon } from '@/data/types'
import { cn, isExternal, isPlaceholder, mailto } from '@/lib/utils'

export const socialLinks: { label: string; href: string; icon: Icon; display: string }[] = [
  { label: 'Email', href: mailto(site.email), icon: Mail, display: site.email },
  { label: 'GitHub', href: site.social.github, icon: GitHubIcon, display: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedInIcon, display: site.social.linkedin },
]

/** Compact row of icon buttons for email, GitHub and LinkedIn. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)} aria-label="Social links">
      {socialLinks.map(({ label, href, icon: Icon }) => {
        const iconClasses =
          'grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-200'

        if (isPlaceholder(href)) {
          return (
            <li key={label}>
              <span
                role="link"
                aria-disabled="true"
                aria-label={`${label} (not configured yet)`}
                title={`Placeholder: set your ${label} in src/data/site.ts`}
                className={cn(iconClasses, 'cursor-not-allowed opacity-50')}
              >
                <Icon className="size-4" />
              </span>
            </li>
          )
        }

        const external = isExternal(href)
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={cn(iconClasses, 'hover:border-line-strong hover:text-fg')}
            >
              <Icon className="size-4" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
