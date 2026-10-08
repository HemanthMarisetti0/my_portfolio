import type { Screenshot } from '@/data/types'
import { WindowFrame } from './WindowFrame'

interface ScreenshotFrameProps {
  screenshot: Screenshot
  eager?: boolean
  /** Crops in on `screenshot.focus` so a wide screenshot stays legible at thumbnail size. */
  zoomed?: boolean
}

/** A project screenshot inside minimal browser chrome. */
export function ScreenshotFrame({ screenshot, eager = false, zoomed = false }: ScreenshotFrameProps) {
  const image = (
    <img
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={zoomed ? 'size-full object-cover' : 'block h-auto w-full'}
      style={zoomed ? { objectPosition: screenshot.focus ?? 'center' } : undefined}
    />
  )

  return (
    <WindowFrame title={screenshot.url} className="w-full">
      {zoomed ? <div className="aspect-[4/3] overflow-hidden bg-white">{image}</div> : image}
    </WindowFrame>
  )
}
