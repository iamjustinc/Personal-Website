'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import type { Project } from '@/types/project'
import { fadeIn, fadeUp, staggerContainer, useMotionSafe } from '@/lib/motion'

type ProjectComingSoonProps = {
  project: Project
  surface?: 'caseStudy' | 'demo'
}

const previewCopy: Record<
  string,
  {
    status: string
    note: string
    signals: string[]
  }
> = {
  chirpie: {
    status: 'Conversational news case study in progress',
    note:
      'Chirpie is being tightened into a cleaner product story around source-aware summaries, trust cues, and lightweight follow-up depth.',
    signals: ['Source-aware digests', 'Trust-first summaries', 'Conversational UX'],
  },
  quail: {
    status: 'Inbox intelligence case study in progress',
    note:
      'Quail Mail is being polished into a sharper workflow story around priority signals, action lanes, and explainable inbox triage.',
    signals: ['Priority scoring', 'Actionable triage', 'Workflow clarity'],
  },
}

export function ProjectComingSoon({
  project,
  surface = 'caseStudy',
}: ProjectComingSoonProps) {
  const reduceMotion = useReducedMotion()
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)
  const copy = previewCopy[project.slug] ?? {
    status: 'Project case study in progress',
    note: 'This project preview is being finalized into a clearer, more polished case study.',
    signals: project.tags.slice(0, 3),
  }
  const statusText =
    surface === 'demo' ? `${project.name} demo coming soon` : copy.status

  return (
    <main className="min-h-screen bg-bg pt-16">
      <section
        className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20"
        style={{
          background: `linear-gradient(155deg, ${project.panelAccentColor}13 0%, rgba(10,22,40,0) 48%, rgba(8,18,30,0.76) 100%)`,
          borderBottom: '1px solid rgba(15,122,122,0.10)',
        }}
      >
        <div className="pointer-events-none absolute right-0 top-0 overflow-hidden" aria-hidden>
          <WatermarkStar
            size={560}
            opacity={0.024}
            direction={-1}
            color={project.panelAccentColor}
          />
        </div>

        <div
          className="pointer-events-none absolute left-[8%] top-[16%] h-64 w-64 rounded-full blur-[90px]"
          style={{ background: `${project.panelAccentColor}14` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[14%] h-56 w-56 rounded-full blur-[90px]"
          style={{ background: 'rgba(196,151,74,0.10)' }}
          aria-hidden
        />

        {!reduceMotion && (
          <>
            {[0, 1, 2, 3].map((star) => (
              <motion.div
                key={star}
                className="pointer-events-none absolute"
                style={{
                  left: ['11%', '76%', '88%', '24%'][star],
                  top: ['24%', '18%', '66%', '78%'][star],
                }}
                animate={{ opacity: [0.08, 0.32, 0.08], scale: [0.75, 1.1, 0.75] }}
                transition={{
                  duration: 3.4 + star * 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: star * 0.35,
                }}
                aria-hidden
              >
                <StarMark
                  size="xs"
                  color={star === 1 ? '#C4974A' : project.panelAccentColor}
                />
              </motion.div>
            ))}
          </>
        )}

        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div
              variants={inn}
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: `${project.panelAccentColor}12`,
                border: `1px solid ${project.panelAccentColor}2F`,
              }}
            >
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                style={{ color: project.panelAccentColor }}
              >
                Coming Soon
              </span>
            </motion.div>

            <motion.h1 variants={up} className="font-display text-hero leading-none text-text-base">
              {project.name}
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-4 max-w-[620px] font-sans text-[17px] leading-relaxed"
              style={{ color: '#A8C5D1' }}
            >
              {statusText}
            </motion.p>

            <motion.p
              variants={up}
              className="mt-4 max-w-[620px] font-sans text-[14.5px] leading-relaxed"
              style={{ color: '#7FAFBB' }}
            >
              {surface === 'demo'
                ? 'The live demo and walkthrough are currently paused while this product is being finalized.'
                : copy.note}
            </motion.p>

            <motion.div variants={inn} className="mt-7 flex flex-wrap gap-2.5">
              {copy.signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.11em]"
                  style={{
                    background: 'rgba(15,42,61,0.74)',
                    border: `1px solid ${project.panelAccentColor}2E`,
                    color: '#B8DDE6',
                  }}
                >
                  {signal}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={inn}
              className="mt-9 flex flex-wrap gap-3 border-t pt-8"
              style={{ borderColor: 'rgba(74,159,174,0.12)' }}
            >
              <HoverSparkle className="inline-flex">
                <StarburstButton href="/projects/kestrel" variant="primary" size="md">
                  View Kestrel
                </StarburstButton>
              </HoverSparkle>

              <HoverSparkle className="inline-flex">
                <StarburstButton href="/work" variant="secondary" size="md">
                  Back to Portfolio
                </StarburstButton>
              </HoverSparkle>
            </motion.div>
          </motion.div>

          <motion.div
            variants={up}
            initial="hidden"
            animate="visible"
            className="relative min-h-[360px] overflow-hidden rounded-[30px] sm:min-h-[440px] lg:min-h-[520px]"
            style={{
              background:
                'linear-gradient(145deg, rgba(15,42,61,0.62), rgba(8,18,30,0.88))',
              border: `1px solid ${project.panelAccentColor}24`,
              boxShadow: '0 24px 72px rgba(0,0,0,0.48)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}70, rgba(196,151,74,0.42), transparent)`,
              }}
              aria-hidden
            />

            <ProjectFloatingScreenshots
              project={project}
              showWatermark
              imageSizes="(max-width: 1024px) 100vw, 620px"
            />

            <div
              className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{
                background: 'rgba(8,18,30,0.78)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${project.panelAccentColor}32`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: project.panelAccentColor,
                  boxShadow: `0 0 10px ${project.panelAccentColor}80`,
                }}
              />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-text-muted">
                Preview only
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
