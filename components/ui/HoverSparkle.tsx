'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

type Spark = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  rotate: number
  scale: number
}

type HoverSparkleProps = {
  children: React.ReactNode
  className?: string
}

export function HoverSparkle({ children, className }: HoverSparkleProps) {
  const reduceMotion = useReducedMotion()
  const hostRef        = useRef<HTMLDivElement>(null)
  // Direct ref to the portal cursor DOM node — position is written via style mutation,
  // never via React state, so cursor tracks the pointer with zero scheduling delay.
  const cursorRef      = useRef<HTMLDivElement>(null)
  const lastSpawnRef   = useRef(0)
  const timeoutIdsRef  = useRef<number[]>([])
  const [isTouch, setIsTouch] = useState(false)
  const [sparks,  setSparks]  = useState<Spark[]>([])
  const [mounted, setMounted] = useState(false)
  // ↑ cursorPos state removed — position is now a direct DOM write, not React state.

  useEffect(() => {
    setMounted(true)
    const media  = window.matchMedia('(pointer: coarse)')
    const update = () => setIsTouch(media.matches)

    update()
    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
      timeoutIdsRef.current.forEach(window.clearTimeout)
    }
  }, [])

  const spawnSpark = (clientX: number, clientY: number, force = false) => {
    if (reduceMotion || isTouch || !hostRef.current) return

    const now = performance.now()
    if (!force && now - lastSpawnRef.current < 70) return
    lastSpawnRef.current = now

    const rect = hostRef.current.getBoundingClientRect()

    const spark: Spark = {
      id:     now + Math.random(),
      x:      clientX - rect.left,
      y:      clientY - rect.top,
      dx:     10 + Math.random() * 10,
      dy:     -6 - Math.random() * 10,
      rotate: -18 + Math.random() * 36,
      scale:  0.85 + Math.random() * 0.35,
    }

    setSparks((prev) => [...prev.slice(-10), spark])

    const timeoutId = window.setTimeout(() => {
      setSparks((prev) => prev.filter((item) => item.id !== spark.id))
    }, 520)

    timeoutIdsRef.current.push(timeoutId)
  }

  const showCustomCursor = !isTouch && !reduceMotion

  return (
    <div
      ref={hostRef}
      data-hover-sparkle="true"
      className={cn('relative isolate', className)}
      style={showCustomCursor ? { cursor: 'none' } : undefined}
      onMouseEnter={(e) => {
        if (showCustomCursor) {
          const el = cursorRef.current
          if (el) {
            // Synchronous DOM write — bypasses React scheduler entirely
            el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
            el.style.opacity   = '1'
          }
        }
        spawnSpark(e.clientX, e.clientY, true)
      }}
      onMouseMove={(e) => {
        if (showCustomCursor) {
          const el = cursorRef.current
          // Position only — no setState, no re-render, no scheduler latency
          if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
        }
        spawnSpark(e.clientX, e.clientY)
      }}
      onMouseLeave={() => {
        const el = cursorRef.current
        if (el) el.style.opacity = '0'
      }}
    >
      {children}

      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute left-0 top-0"
              style={{ x: spark.x, y: spark.y }}
              initial={{ opacity: 0, scale: 0.6, rotate: spark.rotate }}
              animate={{
                opacity: [0, 1, 0],
                x:       spark.dx,
                y:       spark.dy,
                scale:   [0.6, spark.scale, 0.7],
                rotate:  spark.rotate + 18,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-3 w-5">
                {/* little shooting-star trail */}
                <span
                  className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(244,213,141,0) 0%, rgba(244,213,141,0.85) 100%)',
                    transform:       'rotate(-18deg)',
                    transformOrigin: 'right center',
                  }}
                />

                {/* sparkle core */}
                <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2">
                  <span className="absolute inset-0 rounded-full bg-[#F4D58D] opacity-70 blur-[2px]" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[#F4D58D]" />
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[#F4D58D]" />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/*
        Custom cursor — portaled to document.body to escape any ancestor transform context.

        PERF: The div is rendered unconditionally (when showCustomCursor) so the ref is
        always attached and ready. Position is written directly to style.transform — no
        setState, no reconciliation, no scheduler delay. The element starts at opacity 0
        and is made visible/invisible via direct style.opacity writes on enter/leave.

        willChange: 'transform' promotes this element to its own GPU compositor layer
        so transform updates are handled entirely off the main thread.
      */}
      {mounted && showCustomCursor &&
        createPortal(
          <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed z-[9999]"
            style={{
              top:        0,
              left:       0,
              opacity:    0,
              // Initial centering offset — JS overwrites the full translate on every move
              transform:  'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          >
            {/* Soft glow halo */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                width:      44,
                height:     44,
                top:        '50%',
                left:       '50%',
                transform:  'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(244,213,141,0.22) 0%, transparent 70%)',
              }}
            />
            {/* 4-pointed star */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                fill="#F4D58D"
                opacity="0.92"
              />
            </svg>
          </div>,
          document.body,
        )}
    </div>
  )
}
