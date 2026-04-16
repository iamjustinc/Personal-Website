'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

function FloatingProjectVisual({
  project,
  priority = false,
}: {
  project: (typeof projects)[number]
  priority?: boolean
}) {
  const landingShot = project.screenshots?.[0] || project.thumbnail
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${project.panelAccentColor}22 0%, rgba(10,22,40,0) 42%), radial-gradient(circle at 75% 70%, rgba(196,151,74,0.10) 0%, rgba(10,22,40,0) 30%)`,
        }}
      />

      {/* slow floating star texture */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.05 }}
        >
          <StarMark size="2xl" color={project.panelAccentColor} />
        </motion.div>
      </div>

      {/* landing image */}
      {landingShot && (
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-2, -1, -2] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[8%] top-[10%] h-[68%] w-[58%] rounded-[22px] overflow-hidden"
          style={{
            background: 'rgba(245,248,251,0.96)',
            border: `1px solid ${project.panelAccentColor}22`,
            boxShadow: `0 22px 60px rgba(0,0,0,0.28), 0 0 0 1px ${project.panelAccentColor}10 inset`,
          }}
        >
          <Image
            src={landingShot}
            alt={`${project.name} landing view`}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-contain object-center scale-[1.22]"
            priority={priority}
          />
        </motion.div>
      )}

      {/* interface image */}
      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [2.2, 1.1, 2.2] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="absolute right-[7%] bottom-[10%] h-[56%] w-[60%] rounded-[22px] overflow-hidden"
          style={{
            background: 'rgba(245,248,251,0.98)',
            border: `1px solid ${project.panelAccentColor}2A`,
            boxShadow: `0 28px 72px rgba(0,0,0,0.34), 0 0 0 1px ${project.panelAccentColor}12 inset`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.0) 0%, ${project.panelAccentColor}08 100%)`,
            }}
          />
          <Image
            src={interfaceShot}
            alt={`${project.name} interface view`}
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-contain object-center scale-[1.16]"
          />
        </motion.div>
      )}

      {/* accent glow under front card */}
      <div
        className="absolute right-[14%] bottom-[8%] h-10 w-[34%] blur-2xl rounded-full"
        style={{ background: `${project.panelAccentColor}33` }}
      />

      {/* corner star marks */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-45" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-45" />
      </div>
    </div>
  )
}

/**
 * Projects section — alternating editorial layout with richer media motion.
 */
export function ProjectsSection() {
  const stagger = useMotionSafe(staggerContainer(0.14))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  const visibleProjects = [
    ...projects.filter((p) => p.visible && p.homepageVisible && p.featured),
    ...projects
      .filter((p) => p.visible && p.homepageVisible && !p.featured)
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
        <h2 className="font-display text-h1 text-text-base">What I&apos;ve Built!</h2>
        <p className="font-sans text-text-muted mt-3 max-w-[460px]" style={{ fontSize: '15px' }}>
          Built to show how I think across product, implementation, and technical communication.
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
                y: -6,
                boxShadow: '0 24px 68px rgba(0,0,0,0.66), 0 0 0 1px rgba(15,122,122,0.30)',
              }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn('grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden cursor-default')}
              style={{
                background: 'rgba(15,42,61,0.60)',
                border: '1px solid rgba(15,122,122,0.14)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.30)',
              }}
            >
              {/* Media */}
              <div
                className={cn(
                  'relative overflow-hidden min-h-[320px] lg:min-h-[460px]',
                  isReversed ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                {/* gradient wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(155deg, ${project.panelAccentColor}16 0%, rgba(10,22,40,0.22) 45%, rgba(10,22,40,0.78) 100%)`,
                  }}
                />

                <FloatingProjectVisual project={project} priority={index === 0} />

                {/* Project number badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
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

                {/* frame border inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${project.panelAccentColor}16` }}
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  'flex flex-col justify-center p-8 lg:p-12',
                  isReversed ? 'lg:order-1' : 'lg:order-2',
                )}
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.slice(0, 3).map((tag) => (
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

                <h3 className="font-display text-h1 text-text-base leading-tight">{project.name}</h3>
                <p className="font-mono text-[11px] text-text-muted mt-2 tracking-wider uppercase">
                  {project.year} · {project.role}
                </p>

                <p
                  className="font-sans mt-5 leading-relaxed"
                  style={{ fontSize: '15px', color: '#A8C5D1' }}
                >
                  {project.tagline}
                </p>

                {project.outcome && (
                  <div
                    className="mt-5 inline-flex items-start gap-2 self-start px-4 py-2.5 rounded-btn"
                    style={{
                      background: `${project.panelAccentColor}10`,
                      border: `1px solid ${project.panelAccentColor}22`,
                    }}
                  >
                    <StarMark
                      size="xs"
                      color={project.panelAccentColor}
                      className="opacity-55 mt-0.5 shrink-0"
                    />
                    <span className="font-sans text-sm leading-snug text-text-muted">
                      {project.outcome}
                    </span>
                  </div>
                )}

                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.stack.slice(0, 4).map((s) => (
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

                {/* ── CTA row ─────────────────────────────────────────── */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <HoverSparkle className="inline-flex">
                    <StarburstButton href={`/projects/${project.slug}`} variant="primary" size="sm">
                      View Case Study
                    </StarburstButton>
                  </HoverSparkle>
                  <HoverSparkle className="inline-flex">
                    <StarburstButton href={`/projects/${project.slug}/demo`} variant="secondary" size="sm">
                      Demo
                    </StarburstButton>
                  </HoverSparkle>
                  {project.liveUrl && (
                    <HoverSparkle className="inline-flex">
                      <StarburstButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                      >
                        Try It Live ↗
                      </StarburstButton>
                    </HoverSparkle>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}