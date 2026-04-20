'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { EASING, fadeUp, fadeIn, staggerContainer } from '@/lib/motion'
import { HeroVisual } from '@/components/hero/HeroVisual'

// ── Data ──────────────────────────────────────────────────────────────────────

const proofStats = [
  {
    value: '30K+',
    label: 'records modeled',
    body: 'risk-scoring workflows and dashboards',
  },
  {
    value: '70%',
    label: 'analysis time reduced',
    body: 'Python/R pipelines replacing manual review',
  },
  {
    value: '63%',
    label: 'completion increase',
    body: 'scheduling workflow redesign across 100+ sessions',
  },
  {
    value: '3',
    label: 'AI workflow systems',
    body: 'career, inbox, and news systems with clear walkthrough paths',
  },
]

const strengths = [
  {
    number: '01',
    title: 'Tailored product walkthroughs',
    body: 'I tailor walkthroughs around the user workflow, decision criteria, and what needs to be believed.',
  },
  {
    number: '02',
    title: 'Discovery-first thinking',
    body: 'I map friction, constraints, and adoption risks before recommending the fix.',
  },
  {
    number: '03',
    title: 'Stakeholder-ready communication',
    body: 'I translate architecture, AI outputs, and tradeoffs into language each audience can use.',
  },
  {
    number: '04',
    title: 'Complexity translated into value',
    body: 'I connect system behavior to workflow impact, decision support, and clearer action.',
  },
]

const compactSignals = [
  'Technical systems',
  'Product walkthroughs',
  'Workflow translation',
  'Stakeholder clarity',
  'Decision support',
]

const pageSparkles = [
  { x: '18%', y: '30%', delay: 0.2, dur: 4.6, color: '#4A9FAE' },
  { x: '78%', y: '34%', delay: 1.4, dur: 5.2, color: '#C4974A' },
  { x: '68%', y: '58%', delay: 2.2, dur: 4.9, color: '#7EE7F2' },
  { x: '22%', y: '76%', delay: 3.0, dur: 5.6, color: '#C4974A' },
]

