'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import { EASING, fadeIn } from '@/lib/motion'
import { cn } from '@/lib/utils'

const portfolioProjectOrder = ['kestrel', 'chirpie', 'quail'] as const

const workProjectSpotlights: Record<
  string,
  {
    description: string
    metrics: { value: string; label: string }[]
    glow: string
  }
> = {
  kestrel: {
    description:
      'Turns job descriptions into fit scores, skill gaps, and an action roadmap users can trust.',
    metrics: [
      { value: '30K+', label: 'records analyzed' },
      { value: '4', label: 'fit signals' },
      { value: '1', label: 'action roadmap' },
    ],
    glow: '28% 22%',
  },
  chirpie: {
    description:
      'Turns multi-source news into explainable digests with confidence and attribution built in.',
    metrics: [
      { value: '3+', label: 'source streams' },
      { value: '4', label: 'trust cues' },
      { value: '1', label: 'digest loop' },
    ],
    glow: '72% 26%',
  },
  quail: {
    description:
      'Turns inbox overload into prioritized action lanes so users know what needs attention first.',
    metrics: [
      { value: '3', label: 'priority signals' },
      { value: '4', label: 'action lanes' },
      { value: '1', label: 'triage pipeline' },
    ],
    glow: '34% 72%',
  },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, delay: index * 0.08, ease: EASING },
  }),
}

// ── Project card ──────────────────────────────────────────────────────────────

