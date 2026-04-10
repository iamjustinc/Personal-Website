'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/site'
import { fadeUpHero, fadeInFast, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

export function HeroText() {
  // Slightly faster stagger — each element doesn't wait as long for the previous
  const stagger = useMotionSafe(staggerContainer(0.09))
  const hero    = useMotionSafe(fadeUpHero)   // name — big lift
  const up      = useMotionSafe(fadeUp)        // statement
  const fast    = useMotionSafe(fadeInFast)    // tag + CTAs — no y-shift needed

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* Role tag — fades in, no lift */}
      <motion.div variants={fast}>
        <span
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-accent rounded-tag px-3.5 py-1.5"
          style={{
            border: '1.5px solid rgba(240, 90, 40, 0.3)',
            background: 'rgba(240, 90, 40, 0.05)',
          }}
        >
          {/* Pulse dot — signals "live" / "looking" */}
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
            style={{ boxShadow: '0 0 0 3px rgba(240,90,40,0.15)' }}
          />
          {siteConfig.roleTag}
        </span>
      </motion.div>

      {/* Name — hero variant: more dramatic lift, longer duration */}
      <motion.h1
        variants={hero}
        className="font-display text-hero text-text-base mt-4 leading-none"
      >
        {siteConfig.name}
      </motion.h1>

      {/* Statement */}
      <motion.p
        variants={up}
        className="font-sans text-text-muted leading-[1.55] mt-6 max-w-[440px]"
        style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
      >
        {siteConfig.heroStatement}
      </motion.p>

      {/* Thin separator — creates breathing room, anchors CTAs */}
      <motion.div
        variants={fast}
        className="mt-10 w-10 h-px bg-border"
        aria-hidden
      />

      {/* CTAs */}
      <motion.div
        variants={fast}
        className="flex flex-wrap gap-3 mt-6"
      >
        <Button
          variant="primary"
          size="lg"
          href="/#projects"
          icon={<ArrowDown size={15} />}
        >
          View my work
        </Button>
        {/*
          Secondary (outlined) not ghost — ghost is near-invisible on a warm light bg.
          The border box makes it clearly a button without competing with the primary.
        */}
        <Button
          variant="secondary"
          size="lg"
          href={siteConfig.resumeUrl}
          download
          icon={<Download size={15} />}
          iconPosition="left"
        >
          Resume
        </Button>
      </motion.div>
    </motion.div>
  )
}
