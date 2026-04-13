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
          className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] uppercase rounded-full px-4 py-1.5"
          style={{
            border: '1px solid rgba(15,122,122,0.30)',
            background: 'rgba(15,122,122,0.08)',
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

        {/* Primary — angular teal gradient */}
        <motion.a
          href="/#projects"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex font-sans font-medium text-white text-[15px] select-none"
        >
          <span
            className="px-7 py-3 btn-angular flex items-center gap-2 transition-shadow duration-300"
            style={{
              background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)',
              boxShadow: '0 4px 20px rgba(15,122,122,0.25)',
            }}
          >
            View my work
            <ArrowDown size={15} />
          </span>
        </motion.a>

        {/* Secondary — ghost outlined */}
        <motion.a
          href={siteConfig.resumeUrl}
          download
          whileHover={{ scale: 1.03, y: -1, borderColor: 'rgba(15,122,122,0.55)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 font-sans font-medium text-[15px] px-6 py-3 rounded-btn transition-all duration-200 select-none"
          style={{
            border: '1px solid rgba(15,122,122,0.25)',
            color: '#A8C5D1',
          }}
        >
          Resume ↓
        </motion.a>

      </motion.div>
    </motion.div>
  )
}
