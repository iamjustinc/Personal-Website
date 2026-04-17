'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { EASING, fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

const careerCopyByRole: Record<string, string> = {
  'Project Lead & Data Analyst':
    'Built predictive workflows across 30K+ records, translating model outputs into risk scores and dashboards stakeholders could act on.',
  'Senior Project Lead':
    'Redesigned recruitment and scheduling workflows across 100+ sessions, lifting completion 63% through clearer handoffs and operational visibility.',
  'Intern Data Analyst':
    'Reduced manual analysis time by 70% through Python/R pipelines and translated 200+ fMRI sessions into stakeholder-ready insight.',
  'Research Data Analyst':
    'Built SQL, R, Excel, and Tableau tracking systems that reduced coordination friction and standardized study operations across teams.',
  'Independent Product Builder':
    'Shipped Kestrel as the live flagship while developing Quail Mail and Chirpie into polished product previews around inbox and news workflows.',
}

const ambientStars = [
  { left: '9%', top: '14%', delay: 0, color: '#C4974A' },
  { left: '86%', top: '10%', delay: 0.7, color: '#4A9FAE' },
  { left: '76%', top: '42%', delay: 1.4, color: '#C4974A' },
  { left: '14%', top: '72%', delay: 2.1, color: '#4A9FAE' },
  { left: '92%', top: '82%', delay: 2.8, color: '#62BDB8' },
]

/**
 * Career section — cinematic vertical timeline.
 *
 * Each career item is a milestone on the journey. The left side shows
 * a vertical timeline line with a star marker at each entry.
 * Star markers for the current role glow gold; past roles are teal.
 *
 * Content lives in data/site.ts → siteConfig.career[].
 * Update the placeholder entries with your real experience.
 */
