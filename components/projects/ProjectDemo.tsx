'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

const kestrelDemoVideos = {
  quick: '/videos/projects/kestrel/kestrel-quick.mp4',
  full: '/videos/projects/kestrel/kestrel-full.mp4',
} as const

export function ProjectDemo({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.10))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)
  const hasKestrelVideoDemo = project.slug === 'kestrel'

  return (
    <main className="bg-bg min-h-screen pt-16">
      <div className="max-w-[900px] mx-auto px-6 py-12 pb-32">

        {/* Back nav */}
        <motion.div variants={inn} initial="hidden" animate="visible">
          <Link
            href={`/projects/${project.slug}`}
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
            Back to Case Study
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          {/* Eyebrow */}
          <motion.div variants={inn} className="mb-4">
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
                Demo
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={up}
            className="font-display text-h1 text-text-base leading-tight"
          >
            {project.name}
          </motion.h1>

          <motion.p
            variants={up}
            className="font-sans text-[17px] leading-relaxed mt-3"
            style={{ color: '#A8C5D1' }}
          >
            {project.tagline}
          </motion.p>

          <motion.div variants={inn} className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="category" />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Demo embed area ──────────────────────────────────────────────── */}
        <motion.div
          variants={up}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.demoUrl ? (
            /* Live demo embed (Loom / YouTube / iframe) */
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: `1px solid ${project.panelAccentColor}22`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.40)',
                aspectRatio: '16 / 9',
              }}
            >
              <iframe
                src={project.demoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${project.name} demo`}
              />
            </div>
          ) : hasKestrelVideoDemo ? (
            <div
              className="relative w-full overflow-hidden rounded-2xl p-4 sm:p-5"
              style={{
                background: 'linear-gradient(145deg, rgba(9,26,44,0.92), rgba(12,39,56,0.72))',
                border: `1px solid ${project.panelAccentColor}26`,
                boxShadow: '0 18px 55px rgba(0,0,0,0.42)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full blur-3xl"
                style={{ background: `${project.panelAccentColor}1C` }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-8 top-10 h-px w-28 rotate-12"
                style={{ background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}44, transparent)` }}
                aria-hidden
              />

              <div className="relative mb-4">
                <div>
                  <div
                    className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{
                      background: `${project.panelAccentColor}12`,
                      border: `1px solid ${project.panelAccentColor}28`,
                    }}
                  >
                    <StarMark size="xs" color={project.panelAccentColor} className="opacity-75" />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{ color: project.panelAccentColor }}
                    >
                      Quick demo
                    </span>
                  </div>
                  <h2 className="font-display text-[28px] leading-none text-text-base sm:text-[34px]">
                    90-sec walkthrough
                  </h2>
                  <p className="mt-3 max-w-[620px] font-sans text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                    Watch how Kestrel turns a target job description into readiness signals, explainable gaps, and next steps.
                  </p>
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-[18px]"
                style={{
                  background: 'rgba(0,0,0,0.34)',
                  border: `1px solid ${project.panelAccentColor}22`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 40px rgba(0,0,0,0.34)',
                  aspectRatio: '16 / 9',
                }}
              >
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  aria-label="Kestrel quick demo video"
                >
                  <source src={kestrelDemoVideos.quick} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <details
                className="group mt-4 overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(7,20,36,0.46)',
                  border: `1px solid ${project.panelAccentColor}18`,
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 transition-colors duration-200 hover:bg-white/[0.025]">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-base">
                      Watch full 5:13 walkthrough
                    </p>
                    <p className="mt-1 font-sans text-[12px] text-text-muted">
                      Secondary deep dive with the full product flow.
                    </p>
                  </div>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[14px]"
                    style={{
                      color: project.panelAccentColor,
                      background: `${project.panelAccentColor}10`,
                      border: `1px solid ${project.panelAccentColor}22`,
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4">
                  <div
                    className="overflow-hidden rounded-xl"
                    style={{
                      background: 'rgba(0,0,0,0.34)',
                      border: `1px solid ${project.panelAccentColor}18`,
                      aspectRatio: '16 / 9',
                    }}
                  >
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                      aria-label="Kestrel full walkthrough video"
                    >
                      <source src={kestrelDemoVideos.full} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            /* Placeholder — swap for an iframe or video when ready */
            <div
              className="w-full flex flex-col items-center justify-center py-24 rounded-2xl"
              style={{
                background: 'rgba(15,42,61,0.40)',
                border: `1px dashed ${project.panelAccentColor}28`,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                style={{ opacity: 0.18 }}
              >
                <StarMark size="xl" color={project.panelAccentColor} />
              </motion.div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted mt-6">
                Interactive demo coming soon
              </p>
              {project.liveUrl && (
                <p className="font-sans text-[13px] text-text-muted opacity-60 mt-2">
                  Try the live product in the meantime ↓
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Screenshots ─────────────────────────────────────────────────── */}
        {project.screenshots.length > 0 && (
          <motion.div
            variants={inn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <StarMark size="xs" color={project.panelAccentColor} className="opacity-55" />
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                style={{ color: project.panelAccentColor }}
              >
                Preview
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'rgba(15,122,122,0.12)' }}
                aria-hidden
              />
            </div>

            <div
              className={`grid gap-4 ${
                project.screenshots.length > 1 ? 'md:grid-cols-2' : ''
              }`}
            >
              {project.screenshots.map((shot, i) => (
                <div
                  key={i}
                  className="relative aspect-[1.85/1] rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(10,22,40,0.28)',
                    border: `1px solid ${project.panelAccentColor}20`,
                    boxShadow: '0 12px 36px rgba(0,0,0,0.28)',
                  }}
                >
                  <Image
                    src={shot}
                    alt={`${project.name} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── CTA row ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={inn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-10 flex flex-wrap gap-3"
          style={{ borderTop: '1px solid rgba(15,122,122,0.12)' }}
        >
          {project.liveUrl ? (
            <HoverSparkle className="inline-flex">
              <StarburstButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                Try It Out
              </StarburstButton>
            </HoverSparkle>
          ) : null}

          <HoverSparkle className="inline-flex">
            <StarburstButton
              href={`/projects/${project.slug}`}
              variant={project.liveUrl ? 'secondary' : 'primary'}
              size="md"
            >
              View Case Study
            </StarburstButton>
          </HoverSparkle>

          <HoverSparkle className="inline-flex">
            <StarburstButton href="/#projects" variant="secondary" size="md">
              ← All Projects
            </StarburstButton>
          </HoverSparkle>
        </motion.div>

      </div>
    </main>
  )
}
