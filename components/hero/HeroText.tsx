'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

// ── Sparkle accent ──────────────────────────────────────────────────────────
// Gold 4-pointed star that blooms and fades at a fixed position.
// Positioned outside the h1 so it is never masked or clipped.

function SparkAccent({
  delay,
  x,
  top,
  size = 9,
}: {
  delay: number
  x: string
  top: string
  size?: number
}) {
  return (
    <motion.span
      className="absolute pointer-events-none"
      style={{ left: x, top, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 45 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {/* Soft glow behind the star */}
      <span
        style={{
          position: 'absolute',
          inset: -size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,213,141,0.35) 0%, transparent 70%)',
        }}
      />
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'relative' }}>
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="#F4D58D"
          opacity="0.92"
        />
      </svg>
    </motion.span>
  )
}

// ── Name reveal variant ─────────────────────────────────────────────────────
// Pure opacity + tiny y-lift. NO clip-path. Text is never cropped.
// Runs concurrently with the star so the name appears to be revealed by it.

const nameRevealVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── HeroText ────────────────────────────────────────────────────────────────

export function HeroText() {
  const stagger      = useMotionSafe(staggerContainer(0.10))
  const hero         = useMotionSafe(fadeUpHero)   // reduced-motion fallback
  const up           = useMotionSafe(fadeUp)
  const fast         = useMotionSafe(fadeInFast)
  const reduceMotion = useReducedMotion()

  const nameParts = siteConfig.name.split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ')

  // When reduced motion is on: standard fade-up, no star
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
          The wrapper div is the positioning context.
          It has NO overflow:hidden so nothing is ever cropped.

          motion.h1: starts opacity 0, fades in during the star's pass.
          No clip-path. No masking. Text is always fully intact.

          The shooting star and sparkles are layered above the h1 via z-index,
          outside its DOM subtree so they cannot be affected by its styles.
      */}
      <div className="relative" style={{ overflow: 'visible' }}>

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
            {/* ── Shooting star ───────────────────────────────────────────
                Travels left→right across the name width at a slight diagonal.
                Delay 0.10s matches the stagger cue for the 2nd child so the
                star appears at the same moment the text begins fading in.

                The visual: a long teal→white gradient trail feeding into a
                bright 4-pointed star head with a strong radial glow halo.
                The star head is the clearly identifiable element.
            ──────────────────────────────────────────────────────────── */}
            <motion.div
              aria-hidden
              className="absolute pointer-events-none"
              style={{ top: '50%', left: 0, zIndex: 10 }}
              initial={{ x: '-6%', opacity: 0 }}
              animate={{
                x: '108%',
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                delay: 0.10,
                duration: 0.58,
                ease: [0.4, 0, 0.55, 1],
                opacity: { times: [0, 0.06, 0.50, 0.88, 1], ease: 'linear' },
              }}
            >
              {/*
                  Inner div: translateY(-50%) centers on the text midline.
                  rotate(-5deg) gives the diagonal "shooting" angle visually.
              */}
              <div
                style={{
                  transform: 'translateY(-50%) rotate(-5deg)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* ── Trail ──────────────────────────────────────────────
                    Gradient: transparent → dim teal → bright aqua → white.
                    Long enough to read clearly as a trail on dark background.
                ────────────────────────────────────────────────────────── */}
                <div
                  style={{
                    width: 110,
                    height: 2,
                    borderRadius: 9999,
                    background:
                      'linear-gradient(to right,' +
                      '  transparent 0%,' +
                      '  rgba(74,159,174,0.15) 20%,' +
                      '  rgba(100,200,220,0.45) 55%,' +
                      '  rgba(220,248,255,0.82) 100%)',
                  }}
                />

                {/* ── Star head ──────────────────────────────────────────
                    A wide radial glow + a sharp 4-pointed star SVG.
                    The glow makes it visible from a distance; the star
                    shape makes it clearly read as a "star" and not just
                    a blurry dot.
                ────────────────────────────────────────────────────────── */}
                <div
                  style={{
                    position: 'relative',
                    width: 16,
                    height: 16,
                    marginLeft: -3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* Wide soft glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 40,
                      height: 40,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,' +
                        '  rgba(220,248,255,0.65) 0%,' +
                        '  rgba(100,200,220,0.28) 40%,' +
                        '  transparent 70%)',
                    }}
                  />
                  {/* Tight inner glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 20,
                      height: 20,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,' +
                        '  rgba(255,255,255,0.90) 0%,' +
                        '  rgba(200,240,255,0.55) 55%,' +
                        '  transparent 100%)',
                    }}
                  />
                  {/* 4-pointed star */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <path
                      d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                      fill="white"
                      opacity="0.97"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* ── Sparkle accents ─────────────────────────────────────────
                Four gold stars scattered around the star's path.
                Alternating top/bottom so they feel organic, not aligned.
                Delays follow the star's x position across the 0.58s travel.
            ────────────────────────────────────────────────────────────── */}
            <SparkAccent delay={0.16} x="7%"  top="-13px" size={8} />
            <SparkAccent delay={0.23} x="29%" top="calc(100% + 7px)" size={7} />
            <SparkAccent delay={0.31} x="55%" top="-11px" size={9} />
            <SparkAccent delay={0.38} x="79%" top="calc(100% + 5px)" size={7} />
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
