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
  { value: '30K+', label: 'records modeled',       accent: '#2A8B87' },
  { value: '70%',  label: 'analysis time reduced', accent: '#4A9FAE' },
  { value: '63%',  label: 'completion increase',   accent: '#0F7A7A' },
  { value: '3',    label: 'AI workflow tools',     accent: '#C4974A' },
]

const resumeRoleTag = 'Technical Systems + Product Workflows'

const resumeSummary =
  'Early-career technical systems builder designing AI-powered workflows, dashboards, and full-stack tools for stakeholders who need clearer decisions.'

// ── SE-focused skill groups ─────────────────────────────────────────────────

const skillGroups = [
  {
    label: 'Solutioning & Workflows',
    accent: '#4A9FAE',
    items: [
      'Product walkthrough flows',
      'AI workflow design',
      'Technical value translation',
      'Discovery-to-workflow thinking',
    ],
  },
  {
    label: 'Technical Fluency',
    accent: '#0F7A7A',
    items: [
      'Next.js · Python · SQL · TypeScript',
      'Structured LLM output flows',
      'APIs, data systems, and dashboards',
      'Python/R analysis pipelines',
    ],
  },
  {
    label: 'Communication',
    accent: '#C4974A',
    items: [
      'Non-technical stakeholder readouts',
      'Decision-support framing',
      'Cross-functional alignment',
      'Requirements → solution mapping',
    ],
  },
]

// ── Header signal phrases ───────────────────────────────────────────────────

const signalPhrases = [
  'Technical Systems',
  'Product Walkthroughs',
  'Workflow Translation',
  'Data Pipelines',
  'Decision Support',
]

const resumeExperienceCopyByRole: Record<string, string> = {
  'Project Lead & Data Analyst':
    'Owned predictive systems across 30K+ records, turning model outputs into risk-scoring workflows and dashboards for stakeholder decision support.',
  'Senior Project Lead':
    'Re-architected recruitment and scheduling workflows across 100+ sessions, increasing completion 63% and improving operational dashboard clarity for downstream analysis.',
  'Intern Data Analyst':
    'Built Python/R pipelines across 200+ fMRI sessions, reduced manual analysis time 70%, and walked non-technical research stakeholders through outputs and tradeoffs.',
  'Research Data Analyst':
    'Standardized PETRUSHKA operations with Excel, R, SQL, and Tableau tracking systems, reducing coordination friction across patients and cross-functional teams.',
  'Independent Product Builder':
    'Built Kestrel, Quail Mail, and Chirpie as AI-powered workflow tools: structured outputs, prioritization logic, attribution, explainability, and guided dashboard flows.',
}

const resumeExperienceTagsByRole: Record<string, string[]> = {
  'Project Lead & Data Analyst': ['Decision Support', 'Risk Dashboards', 'Stakeholder Translation'],
  'Senior Project Lead': ['Workflow Redesign', 'Operational Dashboards', 'Coordination Systems'],
  'Intern Data Analyst': ['Python/R Pipelines', 'Technical Walkthroughs', 'Stakeholder Readouts'],
  'Research Data Analyst': ['Tracking Systems', 'SQL + Tableau', 'Cross-Functional Ops'],
  'Independent Product Builder': ['AI Workflow Tools', 'OpenAI Workflows', 'Explainability'],
}

const resumeProjectDescriptions: Record<string, string> = {
  kestrel:
    'Live AI decision-support tool that maps a job description into readiness signals, explainable gaps, and a guided dashboard workflow.',
  chirpie:
    'Coming-soon news tool using multi-source ingestion, schema-constrained outputs, attribution, and explainable summaries.',
  quail:
    'Coming-soon inbox triage tool around prioritization logic, action lanes, and production email delivery.',
}

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

// ── Highlighted description — metrics glow gold ─────────────────────────────

