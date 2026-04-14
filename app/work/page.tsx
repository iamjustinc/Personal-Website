'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn } from '@/lib/motion'

function getYouTubeId(url: string) {
  return url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/)?.[1] ?? null
}

function WorkProjectVisual({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  const landingShot = project.screenshots?.[0] || project.thumbnail
  const interfaceShot = project.screenshots?.[1]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 26% 26%, ${project.panelAccentColor}22 0%, rgba(10,22,40,0) 42%), radial-gradient(circle at 74% 74%, rgba(196,151,74,0.10) 0%, rgba(10,22,40,0) 30%)`,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.05 }}
        >
          <StarMark size="2xl" color={project.panelAccentColor} />
        </motion.div>
      </div>

      {landingShot && (
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1.8, -0.8, -1.8] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[7%] top-[10%] h-[70%] w-[58%] rounded-[24px] overflow-hidden"
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
            sizes="(max-width: 1024px) 100vw, 440px"
            className="object-contain object-center p-3"
            priority={priority}
          />
        </motion.div>
      )}

      {interfaceShot && (
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [2.2, 1.2, 2.2] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          className="absolute right-[6%] bottom-[10%] h-[58%] w-[62%] rounded-[24px] overflow-hidden"
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
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-contain object-center p-3"
          />
        </motion.div>
      )}

      <div
        className="absolute right-[14%] bottom-[8%] h-10 w-[34%] blur-2xl rounded-full"
        style={{ background: `${project.panelAccentColor}33` }}
      />

      <div className="absolute top-4 left-4 pointer-events-none">
        <StarMark size="xs" color={project.panelAccentColor} className="opacity-45" />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <StarMark size="xs" color="#C4974A" className="opacity-40" />
      </div>
    </div>
  )
}

function WorkProjectCard({
  project,
  reversed,
  index,
}: {
  project: Project
  reversed: boolean
  index: number
}) {
  const youtubeId = project.demoVideo ? getYouTubeId(project.demoVideo) : null
  const isLoom = project.demoVideo?.includes('loom.com')

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        y: -6,
        boxShadow: '0 24px 68px rgba(0,0,0,0.60), 0 0 0 1px rgba(15,122,122,0.24)',
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(15,42,61,0.50)',
        border: '1px solid rgba(15,122,122,0.14)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.28)',
      }}
    >
      <div className={`flex flex-col lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        {/* Media column */}
        <div className="relative lg:w-[48%] min-h-[340px] lg:min-h-[500px] overflow-hidden shrink-0">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${project.panelAccentColor}18 0%, rgba(10,22,40,0.26) 44%, rgba(10,22,40,0.82) 100%)`,
            }}
          />

          <WorkProjectVisual project={project} priority={index === 0} />

          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
            style={{
              background: 'rgba(10,20,40,0.85)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${project.panelAccentColor}28`,
            }}
          >
            <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-center p-8 lg:p-12 lg:flex-1">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full"
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

          <h2 className="font-display text-h1 text-text-base leading-tight">{project.name}</h2>
          <p className="font-mono text-[11px] text-text-muted mt-2 tracking-wider uppercase">
            {project.year} · {project.role}
          </p>

          <p
            className="font-sans mt-5 leading-relaxed"
            style={{ fontSize: '15px', color: '#A8C5D1' }}
          >
            {project.tagline}
          </p>

          {project.problem && (
            <div className="mt-6 space-y-4">
              <div>
                <p
                  className="font-mono text-[9.5px] uppercase tracking-[0.12em] mb-1.5"
                  style={{ color: '#4A9FAE' }}
                >
                  Problem
                </p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#8DAFC0' }}>
                  {project.problem}
                </p>
              </div>

              {project.solution && (
                <div>
                  <p
                    className="font-mono text-[9.5px] uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: '#4A9FAE' }}
                  >
                    Solution
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#8DAFC0' }}>
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.impact && (
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background: `${project.panelAccentColor}0D`,
                border: `1px solid ${project.panelAccentColor}22`,
              }}
            >
              <div className="flex items-start gap-2.5">
                <StarMark
                  size="xs"
                  color={project.panelAccentColor}
                  className="opacity-70 mt-0.5 shrink-0"
                />
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider mb-1.5"
                    style={{ color: project.panelAccentColor }}
                  >
                    Impact
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#A8C5D1' }}>
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.stack.map((s) => (
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

          <div className="mt-8">
            <HoverSparkle className="inline-flex">
              <StarburstButton href={`/projects/${project.slug}`} variant="primary" size="md">
                View Full Case Study →
              </StarburstButton>
            </HoverSparkle>
          </div>
        </div>
      </div>

      {(youtubeId || isLoom) && (
        <div className="border-t overflow-hidden" style={{ borderColor: 'rgba(15,122,122,0.12)' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={
                youtubeId
                  ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
                  : project.demoVideo!.replace('share', 'embed')
              }
              title={`${project.name} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </motion.article>
  )
}

export default function WorkPage() {
  const visibleProjects = [
    ...projects.filter((p) => p.visible && p.featured),
    ...projects.filter((p) => p.visible && !p.featured).sort((a, b) => a.order - b.order),
  ]

  return (
    <main className="pt-16 min-h-screen">
      <Section paddingY="lg">
        <div className="absolute top-32 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar size={480} opacity={0.035} direction={-1} />
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Portfolio
            </span>
          </div>

          <h1 className="font-display text-hero text-text-base leading-none">Selected Work</h1>

          <p
            className="font-sans mt-5 max-w-[520px] leading-relaxed"
            style={{ fontSize: '16px', color: '#A8C5D1' }}
          >
            Three products built end-to-end — from idea and system design through to shipped
            experience. Each one targets a real gap in how people work with information.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {visibleProjects.map((project, i) => (
            <WorkProjectCard
              key={project.slug}
              project={project}
              reversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </Section>
    </main>
  )
}