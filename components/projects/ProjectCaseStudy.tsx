'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
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

type CaseStudyCopy = {
  tagline: string
  outcome?: string
  overview: string
  problem: string
  users?: string
  solution: string
  impact: string
  buildNotes?: string
  reflection?: string
}

const kestrelCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'AI decision engine that turns a target role into readiness scores, skill gaps, resume edits, and a next-step roadmap.',
  outcome:
    'Turns fragmented job prep into a clear readiness view: what matches, what is missing, what to improve, and what to do next.',
  overview:
    'Kestrel is a role-readiness decision engine for early-career candidates. A user brings a job description and profile; the product extracts requirements, scores fit, surfaces strengths and gaps, and turns the result into a practical roadmap.',
  problem:
    'Early-career candidates often prep from scattered signals: job posts, resume edits, advice threads, and vague role expectations. The result is repeated resume tweaking without a reliable sense of readiness or which PM, SE, or SWE gaps matter first.',
  users:
    'Built for early-career candidates targeting PM, Solutions Engineering, and SWE-adjacent roles who need to translate their experience into role requirements without guessing which gaps matter most.',
  solution:
    'Kestrel parses the target description, extracts the core requirements, compares them against the user profile, then returns a readiness score, matched strengths, ranked gaps, resume improvement prompts, and a next-step roadmap in a card-based dashboard.',
  impact:
    'Instead of leaving users with another generic checklist, Kestrel gives them a decision view: what to lead with, what to fix first, and how to explain their fit with more confidence.',
  buildNotes:
    'The hard part was normalizing messy job descriptions into consistent, usable output. I used a staged AI pipeline with typed schemas so requirements, scores, gaps, and roadmap items stayed structured enough to render clearly and compare across roles.',
  reflection:
    'The strongest product decision was restraint. Kestrel became more useful when I reduced output noise and prioritized the few signals that change a user\'s next action: fit, gaps, resume edits, and roadmap.',
}

const chirpieCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Conversational news product that turns multi-source reporting into source-aware, personalized digests users can follow up on.',
  outcome:
    'Makes news feel faster to enter without stripping out the trust cues users need: sources, context, tone, and a path to go deeper.',
  overview:
    'Chirpie is a chat-first news companion built around the idea that many users do not want another feed to browse. It turns multi-source reporting into structured digests with attribution, context, and room for follow-up interaction.',
  problem:
    'Most news products are optimized for browsing, not conversational consumption. Users face high-volume feeds, generic topic personalization, and AI summaries that can flatten nuance or hide where claims came from.',
  users:
    'Built for scroll-native readers, busy young professionals, and credibility-conscious users who want fast context without giving up source awareness or the ability to ask for more detail.',
  solution:
    'Chirpie transforms reporting into chat-style digests, preserves source links, supports follow-up questions, and adapts tone and pacing so the experience feels lighter without removing trust signals.',
  impact:
    'The product reduces the effort required to understand a story while keeping the credibility layer visible. Users can skim quickly, see what the summary is based on, and decide when a topic deserves deeper attention.',
  buildNotes:
    'The core challenge was structuring news content without over-compressing it. I designed the transformation around source attribution, supporting context, and careful summary boundaries so brevity did not erase nuance or imply unsupported certainty.',
  reflection:
    'Chirpie works best when delight supports usefulness instead of competing with it. The key restraint was making the interface feel conversational and lightweight while keeping trust, attribution, and follow-up depth in the foreground.',
}

function getCaseStudyCopy(project: Project): CaseStudyCopy {
  if (project.slug === 'kestrel') return kestrelCaseStudyCopy
  if (project.slug === 'chirpie') return chirpieCaseStudyCopy

  return {
    tagline: project.tagline,
    outcome: project.outcome,
    overview: project.overview ?? project.summary,
    problem: project.problem,
    users: project.users,
    solution: project.solution,
    impact: project.impact,
    buildNotes: project.buildNotes,
    reflection: project.reflection,
  }
}

// ── Fact strip ───────────────────────────────────────────────────────────────

