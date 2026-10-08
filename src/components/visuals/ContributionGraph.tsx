import { isPlaceholder } from '@/lib/utils'

const WEEKS = 52
const DAYS = 7

/**
 * With a real username this renders the public contribution chart image from ghchart.rshah.org.
 * Until then it shows a neutral, clearly-labelled skeleton (no invented activity).
 */
export function ContributionGraph({ username }: { username: string }) {
  if (!isPlaceholder(username)) {
    return (
      <img
        src={`https://ghchart.rshah.org/7c93ff/${encodeURIComponent(username)}`}
        alt={`GitHub contribution graph for ${username}`}
        loading="lazy"
        className="w-full min-w-[640px] dark:opacity-90 dark:invert-[0.06]"
      />
    )
  }

  return (
    <div className="min-w-[640px]" aria-hidden="true">
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
        {Array.from({ length: WEEKS * DAYS }, (_, i) => (
          <span
            key={i}
            className="aspect-square rounded-[2px] bg-fg/[0.06] animate-shimmer"
            style={{ animationDelay: `${(Math.floor(i / DAYS) % 26) * 0.08}s` }}
          />
        ))}
      </div>
    </div>
  )
}
