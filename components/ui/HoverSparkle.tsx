'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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
  const hostRef = useRef<HTMLDivElement>(null)
  const lastSpawnRef = useRef(0)
  const timeoutIdsRef = useRef<number[]>([])
  const [isTouch, setIsTouch] = useState(false)
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')
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
      id: now + Math.random(),
      x: clientX - rect.left,
      y: clientY - rect.top,
      dx: 10 + Math.random() * 10,
      dy: -6 - Math.random() * 10,
      rotate: -18 + Math.random() * 36,
      scale: 0.85 + Math.random() * 0.35,
    }

    setSparks((prev) => [...prev.slice(-10), spark])

    const timeoutId = window.setTimeout(() => {
      setSparks((prev) => prev.filter((item) => item.id !== spark.id))
    }, 520)

    timeoutIdsRef.current.push(timeoutId)
  }

  return (
    <div
      ref={hostRef}
      className={cn('relative isolate', className)}
      onMouseEnter={(e) => spawnSpark(e.clientX, e.clientY, true)}
      onMouseMove={(e) => spawnSpark(e.clientX, e.clientY)}
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
                x: spark.dx,
                y: spark.dy,
                scale: [0.6, spark.scale, 0.7],
                rotate: spark.rotate + 18,
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
                    transform: 'rotate(-18deg)',
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
    </div>
  )
}