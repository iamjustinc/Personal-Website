'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

type NavItem = { id: string; label: string; number: string }

type InsightCardItem = {
  title: string
  body: string
}

type CaseStudyCopy = {
  tagline: string
  outcome?: string
  overview: string
  problem: string
  users?: string
  solution: string
  impact: string
  buildNotes?: string
  reflection?: string
  overviewCards?: InsightCardItem[]
  problemBullets?: string[]
  userCards?: InsightCardItem[]
  solutionCards?: InsightCardItem[]
  impactCards?: InsightCardItem[]
  buildCards?: InsightCardItem[]
  reflectionCards?: InsightCardItem[]
  screenshotCaption?: string
}

const kestrelCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Role-readiness decision engine that turns a target job into fit signals, ranked gaps, resume direction, and a next-step roadmap.',
  outcome:
    'Turns fragmented career prep into a clear decision view: what matches, what is missing, what to improve, and what to do next.',
  overview:
    'Kestrel is a role-readiness decision engine for early-career candidates. A user brings a target job description and profile; the product extracts the role requirements, evaluates fit, surfaces strengths and gaps, and converts the result into a practical roadmap they can act on.',
  problem:
    'Early-career candidates often prepare from scattered signals: job posts, resume edits, advice threads, LinkedIn takes, and vague role expectations. That creates repeated resume tweaking without a reliable sense of readiness, which gaps matter first, or how to explain fit for PM, Solutions Engineering, or SWE-adjacent roles.',
  users:
    'Built for early-career candidates targeting PM, Solutions Engineering, and SWE-adjacent roles who need to translate their experience into role requirements without guessing what matters most or where to focus next.',
  solution:
    'Kestrel parses the target description, extracts the core requirements, compares them against the user profile, and returns a readiness score, matched strengths, ranked gaps, resume improvement prompts, and a next-step roadmap in a card-based dashboard designed for fast interpretation.',
  impact:
    'Instead of leaving users with another generic checklist, Kestrel gives them a decision view: what to lead with, what to fix first, and how to explain their fit with more confidence. The product reframes career prep from scattered research into a clearer prioritization workflow.',
  buildNotes:
    'The hardest product problem was normalizing messy job descriptions into consistent, usable output. I used a staged AI pipeline with typed schemas so requirements, scores, gaps, and roadmap items stayed structured enough to render clearly, stay comparable across roles, and support more explainable outputs.',
  reflection:
    'The strongest product decision was restraint. Kestrel became more useful when I reduced output noise and prioritized the few signals that change a user’s next action: fit, gaps, resume edits, and roadmap. The more focused the output became, the more credible and actionable the product felt.',
  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'Career prep is usually not an information shortage problem. It is a prioritization problem.',
    },
    {
      title: 'Core Shift',
      body: 'Kestrel turns scattered role advice into one interpretable decision surface a candidate can actually use.',
    },
  ],
  problemBullets: [
    'Job descriptions describe expectations unevenly, so users struggle to tell signal from noise.',
    'Candidates often keep rewriting their resume before deciding which gaps are worth closing first.',
    'Most tools generate advice, but not a clear order of operations.',
  ],
  userCards: [
    {
      title: 'Primary User',
      body: 'Early-career candidates applying across PM, SE, and adjacent technical roles.',
    },
    {
      title: 'Job To Be Done',
      body: 'Help me understand where I stand against a target role and what I should do next.',
    },
  ],
  solutionCards: [
    {
      title: 'Interpretation Layer',
      body: 'Extracts requirements from the job description and maps them into readable role signals.',
    },
    {
      title: 'Decision Layer',
      body: 'Scores fit, identifies strengths and ranked gaps, then turns the analysis into roadmap-oriented output.',
    },
    {
      title: 'Communication Layer',
      body: 'Suggests clearer resume positioning so users can explain their fit, not just improve it.',
    },
  ],
  impactCards: [
    {
      title: 'User Outcome',
      body: 'Users get a clearer read on what matters now versus what can wait.',
    },
    {
      title: 'Product Signal',
      body: 'The value is not more advice. The value is making the next action obvious.',
    },
  ],
  buildCards: [
    {
      title: 'Consistency',
      body: 'Schema-constrained outputs helped keep AI responses structured enough for UI rendering and comparison.',
    },
    {
      title: 'Explainability',
      body: 'Card-based outputs made every recommendation easier to attribute and interpret.',
    },
  ],
  reflectionCards: [
    {
      title: 'What I Cut',
      body: 'I avoided making the product too broad. Better prioritization mattered more than more features.',
    },
    {
      title: 'What Improved',
      body: 'Once the output focused on the few signals that changed user action, the experience felt more credible.',
    },
  ],
  screenshotCaption: 'Kestrel — decision dashboard',
}

const chirpieCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Conversational news product that turns multi-source reporting into source-aware, personalized digests users can follow up on.',
  outcome:
    'Makes news faster to enter without stripping out the trust cues users still need: source attribution, context, tone control, and a path to go deeper.',
  overview:
    'Chirpie is a chat-first news companion built around a simple product insight: many users do not want another feed to browse. They want a lighter, more conversational entry point into the news that still feels credible. Chirpie transforms reporting into structured digests with attribution, context, and room for follow-up interaction.',
  problem:
    'Most news products are optimized for browsing, not conversational consumption. Users face high-volume feeds, generic topic personalization, and AI summary products that can flatten nuance or hide where claims came from. The result is a format that often feels either too dense to enter or too shallow to trust.',
  users:
    'Built for scroll-native readers, busy young professionals, and credibility-conscious users who want fast context without giving up source awareness, tonal control, or the ability to ask for more detail when a story matters.',
  solution:
    'Chirpie transforms multi-source reporting into chat-style digests, preserves source links and context, supports follow-up questions, and adapts tone and pacing so the experience feels lighter without removing trust signals. The product is not just summarizing articles. It is redesigning the format of news consumption around conversation, sequencing, and low-friction depth.',
  impact:
    'Chirpie reduces the effort required to understand a story while keeping the credibility layer visible. Users can skim quickly, understand what a summary is based on, and decide when a topic deserves deeper attention. That makes the product feel both easier to enter and more trustworthy to return to.',
  buildNotes:
    'The core challenge was structuring news content without over-compressing it. I designed the transformation around source attribution, supporting context, and careful summary boundaries so brevity did not erase nuance, imply unsupported certainty, or make serious stories feel flattened.',
  reflection:
    'Chirpie works best when delight supports usefulness instead of competing with it. The key product restraint was making the interface feel conversational and lightweight while keeping trust, attribution, and follow-up depth in the foreground. The product becomes stronger when the personality stays atmospheric rather than performative.',
  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'The opportunity is not just better summaries. It is a better format for consuming information.',
    },
    {
      title: 'Why It Stands Out',
      body: 'Chirpie treats trust, pacing, and conversational delivery as product features, not just presentation choices.',
    },
  ],
  problemBullets: [
    'Feeds overwhelm users with volume before helping them understand what matters.',
    'Topic personalization alone is too shallow; users also care about tone, pacing, and follow-up depth.',
    'Many AI digest products compress content quickly but do not preserve context or attribution clearly enough.',
  ],
  userCards: [
    {
      title: 'Primary Audience',
      body: 'Users who want a fast, calmer way to stay informed without returning to dense feed behavior.',
    },
    {
      title: 'Job To Be Done',
      body: 'Give me the gist first, show me where it came from, and let me go deeper only when I want to.',
    },
  ],
  solutionCards: [
    {
      title: 'Format Layer',
      body: 'Transforms reporting into a chat-native digest instead of a feed of article cards.',
    },
    {
      title: 'Trust Layer',
      body: 'Keeps source attribution and contextual framing visible so summaries feel grounded.',
    },
    {
      title: 'Interaction Layer',
      body: 'Supports follow-up exploration so the experience can move from quick gist to deeper understanding.',
    },
  ],
  impactCards: [
    {
      title: 'User Outcome',
      body: 'Staying informed feels easier to start and easier to continue.',
    },
    {
      title: 'Product Signal',
      body: 'The product solves both usability and trust, not just summary speed.',
    },
  ],
  buildCards: [
    {
      title: 'Summary Boundaries',
      body: 'The transformation had to stay concise without overstating confidence or collapsing nuance.',
    },
    {
      title: 'Source-Aware Design',
      body: 'Attribution was treated as a first-class design requirement, not a secondary detail.',
    },
  ],
  reflectionCards: [
    {
      title: 'Restraint',
      body: 'A playful consumer product becomes stronger when delight supports readability instead of distracting from it.',
    },
    {
      title: 'Product Lesson',
      body: 'A conversational interface only works when the interaction model is genuinely useful, not decorative.',
    },
  ],
  screenshotCaption: 'Chirpie — digest interface',
}

const quailCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Inbox intelligence product that turns raw email volume into a prioritized action queue with clearer summaries, urgency signals, and response support.',
  outcome:
    'Reduces inbox noise by helping users see what matters now, what can wait, and what can be handled with faster response or triage decisions.',
  overview:
    'Quail is an email intelligence product designed around a simple workflow problem: inboxes are organized chronologically, but people work by priority. The product reads incoming email through a more decision-oriented lens, helping users understand urgency, actionability, and next steps faster than a standard message list allows.',
  problem:
    'Most email tools are built for sorting and reading, not for deciding. Users still spend too much time opening threads to figure out what is urgent, what is important, what can be snoozed, and what deserves a response now. The friction is not just volume. It is the cognitive cost of constant prioritization.',
  users:
    'Built for busy professionals, operators, founders, and high-volume email users who need a faster way to triage incoming messages without giving up context, control, or confidence in what the system is surfacing.',
  solution:
    'Quail reinterprets the inbox as a triage surface. It scores and organizes messages by urgency and actionability, surfaces concise thread summaries, highlights why an email matters, and supports faster response decisions through clearer categorization and assistance layers.',
  impact:
    'The product changes email from passive reading into active prioritization. Instead of repeatedly scanning the inbox to rediscover what matters, users get a clearer action view that helps them focus faster, defer more confidently, and move through email with less friction.',
  buildNotes:
    'The hard part was balancing intelligence with trust and control. I had to design a system that could summarize, rank, and suggest action without feeling opaque or overly automated. That meant keeping the scoring logic interpretable, the summaries compact, and the reasoning visible enough that the user still felt in charge.',
  reflection:
    'The strongest lesson was that good inbox AI should reduce cognitive load without taking away agency. The product improved when the automation felt assistive instead of authoritative, and when prioritization cues explained themselves clearly enough to earn trust.',
  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'Email overload is not only a volume problem. It is a prioritization and attention-management problem.',
    },
    {
      title: 'Core Shift',
      body: 'Quail turns the inbox from a chronological feed into a more decision-oriented workspace.',
    },
  ],
  problemBullets: [
    'Chronological inboxes force users to repeatedly rescan for urgency and importance.',
    'Too much effort is spent opening threads just to determine whether action is needed.',
    'Automation can help, but only if users still understand why the system surfaced something.',
  ],
  userCards: [
    {
      title: 'Primary Audience',
      body: 'People managing dense inboxes where speed, prioritization, and follow-through matter daily.',
    },
    {
      title: 'Job To Be Done',
      body: 'Help me decide what deserves attention now without making me reread my inbox all day.',
    },
  ],
  solutionCards: [
    {
      title: 'Triage Layer',
      body: 'Ranks or groups messages around urgency, importance, and likely action needed.',
    },
    {
      title: 'Interpretation Layer',
      body: 'Summarizes threads into faster-read context so users can make decisions without reopening everything.',
    },
    {
      title: 'Support Layer',
      body: 'Guides action with clearer response cues, helping the inbox feel more manageable and less reactive.',
    },
  ],
  impactCards: [
    {
      title: 'User Outcome',
      body: 'Users spend less energy figuring out what matters and more energy acting on it.',
    },
    {
      title: 'Product Signal',
      body: 'The value comes from better prioritization clarity, not just faster summarization.',
    },
  ],
  buildCards: [
    {
      title: 'Trust + Control',
      body: 'The system had to feel helpful without feeling like it was taking ownership of the inbox away from the user.',
    },
    {
      title: 'Readable Intelligence',
      body: 'Prioritization logic worked best when summaries and urgency cues stayed concise and interpretable.',
    },
  ],
  reflectionCards: [
    {
      title: 'What Worked',
      body: 'Making the reasoning legible increased trust more than adding more automation ever could.',
    },
    {
      title: 'Product Lesson',
      body: 'Inbox intelligence succeeds when it lowers mental overhead while keeping the user firmly in control.',
    },
  ],
  screenshotCaption: 'Quail — inbox intelligence interface',
}

