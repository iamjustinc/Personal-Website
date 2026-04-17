'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

const strengths = [
  {
    title: 'Discovery-first',
    body: 'I start by understanding the workflow, where friction appears, and what the user or buyer needs to believe.',
  },
  {
    title: 'Demo-oriented',
    body: 'I turn technical depth into clear walkthroughs, structured narratives, and customer-facing product value.',
  },
  {
    title: 'Workflow clarity',
    body: 'I like simplifying messy systems into flows people can understand, adopt, and act on.',
  },
  {
    title: 'Stakeholder communication',
    body: 'I explain architecture, tradeoffs, and outputs clearly for non-technical audiences without flattening the nuance.',
  },
]

const proofPoints = [
  {
    value: '30K+',
    label: 'records analyzed',
  },
  {
    value: '70%',
    label: 'analysis time reduced',
  },
  {
    value: '63%',
    label: 'completion lift',
  },
  {
    value: 'Demos',
    label: 'for non-technical teams',
  },
]

export function AboutSection() {
  const stagger = useMotionSafe(staggerContainer(0.08))
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
        <WatermarkStar size={500} color="#4A9FAE" direction={-1} duration={220} opacity={1} />
      </div>

      <div
        aria-hidden
        className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.10) 0%, rgba(74,159,174,0.04) 38%, transparent 72%)',
        }}
      />

      <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-start relative">
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
              className="mt-5 max-w-[52ch] font-sans text-[16px] leading-7"
              style={{ color: '#A8C5D1' }}
            >
              I am strongest when technical systems need to become clear, convincing, and usable.
              My value is translating complexity into better demos, better workflows, and better decisions.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            {strengths.map((item, i) => (
              <motion.div
                key={item.title}
                variants={up}
                whileHover={shouldReduce ? {} : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="group rounded-[26px] p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,33,50,0.70) 0%, rgba(8,27,42,0.56) 100%)',
                  border: '1px solid rgba(74,159,174,0.14)',
                  boxShadow:
                    '0 12px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.02)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={
                      shouldReduce
                        ? {}
                        : i % 2 === 0
                          ? { rotate: [0, 8, 0] }
                          : { scale: [1, 1.08, 1] }
                    }
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <StarMark size="xs" color={i % 2 === 0 ? '#4A9FAE' : '#C4974A'} className="opacity-80" />
                  </motion.div>

                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    Key strength
                  </span>
                </div>

                <h3 className="font-sans text-[22px] leading-[1.15] font-semibold text-text-base">
                  {item.title}
                </h3>

                <p
                  className="mt-3 font-sans text-[14.5px] leading-6"
                  style={{ color: '#8FB2BE' }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {proofPoints.map((item) => (
              <motion.div
                key={item.label}
                variants={up}
                whileHover={shouldReduce ? {} : { y: -3 }}
                className="rounded-[22px] p-4"
                style={{
                  background: 'rgba(10,33,50,0.44)',
                  border: '1px solid rgba(74,159,174,0.12)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StarMark size="xs" color="#C4974A" className="opacity-70" />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    Proof
                  </span>
                </div>

                <div className="font-display text-[28px] leading-none text-text-base">
                  {item.value}
                </div>

                <p
                  className="mt-2 font-sans text-[13px] leading-5"
                  style={{ color: '#8FB2BE' }}
                >
                  {item.label}
                </p>
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
            className="hidden xl:flex flex-col items-center xl:sticky xl:top-28"
          >
            <div
              className="relative flex items-center justify-center"
              style={{ width: 360, height: 360 }}
            >
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 370,
                  height: 370,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(15,122,122,0.18) 0%, transparent 72%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 328,
                  height: 328,
                  borderRadius: '50%',
                  border: '1px dashed rgba(74,159,174,0.18)',
                }}
                animate={shouldReduce ? {} : { rotate: 360 }}
                transition={{
                  duration: 34,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 290,
                  height: 290,
                  borderRadius: '50%',
                  border: '1px solid rgba(196,151,74,0.16)',
                }}
                animate={shouldReduce ? {} : { rotate: -360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <div
                className="portrait-float"
                style={{ width: 250, height: 250, position: 'relative', zIndex: 10 }}
              >
                <div
                  className="portrait-glow"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow:
                      '0 0 0 6px rgba(15,122,122,0.18), 0 0 36px rgba(74,159,174,0.18)',
                  }}
                >
                  <Image
                    src={portrait}
                    alt="Justin Chang"
                    fill
                    sizes="250px"
                    className="object-cover object-top"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(160deg, rgba(15,122,122,0.08) 0%, transparent 60%)',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </div>

              <motion.div
                aria-hidden
                style={{ position: 'absolute', top: 42, right: 64, zIndex: 20 }}
                animate={shouldReduce ? {} : { y: [0, -7, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="sm" color="#C4974A" className="opacity-90" />
              </motion.div>

              <motion.div
                aria-hidden
                style={{ position: 'absolute', bottom: 56, left: 40, zIndex: 20 }}
                animate={shouldReduce ? {} : { scale: [1, 1.14, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="xs" color="#7EE7F2" className="opacity-90" />
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 314,
                  height: 314,
                  top: '50%',
                  left: '50%',
                  marginLeft: -157,
                  marginTop: -157,
                  zIndex: 18,
                }}
                animate={shouldReduce ? {} : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
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
                    transform: 'rotate(146deg) translateY(-157px)',
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 32% 30%, #FFF5D9 0%, #E2BC69 34%, #C4974A 68%, #8E6320 100%)',
                      boxShadow: '0 0 10px rgba(196,151,74,0.42)',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={up}
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="mt-6 w-full max-w-[390px] rounded-[28px] p-6"
              style={{
                background: 'rgba(15,42,61,0.56)',
                border: '1px solid rgba(15,122,122,0.16)',
                boxShadow: '0 18px 40px rgba(0,0,0,0.16)',
              }}
            >
              <div className="flex items-start gap-3">
                <StarMark size="xs" color="#4A9FAE" className="opacity-70 mt-1 shrink-0" />
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    Recruiter signal
                  </p>
                  <p
                    className="mt-2 font-sans text-[15px] leading-7"
                    style={{ color: '#A8C5D1' }}
                  >
                    Open to early-career Solutions Engineering roles where I can combine technical depth,
                    demos, stakeholder communication, and workflow thinking.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}