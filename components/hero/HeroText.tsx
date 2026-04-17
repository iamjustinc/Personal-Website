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
      animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], rotate: 45 }}
      transition={{ delay, duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {/* Soft glow behind the star */}
      <span
        style={{
          position: 'absolute',
          inset: -size * 1.8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,213,141,0.55) 0%, transparent 70%)',
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

// ── Hover-only sparkle accent ────────────────────────────────────────────────
// Small star accents that activate while hovering the hero name.

function NameHoverSpark({
  x,
  y,
  size = 8,
  color = '#F4D58D',
  delay = 0,
}: {
  x: string
  y: string
  size?: number
  color?: string
  delay?: number
}) {
  return (
    <motion.span
      aria-hidden
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex: 16 }}
      initial="rest"
      variants={{
        rest: { opacity: 0, scale: 0.72, y: 0, rotate: 0 },
        hover: {
          opacity: [0, 0.95, 0.52],
          scale: [0.72, 1.16, 1],
          y: [0, -3, 0],
          rotate: [0, 28, 0],
          transition: {
            delay,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: -size * 1.8,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
        }}
      />
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'relative' }}>
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill={color}
          opacity="0.94"
        />
      </svg>
    </motion.span>
  )
}

// ── Name reveal variant ─────────────────────────────────────────────────────
// Pure opacity + tiny y-lift. NO clip-path. Text is never cropped.
// Runs concurrently with the star so the name appears to be revealed by it.

const nameRevealVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.22, 0, 0.36, 1] },
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
      {/* ── Name ────────────────────────────────────────────────────────── */}
      {/*
          The wrapper div is the positioning context.
          It has NO overflow:hidden so nothing is ever cropped.

          motion.h1: starts opacity 0, fades in during the star's pass.
          No clip-path. No masking. Text is always fully intact.

          The shooting star and sparkles are layered above the h1 via z-index,
          outside its DOM subtree so they cannot be affected by its styles.
      */}
      <motion.div
        className="relative inline-block self-start"
        style={{ overflow: 'visible' }}
        whileHover={reduceMotion ? 'rest' : 'hover'}
      >

        <motion.h1
          variants={nameVariant}
          whileHover={
            reduceMotion
              ? {}
              : {
                  y: -1,
                  textShadow:
                    '0 0 22px rgba(74,159,174,0.18), 0 0 40px rgba(196,151,74,0.08)',
                }
          }
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-display text-hero text-text-base leading-none"
        >
          {firstName}{lastName ? (
            <>
              {' '}
              <motion.span
                style={{ color: '#4A9FAE' }}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        color: '#7EE7F2',
                        textShadow: '0 0 26px rgba(126,231,242,0.24)',
                      }
                }
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {lastName}
              </motion.span>
            </>
          ) : null}
        </motion.h1>

        {!reduceMotion && (
          <>
            {/* Hover shimmer clipped to a duplicate of the name text. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-20 pointer-events-none font-display text-hero leading-none"
              initial="rest"
              style={{
                color: 'transparent',
                backgroundImage:
                  'linear-gradient(105deg, transparent 0%, transparent 34%, rgba(126,231,242,0.12) 42%, rgba(235,251,255,0.72) 48%, rgba(196,151,74,0.52) 53%, rgba(126,231,242,0.10) 60%, transparent 70%, transparent 100%)',
                backgroundSize: '260% 100%',
                backgroundPosition: '135% 0%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(126,231,242,0.12))',
                whiteSpace: 'nowrap',
              }}
              variants={{
                rest: {
                  opacity: 0,
                  backgroundPosition: '135% 0%',
                },
                hover: {
                  opacity: [0, 1, 0.74],
                  backgroundPosition: ['135% 0%', '-45% 0%'],
                  transition: {
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {firstName}{lastName ? (
                <>
                  {' '}
                  <span>{lastName}</span>
                </>
              ) : null}
            </motion.div>

            {/* A narrow gold glint that crosses the accent word area. */}
            {lastName && (
              <motion.span
                aria-hidden
                className="absolute pointer-events-none"
                initial="rest"
                style={{
                  left: '48%',
                  top: '9%',
                  zIndex: 21,
                  width: '42%',
                  height: 2,
                  borderRadius: 9999,
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(196,151,74,0.76) 48%, transparent 100%)',
                  boxShadow: '0 0 16px rgba(196,151,74,0.24)',
                  transformOrigin: 'left center',
                }}
                variants={{
                  rest: { opacity: 0, scaleX: 0.12, x: '-14%', rotate: -4 },
                  hover: {
                    opacity: [0, 0.92, 0],
                    scaleX: [0.12, 1, 0.2],
                    x: ['-14%', '42%'],
                    rotate: -4,
                    transition: {
                      duration: 0.82,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    },
                  },
                }}
              />
            )}

            <NameHoverSpark x="8%" y="-12px" size={9} color="#F4D58D" delay={0.04} />
            <NameHoverSpark x="48%" y="calc(100% + 5px)" size={7} color="#7EE7F2" delay={0.16} />
            <NameHoverSpark x="79%" y="-10px" size={10} color="#F4D58D" delay={0.26} />
          </>
        )}

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
                duration: 0.90,
                ease: [0.4, 0, 0.55, 1],
                opacity: { times: [0, 0.05, 0.50, 0.90, 1], ease: 'linear' },
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
                    width: 160,
                    height: 3,
                    borderRadius: 9999,
                    background:
                      'linear-gradient(to right,' +
                      '  transparent 0%,' +
                      '  rgba(74,159,174,0.25) 20%,' +
                      '  rgba(100,200,220,0.65) 55%,' +
                      '  rgba(220,248,255,0.95) 100%)',
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
                    width: 22,
                    height: 22,
                    marginLeft: -4,
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
                      width: 60,
                      height: 60,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,' +
                        '  rgba(220,248,255,0.80) 0%,' +
                        '  rgba(100,200,220,0.38) 40%,' +
                        '  transparent 70%)',
                    }}
                  />
                  {/* Tight inner glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 28,
                      height: 28,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle,' +
                        '  rgba(255,255,255,0.95) 0%,' +
                        '  rgba(200,240,255,0.65) 55%,' +
                        '  transparent 100%)',
                    }}
                  />
                  {/* 4-pointed star */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <path
                      d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                      fill="white"
                      opacity="1"
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
            <SparkAccent delay={0.18} x="7%"  top="-16px" size={12} />
            <SparkAccent delay={0.30} x="29%" top="calc(100% + 10px)" size={10} />
            <SparkAccent delay={0.42} x="55%" top="-14px" size={13} />
            <SparkAccent delay={0.54} x="79%" top="calc(100% + 8px)" size={10} />
          </>
        )}

      </motion.div>

      {/* ── Statement ───────────────────────────────────────────────────── */}
      <motion.p
        variants={up}
        className="font-sans leading-relaxed mt-6 max-w-[520px]"
        style={{ fontSize: 'clamp(16px, 1.7vw, 19px)', color: '#A8C5D1' }}
      >
        I translate messy business needs into technical demos, guided workflows, and clear decisions.
      </motion.p>

      {/* ── Role pill ────────────────────────────────────────────────────── */}
      <motion.div variants={fast} className="mt-6">
        <span
          className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase rounded-full px-6 py-2"
          style={{
            border: '1px solid rgba(15,122,122,0.32)',
            background: 'rgba(15,122,122,0.09)',
            color: '#4A9FAE',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          Solutions Engineering + Technical Translation
        </span>
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
            See solution work
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
