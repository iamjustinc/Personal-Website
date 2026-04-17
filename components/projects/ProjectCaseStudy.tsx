'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ProjectFloatingScreenshots } from '@/components/projects/ProjectFloatingScreenshots'
import { StarMark } from '@/components/ui/StarMark'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types/project'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

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
  pmInsight?: { label: string; body: string }
  overviewCards?: InsightCardItem[]
  problemBullets?: string[]
  userCards?: InsightCardItem[]
  solutionCards?: InsightCardItem[]
  impactCards?: InsightCardItem[]
  buildCards?: InsightCardItem[]
  reflectionCards?: InsightCardItem[]
  screenshotCaption?: string
}

// ── Kestrel ──────────────────────────────────────────────────────────────────

const kestrelCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Role-readiness decision engine that turns a target job description into fit signals, ranked gaps, resume direction, and an ordered action roadmap.',
  outcome:
    'Turns fragmented career preparation into one interpretable decision surface: what matches, what is missing, what to improve first, and what to do next.',

  overview:
    'Kestrel is a role-readiness decision engine for early-career candidates. A user brings a target job description and their background; the product extracts role requirements, evaluates fit, surfaces strengths alongside ranked gaps, and converts the result into a concrete roadmap they can act on immediately. The product is not about generating more career advice — it is about making the right next action obvious.',

  pmInsight: {
    label: 'Key Product Decision',
    body: 'Kestrel could have been a chatbot. The decision to build a structured card-based dashboard instead was the core product bet. Conversation allows for vagueness — a ranked, card-based output forces the system to be explicit about what it found, why it matters, and what to do first. Ranking is a harder problem than advising, and it is also more useful. That distinction shaped every design decision that followed.',
  },

  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'Career preparation is not an information shortage problem. Most candidates already have more than enough advice. What they lack is a clear, ranked order of operations specific to their target role.',
    },
    {
      title: 'Product Bet',
      body: 'One structured output surface that ranks what changes the outcome — fit score, skill gaps, resume edits, roadmap — in priority order, beats a conversational interface that advises without ranking.',
    },
  ],

  problem:
    'Early-career candidates targeting PM, Solutions Engineering, and adjacent roles prepare from scattered signals: job posts, resume edits, advice threads, and vague role expectations. That cycle produces effort without direction — repeated resume tweaks before the most important gaps are even identified, and no reliable way to judge when preparation is actually sufficient.',

  problemBullets: [
    'Job descriptions conflate hard requirements with soft preferences and filler language. Candidates cannot reliably distinguish which gaps are disqualifying versus negotiable.',
    'Most candidates improve their resume in isolation — before knowing which specific capability gaps to close. The effort often moves in the wrong direction.',
    'Available AI tools return generic guidance. They advise but do not rank. They list but do not prioritize. They generate output without helping users decide what to do first.',
  ],

  users:
    'Built for early-career candidates targeting PM, Solutions Engineering, and SWE-adjacent roles who need to translate their own background into role requirements without guessing which gaps matter most or where to focus their preparation time.',

  userCards: [
    {
      title: 'Primary User',
      body: 'Early-career candidates who are applying to multiple roles and need a faster, more reliable way to self-assess fit and prioritize preparation.',
    },
    {
      title: 'Job To Be Done',
      body: 'Tell me where I stand against this specific role, rank what I should work on first, and give me something I can act on before my next application.',
    },
  ],

  solution:
    'Kestrel parses the job description, extracts its core requirements into structured role signals, compares those signals against the user profile, and returns a readiness score, matched strengths, ranked skill gaps, resume improvement prompts, and a prioritized next-step roadmap — all in a card-based dashboard designed for fast scanning and clear interpretation.',

  solutionCards: [
    {
      title: 'Requirements Extraction',
      body: 'Parses job descriptions into structured role signals, separating hard requirements from soft preferences so candidates see what the role actually demands versus what it merely mentions.',
    },
    {
      title: 'Ranked Gap Analysis',
      body: 'Compares extracted requirements against the user profile and returns a ranked view: what is strong, what is marginal, and what is missing — ordered by likely impact on the application outcome.',
    },
    {
      title: 'Roadmap Generation',
      body: 'Converts the gap analysis into a concrete, sequenced action plan — so users leave with a specific order of operations, not a general list of things to improve.',
    },
  ],

  impact:
    'Instead of leaving candidates with another generic suggestion list, Kestrel gives them a decision view: what to lead with in the application, what to address in preparation, and how to explain their fit with more specificity and confidence. The product reframes career preparation from scattered research into a clearer, more focused workflow.',

  impactCards: [
    {
      title: 'User Shift',
      body: 'Candidates move from the cycle of applying-then-guessing to preparing against a specific, ranked target before the application is submitted.',
    },
    {
      title: 'Product Signal',
      body: 'The value is not more advice. The value is making the next action obvious — and making that action specific to a real role, not a generic profile.',
    },
  ],

  buildNotes:
    'The hardest technical problem was normalizing inconsistent job description text into structured, comparable role requirements. I used a staged AI pipeline with typed output schemas to keep requirements, scores, gaps, and roadmap items consistent enough to render reliably, support cross-role comparison, and stay explainable to the user.',

  buildCards: [
    {
      title: 'Structured Extraction',
      body: 'Typed output schemas constrained the AI pipeline to return requirements in a consistent shape — critical for rendering, ranking, and comparing results across different job descriptions.',
    },
    {
      title: 'Explainability by Design',
      body: 'Card-based outputs were a deliberate constraint: each recommendation had to be specific enough to attribute to a requirement and readable in under ten seconds without additional context.',
    },
  ],

  reflection:
    'The strongest product decision was restraint. An early version tried to generate polished resume sections. That was the wrong level of abstraction — candidates needed to know what to fix and why, not to have AI write it for them. Once the output narrowed to fit score, ranked gaps, resume direction, and roadmap, the product felt more credible, more trusted, and significantly more actionable.',

  reflectionCards: [
    {
      title: 'What I Cut',
      body: 'Resume generation, open-ended coaching, and broad career comparison. All of it expanded the surface area without improving the core decision a user needed to make.',
    },
    {
      title: 'What Remained',
      body: 'Score, gaps, resume direction, roadmap — in ranked order, specific to the role. Once the scope narrowed to those four outputs, the product felt like a tool rather than a demo.',
    },
  ],

  screenshotCaption: 'Kestrel — decision dashboard',
}

