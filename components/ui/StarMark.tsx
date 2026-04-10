import { cn } from '@/lib/utils'

type StarSize = 'xs' | 'sm' | 'md' | 'lg'

interface StarMarkProps {
  size?: StarSize
  className?: string
  /** Direct fill color. Defaults to currentColor so it inherits from parent text color. */
  color?: string
}

const sizeMap: Record<StarSize, number> = {
  xs: 9,
  sm: 13,
  md: 19,
  lg: 28,
}

/**
 * 4-pointed star mark — the recurring visual motif across the portfolio.
 * Inspired by the ✦ star visible in the PFP corner.
 *
 * Uses currentColor by default, so wrap in a text-* class to tint it.
 * Pass `color` directly to override with a hex/rgb value.
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
      {/*
       * Slender 4-pointed star:
       * Outer radius 11 (from center 12,12), inner radius 2.5 at 45° diagonals.
       * The tight waist gives it a crisp, editorial quality.
       */}
      <path d="M12,1 L13.77,10.23 L23,12 L13.77,13.77 L12,23 L10.23,13.77 L1,12 L10.23,10.23 Z" />
    </svg>
  )
}
