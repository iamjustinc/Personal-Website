'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

const topSignals = [
  'AI workflows',
  'Technical demos',
  'Dashboard design',
  'Stakeholder communication',
  'Full-stack prototyping',
  'Product thinking',
]

const proofCards = [
  {
    eyebrow: 'How I create value',
    title: 'I translate technical systems into decisions people can actually act on.',
    body:
      'My strongest work sits between architecture and clarity: turning complex workflows, model outputs, and messy systems into tools, demos, and interfaces that help people move faster.',
  },
  {
    eyebrow: 'Why SE + PM',
    title: 'I’m a fit for roles where technical credibility and user judgment both matter.',
    body:
      'I like understanding how a system works, where it breaks, what matters to the user, and how to present the right solution clearly to stakeholders, customers, or decision-makers.',
  },
  {
    eyebrow: 'What I optimize for',
    title: 'I build for adoption, not just completion.',
    body:
      'I care about whether something is understandable, useful, and easy to trust. That means better demos, better workflows, and products that feel clear the moment someone uses them.',
  },
]

const capabilityCards = [
  {
    title: 'Solutions engineering',
    body:
      'Turning product capability into compelling, tailored explanations, workflows, and demos that connect technical depth to real customer value.',
  },
  {
    title: 'Product judgment',
    body:
      'Breaking down messy problems, finding the leverage point, and shaping the simplest solution that improves the user experience and the business outcome.',
  },
  {
    title: 'AI systems + workflows',
    body:
      'Designing AI-assisted systems where models, structured outputs, and interface logic work together to support better decisions and repeatable execution.',
  },
  {
    title: 'Technical communication',
    body:
      'Explaining tradeoffs, architecture, and system behavior clearly to non-technical audiences without losing the substance of the underlying work.',
  },
]

const currentFocus = [
  'Open to early-career Solutions Engineering and technical Product roles',
  'Interested in customer-facing, workflow, platform, and AI product environments',
  'Best fit where I can combine systems thinking, communication, and product execution',
]

