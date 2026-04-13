'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Projects section — alternating editorial layout.
 * Each project gets a full-width two-column composition.
 * Even-indexed projects: image left, content right.
 * Odd-indexed: content left, image right.
 *
 * The featured project is sorted first regardless of order.
 */
export function ProjectsSection() {
  const stagger = useMotionSafe(staggerContainer(0.12))
  const up      = useMotionSafe(fadeUp)
  const inn     = useMotionSafe(fadeIn)

  const visibleProjects = [
    ...projects.filter(p => p.visible && p.homepageVisible && p.featured),
    ...projects.filter(p => p.visible && p.homepageVisible && !p.featured)
      .sort((a, b) => a.order - b.order),
  ]

  return (
    <Section id="projects" paddingY="lg">
      {/* Section heading */}
      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        {/* Label with star */}
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
        <h2 className="font-display text-h1 text-text-base">Selected Projects</h2>
        <p className="font-sans text-text-muted mt-3 max-w-[480px]" style={{ fontSize: '15px' }}>
          A focused set of products built at the intersection of technical and human.
        </p>
      </motion.div>

      {/* Project list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="flex flex-col gap-10"
      >
        {visibleProjects.map((project, index) => {
          const isReversed = index % 2 === 1

          return (
            <motion.div
              key={project.slug}
              variants={up}
              className={cn(
                'grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden',
                'transition-shadow duration-400 ease-premium hover:shadow-card-hover',
              )}
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
              }}
            >
              {/* Image column */}
              <div
                className={cn(
                  'relative overflow-hidden min-h-[280px] lg:min-h-[400px]',
                  isReversed ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                    className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
                    style={{ opacity: 0.60 }}
                    priority={index === 0}
                  />
                )}

                {/* Color overlay — uses project accent */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${project.panelAccentColor}22 0%, rgba(10,22,40,0.50) 70%, rgba(10,22,40,0.80) 100%)`,
                  }}
                />

                {/* Rotating star inside frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                    style={{ opacity: 0.06 }}
                  >
                    <StarMark size="2xl" color={project.panelAccentColor} />
                  </motion.div>
                </div>

                {/* Corner star marks */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-50" />
                </div>
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-50" />
                </div>

                {/* Project number stamp — top right */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: 'rgba(13,30,53,0.82)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${project.panelAccentColor}30`,
                  }}
                >
                  <StarMark size="xs" color={project.panelAccentColor} className="opacity-70" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                    Project {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Frame border */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: `1px solid ${project.panelAccentColor}18` }}
                />
              </div>

              {/* Content column */}
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

                {/* Name */}
                <h3 className="font-display text-h1 text-text-base leading-tight">
                  {project.name}
                </h3>

                {/* Meta */}
                <p className="font-mono text-[11px] text-text-muted mt-2 tracking-wider uppercase">
                  {project.year} · {project.role}
                </p>

                {/* Tagline */}
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
                      background: `${project.panelAccentColor}12`,
                      border: `1px solid ${project.panelAccentColor}22`,
                    }}
                  >
                    <StarMark size="xs" color={project.panelAccentColor} className="opacity-60 mt-0.5 shrink-0" />
                    <span className="font-sans text-sm text-text-muted leading-snug">
                      {project.outcome}
                    </span>
                  </div>
                )}

                {/* Stack pills */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.stack.slice(0, 4).map(s => (
                      <span
                        key={s}
                        className="font-mono text-[10px] text-text-muted px-2.5 py-1 rounded-btn"
                        style={{
                          background: 'rgba(15,42,61,0.80)',
                          border: '1px solid rgba(15,122,122,0.14)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8">
                  <motion.a
                    href={`/projects/${project.slug}`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 font-sans font-medium text-white text-[14px]"
                  >
                    <span
                      className="px-6 py-2.5 btn-angular flex items-center gap-2 transition-shadow duration-300 hover:shadow-glow"
                      style={{ background: `linear-gradient(135deg, ${project.panelAccentColor}, #4A9FAE)` }}
                    >
                      View Case Study
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
