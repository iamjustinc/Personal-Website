import { cn } from '@/lib/utils'

type StarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface StarMarkProps {
  size?: StarSize
  className?: string
  /** Direct fill color. Defaults to currentColor so it inherits from parent text color. */
  color?: string
}

const sizeMap: Record<StarSize, number> = {
  xs:  9,
  sm:  13,
  md:  19,
  lg:  28,
  xl:  64,
  '2xl': 120,
}

/**
 * 4-pointed star mark — the recurring motif across the portfolio.
 * Small sizes (xs–lg) for UI accents, xl–2xl for decorative elements.
 */
export function StarMark({ size = 'sm', className, color = 'currentColor' }: StarMarkProps) {
  const px = sizeMap[size]

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={color}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path d="M12,1 L13.77,10.23 L23,12 L13.77,13.77 L12,23 L10.23,13.77 L1,12 L10.23,10.23 Z" />
    </svg>
  )
}
