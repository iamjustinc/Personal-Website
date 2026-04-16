'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

// ── Case section ────────────────────────────────────────────────────────────

function CaseSection({
  title,
  accent,
  children,
}: {
  title: string
  accent: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const variant = reduceMotion ? { hidden: {}, visible: {} } : fadeUp

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className="py-10"
      style={{ borderTop: '1px solid rgba(15,122,122,0.12)' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <StarMark size="xs" color={accent} className="opacity-65 shrink-0" />
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {title}
        </span>
        <div
          className="h-px flex-1"
          style={{ background: 'rgba(15,122,122,0.12)' }}
          aria-hidden
        />
      </div>

      {children}
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.10))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  return (
    <main className="bg-bg min-h-screen pt-16">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${project.panelAccentColor}14 0%, rgba(10,22,40,0) 55%)`,
          borderBottom: '1px solid rgba(15,122,122,0.10)',
        }}
      >
        {/* Atmospheric watermark */}
        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar
            size={520}
            opacity={0.03}
            direction={1}
            color={project.panelAccentColor}
          />
        </div>

        <div className="max-w-[1080px] mx-auto px-6 py-14 lg:py-20">

          {/* Back nav */}
          <motion.div variants={inn} initial="hidden" animate="visible">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-text-base transition-colors duration-200 mb-10"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Projects
            </Link>
          </motion.div>

          {/* Two-column hero: text left, screenshot right */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-center">

            {/* Left: title + meta + CTAs */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div variants={inn} className="mb-5">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{
                    background: `${project.panelAccentColor}14`,
                    border: `1px solid ${project.panelAccentColor}30`,
                  }}
                >
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-70" />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: project.panelAccentColor }}
                  >
                    Case Study
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={up}
                className="font-display text-h1 text-text-base leading-none"
              >
                {project.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={up}
                className="font-sans text-[17px] leading-relaxed mt-4"
                style={{ color: '#A8C5D1' }}
              >
                {project.tagline}
              </motion.p>

              {/* Tags */}
              <motion.div variants={inn} className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="category" />
                ))}
              </motion.div>

              {/* Meta */}
              <motion.p
                variants={inn}
                className="font-mono text-[11px] text-text-muted mt-3 uppercase tracking-wider"
              >
                {project.year} · {project.role}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={inn} className="flex flex-wrap gap-2.5 mt-8">
                <HoverSparkle className="inline-flex">
                  <StarburstButton
                    href={`/projects/${project.slug}/demo`}
                    variant="primary"
                    size="md"
                  >
                    View Demo
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
                {project.githubUrl && (
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      View Code
                    </StarburstButton>
                  </HoverSparkle>
                )}
              </motion.div>
            </motion.div>

            {/* Right: featured screenshot */}
            {project.screenshots[0] && (
              <motion.div
                variants={up}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.18 }}
                className="relative h-[300px] lg:h-[360px] rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(245,248,251,0.96)',
                  border: `1px solid ${project.panelAccentColor}22`,
                  boxShadow: `0 24px 60px rgba(0,0,0,0.32), 0 0 0 1px ${project.panelAccentColor}10 inset`,
                }}
              >
                <Image
                  src={project.screenshots[0]}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-contain object-center scale-[1.1]"
                  priority
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Case study body ──────────────────────────────────────────────────── */}
      <div className="max-w-[800px] mx-auto px-6 pt-4 pb-32">

        <CaseSection title="Overview" accent={project.panelAccentColor}>
          <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
            {project.summary}
          </p>
          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] px-2.5 py-1 rounded-btn"
                style={{
                  background: 'rgba(15,42,61,0.80)',
                  border: '1px solid rgba(15,122,122,0.14)',
                  color: '#6A9BAA',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </CaseSection>

        <CaseSection title="Problem" accent={project.panelAccentColor}>
          <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
            {project.problem}
          </p>
        </CaseSection>

        <CaseSection title="Solution" accent={project.panelAccentColor}>
          <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
            {project.solution}
          </p>
          {/* Second screenshot when available */}
          {project.screenshots[1] && (
            <div
              className="relative mt-8 h-[260px] rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(245,248,251,0.96)',
                border: `1px solid ${project.panelAccentColor}20`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
              }}
            >
              <Image
                src={project.screenshots[1]}
                alt={`${project.name} interface`}
                fill
                className="object-contain object-center scale-[1.1]"
              />
            </div>
          )}
        </CaseSection>

        {project.buildNotes && (
          <CaseSection title="Technical Build" accent={project.panelAccentColor}>
            <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
              {project.buildNotes}
            </p>
          </CaseSection>
        )}

        <CaseSection title="Impact" accent={project.panelAccentColor}>
          <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
            {project.impact}
          </p>
          {project.outcome && (
            <div
              className="mt-6 inline-flex items-start gap-2.5 self-start px-5 py-3 rounded-btn"
              style={{
                background: `${project.panelAccentColor}10`,
                border: `1px solid ${project.panelAccentColor}24`,
              }}
            >
              <StarMark
                size="xs"
                color={project.panelAccentColor}
                className="opacity-60 mt-0.5 shrink-0"
              />
              <span className="font-sans text-sm leading-snug" style={{ color: '#A8C5D1' }}>
                {project.outcome}
              </span>
            </div>
          )}
        </CaseSection>

        <CaseSection title="Demo &amp; Links" accent={project.panelAccentColor}>
          <div className="flex flex-wrap gap-3">
            <HoverSparkle className="inline-flex">
              <StarburstButton
                href={`/projects/${project.slug}/demo`}
                variant="primary"
                size="md"
              >
                View Demo
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
            {project.githubUrl && (
              <HoverSparkle className="inline-flex">
                <StarburstButton
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  View Code
                </StarburstButton>
              </HoverSparkle>
            )}
            <HoverSparkle className="inline-flex">
              <StarburstButton href="/#projects" variant="secondary" size="md">
                ← All Projects
              </StarburstButton>
            </HoverSparkle>
          </div>
        </CaseSection>

      </div>
    </main>
  )
}
