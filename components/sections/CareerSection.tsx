'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Career section — cinematic vertical timeline.
 *
 * Each career item is a milestone on the journey. The left side shows
 * a vertical timeline line with a star marker at each entry.
 * Star markers for the current role glow gold; past roles are teal.
 *
 * Content lives in data/site.ts → siteConfig.career[].
 * Update the placeholder entries with your real experience.
 */
export function CareerSection() {
  const stagger = useMotionSafe(staggerContainer(0.12))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  const items = siteConfig.career
  if (!items || items.length === 0) return null

  return (
    <Section id="career" className="relative overflow-hidden">

      {/* Section heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-14"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
          style={{
            background: 'rgba(15,122,122,0.08)',
            border: '1px solid rgba(15,122,122,0.22)',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
            Career Journey
          </span>
        </div>

        <h2 className="font-display text-h1 text-text-base leading-tight">
          The path{' '}
          <span style={{ color: '#4A9FAE' }}>so far</span>
        </h2>
        <p
          className="font-sans mt-3 max-w-[480px]"
          style={{ fontSize: '15px', color: '#A8C5D1' }}
        >
          Building at the intersection of technical and human — where the interesting problems live.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[18px] top-0 bottom-0 w-px origin-top hidden md:block"
          style={{ background: 'linear-gradient(to bottom, rgba(15,122,122,0.50), rgba(15,122,122,0.10) 90%, transparent)' }}
        />

        {/* Items */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          className="flex flex-col gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={up}
              className="group relative flex gap-8 md:gap-10"
            >
              {/* Timeline marker */}
              <div className="relative shrink-0 hidden md:flex flex-col items-center" style={{ width: 38 }}>
                {/* Star node */}
                <div
                  className="relative z-10 flex items-center justify-center mt-1"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: item.current
                      ? 'rgba(196,151,74,0.12)'
                      : 'rgba(15,122,122,0.10)',
                    border: `1px solid ${item.current ? 'rgba(196,151,74,0.35)' : 'rgba(15,122,122,0.25)'}`,
                    boxShadow: item.current
                      ? '0 0 16px rgba(196,151,74,0.25)'
                      : '0 0 10px rgba(15,122,122,0.15)',
                  }}
                >
                  <StarMark
                    size="xs"
                    color={item.current ? '#C4974A' : '#4A9FAE'}
                    className={item.current ? 'opacity-90' : 'opacity-70'}
                  />
                </div>
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(15,122,122,0.28)' }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-2xl p-6 md:p-8"
                style={{
                  background: 'rgba(15,42,61,0.50)',
                  border: `1px solid ${item.current ? 'rgba(196,151,74,0.18)' : 'rgba(15,122,122,0.14)'}`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* Mobile-only star marker */}
                      <div className="md:hidden">
                        <StarMark
                          size="xs"
                          color={item.current ? '#C4974A' : '#4A9FAE'}
                          className="opacity-70"
                        />
                      </div>
                      <h3 className="font-display text-h3 text-text-base">
                        {item.role}
                      </h3>
                    </div>
                    <p className="font-sans text-sm" style={{ color: '#4A9FAE' }}>
                      {item.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.current && (
                      <span
                        className="font-mono text-[9.5px] uppercase tracking-wider rounded-full px-2.5 py-1 flex items-center gap-1.5"
                        style={{
                          background: 'rgba(196,151,74,0.10)',
                          border: '1px solid rgba(196,151,74,0.25)',
                          color: '#C4974A',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: '#C4974A', boxShadow: '0 0 5px rgba(196,151,74,0.7)' }}
                        />
                        Now
                      </span>
                    )}
                    <span
                      className="font-mono text-[10px] tracking-wider"
                      style={{ color: 'rgba(168,197,209,0.50)' }}
                    >
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: '#8DAFC0' }}
                >
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className={cn('flex flex-wrap gap-1.5 mt-4')}>
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-btn"
                        style={{
                          background: 'rgba(15,42,61,0.80)',
                          border: '1px solid rgba(15,122,122,0.14)',
                          color: '#6A9BAA',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