const constellationLinks = [
  { left: '12%', top: '33%', width: 118, rotate: 18, opacity: 0.12 },
  { left: '71%', top: '39%', width: 96, rotate: -24, opacity: 0.10 },
  { left: '18%', top: '81%', width: 132, rotate: -12, opacity: 0.11 },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const shouldReduce = useReducedMotion()

  // Fixed constellation positions for hero zone
  const heroStars = [
    { x: '7%',  y: '24%', delay: 0,    dur: 3.4, color: '#4A9FAE' },
    { x: '95%', y: '36%', delay: 1.3,  dur: 4.1, color: '#C4974A' },
    { x: '88%', y: '80%', delay: 0.7,  dur: 3.8, color: '#4A9FAE' },
    { x: '11%', y: '90%', delay: 2.0,  dur: 3.2, color: '#7EE7F2' },
  ]

  return (
    <main className="pt-16 min-h-screen relative overflow-hidden">

      {/* ── Background atmosphere ── */}
      <div
        aria-hidden
        className="absolute top-[-6%] right-[-10%] pointer-events-none"
        style={{ opacity: 0.045 }}
      >
        <WatermarkStar size={620} opacity={1} direction={1} color="#4A9FAE" />
      </div>

      {/* Top-left glow */}
      <div
        aria-hidden
        className="absolute left-[-10%] top-[14%] h-[560px] w-[560px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.12) 0%, rgba(74,159,174,0.05) 42%, transparent 74%)',
        }}
      />

      {/* Bottom-right gold glow — depth layer */}
      <div
        aria-hidden
        className="absolute right-[-6%] bottom-[6%] h-[400px] w-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(196,151,74,0.07) 0%, rgba(196,151,74,0.03) 44%, transparent 72%)',
        }}
      />

      {/* Bottom-left teal glow */}
      <div
        aria-hidden
        className="absolute left-[2%] bottom-[20%] h-[280px] w-[280px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15,122,122,0.06) 0%, transparent 68%)',
        }}
      />

      {!shouldReduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-[4%] -left-[34%] z-0 w-[28%] -skew-x-12 blur-2xl"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(74,159,174,0.045), rgba(196,151,74,0.026), transparent)',
            }}
            animate={{ x: ['0%', '520%'] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeInOut',
            }}
          />

          {pageSparkles.map((sparkle) => (
            <motion.div
              key={`${sparkle.x}-${sparkle.y}`}
              aria-hidden
              className="pointer-events-none absolute z-0"
              style={{ left: sparkle.x, top: sparkle.y }}
              animate={{ opacity: [0.05, 0.24, 0.05], scale: [0.76, 1.08, 0.76] }}
              transition={{
                duration: sparkle.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sparkle.delay,
              }}
            >
              <StarMark size="xs" color={sparkle.color} />
            </motion.div>
          ))}

          {constellationLinks.map((link) => (
            <motion.div
              key={`${link.left}-${link.top}`}
              aria-hidden
              className="pointer-events-none absolute z-0 h-px origin-left"
              style={{
                left: link.left,
                top: link.top,
                width: link.width,
                rotate: `${link.rotate}deg`,
                opacity: link.opacity,
                background:
                  'linear-gradient(90deg, transparent, rgba(126,231,242,0.44), rgba(196,151,74,0.30), transparent)',
              }}
              animate={{ opacity: [link.opacity * 0.55, link.opacity, link.opacity * 0.55] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}

      {/* Floating constellation stars in hero zone */}
      {!shouldReduce && heroStars.map((star, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{ left: star.x, top: star.y }}
          animate={{ opacity: [0.05, 0.26, 0.05], scale: [0.75, 1.05, 0.75] }}
          transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
        >
          <StarMark size="xs" color={star.color} />
        </motion.div>
      ))}

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <Section paddingY="lg">
        {/* Page badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
            </motion.div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-muted">
              About
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-18 items-center">

          {/* HeroVisual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={shouldReduce ? undefined : { scale: 1.012, y: -3 }}
            transition={{ duration: 0.36, ease: EASING }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Pulsing ambient glow */}
              <motion.div
                aria-hidden
                className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(74,159,174,0.16) 0%, rgba(74,159,174,0.05) 54%, transparent 76%)',
                }}
                animate={shouldReduce ? {} : { scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Floating gold star */}
              <motion.div
                aria-hidden
                className="absolute -left-10 top-8"
                animate={shouldReduce ? {} : { y: [0, -8, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="sm" color="#C4974A" className="opacity-85" />
              </motion.div>

              {/* Floating teal star */}
              <motion.div
                aria-hidden
                className="absolute -right-5 bottom-12"
                animate={shouldReduce ? {} : { scale: [1, 1.16, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="xs" color="#7EE7F2" className="opacity-85" />
              </motion.div>

              {/* Small accent star bottom-left */}
              <motion.div
                aria-hidden
                className="absolute left-4 -bottom-3"
                animate={shouldReduce ? {} : { opacity: [0.12, 0.48, 0.12], scale: [0.78, 1.08, 0.78] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              >
                <StarMark size="xs" color="#4A9FAE" className="opacity-60" />
              </motion.div>

              <div className="scale-[0.62] sm:scale-[0.68] lg:scale-[0.72] origin-center">
                <HeroVisual />
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-[760px]"
          >
            <motion.div variants={fadeUp}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                style={{
                  background: 'rgba(15,122,122,0.08)',
                  border: '1px solid rgba(15,122,122,0.22)',
                }}
              >
                <motion.div
                  animate={shouldReduce ? {} : { scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
                </motion.div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.12em]"
                  style={{ color: '#4A9FAE' }}
                >
                  Early-career technical systems
                </span>
              </div>

              <h1 className="group/name relative inline-block max-w-[580px] font-sans text-[22px] font-semibold leading-snug text-text-base sm:text-[24px] lg:text-[26px]">
                <span className="relative z-10">
                  I turn technical complexity into{' '}
                  <span style={{ color: '#4A9FAE' }}>clear workflows and decisions.</span>
                </span>
                {!shouldReduce && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-[58%] z-0 h-[22%] rounded-full blur-xl"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(74,159,174,0.10), rgba(196,151,74,0.06), transparent)',
                    }}
                    animate={{ opacity: [0.12, 0.30, 0.12], x: ['-2%', '2%', '-2%'] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                {!shouldReduce && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 top-1 opacity-0 transition-opacity duration-300 group-hover/name:opacity-100"
                    animate={{ rotate: [0, 18, 0], scale: [0.78, 1.02, 0.78] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <StarMark size="xs" color="#C4974A" />
                  </motion.span>
                )}
              </h1>

              <p
                className="mt-4 max-w-[56ch] font-sans text-[14.5px] leading-7"
                style={{ color: '#A8C5D1' }}
              >
                I build AI/data tools, explain how they work, and turn technical ambiguity into
                stakeholder-ready next steps.
              </p>
            </motion.div>

            {/* Signal pills */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
              {compactSignals.map((pill, i) => (
                <motion.div
                  key={pill}
                  whileHover={
                    shouldReduce
                      ? {}
                      : {
                          y: -3,
                          boxShadow:
                            i % 2 === 0
                              ? '0 6px 20px rgba(196,151,74,0.12), 0 0 0 1px rgba(196,151,74,0.24)'
                              : '0 6px 20px rgba(74,159,174,0.12), 0 0 0 1px rgba(74,159,174,0.24)',
                        }
                  }
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 cursor-default"
                  style={{
                    background: 'rgba(10,32,48,0.62)',
                    border: '1px solid rgba(74,159,174,0.18)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
                  }}
                >
                  <motion.div
                    animate={
                      shouldReduce
                        ? {}
                        : i % 2 === 0
                        ? { rotate: [0, 10, 0] }
                        : { scale: [1, 1.08, 1] }
                    }
                    transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <StarMark
                      size="xs"
                      color={i % 2 === 0 ? '#C4974A' : '#4A9FAE'}
                      className="opacity-75"
                    />
                  </motion.div>
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                    style={{ color: '#9BC0CB' }}
                  >
                    {pill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex gap-3 flex-wrap">
              <HoverSparkle className="inline-flex">
                <StarburstButton href={`mailto:${siteConfig.email}`} variant="primary" size="md">
                  Get in touch
                </StarburstButton>
              </HoverSparkle>
              <HoverSparkle className="inline-flex">
                <StarburstButton href="/resume" variant="secondary" size="md">
                  View Résumé
                </StarburstButton>
              </HoverSparkle>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════
          PROOF STATS
      ══════════════════════════════════ */}
      <Section paddingY="sm">
        {/* Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { rotate: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
            </motion.div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Proof
            </span>
          </div>
        </motion.div>

        {/* Stats panel */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          whileHover={
            shouldReduce
              ? undefined
              : {
                  boxShadow:
                    '0 22px 58px rgba(0,0,0,0.18), 0 0 0 1px rgba(74,159,174,0.18)',
                }
          }
          transition={{ duration: 0.35, ease: EASING }}
          viewport={{ once: true }}
          className="relative rounded-[34px] overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.56) 100%)',
            border: '1px solid rgba(74,159,174,0.14)',
            boxShadow: '0 16px 44px rgba(0,0,0,0.14)',
          }}
        >
          {/* Animated top-edge shimmer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px z-10"
            animate={shouldReduce ? {} : { opacity: [0.30, 0.80, 0.30] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(15,122,122,0.55) 26%, rgba(196,151,74,0.48) 54%, rgba(15,122,122,0.55) 80%, transparent 100%)',
            }}
          />

          {!shouldReduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-8 top-7 z-10"
              animate={{ opacity: [0.12, 0.48, 0.12], rotate: [0, 16, 0], scale: [0.82, 1.1, 0.82] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              <StarMark size="xs" color="#C4974A" />
            </motion.div>
          )}

          {/* Periodic sweep beam across panel */}
          {!shouldReduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -skew-x-12 z-0"
              style={{
                width: '20%',
                left: '-25%',
                background:
                  'linear-gradient(90deg, transparent, rgba(74,159,174,0.05), transparent)',
              }}
              animate={{ x: ['0%', '650%'] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 10,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 relative z-10">
            {proofStats.map((item, i) => {
              const accentColor = i % 2 === 0 ? '#4A9FAE' : '#C4974A'
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={
                    shouldReduce
                      ? {}
                      : {
                          y: -4,
                          backgroundColor: `${accentColor}05`,
                          boxShadow: `inset 0 0 36px ${accentColor}0C`,
                        }
                  }
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative p-7 md:p-8 overflow-hidden"
                  style={{
                    borderRight:
                      i !== proofStats.length - 1 && i < 3
                        ? '1px solid rgba(74,159,174,0.10)'
                        : undefined,
                    borderBottom: i < 2 ? '1px solid rgba(74,159,174,0.10)' : undefined,
                  }}
                >
                  {/* Per-cell top shimmer */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accentColor}42, transparent)`,
                      opacity: 0.65,
                    }}
                  />

                  {/* Left accent bar on hover */}
                  <div
                    aria-hidden
                    className="absolute left-0 top-5 bottom-5 w-[2px] rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `linear-gradient(180deg, ${accentColor}, ${accentColor}28)` }}
                  />

                  {/* Hover light sweep */}
                  {!shouldReduce && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        width: '52%',
                        left: '-62%',
                        background: `linear-gradient(90deg, transparent, ${accentColor}0E, transparent)`,
                      }}
                      animate={{ x: ['0%', '420%'] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  {/* Label row */}
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      animate={
                        shouldReduce
                          ? {}
                          : { scale: [1, 1.14, 1], opacity: [0.55, 1, 0.55] }
                      }
                      transition={{
                        duration: 2.6 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.45,
                      }}
                    >
                      <StarMark size="xs" color={accentColor} className="opacity-70" />
                    </motion.div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: '#7FAFBB' }}
                    >
                      Proof {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Stat value */}
                  <div className="font-display text-[44px] leading-none text-text-base">
                    {item.value}
                  </div>

                  {/* Accent underline that grows on hover */}
                  <div
                    aria-hidden
                    className="mt-2 h-px transition-all duration-400 group-hover:w-12"
                    style={{
                      width: 28,
                      background: `linear-gradient(90deg, ${accentColor}60, transparent)`,
                    }}
                  />

                  <p
                    className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    {item.label}
                  </p>

                  <p
                    className="mt-5 max-w-[26ch] font-sans text-[14px] leading-6"
                    style={{ color: '#8FB2BE' }}
                  >
                    {item.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════
          WHY I FIT SE ROLES
      ══════════════════════════════════ */}
      <Section paddingY="sm">
        {/* Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
            </motion.div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Why I fit technical roles
            </span>
          </div>
        </motion.div>

        {/* Panel */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          whileHover={
            shouldReduce
              ? undefined
              : {
                  y: -3,
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.20), 0 0 0 1px rgba(74,159,174,0.18)',
                }
          }
          transition={{ duration: 0.35, ease: EASING }}
          viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden p-7 md:p-8 lg:p-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,33,50,0.72) 0%, rgba(8,27,42,0.60) 100%)',
            border: '1px solid rgba(74,159,174,0.14)',
            boxShadow: '0 18px 48px rgba(0,0,0,0.16)',
          }}
        >
          {/* Static top shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 5%, rgba(74,159,174,0.44) 28%, rgba(196,151,74,0.32) 56%, rgba(74,159,174,0.44) 80%, transparent 95%)',
            }}
          />

          {/* Animated radial glows (existing) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            animate={shouldReduce ? {} : { opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(circle at 18% 24%, rgba(74,159,174,0.12) 0%, transparent 26%), radial-gradient(circle at 82% 18%, rgba(196,151,74,0.08) 0%, transparent 22%), radial-gradient(circle at 60% 72%, rgba(126,231,242,0.08) 0%, transparent 20%)',
            }}
          />

          {/* Floating constellation stars inside panel */}
          {!shouldReduce && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-10 top-8"
                animate={{ opacity: [0.06, 0.32, 0.06], scale: [0.72, 1.08, 0.72] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="xs" color="#4A9FAE" />
              </motion.div>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-5 bottom-10"
                animate={{ opacity: [0.05, 0.26, 0.05], scale: [0.8, 1.06, 0.8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              >
                <StarMark size="xs" color="#C4974A" />
              </motion.div>
            </>
          )}

          <div className="grid xl:grid-cols-[0.86fr_1.14fr] gap-8 lg:gap-10 relative z-10">
            {/* Left: heading block */}
            <motion.div variants={fadeUp} className="xl:pr-6">
              <div className="flex items-center gap-2 mb-4">
                <StarMark size="xs" color="#C4974A" className="opacity-80" />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Recruiter signal
                </span>
              </div>

              <h2 className="font-display text-[44px] md:text-[56px] leading-[0.95] text-text-base text-balance">
                How I create <br />
                usable value
              </h2>

              <p
                className="mt-6 max-w-[30ch] font-sans text-[16px] leading-8"
                style={{ color: '#A8C5D1' }}
              >
                I&apos;m useful when a team needs the technical answer, the user workflow, and
                the next step in the same conversation.
              </p>
            </motion.div>

            {/* Right: strength cards */}
            <motion.div
              variants={staggerContainer(0.10)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-4"
            >
              {strengths.map((card, i) => {
                const accentColor = i % 2 === 0 ? '#4A9FAE' : '#C4974A'
                return (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    whileHover={
                      shouldReduce
                        ? {}
                        : {
                            y: -6,
                            scale: 1.012,
                            boxShadow: `0 18px 44px rgba(0,0,0,0.26), 0 0 0 1px ${accentColor}30, 0 0 30px ${accentColor}0D`,
                          }
                    }
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-[28px] p-6 overflow-hidden"
                    style={{
                      background: 'rgba(8, 27, 42, 0.34)',
                      border: '1px solid rgba(74,159,174,0.12)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                    }}
                  >
                    {/* Top shimmer */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-3 top-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}46, transparent)`,
                        opacity: 0.7,
                      }}
                    />

                    {/* Hover light sweep */}
                    {!shouldReduce && (
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          width: '55%',
                          left: '-65%',
                          background: `linear-gradient(90deg, transparent, ${accentColor}0E, transparent)`,
                        }}
                        animate={{ x: ['0%', '400%'] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Card header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono text-[12px] uppercase tracking-[0.16em] transition-opacity duration-300 group-hover:opacity-100"
                        style={{ color: accentColor, opacity: 0.55 }}
                      >
                        {card.number}
                      </span>
                      <motion.div
                        animate={
                          shouldReduce
                            ? {}
                            : {
                                opacity: [0.58, 1, 0.58],
                                rotate: i % 2 === 0 ? [0, 8, 0] : [0, -8, 0],
                              }
                        }
                        transition={{
                          duration: 3.0 + i * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                      >
                        <StarMark size="xs" color={accentColor} className="opacity-70" />
                      </motion.div>
                    </div>

                    <h3 className="font-sans text-[22px] leading-[1.18] font-semibold text-text-base text-balance">
                      {card.title}
                    </h3>

                    <p
                      className="mt-4 font-sans text-[15px] leading-7"
                      style={{ color: '#8FB2BE' }}
                    >
                      {card.body}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════
          DECISIVE CLOSE
      ══════════════════════════════════ */}
      <Section paddingY="sm">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileHover={
            shouldReduce
              ? {}
              : {
                  y: -4,
                  boxShadow:
                    '0 20px 52px rgba(0,0,0,0.22), 0 0 0 1px rgba(196,151,74,0.28), 0 0 34px rgba(74,159,174,0.08)',
                }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-[34px] p-7 md:p-9"
          style={{
            background:
              'linear-gradient(135deg, rgba(15,42,61,0.66) 0%, rgba(8,27,42,0.72) 100%)',
            border: '1px solid rgba(74,159,174,0.16)',
            boxShadow: '0 18px 46px rgba(0,0,0,0.16)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 5%, rgba(196,151,74,0.50) 34%, rgba(126,231,242,0.46) 58%, rgba(74,159,174,0.36) 78%, transparent 95%)',
            }}
          />

          {!shouldReduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-7 top-7"
              animate={{ opacity: [0.08, 0.44, 0.08], scale: [0.78, 1.08, 0.78] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <StarMark size="xs" color="#C4974A" />
            </motion.div>
          )}

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <div className="mb-4 flex items-center gap-2">
                <StarMark size="xs" color="#C4974A" className="opacity-80" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Next step
                </span>
              </div>
              <h2 className="font-display text-[34px] leading-[1.05] text-text-base md:text-[46px]">
                Need someone who can explain the system and clarify the value?
              </h2>
              <p className="mt-4 font-sans text-[15.5px] leading-7" style={{ color: '#A8C5D1' }}>
                I&apos;m looking for early-career roles where technical translation, workflow clarity,
                and AI-enabled systems matter.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <HoverSparkle className="inline-flex">
                <StarburstButton href={`mailto:${siteConfig.email}`} variant="primary" size="md">
                  Get in touch
                </StarburstButton>
              </HoverSparkle>
              <HoverSparkle className="inline-flex">
                <StarburstButton href="/resume" variant="secondary" size="md">
                  View Résumé
                </StarburstButton>
              </HoverSparkle>
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  )
}

