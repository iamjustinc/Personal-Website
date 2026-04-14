'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

// ── Skill categories ────────────────────────────────────────────────────────

const skillCategories = [
  {
    label: 'Product & Strategy',
    color: '#4A9FAE',
    items: siteConfig.capabilities.map(c => c.label),
  },
  {
    label: 'Technical',
    color: '#0F7A7A',
    items: [
      siteConfig.aboutHighlights?.[2] ?? '',
      siteConfig.aboutHighlights?.[3] ?? '',
      'API integration & system design',
      'Prompt engineering & LLM pipelines',
    ].filter(Boolean),
  },
  {
    label: 'Communication',
    color: '#C4974A',
    items: [
      siteConfig.aboutHighlights?.[0] ?? '',
      siteConfig.aboutHighlights?.[1] ?? '',
      siteConfig.capabilities[2]?.label ?? '',
      'Stakeholder alignment & demos',
    ].filter(Boolean),
  },
]

// ── Components ──────────────────────────────────────────────────────────────

function TimelineEntry({
  item,
  index,
}: {
  item: NonNullable<typeof siteConfig.career>[0]
  index: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-[80px_28px_1fr] gap-0 items-start"
    >
      {/* Year column */}
      <div className="pt-1 pr-4 text-right">
        <span
          className="font-mono text-[11px] leading-tight block"
          style={{ color: item.current ? '#C4974A' : 'rgba(168,197,209,0.45)' }}
        >
          {item.period.replace('— Present', '–\nNow').split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </span>
      </div>

      {/* Divider with star node */}
      <div className="flex flex-col items-center gap-0 pt-1">
        <div
          className="w-px flex-1 min-h-[8px]"
          style={{ background: item.current ? 'rgba(196,151,74,0.35)' : 'rgba(15,122,122,0.25)' }}
        />
        <StarMark
          size="xs"
          color={item.current ? '#C4974A' : '#0F7A7A'}
          className={item.current ? 'opacity-90' : 'opacity-50'}
        />
        <div
          className="w-px flex-1"
          style={{ background: 'rgba(15,122,122,0.15)', minHeight: index === 0 ? 40 : 0 }}
        />
      </div>

      {/* Content card */}
      <div
        className={`ml-4 mb-8 p-6 rounded-2xl ${item.current ? 'relative' : ''}`}
        style={{
          background: 'rgba(15,42,61,0.50)',
          border: item.current
            ? '1px solid rgba(196,151,74,0.22)'
            : '1px solid rgba(15,122,122,0.12)',
          boxShadow: item.current ? '0 0 32px rgba(196,151,74,0.05)' : 'none',
        }}
      >
        {/* Current badge */}
        {item.current && (
          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-mono text-[9px] uppercase tracking-wider rounded-full px-2.5 py-0.5"
              style={{
                background: 'rgba(196,151,74,0.10)',
                border: '1px solid rgba(196,151,74,0.28)',
                color: '#C4974A',
              }}
            >
              Now
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3
              className="font-display text-h3 leading-tight"
              style={{ color: '#4A9FAE' }}
            >
              {item.company}
            </h3>
            <p className="font-sans text-sm font-semibold text-text-base mt-0.5">
              {item.role}
            </p>
          </div>
          <span
            className="font-mono text-[10px] tracking-wider shrink-0"
            style={{ color: 'rgba(168,197,209,0.40)' }}
          >
            {item.period}
          </span>
        </div>

        <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: '#8DAFC0' }}>
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-btn"
                style={{
                  background: 'rgba(15,42,61,0.80)',
                  border: '1px solid rgba(15,122,122,0.14)',
                  color: '#6A9BAA',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const visibleProjects = projects.filter(p => p.visible)

  return (
    <main className="pt-16 min-h-screen">
      <Section paddingY="lg">
        {/* Background watermark */}
        <div className="absolute top-24 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar size={460} opacity={0.035} direction={-1} />
        </div>

        <div className="max-w-[820px] mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(0.10)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 pb-10"
            style={{ borderBottom: '1px solid rgba(15,122,122,0.14)' }}
          >
            {/* Label pill */}
            <motion.div variants={fadeIn} className="mb-6">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: 'rgba(15,122,122,0.08)',
                  border: '1px solid rgba(15,122,122,0.22)',
                }}
              >
                <StarMark size="xs" color="#C4974A" className="opacity-80" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                  Résumé
                </span>
              </div>
            </motion.div>

            {/* Name + role */}
            <motion.div variants={fadeUp}>
              <h1 className="font-display text-hero text-text-base leading-none">
                {siteConfig.name.split(' ')[0]}{' '}
                <span style={{ color: '#4A9FAE' }}>
                  {siteConfig.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p
                className="font-mono text-[11.5px] uppercase tracking-wider mt-3"
                style={{ color: '#4A9FAE' }}
              >
                {siteConfig.roleTag}
              </p>
            </motion.div>

            {/* Contact links */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                {siteConfig.email}
              </a>
              <span style={{ color: 'rgba(168,197,209,0.20)' }}>
                <StarMark size="xs" color="rgba(15,122,122,0.40)" />
              </span>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                LinkedIn
              </a>
              <span style={{ color: 'rgba(168,197,209,0.20)' }}>
                <StarMark size="xs" color="rgba(15,122,122,0.40)" />
              </span>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm transition-colors hover:text-text-base"
                style={{ color: '#A8C5D1' }}
              >
                GitHub
              </a>
            </motion.div>

            {/* Download button */}
            <motion.div variants={fadeIn} className="mt-7">
              <HoverSparkle className="inline-flex">
                <StarburstButton
                  href={siteConfig.resumeUrl}
                  download
                  variant="secondary"
                  size="md"
                  starSpin
                >
                  Download PDF ↓
                </StarburstButton>
              </HoverSparkle>
            </motion.div>
          </motion.div>

          {/* ── Experience timeline ──────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionDivider>Experience</SectionDivider>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 mb-14"
          >
            {(siteConfig.career ?? []).map((item, i) => (
              <TimelineEntry key={i} item={item} index={i} />
            ))}
          </motion.div>

          {/* ── Skills ──────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionDivider>Skills</SectionDivider>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-5 mt-8 mb-14"
          >
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(15,42,61,0.50)',
                  border: '1px solid rgba(15,122,122,0.14)',
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <StarMark size="xs" color={cat.color} className="opacity-80" />
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <StarMark
                        size="xs"
                        color={cat.color}
                        className="opacity-35 mt-0.5 shrink-0"
                      />
                      <span className="font-sans text-[13px] leading-snug" style={{ color: '#8DAFC0' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Projects (compact) ──────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionDivider>Projects</SectionDivider>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2.5 mt-8 mb-14"
          >
            {visibleProjects.map((project, i) => (
              <motion.a
                key={project.slug}
                href={`/projects/${project.slug}`}
                variants={fadeIn}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:border-teal-500/40"
                style={{
                  background: 'rgba(15,42,61,0.50)',
                  border: '1px solid rgba(15,122,122,0.14)',
                  color: '#A8C5D1',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: project.panelAccentColor }}
                />
                <span className="font-sans text-sm font-medium">{project.name}</span>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(168,197,209,0.45)' }}>
                  {project.year}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Footer ──────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-8 flex flex-wrap items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
          >
            <div className="flex items-center gap-2.5">
              <StarMark size="xs" color="#0F7A7A" className="opacity-40" />
              <p className="font-sans text-xs" style={{ color: 'rgba(168,197,209,0.35)' }}>
                © {new Date().getFullYear()} {siteConfig.copyrightName}
              </p>
            </div>

            <HoverSparkle className="inline-flex">
              <StarburstButton
                href={siteConfig.resumeUrl}
                download
                variant="secondary"
                size="sm"
              >
                Download PDF ↓
              </StarburstButton>
            </HoverSparkle>
          </motion.div>

        </div>
      </Section>
    </main>
  )
}

// ── Section divider helper ──────────────────────────────────────────────────

function SectionDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px" style={{ background: 'rgba(15,122,122,0.40)', width: 24 }} />
      <span
        className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
        style={{ color: '#4A9FAE' }}
      >
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: 'rgba(15,122,122,0.12)' }} />
    </div>
  )
}