// ── Chirpie ──────────────────────────────────────────────────────────────────

const chirpieCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Conversational news product that turns multi-source reporting into source-aware, personalized digests with a natural path to go deeper.',
  outcome:
    'Makes news faster to enter without stripping out the trust signals users still need — source attribution, supporting context, tone calibration, and a clear path to more depth when a story matters.',

  overview:
    'Chirpie is a chat-first news companion built around a specific product insight: the real problem with news consumption is not the content quality or the source availability — it is the entry cost. Browsing a feed is too effortful to start casually. Chirpie redesigns the entry point rather than the news itself, delivering structured digests that feel conversational and light while keeping credibility signals visible.',

  pmInsight: {
    label: 'Core Product Insight',
    body: 'The tension in conversational news is that delight and trust often compete. A playful, chat-style format can feel like it is obscuring serious information. Chirpie resolves this by treating source attribution, confidence signals, and tone control as first-class product features — not as footnotes or disclaimers. Making the product feel lighter without making it feel less credible was the central design challenge, and the resolution shaped the entire interaction architecture.',
  },

  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'The opportunity is not just better summaries. Most users already have access to good news sources. The problem is that the format makes starting too costly. Chirpie redesigns the entry point.',
    },
    {
      title: 'Format Bet',
      body: 'A chat-native digest lowers the friction of engagement without collapsing the credibility of the content — if trust signals are treated as design requirements rather than secondary details.',
    },
  ],

  problem:
    'Most news products are optimized for browsing at scale, not conversational consumption. Users face volume-first feeds, generic topic personalization, and AI summary tools that can flatten nuance or strip attribution to stay brief. The result is a format that often feels either too dense to enter or too shallow to trust — and rarely both easy and credible at the same time.',

  problemBullets: [
    'Feeds are organized by recency and algorithmic relevance, not by what actually deserves a user\'s attention. The format creates friction before the content even loads.',
    'AI summary products often remove attribution to achieve brevity. That makes the output feel more confident than the source material actually justifies — which erodes trust over time.',
    'There is no natural path to more depth in most digest products. Once a user has the headline, the door to context closes. Follow-up requires leaving the product entirely.',
  ],

  users:
    'Built for scroll-native readers, busy professionals, and credibility-conscious users who want fast context without giving up source awareness, tonal calibration, or the ability to ask for more detail when a story genuinely matters to them.',

  userCards: [
    {
      title: 'Primary Audience',
      body: 'Users who want a faster, calmer entry into the news — not another high-volume feed to manage, but a lightweight way to stay informed without the usual effort cost.',
    },
    {
      title: 'Job To Be Done',
      body: 'Give me the gist first, show me what it is based on, and let me go deeper only when I actually want to — without leaving the product to do it.',
    },
  ],

  solution:
    'Chirpie transforms multi-source reporting into chat-native digests that feel light to enter but carry enough structure to feel trustworthy. Source attribution and confidence framing stay visible. Follow-up questions are supported natively. Tone and pacing adapt to the story type. The product is not summarizing articles — it is redesigning the format of news consumption around conversational sequencing and low-friction depth.',

  solutionCards: [
    {
      title: 'Format Transformation',
      body: 'Reporting becomes a chat-native digest — not a feed of article cards, not a chatbot with a prompt box. The structure is familiar enough to scan quickly but different enough to feel lower-effort than standard browsing.',
    },
    {
      title: 'Trust Architecture',
      body: 'Source links, attribution framing, and confidence cues are surfaced as first-class product elements — visible and legible without being intrusive or interrupting the reading flow.',
    },
    {
      title: 'Depth on Demand',
      body: 'Users can follow up on individual stories to go deeper, ask for context, or explore related angles — making the experience extensible without requiring a new tool or a context switch.',
    },
  ],

  impact:
    'Chirpie reduces the effort required to start engaging with the news while keeping the credibility layer visible and accessible. Users can move quickly through the digest, understand what each summary is based on, and decide which stories deserve deeper attention — making the product feel both easier to enter on any given day and worth returning to consistently.',

  impactCards: [
    {
      title: 'User Shift',
      body: 'Starting with the news stops feeling like a commitment. The format lowers effort enough that users re-engage more casually without feeling like they are cutting corners on credibility.',
    },
    {
      title: 'Trust Outcome',
      body: 'Because sources stay visible and confidence framing is explicit, users can assess what they are reading without needing to back-verify. That makes the product feel worth returning to — not just worth trying.',
    },
  ],

  buildNotes:
    'The core challenge was structuring news content without over-compressing it. The transformation had to be concise enough to scan in thirty seconds and credible enough to build on. I designed the summarization pipeline around explicit summary boundaries, source preservation, and contextual framing so that brevity did not erase nuance or imply certainty the source material did not support.',

  buildCards: [
    {
      title: 'Summary Boundaries',
      body: 'The pipeline was constrained to produce summaries that acknowledged the limits of the source material — not just the gist, but the confidence level of the gist. That constraint kept outputs from overstating.',
    },
    {
      title: 'Source-Aware Architecture',
      body: 'Attribution was built into the data model from the start, not added as a display layer afterward. That made it harder to accidentally strip context during transformation.',
    },
  ],

  reflection:
    'Chirpie works best when the delight is atmospheric rather than performative. The product became stronger when personality stopped competing with usability and started supporting it. The clearest lesson was that a conversational interface only earns trust when the interaction model is genuinely useful — not when it is stylistically interesting.',

  reflectionCards: [
    {
      title: 'Restraint',
      body: 'An early version leaned harder into playful UI patterns. That version felt more like a demo. Pulling back the personality and letting the format do the work made the product feel more real.',
    },
    {
      title: 'Product Lesson',
      body: 'Format trust is built through consistency, not feature density. Users need the interaction model to behave predictably before they will rely on it for something they care about.',
    },
  ],

  screenshotCaption: 'Chirpie — digest interface',
}

