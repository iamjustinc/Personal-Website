import { hexToRgba, cn } from '@/lib/utils'

interface PlaceholderImageProps {
  projectName: string
  accentColor: string
  label?: string
  className?: string
}

/**
 * A styled placeholder used until real project screenshots are ready.
 * Replace with next/image once images are available.
 */
export function PlaceholderImage({
  projectName,
  accentColor,
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn('w-full h-full flex items-center justify-center', className)}
      style={{ background: hexToRgba(accentColor, 0.07) }}
    >
      <span
        className="font-display text-h3 select-none"
        style={{ color: hexToRgba(accentColor, 0.45) }}
      >
        {label ?? projectName}
      </span>
    </div>
  )
}
