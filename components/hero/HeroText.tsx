'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

export function HeroText() {
  const stagger = useMotionSafe(staggerContainer(0.10))
  const hero    = useMotionSafe(fadeUpHero)
  const up      = useMotionSafe(fadeUp)
  const fast    = useMotionSafe(fadeInFast)

  // Split name into first + rest for teal accent on last name
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

      {/* ── Name ─────────────────────────────────────────────────────────── */}
      <motion.h1
        variants={hero}
        className="font-display text-hero text-text-base leading-none"
      >
        {firstName}{lastName ? (
          <>
            {' '}
            <span style={{ color: '#4A9FAE' }}>{lastName}</span>
          </>
        ) : null}
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
            className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider rounded-full px-3 py-1"
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

        {/* ── Primary — angular, teal, star + arrow ─────────────────────── */}
        <motion.a
          href="/#projects"
          whileHover="hov"
          whileTap={{ scale: 0.95 }}
          className="inline-flex select-none"
        >
          <motion.span
            variants={{
              hov: {
                scale: 1.05,
                y: -4,
                boxShadow: '0 16px 48px rgba(15,122,122,0.55), 0 0 0 1px rgba(74,159,174,0.40)',
              }
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="btn-angular inline-flex items-center gap-2.5 px-8 py-3.5 font-sans font-semibold text-[15px] text-white"
            style={{
              background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)',
              boxShadow: '0 4px 20px rgba(15,122,122,0.32)',
            }}
          >
            {/* Star spins 72° on hover */}
            <motion.span
              variants={{ hov: { rotate: 72, scale: 1.20 } }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <StarMark size="xs" color="rgba(255,255,255,0.88)" />
            </motion.span>

            View my work

            {/* Arrow drops on hover */}
            <motion.span
              variants={{ hov: { y: 3 } }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="inline-flex"
            >
              <ArrowDown size={14} />
            </motion.span>
          </motion.span>
        </motion.a>

        {/* ── Secondary — angular outline, gold star ─────────────────────── */}
        <motion.a
          href={siteConfig.resumeUrl}
          download
          whileHover="hov"
          whileTap={{ scale: 0.95 }}
          className="inline-flex select-none"
        >
          <motion.span
            variants={{
              hov: {
                scale: 1.04,
                y: -3,
                boxShadow: '0 12px 36px rgba(15,122,122,0.28), inset 0 0 0 1px rgba(15,122,122,0.55)',
              }
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="btn-angular inline-flex items-center gap-2.5 px-8 py-3.5 font-sans font-medium text-[15px]"
            style={{
              background: 'rgba(15,122,122,0.07)',
              boxShadow: 'inset 0 0 0 1px rgba(15,122,122,0.30)',
              color: '#A8C5D1',
            }}
          >
            {/* Gold star counter-spins on hover */}
            <motion.span
              variants={{ hov: { rotate: -72, scale: 1.15 } }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <StarMark size="xs" color="#C4974A" className="opacity-75" />
            </motion.span>

            Resume

            {/* Down indicator */}
            <motion.span
              variants={{ hov: { y: 3, opacity: 1 } }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="inline-flex opacity-50"
            >
              ↓
            </motion.span>
          </motion.span>
        </motion.a>

      </motion.div>
    </motion.div>
  )
}
