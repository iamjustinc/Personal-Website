import { cn } from '@/lib/utils'

interface WatermarkStarProps {
  size?: number
  color?: string
  /** Rotation direction: 1 = clockwise, -1 = counter-clockwise */
  direction?: 1 | -1
  /** Full rotation duration in seconds. Slower = more atmospheric. */
  duration?: number
  className?: string
  opacity?: number
}

/**
 * Large atmospheric star that slowly rotates in the background.
 * Derived from the 4-pointed star motif but rendered at watermark scale.
 *
 * Two overlapping rotated copies create the 8-pointed "dual-tone" star
 * from the reference without requiring a separate component.
 */
export function WatermarkStar({
  size = 600,
  color = '#0F7A7A',
  direction = 1,
  duration = 240,
  className,
  opacity = 0.045,
}: WatermarkStarProps) {
  return (
    <div
      className={cn('watermark-star pointer-events-none select-none shrink-0', className)}
      style={{
        width: size,
        height: size,
        opacity,
        animationDuration: `${duration}s`,
        animationDirection: direction === 1 ? 'normal' : 'reverse',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        {/* Primary 4-pointed star */}
        <path
          d="M50,4 L55.5,44.5 L96,50 L55.5,55.5 L50,96 L44.5,55.5 L4,50 L44.5,44.5 Z"
          fill={color}
          opacity="1"
        />
        {/* Secondary 4-pointed star rotated 45° creates the 8-pointed effect */}
        <path
          d="M50,4 L55.5,44.5 L96,50 L55.5,55.5 L50,96 L44.5,55.5 L4,50 L44.5,44.5 Z"
          fill={color}
          opacity="0.4"
          transform="rotate(45 50 50)"
        />
      </svg>
    </div>
  )
}
