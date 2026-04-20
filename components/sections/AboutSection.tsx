'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

type ProofPoint = {
  value?: number
  suffix?: string
  textValue?: string
  label: string
  detail: string
}

const proofPoints: ProofPoint[] = [
  {
    value: 30,
    suffix: 'K+',
    label: 'records modeled',
    detail: 'Built risk-scoring workflows from clinical-scale data.',
  },
  {
    value: 70,
    suffix: '%',
    label: 'manual review reduced',
    detail: 'Reduced analysis time through reusable Python/R pipelines.',
  },
  {
    value: 63,
    suffix: '%',
    label: 'completion rate lift',
    detail: 'Improved completion after redesigning recruitment and scheduling flows.',
  },
  {
    textValue: 'Walkthrough-led',
    label: 'product walkthroughs',
    detail: 'Used walkthroughs to explain workflow, AI behavior, and next steps.',
  },
]

const strengths = [
  {
    title: 'Make value visible',
    body: 'I tailor walkthroughs around the user workflow, decision criteria, and next step.',
  },
  {
    title: 'Diagnose before solving',
    body: 'I map friction, constraints, and decision criteria before recommending a fix.',
  },
  {
    title: 'Translate across the room',
    body: 'I explain architecture, AI outputs, and tradeoffs in language each audience can use.',
  },
  {
    title: 'Tie systems to outcomes',
    body: 'I connect data, automation, and product behavior to workflow impact and decisions unlocked.',
  },
]

const starParticles = [
  { left: '7%', top: '20%', size: 'xs' as const, color: '#C4974A', delay: 0 },
  { left: '16%', top: '73%', size: 'xs' as const, color: '#7EE7F2', delay: 0.7 },
  { left: '33%', top: '13%', size: 'xs' as const, color: '#4A9FAE', delay: 1.4 },
  { left: '57%', top: '76%', size: 'sm' as const, color: '#C4974A', delay: 0.35 },
  { left: '78%', top: '22%', size: 'xs' as const, color: '#7EE7F2', delay: 1.05 },
  { left: '91%', top: '62%', size: 'xs' as const, color: '#4A9FAE', delay: 1.75 },
]

