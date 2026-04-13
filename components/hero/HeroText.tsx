'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

export function HeroText() {
  const stagger = useMotionSafe(staggerContainer(0.09))
  const hero    = useMotionSafe(fadeUpHero)
  const up      = useMotionSafe(fadeUp)
  const fast    = useMotionSafe(fadeInFast)

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* PFP + availability */}
      {siteConfig.photoSrc && (
        <motion.div variants={fast} className="mb-7 inline-flex items-center gap-3">
          <div className="relative shrink-0">
            <div
              className="w-[50px] h-[50px] rounded-full overflow-hidden relative"
              style={{ boxShadow: '0 0 0 2px rgba(15,122,122,0.4), 0 0 0 4px rgba(15,122,122,0.10)' }}
            >
              <Image
                src={siteConfig.photoSrc}
                alt="Justin C."
                fill
                sizes="50px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={{ background: '#C4974A', boxShadow: '0 0 8px rgba(196,151,74,0.5)' }}
            >
              <StarMark size="xs" color="#0A1628" />
            </div>
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-text-muted">
            Open to work
          </span>
        </motion.div>
      )}

      {/* Role tag */}
      <motion.div variants={fast}>
        <span
          className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] uppercase rounded-full px-4 py-1.5"
          style={{
            border: '1px solid rgba(15,122,122,0.30)',
            background: 'rgba(15,122,122,0.08)',
            color: '#4A9FAE',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#4A9FAE', boxShadow: '0 0 6px rgba(74,159,174,0.7)' }}
          />
          {siteConfig.roleTag}
        </span>
      </motion.div>

      {/* Name — hero scale */}
      <motion.h1
        variants={hero}
        className="font-display text-hero text-text-base mt-5 leading-none"
      >
        {siteConfig.name.split(' ')[0]}
        {' '}
        <span style={{ color: '#4A9FAE' }}>
          {siteConfig.name.split(' ').slice(1).join(' ')}
        </span>
      </motion.h1>

      {/* Statement */}
      <motion.p
        variants={up}
        className="font-sans text-text-muted leading-relaxed mt-6 max-w-[440px]"
        style={{ fontSize: 'clamp(16px, 1.8vw, 19px)' }}
      >
        {siteConfig.heroStatement}
      </motion.p>

      {/* Separator */}
      <motion.div
        variants={fast}
        className="mt-10 w-8 h-px"
        style={{ background: 'rgba(15,122,122,0.40)' }}
        aria-hidden
      />

      {/* CTAs */}
      <motion.div variants={fast} className="flex flex-wrap gap-3 mt-6">
        {/* Primary — angular teal */}
        <motion.a
          href="/#projects"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 font-sans font-medium text-white text-[15px]"
        >
          <span
            className="px-6 py-3 btn-angular flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0F7A7A, #4A9FAE)' }}
          >
            View my work
            <ArrowDown size={15} />
          </span>
        </motion.a>

        {/* Secondary — outlined */}
        <motion.a
          href={siteConfig.resumeUrl}
          download
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 font-sans font-medium text-text-muted text-[15px] px-5 py-3 rounded-btn transition-colors duration-200 hover:text-text-base"
          style={{ border: '1px solid rgba(15,122,122,0.25)' }}
        >
          Resume ↓
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