// ── Quail ────────────────────────────────────────────────────────────────────

const quailCaseStudyCopy: CaseStudyCopy = {
  tagline:
    'Inbox intelligence product that turns raw email volume into a prioritized action queue with urgency signals, compact summaries, and faster triage decisions.',
  outcome:
    'Reduces the cognitive cost of managing email by helping users see what deserves attention now, what can wait, and what can be handled or deferred without fully reopening each thread.',

  overview:
    'Quail is an inbox intelligence product built around a specific diagnosis: email overload is not primarily a volume problem — it is a prioritization and attention-management problem. Inboxes are organized chronologically, but people work by urgency and importance. Quail reinterprets the inbox as a triage surface, giving users a faster, more decision-oriented entry point into their messages without removing the context or control they rely on.',

  pmInsight: {
    label: 'Key Design Tradeoff',
    body: 'The harder product problem was not building intelligent prioritization — it was making that prioritization legible. When automation is opaque, users stop trusting it and revert to manual scanning, which defeats the entire purpose. Quail shows its scoring logic because trust is a more difficult product problem than ranking. A recommendation that explains itself is always more useful than a confident one that does not.',
  },

  overviewCards: [
    {
      title: 'Product Thesis',
      body: 'Email overload is a prioritization problem disguised as a volume problem. Quail does not try to reduce email — it separates reading from deciding, so users can act faster on what actually matters.',
    },
    {
      title: 'Design Principle',
      body: 'Effective inbox assistance earns trust before it earns automation. The system shows its work so users stay in control — making the product assistive rather than authoritative.',
    },
  ],

  problem:
    'Most email clients are built for reading and sorting, not for deciding. Users spend too much time opening individual threads just to determine whether action is required, then lose track of what they evaluated, and then rescan the same inbox again later. The friction is not just the number of messages — it is the repeated cognitive cost of reprioritizing on every open.',

  problemBullets: [
    'A chronological inbox creates no persistent signal of urgency. Every time a user opens their email, they must re-evaluate what matters now versus what mattered yesterday — from scratch.',
    'Opening a thread to determine whether action is needed is itself a time cost. For high-volume users, that cost compounds across dozens of messages and multiple sessions each day.',
    'Most automated prioritization is opaque. When users cannot understand why a message was surfaced or ranked, they distrust the system and revert to manual scanning — reintroducing exactly the friction the tool was supposed to eliminate.',
  ],

  users:
    'Built for busy professionals, operators, founders, and high-volume email users who need a faster way to triage incoming messages without sacrificing context, confidence, or the sense that they are still in control of their inbox.',

  userCards: [
    {
      title: 'Primary Audience',
      body: 'People managing dense, high-stakes inboxes where the cost of missing something urgent is real — and where the overhead of staying on top of everything is already too high.',
    },
    {
      title: 'Job To Be Done',
      body: 'Tell me what needs attention right now, show me why you think so, and let me handle the rest on my own terms — without making me reread my entire inbox to feel confident I am not missing something.',
    },
  ],

  solution:
    'Quail reinterprets the inbox as a triage surface. It scores and organizes incoming messages by urgency, sender context, and actionability — surfacing compact thread summaries, reasoning cues, and faster response pathways so users can make triage decisions without opening every email individually.',

  solutionCards: [
    {
      title: 'Triage Logic',
      body: 'Scores incoming messages across urgency, sender context, and likely action type — grouping and surfacing what matters now without burying lower-priority items entirely.',
    },
    {
      title: 'Compact Summaries',
      body: 'Renders concise thread context so users can make read-or-defer decisions without reopening each message. The summary carries enough signal to act on; the original is always available.',
    },
    {
      title: 'Reasoning Transparency',
      body: 'Surfaces why a message was ranked or flagged — keeping the scoring logic interpretable and giving users the confidence to trust the triage view rather than second-guess it.',
    },
  ],

  impact:
    'Quail changes email from passive reading into active prioritization. Instead of repeatedly scanning the inbox to rediscover what matters, users get a clearer decision surface that helps them act faster, defer more confidently, and move through their messages with significantly less friction and less cognitive residue from the session.',

  impactCards: [
    {
      title: 'User Shift',
      body: 'Users stop spending mental energy rediscovering what is urgent on every session and start spending it acting on what they already know matters — a meaningful shift in how attention gets used.',
    },
    {
      title: 'Product Signal',
      body: 'The value is not faster reading. It is better deciding. Quail earns its place in a workflow by accelerating the judgment calls users were already making, not by replacing them.',
    },
  ],

  buildNotes:
    'The hard part was balancing intelligence with trust and control. A system that ranks and summarizes but cannot explain its reasoning creates a new form of inbox anxiety — users start wondering what it missed. I designed the scoring output around human-readable urgency cues and kept the reasoning visible in the UI, which made the product feel trustworthy in practice rather than just technically capable.',

  buildCards: [
    {
      title: 'Scoring Legibility',
      body: 'Urgency scores were only valuable if users could see the signal behind them. I designed the output layer around readable reasoning cues rather than abstract confidence levels or hidden weights.',
    },
    {
      title: 'Summary Constraints',
      body: 'Thread summaries had to be short enough to scan in a few seconds, specific enough to support an action decision, and careful enough not to imply more certainty than the source thread contained.',
    },
  ],

  reflection:
    'The strongest product lesson was the difference between assistive and authoritative automation. Users will accept AI reducing their workload. They will not accept AI making decisions for them. Quail became a better product when I stopped trying to automate triage decisions and started designing to accelerate the decisions users were already making themselves.',

  reflectionCards: [
    {
      title: 'What I Learned',
      body: 'Making the system\'s reasoning legible built more trust than any additional feature. Users needed to understand the system before they would rely on it — and once they did, the automation became genuinely useful.',
    },
    {
      title: 'Product Constraint',
      body: 'The product improved when I stopped optimizing for automation coverage and started optimizing for the user\'s sense of control. There is a meaningful difference between a tool that manages your inbox and one that helps you manage it.',
    },
  ],

  screenshotCaption: 'Quail — inbox triage interface',
}

