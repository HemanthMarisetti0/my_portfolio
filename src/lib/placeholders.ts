import { education } from '@/data/education'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { isPlaceholder } from './utils'

/** Dev-only reminder listing every `[Placeholder]` value that still needs real content. */
export function warnAboutPlaceholders() {
  const entries: [string, string][] = [
    ['src/data/site.ts → email', site.email],
    ['src/data/site.ts → social.github', site.social.github],
    ['src/data/site.ts → social.linkedin', site.social.linkedin],
    ['src/data/site.ts → contactFormEndpoint', site.contactFormEndpoint],
    ...education.flatMap((e, i): [string, string][] => [
      [`src/data/education.ts → [${i}].degree`, e.degree],
      [`src/data/education.ts → [${i}].field`, e.field],
      [`src/data/education.ts → [${i}].institution`, e.institution],
    ]),
    ...projects.flatMap((p): [string, string][] => [
      [`src/data/projects.ts → ${p.id}.links.github`, p.links.github],
      [`src/data/projects.ts → ${p.id}.links.demo`, p.links.demo],
    ]),
  ]

  const missing = entries.filter(([, value]) => isPlaceholder(value))
  if (missing.length === 0) return

  console.groupCollapsed(`%c${missing.length} portfolio placeholders still need real values`, 'color:#f59e0b')
  missing.forEach(([where, value]) => console.info(`${where}: ${value}`))
  console.groupEnd()
}