function WorkProjectCard({
  project,
  reversed,
  index,
}: {
  project: Project
  reversed: boolean
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const spotlight = workProjectSpotlights[project.slug] ?? {
    description: project.tagline,
    metrics: [
      { value: '3', label: 'product signals' },
      { value: String(project.stack.length), label: 'core tools' },
      { value: String(project.year), label: 'built' },
    ],
    glow: '34% 28%',
  }
  const isComingSoon = project.launchStatus === 'comingSoon'

  return (
    <motion.article
      custom={index}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: `0 30px 82px rgba(0,0,0,0.68), 0 0 0 1px ${project.panelAccentColor}36`,
            }
      }
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[28px]"
      style={{
        background: isComingSoon
          ? 'linear-gradient(135deg, rgba(15,42,61,0.66), rgba(9,20,36,0.88) 48%, rgba(8,18,30,0.96))'
          : 'linear-gradient(135deg, rgba(15,42,61,0.78), rgba(9,20,36,0.90) 48%, rgba(8,18,30,0.96))',
        border: `1px solid ${project.panelAccentColor}${isComingSoon ? '1F' : '24'}`,
        boxShadow: isComingSoon
          ? '0 16px 48px rgba(0,0,0,0.36)'
          : '0 18px 58px rgba(0,0,0,0.40)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotlight.glow}, ${project.panelAccentColor}20 0%, transparent 34%), radial-gradient(circle at 88% 12%, rgba(196,151,74,0.08) 0%, transparent 24%)`,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-px rounded-[27px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(120deg, transparent 0%, ${project.panelAccentColor}1A 28%, rgba(196,151,74,0.12) 48%, transparent 68%)`,
        }}
        aria-hidden
      />

      {!reduceMotion && (
        <div
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 opacity-0 blur-2xl transition-[opacity,transform] duration-[1400ms] ease-out group-hover:translate-x-[330%] group-hover:opacity-35"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}24, rgba(196,151,74,0.12), transparent)`,
          }}
          aria-hidden
        />
      )}

      <div className="pointer-events-none absolute left-5 top-5 z-20 opacity-35 transition-opacity duration-500 group-hover:opacity-70">
        <StarMark size="xs" color={index === 1 ? '#C4974A' : project.panelAccentColor} />
      </div>

      <motion.div
        className="pointer-events-none absolute right-7 top-7 z-20"
        initial={false}
        whileInView={
          reduceMotion
            ? undefined
            : { opacity: [0.2, 0.85, 0.2], scale: [0.85, 1.18, 0.85], rotate: [0, 18, 0] }
        }
        viewport={{ amount: 0.35 }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
      >
        <StarMark size="xs" color="#C4974A" />
      </motion.div>

      <div className={`relative z-10 flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''}`}>

        {/* ── Media column ── */}
        <div
          className="relative min-h-[300px] overflow-hidden sm:min-h-[340px] lg:min-h-[430px] lg:w-[45%] xl:min-h-[460px] shrink-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${project.panelAccentColor}12 0%, rgba(10,22,40,0.06) 42%, rgba(10,22,40,0.72) 100%)`,
            }}
          />

          <ProjectFloatingScreenshots
            project={project}
            priority={index === 0}
            showWatermark
            imageSizes="(max-width: 1024px) 100vw, 560px"
            className={cn(
              'transition-transform duration-700 ease-out group-hover:scale-[1.025]',
              isComingSoon && 'opacity-[0.78] saturate-[0.84]',
            )}
          />

          <div
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: 'rgba(13,30,53,0.82)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${project.panelAccentColor}32`,
            }}
          >
            <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
              {isComingSoon ? 'Preview' : String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Content column ── */}
        <div className="flex flex-col px-6 py-7 sm:px-8 lg:flex-1 lg:px-9 lg:py-8 xl:px-10">

          {/* Category tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                style={{
                  background: `${project.panelAccentColor}16`,
                  border: `1px solid ${project.panelAccentColor}32`,
                  color: '#C3D8E1',
                }}
              >
                {tag}
              </motion.span>
            ))}
            {isComingSoon && (
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                style={{
                  background: 'rgba(196,151,74,0.10)',
                  border: '1px solid rgba(196,151,74,0.28)',
                  color: '#D8B76E',
                }}
              >
                Coming Soon
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-[clamp(2.45rem,5vw,4.65rem)] leading-[0.9] text-text-base">
              {project.name}
            </h2>

            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted/80 sm:pb-1">
              {project.year} · {project.role}
            </p>
          </div>

          <p className="mt-4 max-w-[620px] font-sans text-[15px] leading-relaxed text-[#B8D0DC]">
            {spotlight.description}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {spotlight.metrics.map((metric, metricIndex) => (
              <motion.div
                key={`${project.slug}-${metric.label}`}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        borderColor: `${project.panelAccentColor}66`,
                        backgroundColor: `${project.panelAccentColor}14`,
                      }
                }
                transition={{ duration: 0.22, ease: EASING }}
                className="relative overflow-hidden rounded-2xl px-2.5 py-3 text-center"
                style={{
                  background: 'rgba(8,18,30,0.48)',
                  border: `1px solid ${project.panelAccentColor}26`,
                }}
              >
                <motion.div
                  className="absolute inset-x-2 top-0 h-px"
                  initial={false}
                  whileInView={
                    reduceMotion
                      ? undefined
                      : { opacity: metricIndex === 1 ? [0.2, 0.85, 0.2] : [0.15, 0.48, 0.15] }
                  }
                  viewport={{ amount: 0.65 }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: metricIndex * 0.35,
                  }}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}, transparent)`,
                  }}
                />
                <span
                  className="block font-display text-[clamp(1.9rem,4vw,3rem)] leading-none"
                  style={{ color: metricIndex === 0 ? project.panelAccentColor : '#E6EEF2' }}
                >
                  {metric.value}
                </span>
                <span className="mt-1.5 block font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-[#8DAFC0]">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stack pills */}
          {project.stack && project.stack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.stack.map((s, stackIndex) => (
                <motion.span
                  key={s}
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
                  transition={{ duration: 0.2, ease: EASING }}
                  className="rounded-full px-3 py-1.5 font-mono text-[10px]"
                  style={{
                    background:
                      stackIndex === 0 ? `${project.panelAccentColor}18` : 'rgba(15,42,61,0.72)',
                    border:
                      stackIndex === 0
                        ? `1px solid ${project.panelAccentColor}40`
                        : '1px solid rgba(74,159,174,0.18)',
                    color: stackIndex === 0 ? '#D7EEF1' : '#8EB6C4',
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          )}

          {/* CTAs */}
          {isComingSoon ? (
            <div className="mt-auto pt-6">
              <div
                className="flex flex-wrap items-center gap-2.5 rounded-2xl px-4 py-3"
                style={{
                  background: 'rgba(8,18,30,0.44)',
                  border: '1px solid rgba(196,151,74,0.18)',
                }}
              >
                <StarMark size="xs" color="#C4974A" className="opacity-70" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#D8B76E]">
                  Coming Soon
                </span>
                <span className="font-sans text-[12.5px] text-[#7FAFBB]">
                  Case study, demo, and live access are being finalized.
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
              <HoverSparkle className="inline-flex">
                <StarburstButton href={`/projects/${project.slug}`} variant="primary" size="sm">
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
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const visibleProjects = portfolioProjectOrder
    .map((slug) => projects.find((project) => project.slug === slug && project.visible))
    .filter((project): project is Project => Boolean(project))

  return (
    <main className="pt-16 min-h-screen">
      <Section paddingY="lg">
        <div className="absolute top-32 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar size={480} opacity={0.03} direction={-1} />
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div
            className="section-eyebrow mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Portfolio
            </span>
          </div>

          <h1 className="font-display text-hero text-text-base leading-none">Selected Work</h1>

          <p
            className="font-sans mt-5 max-w-[520px] leading-relaxed"
            style={{ fontSize: '16px', color: '#A8C5D1' }}
          >
            Kestrel is live as the flagship product; Chirpie and Quail Mail are previewed here
            while their case studies and demos are being finalized.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:gap-9">
          {visibleProjects.map((project, i) => (
            <WorkProjectCard
              key={project.slug}
              project={project}
              reversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </Section>
    </main>
  )
}