// ── Copy resolver ─────────────────────────────────────────────────────────────

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

// ── Section glow positions (atmospheric accent per section) ──────────────────

const SECTION_GLOW: Record<string, { x: string; y: string }> = {
  overview:        { x: '88%', y: '18%' },
  problem:         { x: '6%',  y: '58%' },
  users:           { x: '82%', y: '42%' },
  solution:        { x: '10%', y: '32%' },
  impact:          { x: '90%', y: '22%' },
  'technical-build': { x: '8%', y: '68%' },
  reflection:      { x: '76%', y: '78%' },
  'demo-links':    { x: '50%', y: '50%' },
}

// ── Fact strip ───────────────────────────────────────────────────────────────

function FactStrip({ project, enhanced = false }: { project: Project; enhanced?: boolean }) {
  const facts = [
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: project.stack.slice(0, 4).join(' · ') },
  ]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderBottom: enhanced
          ? `1px solid ${project.panelAccentColor}1F`
          : '1px solid rgba(15,122,122,0.10)',
        boxShadow: enhanced ? `inset 0 1px 0 ${project.panelAccentColor}12` : undefined,
      }}
    >
      {/* Subtle shimmer sweep */}
      {enhanced && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 -skew-x-12"
          style={{
            width: '30%',
            left: '-40%',
            background: `linear-gradient(90deg, transparent, ${project.panelAccentColor}0A, transparent)`,
          }}
          animate={{ x: ['0%', '520%'] }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
      <div className="max-w-[1180px] mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-center gap-2"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Side nav ─────────────────────────────────────────────────────────────────

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
  const reduceMotion = useReducedMotion()

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
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="relative" aria-label="Case study sections">
      {/* Faint vertical connecting rail */}
      <div
        className="pointer-events-none absolute left-[17px] top-8 bottom-2 w-px"
        style={{
          background: `linear-gradient(180deg, ${accent}30 0%, ${accent}10 60%, transparent 100%)`,
        }}
        aria-hidden
      />

      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted opacity-40 px-3 mb-4">
        Contents
      </p>

      <div className="space-y-0.5">
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
              className="group relative flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors duration-200 overflow-hidden"
            >
              {/* Animated sliding background — layoutId makes it glide between items */}
              {isActive && (
                <motion.div
                  layoutId="sidenav-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: enhanced
                      ? `linear-gradient(90deg, ${accent}22 0%, ${accent}0D 50%, transparent 100%)`
                      : `linear-gradient(90deg, ${accent}18, transparent)`,
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.6 }}
                />
              )}

              {/* Active left accent bar */}
              <div
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full transition-all duration-300"
                style={{
                  background: `linear-gradient(180deg, ${accent}, ${accent}44)`,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scaleY(1)' : 'scaleY(0.3)',
                  transformOrigin: 'center',
                }}
                aria-hidden
              />

              {/* Number */}
              <span
                className="relative font-mono text-[9px] tabular-nums shrink-0 transition-all duration-300"
                style={{
                  color: accent,
                  opacity: isActive ? (enhanced ? 0.88 : 0.65) : 0.22,
                  textShadow: isActive && enhanced ? `0 0 16px ${accent}66` : undefined,
                }}
              >
                {item.number}
              </span>

              {/* Label */}
              <span
                className="relative font-mono text-[10.5px] uppercase tracking-[0.09em] transition-all duration-300 leading-none"
                style={{
                  color: isActive ? (enhanced ? '#D7EEF1' : accent) : '#5A8A9A',
                  textShadow: isActive && enhanced ? `0 0 20px ${accent}28` : undefined,
                }}
              >
                {item.label}
              </span>

              {/* Active indicator — twinkling star or dot */}
              <div
                className={cn(
                  'ml-auto shrink-0 transition-all duration-300',
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
                )}
              >
                {isActive && !reduceMotion ? (
                  <motion.div
                    layoutId="sidenav-star"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <StarMark
                      size="xs"
                      color={accent}
                      className={enhanced ? 'opacity-90' : 'opacity-70'}
                    />
                  </motion.div>
                ) : (
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: accent,
                      boxShadow: enhanced ? `0 0 10px ${accent}88` : undefined,
                    }}
                  />
                )}
              </div>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

