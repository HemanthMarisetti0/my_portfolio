import { useEffect, useState } from 'react'
import { isPlaceholder } from '@/lib/utils'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

type State =
  | { status: 'idle' | 'loading' | 'error'; repos: [] }
  | { status: 'success'; repos: GitHubRepo[] }

/**
 * Fetches public repositories once a real GitHub username is configured.
 * Uses the unauthenticated REST API (60 requests/hour per visitor IP), which is plenty for a portfolio.
 */
export function useGitHubRepos(username: string, limit = 4) {
  const [state, setState] = useState<State>({ status: 'idle', repos: [] })

  useEffect(() => {
    if (isPlaceholder(username)) return
    const controller = new AbortController()
    setState({ status: 'loading', repos: [] })

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`)
        return res.json() as Promise<GitHubRepo[]>
      })
      .then((repos) => {
        setState({ status: 'success', repos: repos.filter((r) => !r.fork).slice(0, limit) })
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ status: 'error', repos: [] })
      })

    return () => controller.abort()
  }, [username, limit])

  return state
}
