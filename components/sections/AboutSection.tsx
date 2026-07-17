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
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
import { Starburst } from '@/components/ui/Starburst'
import { siteConfig } from '@/data/site'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

function MetricValue({
  value,
  animateTo,
  suffix = '',
}: {
  value: string
  animateTo?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' })
  const shouldReduce = useReducedMotion()
  const count = useMotionValue(animateTo ?? 0)
  const display = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (animateTo === undefined) return

    if (shouldReduce) {
      count.set(animateTo)
      return
    }

    if (!isInView) {
      count.set(0)
      return
    }

    const controls = animate(count, animateTo, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    })

    return controls.stop
  }, [animateTo, count, isInView, shouldReduce])

  if (animateTo === undefined) {
    return <span ref={ref}>{value}</span>
  }

  return <motion.span ref={ref}>{display}</motion.span>
}

export function AboutSection() {
  const shouldReduce = useReducedMotion()
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)
  const proofPoints = siteConfig.whyIFit.signals
  const supportingColumns = siteConfig.whyIFit.supportingColumns

  return (
    <Section id="about" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-18%] top-[8%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.13) 0%, rgba(15,122,122,0.05) 42%, transparent 72%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-18%]"
        style={{ opacity: 0.04 }}
      >
        <WatermarkStar size={620} color="#4A9FAE" direction={-1} duration={260} opacity={1} />
      </div>

      <div className="pointer-events-none absolute right-[16%] top-[3%] hidden lg:block">
        <Starburst
          size="md"
          color="#7EE7F2"
          haloColor="#4A9FAE"
          opacity={0.38}
          pulse
          delay={1.6}
          duration={7.4}
        />
      </div>
      <div className="pointer-events-none absolute left-[3%] top-[28%] hidden sm:block">
        <Starburst size="sm" color="#F4D58D" opacity={0.40} pulse delay={3.2} duration={6.8} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-[2%] bottom-[14%] hidden lg:block"
      >
        <Constellation
          width={88}
          height={56}
          color="#7EE7F2"
          lineOpacity={0.18}
          pointOpacity={0.58}
          points={[
            { x: 8, y: 44, size: 1.2 },
            { x: 38, y: 18, size: 1.6, twinkle: true, delay: 1.8 },
            { x: 72, y: 34, size: 1.1 },
            { x: 82, y: 8, size: 1.3 },
          ]}
          connections={[
            [0, 1],
            [1, 2],
            [2, 3],
          ]}
        />
      </div>

      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative mx-auto flex max-w-[820px] flex-col items-center text-center"
      >
        <div className="section-eyebrow mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <StarMark size="xs" color="#C4974A" className="opacity-85" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
            {siteConfig.whyIFit.eyebrow}
          </span>
        </div>

        <h2 className="font-display text-h1 leading-tight text-text-base text-balance">
          {siteConfig.whyIFit.heading}
        </h2>

        <p
          className="mt-5 max-w-[680px] font-sans text-[16px] leading-7"
          style={{ color: '#A8C5D1' }}
        >
          {siteConfig.whyIFit.supportingCopy}
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

        <StarField
          className="opacity-78"
          stars={[
            { x: '6%', y: '18%', size: 1.4, color: '#F4D58D', opacity: 0.34, halo: 1.4 },
            { x: '18%', y: '82%', size: 1.0, color: '#7EE7F2', opacity: 0.28, halo: 1.2, twinkle: true, delay: 1.1, duration: 5.2 },
            { x: '39%', y: '12%', size: 1.0, color: '#E6EEF2', opacity: 0.24, halo: 1.0 },
            { x: '58%', y: '78%', size: 1.3, color: '#C4974A', opacity: 0.28, halo: 1.2 },
            { x: '81%', y: '16%', size: 1.0, color: '#7EE7F2', opacity: 0.26, halo: 1.1 },
            { x: '94%', y: '66%', size: 1.4, color: '#E6EEF2', opacity: 0.24, halo: 1.1, twinkle: true, delay: 3.4, duration: 6.1 },
            { x: '28%', y: '44%', size: 1.1, color: '#A8C5D1', opacity: 0.22, halo: 1.0 },
            { x: '46%', y: '36%', size: 1.0, color: '#7EE7F2', opacity: 0.26, halo: 1.1 },
            { x: '62%', y: '56%', size: 1.2, color: '#F4D58D', opacity: 0.28, halo: 1.2 },
            { x: '75%', y: '88%', size: 1.0, color: '#A8C5D1', opacity: 0.22, halo: 1.0 },
            { x: '88%', y: '42%', size: 1.1, color: '#E6EEF2', opacity: 0.22, halo: 1.0 },
            { x: '14%', y: '46%', size: 1.0, color: '#C4974A', opacity: 0.24, halo: 1.1 },
          ]}
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
              className="group relative min-h-[188px] p-6 sm:p-7"
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
                  initial={false}
                  whileInView={
                    shouldReduce
                      ? {}
                      : {
                          opacity: [0.55, 1, 0.55],
                          scale: [1, 1.12, 1],
                        }
                  }
                  viewport={{ amount: 0.6 }}
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

              <div
                className={
                  item.animateTo === undefined
                    ? 'font-display text-[30px] leading-none text-text-base sm:text-[34px]'
                    : 'font-display text-[42px] leading-none text-text-base sm:text-[46px]'
                }
              >
                <MetricValue value={item.value} animateTo={item.animateTo} suffix={item.suffix} />
              </div>

              <p
                className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                style={{ color: '#7EE7F2' }}
              >
                {item.label}
              </p>

              <p className="mt-4 font-sans text-[13.5px] leading-6" style={{ color: '#8FB2BE' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative mt-6 overflow-hidden rounded-[28px] p-5 sm:p-6 lg:p-7"
        style={{
          background:
            'linear-gradient(145deg, rgba(13,30,53,0.94) 0%, rgba(15,42,61,0.80) 48%, rgba(8,27,42,0.96) 100%)',
          border: '1px solid rgba(74,159,174,0.18)',
          boxShadow: '0 18px 52px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(126,231,242,0.34) 36%, rgba(196,151,74,0.28) 62%, transparent 100%)',
          }}
        />

        <StarField
          className="opacity-72"
          stars={[
            { x: '8%', y: '22%', size: 1.1, color: '#F4D58D', opacity: 0.28, halo: 1.1 },
            { x: '24%', y: '74%', size: 1.0, color: '#7EE7F2', opacity: 0.24, halo: 1.0 },
            { x: '51%', y: '18%', size: 1.0, color: '#E6EEF2', opacity: 0.20, halo: 1.0 },
            { x: '76%', y: '70%', size: 1.0, color: '#7EE7F2', opacity: 0.22, halo: 1.0 },
            { x: '92%', y: '26%', size: 1.1, color: '#C4974A', opacity: 0.24, halo: 1.0 },
          ]}
        />

        <div className="relative grid gap-4 md:grid-cols-3">
          {supportingColumns.map((item, index) => (
            <motion.div
              key={item.heading}
              variants={up}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -3,
                      scale: 1.005,
                    }
              }
              transition={{ duration: 0.22 }}
              className="group relative overflow-hidden rounded-[22px] p-5"
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

              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  {item.heading}
                </span>
                <motion.div
                  initial={false}
                  whileInView={
                    shouldReduce
                      ? {}
                      : index % 2 === 0
                        ? { rotate: [0, 10, 0] }
                        : { scale: [1, 1.12, 1] }
                  }
                  viewport={{ amount: 0.6 }}
                  transition={{
                    duration: 3.2 + index * 0.35,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <StarMark
                    size="xs"
                    color={index % 2 === 0 ? '#4A9FAE' : '#C4974A'}
                    className="opacity-75"
                  />
                </motion.div>
              </div>

              <p className="font-sans text-[13.5px] leading-6" style={{ color: '#8FB2BE' }}>
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
