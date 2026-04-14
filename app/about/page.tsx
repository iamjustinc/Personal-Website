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
    text: "I believe the best products are the ones that feel inevitable once you're using them.",
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
          className="flex justify-center mb-12"
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
        <div className="grid lg:grid-cols-[48fr_52fr] gap-12 lg:gap-18 items-center">
          {/* Left: portrait with hero-style orbit */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="scale-[0.84] sm:scale-[0.92] lg:scale-100 origin-center">
              <div
                className="relative flex items-center justify-center"
                style={{ width: 420, height: 420 }}
              >
                {/* Aura */}
                <div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    width: 460,
                    height: 460,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(15,122,122,0.18) 0%, rgba(15,122,122,0.05) 42%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Watermark star */}
                <div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <WatermarkStar size={340} color="#0F7A7A" direction={1} opacity={0.07} />
                </div>

                {/* Dashed orbit ring */}
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

                {/* Thin inner ring */}
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

                {/* Portrait */}
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
                    {siteConfig.portraitSrc ? (
                      <Image
                        src={siteConfig.portraitSrc}
                        alt={`${siteConfig.name} portrait`}
                        fill
                        sizes="272px"
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

                {/* Main gold satellite */}
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
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 18,
                      height: 18,
                      marginLeft: -9,
                      marginTop: -9,
                      transform: 'rotate(132deg) translateY(-164px)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 44,
                        height: 10,
                        transform: 'translate(-88%, -50%)',
                        borderRadius: 999,
                        background:
                          'linear-gradient(90deg, rgba(196,151,74,0.0) 0%, rgba(196,151,74,0.10) 28%, rgba(196,151,74,0.22) 55%, rgba(196,151,74,0.0) 100%)',
                        filter: 'blur(4px)',
                        opacity: 0.7,
                      }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], y: [0, -1.5, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'relative',
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle at 32% 30%, #FFF5D9 0%, #E2BC69 34%, #C4974A 68%, #8E6320 100%)',
                        boxShadow:
                          '0 0 10px rgba(196,151,74,0.55), 0 0 22px rgba(196,151,74,0.22), inset -2px -2px 4px rgba(0,0,0,0.18), inset 1px 1px 2px rgba(255,255,255,0.4)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Small teal satellite */}
                <motion.div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    width: 296,
                    height: 296,
                    top: '50%',
                    left: '50%',
                    marginLeft: -148,
                    marginTop: -148,
                    zIndex: 19,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 10,
                      height: 10,
                      marginLeft: -5,
                      marginTop: -5,
                      transform: 'rotate(36deg) translateY(-148px)',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle at 35% 35%, #D9FCFF 0%, #71D5E4 40%, #4A9FAE 75%, #1C5B68 100%)',
                        boxShadow:
                          '0 0 8px rgba(74,159,174,0.55), 0 0 18px rgba(74,159,174,0.18), inset -1px -1px 2px rgba(0,0,0,0.18), inset 1px 1px 2px rgba(255,255,255,0.35)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating stars */}
                <motion.div
                  aria-hidden
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', top: 28, right: 24, zIndex: 20 }}
                >
                  <StarMark size="sm" color="#4A9FAE" className="opacity-70" />
                </motion.div>

                <motion.div
                  aria-hidden
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  style={{ position: 'absolute', left: 10, top: '48%', zIndex: 20 }}
                >
                  <StarMark size="xs" color="#C4974A" className="opacity-55" />
                </motion.div>

                <motion.div
                  aria-hidden
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  style={{ position: 'absolute', bottom: 34, left: 30, zIndex: 20 }}
                >
                  <StarMark size="xs" color="#4A9FAE" className="opacity-40" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: bio text */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center max-w-[640px] mx-auto lg:mx-0"
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
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: '#4A9FAE' }}
                >
                  {siteConfig.roleTag}
                </span>
              </div>

              <h1 className="font-display text-hero text-text-base leading-none">
                {siteConfig.name.split(' ')[0]}{' '}
                <span style={{ color: '#4A9FAE' }}>
                  {siteConfig.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </motion.div>

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

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 group transition-colors"
                style={{ color: '#A8C5D1' }}
              >
                <StarMark
                  size="xs"
                  color="#0F7A7A"
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
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
                <StarMark
                  size="xs"
                  color="#0F7A7A"
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
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
                <StarMark
                  size="xs"
                  color="#0F7A7A"
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
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