function MetricValue({
  value,
  suffix = '',
  textValue,
}: {
  value?: number
  suffix?: string
  textValue?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' })
  const shouldReduce = useReducedMotion()
  const count = useMotionValue(value ?? 0)
  const display = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (value === undefined) return

    if (shouldReduce) {
      count.set(value)
      return
    }

    if (!isInView) {
      count.set(0)
      return
    }

    const controls = animate(count, value, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    })

    return controls.stop
  }, [count, isInView, shouldReduce, value])

  if (textValue) {
    return <span ref={ref}>{textValue}</span>
  }

  return <motion.span ref={ref}>{display}</motion.span>
}

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
        className="relative mx-auto flex max-w-[800px] flex-col items-center text-center"
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
          Built to discover, translate, and <span style={{ color: '#4A9FAE' }}>build value</span>
        </h2>

        <p
          className="mt-5 max-w-[670px] font-sans text-[16px] leading-7"
          style={{ color: '#A8C5D1' }}
        >
          I work from the workflow first: clarify the friction, shape the path forward, and make
          AI/data tradeoffs understandable.
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
            'linear-gradient(135deg, rgba(15,42,61,0.76) 0%, rgba(10,33,50,0.54) 52%, rgba(8,27,42,0.74) 100%)',
          border: '1px solid rgba(74,159,174,0.18)',
          boxShadow: '0 20px 64px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.035)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(196,151,74,0.42) 18%, rgba(126,231,242,0.44) 50%, rgba(74,159,174,0.24) 82%, transparent 100%)',
          }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-[28%] -skew-x-12"
          style={{
            left: '-36%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(126,231,242,0.045) 48%, rgba(196,151,74,0.06) 56%, transparent 100%)',
          }}
          animate={shouldReduce ? {} : { x: ['0%', '520%'] }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: 'easeInOut',
          }}
        />

        <div
          aria-hidden
          className="absolute inset-y-5 left-1/4 hidden w-px bg-[rgba(74,159,174,0.14)] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-5 left-1/2 hidden w-px bg-[rgba(74,159,174,0.14)] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-5 left-3/4 hidden w-px bg-[rgba(74,159,174,0.14)] lg:block"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((item, index) => (
            <motion.div
              key={item.label}
              variants={up}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -5,
                      backgroundColor: 'rgba(15,42,61,0.46)',
                    }
              }
              transition={{ duration: 0.22 }}
              className="group relative min-h-[176px] p-6 sm:p-7"
            >
              <div
                aria-hidden
                className="absolute left-6 right-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(196,151,74,0.44) 24%, rgba(126,231,242,0.40) 100%)',
                }}
              />

              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Signal {String(index + 1).padStart(2, '0')}
                </span>
                <motion.div
                  animate={
                    shouldReduce
                      ? {}
                      : {
                          opacity: [0.55, 1, 0.55],
                          scale: [1, 1.12, 1],
                        }
                  }
                  transition={{
                    duration: 3.2 + index * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.18,
                  }}
                >
                  <StarMark
                    size="xs"
                    color={index % 2 === 0 ? '#C4974A' : '#4A9FAE'}
                    className="opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </motion.div>
              </div>

              <div className="font-display text-[42px] leading-none text-text-base sm:text-[46px]">
                <MetricValue value={item.value} suffix={item.suffix} textValue={item.textValue} />
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
            'linear-gradient(145deg, rgba(13,30,53,0.96) 0%, rgba(15,42,61,0.82) 44%, rgba(8,27,42,0.98) 100%)',
          border: '1px solid rgba(74,159,174,0.20)',
          boxShadow:
            '0 28px 82px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.045)',
        }}
      >
        <div
          aria-hidden
          className="absolute right-[-10%] top-[-22%] h-[380px] w-[380px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(196,151,74,0.15) 0%, rgba(74,159,174,0.07) 42%, transparent 70%)',
          }}
        />

        <div
          aria-hidden
          className="absolute left-[-12%] bottom-[-28%] h-[430px] w-[430px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(126,231,242,0.08) 0%, rgba(15,122,122,0.04) 42%, transparent 72%)',
          }}
        />

        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M8 24 C22 16 34 28 47 20 S72 18 88 31"
            fill="none"
            stroke="rgba(126,231,242,0.45)"
            strokeWidth="0.16"
            strokeDasharray="1 2.4"
            animate={shouldReduce ? {} : { pathLength: [0.35, 1, 0.35], opacity: [0.16, 0.46, 0.16] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M13 78 C28 62 42 72 55 58 S76 53 92 66"
            fill="none"
            stroke="rgba(196,151,74,0.34)"
            strokeWidth="0.16"
            strokeDasharray="1 2.2"
            animate={shouldReduce ? {} : { pathLength: [0.45, 1, 0.45], opacity: [0.12, 0.38, 0.12] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </svg>

        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-[34%] -skew-x-12"
          style={{
            left: '-42%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(126,231,242,0.055) 42%, rgba(196,151,74,0.08) 52%, transparent 100%)',
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
                      opacity: [0.2, 0.82, 0.2],
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

        <div className="relative grid gap-9 lg:grid-cols-[0.88fr_1.38fr] lg:gap-12">
          <div className="max-w-[470px]">
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
              How I create customer clarity
            </h3>

            <p className="mt-5 font-sans text-[15px] leading-7" style={{ color: '#A8C5D1' }}>
              I am useful when the room needs a credible technical answer and a clear next step.
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
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -6,
                        scale: 1.01,
                      }
                }
                transition={{ duration: 0.22 }}
                className="group relative overflow-hidden rounded-[24px] p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.50) 100%)',
                  border: '1px solid rgba(74,159,174,0.15)',
                  boxShadow:
                    '0 14px 34px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.025)',
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(126,231,242,0.36) 38%, rgba(196,151,74,0.34) 100%)',
                  }}
                />

                <div
                  aria-hidden
                  className="absolute right-[-30%] top-[-40%] h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: index % 2 === 0 ? 'rgba(74,159,174,0.16)' : 'rgba(196,151,74,0.12)',
                  }}
                />

                <div className="relative mb-4 flex items-center justify-between gap-3">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    Fit {String(index + 1).padStart(2, '0')}
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

                <h4 className="relative font-sans text-[18px] font-semibold leading-snug text-text-base">
                  {item.title}
                </h4>

                <p
                  className="relative mt-3 font-sans text-[13.5px] leading-6"
                  style={{ color: '#8FB2BE' }}
                >
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