export function CareerSection() {
  const shouldReduce = useReducedMotion()
  const stagger = useMotionSafe(staggerContainer(0.12))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  const items = siteConfig.career
  if (!items || items.length === 0) return null

  return (
    <Section id="career" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-[6%] top-10 h-56 w-56 rounded-full blur-3xl"
          style={{ background: 'rgba(15,122,122,0.08)' }}
        />
        <div
          className="absolute bottom-20 right-[8%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(196,151,74,0.055)' }}
        />
        {ambientStars.map((star) => (
          <motion.span
            key={`${star.left}-${star.top}`}
            className="absolute"
            style={{ left: star.left, top: star.top }}
            animate={
              shouldReduce
                ? undefined
                : { opacity: [0.16, 0.72, 0.16], scale: [0.85, 1.18, 0.85] }
            }
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          >
            <StarMark size="xs" color={star.color} className="opacity-60" />
          </motion.span>
        ))}
      </div>

      {/* Section heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-14"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
          style={{
            background: 'rgba(15,122,122,0.08)',
            border: '1px solid rgba(15,122,122,0.22)',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
            Career Journey
          </span>
        </div>

        <h2 className="font-display text-h1 text-text-base leading-tight">
          Where technical work became{' '}
          <span style={{ color: '#4A9FAE' }}>clear value</span>
        </h2>
        <p
          className="font-sans mt-3 max-w-[560px] leading-relaxed"
          style={{ fontSize: '15px', color: '#A8C5D1' }}
        >
          A timeline of data systems, workflow redesigns, and AI product demos built around the SE
          motion: discover the problem, explain the system, and make the next step obvious.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[18px] top-0 bottom-0 w-px origin-top hidden md:block"
          style={{
            background:
              'linear-gradient(to bottom, rgba(196,151,74,0.42), rgba(74,159,174,0.44) 42%, rgba(15,122,122,0.12) 90%, transparent)',
            boxShadow: '0 0 18px rgba(74,159,174,0.18)',
          }}
        />

        {/* Items */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          className="flex flex-col gap-6"
        >
          {items.map((item, index) => {
            const accent = item.current ? '#C4974A' : index % 2 === 0 ? '#4A9FAE' : '#62BDB8'
            const description = careerCopyByRole[item.role] ?? item.description

            return (
              <motion.div
                key={`${item.role}-${item.company}`}
                variants={up}
                className="group relative flex gap-8 md:gap-10"
              >
                {/* Timeline marker */}
                <div className="relative shrink-0 hidden md:flex flex-col items-center" style={{ width: 38 }}>
                  {/* Star node */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center mt-1"
                    animate={
                      shouldReduce
                        ? undefined
                        : {
                            boxShadow: item.current
                              ? [
                                  '0 0 14px rgba(196,151,74,0.22)',
                                  '0 0 28px rgba(196,151,74,0.42)',
                                  '0 0 14px rgba(196,151,74,0.22)',
                                ]
                              : [
                                  '0 0 10px rgba(74,159,174,0.14)',
                                  '0 0 22px rgba(74,159,174,0.28)',
                                  '0 0 10px rgba(74,159,174,0.14)',
                                ],
                          }
                    }
                    transition={{
                      duration: item.current ? 3 : 4.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.25,
                    }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: item.current
                        ? 'rgba(196,151,74,0.13)'
                        : 'rgba(15,122,122,0.11)',
                      border: `1px solid ${item.current ? 'rgba(196,151,74,0.42)' : 'rgba(74,159,174,0.30)'}`,
                    }}
                  >
                    <StarMark
                      size="xs"
                      color={accent}
                      className={item.current ? 'opacity-95' : 'opacity-75'}
                    />
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={
                    shouldReduce
                      ? undefined
                      : {
                          y: -5,
                          boxShadow: `0 18px 56px rgba(0,0,0,0.52), 0 0 0 1px ${accent}42`,
                        }
                  }
                  transition={{ duration: 0.28, ease: EASING }}
                  className="relative flex-1 overflow-hidden rounded-2xl p-6 md:p-7"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(15,42,61,0.60) 0%, rgba(10,33,50,0.48) 54%, rgba(8,27,42,0.74) 100%)',
                    border: `1px solid ${item.current ? 'rgba(196,151,74,0.24)' : 'rgba(74,159,174,0.18)'}`,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.27), inset 0 1px 0 rgba(255,255,255,0.025)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}88, rgba(196,151,74,0.32), transparent)`,
                    }}
                    aria-hidden
                  />

                  {!shouldReduce && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                      animate={{ x: ['0%', '430%'] }}
                      transition={{
                        duration: 5.8,
                        repeat: Infinity,
                        repeatDelay: 2.8,
                        ease: 'easeInOut',
                        delay: index * 0.22,
                      }}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent}16, rgba(196,151,74,0.09), transparent)`,
                      }}
                    />
                  )}

                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-5 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                    animate={
                      shouldReduce
                        ? undefined
                        : { rotate: [0, 18, 0], scale: [0.92, 1.12, 0.92] }
                    }
                    transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                  >
                    <StarMark size="xs" color={item.current ? '#C4974A' : accent} />
                  </motion.div>

                  {/* Header row */}
                  <div className="relative flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {/* Mobile-only star marker */}
                        <div className="md:hidden">
                          <StarMark
                            size="xs"
                            color={accent}
                            className="opacity-80"
                          />
                        </div>
                        <h3 className="font-display text-h3 text-text-base leading-tight">
                          {item.role}
                        </h3>
                      </div>
                      <p className="font-sans text-sm font-medium" style={{ color: '#6ED0D3' }}>
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.current && (
                        <span
                          className="font-mono text-[9.5px] uppercase tracking-wider rounded-full px-2.5 py-1 flex items-center gap-1.5"
                          style={{
                            background: 'rgba(196,151,74,0.11)',
                            border: '1px solid rgba(196,151,74,0.30)',
                            color: '#D8B76E',
                            boxShadow: '0 0 18px rgba(196,151,74,0.10)',
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: '#C4974A', boxShadow: '0 0 6px rgba(196,151,74,0.75)' }}
                          />
                          Current
                        </span>
                      )}
                      <span
                        className="font-mono text-[10px] tracking-wider rounded-full px-2.5 py-1"
                        style={{
                          color: 'rgba(199,222,230,0.72)',
                          background: 'rgba(8,18,30,0.34)',
                          border: '1px solid rgba(74,159,174,0.14)',
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="relative max-w-[72ch] font-sans text-[14px] leading-relaxed"
                    style={{ color: '#A8C5D1' }}
                  >
                    {description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className={cn('relative flex flex-wrap gap-2 mt-4')}>
                      {item.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          whileHover={shouldReduce ? undefined : { y: -2 }}
                          transition={{ duration: 0.18, ease: EASING }}
                          className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background:
                              tagIndex === 0 ? `${accent}16` : 'rgba(15,42,61,0.78)',
                            border:
                              tagIndex === 0
                                ? `1px solid ${accent}36`
                                : '1px solid rgba(74,159,174,0.16)',
                            color: tagIndex === 0 ? '#D7EEF1' : '#7FAFBB',
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