// ── Section wrapper ──────────────────────────────────────────────────────────

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
  const glowPos = SECTION_GLOW[id] ?? { x: '80%', y: '30%' }

  return (
    <motion.section
      id={id}
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative scroll-mt-24 py-14 overflow-hidden"
      style={
        enhanced
          ? {
              borderTop: '1px solid transparent',
              background: `linear-gradient(90deg, ${accent}2C, rgba(196,151,74,0.12), transparent 68%) top / 100% 1px no-repeat`,
            }
          : { borderTop: '1px solid rgba(15,122,122,0.10)' }
      }
    >
      {/* Ghost watermark number */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-0 font-display leading-none opacity-[0.036]"
        style={{
          fontSize: 'clamp(5.5rem, 14vw, 11rem)',
          color: accent,
          lineHeight: 0.85,
        }}
      >
        {number}
      </span>

      {/* Ambient glow pool */}
      {enhanced && (
        <div
          className="pointer-events-none absolute rounded-full blur-[90px]"
          style={{
            width: 280,
            height: 180,
            left: glowPos.x,
            top: glowPos.y,
            transform: 'translate(-50%, -50%)',
            background: accent,
            opacity: 0.055,
          }}
          aria-hidden
        />
      )}

      {/* Left margin glow for enhanced sections */}
      {enhanced && (
        <div
          className="pointer-events-none absolute -left-6 top-10 h-20 w-20 rounded-full blur-3xl"
          style={{ background: `${accent}0E` }}
          aria-hidden
        />
      )}

      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="font-mono text-[10px] tabular-nums select-none shrink-0"
          style={{ color: accent, opacity: enhanced ? 0.65 : 0.38 }}
        >
          {number}
        </span>

        <motion.div
          initial={reduceMotion ? {} : { scale: 0.6, opacity: 0 }}
          whileInView={reduceMotion ? {} : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <StarMark size="xs" color={accent} className="opacity-55 shrink-0" />
        </motion.div>

        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em] relative"
          style={{
            color: enhanced ? '#D7EEF1' : accent,
            textShadow: enhanced ? `0 0 22px ${accent}26` : undefined,
          }}
        >
          {title}
        </span>

        <div
          className="h-px flex-1"
          style={{
            background: enhanced
              ? `linear-gradient(90deg, ${accent}44, rgba(196,151,74,0.16), transparent)`
              : 'rgba(15,122,122,0.10)',
          }}
          aria-hidden
        />
      </div>

      {children}
    </motion.section>
  )
}

// ── Content primitives ────────────────────────────────────────────────────────

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn('font-sans text-[15px] leading-[1.88] max-w-[70ch]', className)}
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
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 px-5 py-4 rounded-[18px] overflow-hidden',
        enhanced && 'transition-transform duration-300 hover:-translate-y-0.5',
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
        <>
          {/* Top shimmer */}
          <div
            className="pointer-events-none absolute inset-x-5 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }}
            aria-hidden
          />
          {/* Pulsing ambient glow */}
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[18px]"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{ boxShadow: `inset 0 0 32px ${accent}14` }}
              aria-hidden
            />
          )}
        </>
      )}

      <StarMark
        size="xs"
        color={accent}
        className={cn(enhanced ? 'opacity-60' : 'opacity-50', 'mt-0.5 shrink-0 relative')}
      />

      <p className="relative font-sans text-[14px] leading-relaxed" style={{ color: '#B8D0DC' }}>
        {children}
      </p>
    </div>
  )
}

// ── PmInsight — featured key product decision block ───────────────────────────

