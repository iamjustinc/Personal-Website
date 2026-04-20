'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { StarMark } from '@/components/ui/StarMark'
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
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
        className="relative"
        style={{
          borderTop: '1px solid rgba(15,122,122,0.14)',
          borderBottom: '1px solid rgba(15,122,122,0.10)',
          background:
            'linear-gradient(180deg, rgba(13,30,53,0.46) 0%, rgba(10,24,43,0.38) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Ambient star field — 5 quiet pinpoints, 1 twinkle, zero cost */}
        <StarField
          className="opacity-55"
          stars={[
            { x: '4%',  y: '24%', size: 1.2, color: '#7EE7F2', opacity: 0.32, halo: 1.3 },
            { x: '9%',  y: '78%', size: 1.0, color: '#F4D58D', opacity: 0.26, halo: 1.1 },
            { x: '51%', y: '14%', size: 1.0, color: '#A8C5D1', opacity: 0.22, halo: 1.0 },
            { x: '76%', y: '86%', size: 1.1, color: '#E6EEF2', opacity: 0.24, halo: 1.0 },
            { x: '96%', y: '44%', size: 1.2, color: '#C4974A', opacity: 0.28, halo: 1.2,
              twinkle: true, delay: 2.4, duration: 6.2 },
          ]}
        />

        {/* Left-side marker constellation — gold, 3-point, quiet counterpart to right */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-6 bottom-4 hidden md:block"
        >
          <Constellation
            width={72}
            height={28}
            color="#C4974A"
            lineOpacity={0.18}
            pointOpacity={0.58}
            points={[
              { x: 6,  y: 20, size: 1.2 },
              { x: 32, y: 8,  size: 1.5 },
              { x: 66, y: 18, size: 1.1 },
            ]}
            connections={[[0, 1], [1, 2]]}
          />
        </div>

        {/*
          Architectural "connection diagram" — a 4-point constellation that
          echoes the capability row beneath it. Static, tucked to the top-right,
          reads as a navigational marker, not a sparkle. One point twinkles.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-4 hidden md:block"
        >
          <Constellation
            width={110}
            height={32}
            color="#4A9FAE"
            lineOpacity={0.22}
            pointOpacity={0.7}
            points={[
              { x: 6,   y: 22, size: 1.4 },
              { x: 34,  y: 10, size: 1.8, twinkle: true, delay: 0 },
              { x: 68,  y: 20, size: 1.4 },
              { x: 104, y: 8,  size: 1.2 },
            ]}
            connections={[
              [0, 1],
              [1, 2],
              [2, 3],
            ]}
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6">
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