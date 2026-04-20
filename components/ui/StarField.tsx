'use client'

import { cn } from '@/lib/utils'

/**
 * StarField
 *
 * A scattered, asymmetrical cluster of tiny starlight pinpoints. Designed for
 * "quiet negative space" — contact, footer, calm sections — where you want a
 * distant-night-sky feel without obvious motion.
 *
 * Variation language: vary density, twinkle count, color mix, and asymmetry
 * per section. A StarField should never look uniform or like a grid. Keep
 * ≤40% of points on twinkle to avoid the "chasing fireflies" look.
 *
 * Perf: each dot is a ~1-3px span with a small box-shadow halo. Twinkle is a
 * CSS opacity animation (compositor-safe, zero JS cost).
 */

export type StarFieldStar = {
  /** CSS left value (e.g. '12%' or 20) */
  x: string | number
  /** CSS top value */
  y: string | number
  /** px diameter. default 2 */
  size?: number
  /** default soft white */
  color?: string
  /** baseline opacity when not twinkling. default 0.55 */
  opacity?: number
  /** if true, pulses via CSS. keep only a few per field */
  twinkle?: boolean
  /** seconds; staggers twinkle so stars don't breathe in unison */
  delay?: number
  /** seconds; default 4.5 */
  duration?: number
  /** halo strength multiplier (0 disables). default 1.8 */
  halo?: number
}

type StarFieldProps = {
  stars: StarFieldStar[]
  className?: string
}

export function StarField({ stars, className }: StarFieldProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      {stars.map((s, i) => {
        const size = s.size ?? 2
        const halo = s.halo ?? 1.8
        const color = s.color ?? '#E6EEF2'
        return (
          <span
            key={i}
            className={cn('absolute rounded-full', s.twinkle && 'starfield-twinkle')}
            style={{
              left: typeof s.x === 'number' ? `${s.x}px` : s.x,
              top: typeof s.y === 'number' ? `${s.y}px` : s.y,
              width: size,
              height: size,
              background: color,
              opacity: s.opacity ?? 0.55,
              boxShadow:
                halo > 0
                  ? `0 0 ${size * halo * 2}px ${color}66, 0 0 ${size * halo}px ${color}AA`
                  : undefined,
              animationDelay: s.delay !== undefined ? `${s.delay}s` : undefined,
              animationDuration: s.duration ? `${s.duration}s` : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
