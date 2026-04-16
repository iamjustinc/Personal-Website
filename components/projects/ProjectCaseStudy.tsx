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

// ── Section wrapper ──────────────────────────────────────────────────────────

function CaseSection({
  number,
  title,
  accent,
  children,
}: {
  number: string
  title: string
  accent: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const variant = reduceMotion ? { hidden: {}, visible: {} } : fadeUp

  return (
    <motion.section
      id={title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className="py-10"
      style={{ borderTop: '1px solid rgba(15,122,122,0.12)' }}
    >
      {/* Section label row */}
      <div className="flex items-center gap-3 mb-7">
        <span
          className="font-mono text-[10px] tabular-nums select-none shrink-0"
          style={{ color: accent, opacity: 0.4 }}
        >
          {number}
        </span>
        <StarMark size="xs" color={accent} className="opacity-60 shrink-0" />
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
    </motion.section>
  )
}

// ── Prose ────────────────────────────────────────────────────────────────────

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15px] leading-[1.75]" style={{ color: '#A8C5D1' }}>
      {children}
    </p>
  )
}

// ── Callout / highlight box ───────────────────────────────────────────────────

function Callout({
  children,
  accent,
}: {
  children: React.ReactNode
  accent: string
}) {
  return (
    <div
      className="mt-6 flex items-start gap-3 px-5 py-4 rounded-btn"
      style={{
        background: `${accent}0C`,
        border: `1px solid ${accent}22`,
      }}
    >
      <StarMark size="xs" color={accent} className="opacity-55 mt-0.5 shrink-0" />
      <p className="font-sans text-[14px] leading-relaxed" style={{ color: '#A8C5D1' }}>
        {children}
      </p>
    </div>
  )
}

// ── Quick-facts strip ─────────────────────────────────────────────────────────

function FactStrip({ project }: { project: Project }) {
  const facts = [
    { label: 'Year',  value: String(project.year) },
    { label: 'Role',  value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 3).join(' · ') },
  ]

  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(15,122,122,0.10)' }}
    >
      <div className="max-w-[1080px] mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                {f.label}
              </span>
              <span
                className="font-mono text-[10px]"
                style={{ color: project.panelAccentColor, opacity: 0.45 }}
              >
                /
              </span>
              <span className="font-mono text-[11px] text-text-base opacity-80">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.10))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  // Build sequential section numbers based on which optional sections are present.
  // Sections always present: overview, problem, solution, impact, links
  // Sections conditional: users, productLogic, experienceDesign, buildNotes, reflection
  const sn = (() => {
    let n = 0
    const fmt = () => String(++n).padStart(2, '0')
    const has = (v: unknown) => v !== undefined && v !== null && v !== ''
    return {
      overview:         fmt(),
      problem:          fmt(),
      users:            has(project.users)            ? fmt() : '',
      solution:         fmt(),
      productLogic:     has(project.productLogic)     ? fmt() : '',
      experienceDesign: has(project.experienceDesign) ? fmt() : '',
      technical:        has(project.buildNotes)       ? fmt() : '',
      impact:           fmt(),
      reflection:       has(project.reflection)       ? fmt() : '',
      links:            fmt(),
    }
  })()

  const overviewText = project.overview ?? project.summary

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

            {/* Left: metadata + CTAs */}
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
                className="font-sans text-[17px] leading-relaxed mt-4 max-w-[480px]"
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

      {/* ── Quick-facts strip ───────────────────────────────────────────────── */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FactStrip project={project} />
      </motion.div>

      {/* ── Case study body ─────────────────────────────────────────────────── */}
      <div className="max-w-[860px] mx-auto px-6 pt-4 pb-32">

        {/* Overview */}
        <CaseSection number={sn.overview} title="Overview" accent={project.panelAccentColor}>
          <Prose>{overviewText}</Prose>
          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 mt-6">
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

        {/* Problem */}
        <CaseSection number={sn.problem} title="Problem" accent={project.panelAccentColor}>
          <Prose>{project.problem}</Prose>
        </CaseSection>

        {/* Users — optional */}
        {project.users && sn.users && (
          <CaseSection number={sn.users} title="Users" accent={project.panelAccentColor}>
            <Prose>{project.users}</Prose>
          </CaseSection>
        )}

        {/* Solution */}
        <CaseSection number={sn.solution} title="Solution" accent={project.panelAccentColor}>
          <Prose>{project.solution}</Prose>
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

        {/* Product Logic — optional */}
        {project.productLogic && sn.productLogic && (
          <CaseSection number={sn.productLogic} title="Product Logic" accent={project.panelAccentColor}>
            <Prose>{project.productLogic}</Prose>
          </CaseSection>
        )}

        {/* Experience Design — optional */}
        {project.experienceDesign && sn.experienceDesign && (
          <CaseSection number={sn.experienceDesign} title="Experience Design" accent={project.panelAccentColor}>
            <Prose>{project.experienceDesign}</Prose>
          </CaseSection>
        )}

        {/* Technical Build — optional */}
        {project.buildNotes && sn.technical && (
          <CaseSection number={sn.technical} title="Technical Build" accent={project.panelAccentColor}>
            <Prose>{project.buildNotes}</Prose>
          </CaseSection>
        )}

        {/* Impact */}
        <CaseSection number={sn.impact} title="Impact" accent={project.panelAccentColor}>
          <Prose>{project.impact}</Prose>
          {project.outcome && (
            <Callout accent={project.panelAccentColor}>
              {project.outcome}
            </Callout>
          )}
        </CaseSection>

        {/* Reflection — optional */}
        {project.reflection && sn.reflection && (
          <CaseSection number={sn.reflection} title="Reflection" accent={project.panelAccentColor}>
            <Prose>{project.reflection}</Prose>
          </CaseSection>
        )}

        {/* Demo & Links */}
        <CaseSection number={sn.links} title="Demo &amp; Links" accent={project.panelAccentColor}>
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
