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

export function ProjectDemo({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.10))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

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
                Screenshots
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