function getCaseStudyCopy(project: Project): CaseStudyCopy {
  if (project.slug === 'kestrel') return kestrelCaseStudyCopy
  if (project.slug === 'chirpie') return chirpieCaseStudyCopy
  if (project.slug === 'quail') return quailCaseStudyCopy

  return {
    tagline: project.tagline,
    outcome: project.outcome,
    overview: project.overview ?? project.summary,
    problem: project.problem,
    users: project.users,
    solution: project.solution,
    impact: project.impact,
    buildNotes: project.buildNotes,
    reflection: project.reflection,
    overviewCards: [],
    problemBullets: [],
    userCards: [],
    solutionCards: [],
    impactCards: [],
    buildCards: [],
    reflectionCards: [],
    screenshotCaption: `${project.name} — interface`,
  }
}

function FactStrip({ project, enhanced = false }: { project: Project; enhanced?: boolean }) {
  const facts = [
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 4).join(' · ') },
  ]

  return (
    <div
      style={{
        borderColor: enhanced ? `${project.panelAccentColor}1F` : 'rgba(15,122,122,0.10)',
        boxShadow: enhanced ? `inset 0 1px 0 ${project.panelAccentColor}12` : undefined,
      }}
      className="border-b"
    >
      <div className="max-w-[1180px] mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                {f.label}
              </span>
              <span
                className="font-mono text-[10px]"
                style={{ color: project.panelAccentColor, opacity: 0.45 }}
              >
                /
              </span>
              <span className="font-mono text-[11px] text-text-base opacity-80">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SideNav({
  items,
  accent,
  enhanced = false,
}: {
  items: NavItem[]
  accent: string
  enhanced?: boolean
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ai = els.indexOf(a.target as HTMLElement)
            const bi = els.indexOf(b.target as HTMLElement)
            return ai - bi
          })

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="space-y-0.5" aria-label="Case study sections">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted opacity-40 px-3 mb-3">
        Contents
      </p>

      {items.map((item) => {
        const isActive = activeId === item.id

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              setActiveId(item.id)
            }}
            className={cn(
              'group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200',
              isActive ? 'bg-[rgba(15,122,122,0.10)]' : 'hover:bg-[rgba(15,122,122,0.06)]',
            )}
            style={
              enhanced && isActive
                ? {
                    background: `linear-gradient(90deg, ${accent}1A, rgba(15,122,122,0.04))`,
                    boxShadow: `0 0 24px ${accent}10`,
                  }
                : undefined
            }
          >
            <span
              className="font-mono text-[9px] tabular-nums shrink-0 transition-opacity duration-200"
              style={{ color: accent, opacity: isActive ? (enhanced ? 0.82 : 0.6) : 0.22 }}
            >
              {item.number}
            </span>

            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.09em] transition-colors duration-200 leading-none"
              style={{
                color: isActive ? (enhanced ? '#D7EEF1' : accent) : '#5A8A9A',
              }}
            >
              {item.label}
            </span>

            {isActive && (
              <div
                className={cn(
                  'ml-auto rounded-full shrink-0',
                  enhanced ? 'h-1.5 w-1.5' : 'h-1 w-1',
                )}
                style={{
                  background: accent,
                  boxShadow: enhanced ? `0 0 14px ${accent}99` : undefined,
                }}
              />
            )}
          </a>
        )
      })}
    </nav>
  )
}

