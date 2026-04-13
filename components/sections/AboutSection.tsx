'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

export function AboutSection() {
  const stagger  = useMotionSafe(staggerContainer(0.1))
  const up       = useMotionSafe(fadeUp)
  const inn      = useMotionSafe(fadeIn)
  const hasPhoto = Boolean(siteConfig.photoSrc)

  return (
    <Section id="about">
      <div className={hasPhoto ? 'grid md:grid-cols-[58fr_42fr] gap-16 items-start' : ''}>

        {/* Left: statements */}
        <div>
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Section label */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5"
              style={{
                background: 'rgba(15,122,122,0.08)',
                border: '1px solid rgba(15,122,122,0.22)',
              }}
            >
              <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                About
              </span>
            </div>
            <h2 className="font-display text-h2 text-text-base">How I work</h2>
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
                className="font-sans text-base leading-relaxed"
                style={{ color: '#A8C5D1' }}
              >
                {statement}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Right: photo + status */}
        {hasPhoto && (
          <motion.div
            variants={up}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="relative">
              <div
                className="w-60 h-[300px] rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid rgba(15,122,122,0.20)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
                }}
              >
                <Image
                  src={siteConfig.photoSrc!}
                  alt="Justin C."
                  fill
                  sizes="240px"
                  className="object-cover object-top"
                  style={{ filter: 'saturate(0.88) sepia(0.06)' }}
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, rgba(15,122,122,0.08) 0%, rgba(10,22,40,0.25) 100%)' }}
                />
              </div>

              {/* Gold star badge */}
              <div
                className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: '#C4974A',
                  boxShadow: '0 2px 12px rgba(196,151,74,0.45)',
                }}
              >
                <StarMark size="xs" color="#0A1628" />
              </div>
            </div>

            {/* Status card */}
            <div
              className="mt-8 p-4 rounded-xl flex items-start gap-2.5 max-w-[240px]"
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.16)',
              }}
            >
              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#4A9FAE' }} />
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#A8C5D1' }}>
                {siteConfig.currentlyOpen}
              </p>
            </div>
          </motion.div>
        )}

        {/* Status inline — when no photo */}
        {!hasPhoto && (
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <div
              className="inline-flex items-start gap-2.5 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.16)',
              }}
            >
              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#4A9FAE' }} />
              <p className="font-sans text-sm" style={{ color: '#A8C5D1' }}>
                {siteConfig.currentlyOpen}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