function PmInsight({
  label,
  body,
  accent,
}: {
  label: string
  body: string
  accent: string
}) {
  const reduceMotion = useReducedMotion()

  // Fixed constellation star positions within the block
  const constellationStars = [
    { x: '88%', y: '18%', delay: 0,    dur: 3.2 },
    { x: '92%', y: '72%', delay: 1.4,  dur: 4.1 },
    { x: '78%', y: '44%', delay: 0.8,  dur: 3.7 },
  ]

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mt-8 overflow-hidden rounded-[20px] p-6 transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(135deg, ${accent}18 0%, rgba(9,21,38,0.94) 58%)`,
        border: `1px solid ${accent}36`,
        boxShadow: `0 18px 52px rgba(0,0,0,0.30), 0 0 40px ${accent}0C`,
      }}
    >
      {/* Top shimmer */}
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}94 38%, rgba(196,151,74,0.38) 56%, ${accent}94 72%, transparent 100%)`,
        }}
        aria-hidden
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full"
        style={{ background: `linear-gradient(180deg, ${accent}EE 0%, ${accent}55 60%, ${accent}18 100%)` }}
        aria-hidden
      />

      {/* Bottom-right ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-40 h-28 rounded-full blur-3xl opacity-40"
        style={{ background: `radial-gradient(circle, ${accent}20, transparent 70%)` }}
        aria-hidden
      />

      {/* Constellation stars */}
      {!reduceMotion && constellationStars.map((star, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: star.x, top: star.y }}
          animate={{ opacity: [0.08, 0.38, 0.08], scale: [0.7, 1.1, 0.7] }}
          transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
          aria-hidden
        >
          <StarMark size="xs" color={accent} />
        </motion.div>
      ))}

      <div className="pl-5 relative">
        <div className="flex items-center gap-2 mb-3">
          <StarMark size="xs" color={accent} className="opacity-85 shrink-0" />
          <p
            className="font-mono text-[9.5px] uppercase tracking-[0.16em]"
            style={{ color: accent, opacity: 0.92 }}
          >
            {label}
          </p>
        </div>
        <p
          className="font-sans text-[15px] leading-[1.84] max-w-[64ch]"
          style={{ color: '#C8DEE8' }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  )
}

