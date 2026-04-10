'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StarMark } from '@/components/ui/StarMark'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

export function AboutSection() {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)
  const hasPhoto = Boolean(siteConfig.photoSrc)

  return (
    <Section id="about">
      <div className={hasPhoto ? 'grid md:grid-cols-[60fr_40fr] gap-16 items-start' : ''}>

        {/* Left: statements */}
        <div>
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-h2 text-text-base mt-2">How I work</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 flex flex-col gap-6"
          >
            {siteConfig.aboutStatements.map((statement, i) => (
              <motion.p
                key={i}
                variants={up}
                className="font-sans text-base text-text-base leading-relaxed"
              >
                {statement}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Right: photo + status card — only rendered on desktop, only when photo exists */}
        {hasPhoto && (
          <motion.div
            variants={up}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:block"
          >
            {/* Photo frame */}
            <div className="relative">
              <div
                className="w-60 h-[300px] rounded-card overflow-hidden bg-surface-muted relative"
                style={{ filter: 'saturate(0.92) sepia(0.05)' }}
              >
                <Image
                  src={siteConfig.photoSrc!}
                  alt="Justin C."
                  fill
                  sizes="240px"
                  className="object-cover object-top"
                />
              </div>
              {/* Gold star accent — bottom-right of photo */}
              <div
                className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: '#C4974A',
                  boxShadow: '0 2px 8px rgba(196,151,74,0.35)',
                }}
              >
                <StarMark size="xs" color="#fff" />
              </div>
            </div>

            {/* Status card */}
            <div className="mt-6 bg-surface rounded-status shadow-card p-4 flex items-start gap-2 max-w-[240px]">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                {siteConfig.currentlyOpen}
              </p>
            </div>
          </motion.div>
        )}

        {/* Status card inline — shown when no photo */}
        {!hasPhoto && (
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="inline-flex items-start gap-2 bg-surface rounded-status shadow-card px-4 py-3">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-text-muted">
                {siteConfig.currentlyOpen}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
