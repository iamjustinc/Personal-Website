'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

type NavItem = { id: string; label: string; number: string }

// ── Fact strip ───────────────────────────────────────────────────────────────

function FactStrip({ project }: { project: Project }) {
  const facts = [
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 4).join(' · ') },
  ]
  return (
    <div style={{ borderColor: 'rgba(15,122,122,0.10)' }} className="border-b">
      <div className="max-w-[1180px] mx-auto px-6 py-4">
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
              <span className="font-mono text-[11px] text-text-base opacity-80">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hero floating visual ──────────────────────────────────────────────────────

function FloatingHeroVisual({ project }: { project: Project }) {
  const landingShot = project.screenshots?.[0] || project.thumbnail
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 25%, ${project.panelAccentColor}14 0%, transparent 52%)`,
        }}
      />

      {/* Slow-rotating watermark star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.028 }}
        >
          <StarMark size="2xl" color={project.panelAccentColor} />
        </motion.div>
      </div>

      {/* Landing screenshot — dominant, bleeds toward top-left */}
      {landingShot && (
        <motion.div
          animate={{ y: [0, -9, 0], rotate: [-1.5, -0.5, -1.5] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[1%] top-[3%] h-[80%] w-[74%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 22px 58px rgba(0,0,0,0.50)' }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing view`}
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover object-top"
            priority
          />
        </motion.div>
      )}

      {/* Interface screenshot — bleeds toward bottom-right, overlapping */}
      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 11, 0], rotate: [2, 1, 2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-[1%] bottom-[2%] h-[62%] w-[72%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 28px 66px rgba(0,0,0,0.54)' }}
        >
          <Image
            src={interfaceShot}
            alt={`${project.name} interface view`}
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover object-center"
          />
        </motion.div>
      )}

      {/* Glow under front screenshot */}
      <div
        className="absolute right-[8%] bottom-[1%] h-8 w-[40%] blur-2xl rounded-full pointer-events-none"
        style={{ background: `${project.panelAccentColor}22` }}
      />

      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-35" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-30" />
      </div>
    </div>
  )
}

// ── Sticky side nav ───────────────────────────────────────────────────────────

function SideNav({ items, accent }: { items: NavItem[]; accent: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ai = els.indexOf(a.target as HTMLElement)
            const bi = els.indexOf(b.target as HTMLElement)
            return ai - bi
          })
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="space-y-0.5" aria-label="Case study sections">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted opacity-40 px-3 mb-3">
        Contents
      </p>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              setActiveId(item.id)
            }}
            className={cn(
              'group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200',
              isActive
                ? 'bg-[rgba(15,122,122,0.10)]'
                : 'hover:bg-[rgba(15,122,122,0.06)]',
            )}
          >
            <span
              className="font-mono text-[9px] tabular-nums shrink-0 transition-opacity duration-200"
              style={{ color: accent, opacity: isActive ? 0.6 : 0.22 }}
            >
              {item.number}
            </span>
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.09em] transition-colors duration-200 leading-none"
              style={{ color: isActive ? accent : '#5A8A9A' }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                className="ml-auto h-1 w-1 rounded-full shrink-0"
                style={{ background: accent }}
              />
            )}
          </a>
        )
      })}
    </nav>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function CaseSection({
  id,
  number,
  title,
  accent,
  children,
}: {
  id: string
  number: string
  title: string
  accent: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const variant = reduceMotion ? { hidden: {}, visible: {} } : fadeUp

  return (
    <motion.section
      id={id}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className="scroll-mt-24 py-10"
      style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-[10px] tabular-nums select-none shrink-0"
          style={{ color: accent, opacity: 0.38 }}
        >
          {number}
        </span>
        <StarMark size="xs" color={accent} className="opacity-55 shrink-0" />
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {title}
        </span>
        <div
          className="h-px flex-1"
          style={{ background: 'rgba(15,122,122,0.10)' }}
          aria-hidden
        />
      </div>

      {children}
    </motion.section>
  )
}

// ── Content primitives ────────────────────────────────────────────────────────

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15px] leading-[1.8] max-w-[66ch]" style={{ color: '#A8C5D1' }}>
      {children}
    </p>
  )
}

/** Accent callout block — star + body text in a tinted pill. */
function Callout({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div
      className="flex items-start gap-3 px-5 py-4 rounded-[18px]"
      style={{
        background: `${accent}0C`,
        border: `1px solid ${accent}22`,
      }}
    >
      <StarMark size="xs" color={accent} className="opacity-50 mt-0.5 shrink-0" />
      <p className="font-sans text-[14px] leading-relaxed" style={{ color: '#B8D0DC' }}>
        {children}
      </p>
    </div>
  )
}