function FactStrip({ project, enhanced = false }: { project: Project; enhanced?: boolean }) {
  const facts = [
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 4).join(' · ') },
  ]
  return (
    <div
      style={{
        borderColor: enhanced ? `${project.panelAccentColor}1F` : 'rgba(15,122,122,0.10)',
        boxShadow: enhanced ? `inset 0 1px 0 ${project.panelAccentColor}12` : undefined,
      }}
      className="border-b"
    >
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

// ── Sticky side nav ───────────────────────────────────────────────────────────

function SideNav({
  items,
  accent,
  enhanced = false,
}: {
  items: NavItem[]
  accent: string
  enhanced?: boolean
}) {
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
            style={
              enhanced && isActive
                ? {
                    background: `linear-gradient(90deg, ${accent}1A, rgba(15,122,122,0.04))`,
                    boxShadow: `0 0 24px ${accent}10`,
                  }
                : undefined
            }
          >
            <span
              className="font-mono text-[9px] tabular-nums shrink-0 transition-opacity duration-200"
              style={{ color: accent, opacity: isActive ? (enhanced ? 0.82 : 0.6) : 0.22 }}
            >
              {item.number}
            </span>
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.09em] transition-colors duration-200 leading-none"
              style={{
                color: isActive ? (enhanced ? '#D7EEF1' : accent) : '#5A8A9A',
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                className={cn(
                  'ml-auto rounded-full shrink-0',
                  enhanced ? 'h-1.5 w-1.5' : 'h-1 w-1',
                )}
                style={{
                  background: accent,
                  boxShadow: enhanced ? `0 0 14px ${accent}99` : undefined,
                }}
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
  enhanced = false,
  children,
}: {
  id: string
  number: string
  title: string
  accent: string
  enhanced?: boolean
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
      className="relative scroll-mt-24 py-10"
      style={
        enhanced
          ? {
              borderTop: '1px solid transparent',
              background: `linear-gradient(90deg, ${accent}2E, rgba(196,151,74,0.14), transparent 68%) top / 100% 1px no-repeat`,
            }
          : { borderTop: '1px solid rgba(15,122,122,0.10)' }
      }
    >
      {enhanced && (
        <div
          className="pointer-events-none absolute -left-6 top-8 h-24 w-24 rounded-full blur-3xl"
          style={{ background: `${accent}0D` }}
          aria-hidden
        />
      )}

      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-[10px] tabular-nums select-none shrink-0"
          style={{ color: accent, opacity: enhanced ? 0.62 : 0.38 }}
        >
          {number}
        </span>
        <StarMark size="xs" color={accent} className="opacity-55 shrink-0" />
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
          style={{
            color: enhanced ? '#D7EEF1' : accent,
            textShadow: enhanced ? `0 0 20px ${accent}24` : undefined,
          }}
        >
          {title}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: enhanced
              ? `linear-gradient(90deg, ${accent}42, rgba(196,151,74,0.18), transparent)`
              : 'rgba(15,122,122,0.10)',
          }}
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
function Callout({
  children,
  accent,
  enhanced = false,
}: {
  children: React.ReactNode
  accent: string
  enhanced?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-5 py-4 rounded-[18px]',
        enhanced && 'relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5',
      )}
      style={{
        background: enhanced
          ? `radial-gradient(circle at 8% 0%, ${accent}18, transparent 38%), ${accent}0D`
          : `${accent}0C`,
        border: `1px solid ${enhanced ? `${accent}38` : `${accent}22`}`,
        boxShadow: enhanced ? `0 18px 46px rgba(0,0,0,0.24), 0 0 34px ${accent}0C` : undefined,
      }}
    >
      {enhanced && (
        <div
          className="pointer-events-none absolute inset-x-5 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }}
          aria-hidden
        />
      )}
      <StarMark
        size="xs"
        color={accent}
        className={cn(enhanced ? 'opacity-60' : 'opacity-50', 'mt-0.5 shrink-0')}
      />
      <p className="relative font-sans text-[14px] leading-relaxed" style={{ color: '#B8D0DC' }}>
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
  enhanced = false,
}: {
  src: string
  alt: string
  accent: string
  caption?: string
  enhanced?: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mt-6 space-y-2.5">
      <div
        className="group relative w-full overflow-hidden rounded-[14px]"
        style={{
          aspectRatio: '1.85 / 1',
          background: enhanced
            ? `radial-gradient(circle at 20% 10%, ${accent}12, rgba(10,22,40,0.30) 42%, rgba(10,22,40,0.44))`
            : 'rgba(10,22,40,0.28)',
          border: `1px solid ${enhanced ? `${accent}2C` : `${accent}18`}`,
          boxShadow: enhanced
            ? `0 22px 62px rgba(0,0,0,0.38), 0 0 40px ${accent}0A`
            : '0 18px 52px rgba(0,0,0,0.32)',
        }}
      >
        {enhanced && (
          <div
            className="pointer-events-none absolute inset-x-4 top-0 z-10 h-px opacity-80"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }}
            aria-hidden
          />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className={cn(
            'object-contain object-center',
            enhanced && !reduceMotion && 'transition-transform duration-700 group-hover:scale-[1.012]',
          )}
        />
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
  const isKestrelCaseStudy = project.slug === 'kestrel'
  const isChirpieCaseStudy = project.slug === 'chirpie'
  const isEnhancedCaseStudy = isKestrelCaseStudy || isChirpieCaseStudy
  const caseCopy = getCaseStudyCopy(project)

  // Build ordered nav items, assigning sequential section numbers
  let n = 0
  const fmt = () => String(++n).padStart(2, '0')
  const has = (v: unknown) => v !== undefined && v !== null && v !== ''

  const navItems: NavItem[] = [
    { id: 'overview',       label: 'Overview',   number: fmt() },
    { id: 'problem',        label: 'Problem',    number: fmt() },
    ...(has(caseCopy.users)
      ? [{ id: 'users', label: 'Users', number: fmt() }]
      : []),
    { id: 'solution',       label: 'Solution',   number: fmt() },
    { id: 'impact',         label: 'Impact',     number: fmt() },
    ...(has(caseCopy.buildNotes)
      ? [{ id: 'technical-build', label: 'Technical', number: fmt() }]
      : []),
    ...(has(caseCopy.reflection)
      ? [{ id: 'reflection', label: 'Reflection', number: fmt() }]
      : []),
    { id: 'demo-links',     label: 'Links',      number: fmt() },
  ]

  // Helper: get a section's number by id
  const sn = (id: string) => navItems.find((item) => item.id === id)?.number ?? '—'

  const overviewText = caseCopy.overview

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
        {isEnhancedCaseStudy && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}55, rgba(196,151,74,0.25), transparent)`,
            }}
            aria-hidden
          />
        )}

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
                border: isEnhancedCaseStudy
                  ? `1px solid ${project.panelAccentColor}24`
                  : '1px solid rgba(15,122,122,0.14)',
                boxShadow: isEnhancedCaseStudy
                  ? `0 20px 70px rgba(0,0,0,0.38), 0 0 44px ${project.panelAccentColor}0A`
                  : '0 4px 32px rgba(0,0,0,0.28)',
              }}
            >
              <ProjectFloatingScreenshots
                project={project}
                priority
                showWatermark
                imageSizes="(max-width: 1024px) 100vw, 620px"
              />

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
                {caseCopy.tagline}
              </motion.p>

              {/* Outcome callout */}
              {caseCopy.outcome && (
                <motion.div variants={up} className="mt-5">
                  <div
                    className="flex items-start gap-2.5 px-4 py-3 rounded-[15px]"
                    style={{
                      background: isEnhancedCaseStudy
                        ? `radial-gradient(circle at 8% 0%, ${project.panelAccentColor}18, transparent 42%), ${project.panelAccentColor}0D`
                        : `${project.panelAccentColor}0C`,
                      border: `1px solid ${
                        isEnhancedCaseStudy
                          ? `${project.panelAccentColor}34`
                          : `${project.panelAccentColor}20`
                      }`,
                      boxShadow: isEnhancedCaseStudy
                        ? `0 16px 44px rgba(0,0,0,0.22), 0 0 32px ${project.panelAccentColor}0A`
                        : undefined,
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
                      {caseCopy.outcome}
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
                      Try It Out
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
        <FactStrip project={project} enhanced={isEnhancedCaseStudy} />
      </motion.div>

      {/* ════════════════════════════════════════
          BODY: STICKY SIDEBAR + CONTENT RAIL
      ════════════════════════════════════════ */}
      <div className="max-w-[1180px] mx-auto px-6 pt-6 pb-28">
        <div className="lg:grid lg:grid-cols-[196px_1fr] lg:gap-14 xl:gap-20 items-start">

          {/* ── Sticky side nav (lg+ only) ── */}
          <aside className="hidden lg:block sticky top-24 self-start pt-10">
            <SideNav
              items={navItems}
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            />
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
              enhanced={isEnhancedCaseStudy}
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
              enhanced={isEnhancedCaseStudy}
            >
              <div
                className={cn(
                  'pl-5',
                  isEnhancedCaseStudy && 'rounded-r-[18px] py-1 transition-colors duration-300',
                )}
                style={{
                  borderLeft: `2px solid ${project.panelAccentColor}${
                    isEnhancedCaseStudy ? '55' : '35'
                  }`,
                  background: isEnhancedCaseStudy
                    ? `linear-gradient(90deg, ${project.panelAccentColor}0A, transparent 58%)`
                    : undefined,
                }}
              >
                <Prose>{caseCopy.problem}</Prose>
              </div>
            </CaseSection>

            {/*
              ─────────────────────────────────
              USERS (optional) — plain prose
              ─────────────────────────────────
            */}
            {caseCopy.users && (
              <CaseSection
                id="users"
                number={sn('users')}
                title="Users"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                <Prose>{caseCopy.users}</Prose>
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
              enhanced={isEnhancedCaseStudy}
            >
              <Prose>{caseCopy.solution}</Prose>
              {project.screenshots?.[1] && (
                <ScreenshotBlock
                  src={project.screenshots[1]}
                  alt={`${project.name} interface`}
                  accent={project.panelAccentColor}
                  caption={`${project.name} — interface`}
                  enhanced={isEnhancedCaseStudy}
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
              enhanced={isEnhancedCaseStudy}
            >
              {caseCopy.outcome && (
                <div className="mb-5">
                  <Callout accent={project.panelAccentColor} enhanced={isEnhancedCaseStudy}>
                    {caseCopy.outcome}
                  </Callout>
                </div>
              )}
              <Prose>{caseCopy.impact}</Prose>
            </CaseSection>

            {/*
              ─────────────────────────────────
              TECHNICAL BUILD (optional) — stack row + prose
              ─────────────────────────────────
            */}
            {caseCopy.buildNotes && (
              <CaseSection
                id="technical-build"
                number={sn('technical-build')}
                title="Technical Build"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                {/* Full stack row */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s) => (
                    <StackPill key={s} label={s} accent={project.panelAccentColor} />
                  ))}
                </div>
                <Prose>{caseCopy.buildNotes}</Prose>
              </CaseSection>
            )}

            {/*
              ─────────────────────────────────
              REFLECTION (optional) — indented / quote feel
              ─────────────────────────────────
            */}
            {caseCopy.reflection && (
              <CaseSection
                id="reflection"
                number={sn('reflection')}
                title="Reflection"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                <div
                  className={cn('pl-5', isEnhancedCaseStudy && 'rounded-r-[18px] py-1')}
                  style={{
                    borderLeft: `1px solid ${
                      isEnhancedCaseStudy ? `${project.panelAccentColor}40` : 'rgba(15,122,122,0.20)'
                    }`,
                    background: isEnhancedCaseStudy
                      ? `linear-gradient(90deg, ${project.panelAccentColor}08, transparent 62%)`
                      : undefined,
                  }}
                >
                  <Prose>{caseCopy.reflection}</Prose>
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
              enhanced={isEnhancedCaseStudy}
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
                      Try It Out
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
