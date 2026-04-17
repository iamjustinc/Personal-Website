'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Truncates to the first sentence if it fits, otherwise hard-trims.
function shortenText(text: string | undefined, max = 120) {
  if (!text) return ''
  const clean = text.replace(/\s+/g, ' ').trim()
  const first = clean.match(/.*?[.!?](\s|$)/)?.[0]?.trim()
  if (first && first.length <= max) return first
  if (clean.length <= max) return clean
  const trimmed = clean.slice(0, max)
  return `${trimmed.slice(0, Math.max(trimmed.lastIndexOf(' '), max - 18)).trim()}…`
}

// ── Floating screenshot composition ─────────────────────────────────────────

function FloatingProjectVisual({
  project,
  priority = false,
}: {
  project: (typeof projects)[number]
  priority?: boolean
}) {
  const landingShot = project.screenshots?.[0] || project.thumbnail
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very subtle ambient glow — avoids the "display panel" feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 25%, ${project.panelAccentColor}10 0%, transparent 52%)`,
        }}
      />

      {/* Landing screenshot — large, bleeds toward top-left */}
      {landingShot && (
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-1.5, -0.5, -1.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[1%] top-[3%] h-[80%] w-[74%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 22px 58px rgba(0,0,0,0.50)' }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing view`}
            fill
            sizes="(max-width: 1024px) 100vw, 440px"
            className="object-cover object-top"
            priority={priority}
          />
        </motion.div>
      )}

      {/* Interface screenshot — slightly smaller, bleeds toward bottom-right */}
      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [2, 1, 2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute right-[1%] bottom-[2%] h-[62%] w-[72%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 26px 64px rgba(0,0,0,0.54)' }}
        >
          <Image
            src={interfaceShot}
            alt={`${project.name} interface view`}
            fill
            sizes="(max-width: 1024px) 100vw, 440px"
            className="object-cover object-center"
          />
        </motion.div>
      )}

      {/* Accent glow under front screenshot */}
      <div
        className="absolute right-[8%] bottom-[1%] h-8 w-[40%] blur-2xl rounded-full pointer-events-none"
        style={{ background: `${project.panelAccentColor}20` }}
      />

      {/* Corner marks */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-35" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-30" />
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const stagger = useMotionSafe(staggerContainer(0.14))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  const visibleProjects = [
    ...projects.filter((p) => p.visible && p.homepageVisible && p.featured),
    ...projects
      .filter((p) => p.visible && p.homepageVisible && !p.featured)
      .sort((a, b) => a.order - b.order),
  ]

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
        <p className="font-sans text-text-muted mt-3 max-w-[540px]" style={{ fontSize: '15px' }}>
          Three products built end-to-end to show product thinking, implementation, and technical
          communication.
        </p>
      </motion.div>

      {/* Project cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="flex flex-col gap-8"
      >
        {visibleProjects.map((project, index) => {
          const isReversed = index % 2 === 1
          const shortTagline = shortenText(project.tagline, 100)
          const shortOutcome = shortenText(project.outcome, 88)

          return (
            <motion.div
              key={project.slug}
              variants={up}
              whileHover={{
                y: -5,
                boxShadow: '0 24px 68px rgba(0,0,0,0.64), 0 0 0 1px rgba(15,122,122,0.28)',
              }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn('grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden cursor-default')}
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
              }}
            >
              {/* ── Media ── */}
              <div
                className={cn(
                  'relative overflow-hidden min-h-[320px] lg:min-h-[500px]',
                  isReversed ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                {/* Very light panel tint — screenshots should read as product UI, not posters */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.10) 40%, rgba(10,22,40,0.65) 100%)`,
                  }}
                />
                <FloatingProjectVisual project={project} priority={index === 0} />

                {/* Project index badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
                  style={{
                    background: 'rgba(13,30,53,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${project.panelAccentColor}28`,
                  }}
                >
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* ── Text ──
                  flex-col with NO justify-center: content stacks from top, no overflow risk.
                  mt-auto on CTA row: always rendered at the card bottom regardless of content height.
                  Stack pills: kept per spec.
                  Layout math (lg): min-h 500px − py-9 72px = 428px available.
                  Content ≈ 328px → 100px headroom → Demo is always visible.
              ── */}
              <div
                className={cn(
                  'flex flex-col px-7 lg:px-10 py-7 lg:py-9',
                  isReversed ? 'lg:order-1' : 'lg:order-2',
                )}
              >
                {/* Category tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: `${project.panelAccentColor}12`,
                        border: `1px solid ${project.panelAccentColor}24`,
                        color: '#A8C5D1',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-h1 text-text-base leading-tight">
                  {project.name}
                </h3>

                {/* Meta */}
                <p className="font-mono text-[10.5px] text-text-muted mt-2 tracking-wider uppercase">
                  {project.year} · {project.role}
                </p>

                {/* Tagline */}
                <p
                  className="font-sans mt-3 leading-relaxed"
                  style={{ fontSize: '14.5px', color: '#A8C5D1' }}
                >
                  {shortTagline}
                </p>

                {/* Outcome callout */}
                {shortOutcome && (
                  <div
                    className="mt-3 inline-flex items-start gap-2 self-start px-3.5 py-2 rounded-btn"
                    style={{
                      background: `${project.panelAccentColor}0E`,
                      border: `1px solid ${project.panelAccentColor}20`,
                    }}
                  >
                    <StarMark
                      size="xs"
                      color={project.panelAccentColor}
                      className="opacity-50 mt-0.5 shrink-0"
                    />
                    <span className="font-sans text-[13px] leading-snug text-text-muted">
                      {shortOutcome}
                    </span>
                  </div>
                )}

                {/* Stack pills — kept per spec */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9.5px] px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(15,42,61,0.80)',
                        border: '1px solid rgba(15,122,122,0.12)',
                        color: '#6A9BAA',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTAs — mt-auto guarantees bottom render even when content is short */}
                <div className="mt-auto pt-6 flex flex-wrap gap-2">
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
                        Try It Live ↗
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
