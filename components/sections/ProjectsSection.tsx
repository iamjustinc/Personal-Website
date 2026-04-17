'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

const projectSpotlights: Record<
  string,
  {
    description: string
    metrics: { value: string; label: string }[]
  }
> = {
  kestrel: {
    description:
      'Turns role requirements into readiness scores, gap analysis, and a concrete career roadmap.',
    metrics: [
      { value: '1 JD', label: 'to roadmap' },
      { value: '4', label: 'fit signals' },
      { value: '5', label: 'demo views' },
    ],
  },
  quail: {
    description:
      'Turns inbox overload into a prioritized triage pipeline with clear next actions.',
    metrics: [
      { value: '1', label: 'inbox flow' },
      { value: '3', label: 'priority signals' },
      { value: '4', label: 'action lanes' },
    ],
  },
  chirpie: {
    description:
      'Turns multi-source news into concise, source-aware digests with confidence cues.',
    metrics: [
      { value: '3+', label: 'source streams' },
      { value: '4', label: 'trust cues' },
      { value: '1', label: 'digest loop' },
    ],
  },
}

// ── Section ──────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const shouldReduce = useReducedMotion()
  const stagger = useMotionSafe(staggerContainer(0.14))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  const visibleProjects = ['kestrel', 'chirpie', 'quail'].flatMap((slug) =>
    projects.filter((p) => p.slug === slug && p.visible && p.homepageVisible),
  )

  return (
    <Section id="projects" paddingY="lg">
      {/* Heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          style={{
            background: 'rgba(15,122,122,0.08)',
            border: '1px solid rgba(15,122,122,0.22)',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
            Featured Work
          </span>
        </div>
        <h2 className="font-display text-h1 text-text-base">Selected Work</h2>
        <p className="font-sans text-text-muted mt-3 max-w-[560px]" style={{ fontSize: '15px' }}>
          Flagship AI product built end-to-end to show demo craft, workflow thinking, and technical
          execution.
        </p>
      </motion.div>

      {/* Project cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="flex flex-col gap-9"
      >
        {visibleProjects.map((project, index) => {
          const isReversed = index % 2 === 1
          const spotlight = projectSpotlights[project.slug] ?? {
            description: project.tagline,
            metrics: [
              { value: 'AI', label: 'workflow' },
              { value: '1', label: 'demo path' },
              { value: '3', label: 'signals' },
            ],
          }

          return (
            <motion.div
              key={project.slug}
              variants={up}
              whileHover={
                shouldReduce
                  ? {}
                  : {
                      y: -5,
                      boxShadow: `0 28px 72px rgba(0,0,0,0.62), 0 0 0 1px ${project.panelAccentColor}38`,
                    }
              }
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative grid overflow-hidden rounded-[28px] cursor-default lg:grid-cols-[1.04fr_0.96fr]',
              )}
              style={{
                background:
                  'linear-gradient(145deg, rgba(15,42,61,0.70) 0%, rgba(10,33,50,0.58) 54%, rgba(8,27,42,0.82) 100%)',
                border: `1px solid ${project.panelAccentColor}26`,
                boxShadow: '0 16px 48px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.025)',
              }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${project.panelAccentColor}66 26%, rgba(196,151,74,0.46) 62%, transparent 100%)`,
                }}
              />

              <motion.div
                aria-hidden
                className="absolute inset-y-0 w-[28%] -skew-x-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  left: '-38%',
                  background: `linear-gradient(90deg, transparent 0%, ${project.panelAccentColor}12 48%, rgba(196,151,74,0.08) 58%, transparent 100%)`,
                }}
                animate={shouldReduce ? {} : { x: ['0%', '520%'] }}
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                aria-hidden
                className="absolute left-5 top-5 z-20"
                animate={
                  shouldReduce
                    ? {}
                    : { opacity: [0.32, 0.78, 0.32], scale: [0.95, 1.12, 0.95] }
                }
                transition={{
                  duration: 3.2 + index * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <StarMark size="xs" color="#C4974A" className="opacity-80" />
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute bottom-6 right-6 z-20"
                animate={
                  shouldReduce
                    ? {}
                    : { opacity: [0.22, 0.64, 0.22], y: [0, -5, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4 + index * 0.2,
                }}
              >
                <StarMark size="xs" color={project.panelAccentColor} className="opacity-70" />
              </motion.div>

              {/* ── Media ── */}
              <div
                className={cn(
                  'relative min-h-[320px] overflow-hidden sm:min-h-[390px] lg:min-h-[560px]',
                  isReversed ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 28% 28%, ${project.panelAccentColor}18 0%, transparent 50%), linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.12) 42%, rgba(10,22,40,0.72) 100%)`,
                  }}
                />

                <motion.div
                  className="absolute inset-0"
                  whileHover={shouldReduce ? {} : { scale: 1.012 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectFloatingScreenshots
                    project={project}
                    priority={index === 0}
                    imageSizes="(max-width: 1024px) 100vw, 560px"
                  />
                </motion.div>

                <div
                  className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: 'rgba(13,30,53,0.86)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${project.panelAccentColor}30`,
                    boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
                  }}
                >
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-75" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                    Case {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* ── Content ── */}
              <div
                className={cn(
                  'relative z-10 flex flex-col px-7 py-9 sm:px-8 lg:px-11 lg:py-11',
                  isReversed ? 'lg:order-1' : 'lg:order-2',
                )}
              >
                {/* Category tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: `${project.panelAccentColor}14`,
                        border: `1px solid ${project.panelAccentColor}30`,
                        color: '#B8DDE6',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-h1 text-text-base leading-tight">
                  {project.name}
                </h3>

                <p
                  className="mt-4 max-w-[540px] font-sans text-[15px] leading-7"
                  style={{ color: '#B8D0DC' }}
                >
                  {spotlight.description}
                </p>

                {/* Impact metrics */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {spotlight.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={`${project.slug}-${metric.label}`}
                      whileHover={
                        shouldReduce
                          ? {}
                          : {
                              y: -2,
                              backgroundColor: 'rgba(15,42,61,0.72)',
                            }
                      }
                      transition={{ duration: 0.2 }}
                      className="relative overflow-hidden rounded-[18px] px-3.5 py-4 sm:px-4"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10,33,50,0.70) 0%, rgba(8,27,42,0.54) 100%)',
                        border: `1px solid ${project.panelAccentColor}24`,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.025)',
                      }}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px opacity-60"
                        style={{
                          background:
                            metricIndex === 1
                              ? 'linear-gradient(90deg, transparent, rgba(196,151,74,0.55), transparent)'
                              : `linear-gradient(90deg, transparent, ${project.panelAccentColor}66, transparent)`,
                        }}
                      />
                      <div className="font-display text-[28px] leading-none text-text-base sm:text-[34px]">
                        {metric.value}
                      </div>
                      <p
                        className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.11em]"
                        style={{ color: metricIndex === 1 ? '#D8B76E' : '#7EE7F2' }}
                      >
                        {metric.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Stack pills */}
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <StarMark size="xs" color={project.panelAccentColor} className="opacity-70" />
                    <span
                      className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
                      style={{ color: '#7FAFBB' }}
                    >
                      Build stack
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {project.stack.slice(0, 5).map((s, stackIndex) => (
                      <motion.span
                        key={s}
                        whileHover={shouldReduce ? {} : { y: -2 }}
                        transition={{ duration: 0.18 }}
                        className="font-mono text-[10px] px-3 py-1.5 rounded-full"
                        style={{
                          background:
                            stackIndex === 0
                              ? `${project.panelAccentColor}1F`
                              : 'rgba(15,42,61,0.82)',
                          border:
                            stackIndex === 0
                              ? `1px solid ${project.panelAccentColor}42`
                              : '1px solid rgba(74,159,174,0.22)',
                          color: stackIndex === 0 ? '#D5F7FA' : '#9CC5D0',
                          boxShadow:
                            stackIndex === 0 ? `0 0 18px ${project.panelAccentColor}12` : 'none',
                        }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div
                  className="mt-auto flex flex-wrap gap-2.5 pt-8"
                  style={{ borderTop: '1px solid rgba(74,159,174,0.12)' }}
                >
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={`/projects/${project.slug}`}
                      variant="primary"
                      size="sm"
                    >
                      View Case Study
                    </StarburstButton>
                  </HoverSparkle>

                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={`/projects/${project.slug}/demo`}
                      variant="secondary"
                      size="sm"
                    >
                      Demo
                    </StarburstButton>
                  </HoverSparkle>

                  {project.liveUrl && (
                    <HoverSparkle className="inline-flex">
                      <StarburstButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                      >
                        Try It Out
                      </StarburstButton>
                    </HoverSparkle>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
