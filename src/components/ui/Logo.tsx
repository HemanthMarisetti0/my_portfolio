import { site } from '@/data/site'
import { scrollToSection } from '@/lib/utils'

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      href="#home"
      onClick={(event) => {
        event.preventDefault()
        onNavigate?.()
        scrollToSection('home')
      }}
      className="group flex items-center gap-2.5 rounded-lg"
      aria-label={`${site.name}, back to top`}
    >
      <span className="border-gradient grid size-8 place-items-center rounded-[10px] font-mono text-[0.7rem] font-semibold tracking-tight text-fg transition-transform duration-300 group-hover:rotate-[-6deg]">
        {site.initials}
      </span>
      <span className="text-[0.95rem] font-semibold tracking-tight text-fg">
        {site.name}
      </span>
    </a>
  )
}
