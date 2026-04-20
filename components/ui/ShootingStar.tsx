interface ShootingStarProps {
  startX?: string
  startY?: string
  angle?: number
  duration?: number
  delay?: number
  scale?: number
  opacity?: number
  className?: string
}

/**
 * Shooting star travels diagonally across the viewport.
 *
 * The outer div is a zero-size anchor point at (startX, startY).
 * It is rotated `angle` degrees around that point (transform-origin: 0 0).
 * The inner element animates translateX for movement in the rotated axis.
 * This avoids transform conflicts between the angle rotation and the motion.
 */
export function ShootingStar({
  startX = '20%',
  startY = '15%',
  angle = 32,
  duration = 14,
  delay = 0,
  scale = 1,
  opacity = 1,
  className,
}: ShootingStarProps) {
  return (
    <div
      aria-hidden
      className={className ? `absolute pointer-events-none ${className}` : 'absolute pointer-events-none'}
      style={{
        left: startX,
        top: startY,
        width: 0,
        height: 0,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        opacity,
      }}
    >
      <div
        className="shooting-star"
        style={{
          animation: `shoot-cycle ${duration}s linear ${delay}s infinite`,
          width: `${160 * scale}px`,
          height: `${1.5 * Math.max(0.82, Math.min(scale, 1.12))}px`,
        }}
      />
    </div>
  )
}
