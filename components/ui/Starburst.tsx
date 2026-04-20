import { cn } from '@/lib/utils'

/**
 * Starburst
 *
 * A premium luminous 8-point starburst with two overlapping 4-point stars and a
 * soft radial halo. Designed as a COMPOSITIONAL ANCHOR, not a sparkle accent:
 * use 1-2 per section maximum, placed deliberately (e.g., the upper-right
 * "luminous anchor" in a hero).
 *
 * Variation language: vary size + color + pulse between instances so no two
 * read alike. Gold (#F4D58D / #C4974A) for warm accents; teal (#4A9FAE) for
 * cool; soft white (#E6EEF2) for neutral-bright.
 *
 * Perf: static by default. `pulse` uses CSS transform + opacity only.
 */

type StarburstSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<StarburstSize, { star: number; halo: number }> = {
  sm: { star: 14, halo: 44 },
  md: { star: 22, halo: 72 },
  lg: { star: 34, halo: 112 },
  xl: { star: 52, halo: 172 },
}

interface StarburstProps {
  size?: StarburstSize
  color?: string
  /** Halo color. Defaults to `color`. */
  haloColor?: string
  /** Applied to the whole burst; combines with pulse opacity. */
  opacity?: number
  /** Enables subtle breathing scale and opacity pulse. */
  pulse?: boolean
  /** Pulse delay seconds. */
  delay?: number
  /** Pulse duration seconds. default 5.5 */
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export function Starburst({
  size = 'md',
  color = '#F4D58D',
  haloColor,
  opacity = 0.85,
  pulse = false,
  delay = 0,
  duration = 5.5,
  className,
  style,
}: StarburstProps) {
  const { star, halo } = sizeMap[size]
  const hColor = haloColor ?? color

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none relative', className)}
      style={{
        width: halo,
        height: halo,
        opacity,
        ...style,
      }}
    >
      <div
        className={cn(
          'absolute inset-0',
          pulse && 'starburst-pulse',
        )}
        style={{
          animationDelay: pulse ? `${delay}s` : undefined,
          animationDuration: pulse ? `${duration}s` : undefined,
        }}
      >
        {/* Radial glow halo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${hColor}55 0%, ${hColor}20 30%, transparent 68%)`,
          }}
        />

        {/* 8-point star (two overlapping 4-point stars) */}
        <svg
          width={star}
          height={star}
          viewBox="0 0 24 24"
          fill={color}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: `drop-shadow(0 0 5px ${color}AA) drop-shadow(0 0 12px ${color}55)`,
          }}
        >
          <path d="M12,1 L13.77,10.23 L23,12 L13.77,13.77 L12,23 L10.23,13.77 L1,12 L10.23,10.23 Z" />
          <path
            d="M12,1 L13.77,10.23 L23,12 L13.77,13.77 L12,23 L10.23,13.77 L1,12 L10.23,10.23 Z"
            transform="rotate(45 12 12)"
            opacity="0.55"
          />
        </svg>
      </div>
    </div>
  )
}
