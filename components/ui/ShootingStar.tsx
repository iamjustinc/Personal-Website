'use client'

import { useReducedMotion } from 'framer-motion'

interface ShootingStarProps {
  startX?: string
  startY?: string
  angle?: number
  duration?: number
  delay?: number
}

/**
 * Shooting star — fires diagonally across the viewport once per cycle.
 * Uses a long-cycle CSS animation so it fires, pauses, then repeats.
 * The pause is built into the keyframe (opacity: 0 from 30%→100%).
 * Hidden when prefers-reduced-motion is active.
 */
export function ShootingStar({
  startX = '20%',
  startY = '15%',
  angle = 32,
  duration = 14,  // full cycle including pause
  delay = 0,
}: ShootingStarProps) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null

  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: startX,
        top: startY,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'left center',
      }}
    >
      <div
        className="shooting-star"
        style={{
          animation: `shoot-cycle ${duration}s linear ${delay}s infinite`,
        }}
      />
    </div>
  )
}
