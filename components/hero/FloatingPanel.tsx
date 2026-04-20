'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { EASING } from '@/lib/motion'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

type PanelSize = 'lg' | 'md' | 'sm'

interface FloatingPanelProps {
  projectName: string
  accentColor: string
  size: PanelSize
  /** Tailwind CSS animation class (e.g. 'animate-float1'). */
  animClass: string
  /** Absolute positioning + z-index classes from parent layout. */
  className?: string
  /** Entrance delay in seconds. */
  delay?: number
  /** Tailwind shadow class that varies per panel to simulate depth. */
  shadowClass?: string
  /** Optional real screenshot path. Falls back to PlaceholderImage. */
  imageSrc?: string
}

const sizeMap: Record<PanelSize, { width: number; height: number }> = {
  lg: { width: 288, height: 180 },
  md: { width: 214, height: 134 },
  sm: { width: 162, height: 102 },
}

export function FloatingPanel({
  projectName,
  accentColor,
  size,
  animClass,
  className,
  delay = 0,
  shadowClass = 'shadow-panel',
  imageSrc,
}: FloatingPanelProps) {
  const { width, height } = sizeMap[size]
  const shouldReduce = useReducedMotion()

  return (
    /*
     * Layer separation:
     *   Outer motion.div → Framer Motion entrance (opacity + y).
     *   Inner div        → CSS float keyframe animation.
     * Kept on different elements to avoid transform conflicts.
     */
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? {} : { delay, duration: 0.65, ease: EASING }}
      className={cn('absolute', className)}
      style={{ width, height }}
    >
      {/* Float animation wrapper */}
      <div className={cn('w-full h-full', !shouldReduce && animClass)}>

        <div
          className={cn(
            'w-full h-full bg-surface rounded-panel overflow-hidden relative',
            shadowClass,
          )}
        >
          {/* Project badge: top right, frosted */}
          <div
            className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(255,255,255,0.90)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(212,207,194,0.8)',
            }}
          >
            <div
              className="w-[6px] h-[6px] rounded-full shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-[10px] text-text-muted leading-none tracking-wide">
              {projectName}
            </span>
          </div>

          {/* Content: next/image when src provided, placeholder fallback */}
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${projectName} preview`}
              fill
              sizes={`${width}px`}
              className="object-cover object-top"
            />
          ) : (
            <PlaceholderImage
              projectName={projectName}
              accentColor={accentColor}
              className="w-full h-full"
            />
          )}
        </div>

      </div>
    </motion.div>
  )
}