function HighlightedDescription({ text }: { text: string }) {
  // Matches: 30K+  70%  63%  200+  100+  (not plain years like 2024)
  const parts = text.split(/(\d+K\+|\d+%|\d{2,}\+)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^(\d+K\+|\d+%|\d{2,}\+)$/.test(part) ? (
          <span key={i} className="font-semibold" style={{ color: '#C4974A' }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
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
  const accentColor   = item.current ? '#C4974A' : '#0F7A7A'
  const accentBright  = item.current ? '#E8B055' : '#4A9FAE'
  const description = resumeExperienceCopyByRole[item.role] ?? item.description
  const tags = resumeExperienceTagsByRole[item.role] ?? item.tags

  return (
    <motion.div
      variants={fadeUp}
      className="grid items-start"
      style={{ gridTemplateColumns: '68px 22px 1fr' }}
    >
      {/* Year column — hidden; date now lives inside the card */}
      <div className="pt-2 pr-3 text-right">
        <span
          className="font-mono text-[10px] leading-snug"
          style={{ color: item.current ? '#C4974A' : 'rgba(168,197,209,0.32)' }}
        >
          <span className="block">{before}</span>
          <span className="block">{after === 'Present' ? 'Now' : (after ?? '')}</span>
        </span>
      </div>

      {/* Spine */}
      <div className="flex flex-col items-center pt-2">
        <div
          className="w-px min-h-[6px] flex-1"
          style={{ background: item.current ? 'rgba(196,151,74,0.30)' : 'rgba(15,122,122,0.16)' }}
        />
        {item.current ? (
          <motion.div
            animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6], scale: [0.86, 1.12, 0.86] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-90" />
          </motion.div>
        ) : (
          <StarMark size="xs" color="#0F7A7A" className="opacity-36" />
        )}
        <div
          className="w-px flex-1"
          style={{ background: 'rgba(15,122,122,0.09)', minHeight: 28 }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        whileHover={
          reduceMotion
            ? {}
            : {
                y: -3,
                boxShadow: item.current
                  ? `0 8px 36px rgba(196,151,74,0.14), 0 0 0 1px rgba(196,151,74,0.30)`
                  : `0 6px 28px rgba(0,0,0,0.28), 0 0 0 1px rgba(15,122,122,0.22)`,
              }
        }
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-4 mb-6 overflow-hidden rounded-2xl p-5"
        style={{
          background: item.current
            ? 'linear-gradient(135deg, rgba(20,48,68,0.70) 0%, rgba(15,42,61,0.58) 100%)'
            : 'linear-gradient(135deg, rgba(15,42,61,0.58) 0%, rgba(10,30,48,0.52) 100%)',
          border: item.current
            ? '1px solid rgba(196,151,74,0.24)'
            : '1px solid rgba(15,122,122,0.13)',
          boxShadow: item.current
            ? '0 0 32px rgba(196,151,74,0.06), inset 0 1px 0 rgba(255,255,255,0.03)'
            : 'inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        {/* ── Animated top-edge shimmer line ── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          animate={reduceMotion ? {} : { opacity: [0.4, 0.95, 0.4] }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.45,
          }}
          style={{
            background: item.current
              ? 'linear-gradient(90deg, transparent 5%, rgba(196,151,74,0.70) 38%, rgba(228,180,80,0.90) 52%, rgba(196,151,74,0.70) 66%, transparent 95%)'
              : 'linear-gradient(90deg, transparent 5%, rgba(15,122,122,0.55) 38%, rgba(74,159,174,0.75) 52%, rgba(15,122,122,0.55) 66%, transparent 95%)',
          }}
          aria-hidden
        />

        {/* ── Periodic light-sweep beam ── */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 -skew-x-12"
            style={{
              width: '42%',
              left: '-50%',
              background: `linear-gradient(90deg, transparent 0%, ${accentBright}0E 45%, ${accentBright}16 52%, ${accentBright}0E 58%, transparent 100%)`,
            }}
            animate={{ x: ['0%', '380%'] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 7 + index * 1.4,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.8,
            }}
            aria-hidden
          />
        )}

        {/* ── Twinkling corner star ── */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute bottom-3.5 right-3.5"
            animate={{ opacity: [0.12, 0.55, 0.12], scale: [0.78, 1.08, 0.78] }}
            transition={{
              duration: 3.8 + index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.6,
            }}
            aria-hidden
          >
            <StarMark size="xs" color={accentBright} />
          </motion.div>
        )}

        {/* ── Header row: title + company left │ badge + date right ── */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          {/* Left */}
          <div>
            <h3
              className="font-display text-h3 leading-tight text-text-base"
            >
              {item.role}
            </h3>
            <p className="mt-1 font-sans text-[13px]" style={{ color: '#4A9FAE' }}>
              {item.company}
            </p>
          </div>

          {/* Right: badge + date */}
          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            {item.current && (
              <span
                className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                style={{
                  background: 'rgba(196,151,74,0.12)',
                  border: '1px solid rgba(196,151,74,0.32)',
                  color: '#C4974A',
                }}
              >
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: '#C4974A' }}
                  animate={reduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                Current
              </span>
            )}
            <span
              className="font-mono text-[9.5px] tracking-wider"
              style={{ color: 'rgba(168,197,209,0.38)' }}
            >
              {item.period}
            </span>
          </div>
        </div>

        {/* ── Description with gold metric highlights ── */}
        <p className="mt-4 font-sans text-[13.5px] leading-relaxed" style={{ color: '#8DAFC0' }}>
          <HighlightedDescription text={description} />
        </p>

        {/* ── Tags ── */}
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-btn px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                style={{
                  background: 'rgba(15,42,61,0.84)',
                  border: `1px solid ${accentColor}22`,
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
  const visibleProjects = projects
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order)

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
                {resumeRoleTag}
              </p>
              <p
                className="mt-4 max-w-[680px] font-sans text-[14.5px] leading-relaxed"
                style={{ color: '#A8C5D1' }}
              >
                {resumeSummary}
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
              <p
                className="mt-3 font-sans text-[12.5px]"
                style={{ color: 'rgba(168,197,209,0.48)' }}
              >
                PDF includes the full version with experience, projects, and technical details.
              </p>
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
            <SectionDivider>Product Systems</SectionDivider>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 mt-8 flex flex-col gap-2.5"
          >
            {visibleProjects.map((project) => {
              const isComingSoon = project.launchStatus === 'comingSoon'

              return (
                <motion.a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  variants={fadeUp}
                  whileHover={reduceMotion ? {} : { y: -2 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between gap-4 rounded-xl p-4"
                  style={{
                    background: isComingSoon
                      ? 'rgba(15,42,61,0.34)'
                      : 'rgba(15,42,61,0.44)',
                    border: isComingSoon
                      ? '1px solid rgba(196,151,74,0.13)'
                      : '1px solid rgba(15,122,122,0.12)',
                  }}
                >
                  {/* Left: dot + name + tagline */}
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: isComingSoon ? '#C4974A' : project.panelAccentColor }}
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
                        {isComingSoon && (
                          <span
                            className="rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em]"
                            style={{
                              background: 'rgba(196,151,74,0.08)',
                              border: '1px solid rgba(196,151,74,0.20)',
                              color: '#D8B76E',
                            }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-0.5 truncate font-sans text-[12.5px] leading-snug"
                        style={{ color: '#7AAABB' }}
                      >
                        {resumeProjectDescriptions[project.slug] ??
                          project.tagline.match(/.*?[.!?]/)?.[0] ??
                          project.tagline}
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
                      style={{ color: isComingSoon ? '#D8B76E' : project.panelAccentColor }}
                    >
                      {isComingSoon ? 'Soon' : 'View →'}
                    </span>
                  </div>
                </motion.a>
              )
            })}
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