function CaseSection({
  id,
  number,
  title,
  accent,
  enhanced = false,
  children,
}: {
  id: string
  number: string
  title: string
  accent: string
  enhanced?: boolean
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const variant = reduceMotion ? { hidden: {}, visible: {} } : fadeUp

  return (
    <motion.section
      id={id}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className="relative scroll-mt-24 py-10"
      style={
        enhanced
          ? {
              borderTop: '1px solid transparent',
              background: `linear-gradient(90deg, ${accent}2E, rgba(196,151,74,0.14), transparent 68%) top / 100% 1px no-repeat`,
            }
          : { borderTop: '1px solid rgba(15,122,122,0.10)' }
      }
    >
      {enhanced && (
        <div
          className="pointer-events-none absolute -left-6 top-8 h-24 w-24 rounded-full blur-3xl"
          style={{ background: `${accent}0D` }}
          aria-hidden
        />
      )}

      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-[10px] tabular-nums select-none shrink-0"
          style={{ color: accent, opacity: enhanced ? 0.62 : 0.38 }}
        >
          {number}
        </span>

        <StarMark size="xs" color={accent} className="opacity-55 shrink-0" />

        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
          style={{
            color: enhanced ? '#D7EEF1' : accent,
            textShadow: enhanced ? `0 0 20px ${accent}24` : undefined,
          }}
        >
          {title}
        </span>

        <div
          className="h-px flex-1"
          style={{
            background: enhanced
              ? `linear-gradient(90deg, ${accent}42, rgba(196,151,74,0.18), transparent)`
              : 'rgba(15,122,122,0.10)',
          }}
          aria-hidden
        />
      </div>

      {children}
    </motion.section>
  )
}

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn('font-sans text-[15px] leading-[1.84] max-w-[70ch]', className)}
      style={{ color: '#A8C5D1' }}
    >
      {children}
    </p>
  )
}

function Callout({
  children,
  accent,
  enhanced = false,
}: {
  children: React.ReactNode
  accent: string
  enhanced?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-5 py-4 rounded-[18px]',
        enhanced && 'relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5',
      )}
      style={{
        background: enhanced
          ? `radial-gradient(circle at 8% 0%, ${accent}18, transparent 38%), ${accent}0D`
          : `${accent}0C`,
        border: `1px solid ${enhanced ? `${accent}38` : `${accent}22`}`,
        boxShadow: enhanced ? `0 18px 46px rgba(0,0,0,0.24), 0 0 34px ${accent}0C` : undefined,
      }}
    >
      {enhanced && (
        <div
          className="pointer-events-none absolute inset-x-5 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }}
          aria-hidden
        />
      )}

      <StarMark
        size="xs"
        color={accent}
        className={cn(enhanced ? 'opacity-60' : 'opacity-50', 'mt-0.5 shrink-0')}
      />

      <p className="relative font-sans text-[14px] leading-relaxed" style={{ color: '#B8D0DC' }}>
        {children}
      </p>
    </div>
  )
}

function ScreenshotBlock({
  src,
  alt,
  accent,
  caption,
  enhanced = false,
}: {
  src: string
  alt: string
  accent: string
  caption?: string
  enhanced?: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mt-7 space-y-2.5">
      <div
        className="group relative w-full overflow-hidden rounded-[16px]"
        style={{
          aspectRatio: '1.85 / 1',
          background: enhanced
            ? `radial-gradient(circle at 20% 10%, ${accent}12, rgba(10,22,40,0.30) 42%, rgba(10,22,40,0.44))`
            : 'rgba(10,22,40,0.28)',
          border: `1px solid ${enhanced ? `${accent}2C` : `${accent}18`}`,
          boxShadow: enhanced
            ? `0 22px 62px rgba(0,0,0,0.38), 0 0 40px ${accent}0A`
            : '0 18px 52px rgba(0,0,0,0.32)',
        }}
      >
        {enhanced && (
          <div
            className="pointer-events-none absolute inset-x-4 top-0 z-10 h-px opacity-80"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }}
            aria-hidden
          />
        )}

        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className={cn(
            'object-contain object-center',
            enhanced && !reduceMotion && 'transition-transform duration-700 group-hover:scale-[1.012]',
          )}
        />
      </div>

      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-wider text-center text-text-muted opacity-50">
          {caption}
        </p>
      )}
    </div>
  )
}

function StackPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="font-mono text-[9.5px] px-2.5 py-1 rounded-btn"
      style={{
        background: 'rgba(15,42,61,0.80)',
        border: `1px solid ${accent}18`,
        color: '#6A9BAA',
      }}
    >
      {label}
    </span>
  )
}

function InsightGrid({
  items,
  accent,
  enhanced = false,
}: {
  items?: InsightCardItem[]
  accent: string
  enhanced?: boolean
}) {
  if (!items || items.length === 0) return null

  return (
    <div className="grid gap-3 md:grid-cols-2 mt-6">
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            'rounded-[18px] p-4',
            enhanced && 'relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5',
          )}
          style={{
            background: enhanced
              ? `linear-gradient(180deg, ${accent}0E, rgba(9,21,38,0.82))`
              : 'rgba(9,21,38,0.72)',
            border: `1px solid ${enhanced ? `${accent}22` : 'rgba(15,122,122,0.12)'}`,
            boxShadow: enhanced ? `0 14px 34px rgba(0,0,0,0.18), 0 0 24px ${accent}08` : undefined,
          }}
        >
          {enhanced && (
            <div
              className="pointer-events-none absolute inset-x-4 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
              aria-hidden
            />
          )}

          <p
            className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: enhanced ? '#D7EEF1' : accent, opacity: enhanced ? 0.92 : 0.78 }}
          >
            {item.title}
          </p>

          <p className="font-sans text-[13.5px] leading-[1.75]" style={{ color: '#9EBBC7' }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}

