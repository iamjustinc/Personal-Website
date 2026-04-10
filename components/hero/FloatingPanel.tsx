'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASING } from '@/lib/motion'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

type PanelSize = 'lg' | 'md' | 'sm'

interface FloatingPanelProps {
  projectName: string
  accentColor: string
  size: PanelSize
  /** Tailwind animation class for the continuous idle float. */
  animClass: string
  /** Absolute positioning classes from the parent layout. */
  className?: string
  /** Delay in seconds before the entrance animation plays. */
  delay?: number
  /** Optional real screenshot path. Falls back to PlaceholderImage. */
  imageSrc?: string
}

const sizeMap: Record<PanelSize, { width: number; height: number }> = {
  lg: { width: 280, height: 175 },
  md: { width: 210, height: 132 },
  sm: { width: 160, height: 100 },
}

export function FloatingPanel({
  projectName,
  accentColor,
  size,
  animClass,
  className,
  delay = 0,
  imageSrc,
}: FloatingPanelProps) {
  const { width, height } = sizeMap[size]
  const shouldReduce = useReducedMotion()

  return (
    /*
     * Outer motion.div: handles Framer Motion entrance (opacity + y).
     * Inner div: handles the continuous CSS float animation.
     * These are on separate elements to avoid transform conflicts.
     */
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? {} : { delay, duration: 0.6, ease: EASING }}
      className={cn('absolute', className)}
      style={{ width, height }}
    >
      {/* CSS float animation wrapper */}
      <div className={cn('w-full h-full', shouldReduce ? undefined : animClass)}>
        <div className="w-full h-full bg-surface rounded-panel shadow-panel overflow-hidden relative">

          {/* Project badge */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-surface/90 backdrop-blur-sm rounded-full px-2 py-0.5">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-[10px] text-text-muted leading-none">
              {projectName}
            </span>
          </div>

          {/* Screenshot or placeholder */}
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={`${projectName} screenshot`}
              className="w-full h-full object-cover"
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
