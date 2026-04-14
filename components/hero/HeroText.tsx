'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

// ── Sparkle accent ──────────────────────────────────────────────────────────
// Tiny gold 4-pointed star that blooms and fades at a fixed position.
// Rendered OUTSIDE the h1 so it is never clipped by the clip-path reveal.

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
      animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0], rotate: 45 }}
      transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg width="6" height="6" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
          fill="#F4D58D"
          opacity="0.88"
        />
      </svg>
    </motion.span>
  )
}

// ── Name reveal variant ─────────────────────────────────────────────────────
// clip-path inset expands left→right, matching the star's travel speed.
// Opacity stays 1 throughout — the hard clip edge IS the reveal.
// Duration and ease are intentionally identical to the star's translate
// so both are perfectly synchronized.

const NAME_DURATION = 0.56
const NAME_EASE     = [0.4, 0, 0.55, 1] as const

const nameRevealVariant: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: NAME_DURATION, ease: NAME_EASE },
  },
}

// ── HeroText ────────────────────────────────────────────────────────────────

export function HeroText() {
  const stagger      = useMotionSafe(staggerContainer(0.10))
  const hero         = useMotionSafe(fadeUpHero)   // fallback for reduced-motion
  const up           = useMotionSafe(fadeUp)
  const fast         = useMotionSafe(fadeInFast)
  const reduceMotion = useReducedMotion()

  const nameParts = siteConfig.name.split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ')

  // Reduced motion: fall back to standard fade-up, no clip-path, no star
  const nameVariant = reduceMotion ? hero : nameRevealVariant

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

      {/* ── Name ────────────────────────────────────────────────────────── */}
      {/*
          The regular <div> is the positioning context for the star and
          sparkles. Variant propagation passes through non-motion elements
          so the motion.h1 inside still receives the stagger's "visible" cue.

          The clip-path on motion.h1 hides the text initially (both firstName
          and lastName), then reveals left→right as the variant animates.

          The star and sparkles live OUTSIDE the h1, so they are never
          clipped. Their delays are tuned to match when the star's position
          aligns with each sparkle's x coordinate.
      */}
      <div className="relative">

        <motion.h1
          variants={nameVariant}
          className="font-display text-hero text-text-base leading-none"
        >
          {firstName}{lastName ? (
            <>
              {' '}
              <span style={{ color: '#4A9FAE' }}>{lastName}</span>
            </>
          ) : null}
        </motion.h1>

        {!reduceMotion && (
          <>
            {/* ── Shooting star ────────────────────────────────────────────
                Travels from x=-6% to x=104%, y shifts -4→+6 (diagonal).
                Duration and ease match the clip-path exactly so the star tip
                stays right at the reveal edge as the text emerges beneath it.

                Opacity keyframe: snap in fast, hold, then fade at exit.
            ──────────────────────────────────────────────────────────────── */}
            <motion.div
              aria-hidden
              className="absolute pointer-events-none"
              style={{ top: '46%', left: 0 }}
              initial={{ x: '-6%', y: -4, opacity: 0 }}
              animate={{ x: '104%', y: 6, opacity: [0, 1, 1, 1, 0] }}
              transition={{
                delay: 0.10,             // matches stagger delay for 2nd child
                duration: NAME_DURATION,
                ease: NAME_EASE,
                opacity: { times: [0, 0.07, 0.55, 0.88, 1], ease: 'linear' },
              }}
            >
              {/* Trail + star tip, rotated slightly for the diagonal feel */}
              <div style={{ display: 'flex', alignItems: 'center', transform: 'rotate(-2deg)' }}>

                {/* Gradient trail — transparent tail → bright tip */}
                <div
                  style={{
                    width: 68,
                    height: 1.5,
                    borderRadius: 9999,
                    background:
                      'linear-gradient(to right, transparent 0%, rgba(74,159,174,0.22) 35%, rgba(200,240,255,0.65) 100%)',
                  }}
                />

                {/* Bright star head */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: -2 }}>
                  {/* Soft glow halo */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-8px',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(210,245,255,0.48) 0%, rgba(74,159,174,0.15) 55%, transparent 70%)',
                    }}
                  />
                  {/* 4-pointed star — clearly reads as a star, not a blur */}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ position: 'relative' }}
                  >
                    <path
                      d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
                      fill="white"
                      opacity="0.96"
                    />
                  </svg>
                </div>

              </div>
            </motion.div>

            {/* ── Sparkle accents ─────────────────────────────────────────
                Bloom along the star's diagonal path at alternating top/bottom.
                Delays offset by ~70ms each, matching roughly where the star
                tip will be at each x position given the 0.56s travel time.
            ────────────────────────────────────────────────────────────── */}
            <SparkAccent delay={0.17} x="8%"  top="-11px" />
            <SparkAccent delay={0.24} x="28%" top="calc(100% + 5px)" />
            <SparkAccent delay={0.31} x="55%" top="-9px" />
            <SparkAccent delay={0.38} x="80%" top="calc(100% + 3px)" />
          </>
        )}

      </div>

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
          <StarburstButton href="/resume" variant="secondary" size="lg" starSpin>
            Resume
          </StarburstButton>
        </HoverSparkle>
      </motion.div>

    </motion.div>
  )
}
