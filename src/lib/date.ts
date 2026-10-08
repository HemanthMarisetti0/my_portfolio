const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(yearMonth: string): [number, number] {
  const [year, month] = yearMonth.split('-').map(Number)
  return [year, month]
}

/** '2024-09' → 'Sep 2024' */
export function formatMonth(yearMonth: string) {
  const [year, month] = parse(yearMonth)
  return `${MONTHS[month - 1]} ${year}`
}

/** 'Sep 2024 – Present' or 'Dec 2023 – Sep 2024' */
export function formatPeriod(start: string, end?: string) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

/** Human duration between two 'YYYY-MM' months (end defaults to now), e.g. '2 yrs 1 mo'. */
export function formatDuration(start: string, end?: string) {
  const [sy, sm] = parse(start)
  const now = new Date()
  const [ey, em] = end ? parse(end) : [now.getFullYear(), now.getMonth() + 1]
  const months = Math.max(1, (ey - sy) * 12 + (em - sm))
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
  return parts.join(' ')
}
