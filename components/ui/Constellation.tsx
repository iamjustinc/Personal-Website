import { cn } from '@/lib/utils'

/**
 * Constellation
 *
 * A deliberate, geometric grouping of 3-5 points joined by thin dashed lines —
 * reads as an intentional navigational marker, not a random sparkle. Used
 * sparingly in section headers and empty negative space.
 *
 * Variation language: use different `points` arrangements per section so that
 * no two placements look identical. Keep opacity low (0.20-0.45 range) and
 * only twinkle 1 point max, so the constellation feels observed rather than
 * animated. Renders as an inline SVG — zero runtime cost when static.
 */

export type ConstellationPoint = {
  /** px within SVG viewBox (0..width) */
  x: number
  /** px within SVG viewBox (0..height) */
  y: number
  /** circle radius in px. default 1.6 */
  size?: number
  /** soft twinkle via CSS opacity. keep at most one point per constellation */
  twinkle?: boolean
  /** seconds delay on twinkle animation */
  delay?: number
}

type ConstellationProps = {
  width: number
  height: number
  points: ConstellationPoint[]
  /** Pairs of point-indices to connect with a dashed line */
  connections?: [number, number][]
  color?: string
  lineOpacity?: number
  pointOpacity?: number
  className?: string
  style?: React.CSSProperties
}

export function Constellation({
  width,
  height,
  points,
  connections = [],
  color = '#4A9FAE',
  lineOpacity = 0.24,
  pointOpacity = 0.75,
  className,
  style,
}: ConstellationProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn('pointer-events-none', className)}
      style={style}
    >
      {connections.map(([a, b], i) => {
        const p1 = points[a]
        const p2 = points[b]
        if (!p1 || !p2) return null
        return (
          <line
            key={`l-${i}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={color}
            strokeWidth={0.75}
            strokeOpacity={lineOpacity}
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
        )
      })}

      {points.map((pt, i) => (
        <circle
          key={`p-${i}`}
          cx={pt.x}
          cy={pt.y}
          r={pt.size ?? 1.6}
          fill={color}
          opacity={pointOpacity}
          className={pt.twinkle ? 'constellation-twinkle' : undefined}
          style={
            pt.twinkle && typeof pt.delay === 'number'
              ? { animationDelay: `${pt.delay}s`, transformOrigin: 'center' }
              : undefined
          }
        />
      ))}
    </svg>
  )
}
