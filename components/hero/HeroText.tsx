'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

// ── Sparkle accent ──────────────────────────────────────────────────────────
// Tiny 4-pointed gold star that blooms and fades at a fixed position.
// Used to scatter a few accent points along the streak's path.

function SparkAccent({
  delay,
  x,
  top,
}: {
  delay: number
  x: string
  top: string
}) {
  return (
    <motion.span
      className="absolute pointer-events-none"
      style={{ left: x, top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.15, 0], rotate: 45 }}
      transition={{ delay, duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
          fill="#F4D58D"
          opacity="0.85"
        />
      </svg>
    </motion.span>
  )
}

// ── HeroText ────────────────────────────────────────────────────────────────

export function HeroText() {
  const stagger      = useMotionSafe(staggerContainer(0.10))
  const hero         = useMotionSafe(fadeUpHero)
  const up           = useMotionSafe(fadeUp)
  const fast         = useMotionSafe(fadeInFast)
  const reduceMotion = useReducedMotion()

  const nameParts = siteConfig.name.split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ')

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* ── Availability tag ────────────────────────────────────────────── */}
      <motion.div variants={fast} className="mb-7">
        <span
          className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase rounded-full px-4 py-2"
          style={{
            border: '1px solid rgba(15,122,122,0.32)',
            background: 'rgba(15,122,122,0.09)',
            color: '#4A9FAE',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          {siteConfig.roleTag}
        </span>
      </motion.div>

      {/* ── Name with shooting-star reveal ──────────────────────────────── */}
      {/*
          The motion.h1 fades + lifts as normal (fadeUpHero variant).
          After it is mostly visible (~0.5s), a diagonal light streak sweeps
          left→right across the name — the letters appear to "catch light"
          as it crosses. Four tiny gold sparkle dots scatter along the path.
          One-shot only. No looping.
      */}
      <motion.h1
        variants={hero}
        className="font-display text-hero text-text-base leading-none relative"
      >
        {/* Text — unchanged */}
        {firstName}{lastName ? (
          <>
            {' '}
            <span style={{ color: '#4A9FAE' }}>{lastName}</span>
          </>
        ) : null}

        {!reduceMotion && (
          <>
            {/* ── Light streak ──────────────────────────────────────────
                overflow:hidden clips the gradient to the h1's bounds.
                The motion.span translates from off-left to off-right.
                skewX(-12deg) gives the diagonal shooting angle.
                The gradient is soft white at centre, transparent at edges —
                just bright enough to highlight letters as it passes.
            ───────────────────────────────────────────────────────── */}
            <span
              className="absolute inset-0 overflow-hidden pointer-events-none"
              aria-hidden
            >
              <motion.span
                className="absolute inset-y-[-4px] block"
                style={{
                  width: '36%',
                  background:
                    'linear-gradient(100deg,' +
                    '  transparent 0%,' +
                    '  rgba(200,240,255,0.00) 18%,' +
                    '  rgba(190,230,245,0.07) 38%,' +
                    '  rgba(255,255,255,0.15) 50%,' +
                    '  rgba(190,230,245,0.07) 62%,' +
                    '  rgba(200,240,255,0.00) 82%,' +
                    '  transparent 100%)',
                  transform: 'skewX(-12deg)',
                }}
                initial={{ x: '-80%' }}
                animate={{ x: '300%' }}
                transition={{
                  delay: 0.50,
                  duration: 0.50,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            </span>

            {/* ── Sparkle accents ───────────────────────────────────────
                Four dots staggered along the streak's travel path.
                Alternating top / bottom so they feel scattered, not lined up.
                Delays are calibrated to the streak's x position at each point.
            ───────────────────────────────────────────────────────── */}
            <SparkAccent delay={0.55} x="7%"  top="-11px" />
            <SparkAccent delay={0.62} x="31%" top="calc(100% + 5px)" />
            <SparkAccent delay={0.69} x="60%" top="-9px" />
            <SparkAccent delay={0.76} x="85%" top="calc(100% + 3px)" />
          </>
        )}
      </motion.h1>

      {/* ── Statement ───────────────────────────────────────────────────── */}
      <motion.p
        variants={up}
        className="font-sans leading-relaxed mt-6 max-w-[420px]"
        style={{ fontSize: 'clamp(16px, 1.7vw, 19px)', color: '#A8C5D1' }}
      >
        {siteConfig.heroStatement}
      </motion.p>

      {/* ── Capability pills ─────────────────────────────────────────────── */}
      <motion.div variants={fast} className="flex flex-wrap gap-2 mt-6">
        {siteConfig.capabilities.slice(0, 3).map((cap) => (
          <span
            key={cap.label}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider rounded-full px-3 py-1"
            style={{
              background: 'rgba(15,42,61,0.60)',
              border: '1px solid rgba(15,122,122,0.18)',
              color: '#7AABB8',
            }}
          >
            <StarMark size="xs" color="#0F7A7A" className="opacity-60" />
            {cap.label}
          </span>
        ))}
      </motion.div>

      {/* ── Separator ───────────────────────────────────────────────────── */}
      <motion.div
        variants={fast}
        className="mt-10 w-8 h-px"
        style={{ background: 'rgba(15,122,122,0.35)' }}
        aria-hidden
      />

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <motion.div variants={fast} className="flex flex-wrap gap-3 mt-6">
        <HoverSparkle className="inline-flex">
          <StarburstButton href="/#projects" variant="primary" size="lg">
            View my work
          </StarburstButton>
        </HoverSparkle>
        <HoverSparkle className="inline-flex">
          <StarburstButton
            href="/resume"
            variant="secondary"
            size="lg"
            starSpin
          >
            Resume
          </StarburstButton>
        </HoverSparkle>
      </motion.div>
    </motion.div>
  )
}
