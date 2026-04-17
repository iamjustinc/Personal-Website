'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

const workStatements = [
  'I do my best work where technical systems need to become clear for the people using, evaluating, or buying them. I like breaking down how a system works, where the workflow gets stuck, and what needs to be made easier to understand.',
  'That is why Solutions Engineering fits me so well. I enjoy translating technical depth into tailored demos, structured workflows, and clear explanations that help non-technical stakeholders see the value quickly.',
  'My background has been shaped by data systems, dashboards, and AI-powered workflows, but the common thread is always the same: take something complex, make it usable, and communicate it in a way that supports better decisions.',
  'I am especially strong in early-career SE environments where technical credibility, curiosity, communication, and customer understanding all matter.'
]

const workHighlights = [
  'Discovery and workflow mapping',
  'Technical demos and storytelling',
  'AI workflows and full-stack prototyping',
  'Dashboard and systems communication',
  'Stakeholder-facing problem solving',
  'Translating complexity into business value',
]

const proofPoints = [
  '30K+ records analyzed in health AI systems',
  '70% manual analysis time reduced',
  '63% completion lift from workflow redesign',
  'Delivered demos to non-technical stakeholders',
]

export function AboutSection() {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)
  const shouldReduce = useReducedMotion()
  const portrait = siteConfig.portraitSrc ?? siteConfig.photoSrc

  return (
    <Section id="about" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-8%] pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        <WatermarkStar size={480} color="#4A9FAE" direction={-1} duration={200} opacity={1} />
      </div>

      <div className="grid md:grid-cols-[58fr_42fr] gap-16 lg:gap-20 items-start relative">
        <div>
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

            <h2 className="font-display text-h1 text-text-base leading-tight text-balance">
              How I <span style={{ color: '#4A9FAE' }}>work</span>
            </h2>

            <p
              className="mt-5 max-w-[58ch] font-sans text-[16px] leading-7"
              style={{ color: '#8FB2BE' }}
            >
              My approach is simple: understand the workflow, identify what matters most,
              and make the system easier to explain, demonstrate, and act on.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 flex flex-col gap-6"
          >
            {workStatements.map((statement, i) => (
              <motion.p
                key={i}
                variants={up}
                className="font-sans text-[16px] leading-8 max-w-[64ch]"
                style={{ color: '#A8C5D1' }}
              >
                {statement}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
          >
            {workHighlights.map((highlight, i) => (
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

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            {proofPoints.map((item) => (
              <motion.div
                key={item}
                variants={up}
                className="rounded-[20px] px-4 py-4"
                style={{
                  background: 'rgba(10,33,50,0.44)',
                  border: '1px solid rgba(74,159,174,0.12)',
                }}
              >
                <div className="flex items-start gap-2.5">
                  <StarMark size="xs" color="#C4974A" className="opacity-70 mt-1 shrink-0" />
                  <p
                    className="font-sans text-[14px] leading-6"
                    style={{ color: '#A8C5D1' }}
                  >
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {portrait && (
          <motion.div
            variants={up}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:flex flex-col items-center"
          >
            <div
              className="relative flex items-center justify-center"
              style={{ width: 280, height: 300 }}
            >
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(15,122,122,0.15) 0%, transparent 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              <div
                aria-hidden
                className="absolute pointer-events-none halo-spin"
                style={{
                  width: 246,
                  height: 246,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <svg width="246" height="246" viewBox="0 0 246 246" fill="none">
                  <circle
                    cx="123"
                    cy="123"
                    r="120"
                    stroke="rgba(15,122,122,0.18)"
                    strokeWidth="1"
                    strokeDasharray="3 10"
                  />
                </svg>
              </div>

              <div
                className="portrait-float"
                style={{ width: 200, height: 200, position: 'relative', zIndex: 10 }}
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
                  <Image
                    src={portrait}
                    alt="Justin Chang"
                    fill
                    sizes="200px"
                    className="object-cover object-top"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(160deg, rgba(15,122,122,0.07) 0%, transparent 60%)',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </div>

              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 236,
                  height: 236,
                  top: '50%',
                  left: '50%',
                  marginLeft: -118,
                  marginTop: -118,
                  zIndex: 20,
                }}
                animate={shouldReduce ? {} : { rotate: 360 }}
                transition={
                  shouldReduce
                    ? {}
                    : {
                        duration: 18,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                }
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 12,
                    height: 12,
                    marginLeft: -6,
                    marginTop: -6,
                    transform: 'rotate(132deg) translateY(-118px)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 28,
                      height: 7,
                      transform: 'translate(-86%, -50%)',
                      borderRadius: 999,
                      background:
                        'linear-gradient(90deg, rgba(196,151,74,0.0) 0%, rgba(196,151,74,0.10) 32%, rgba(196,151,74,0.18) 56%, rgba(196,151,74,0.0) 100%)',
                      filter: 'blur(3px)',
                      opacity: 0.7,
                    }}
                  />
                  <motion.div
                    animate={shouldReduce ? {} : { scale: [1, 1.08, 1] }}
                    transition={
                      shouldReduce
                        ? {}
                        : {
                            duration: 2.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                    }
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 32% 30%, #FFF5D9 0%, #E2BC69 34%, #C4974A 68%, #8E6320 100%)',
                      boxShadow:
                        '0 0 8px rgba(196,151,74,0.45), 0 0 16px rgba(196,151,74,0.16), inset -1px -1px 2px rgba(0,0,0,0.18), inset 1px 1px 2px rgba(255,255,255,0.35)',
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 220,
                  height: 220,
                  top: '50%',
                  left: '50%',
                  marginLeft: -110,
                  marginTop: -110,
                  zIndex: 19,
                }}
                animate={shouldReduce ? {} : { rotate: -360 }}
                transition={
                  shouldReduce
                    ? {}
                    : {
                        duration: 24,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                }
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 6,
                    height: 6,
                    marginLeft: -3,
                    marginTop: -3,
                    transform: 'rotate(36deg) translateY(-110px)',
                  }}
                >
                  <motion.div
                    animate={shouldReduce ? {} : { scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={
                      shouldReduce
                        ? {}
                        : {
                            duration: 2.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                    }
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#7EE7F2',
                      boxShadow: '0 0 8px rgba(126,231,242,0.40), 0 0 14px rgba(126,231,242,0.16)',
                    }}
                  />
                </div>
              </motion.div>

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
                  Open to early-career Solutions Engineering roles where I can turn technical systems
                  into clear demos, better workflows, and business value.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}