const quickFacts = [
  'Built predictive systems across 30K+ records',
  'Designed dashboards and workflow tools for stakeholder decision-making',
  'Built AI product demos across email, career intelligence, and news workflows',
  'Strong in Python, SQL, TypeScript, Next.js, and technical storytelling',
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
        className="absolute top-[-8%] right-[-8%] pointer-events-none"
        style={{ opacity: 0.045 }}
      >
        <WatermarkStar size={500} color="#4A9FAE" direction={-1} duration={220} opacity={1} />
      </div>

      <div
        aria-hidden
        className="absolute left-[-10%] top-[28%] h-[420px] w-[420px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.12) 0%, rgba(74,159,174,0.03) 42%, transparent 72%)',
        }}
      />

      <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-20 items-start">
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
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
                About
              </span>
            </div>

            <h2 className="font-display text-h1 text-text-base leading-[0.96] max-w-[12ch]">
              Technical depth,
              <br />
              <span style={{ color: '#4A9FAE' }}>clear communication</span>,
              <br />
              strong product judgment.
            </h2>

            <p
              className="mt-6 max-w-[62ch] font-sans text-[17px] leading-8"
              style={{ color: '#A8C5D1' }}
            >
              I’m strongest in roles where I can understand a system deeply, simplify what matters,
              and turn that into a workflow, demo, or product experience that creates clear value
              for users, customers, and stakeholders.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {topSignals.map((item) => (
              <motion.div
                key={item}
                variants={up}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  background: 'rgba(10,32,48,0.62)',
                  border: '1px solid rgba(74,159,174,0.18)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
                }}
              >
                <StarMark size="xs" color="#C4974A" className="opacity-70" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: '#9BC0CB' }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-4"
          >
            {proofCards.map((card) => (
              <motion.div
                key={card.title}
                variants={up}
                className="rounded-[28px] p-6 md:p-7"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.56) 100%)',
                  border: '1px solid rgba(74,159,174,0.14)',
                  boxShadow:
                    '0 10px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.025)',
                }}
              >
                <div className="flex items-center gap-2">
                  <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    {card.eyebrow}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-[30px] md:text-[34px] leading-[1.06] text-text-base text-balance">
                  {card.title}
                </h3>

                <p
                  className="mt-4 font-sans text-[15.5px] leading-7"
                  style={{ color: '#8FB2BE' }}
                >
                  {card.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative">
          {portrait && (
            <motion.div
              variants={up}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-[34px] p-6 md:p-7"
              style={{
                background:
                  'linear-gradient(180deg, rgba(9,28,42,0.7) 0%, rgba(7,22,35,0.56) 100%)',
                border: '1px solid rgba(74,159,174,0.14)',
                boxShadow: '0 16px 60px rgba(0,0,0,0.18)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                  <div
                    aria-hidden
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: '10%',
                      background:
                        'radial-gradient(circle, rgba(74,159,174,0.18) 0%, rgba(74,159,174,0.06) 42%, transparent 74%)',
                      filter: 'blur(10px)',
                    }}
                  />

                  <motion.div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      width: '88%',
                      height: '88%',
                      borderRadius: '999px',
                      border: '1px dashed rgba(74,159,174,0.2)',
                    }}
                    animate={shouldReduce ? {} : { rotate: 360 }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 40, repeat: Infinity, ease: 'linear' }
                    }
                  />

                  <motion.div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      width: '76%',
                      height: '76%',
                      borderRadius: '999px',
                      border: '1px dashed rgba(196,151,74,0.18)',
                    }}
                    animate={shouldReduce ? {} : { rotate: -360 }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 28, repeat: Infinity, ease: 'linear' }
                    }
                  />

                  <motion.div
                    className="relative z-10 rounded-full overflow-hidden"
                    animate={shouldReduce ? {} : { y: [0, -8, 0] }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }
                    }
                    style={{
                      width: '67%',
                      height: '67%',
                      boxShadow:
                        '0 0 0 1px rgba(74,159,174,0.26), 0 0 0 8px rgba(74,159,174,0.08), 0 18px 40px rgba(0,0,0,0.22)',
                    }}
                  >
                    <Image
                      src={portrait}
                      alt="Justin Chang"
                      fill
                      sizes="240px"
                      className="object-cover object-top"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(155deg, rgba(74,159,174,0.10) 0%, transparent 55%)',
                      }}
                    />
                  </motion.div>

                  <motion.div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      width: '88%',
                      height: '88%',
                    }}
                    animate={shouldReduce ? {} : { rotate: 360 }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 18, repeat: Infinity, ease: 'linear' }
                    }
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '6%',
                        left: '50%',
                        width: 12,
                        height: 12,
                        marginLeft: -6,
                        borderRadius: '999px',
                        background:
                          'radial-gradient(circle at 32% 30%, #FFF5D9 0%, #E2BC69 34%, #C4974A 68%, #8E6320 100%)',
                        boxShadow:
                          '0 0 8px rgba(196,151,74,0.45), 0 0 16px rgba(196,151,74,0.16)',
                      }}
                    />
                  </motion.div>

                  <motion.div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      width: '76%',
                      height: '76%',
                    }}
                    animate={shouldReduce ? {} : { rotate: -360 }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 24, repeat: Infinity, ease: 'linear' }
                    }
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '4%',
                        left: '50%',
                        width: 7,
                        height: 7,
                        marginLeft: -3.5,
                        borderRadius: '999px',
                        background: '#7EE7F2',
                        boxShadow:
                          '0 0 8px rgba(126,231,242,0.48), 0 0 14px rgba(126,231,242,0.18)',
                      }}
                    />
                  </motion.div>

                  <motion.div
                    aria-hidden
                    style={{ position: 'absolute', top: '16%', right: '10%' }}
                    animate={shouldReduce ? {} : { y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
                  </motion.div>

                  <motion.div
                    aria-hidden
                    style={{ position: 'absolute', bottom: '18%', left: '8%' }}
                    animate={shouldReduce ? {} : { y: [0, 5, 0], opacity: [0.35, 0.7, 0.35] }}
                    transition={
                      shouldReduce
                        ? {}
                        : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <StarMark size="xs" color="#C4974A" className="opacity-55" />
                  </motion.div>
                </div>

                <div className="mt-8 w-full">
                  <div
                    className="rounded-[24px] p-5"
                    style={{
                      background: 'rgba(10,31,47,0.72)',
                      border: '1px solid rgba(74,159,174,0.15)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                      <span
                        className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                        style={{ color: '#7FAFBB' }}
                      >
                        Current focus
                      </span>
                    </div>

                    <div className="space-y-3">
                      {currentFocus.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <StarMark
                            size="xs"
                            color="#C4974A"
                            className="opacity-55 mt-[5px] shrink-0"
                          />
                          <p
                            className="font-sans text-[15px] leading-6"
                            style={{ color: '#A8C5D1' }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            className="mt-5 grid grid-cols-1 gap-4"
          >
            <motion.div
              variants={up}
              className="rounded-[28px] p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(9,28,42,0.66) 0%, rgba(7,22,35,0.54) 100%)',
                border: '1px solid rgba(74,159,174,0.14)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  What I bring
                </span>
              </div>

              <div className="space-y-4">
                {quickFacts.map((fact) => (
                  <div key={fact} className="flex items-start gap-2.5">
                    <StarMark
                      size="xs"
                      color="#C4974A"
                      className="opacity-55 mt-[5px] shrink-0"
                    />
                    <p
                      className="font-sans text-[15px] leading-6"
                      style={{ color: '#9BBCC7' }}
                    >
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {capabilityCards.map((card) => (
          <motion.div
            key={card.title}
            variants={up}
            className="rounded-[26px] p-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,33,50,0.62) 0%, rgba(8,27,42,0.50) 100%)',
              border: '1px solid rgba(74,159,174,0.13)',
              minHeight: 210,
            }}
          >
            <div className="flex items-center gap-2">
              <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#7FAFBB' }}
              >
                Capability
              </span>
            </div>

            <h3 className="mt-4 font-sans text-[22px] leading-[1.15] font-semibold text-text-base text-balance">
              {card.title}
            </h3>

            <p
              className="mt-4 font-sans text-[15px] leading-7"
              style={{ color: '#8FB2BE' }}
            >
              {card.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}