/** Full-width screenshot with subtle border + shadow. */
function ScreenshotBlock({
  src,
  alt,
  accent,
  caption,
}: {
  src: string
  alt: string
  accent: string
  caption?: string
}) {
  return (
    <div className="mt-6 space-y-2.5">
      <div
        className="relative w-full overflow-hidden rounded-[14px]"
        style={{
          aspectRatio: '16/9',
          border: `1px solid ${accent}18`,
          boxShadow: '0 18px 52px rgba(0,0,0,0.36)',
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-wider text-center text-text-muted opacity-50">
          {caption}
        </p>
      )}
    </div>
  )
}

/** Compact stack pill. */
function StackPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="font-mono text-[9.5px] px-2.5 py-1 rounded-btn"
      style={{
        background: 'rgba(15,42,61,0.80)',
        border: `1px solid ${accent}18`,
        color: '#6A9BAA',
      }}
    >
      {label}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  // Build ordered nav items, assigning sequential section numbers
  let n = 0
  const fmt = () => String(++n).padStart(2, '0')
  const has = (v: unknown) => v !== undefined && v !== null && v !== ''

  const navItems: NavItem[] = [
    { id: 'overview',       label: 'Overview',   number: fmt() },
    { id: 'problem',        label: 'Problem',    number: fmt() },
    ...(has(project.users)
      ? [{ id: 'users', label: 'Users', number: fmt() }]
      : []),
    { id: 'solution',       label: 'Solution',   number: fmt() },
    { id: 'impact',         label: 'Impact',     number: fmt() },
    ...(has(project.buildNotes)
      ? [{ id: 'technical-build', label: 'Technical', number: fmt() }]
      : []),
    ...(has(project.reflection)
      ? [{ id: 'reflection', label: 'Reflection', number: fmt() }]
      : []),
    { id: 'demo-links',     label: 'Links',      number: fmt() },
  ]

  // Helper: get a section's number by id
  const sn = (id: string) => navItems.find((item) => item.id === id)?.number ?? '—'

  const overviewText = project.overview ?? project.summary

  return (
    <main className="bg-bg min-h-screen pt-16">

      {/* ════════════════════════════════════════
          HERO BAND
      ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${project.panelAccentColor}14 0%, rgba(10,22,40,0) 55%)`,
          borderBottom: '1px solid rgba(15,122,122,0.10)',
        }}
      >
        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar
            size={520}
            opacity={0.025}
            direction={1}
            color={project.panelAccentColor}
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-6 py-14 lg:py-20">

          {/* Back link */}
          <motion.div variants={inn} initial="hidden" animate="visible">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-text-base transition-colors duration-200 mb-10"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Projects
            </Link>
          </motion.div>

          {/* Hero grid — open layout, no outer card-box */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">

            {/* Visual column — its own card */}
            <div
              className="relative min-h-[360px] lg:min-h-[520px] rounded-[22px] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.12) 40%, rgba(10,22,40,0.68) 100%)`,
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.28)',
              }}
            >
              <FloatingHeroVisual project={project} />

              {/* "Case Study" badge */}
              <div
                className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
                style={{
                  background: 'rgba(13,30,53,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${project.panelAccentColor}28`,
                }}
              >
                <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                  Case Study
                </span>
              </div>
            </div>

            {/* Text column — open, no card wrapper */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col pt-1 lg:pt-3"
            >
              {/* Category tags */}
              <motion.div variants={inn} className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="category" />
                ))}
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={up}
                className="font-display text-h1 text-text-base leading-none"
              >
                {project.name}
              </motion.h1>

              {/* Meta */}
              <motion.p
                variants={up}
                className="font-mono text-[11px] text-text-muted mt-3 tracking-wider uppercase"
              >
                {project.year} · {project.role}
              </motion.p>

              {/* Tagline */}
              <motion.p
                variants={up}
                className="font-sans text-[17px] leading-[1.65] mt-5"
                style={{ color: '#A8C5D1' }}
              >
                {project.tagline}
              </motion.p>

              {/* Outcome callout */}
              {project.outcome && (
                <motion.div variants={up} className="mt-5">
                  <div
                    className="flex items-start gap-2.5 px-4 py-3 rounded-[15px]"
                    style={{
                      background: `${project.panelAccentColor}0C`,
                      border: `1px solid ${project.panelAccentColor}20`,
                    }}
                  >
                    <StarMark
                      size="xs"
                      color={project.panelAccentColor}
                      className="opacity-50 mt-0.5 shrink-0"
                    />
                    <p
                      className="font-sans text-[13.5px] leading-relaxed"
                      style={{ color: '#A8C5D1' }}
                    >
                      {project.outcome}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Stack pills */}
              <motion.div variants={inn} className="flex flex-wrap gap-1.5 mt-5">
                {project.stack.slice(0, 5).map((s) => (
                  <StackPill key={s} label={s} accent={project.panelAccentColor} />
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={inn} className="flex flex-wrap gap-2.5 mt-7">
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
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FACT STRIP
      ════════════════════════════════════════ */}
      <motion.div variants={inn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FactStrip project={project} />
      </motion.div>

      {/* ════════════════════════════════════════
          BODY: STICKY SIDEBAR + CONTENT RAIL
      ════════════════════════════════════════ */}
      <div className="max-w-[1180px] mx-auto px-6 pt-6 pb-28">
        <div className="lg:grid lg:grid-cols-[196px_1fr] lg:gap-14 xl:gap-20 items-start">

          {/* ── Sticky side nav (lg+ only) ── */}
          <aside className="hidden lg:block sticky top-24 self-start pt-10">
            <SideNav items={navItems} accent={project.panelAccentColor} />
          </aside>

          {/* ── Content rail ── */}
          <div className="min-w-0">

            {/*
              ─────────────────────────────────
              OVERVIEW — wide prose
              ─────────────────────────────────
            */}
            <CaseSection
              id="overview"
              number={sn('overview')}
              title="Overview"
              accent={project.panelAccentColor}
            >
              <Prose>{overviewText}</Prose>
            </CaseSection>

            {/*
              ─────────────────────────────────
              PROBLEM — prose with left accent border
              ─────────────────────────────────
            */}
            <CaseSection
              id="problem"
              number={sn('problem')}
              title="Problem"
              accent={project.panelAccentColor}
            >
              <div
                className="pl-5"
                style={{ borderLeft: `2px solid ${project.panelAccentColor}35` }}
              >
                <Prose>{project.problem}</Prose>
              </div>
            </CaseSection>

            {/*
              ─────────────────────────────────
              USERS (optional) — plain prose
              ─────────────────────────────────
            */}
            {project.users && (
              <CaseSection
                id="users"
                number={sn('users')}
                title="Users"
                accent={project.panelAccentColor}
              >
                <Prose>{project.users}</Prose>
              </CaseSection>
            )}

            {/*
              ─────────────────────────────────
              SOLUTION — prose + interface screenshot
              ─────────────────────────────────
            */}
            <CaseSection
              id="solution"
              number={sn('solution')}
              title="Solution"
              accent={project.panelAccentColor}
            >
              <Prose>{project.solution}</Prose>
              {project.screenshots?.[1] && (
                <ScreenshotBlock
                  src={project.screenshots[1]}
                  alt={`${project.name} interface`}
                  accent={project.panelAccentColor}
                  caption={`${project.name} — interface`}
                />
              )}
            </CaseSection>

            {/*
              ─────────────────────────────────
              IMPACT — prominent outcome callout + prose
              ─────────────────────────────────
            */}
            <CaseSection
              id="impact"
              number={sn('impact')}
              title="Impact"
              accent={project.panelAccentColor}
            >
              {project.outcome && (
                <div className="mb-5">
                  <Callout accent={project.panelAccentColor}>{project.outcome}</Callout>
                </div>
              )}
              <Prose>{project.impact}</Prose>
            </CaseSection>

            {/*
              ─────────────────────────────────
              TECHNICAL BUILD (optional) — stack row + prose
              ─────────────────────────────────
            */}
            {project.buildNotes && (
              <CaseSection
                id="technical-build"
                number={sn('technical-build')}
                title="Technical Build"
                accent={project.panelAccentColor}
              >
                {/* Full stack row */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s) => (
                    <StackPill key={s} label={s} accent={project.panelAccentColor} />
                  ))}
                </div>
                <Prose>{project.buildNotes}</Prose>
              </CaseSection>
            )}

            {/*
              ─────────────────────────────────
              REFLECTION (optional) — indented / quote feel
              ─────────────────────────────────
            */}
            {project.reflection && (
              <CaseSection
                id="reflection"
                number={sn('reflection')}
                title="Reflection"
                accent={project.panelAccentColor}
              >
                <div className="pl-5" style={{ borderLeft: `1px solid rgba(15,122,122,0.20)` }}>
                  <Prose>{project.reflection}</Prose>
                </div>
              </CaseSection>
            )}

            {/*
              ─────────────────────────────────
              DEMO & LINKS
              ─────────────────────────────────
            */}
            <CaseSection
              id="demo-links"
              number={sn('demo-links')}
              title="Demo &amp; Links"
              accent={project.panelAccentColor}
            >
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

          </div>{/* end content rail */}
        </div>
      </div>
    </main>
  )
}
