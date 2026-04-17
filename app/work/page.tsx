'use client'

import { motion } from 'framer-motion'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn } from '@/lib/motion'

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
  const shortTagline = shortenText(project.tagline, 110)
  const shortOutcome = shortenText(project.outcome, 95)

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        y: -5,
        boxShadow: '0 24px 68px rgba(0,0,0,0.64), 0 0 0 1px rgba(15,122,122,0.28)',
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(15,42,61,0.60)',
        border: '1px solid rgba(15,122,122,0.14)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
      }}
    >
      <div className={`flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''}`}>

        {/* ── Media column ── */}
        <div
          className="relative lg:w-[48%] min-h-[340px] lg:min-h-[520px] overflow-hidden shrink-0"
        >
          {/* Very light panel tint */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.10) 40%, rgba(10,22,40,0.65) 100%)`,
            }}
          />

          <ProjectFloatingScreenshots
            project={project}
            priority={index === 0}
            showWatermark
            imageSizes="(max-width: 1024px) 100vw, 560px"
          />

          {/* Index badge */}
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

        {/* ── Content column ──
            flex-col, NO justify-center: content stacks from top, no overflow risk.
            mt-auto on CTA row: buttons always render at card bottom.
        ── */}
        <div className="flex flex-col px-8 lg:px-10 py-8 lg:py-10 lg:flex-1">

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
          <h2 className="font-display text-h1 text-text-base leading-tight">{project.name}</h2>

          {/* Year / role meta */}
          <p className="font-mono text-[10.5px] text-text-muted mt-2 tracking-wider uppercase opacity-75">
            {project.year} · {project.role}
          </p>

          {/* Tagline */}
          <p
            className="font-sans mt-4 leading-relaxed"
            style={{ fontSize: '15px', color: '#B8D0DC' }}
          >
            {shortTagline}
          </p>

          {/* Problem */}
          {project.problem && (
            <div className="mt-5">
              <p
                className="font-mono text-[9.5px] uppercase tracking-[0.12em] mb-2"
                style={{ color: project.panelAccentColor, opacity: 0.75 }}
              >
                Problem
              </p>
              <p className="font-sans text-[13.5px] leading-relaxed" style={{ color: '#8DAFC0' }}>
                {shortenText(project.problem, 130)}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="mt-4">
              <p
                className="font-mono text-[9.5px] uppercase tracking-[0.12em] mb-2"
                style={{ color: project.panelAccentColor, opacity: 0.75 }}
              >
                Solution
              </p>
              <p className="font-sans text-[13.5px] leading-relaxed" style={{ color: '#8DAFC0' }}>
                {shortenText(project.solution, 130)}
              </p>
            </div>
          )}

          {/* Outcome callout */}
          {shortOutcome && (
            <div
              className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-[14px]"
              style={{
                background: `${project.panelAccentColor}0E`,
                border: `1px solid ${project.panelAccentColor}22`,
              }}
            >
              <StarMark
                size="xs"
                color={project.panelAccentColor}
                className="opacity-55 mt-0.5 shrink-0"
              />
              <span className="font-sans text-[13px] leading-snug" style={{ color: '#A8C5D1' }}>
                {shortOutcome}
              </span>
            </div>
          )}

          {/* Stack pills */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.stack.map((s) => (
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
          )}

          {/* CTAs — mt-auto guarantees bottom render */}
          <div className="mt-auto pt-7 flex flex-wrap gap-2">
            <HoverSparkle className="inline-flex">
              <StarburstButton href={`/projects/${project.slug}`} variant="primary" size="md">
                View Case Study
              </StarburstButton>
            </HoverSparkle>

            <HoverSparkle className="inline-flex">
              <StarburstButton href={`/projects/${project.slug}/demo`} variant="secondary" size="md">
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
                  size="md"
                >
                  Try It Live ↗
                </StarburstButton>
              </HoverSparkle>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const visibleProjects = [
    ...projects.filter((p) => p.visible && p.featured),
    ...projects.filter((p) => p.visible && !p.featured).sort((a, b) => a.order - b.order),
  ]

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
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
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
            Three products built end-to-end — from idea and system design through to shipped
            experience. Each one targets a real gap in how people work with information.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
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
