'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
import { Starburst } from '@/components/ui/Starburst'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { projects } from '@/data/projects'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

// ── Impact metrics (product-focused, quantified) ────────────────────────────

const impactMetrics = [
  { value: '30K+', label: 'records modeled',       accent: '#2A8B87' },
  { value: '70%',  label: 'less manual analysis',  accent: '#4A9FAE' },
  { value: '63%',  label: 'higher completion',     accent: '#0F7A7A' },
  { value: '200+', label: 'sessions redesigned',   accent: '#C4974A' },
]

const resumeRoleTag = 'Aspiring Associate Product Manager · AI-Native Product Builder'

const resumeSummary =
  'Aspiring Associate Product Manager building AI-native tools for CRM, enterprise workflows, and data systems, then refining them through testing and iteration.'

// ── Product-focused skill groups ────────────────────────────────────────────

const skillGroups = [
  {
    label: 'Product & Discovery',
    accent: '#4A9FAE',
    items: [
      'Product discovery & requirements definition',
      'MVP scoping & feature prioritization',
      'Workflow design',
      'Stakeholder management',
    ],
  },
  {
    label: 'Technical & Platform',
    accent: '#0F7A7A',
    items: [
      'Python · SQL · R · TypeScript · JavaScript',
      'React · Next.js · REST APIs · Git',
      'Salesforce: LWC, Apex, SOQL, custom objects',
      'LLM applications & AI workflow design',
    ],
  },
  {
    label: 'Communication & Design',
    accent: '#C4974A',
    items: [
      'Figma · Tableau',
      'Technical communication & stakeholder presentations',
      'Cross-functional collaboration',
      'Decision support & explainability',
    ],
  },
]

// ── Header signal phrases ───────────────────────────────────────────────────

const signalPhrases = [
  'Product Discovery',
  'Workflow Design',
  'AI Product Thinking',
  'Stakeholder Communication',
  'Technical Fluency',
]

const profileFacts = [
  { label: 'Based in', value: 'San Francisco, California' },
  { label: 'Languages', value: 'English · Mandarin' },
]

const educationHistory = [
  {
    school: 'University of San Francisco',
    degree: 'Master of Science in Information Systems',
    period: 'August 2026 – May 2027',
  },
  {
    school: 'University of Toronto',
    degree: 'Honours Bachelor of Science',
    detail: 'Double Major in Cognitive Science and Psychology',
    period: 'September 2022 – June 2026',
  },
]

const resumeExperienceCopyByRole: Record<string, string> = {
  'ML Data Analyst':
    'Translated stakeholder needs into product requirements for an AI risk-scoring workflow across 30K+ records, prioritizing a pipeline that cut manual analysis time by 70%.',
  'Project Lead':
    'Redesigned recruitment and scheduling workflows across 100+ sessions, raising completion rates by 63% and cutting data inconsistencies by 85%.',
  'Imaging Data Analyst':
    'Redesigned data intake across 200+ fMRI sessions, translating complex analyses into decision-ready insights for clinical and research stakeholders.',
  'Research Data Analyst':
    'Coordinated requirements across 60+ patients and 20+ team members, building tracking systems that standardized onboarding and improved handoffs.',
}

const resumeExperienceTagsByRole: Record<string, string[]> = {
  'ML Data Analyst': ['Product Requirements', 'Explainable AI', 'Risk Scoring'],
  'Project Lead': ['Workflow Redesign', 'Prioritization', 'Shared Systems'],
  'Imaging Data Analyst': ['Workflow Redesign', 'Stakeholder Collaboration', 'Technical Communication'],
  'Research Data Analyst': ['Requirements Coordination', 'SQL/Tableau', 'Documentation'],
}

