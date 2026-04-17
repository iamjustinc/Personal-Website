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
    <div className="relative h-[360px] md:h-[460px] lg:h-[540px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.18) 45%, rgba(10,22,40,0.74) 100%)`,
        }}
      />

      <div
        className="absolute left-[6%] top-[10%] h-[62%] w-[60%]"
        style={{ background: `linear-gradient(180deg, ${project.panelAccentColor}08 0%, transparent 100%)` }}
      />

      <div
        className="absolute right-[9%] bottom-[12%] h-[54%] w-[56%]"
        style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)` }}
      />

      {landingShot && (
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[6%] top-[11%] h-[60%] w-[58%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 18px 54px rgba(0,0,0,0.36)' }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing`}
            fill
            className="object-cover object-left-top"
            priority
          />
        </motion.div>
      )}

      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [2, 1, 2] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute right-[7%] bottom-[8%] h-[54%] w-[62%] rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.38)' }}
        >
          <Image
            src={interfaceShot}
            alt={`${project.name} interface`}
            fill
            className="object-cover object-top"
          />
        </motion.div>
      )}

      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-45" />
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

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0 rounded-[28px] overflow-hidden border border-[rgba(15,122,122,0.14)] bg-[rgba(15,42,61,0.56)]">
            <div className="relative min-h-[360px] lg:min-h-[540px]">
              <FloatingCaseVisual project={project} />
              <div
                className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
                style={{
                  background: 'rgba(13,30,53,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${project.panelAccentColor}28`,
                }}
              >
                <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                  01
                </span>
              </div>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center p-8 lg:p-12"
            >
              <motion.div variants={inn} className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="category" />
                ))}
              </motion.div>

              <motion.h1
                variants={up}
                className="font-display text-h1 text-text-base leading-none"
              >
                {project.name}
              </motion.h1>

              <motion.p
                variants={up}
                className="font-mono text-[11px] text-text-muted mt-3 tracking-wider uppercase"
              >
                {project.year} · {project.role}
              </motion.p>

              <motion.p
                variants={up}
                className="font-sans text-[17px] leading-[1.65] mt-6 max-w-[26ch]"
                style={{ color: '#A8C5D1' }}
              >
                {project.tagline}
              </motion.p>

              {project.outcome && (
                <motion.div variants={up}>
                  <Callout accent={project.panelAccentColor}>{project.outcome}</Callout>
                </motion.div>
              )}

              <motion.div variants={inn} className="flex flex-wrap gap-1.5 mt-6">
                {project.stack.slice(0, 5).map((s) => (
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
              </motion.div>

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

      <motion.div variants={inn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FactStrip project={project} />
      </motion.div>

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