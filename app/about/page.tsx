'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { siteConfig } from '@/data/site'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

const philosophyStatements = [
  {
    text: siteConfig.aboutStatements[2],
    starColor: '#0F7A7A',
  },
  {
    text: siteConfig.aboutStatements[3],
    starColor: '#C4974A',
  },
  {
    text: 'I believe the best products are the ones that feel inevitable once you\'re using them.',
    starColor: '#4A9FAE',
  },
]

const expertiseExpansions: Record<string, string> = {
  'AI workflow design and integration':
    'Designing systems where AI handles structure so humans can focus on judgment — from prompt architecture to end-user experience.',
  'Solutions Engineering and pre-sales':
    'Translating technical capability into compelling, tailored demos that close the gap between what a product does and what a buyer needs to see.',
  'Full-stack product development':
    'Shipping complete products end-to-end — from schema design and API layer through to polished UI — without handing off between silos.',
  'Technical to non-technical communication':
    'Making complex systems legible to decision-makers, turning architectural choices into business rationale that actually lands.',
}

export default function AboutPage() {
  return (
    <main className="pt-28 min-h-screen">

      {/* ── Section A: Editorial intro ───────────────────────────────────── */}
      <Section paddingY="lg">
        {/* Background watermark */}
        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar size={520} opacity={0.04} direction={1} />
        </div>

        {/* Page label */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              About
            </span>
          </div>
        </motion.div>

        {/* Editorial two-column */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: portrait with gold star badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Float wrapper */}
              <div className="portrait-float">
                {/* Halo ring */}
                <div
                  className="absolute -inset-3 rounded-full halo-spin pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, rgba(15,122,122,0.18) 25%, transparent 50%, rgba(196,151,74,0.10) 75%, transparent 100%)',
                    borderRadius: '50%',
                  }}
                  aria-hidden
                />

                {/* Portrait */}
                <div
                  className="relative portrait-glow"
                  style={{ borderRadius: '50%', overflow: 'hidden', width: 300, height: 320 }}
                >
                  {siteConfig.portraitSrc ? (
                    <Image
                      src={siteConfig.portraitSrc}
                      alt={`${siteConfig.name} portrait`}
                      fill
                      sizes="300px"
                      className="object-cover object-top"
                      priority
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #0F2A3D, #0D1E30)' }}
                    >
                      <StarMark size="xl" color="#0F7A7A" className="opacity-30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Gold star overlay badge — top-right corner */}
              <motion.div
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-2 -right-2 z-10"
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    background: 'rgba(10,22,40,0.92)',
                    border: '1px solid rgba(196,151,74,0.40)',
                    boxShadow: '0 0 16px rgba(196,151,74,0.20)',
                  }}
                >
                  <StarMark size="sm" color="#C4974A" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: bio text */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            {/* Name + role */}
            <motion.div variants={fadeUp} className="mb-6">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4"
                style={{
                  background: 'rgba(15,122,122,0.08)',
                  border: '1px solid rgba(15,122,122,0.22)',
                }}
              >
                <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#4A9FAE' }}>
                  {siteConfig.roleTag}
                </span>
              </div>

              <h1 className="font-display text-hero text-text-base leading-none">
                {siteConfig.name.split(' ')[0]}{' '}
                <span style={{ color: '#4A9FAE' }}>{siteConfig.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </motion.div>

            {/* Personal statement paragraphs */}
            <motion.p
              variants={fadeUp}
              className="font-sans leading-relaxed"
              style={{ fontSize: '17px', color: '#A8C5D1' }}
            >
              {siteConfig.aboutStatements[0]}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans leading-relaxed mt-5"
              style={{ fontSize: '17px', color: '#A8C5D1' }}
            >
              {siteConfig.aboutStatements[1]}
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* ── Section B: Philosophy cards ──────────────────────────────────── */}
      <Section paddingY="sm">
        <motion.div
          variants={staggerContainer(0.10)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {philosophyStatements.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-2xl flex flex-col gap-5"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              <StarMark size="md" color={item.starColor} className="opacity-80" />
              <p
                className="font-display leading-snug"
                style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', color: '#E8F4F8' }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Section C: Expertise grid ─────────────────────────────────────── */}
      <Section paddingY="sm">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Expertise
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          {(siteConfig.aboutHighlights ?? []).map((highlight, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              <div className="flex items-start gap-3">
                <StarMark
                  size="xs"
                  color={i % 2 === 0 ? '#0F7A7A' : '#C4974A'}
                  className="opacity-75 mt-0.5 shrink-0"
                />
                <div>
                  <p className="font-sans font-semibold text-sm text-text-base mb-2">
                    {highlight}
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#7AABB8' }}>
                    {expertiseExpansions[highlight] ?? ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Section D: Currently ──────────────────────────────────────────── */}
      <Section paddingY="sm">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Currently
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.10)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-6 items-start"
        >
          {/* Current role card */}
          {siteConfig.career?.[0] && (
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(196,151,74,0.20)',
                boxShadow: '0 0 32px rgba(196,151,74,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <StarMark size="xs" color="#C4974A" className="opacity-80" />
                <span
                  className="font-mono text-[9px] uppercase tracking-wider rounded-full px-2.5 py-0.5"
                  style={{
                    background: 'rgba(196,151,74,0.10)',
                    border: '1px solid rgba(196,151,74,0.25)',
                    color: '#C4974A',
                  }}
                >
                  Now
                </span>
              </div>

              <h3 className="font-display text-h2 text-text-base">
                {siteConfig.career[0].role}
              </h3>
              <p className="font-sans text-sm mt-1" style={{ color: '#4A9FAE' }}>
                {siteConfig.career[0].company}
              </p>
              <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: '#8DAFC0' }}>
                {siteConfig.career[0].description}
              </p>

              {siteConfig.career[0].tags && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {siteConfig.career[0].tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-btn"
                      style={{
                        background: 'rgba(15,42,61,0.80)',
                        border: '1px solid rgba(15,122,122,0.14)',
                        color: '#6A9BAA',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Open to work + links */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div
              className="p-7 rounded-2xl"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.1em] mb-3"
                style={{ color: '#4A9FAE' }}
              >
                What I&apos;m building
              </p>
              <p className="font-sans text-base leading-relaxed" style={{ color: '#A8C5D1' }}>
                {siteConfig.currentlyOpen}
              </p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 group transition-colors"
                style={{ color: '#A8C5D1' }}
              >
                <StarMark size="xs" color="#0F7A7A" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                  {siteConfig.email}
                </span>
              </a>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: '#A8C5D1' }}
              >
                <StarMark size="xs" color="#0F7A7A" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                  LinkedIn
                </span>
              </a>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: '#A8C5D1' }}
              >
                <StarMark size="xs" color="#0F7A7A" className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                  GitHub
                </span>
              </a>
            </div>

            <div className="flex gap-3 flex-wrap pt-2">
              <StarburstButton href={`mailto:${siteConfig.email}`} variant="primary" size="md">
                Get in touch
              </StarburstButton>
              <StarburstButton href="/resume" variant="secondary" size="md">
                View Résumé
              </StarburstButton>
            </div>
          </motion.div>
        </motion.div>
      </Section>

    </main>
  )
}
