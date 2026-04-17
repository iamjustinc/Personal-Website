'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'
import { HeroVisual } from '@/components/hero/HeroVisual'

const quickSignals = [
  'Technical demos',
  'Workflow design',
  'AI + data systems',
  'Stakeholder communication',
  'Business value',
]

const keyStrengths = [
  {
    title: 'Technical demonstration',
    body: 'I build demos that make system value clear, not just feature output. The goal is to make technical depth feel easy to follow and easy to trust.',
  },
  {
    title: 'Solution discovery',
    body: 'I like starting with the workflow: what is blocked, what matters most, and what the user or buyer needs to understand before they move forward.',
  },
  {
    title: 'AI + workflow systems',
    body: 'I have hands-on experience with AI-powered workflows, structured outputs, dashboards, and full-stack prototypes that support real decisions.',
  },
  {
    title: 'Stakeholder communication',
    body: 'I am comfortable translating technical analysis, architecture, and tradeoffs for non-technical audiences without losing the important nuance.',
  },
]

const proofStats = [
  { value: '30K+', label: 'records analyzed across health AI systems' },
  { value: '70%', label: 'manual analysis time reduced' },
  { value: '63%', label: 'completion lift from workflow redesign' },
  { value: '200+', label: 'fMRI sessions supported through scalable pipelines' },
]

const recruiterCards = [
  {
    eyebrow: 'What I do best',
    title: 'I turn technical systems into clear demos, usable workflows, and decisions people can act on.',
    body: 'My strongest work sits between system depth and user clarity. I like shaping complexity into something a stakeholder, teammate, or customer can quickly understand.',
  },
  {
    eyebrow: 'Why solutions engineering',
    title: 'I am strongest in roles where technical credibility and communication both matter.',
    body: 'I enjoy understanding how a system works, what is blocking the workflow, and how to explain the right solution clearly. That makes Solutions Engineering the strongest first-role fit for me.',
  },
  {
    eyebrow: 'What I optimize for',
    title: 'I focus on making products easier to understand, trust, and adopt.',
    body: 'That usually means stronger workflow design, clearer technical storytelling, and better stakeholder alignment around what matters most.',
  },
]

const whatIBring = [
  'Led predictive systems work across 30K+ records and turned model outputs into dashboards and stakeholder-facing workflows.',
  'Reduced manual analysis time by 70% through end-to-end Python and R pipeline development.',
  'Improved completion rates by 63% by redesigning workflow and scheduling systems across 100+ sessions.',
  'Delivered technical demos and stakeholder-facing explanations for clinicians, research teams, and non-technical audiences.',
]

const currentFocus = [
  'Targeting early-career Solutions Engineering roles in AI, workflow, platform, and customer-facing product environments.',
  'Best fit where I can combine technical depth, demos, communication, and problem solving.',
  'Strong product judgment is still part of my profile, but Solutions Engineering is the clearest first-role positioning for my experience.',
]

