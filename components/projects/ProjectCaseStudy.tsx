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
      className="py-8"
      style={{ borderTop: '1px solid rgba(15,122,122,0.12)' }}
    >
      <div className="flex items-center gap-3 mb-5">
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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15px] leading-[1.8] max-w-[68ch]" style={{ color: '#A8C5D1' }}>
      {children}
    </p>
  )
}

function Callout({
  children,
  accent,
}: {
  children: React.ReactNode
  accent: string
}) {
  return (
    <div
      className="mt-5 flex items-start gap-3 px-5 py-4 rounded-[18px]"
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

function SectionScreenshot({
  src,
  alt,
  accent,
}: {
  src: string
  alt: string
  accent: string
}) {
  return (
    <div
      className="mt-6 relative w-full overflow-hidden rounded-2xl"
      style={{
        aspectRatio: '16/9',
        border: `1px solid ${accent}18`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.32)',
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover object-top" />
    </div>
  )
}

function FactStrip({ project }: { project: Project }) {
  const facts = [
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 3).join(' · ') },
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

function FloatingCaseVisual({ project }: { project: Project }) {
  const landingShot = project.screenshots?.[0]
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 28%, ${project.panelAccentColor}18 0%, rgba(10,22,40,0) 50%)`,
        }}
      />

      {/* Slow rotating star */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.035 }}
        >
          <StarMark size="2xl" color={project.panelAccentColor} />
        </motion.div>
      </div>

      {/* Landing screenshot — large, fills upper-left */}
      {landingShot && (
        <motion.div
          animate={{ y: [0, -9, 0], rotate: [-2, -1, -2] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[2%] top-[4%] h-[76%] w-[68%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 20px 56px rgba(0,0,0,0.44)' }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing view`}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-top"
            priority
          />
        </motion.div>
      )}

      {/* Interface screenshot — slightly smaller, floats lower-right */}
      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 11, 0], rotate: [2.2, 1.1, 2.2] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="absolute right-[2%] bottom-[3%] h-[60%] w-[68%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 26px 64px rgba(0,0,0,0.50)' }}
        >
          <Image
            src={interfaceShot}
            alt={`${project.name} interface view`}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-center"
          />
        </motion.div>
      )}

      {/* Accent glow under front card */}
      <div
        className="absolute right-[10%] bottom-[2%] h-10 w-[42%] blur-2xl rounded-full pointer-events-none"
        style={{ background: `${project.panelAccentColor}28` }}
      />

      {/* Corner marks */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-40" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-40" />
      </div>
    </div>
  )
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  const sn = (() => {
    let n = 0
    const fmt = () => String(++n).padStart(2, '0')
    const has = (v: unknown) => v !== undefined && v !== null && v !== ''
    return {
      overview: fmt(),
      problem: fmt(),
      users: has(project.users) ? fmt() : '',
      solution: fmt(),
      impact: fmt(),
      technical: has(project.buildNotes) ? fmt() : '',
      reflection: has(project.reflection) ? fmt() : '',
      links: fmt(),
    }
  })()

  const overviewText = project.overview ?? project.summary

  return (
    <main className="bg-bg min-h-screen pt-16">
      {/* ── Hero band ── */}
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
            opacity={0.03}
            direction={1}
            color={project.panelAccentColor}
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-6 py-14 lg:py-18">
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

          {/* Hero grid — open layout, visual gets its own card */}
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-start">

            {/* ── Visual column ── */}
            <div
              className="relative min-h-[360px] lg:min-h-[540px] rounded-[24px] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, ${project.panelAccentColor}14 0%, rgba(10,22,40,0.18) 40%, rgba(10,22,40,0.72) 100%)`,
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
              }}
            >
              <FloatingCaseVisual project={project} />

              {/* Case Study badge */}
              <div
                className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
                style={{
                  background: 'rgba(13,30,53,0.85)',
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

            {/* ── Text column — open, no card wrapper ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col pt-1 lg:pt-3"
            >
              {/* Tags */}
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

              {/* Tagline — no width cap */}
              <motion.p
                variants={up}
                className="font-sans text-[17px] leading-[1.65] mt-6"
                style={{ color: '#A8C5D1' }}
              >
                {project.tagline}
              </motion.p>

              {/* Outcome callout */}
              {project.outcome && (
                <motion.div variants={up}>
                  <Callout accent={project.panelAccentColor}>{project.outcome}</Callout>
                </motion.div>
              )}

              {/* CTAs */}
              <motion.div variants={inn} className="flex flex-wrap gap-2.5 mt-8">
                <HoverSparkle className="inline-flex">
                  <StarburstButton href={`/projects/${project.slug}/demo`} variant="primary" size="md">
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

      {/* ── Fact strip ── */}
      <motion.div variants={inn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FactStrip project={project} />
      </motion.div>

      {/* ── Case study body ── */}
      <div className="max-w-[860px] mx-auto px-6 pt-4 pb-28">
        <CaseSection number={sn.overview} title="Overview" accent={project.panelAccentColor}>
          <Prose>{overviewText}</Prose>
        </CaseSection>

        <CaseSection number={sn.problem} title="Problem" accent={project.panelAccentColor}>
          <Prose>{project.problem}</Prose>
        </CaseSection>

        {project.users && sn.users && (
          <CaseSection number={sn.users} title="Users" accent={project.panelAccentColor}>
            <Prose>{project.users}</Prose>
          </CaseSection>
        )}

        <CaseSection number={sn.solution} title="Solution" accent={project.panelAccentColor}>
          <Prose>{project.solution}</Prose>
          {project.screenshots?.[1] && (
            <SectionScreenshot
              src={project.screenshots[1]}
              alt={`${project.name} interface`}
              accent={project.panelAccentColor}
            />
          )}
        </CaseSection>

        <CaseSection number={sn.impact} title="Impact" accent={project.panelAccentColor}>
          <Prose>{project.impact}</Prose>
        </CaseSection>

        {project.buildNotes && sn.technical && (
          <CaseSection number={sn.technical} title="Technical Build" accent={project.panelAccentColor}>
            <Prose>{project.buildNotes}</Prose>
          </CaseSection>
        )}

        {project.reflection && sn.reflection && (
          <CaseSection number={sn.reflection} title="Reflection" accent={project.panelAccentColor}>
            <Prose>{project.reflection}</Prose>
          </CaseSection>
        )}

        <CaseSection number={sn.links} title="Demo &amp; Links" accent={project.panelAccentColor}>
          <div className="flex flex-wrap gap-3">
            <HoverSparkle className="inline-flex">
              <StarburstButton href={`/projects/${project.slug}/demo`} variant="primary" size="md">
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
