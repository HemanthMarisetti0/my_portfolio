import { motion } from 'framer-motion'
import { ArrowUpRight, BookMarked, Star } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContributionGraph } from '@/components/visuals/ContributionGraph'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { useGitHubRepos } from '@/hooks/useGitHubRepos'
import { fadeUp, inView, stagger } from '@/lib/motion'
import { cn, isPlaceholder } from '@/lib/utils'

interface RepoItem {
  key: string
  name: string
  description: string
  meta: string
  href: string
  stars?: number
}

// Shown until a GitHub username is configured (or if the API is unavailable).
const staticRepos: RepoItem[] = projects.map((p) => ({
  key: p.id,
  name: p.id,
  description: p.description,
  meta: p.stack.slice(0, 3).join(' · '),
  href: p.links.github,
}))

export function GitHubActivity() {
  const username = site.githubUsername
  const configured = !isPlaceholder(username)
  const { status, repos } = useGitHubRepos(username)

  const items: RepoItem[] =
    status === 'success' && repos.length > 0
      ? repos.map((r) => ({
          key: String(r.id),
          name: r.name,
          description: r.description ?? 'No description provided.',
          meta: [r.language, `Updated ${new Date(r.pushed_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`]
            .filter(Boolean)
            .join(' · '),
          href: r.html_url,
          stars: r.stargazers_count,
        }))
      : staticRepos

  return (
    <Section id="github" className="border-y border-line bg-bg-subtle/60">
      <SectionHeading
        sectionId="github"
        eyebrow="Open source"
        title="Developer activity."
        description="Where my code lives. Repositories, experiments and the commits behind the projects above."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Reveal className="min-w-0 lg:col-span-3">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-gradient-to-br from-accent/20 to-accent-2/20 font-mono text-sm font-semibold text-fg">
                  {site.initials}
                </span>
                <div>
                  <p className="font-semibold text-fg">{site.name}</p>
                  <p className="font-mono text-sm text-subtle">@{username}</p>
                </div>
              </div>
              <Button href={site.social.github} variant="secondary" size="sm" icon={GitHubIcon} iconRight={ArrowUpRight}>
                GitHub profile
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <h3 className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">Contributions</h3>
              {!configured && <span className="text-xs text-subtle">Connects automatically once a username is set</span>}
            </div>
            <div
              className="mt-4 flex flex-1 flex-col justify-center overflow-x-auto rounded-xl border border-line bg-bg/40 p-4 sm:p-5"
              tabIndex={0}
              aria-label="Contribution graph"
            >
              <ContributionGraph username={username} />
              {!configured && <p className="sr-only">Contribution graph placeholder. No GitHub username configured yet.</p>}
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[0.68rem] text-subtle" aria-hidden="true">
              Less
              {[0.06, 0.2, 0.4, 0.65, 0.9].map((o) => (
                <span key={o} className="size-2.5 rounded-[2px] bg-accent" style={{ opacity: o }} />
              ))}
              More
            </div>
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-2">
          <Reveal>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-subtle uppercase">
              <BookMarked className="size-3.5" aria-hidden="true" />
              {status === 'success' ? 'Recent repositories' : 'Repository highlights'}
            </h3>
          </Reveal>
          <motion.ul className="space-y-3" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {items.map((repo) => (
              <motion.li key={repo.key} variants={fadeUp}>
                <RepoCard repo={repo} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}

function RepoCard({ repo }: { repo: RepoItem }) {
  const disabled = isPlaceholder(repo.href)
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 font-mono text-sm font-medium text-fg">
          <GitHubIcon className="size-3.5 shrink-0 text-subtle" />
          <span className="truncate">{repo.name}</span>
        </span>
        {repo.stars !== undefined ? (
          <span className="flex shrink-0 items-center gap-1 text-xs text-subtle">
            <Star className="size-3" aria-hidden="true" />
            {repo.stars}
          </span>
        ) : (
          <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{repo.description}</p>
      <p className="mt-3 font-mono text-[0.7rem] text-subtle">{repo.meta}</p>
    </>
  )

  const classes = 'group block rounded-xl border border-line bg-surface p-4 transition-colors duration-200'

  if (disabled) {
    return (
      <div className={classes} title={`Placeholder: replace ${repo.href} in src/data/projects.ts`}>
        {body}
      </div>
    )
  }

  return (
    <a href={repo.href} target="_blank" rel="noopener noreferrer" className={cn(classes, 'hover:border-line-strong hover:bg-fg/[0.03]')}>
      {body}
    </a>
  )
}
