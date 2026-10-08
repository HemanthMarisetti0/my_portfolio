import { cn } from '@/lib/utils'

export function AvailabilityBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 text-xs font-medium text-muted backdrop-blur',
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
        <span className="relative size-2 rounded-full bg-success" />
      </span>
      {label}
    </span>
  )
}
