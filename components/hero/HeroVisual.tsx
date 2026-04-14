'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { EASING } from '@/lib/motion'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'

/**
 * Hero right column — personal portrait composition.
 *
 * The portrait is the main focal element: round, glowing, slowly floating.
 * A halo ring with a slow spin surrounds it. Small star marks are positioned
 * at deliberate angles around the circle. Project preview badges float below.
 *
 * Design language: dark luxury, cinematic, personal — not generic.
 */
export function HeroVisual() {
  const shouldReduce = useReducedMotion()
  const panels = siteConfig.heroFloatingPanels ?? []

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.45, ease: EASING }}
      className="relative flex flex-col items-center"
    >
      {/* ── Portrait composition ────────────────────────────────────────── */}
      <div className="relative flex items-center justify-center" style={{ width: 380, height: 420 }}>
        {/* Atmospheric teal aura — radial glow behind the whole composition */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 440,
            height: 440,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(15,122,122,0.20) 0%, rgba(15,122,122,0.06) 40%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Watermark star — behind portrait, very slow */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <WatermarkStar size={340} color="#0F7A7A" direction={1} duration={90} opacity={0.07} />
        </div>

        {/* Outer halo ring — slow spin, dashed-looking via SVG stroke-dasharray */}
        <div
          aria-hidden
          className="absolute pointer-events-none halo-spin"
          style={{
            width: 340,
            height: 340,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
            <circle
              cx="170"
              cy="170"
              r="166"
              stroke="rgba(15,122,122,0.20)"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
          </svg>
        </div>

        {/* Inner ring — solid, gold tint */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 304,
            height: 304,
            borderRadius: '50%',
            border: '1px solid rgba(196,151,74,0.16)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* ── Portrait circle ─────────────────────────────────────────── */}
        {siteConfig.portraitSrc && (
          <div
            className="portrait-float relative"
            style={{ width: 272, height: 272, zIndex: 10 }}
          >
            <div
              className="portrait-glow"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src={siteConfig.portraitSrc}
                alt="Justin Chang"
                fill
                sizes="272px"
                className="object-cover object-top"
                priority
              />
              {/* Subtle cinematic overlay on the portrait */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(160deg, rgba(15,122,122,0.08) 0%, transparent 60%, rgba(10,22,40,0.15) 100%)',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        )}

        {/* ── Orbiting satellite dot ───────────────────────────────────── */}
        {/* Replaces the old static bottom-right gold badge */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 328,
            height: 328,
            top: '50%',
            left: '50%',
            marginLeft: -164,
            marginTop: -164,
            zIndex: 20,
          }}
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 26,
              height: 26,
              marginLeft: -13,
              marginTop: -13,
              transform: 'rotate(130deg) translateY(-164px)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.08, 1] }}
              transition={
                shouldReduce
                  ? {}
                  : {
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: '#C4974A',
                boxShadow: '0 0 14px rgba(196,151,74,0.55), 0 0 28px rgba(196,151,74,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarMark size="xs" color="#0A1628" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Orbital star marks ──────────────────────────────────────── */}
        {/* Positioned around the portrait at deliberate cardinal points  */}

        {/* Top-right */}
        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 28, right: 24, zIndex: 20 }}
        >
          <StarMark size="sm" color="#4A9FAE" className="opacity-70" />
        </motion.div>

        {/* Left */}
        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', left: 10, top: '48%', zIndex: 20 }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-55" />
        </motion.div>

        {/* Bottom-left */}
        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ position: 'absolute', bottom: 34, left: 30, zIndex: 20 }}
        >
          <StarMark size="xs" color="#4A9FAE" className="opacity-40" />
        </motion.div>

        {/* Top-left subtle */}
        <div
          aria-hidden
          style={{ position: 'absolute', top: 36, left: 36, zIndex: 20 }}
        >
          <StarMark size="xs" color="#4A9FAE" className="opacity-25" />
        </div>
      </div>

      {/* ── Project preview badges ──────────────────────────────────────── */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASING }}
        className="flex items-center gap-2 mt-1"
      >
        {panels.slice(0, 3).map((panel) => (
          <div
            key={panel.slug}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: 'rgba(13,30,53,0.75)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${panel.accentColor}30`,
            }}
          >
            <div
              className="w-[6px] h-[6px] rounded-full shrink-0"
              style={{ background: panel.accentColor, boxShadow: `0 0 5px ${panel.accentColor}80` }}
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {panel.projectName}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Availability chip — below badges */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASING }}
        className="mt-3 flex items-center gap-1.5"
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#4A9FAE', boxShadow: '0 0 6px rgba(74,159,174,0.8)' }}
        />
        <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
          Open to opportunities
        </span>
      </motion.div>
    </motion.div>
  )
}