'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/site'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

export function HeroText() {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* Role tag */}
      <motion.div variants={inn}>
        <span
          className="inline-flex items-center font-mono text-xs text-accent rounded-tag px-3 py-1"
          style={{
            border: '1.5px solid rgba(240, 90, 40, 0.35)',
            background: 'rgba(240, 90, 40, 0.06)',
          }}
        >
          {siteConfig.roleTag}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={up}
        className="font-display text-hero text-text-base mt-3"
      >
        {siteConfig.name}
      </motion.h1>

      {/* Statement */}
      <motion.p
        variants={up}
        className="font-sans text-text-muted leading-relaxed mt-4 max-w-[460px]"
        style={{ fontSize: 'clamp(17px, 2vw, 22px)' }}
      >
        {siteConfig.heroStatement}
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={inn}
        className="flex flex-col sm:flex-row gap-3 mt-10"
      >
        <Button
          variant="primary"
          size="lg"
          href="/#projects"
          icon={<ArrowDown size={16} />}
        >
          View my work
        </Button>
        <Button
          variant="ghost"
          size="lg"
          href={siteConfig.resumeUrl}
          download
          icon={<Download size={16} />}
        >
          Download resume
        </Button>
      </motion.div>
    </motion.div>
  )
}