function BulletRail({
  items,
  accent,
  enhanced = false,
}: {
  items?: string[]
  accent: string
  enhanced?: boolean
}) {
  if (!items || items.length === 0) return null

  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <div
            className="mt-[8px] h-1.5 w-1.5 rounded-full shrink-0"
            style={{
              background: accent,
              boxShadow: enhanced ? `0 0 12px ${accent}66` : undefined,
            }}
          />
          <p className="font-sans text-[14px] leading-[1.75] max-w-[68ch]" style={{ color: '#9EBBC7' }}>
            {item}
          </p>
        </div>
      ))}
    </div>
  )
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  const isEnhancedCaseStudy = ['kestrel', 'chirpie', 'quail'].includes(project.slug)
  const caseCopy = getCaseStudyCopy(project)

  let n = 0
  const fmt = () => String(++n).padStart(2, '0')
  const has = (v: unknown) => v !== undefined && v !== null && v !== ''

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', number: fmt() },
    { id: 'problem', label: 'Problem', number: fmt() },
    ...(has(caseCopy.users) ? [{ id: 'users', label: 'Users', number: fmt() }] : []),
    { id: 'solution', label: 'Solution', number: fmt() },
    { id: 'impact', label: 'Impact', number: fmt() },
    ...(has(caseCopy.buildNotes) ? [{ id: 'technical-build', label: 'Technical', number: fmt() }] : []),
    ...(has(caseCopy.reflection) ? [{ id: 'reflection', label: 'Reflection', number: fmt() }] : []),
    { id: 'demo-links', label: 'Links', number: fmt() },
  ]

  const sn = (id: string) => navItems.find((item) => item.id === id)?.number ?? '—'

  return (
    <main className="bg-bg min-h-screen pt-16">
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${project.panelAccentColor}14 0%, rgba(10,22,40,0) 55%)`,
          borderBottom: '1px solid rgba(15,122,122,0.10)',
        }}
      >
        {isEnhancedCaseStudy && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}55, rgba(196,151,74,0.25), transparent)`,
            }}
            aria-hidden
          />
        )}

        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar
            size={520}
            opacity={0.025}
            direction={1}
            color={project.panelAccentColor}
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-6 py-14 lg:py-20">
          <motion.div variants={inn} initial="hidden" animate="visible">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-text-base transition-colors duration-200 mb-10"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div
              className="relative min-h-[360px] lg:min-h-[520px] rounded-[22px] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.12) 40%, rgba(10,22,40,0.68) 100%)`,
                border: isEnhancedCaseStudy
                  ? `1px solid ${project.panelAccentColor}24`
                  : '1px solid rgba(15,122,122,0.14)',
                boxShadow: isEnhancedCaseStudy
                  ? `0 20px 70px rgba(0,0,0,0.38), 0 0 44px ${project.panelAccentColor}0A`
                  : '0 4px 32px rgba(0,0,0,0.28)',
              }}
            >
              <ProjectFloatingScreenshots
                project={project}
                priority
                showWatermark
                imageSizes="(max-width: 1024px) 100vw, 620px"
              />

              <div
                className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full px-3 py-1 z-20"
                style={{
                  background: 'rgba(13,30,53,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${project.panelAccentColor}28`,
                }}
              >
                <StarMark size="xs" color={project.panelAccentColor} className="opacity-65" />
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-text-muted">
                  Case Study
                </span>
              </div>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col pt-1 lg:pt-3"
            >
              <motion.div variants={inn} className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="category" />
                ))}
              </motion.div>

              <motion.h1 variants={up} className="font-display text-h1 text-text-base leading-none">
                {project.name}
              </motion.h1>

              <motion.p
                variants={up}
                className="font-mono text-[11px] text-text-muted mt-3 tracking-wider uppercase"
              >
                {project.year} · {project.role}
              </motion.p>

              <motion.p
                variants={up}
                className="font-sans text-[17px] leading-[1.7] mt-5"
                style={{ color: '#A8C5D1' }}
              >
                {caseCopy.tagline}
              </motion.p>

              {caseCopy.outcome && (
                <motion.div variants={up} className="mt-5">
                  <Callout accent={project.panelAccentColor} enhanced={isEnhancedCaseStudy}>
                    {caseCopy.outcome}
                  </Callout>
                </motion.div>
              )}

              <motion.div variants={inn} className="flex flex-wrap gap-1.5 mt-5">
                {project.stack.slice(0, 5).map((s) => (
                  <StackPill key={s} label={s} accent={project.panelAccentColor} />
                ))}
              </motion.div>

              <motion.div variants={inn} className="flex flex-wrap gap-2.5 mt-7">
                <HoverSparkle className="inline-flex">
                  <StarburstButton href={`/projects/${project.slug}/demo`} variant="primary" size="md">
                    View Demo
                  </StarburstButton>
                </HoverSparkle>

                {project.liveUrl && (
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      Try It Out
                    </StarburstButton>
                  </HoverSparkle>
                )}

                {project.githubUrl && (
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      View Code
                    </StarburstButton>
                  </HoverSparkle>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div variants={inn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FactStrip project={project} enhanced={isEnhancedCaseStudy} />
      </motion.div>

      <div className="max-w-[1180px] mx-auto px-6 pt-6 pb-28">
        <div className="lg:grid lg:grid-cols-[196px_1fr] lg:gap-14 xl:gap-20 items-start">
          <aside className="hidden lg:block sticky top-24 self-start pt-10">
            <SideNav
              items={navItems}
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            />
          </aside>

          <div className="min-w-0">
            <CaseSection
              id="overview"
              number={sn('overview')}
              title="Overview"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <Prose>{caseCopy.overview}</Prose>
              <InsightGrid
                items={caseCopy.overviewCards}
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              />
            </CaseSection>

            <CaseSection
              id="problem"
              number={sn('problem')}
              title="Problem"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <div
                className={cn(
                  'pl-5',
                  isEnhancedCaseStudy && 'rounded-r-[18px] py-1 transition-colors duration-300',
                )}
                style={{
                  borderLeft: `2px solid ${project.panelAccentColor}${isEnhancedCaseStudy ? '55' : '35'}`,
                  background: isEnhancedCaseStudy
                    ? `linear-gradient(90deg, ${project.panelAccentColor}0A, transparent 58%)`
                    : undefined,
                }}
              >
                <Prose>{caseCopy.problem}</Prose>
              </div>

              <BulletRail
                items={caseCopy.problemBullets}
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              />
            </CaseSection>

            {caseCopy.users && (
              <CaseSection
                id="users"
                number={sn('users')}
                title="Users"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                <Prose>{caseCopy.users}</Prose>
                <InsightGrid
                  items={caseCopy.userCards}
                  accent={project.panelAccentColor}
                  enhanced={isEnhancedCaseStudy}
                />
              </CaseSection>
            )}

            <CaseSection
              id="solution"
              number={sn('solution')}
              title="Solution"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <Prose>{caseCopy.solution}</Prose>

              <InsightGrid
                items={caseCopy.solutionCards}
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              />

              {project.screenshots?.[1] && (
                <ScreenshotBlock
                  src={project.screenshots[1]}
                  alt={`${project.name} interface`}
                  accent={project.panelAccentColor}
                  caption={caseCopy.screenshotCaption ?? `${project.name} — interface`}
                  enhanced={isEnhancedCaseStudy}
                />
              )}
            </CaseSection>

            <CaseSection
              id="impact"
              number={sn('impact')}
              title="Impact"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              {caseCopy.outcome && (
                <div className="mb-5">
                  <Callout accent={project.panelAccentColor} enhanced={isEnhancedCaseStudy}>
                    {caseCopy.outcome}
                  </Callout>
                </div>
              )}

              <Prose>{caseCopy.impact}</Prose>

              <InsightGrid
                items={caseCopy.impactCards}
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              />
            </CaseSection>

            {caseCopy.buildNotes && (
              <CaseSection
                id="technical-build"
                number={sn('technical-build')}
                title="Technical Build"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s) => (
                    <StackPill key={s} label={s} accent={project.panelAccentColor} />
                  ))}
                </div>

                <Prose>{caseCopy.buildNotes}</Prose>

                <InsightGrid
                  items={caseCopy.buildCards}
                  accent={project.panelAccentColor}
                  enhanced={isEnhancedCaseStudy}
                />
              </CaseSection>
            )}

            {caseCopy.reflection && (
              <CaseSection
                id="reflection"
                number={sn('reflection')}
                title="Reflection"
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              >
                <div
                  className={cn('pl-5', isEnhancedCaseStudy && 'rounded-r-[18px] py-1')}
                  style={{
                    borderLeft: `1px solid ${
                      isEnhancedCaseStudy ? `${project.panelAccentColor}40` : 'rgba(15,122,122,0.20)'
                    }`,
                    background: isEnhancedCaseStudy
                      ? `linear-gradient(90deg, ${project.panelAccentColor}08, transparent 62%)`
                      : undefined,
                  }}
                >
                  <Prose>{caseCopy.reflection}</Prose>
                </div>

                <InsightGrid
                  items={caseCopy.reflectionCards}
                  accent={project.panelAccentColor}
                  enhanced={isEnhancedCaseStudy}
                />
              </CaseSection>
            )}

            <CaseSection
              id="demo-links"
              number={sn('demo-links')}
              title="Demo &amp; Links"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <div className="flex flex-wrap gap-3">
                <HoverSparkle className="inline-flex">
                  <StarburstButton href={`/projects/${project.slug}/demo`} variant="primary" size="md">
                    View Demo
                  </StarburstButton>
                </HoverSparkle>

                {project.liveUrl && (
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      Try It Out
                    </StarburstButton>
                  </HoverSparkle>
                )}

                {project.githubUrl && (
                  <HoverSparkle className="inline-flex">
                    <StarburstButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      View Code
                    </StarburstButton>
                  </HoverSparkle>
                )}

                <HoverSparkle className="inline-flex">
                  <StarburstButton href="/#projects" variant="secondary" size="md">
                    ← All Projects
                  </StarburstButton>
                </HoverSparkle>
              </div>
            </CaseSection>
          </div>
        </div>
      </div>
    </main>
  )
}