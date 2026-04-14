'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

export function AboutSection() {
  const stagger     = useMotionSafe(staggerContainer(0.10))
  const up          = useMotionSafe(fadeUp)
  const inn         = useMotionSafe(fadeIn)
  const shouldReduce = useReducedMotion()
  const portrait    = siteConfig.portraitSrc ?? siteConfig.photoSrc

  return (
    <Section id="about" className="relative overflow-hidden">

      {/* Section-scoped watermark star — right side */}
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-8%] pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        <WatermarkStar size={480} color="#4A9FAE" direction={-1} duration={200} opacity={1} />
      </div>

      <div className="grid md:grid-cols-[55fr_45fr] gap-16 lg:gap-20 items-start relative">

        {/* ── Left: statements ─────────────────────────────────────────── */}
        <div>
          {/* Section label pill */}
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
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

            {/* Large editorial heading */}
            <h2 className="font-display text-h1 text-text-base leading-tight">
              How I{' '}
              <span style={{ color: '#4A9FAE' }}>work</span>
            </h2>
          </motion.div>

          {/* Statements */}
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

          {/* Expertise highlights — star-marked list */}
          {siteConfig.aboutHighlights && siteConfig.aboutHighlights.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
            >
              {siteConfig.aboutHighlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  variants={up}
                  className="flex items-center gap-2.5"
                >
                  <StarMark size="xs" color="#0F7A7A" className="opacity-65 shrink-0" />
                  <span className="font-sans text-sm" style={{ color: '#7AABB8' }}>
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Right: portrait + status ──────────────────────────────────── */}
        {portrait && (
          <motion.div
            variants={up}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:flex flex-col items-center"
          >
            {/* Portrait — same treatment as hero but slightly smaller */}
            <div className="relative flex items-center justify-center" style={{ width: 280, height: 300 }}>

              {/* Aura */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(15,122,122,0.15) 0%, transparent 70%)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Halo ring */}
              <div
                aria-hidden
                className="absolute pointer-events-none halo-spin"
                style={{ width: 246, height: 246, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <svg width="246" height="246" viewBox="0 0 246 246" fill="none">
                  <circle cx="123" cy="123" r="120" stroke="rgba(15,122,122,0.18)" strokeWidth="1" strokeDasharray="3 10" />
                </svg>
              </div>

              {/* Portrait circle */}
              <div
                className="portrait-float"
                style={{ width: 200, height: 200, position: 'relative', zIndex: 10 }}
              >
                <div
                  className="portrait-glow"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}
                >
                  <Image
                    src={portrait}
                    alt="Justin Chang"
                    fill
                    sizes="200px"
                    className="object-cover object-top"
                  />
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(160deg, rgba(15,122,122,0.07) 0%, transparent 60%)',
                      borderRadius: '50%',
                    }}
                  />
                </div>

                {/* Gold star badge */}
                <div
                  style={{
                    position: 'absolute', bottom: 6, right: 6,
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#C4974A',
                    boxShadow: '0 0 10px rgba(196,151,74,0.50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 20,
                  }}
                >
                  <StarMark size="xs" color="#0A1628" />
                </div>
              </div>

              {/* Orbital star marks */}
              <motion.div
                aria-hidden
                animate={shouldReduce ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 20, right: 20, zIndex: 20 }}
              >
                <StarMark size="xs" color="#4A9FAE" className="opacity-60" />
              </motion.div>
              <div
                aria-hidden
                style={{ position: 'absolute', bottom: 28, left: 22, zIndex: 20 }}
              >
                <StarMark size="xs" color="#C4974A" className="opacity-40" />
              </div>
            </div>

            {/* Status card */}
<motion.div
  variants={up}
  className="mt-6 w-full max-w-[360px] p-5 rounded-2xl"
  style={{
    background: 'rgba(15,42,61,0.55)',
    border: '1px solid rgba(15,122,122,0.16)',
  }}
>
  <div className="flex items-start gap-2.5">
    <StarMark size="xs" color="#4A9FAE" className="opacity-60 mt-1 shrink-0" />
    <p
      className="font-sans text-[15px] leading-6 text-pretty"
      style={{ color: '#A8C5D1' }}
    >
      Open to early-career SE + PM roles where I can turn technical systems into customer value.
    </p>
  </div>
</motion.div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
