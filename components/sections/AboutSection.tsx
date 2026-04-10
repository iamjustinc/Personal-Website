'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
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
            <div
              className="w-60 h-[300px] rounded-card overflow-hidden bg-surface-muted"
              style={{ filter: 'saturate(0.92) sepia(0.08)' }}
            >
              {/* Replace this div with next/image when photoSrc is ready */}
              {/* <Image src={siteConfig.photoSrc!} alt="Justin" fill className="object-cover" /> */}
            </div>

            {/* Status card */}
            <div className="mt-4 bg-surface rounded-status shadow-card p-4 flex items-start gap-2 max-w-[240px]">
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
