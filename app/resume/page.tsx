'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

// ── Impact metrics (SE-focused, quantified) ─────────────────────────────────

const impactMetrics = [
  { value: '30K+', label: 'records analyzed',    accent: '#2A8B87' },
  { value: '70%',  label: 'manual work reduced', accent: '#4A9FAE' },
  { value: '63%',  label: 'completion lift',     accent: '#0F7A7A' },
  { value: '3',    label: 'AI tools shipped',    accent: '#C4974A' },
]

// ── SE-focused skill groups ─────────────────────────────────────────────────

const skillGroups = [
  {
    label: 'Solutioning & Demos',
    accent: '#4A9FAE',
    items: [
      'Live demo architecture',
      'AI/ML workflow design',
      'Customer value translation',
      'Technical pre-sales support',
    ],
  },
  {
    label: 'Technical Fluency',
    accent: '#0F7A7A',
    items: [
      'Next.js · Python · SQL · TypeScript',
      'LLM pipelines & prompt engineering',
      'REST APIs & data systems',
      'Dashboards & visualization',
    ],
  },
  {
    label: 'Communication',
    accent: '#C4974A',
    items: [
      'Non-technical stakeholder readouts',
      'Decision-support system design',
      'Cross-functional alignment',
      'Requirements → solution mapping',
    ],
  },
]

// ── Header signal phrases ───────────────────────────────────────────────────

const signalPhrases = [
  'AI Workflows',
  'Technical Demos',
  'Stakeholder Comms',
  'Full-Stack Builder',
  'Business Value',
]

// ── Section divider ─────────────────────────────────────────────────────────

function SectionDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px" style={{ background: 'rgba(15,122,122,0.38)', width: 24 }} />
      <span
        className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
        style={{ color: '#4A9FAE' }}
      >
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: 'rgba(15,122,122,0.11)' }} />
    </div>
  )
}

// ── Timeline entry ──────────────────────────────────────────────────────────

