'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
import { Starburst } from '@/components/ui/Starburst'
import { EASING, fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

const careerCopyByRole: Record<string, string> = {
  'Project Lead & Data Analyst':
    'Owned predictive pipelines across 30K+ records, turning model outputs into risk-scoring dashboards stakeholders could use for decision support.',
  'Senior Project Lead':
    'Designed recruitment, scheduling, and operational dashboard systems across 100+ sessions, improving completion 63% and giving teams cleaner coordination data.',
  'Intern Data Analyst':
    'Built Python/R pipelines for 200+ fMRI sessions, reduced manual analysis time by 70%, and walked non-technical stakeholders through outputs and tradeoffs.',
  'Research Data Analyst':
    'Standardized PETRUSHKA coordination with Excel, R, SQL, and Tableau tracking systems, reducing handoff friction across clinical and research teams.',
  'Independent Product Builder':
    'Built Kestrel as a live AI decision-support product, plus Quail Mail and Chirpie previews around triage logic, structured outputs, attribution, and explainability.',
}

const careerTagsByRole: Record<string, string[]> = {
  'Project Lead & Data Analyst': ['Decision Support', 'Data Pipelines', 'Stakeholder Translation'],
  'Senior Project Lead': ['Operational Dashboards', 'Workflow Design', 'Cross-Functional Alignment'],
  'Intern Data Analyst': ['Python/R Pipelines', 'Technical Walkthroughs', 'Stakeholder Translation'],
  'Research Data Analyst': ['Tracking Systems', 'SQL + Tableau', 'Coordination Systems'],
  'Independent Product Builder': ['Product Walkthroughs', 'OpenAI Integration', 'Explainability'],
}

const ambientStars = [
  { left: '9%',  top: '14%', delay: 0,   color: '#C4974A' },
  { left: '86%', top: '10%', delay: 0.7, color: '#4A9FAE' },
  { left: '76%', top: '42%', delay: 1.4, color: '#C4974A' },
  { left: '14%', top: '72%', delay: 2.1, color: '#4A9FAE' },
  { left: '92%', top: '82%', delay: 2.8, color: '#62BDB8' },
  /* extra ambient — fills bilateral emptiness in the timeline */
  { left: '42%', top: '44%', delay: 3.5, color: '#7EE7F2' },
  { left: '28%', top: '28%', delay: 4.2, color: '#C4974A' },
  { left: '68%', top: '68%', delay: 0.3, color: '#4A9FAE' },
]

/**
 * Career section: cinematic vertical timeline.
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
        <StarField
          className="opacity-78"
          stars={[
            { x: '6%',  y: '34%', size: 1.0, color: '#7EE7F2', opacity: 0.28, halo: 1.1 },
            { x: '21%', y: '88%', size: 1.3, color: '#F4D58D', opacity: 0.30, halo: 1.3 },
            { x: '48%', y: '7%',  size: 1.0, color: '#E6EEF2', opacity: 0.24, halo: 1.0 },
            { x: '64%', y: '58%', size: 1.0, color: '#7EE7F2', opacity: 0.24, halo: 1.0 },
            { x: '89%', y: '28%', size: 1.4, color: '#C4974A', opacity: 0.28, halo: 1.2, twinkle: true, delay: 2.1, duration: 6.0 },
            /* — bilateral density fill — */
            { x: '12%', y: '16%', size: 1.2, color: '#F4D58D', opacity: 0.32, halo: 1.3 },
            { x: '4%',  y: '62%', size: 1.0, color: '#A8C5D1', opacity: 0.26, halo: 1.0 },
            { x: '34%', y: '44%', size: 1.1, color: '#7EE7F2', opacity: 0.24, halo: 1.1 },
            { x: '56%', y: '76%', size: 1.0, color: '#E6EEF2', opacity: 0.22, halo: 1.0 },
            { x: '72%', y: '18%', size: 1.3, color: '#C4974A', opacity: 0.30, halo: 1.3 },
            { x: '82%', y: '68%', size: 1.0, color: '#7EE7F2', opacity: 0.26, halo: 1.0 },
            { x: '94%', y: '46%', size: 1.1, color: '#A8C5D1', opacity: 0.24, halo: 1.0 },
          ]}
        />
        {/* Starburst anchor — upper-right, teal, soft pulse */}
        <div className="absolute right-[3%] top-[6%] hidden sm:block">
          <Starburst size="sm" color="#4A9FAE" haloColor="#7EE7F2" opacity={0.42} pulse delay={0.8} duration={7.6} />
        </div>

        {/* Right-side constellation — teal, 4-point vertical */}
        <div className="absolute right-[6%] top-[24%] hidden lg:block">
          <Constellation
            width={96}
            height={132}
            color="#4A9FAE"
            lineOpacity={0.18}
            pointOpacity={0.56}
            points={[
              { x: 12, y: 18,  size: 1.2 },
              { x: 58, y: 34,  size: 1.5 },
              { x: 38, y: 78,  size: 1.1, twinkle: true, delay: 1.6 },
              { x: 82, y: 118, size: 1.3 },
            ]}
            connections={[[0, 1], [1, 2], [2, 3]]}
          />
        </div>

        {/* Left-side constellation — gold, 4-point, mirrors right side */}
        <div className="absolute left-[2%] bottom-[26%] hidden lg:block">
          <Constellation
            width={78}
            height={58}
            color="#C4974A"
            lineOpacity={0.18}
            pointOpacity={0.60}
            points={[
              { x: 6,  y: 50, size: 1.2 },
              { x: 28, y: 22, size: 1.5 },
              { x: 58, y: 38, size: 1.1 },
              { x: 72, y: 14, size: 1.3 },
            ]}
            connections={[[0, 1], [1, 2], [2, 3]]}
          />
        </div>

        {/* Faint orbital arc — right side lower, echoes the timeline rail direction */}
        <svg
          className="absolute right-[2%] bottom-[16%] hidden opacity-[0.16] lg:block"
          style={{ width: 200, height: 140 }}
          viewBox="0 0 200 140"
          fill="none"
        >
          <path
            d="M8 132 C58 88 118 72 194 108"
            stroke="rgba(126,231,242,0.44)"
            strokeWidth="0.8"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          <path
            d="M14 100 C68 64 128 54 196 80"
            stroke="rgba(196,151,74,0.28)"
            strokeWidth="0.6"
            strokeDasharray="1.5 16"
            strokeLinecap="round"
          />
        </svg>
        {ambientStars.map((star) => (
          <motion.span
            key={`${star.left}-${star.top}`}
            className="absolute"
            style={{ left: star.left, top: star.top }}
            initial={false}
            whileInView={
              shouldReduce
                ? undefined
                : { opacity: [0.16, 0.72, 0.16], scale: [0.85, 1.18, 0.85] }
            }
            viewport={{ amount: 0.25 }}
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
          className="section-eyebrow mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
            Paths So Far
          </span>
        </div>

        <h2 className="font-display text-h1 text-text-base leading-tight">
          Technical ownership across{' '}
          <span style={{ color: '#4A9FAE' }}>systems</span>
        </h2>
        <p
          className="font-sans mt-3 max-w-[560px] leading-relaxed"
          style={{ fontSize: '12px', color: '#A8C5D1' }}
        >
          Across research, operations, and product work, I have built pipelines, dashboards,
          walkthroughs, and workflow systems that help stakeholders understand what to do next.
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

        {/*
          Drifting starlight spark — one gentle point of light travels down the
          timeline on a slow 14s loop. "Directional / living" motion that
          belongs to this section only. Uses compositor-safe CSS animation
          (translateY + opacity), zero JS cost.
        */}
        {!shouldReduce && (
          <div
            aria-hidden
            className="timeline-drift-spark hidden md:block"
          />
        )}

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
            const tags = careerTagsByRole[item.role] ?? item.tags

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
                    initial={false}
                    whileInView={
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
                    viewport={{ amount: 0.65 }}
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
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 blur-sm transition-[opacity,transform] duration-700 ease-out group-hover:translate-x-[430%] group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent}16, rgba(196,151,74,0.09), transparent)`,
                      }}
                    />
                  )}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-5 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:rotate-12 group-hover:scale-110 group-hover:opacity-80"
                  >
                    <StarMark size="xs" color={item.current ? '#C4974A' : accent} />
                  </div>

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
                  {tags && tags.length > 0 && (
                    <div className={cn('relative flex flex-wrap gap-2 mt-4')}>
                      {tags.map((tag, tagIndex) => (
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
