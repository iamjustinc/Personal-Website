'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { EASING } from '@/lib/motion'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'

/**
 * Hero right column — cinematic dark composition.
 * Kestrel is the dominant visual. A slow-rotating star watermark lives
 * inside the frame as texture. Quail + Chirpie appear as smaller framed
 * tiles below, hinting at the broader portfolio.
 */
export function HeroVisual() {
  const shouldReduce = useReducedMotion()
  const panels  = siteConfig.heroFloatingPanels ?? []
  const kestrel = panels[0]
  const quail   = panels[1]
  const chirpie = panels[2]

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: EASING }}
      className="relative flex flex-col gap-3"
    >
      {/* ── Main frame — Kestrel ────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {/* Screenshot */}
        {kestrel?.imageSrc && (
          <Image
            src={kestrel.imageSrc}
            alt="Kestrel — AI research tool"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-top"
            priority
            style={{ opacity: 0.65 }}
          />
        )}

        {/* Dark overlay gradient — cinematic depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(15,122,122,0.18) 0%, rgba(10,22,40,0.55) 60%, rgba(10,22,40,0.80) 100%)',
          }}
        />

        {/* Rotating watermark star inside the frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <WatermarkStar
            size={280}
            color="#0F7A7A"
            direction={1}
            duration={80}
            opacity={0.08}
          />
        </div>

        {/* Corner star accents */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <StarMark size="xs" color="#4A9FAE" className="opacity-50" />
        </div>
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <StarMark size="xs" color="#C4974A" className="opacity-60" />
        </div>

        {/* Project label badge */}
        <div
          className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{
            background: 'rgba(13,30,53,0.80)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(15,122,122,0.25)',
          }}
        >
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: kestrel?.accentColor ?? '#0F7A7A', boxShadow: `0 0 6px ${kestrel?.accentColor ?? '#0F7A7A'}80` }}
          />
          <span className="font-mono text-[9.5px] text-text-muted tracking-wider uppercase">
            Kestrel
          </span>
        </div>

        {/* Frame border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: '1px solid rgba(15,122,122,0.22)' }}
        />
      </div>

      {/* ── Secondary row — Quail + Chirpie ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {[quail, chirpie].map((panel, i) =>
          panel ? (
            <motion.div
              key={panel.slug}
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 + i * 0.12, ease: EASING }}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            >
              {panel.imageSrc && (
                <Image
                  src={panel.imageSrc}
                  alt={`${panel.projectName} preview`}
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                  style={{ opacity: 0.55 }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${panel.accentColor}20 0%, rgba(10,22,40,0.65) 100%)`,
                }}
              />
              {/* Label */}
              <div
                className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
                style={{
                  background: 'rgba(13,30,53,0.80)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(15,122,122,0.20)',
                }}
              >
                <div className="w-[5px] h-[5px] rounded-full" style={{ background: panel.accentColor }} />
                <span className="font-mono text-[9px] text-text-muted tracking-wider uppercase">
                  {panel.projectName}
                </span>
              </div>
              {/* Frame border */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ border: '1px solid rgba(15,122,122,0.16)' }}
              />
            </motion.div>
          ) : null
        )}
      </div>
    </motion.div>
  )
}
