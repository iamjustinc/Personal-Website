'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { StarMark } from '@/components/ui/StarMark'

// Burst directions: 8 particles every 45°, radius 30px
const BURST = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 * Math.PI) / 180
  return {
    x: Math.cos(angle) * 30,
    y: Math.sin(angle) * 30,
  }
})

interface StarburstButtonProps {
  href?: string
  download?: boolean
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent) => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  starSpin?: boolean
  children: React.ReactNode
  className?: string
}

const sizeClasses: Record<string, string> = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-7 py-3 text-[14px]',
  lg: 'px-8 py-3.5 text-[15px]',
}

export function StarburstButton({
  href = '#',
  download,
  target,
  rel,
  onClick,
  variant = 'primary',
  size = 'md',
  starSpin = false,
  children,
  className,
}: StarburstButtonProps) {
  const shouldReduce = useReducedMotion()
  const [bursting, setBursting] = useState(false)

  const fire = useCallback(
    (e: React.MouseEvent) => {
      onClick?.(e)
      if (shouldReduce) return
      setBursting(true)
      setTimeout(() => setBursting(false), 500)
    },
    [onClick, shouldReduce],
  )

  const isPrimary = variant === 'primary'
  const burstColor = isPrimary ? 'rgba(74,159,174,0.90)' : '#C4974A'

  // Variant-specific styles
  const spanStyle: React.CSSProperties = isPrimary
    ? {
        background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)',
        boxShadow: '0 4px 20px rgba(15,122,122,0.32)',
        color: '#ffffff',
      }
    : {
        background: 'rgba(15,122,122,0.07)',
        boxShadow: 'inset 0 0 0 1px rgba(15,122,122,0.30)',
        color: '#A8C5D1',
      }

  const hovVariants = isPrimary
    ? {
        hov: {
          scale: 1.05,
          y: -4,
          boxShadow: '0 16px 48px rgba(15,122,122,0.55), 0 0 0 1px rgba(74,159,174,0.40)',
        },
      }
    : {
        hov: {
          scale: 1.04,
          y: -3,
          boxShadow: '0 12px 36px rgba(15,122,122,0.28), inset 0 0 0 1px rgba(15,122,122,0.55)',
        },
      }

  const starHovVariants = isPrimary
    ? { hov: { rotate: 72, scale: 1.2 } }
    : { hov: { rotate: -72, scale: 1.15 } }

  // Continuous spin for starSpin mode (only when not reduced)
  const starAnimateProp =
    !shouldReduce && starSpin
      ? { rotate: 360 }
      : undefined

  const starTransition =
    !shouldReduce && starSpin
      ? { duration: 8, repeat: Infinity, ease: 'linear' as const }
      : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.a
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={fire}
      whileHover="hov"
      whileTap={{ scale: 0.95 }}
      className={`inline-flex select-none ${className ?? ''}`}
    >
      {/* relative wrapper to hold burst particles alongside clipped button */}
      <div className="relative inline-flex">
        {/* Clipped button visuals */}
        <motion.span
          variants={hovVariants}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`btn-angular inline-flex items-center gap-2.5 font-sans font-semibold ${sizeClasses[size]}`}
          style={spanStyle}
        >
          <motion.span
            variants={shouldReduce ? {} : starHovVariants}
            animate={starAnimateProp}
            transition={starTransition}
            className="inline-flex"
          >
            <StarMark
              size="xs"
              color={isPrimary ? 'rgba(255,255,255,0.88)' : '#C4974A'}
            />
          </motion.span>
          {children}
        </motion.span>

        {/* Burst particles outside clip-path so they're fully visible */}
        <AnimatePresence>
          {bursting &&
            BURST.map((d, i) => (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: -4.5,
                  marginTop: -4.5,
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: d.x, y: d.y, scale: 1.2, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.02,
                }}
              >
                <StarMark size="xs" color={burstColor} />
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
    </motion.a>
  )
}