const resumeProjectDescriptions: Record<string, string> = {
  harmoniq:
    'Profiles a messy CRM export, ranks issues by business impact, and exports business-ready data with a human in the loop.',
  kestrel:
    'Helps job seekers turn confusing job descriptions into fit scores, skill gaps, and a clear action roadmap.',
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

// ── Highlighted description: metrics glow gold ──────────────────────────────

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
  const [before, after] = item.period.split(' to ')
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
      {/* Year column hidden; date now lives inside the card */}
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
            initial={false}
            whileInView={reduceMotion ? {} : { opacity: [0.6, 1, 0.6], scale: [0.86, 1.12, 0.86] }}
            viewport={{ amount: 0.7 }}
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
          initial={false}
          whileInView={reduceMotion ? {} : { opacity: [0.4, 0.95, 0.4] }}
          viewport={{ amount: 0.7 }}
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
            initial={false}
            whileInView={{ x: ['0%', '380%'] }}
            viewport={{ amount: 0.7 }}
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
            initial={false}
            whileInView={{ opacity: [0.12, 0.55, 0.12], scale: [0.78, 1.08, 0.78] }}
            viewport={{ amount: 0.7 }}
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
    <main className="min-h-screen pt-16 relative overflow-hidden">
      {/* ── Resume page atmosphere: sharp, calm, elegant celestial ── */}

      {/* Watermark */}
      <div className="absolute right-0 top-24 overflow-hidden pointer-events-none" aria-hidden>
        <WatermarkStar size={460} opacity={0.028} direction={-1} />
      </div>

      {/* Teal depth glow — upper-left */}
      <div
        aria-hidden
        className="absolute left-[-8%] top-[6%] h-[400px] w-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(15,122,122,0.07) 0%, rgba(74,159,174,0.03) 44%, transparent 72%)' }}
      />
      {/* Gold depth glow — lower-right */}
      <div
        aria-hidden
        className="absolute right-[-6%] bottom-[10%] h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,151,74,0.06) 0%, transparent 68%)' }}
      />

      {/* Static star field — 10 restrained pinpoints, 2 twinkle, zero animation cost */}
      <StarField
        className="z-0"
        stars={[
          { x: '2%',  y: '12%', size: 1.5, color: '#F4D58D', opacity: 0.38, halo: 1.5 },
          { x: '5%',  y: '46%', size: 1.2, color: '#7EE7F2', opacity: 0.30, halo: 1.2, twinkle: true, delay: 1.2, duration: 5.6 },
          { x: '4%',  y: '78%', size: 1.0, color: '#A8C5D1', opacity: 0.26, halo: 1.0 },
          { x: '96%', y: '8%',  size: 1.4, color: '#C4974A', opacity: 0.32, halo: 1.4 },
          { x: '97%', y: '34%', size: 1.0, color: '#E6EEF2', opacity: 0.24, halo: 1.0 },
          { x: '95%', y: '62%', size: 1.3, color: '#7EE7F2', opacity: 0.30, halo: 1.3, twinkle: true, delay: 3.0, duration: 6.2 },
          { x: '98%', y: '84%', size: 1.0, color: '#A8C5D1', opacity: 0.24, halo: 1.0 },
          { x: '48%', y: '4%',  size: 1.1, color: '#E6EEF2', opacity: 0.26, halo: 1.0 },
          { x: '52%', y: '94%', size: 1.0, color: '#7EE7F2', opacity: 0.22, halo: 1.0 },
          { x: '26%', y: '6%',  size: 1.2, color: '#F4D58D', opacity: 0.28, halo: 1.2 },
        ]}
      />

      {/* Header constellation — gold 4-point, anchors the name block */}
      <div aria-hidden className="pointer-events-none absolute left-[2%] top-[18%] hidden md:block">
        <Constellation
          width={96}
          height={58}
          color="#C4974A"
          lineOpacity={0.22}
          pointOpacity={0.62}
          points={[
            { x: 6,  y: 50, size: 1.3 },
            { x: 34, y: 18, size: 1.8, twinkle: true, delay: 0.4 },
            { x: 70, y: 32, size: 1.2 },
            { x: 90, y: 8,  size: 1.4 },
          ]}
          connections={[[0, 1], [1, 2], [2, 3]]}
        />
      </div>

      {/* Experience constellation — teal, mid-page right, navigational marker */}
      <div aria-hidden className="pointer-events-none absolute right-[2%] top-[42%] hidden md:block">
        <Constellation
          width={72}
          height={96}
          color="#4A9FAE"
          lineOpacity={0.18}
          pointOpacity={0.56}
          points={[
            { x: 12, y: 10,  size: 1.2 },
            { x: 58, y: 28,  size: 1.5 },
            { x: 36, y: 66,  size: 1.1, twinkle: true, delay: 1.6 },
            { x: 64, y: 88,  size: 1.3 },
          ]}
          connections={[[0, 1], [1, 2], [2, 3]]}
        />
      </div>

      {/* Starburst — upper-right, faint teal, anchors the page */}
      <div className="pointer-events-none absolute right-[3%] top-[6%] hidden lg:block">
        <Starburst size="sm" color="#4A9FAE" haloColor="#7EE7F2" opacity={0.32} pulse delay={1.8} duration={7.8} />
      </div>

      <Section paddingY="lg">

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

            {/* Signal pills */}
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

            <motion.div
              variants={fadeIn}
              className="mt-7 grid gap-4 md:grid-cols-[0.82fr_1.18fr]"
            >
              <div
                className="rounded-[20px] p-4"
                style={{
                  background: 'rgba(15,42,61,0.42)',
                  border: '1px solid rgba(15,122,122,0.14)',
                }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: '#4A9FAE' }}
                >
                  Profile
                </p>
                <div className="mt-3 space-y-3">
                  {profileFacts.map((fact) => (
                    <div key={fact.label}>
                      <p
                        className="font-mono text-[9px] uppercase tracking-[0.12em]"
                        style={{ color: 'rgba(168,197,209,0.48)' }}
                      >
                        {fact.label}
                      </p>
                      <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#D8E8EE]">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[20px] p-4"
                style={{
                  background: 'rgba(15,42,61,0.42)',
                  border: '1px solid rgba(15,122,122,0.14)',
                }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: '#4A9FAE' }}
                >
                  Education
                </p>
                <div className="mt-3 space-y-4">
                  {educationHistory.map((item) => (
                    <div key={item.school}>
                      <p className="font-sans text-[13px] font-semibold leading-relaxed text-text-base">
                        {item.school}
                      </p>
                      <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-[#D8E8EE]">
                        {item.degree}
                      </p>
                      {'detail' in item && item.detail ? (
                        <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-[#A8C5D1]">
                          {item.detail}
                        </p>
                      ) : null}
                      <p
                        className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em]"
                        style={{ color: 'rgba(168,197,209,0.48)' }}
                      >
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
                  Download Resume PDF
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
            <SectionDivider>Selected Work</SectionDivider>
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
              const hasDetailPage = project.detailPageEnabled !== false

              if (hasDetailPage) {
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
                              Preview
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
              }

              return (
                <motion.div
                  key={project.slug}
                  variants={fadeUp}
                  className="flex items-center justify-between gap-4 rounded-xl p-4"
                  style={{
                    background: 'rgba(15,42,61,0.34)',
                    border: '1px solid rgba(15,122,122,0.12)',
                  }}
                >
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
                        {resumeProjectDescriptions[project.slug] ??
                          project.tagline.match(/.*?[.!?]/)?.[0] ??
                          project.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 gap-1.5 sm:flex">
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
                </motion.div>
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
                Download Resume PDF
              </StarburstButton>
            </HoverSparkle>
          </motion.div>

        </div>
      </Section>
    </main>
  )
}
