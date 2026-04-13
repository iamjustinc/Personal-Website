'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { StarMark } from '@/components/ui/StarMark'
import { fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

const columnMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

export function CapabilityStrip() {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up      = useMotionSafe(fadeUp)
  const { capabilities } = siteConfig
  const count     = Math.min(capabilities.length, 4)
  const gridClass = columnMap[count] ?? 'md:grid-cols-3'

  return (
    <div
      style={{
        borderTop: '1px solid rgba(15,122,122,0.12)',
        borderBottom: '1px solid rgba(15,122,122,0.08)',
        background: 'rgba(13,30,53,0.35)',
      }}
    >
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
                'py-9 px-8 max-md:px-0',
                i < capabilities.length - 1 && 'md:border-r max-md:border-b',
              )}
              style={{
                borderColor: 'rgba(15,122,122,0.12)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <StarMark size="xs" color="#4A9FAE" className="opacity-55" />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                  {item.label}
                </p>
              </div>
              <p className="font-sans text-[15px] text-text-base leading-relaxed" style={{ color: '#A8C5D1' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
