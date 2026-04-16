'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { StarMark } from '@/components/ui/StarMark'
import { fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

const columnMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

const accents = [
  {
    star: '#4A9FAE',
    line: 'rgba(74,159,174,0.30)',
    glow: 'radial-gradient(circle at top left, rgba(74,159,174,0.16) 0%, transparent 58%)',
  },
  {
    star: '#C4974A',
    line: 'rgba(196,151,74,0.28)',
    glow: 'radial-gradient(circle at top left, rgba(196,151,74,0.14) 0%, transparent 56%)',
  },
  {
    star: '#7EE7F2',
    line: 'rgba(126,231,242,0.24)',
    glow: 'radial-gradient(circle at top left, rgba(126,231,242,0.12) 0%, transparent 56%)',
  },
  {
    star: '#4A9FAE',
    line: 'rgba(74,159,174,0.30)',
    glow: 'radial-gradient(circle at top left, rgba(74,159,174,0.16) 0%, transparent 58%)',
  },
]

export function CapabilityStrip() {
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)
  const { capabilities } = siteConfig
  const count = Math.min(capabilities.length, 4)
  const gridClass = columnMap[count] ?? 'md:grid-cols-3'

  return (
    <section className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div
        style={{
          borderTop: '1px solid rgba(15,122,122,0.14)',
          borderBottom: '1px solid rgba(15,122,122,0.10)',
          background:
            'linear-gradient(180deg, rgba(13,30,53,0.46) 0%, rgba(10,24,43,0.38) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            className={cn('grid grid-cols-1 gap-0', gridClass)}
          >
            {capabilities.map((item, i) => {
              const accent = accents[i % accents.length]

              return (
                <motion.div
                  key={item.label}
                  variants={up}
                  className={cn(
                    'group relative overflow-hidden min-h-[196px] px-7 py-8 md:px-8 md:py-9 transition-transform duration-300',
                    i < capabilities.length - 1 && 'md:border-r max-md:border-b',
                  )}
                  style={{
                    borderColor: 'rgba(15,122,122,0.12)',
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: accent.glow }}
                  />

                  <div
                    aria-hidden
                    className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-[0.35] group-hover:scale-x-100 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${accent.line} 0%, transparent 82%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-4">
                      <StarMark size="xs" color={accent.star} className="opacity-70" />
                      <p
                        className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                        style={{ color: '#86AEBB' }}
                      >
                        {item.label}
                      </p>
                    </div>

                    <p
                      className="max-w-[30ch] font-sans text-[17px] md:text-[18px] leading-[1.65] text-pretty transition-colors duration-300"
                      style={{ color: '#D8E8EE' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}