'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

const columnMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

/**
 * A narrow editorial band that communicates Justin's positioning.
 * 3-4 columns, each with a label + short description.
 * No stats. No logos. No charts.
 */
export function CapabilityStrip() {
  const stagger = useMotionSafe(staggerContainer(0.12))
  const up      = useMotionSafe(fadeUp)

  const { capabilities } = siteConfig
  const count = Math.min(capabilities.length, 4)
  const gridClass = columnMap[count] ?? 'grid-cols-3'

  return (
    <div className="bg-bg border-t border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className={cn(
            'grid',
            // Desktop: dynamic column count with vertical dividers
            gridClass,
            // Mobile: always single column
            'max-md:grid-cols-1',
          )}
        >
          {capabilities.map((item, i) => (
            <motion.div
              key={item.label}
              variants={up}
              className={cn(
                'py-12 px-8',
                // Vertical divider between columns (desktop)
                i < capabilities.length - 1 && 'md:border-r md:border-border',
                // Horizontal divider between rows (mobile)
                i < capabilities.length - 1 && 'max-md:border-b max-md:border-border',
                // No padding on mobile sides (handled by parent px-6)
                'max-md:px-0 max-md:py-6',
              )}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-2">
                {item.label}
              </p>
              <p className="font-sans text-sm text-text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