export default function AboutPage() {
  const firstName = siteConfig.name.split(' ')[0]
  const lastName = siteConfig.name.split(' ').slice(1).join(' ')
  const shouldReduce = useReducedMotion()

  return (
    <main className="pt-16 min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-[-4%] right-[-10%] pointer-events-none"
        style={{ opacity: 0.045 }}
      >
        <WatermarkStar size={560} opacity={1} direction={1} color="#4A9FAE" />
      </div>

      <div
        aria-hidden
        className="absolute left-[-12%] top-[18%] h-[520px] w-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.12) 0%, rgba(74,159,174,0.04) 42%, transparent 72%)',
        }}
      />

      <Section paddingY="lg">
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
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-muted">
              About
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <motion.div
                aria-hidden
                className="absolute -inset-8 rounded-full blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(74,159,174,0.14) 0%, rgba(74,159,174,0.04) 55%, transparent 72%)',
                }}
                animate={shouldReduce ? {} : { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                aria-hidden
                className="absolute -left-10 top-8"
                animate={shouldReduce ? {} : { y: [0, -8, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="sm" color="#C4974A" className="opacity-85" />
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute -right-6 bottom-10"
                animate={shouldReduce ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="xs" color="#7EE7F2" className="opacity-85" />
              </motion.div>

              <div className="scale-[0.84] sm:scale-[0.92] lg:scale-100 origin-center">
                <HeroVisual />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-[740px]"
          >
            <motion.div variants={fadeUp}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-5"
                style={{
                  background: 'rgba(15,122,122,0.08)',
                  border: '1px solid rgba(15,122,122,0.22)',
                }}
              >
                <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: '#4A9FAE' }}
                >
                  Early-career solutions engineering
                </span>
              </div>

              <h1 className="font-display text-hero text-text-base leading-none text-balance">
                {firstName} <span style={{ color: '#4A9FAE' }}>{lastName}</span>
              </h1>

              <p
                className="mt-6 font-sans text-[17px] leading-8 max-w-[58ch]"
                style={{ color: '#A8C5D1' }}
              >
                I build and explain technical systems in ways people can understand and act on.
                My background spans AI workflows, dashboards, data systems, and full-stack demos,
                with the same goal each time: make complexity clearer, more usable, and more valuable.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
              {quickSignals.map((pill, i) => (
                <motion.div
                  key={pill}
                  whileHover={shouldReduce ? {} : { y: -2 }}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
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
                    <StarMark size="xs" color={i % 2 === 0 ? '#C4974A' : '#4A9FAE'} className="opacity-75" />
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

      <Section paddingY="sm">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {proofStats.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={shouldReduce ? {} : { y: -4, scale: 1.01 }}
              className="rounded-[24px] p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,33,50,0.62) 0%, rgba(8,27,42,0.50) 100%)',
                border: '1px solid rgba(74,159,174,0.13)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Proof
                </span>
              </div>

              <div className="font-display text-[42px] leading-none text-text-base">
                {item.value}
              </div>

              <p
                className="mt-3 font-sans text-[14px] leading-6"
                style={{ color: '#8FB2BE' }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section paddingY="sm">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Key strengths
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {keyStrengths.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={shouldReduce ? {} : { y: -5 }}
              className="rounded-[28px] p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.56) 100%)',
                border: '1px solid rgba(74,159,174,0.14)',
                boxShadow:
                  '0 10px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.025)',
                minHeight: 250,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={
                    shouldReduce
                      ? {}
                      : i % 2 === 0
                        ? { rotate: [0, 8, 0] }
                        : { scale: [1, 1.08, 1] }
                  }
                  transition={{ duration: 3.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <StarMark size="xs" color={i % 2 === 0 ? '#4A9FAE' : '#C4974A'} className="opacity-75" />
                </motion.div>

                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Strength
                </span>
              </div>

              <h2 className="font-sans text-[24px] leading-[1.1] font-semibold text-text-base text-balance">
                {card.title}
              </h2>

              <p
                className="mt-4 font-sans text-[15px] leading-7"
                style={{ color: '#8FB2BE' }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section paddingY="sm">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {recruiterCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="rounded-[28px] p-7"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.56) 100%)',
                border: '1px solid rgba(74,159,174,0.14)',
                boxShadow:
                  '0 10px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.025)',
              }}
            >
              <div className="flex items-center gap-2">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  {card.eyebrow}
                </span>
              </div>

              <h2 className="mt-4 font-display text-[30px] md:text-[34px] leading-[1.06] text-text-base text-balance">
                {card.title}
              </h2>

              <p
                className="mt-4 font-sans text-[15.5px] leading-7"
                style={{ color: '#8FB2BE' }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section paddingY="sm">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(15,122,122,0.08)',
              border: '1px solid rgba(15,122,122,0.22)',
            }}
          >
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              What I bring
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1.08fr_0.92fr] gap-6 items-start"
        >
          <motion.div
            variants={fadeUp}
            whileHover={shouldReduce ? {} : { y: -4 }}
            className="rounded-[30px] p-7"
            style={{
              background: 'rgba(15,42,61,0.50)',
              border: '1px solid rgba(196,151,74,0.20)',
              boxShadow: '0 0 32px rgba(196,151,74,0.06)',
            }}
          >
            <div className="space-y-4">
              {whatIBring.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <StarMark
                    size="xs"
                    color="#C4974A"
                    className="opacity-70 mt-[6px] shrink-0"
                  />
                  <p
                    className="font-sans text-[15.5px] leading-7"
                    style={{ color: '#A8C5D1' }}
                  >
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <div
              className="rounded-[28px] p-6"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Current focus
                </span>
              </div>

              <div className="space-y-3">
                {currentFocus.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <StarMark
                      size="xs"
                      color="#C4974A"
                      className="opacity-55 mt-[5px] shrink-0"
                    />
                    <p
                      className="font-sans text-[15px] leading-7"
                      style={{ color: '#A8C5D1' }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="rounded-[28px] p-6"
              style={{
                background: 'rgba(15,42,61,0.50)',
                border: '1px solid rgba(15,122,122,0.14)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Connect
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 group transition-colors"
                  style={{ color: '#A8C5D1' }}
                >
                  <StarMark
                    size="xs"
                    color="#0F7A7A"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                    {siteConfig.email}
                  </span>
                </a>

                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-colors"
                  style={{ color: '#A8C5D1' }}
                >
                  <StarMark
                    size="xs"
                    color="#0F7A7A"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                    LinkedIn
                  </span>
                </a>

                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-colors"
                  style={{ color: '#A8C5D1' }}
                >
                  <StarMark
                    size="xs"
                    color="#0F7A7A"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-sans text-sm group-hover:text-text-base transition-colors">
                    GitHub
                  </span>
                </a>
              </div>

              <div className="flex gap-3 flex-wrap pt-6">
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
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  )
}