'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Projects section — alternating editorial layout with premium card motion.
 *
 * Featured project sorts first. Even-index: image left, content right.
 * Odd-index: content left, image right.
 *
 * Each card lifts and glows on hover. The CTA button uses the angular
 * clip-path treatment. A slow-rotating star lives inside each image frame
 * as atmospheric texture.
 */
export function ProjectsSection() {
  const stagger = useMotionSafe(staggerContainer(0.14))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  const visibleProjects = [
    ...projects.filter(p => p.visible && p.homepageVisible && p.featured),
    ...projects.filter(p => p.visible && p.homepageVisible && !p.featured)
      .sort((a, b) => a.order - b.order),
  ]

  return (
    <Section id="projects" paddingY="lg">

      {/* Heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
          style={{
            background: 'rgba(15,122,122,0.08)',
            border: '1px solid rgba(15,122,122,0.22)',
          }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-80" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
            Featured Work
          </span>
        </div>
        <h2 className="font-display text-h1 text-text-base">What I&apos;ve Built</h2>
        <p className="font-sans text-text-muted mt-3 max-w-[460px]" style={{ fontSize: '15px' }}>
          Built at the intersection of technical systems and real human workflows.
        </p>
      </motion.div>

      {/* Project list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="flex flex-col gap-8"
      >
        {visibleProjects.map((project, index) => {
          const isReversed = index % 2 === 1

          return (
            <motion.div
              key={project.slug}
              variants={up}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(15,122,122,0.30)',
              }}
              transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden cursor-default',
              )}
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
              }}
            >
              {/* ── Image ──────────────────────────────────────────────── */}
              <div
                className={cn(
                  'relative overflow-hidden min-h-[280px] lg:min-h-[420px]',
                  isReversed ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                    className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                    style={{ opacity: 0.58 }}
                    priority={index === 0}
                  />
                )}

                {/* Color overlay with project accent */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(155deg, ${project.panelAccentColor}20 0%, rgba(10,22,40,0.45) 60%, rgba(10,22,40,0.82) 100%)`,
                  }}
                />

                {/* Rotating star inside frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                    style={{ opacity: 0.07 }}
                  >
                    <StarMark size="2xl" color={project.panelAccentColor} />
                  </motion.div>
                </div>

                {/* Corner star marks */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-45" />
                </div>
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <StarMark size="xs" color="#C4974A" className="opacity-45" />
                </div>

                {/* Project number badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: 'rgba(13,30,53,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${project.panelAccentColor}28`,
                  }}
                >
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                    Project {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Frame border inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${project.panelAccentColor}16` }}
                />
              </div>

              {/* ── Content ──────────────────────────────────────────────── */}
              <div
                className={cn(
                  'flex flex-col justify-center p-8 lg:p-12',
                  isReversed ? 'lg:order-1' : 'lg:order-2',
                )}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        background: `${project.panelAccentColor}14`,
                        border: `1px solid ${project.panelAccentColor}28`,
                        color: '#A8C5D1',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-h1 text-text-base leading-tight">
                  {project.name}
                </h3>
                <p className="font-mono text-[11px] text-text-muted mt-2 tracking-wider uppercase">
                  {project.year} · {project.role}
                </p>

                <p
                  className="font-sans mt-5 leading-relaxed"
                  style={{ fontSize: '15px', color: '#A8C5D1' }}
                >
                  {project.tagline}
                </p>

                {/* Outcome badge */}
                {project.outcome && (
                  <div
                    className="mt-5 inline-flex items-start gap-2 self-start px-4 py-2.5 rounded-btn"
                    style={{
                      background: `${project.panelAccentColor}10`,
                      border: `1px solid ${project.panelAccentColor}22`,
                    }}
                  >
                    <StarMark size="xs" color={project.panelAccentColor} className="opacity-55 mt-0.5 shrink-0" />
                    <span className="font-sans text-sm leading-snug text-text-muted">
                      {project.outcome}
                    </span>
                  </div>
                )}

                {/* Stack */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.stack.slice(0, 4).map(s => (
                      <span
                        key={s}
                        className="font-mono text-[9.5px] px-2.5 py-1 rounded-btn"
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
                )}

                {/* CTA */}
                <div className="mt-9">
                  <StarburstButton href={`/projects/${project.slug}`} variant="primary" size="md">
                    View Case Study →
                  </StarburstButton>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