// ── Screenshot block ─────────────────────────────────────────────────────────

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
    <div className="mt-8 space-y-2.5">
      <div
        className="group relative w-full overflow-hidden rounded-[18px]"
        style={{
          aspectRatio: '1.85 / 1',
          background: enhanced
            ? `radial-gradient(circle at 20% 10%, ${accent}12, rgba(10,22,40,0.30) 42%, rgba(10,22,40,0.44))`
            : 'rgba(10,22,40,0.28)',
          border: `1px solid ${enhanced ? `${accent}2C` : `${accent}18`}`,
          boxShadow: enhanced
            ? `0 24px 68px rgba(0,0,0,0.40), 0 0 44px ${accent}0A`
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

        {/* Hover shimmer sweep */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 z-10 opacity-0 group-hover:opacity-100 -skew-x-12 transition-opacity duration-300"
            style={{
              width: '35%',
              left: '-40%',
              background: `linear-gradient(90deg, transparent, ${accent}14, transparent)`,
            }}
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            aria-hidden
          />
        )}

        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className={cn(
            'object-cover object-top',
            enhanced && !reduceMotion && 'transition-transform duration-700 group-hover:scale-[1.014]',
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

// ── Stack pill ────────────────────────────────────────────────────────────────

function StackPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="font-mono text-[9.5px] px-2.5 py-1 rounded-btn transition-all duration-200 hover:-translate-y-0.5"
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

// ── Insight grid ─────────────────────────────────────────────────────────────

function InsightGrid({
  items,
  accent,
  enhanced = false,
  variant,
}: {
  items?: InsightCardItem[]
  accent: string
  enhanced?: boolean
  variant?: 'grid' | 'trio' | 'featured'
}) {
  const reduceMotion = useReducedMotion()
  if (!items || items.length === 0) return null

  // Auto-detect trio, allow explicit override
  const resolvedVariant = variant ?? (items.length === 3 ? 'trio' : 'grid')

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className={cn(
        'mt-7',
        resolvedVariant === 'trio'
          ? 'grid gap-3 md:grid-cols-2 lg:grid-cols-3'
          : resolvedVariant === 'featured'
          ? 'grid gap-3 md:grid-cols-2'
          : 'grid gap-3 md:grid-cols-2',
      )}
    >
      {items.map((item, idx) => {
        const isFeaturedFirst = resolvedVariant === 'featured' && idx === 0

        return (
          <motion.div
            key={item.title}
            variants={fadeUp}
            whileHover={
              reduceMotion
                ? {}
                : {
                    y: -4,
                    boxShadow: enhanced
                      ? `0 18px 44px rgba(0,0,0,0.28), 0 0 0 1px ${accent}38, 0 0 28px ${accent}0E`
                      : `0 12px 32px rgba(0,0,0,0.22), 0 0 0 1px ${accent}28`,
                  }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'group relative overflow-hidden rounded-[18px] p-4',
              enhanced && 'transition-transform duration-200',
              isFeaturedFirst && 'md:col-span-2',
            )}
            style={{
              background: enhanced
                ? `linear-gradient(165deg, ${accent}10 0%, rgba(9,21,38,0.88) 48%)`
                : 'rgba(9,21,38,0.72)',
              border: `1px solid ${enhanced ? `${accent}22` : 'rgba(15,122,122,0.12)'}`,
              boxShadow: enhanced
                ? `0 14px 34px rgba(0,0,0,0.18), 0 0 24px ${accent}08`
                : undefined,
            }}
          >
            {/* Top shimmer line */}
            <div
              className="pointer-events-none absolute inset-x-3 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  idx === 1 ? 'rgba(196,151,74,0.50)' : `${accent}55`
                }, transparent)`,
                opacity: enhanced ? 0.9 : 0.5,
              }}
              aria-hidden
            />

            {/* Hover light sweep */}
            {!reduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-y-0 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  width: '45%',
                  left: '-55%',
                  background: `linear-gradient(90deg, transparent, ${accent}12, transparent)`,
                }}
                animate={{ x: ['0%', '450%'] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
                aria-hidden
              />
            )}

            {/* Card index */}
            <span
              className="font-mono text-[9px] tabular-nums mb-2.5 block"
              style={{ color: accent, opacity: 0.30 }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>

            <p
              className={cn(
                'font-mono uppercase tracking-[0.12em] mb-2.5',
                isFeaturedFirst ? 'text-[11px]' : 'text-[10px]',
              )}
              style={{ color: enhanced ? '#D7EEF1' : accent, opacity: enhanced ? 0.92 : 0.78 }}
            >
              {item.title}
            </p>

            <p
              className={cn(
                'font-sans leading-[1.76]',
                isFeaturedFirst ? 'text-[14px]' : 'text-[13.5px]',
              )}
              style={{ color: '#9EBBC7' }}
            >
              {item.body}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ── Bullet rail ───────────────────────────────────────────────────────────────

function BulletRail({
  items,
  accent,
  enhanced = false,
}: {
  items?: string[]
  accent: string
  enhanced?: boolean
}) {
  const reduceMotion = useReducedMotion()
  if (!items || items.length === 0) return null

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-4%' }}
      className="relative mt-7 space-y-0"
    >
      {/* Faint vertical connector between bullets */}
      <div
        className="pointer-events-none absolute left-[5px] top-[10px]"
        style={{
          bottom: 10,
          width: 1,
          background: `linear-gradient(180deg, ${accent}30, ${accent}10, transparent)`,
        }}
        aria-hidden
      />

      {items.map((item, i) => (
        <motion.div
          key={item}
          variants={fadeUp}
          className="group flex items-start gap-3.5 py-2"
        >
          <div className="relative mt-[9px] shrink-0">
            {/* Glow halo on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[4px]"
              style={{ background: accent }}
              aria-hidden
            />
            <div
              className="relative h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{
                background: accent,
                boxShadow: enhanced ? `0 0 10px ${accent}55` : undefined,
              }}
            />
          </div>
          <p
            className="font-sans text-[14px] leading-[1.80] max-w-[68ch]"
            style={{ color: '#9EBBC7' }}
          >
            {item}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ── Section divider accent ────────────────────────────────────────────────────

function ChapterDivider({ accent }: { accent: string }) {
  return (
    <div className="relative flex items-center gap-4 my-2" aria-hidden>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}18)` }} />
      <StarMark size="xs" color={accent} className="opacity-20" />
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}18, transparent)` }} />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stagger = useMotionSafe(staggerContainer(0.1))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)
  const reduceMotion = useReducedMotion()

  const isEnhancedCaseStudy = ['kestrel', 'chirpie', 'quail'].includes(project.slug)
  const caseCopy = getCaseStudyCopy(project)

  let n = 0
  const fmt = () => String(++n).padStart(2, '0')
  const has = (v: unknown) => v !== undefined && v !== null && v !== ''

  const navItems: NavItem[] = [
    { id: 'overview',        label: 'Overview',   number: fmt() },
    { id: 'problem',         label: 'Problem',    number: fmt() },
    ...(has(caseCopy.users) ? [{ id: 'users', label: 'Users', number: fmt() }] : []),
    { id: 'solution',        label: 'Solution',   number: fmt() },
    { id: 'impact',          label: 'Impact',     number: fmt() },
    ...(has(caseCopy.buildNotes)
      ? [{ id: 'technical-build', label: 'Technical', number: fmt() }]
      : []),
    ...(has(caseCopy.reflection)
      ? [{ id: 'reflection', label: 'Reflection', number: fmt() }]
      : []),
    { id: 'demo-links',      label: 'Links',      number: fmt() },
  ]

  const sn = (id: string) => navItems.find((item) => item.id === id)?.number ?? '—'

  // Hero floating star positions
  const heroStars = [
    { x: '14%', y: '20%', delay: 0,    dur: 3.1 },
    { x: '72%', y: '12%', delay: 1.2,  dur: 4.2 },
    { x: '88%', y: '68%', delay: 0.5,  dur: 3.6 },
    { x: '28%', y: '82%', delay: 1.8,  dur: 2.9 },
    { x: '54%', y: '38%', delay: 0.9,  dur: 3.8 },
  ]

  return (
    <main className="bg-bg min-h-screen pt-16">

      {/* ── Hero band ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${project.panelAccentColor}16 0%, rgba(10,22,40,0) 55%)`,
          borderBottom: '1px solid rgba(15,122,122,0.10)',
        }}
      >
        {/* Hero top-edge shimmer */}
        {isEnhancedCaseStudy && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${project.panelAccentColor}55 28%, rgba(196,151,74,0.28) 54%, ${project.panelAccentColor}55 78%, transparent 100%)`,
            }}
            aria-hidden
          />
        )}

        {/* Large ambient glow behind hero */}
        <div
          className="pointer-events-none absolute top-0 left-[5%] w-[50%] h-full opacity-[0.07] blur-[100px]"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${project.panelAccentColor}, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Watermark star */}
        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
          <WatermarkStar size={540} opacity={0.022} direction={1} color={project.panelAccentColor} />
        </div>

        {/* Floating hero constellation stars */}
        {isEnhancedCaseStudy && !reduceMotion && heroStars.map((star, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute z-0"
            style={{ left: star.x, top: star.y }}
            animate={{ opacity: [0.06, 0.28, 0.06], scale: [0.7, 1.0, 0.7] }}
            transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
            aria-hidden
          >
            <StarMark size="xs" color={project.panelAccentColor} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 py-14 lg:py-22">
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

          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-16 items-start">

            {/* Visual panel */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[360px] lg:min-h-[540px] rounded-[22px] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, ${project.panelAccentColor}10 0%, rgba(10,22,40,0.12) 40%, rgba(10,22,40,0.68) 100%)`,
                border: isEnhancedCaseStudy
                  ? `1px solid ${project.panelAccentColor}24`
                  : '1px solid rgba(15,122,122,0.14)',
                boxShadow: isEnhancedCaseStudy
                  ? `0 24px 80px rgba(0,0,0,0.42), 0 0 52px ${project.panelAccentColor}0A`
                  : '0 4px 32px rgba(0,0,0,0.28)',
              }}
            >
              <ProjectFloatingScreenshots
                project={project}
                priority
                showWatermark
                imageSizes="(max-width: 1024px) 100vw, 640px"
              />

              {/* Badge */}
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
            </motion.div>

            {/* Hero text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col pt-1 lg:pt-4"
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
                className="font-sans text-[17px] leading-[1.72] mt-5"
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

      {/* Fact strip */}
      <motion.div variants={inn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FactStrip project={project} enhanced={isEnhancedCaseStudy} />
      </motion.div>

      {/* ── Body: sidebar + content rail ── */}
      <div className="max-w-[1180px] mx-auto px-6 pt-6 pb-32">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-14 xl:gap-20 items-start">

          {/* Sticky side nav */}
          <aside className="hidden lg:block sticky top-24 self-start pt-10">
            <SideNav
              items={navItems}
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            />
          </aside>

          {/* Content rail */}
          <div className="min-w-0">

            {/* ── Overview ── */}
            <CaseSection
              id="overview"
              number={sn('overview')}
              title="Overview"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <Prose>{caseCopy.overview}</Prose>

              {caseCopy.pmInsight && (
                <PmInsight
                  label={caseCopy.pmInsight.label}
                  body={caseCopy.pmInsight.body}
                  accent={project.panelAccentColor}
                />
              )}

              <InsightGrid
                items={caseCopy.overviewCards}
                accent={project.panelAccentColor}
                enhanced={isEnhancedCaseStudy}
              />
            </CaseSection>

            <ChapterDivider accent={project.panelAccentColor} />

            {/* ── Problem ── */}
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
                  isEnhancedCaseStudy && 'rounded-r-[16px] py-1 transition-colors duration-300',
                )}
                style={{
                  borderLeft: `2px solid ${project.panelAccentColor}${isEnhancedCaseStudy ? '58' : '35'}`,
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

            <ChapterDivider accent={project.panelAccentColor} />

            {/* ── Users ── */}
            {caseCopy.users && (
              <>
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
                    variant="featured"
                  />
                </CaseSection>

                <ChapterDivider accent={project.panelAccentColor} />
              </>
            )}

            {/* ── Solution ── */}
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

            <ChapterDivider accent={project.panelAccentColor} />

            {/* ── Impact ── */}
            <CaseSection
              id="impact"
              number={sn('impact')}
              title="Impact"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              {caseCopy.outcome && (
                <div className="mb-6">
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
                variant="featured"
              />
            </CaseSection>

            {/* ── Technical Build ── */}
            {caseCopy.buildNotes && (
              <>
                <ChapterDivider accent={project.panelAccentColor} />

                <CaseSection
                  id="technical-build"
                  number={sn('technical-build')}
                  title="Technical Build"
                  accent={project.panelAccentColor}
                  enhanced={isEnhancedCaseStudy}
                >
                  <div className="flex flex-wrap gap-1.5 mb-6">
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
              </>
            )}

            {/* ── Reflection ── */}
            {caseCopy.reflection && (
              <>
                <ChapterDivider accent={project.panelAccentColor} />

                <CaseSection
                  id="reflection"
                  number={sn('reflection')}
                  title="Reflection"
                  accent={project.panelAccentColor}
                  enhanced={isEnhancedCaseStudy}
                >
                  <div
                    className={cn('pl-5', isEnhancedCaseStudy && 'rounded-r-[16px] py-1')}
                    style={{
                      borderLeft: `1px solid ${
                        isEnhancedCaseStudy
                          ? `${project.panelAccentColor}42`
                          : 'rgba(15,122,122,0.20)'
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
              </>
            )}

            <ChapterDivider accent={project.panelAccentColor} />

            {/* ── Demo & Links ── */}
            <CaseSection
              id="demo-links"
              number={sn('demo-links')}
              title="Demo &amp; Links"
              accent={project.panelAccentColor}
              enhanced={isEnhancedCaseStudy}
            >
              <div className="flex flex-wrap gap-3">
                <HoverSparkle className="inline-flex">
                  <StarburstButton
                    href={`/projects/${project.slug}/demo`}
                    variant="primary"
                    size="md"
                  >
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
