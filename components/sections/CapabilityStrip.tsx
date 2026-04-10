'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

const columnMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

/**
 * Capability strip — editorial positioning band between hero and projects.
 * Three (or more) columns. Each column: accent bar → label → description.
 * No stats. No skill logos. No charts. Just clear positioning statements.
 */
export function CapabilityStrip() {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up      = useMotionSafe(fadeUp)

  const { capabilities } = siteConfig
  const count     = Math.min(capabilities.length, 4)
  const gridClass = columnMap[count] ?? 'md:grid-cols-3'

  return (
    /*
     * Single top border only — not sandwiched between two borders.
     * The top border gives clean separation from the hero.
     * The bottom bleeds naturally into the Projects section bg.
     */
    <div className="bg-bg border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className={cn('grid grid-cols-1', gridClass)}
        >
          {capabilities.map((item, i) => (
            <motion.div
              key={item.label}
              variants={up}
              className={cn(
                'py-10 px-8',
                // Vertical dividers between columns (desktop only)
                i < capabilities.length - 1 && 'md:border-r md:border-border',
                // Horizontal dividers between items (mobile only)
                i < capabilities.length - 1 && 'border-b border-border md:border-b-0',
                // Flush left edge on mobile
                'max-md:px-0',
              )}
            >
              {/* Label row — accent bar anchors each item visually */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-[2px] h-[18px] rounded-full bg-accent shrink-0 opacity-70"
                  aria-hidden
                />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted leading-none">
                  {item.label}
                </p>
              </div>

              {/* Description — slightly larger than sm for readability */}
              <p className="font-sans text-[15px] text-text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
