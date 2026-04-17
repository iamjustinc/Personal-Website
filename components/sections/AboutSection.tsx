'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

const proofPoints = [
  {
    value: '30K+',
    label: 'records analyzed',
    detail: 'model-ready workflows built from messy operational data',
  },
  {
    value: '70%',
    label: 'analysis time reduced',
    detail: 'manual review compressed into clearer decision paths',
  },
  {
    value: '63%',
    label: 'completion lift',
    detail: 'systems thinking applied to improve follow-through',
  },
  {
    value: 'Live',
    label: 'technical demos delivered',
    detail: 'AI products translated into customer-facing walkthroughs',
  },
]

const strengths = [
  {
    title: 'Tailored technical demos',
    body: 'I make product value obvious by connecting features to the workflow a customer actually cares about.',
  },
  {
    title: 'Discovery-first workflow thinking',
    body: 'I look for the friction, decision points, and adoption blockers before jumping into the solution.',
  },
  {
    title: 'Stakeholder-ready communication',
    body: 'I can explain architecture, tradeoffs, and AI outputs across technical and non-technical audiences.',
  },
  {
    title: 'Complexity translated into value',
    body: 'I turn AI, data, and system behavior into business outcomes people can understand and act on.',
  },
]

const starParticles = [
  { left: '8%', top: '18%', size: 'xs' as const, color: '#C4974A', delay: 0 },
  { left: '18%', top: '72%', size: 'xs' as const, color: '#7EE7F2', delay: 0.7 },
  { left: '36%', top: '14%', size: 'xs' as const, color: '#4A9FAE', delay: 1.4 },
  { left: '64%', top: '80%', size: 'sm' as const, color: '#C4974A', delay: 0.35 },
  { left: '82%', top: '24%', size: 'xs' as const, color: '#7EE7F2', delay: 1.05 },
  { left: '92%', top: '64%', size: 'xs' as const, color: '#4A9FAE', delay: 1.75 },
]

export function AboutSection() {
  const shouldReduce = useReducedMotion()
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  return (
    <Section id="about" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute left-[-18%] top-[8%] h-[520px] w-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.13) 0%, rgba(15,122,122,0.05) 42%, transparent 72%)',
        }}
      />

      <div
        aria-hidden
        className="absolute right-[-12%] top-[-18%] pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        <WatermarkStar size={620} color="#4A9FAE" direction={-1} duration={260} opacity={1} />
      </div>

      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative mx-auto flex max-w-[760px] flex-col items-center text-center"
      >
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: 'rgba(15,122,122,0.08)',
            border: '1px solid rgba(15,122,122,0.22)',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-85" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
            Why me
          </span>
        </div>

        <h2 className="font-display text-h1 leading-tight text-text-base text-balance">
          Built for <span style={{ color: '#4A9FAE' }}>Solutions Engineering</span>
        </h2>

        <p
          className="mt-5 max-w-[620px] font-sans text-[16px] leading-7"
          style={{ color: '#A8C5D1' }}
        >
          I turn technical complexity into clear demos, workflow clarity, and stakeholder value
          people can understand quickly.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative mt-12 overflow-hidden rounded-[30px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,42,61,0.72) 0%, rgba(10,33,50,0.48) 52%, rgba(8,27,42,0.70) 100%)',
          border: '1px solid rgba(74,159,174,0.16)',
          boxShadow: '0 18px 58px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-y-5 left-1/4 hidden w-px bg-[rgba(74,159,174,0.12)] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-5 left-1/2 hidden w-px bg-[rgba(74,159,174,0.12)] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-5 left-3/4 hidden w-px bg-[rgba(74,159,174,0.12)] lg:block"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((item, index) => (
            <motion.div
              key={item.label}
              variants={up}
              whileHover={shouldReduce ? {} : { y: -4 }}
              transition={{ duration: 0.22 }}
              className="group relative min-h-[168px] p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Proof {String(index + 1).padStart(2, '0')}
                </span>
                <StarMark
                  size="xs"
                  color={index % 2 === 0 ? '#C4974A' : '#4A9FAE'}
                  className="opacity-70 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>

              <div className="font-display text-[42px] leading-none text-text-base sm:text-[46px]">
                {item.value}
              </div>

              <p
                className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                style={{ color: '#7EE7F2' }}
              >
                {item.label}
              </p>

              <p className="mt-4 font-sans text-[13.5px] leading-6" style={{ color: '#8FB2BE' }}>
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={up}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative mt-8 overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10"
        style={{
          background:
            'linear-gradient(145deg, rgba(13,30,53,0.94) 0%, rgba(15,42,61,0.78) 44%, rgba(8,27,42,0.96) 100%)',
          border: '1px solid rgba(74,159,174,0.18)',
          boxShadow:
            '0 26px 74px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          aria-hidden
          className="absolute right-[-10%] top-[-22%] h-[360px] w-[360px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(196,151,74,0.14) 0%, rgba(74,159,174,0.06) 42%, transparent 70%)',
          }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-[34%] -skew-x-12"
          style={{
            left: '-42%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(126,231,242,0.06) 42%, rgba(196,151,74,0.08) 52%, transparent 100%)',
          }}
          animate={shouldReduce ? {} : { x: ['0%', '430%'] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.6,
          }}
        />

        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {starParticles.map((star) => (
            <motion.div
              key={`${star.left}-${star.top}`}
              className="absolute"
              style={{ left: star.left, top: star.top }}
              animate={
                shouldReduce
                  ? {}
                  : {
                      opacity: [0.22, 0.9, 0.22],
                      scale: [0.9, 1.16, 0.9],
                      y: [0, -4, 0],
                    }
              }
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: star.delay,
              }}
            >
              <StarMark size={star.size} color={star.color} className="opacity-70" />
            </motion.div>
          ))}
        </div>

        <div className="relative grid gap-9 lg:grid-cols-[0.9fr_1.35fr] lg:gap-12">
          <div className="max-w-[460px]">
            <div className="mb-4 flex items-center gap-2">
              <StarMark size="xs" color="#C4974A" className="opacity-85" />
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#7FAFBB' }}
              >
                Recruiter signal
              </span>
            </div>

            <h3 className="font-display text-[34px] leading-[1.05] text-text-base sm:text-[42px]">
              Why recruiters remember me
            </h3>

            <p className="mt-5 font-sans text-[15px] leading-7" style={{ color: '#A8C5D1' }}>
              I sit at the intersection of demo craft, technical fluency, and business translation.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                variants={up}
                whileHover={shouldReduce ? {} : { y: -5 }}
                transition={{ duration: 0.22 }}
                className="group rounded-[24px] p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,33,50,0.64) 0%, rgba(8,27,42,0.48) 100%)',
                  border: '1px solid rgba(74,159,174,0.14)',
                  boxShadow:
                    '0 14px 34px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.025)',
                }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <motion.div
                    animate={
                      shouldReduce
                        ? {}
                        : index % 2 === 0
                          ? { rotate: [0, 12, 0] }
                          : { scale: [1, 1.13, 1] }
                    }
                    transition={{
                      duration: 3.2 + index * 0.35,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <StarMark
                      size="xs"
                      color={index % 2 === 0 ? '#4A9FAE' : '#C4974A'}
                      className="opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </motion.div>
                </div>

                <h4 className="font-sans text-[18px] font-semibold leading-snug text-text-base">
                  {item.title}
                </h4>

                <p className="mt-3 font-sans text-[13.5px] leading-6" style={{ color: '#8FB2BE' }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