function TimelineEntry({
  item,
  index,
}: {
  item: NonNullable<typeof siteConfig.career>[0]
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const [before, after] = item.period.split(' — ')

  return (
    <motion.div
      variants={fadeUp}
      className="grid items-start"
      style={{ gridTemplateColumns: '68px 22px 1fr' }}
    >
      {/* Year column */}
      <div className="pt-1.5 pr-3 text-right">
        <span
          className="font-mono text-[10px] leading-snug block"
          style={{ color: item.current ? '#C4974A' : 'rgba(168,197,209,0.38)' }}
        >
          <span className="block">{before}</span>
          <span className="block">{after === 'Present' ? 'Now' : (after ?? '')}</span>
        </span>
      </div>

      {/* Spine */}
      <div className="flex flex-col items-center pt-1.5">
        <div
          className="w-px min-h-[6px] flex-1"
          style={{
            background: item.current ? 'rgba(196,151,74,0.32)' : 'rgba(15,122,122,0.18)',
          }}
        />
        {item.current ? (
          <motion.div
            animate={
              reduceMotion ? {} : { opacity: [0.65, 1, 0.65], scale: [0.88, 1.10, 0.88] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-90" />
          </motion.div>
        ) : (
          <StarMark size="xs" color="#0F7A7A" className="opacity-38" />
        )}
        <div
          className="w-px flex-1"
          style={{ background: 'rgba(15,122,122,0.10)', minHeight: 28 }}
        />
      </div>

      {/* Card */}
      <motion.div
        whileHover={
          reduceMotion
            ? {}
            : {
                y: -2,
                boxShadow: item.current
                  ? '0 6px 28px rgba(196,151,74,0.10)'
                  : '0 4px 22px rgba(0,0,0,0.22)',
              }
        }
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-4 mb-6 overflow-hidden rounded-2xl p-5"
        style={{
          background: 'rgba(15,42,61,0.52)',
          border: item.current
            ? '1px solid rgba(196,151,74,0.22)'
            : '1px solid rgba(15,122,122,0.12)',
          boxShadow: item.current ? '0 0 24px rgba(196,151,74,0.04)' : 'none',
        }}
      >
        {/* Top-edge shimmer line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: item.current
              ? 'linear-gradient(90deg, transparent, rgba(196,151,74,0.42), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(15,122,122,0.26), transparent)',
          }}
          aria-hidden
        />

        {/* "Current" badge */}
        {item.current && (
          <div className="mb-3 flex items-center gap-1.5">
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
              style={{
                background: 'rgba(196,151,74,0.10)',
                border: '1px solid rgba(196,151,74,0.28)',
                color: '#C4974A',
              }}
            >
              Current
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-sans text-sm font-semibold text-text-base">{item.role}</p>
            <p className="mt-0.5 font-sans text-[13px]" style={{ color: 'rgba(168,197,209,0.52)' }}>
              {item.company}
            </p>
          </div>
          <span
            className="mt-0.5 shrink-0 font-mono text-[9.5px] tracking-wider"
            style={{ color: 'rgba(168,197,209,0.36)' }}
          >
            {item.period}
          </span>
        </div>

        <p
          className="mt-3.5 font-sans text-[13.5px] leading-relaxed"
          style={{ color: '#8DAFC0' }}
        >
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-btn px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                style={{
                  background: 'rgba(15,42,61,0.82)',
                  border: '1px solid rgba(15,122,122,0.13)',
                  color: '#6A9BAA',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const reduceMotion = useReducedMotion()
  const visibleProjects = projects.filter((p) => p.visible)

  return (
    <main className="min-h-screen pt-16">
      <Section paddingY="lg">
        {/* Watermark */}
        <div className="absolute right-0 top-24 overflow-hidden pointer-events-none" aria-hidden>
          <WatermarkStar size={460} opacity={0.028} direction={-1} />
        </div>

        <div className="mx-auto max-w-[820px]">

          {/* ════════════════════════════════════
              HEADER
          ════════════════════════════════════ */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 pb-10"
            style={{ borderBottom: '1px solid rgba(15,122,122,0.13)' }}
          >
            {/* Name + role tag */}
            <motion.div variants={fadeUp}>
              <h1 className="font-display text-hero leading-none text-text-base">
                {siteConfig.name.split(' ')[0]}{' '}
                <span style={{ color: '#4A9FAE' }}>
                  {siteConfig.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p
                className="mt-3 font-mono text-[11px] uppercase tracking-wider"
                style={{ color: '#4A9FAE' }}
              >
                {siteConfig.roleTag}
              </p>
            </motion.div>

            {/* SE signal pills */}
            <motion.div variants={fadeIn} className="mt-5 flex flex-wrap gap-2">
              {signalPhrases.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-full px-3 py-1 font-mono text-[9.5px] uppercase tracking-wider"
                  style={{
                    background: 'rgba(15,122,122,0.07)',
                    border: '1px solid rgba(15,122,122,0.18)',
                    color: '#6A9BAA',
                  }}
                >
                  {phrase}
                </span>
              ))}
            </motion.div>

            {/* Download */}
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

          {/* ════════════════════════════════════
              IMPACT STRIP
          ════════════════════════════════════ */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-1"
              style={{
                background: 'rgba(15,42,61,0.44)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              {/* Subtle top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(15,122,122,0.40) 30%, rgba(196,151,74,0.30) 60%, transparent 100%)',
                }}
                aria-hidden
              />

              <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
                {impactMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    whileHover={reduceMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col items-center justify-center rounded-xl px-4 py-5 text-center"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${m.accent}14 0%, transparent 65%)`,
                    }}
                  >
                    <span
                      className="font-display leading-none"
                      style={{
                        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                        color: m.accent,
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-wider"
                      style={{ color: 'rgba(168,197,209,0.46)' }}
                    >
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════
              EXPERIENCE
          ════════════════════════════════════ */}
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
            variants={staggerContainer(0.10)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 mt-8"
          >
            {(siteConfig.career ?? []).map((item, i) => (
              <TimelineEntry key={i} item={item} index={i} />
            ))}
          </motion.div>

          {/* ════════════════════════════════════
              SKILLS
          ════════════════════════════════════ */}
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
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 mt-8 grid gap-4 sm:grid-cols-3"
          >
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl p-5"
                style={{
                  background: 'rgba(15,42,61,0.50)',
                  border: '1px solid rgba(15,122,122,0.12)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${group.accent}44, transparent)`,
                  }}
                  aria-hidden
                />
                <div className="mb-4 flex items-center gap-2">
                  <StarMark size="xs" color={group.accent} className="opacity-80" />
                  <p
                    className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em]"
                    style={{ color: group.accent }}
                  >
                    {group.label}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <StarMark
                        size="xs"
                        color={group.accent}
                        className="mt-0.5 shrink-0 opacity-28"
                      />
                      <span
                        className="font-sans text-[12.5px] leading-snug"
                        style={{ color: '#8DAFC0' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ════════════════════════════════════
              PROJECTS
          ════════════════════════════════════ */}
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
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 mt-8 flex flex-col gap-2.5"
          >
            {visibleProjects.map((project) => (
              <motion.a
                key={project.slug}
                href={`/projects/${project.slug}`}
                variants={fadeUp}
                whileHover={reduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center justify-between gap-4 rounded-xl p-4"
                style={{
                  background: 'rgba(15,42,61,0.44)',
                  border: '1px solid rgba(15,122,122,0.12)',
                }}
              >
                {/* Left: dot + name + tagline */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: project.panelAccentColor }}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-text-base">
                        {project.name}
                      </span>
                      <span
                        className="font-mono text-[9.5px]"
                        style={{ color: 'rgba(168,197,209,0.38)' }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <p
                      className="mt-0.5 truncate font-sans text-[12.5px] leading-snug"
                      style={{ color: '#7AAABB' }}
                    >
                      {/* First sentence only */}
                      {project.tagline.match(/.*?[.!?]/)?.[0] ?? project.tagline}
                    </p>
                  </div>
                </div>

                {/* Right: stack pills + arrow */}
                <div className="flex shrink-0 items-center gap-2">
                  <div className="hidden gap-1.5 sm:flex">
                    {project.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded px-2 py-0.5 font-mono text-[9px]"
                        style={{
                          background: 'rgba(15,42,61,0.82)',
                          border: '1px solid rgba(15,122,122,0.11)',
                          color: '#6A9BAA',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span
                    className="font-mono text-[9.5px] uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: project.panelAccentColor }}
                  >
                    View →
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ════════════════════════════════════
              FOOTER
          ════════════════════════════════════ */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
          >
            <div className="flex items-center gap-2.5">
              <StarMark size="xs" color="#0F7A7A" className="opacity-38" />
              <p className="font-sans text-xs" style={{ color: 'rgba(168,197,209,0.32)' }}>
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
