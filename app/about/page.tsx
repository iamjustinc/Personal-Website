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

const proofStats = [
  {
    value: '30K+',
    label: 'records analyzed',
    body: 'health AI workflows translated into stakeholder-facing systems',
  },
  {
    value: '70%',
    label: 'analysis time reduced',
    body: 'pipeline work simplified into clearer decisions and faster execution',
  },
  {
    value: '63%',
    label: 'completion lift',
    body: 'workflow redesign improved follow-through across 100+ sessions',
  },
  {
    value: 'Live',
    label: 'technical demos delivered',
    body: 'AI products translated into walkthroughs non-technical users can follow',
  },
]

const strengths = [
  {
    number: '01',
    title: 'Tailored technical demos',
    body: 'I connect product capability to the workflow a customer or stakeholder actually cares about.',
  },
  {
    number: '02',
    title: 'Discovery-first thinking',
    body: 'I look for friction, decision points, and adoption blockers before jumping into the solution.',
  },
  {
    number: '03',
    title: 'Stakeholder-ready communication',
    body: 'I explain systems, tradeoffs, and outputs clearly across technical and non-technical audiences.',
  },
  {
    number: '04',
    title: 'Complexity translated into value',
    body: 'I turn AI, data, and system behavior into business outcomes people can understand and act on.',
  },
]

const compactSignals = [
  'Technical demos',
  'Workflow discovery',
  'AI + data systems',
  'Stakeholder communication',
  'Business value',
]

const whatIBring = [
  'Built predictive systems across 30K+ records and turned outputs into dashboards and stakeholder-facing workflows.',
  'Reduced manual analysis time by 70% through end-to-end Python and R pipeline development.',
  'Improved completion rates by 63% by redesigning workflow and scheduling systems across 100+ sessions.',
  'Delivered technical demos and explanations for clinicians, research teams, and non-technical audiences.',
]

const currentFocus = [
  'Targeting early-career Solutions Engineering roles in AI, workflow, platform, and customer-facing product environments.',
  'Best fit where I can combine technical depth, demos, communication, and problem solving.',
]

export default function AboutPage() {
  const firstName = siteConfig.name.split(' ')[0]
  const lastName = siteConfig.name.split(' ').slice(1).join(' ')
  const shouldReduce = useReducedMotion()

  return (
    <main className="pt-16 min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-[-6%] right-[-10%] pointer-events-none"
        style={{ opacity: 0.045 }}
      >
        <WatermarkStar size={620} opacity={1} direction={1} color="#4A9FAE" />
      </div>

      <div
        aria-hidden
        className="absolute left-[-10%] top-[14%] h-[560px] w-[560px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,159,174,0.12) 0%, rgba(74,159,174,0.05) 42%, transparent 74%)',
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

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-18 items-center">
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
                className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(74,159,174,0.16) 0%, rgba(74,159,174,0.05) 54%, transparent 76%)',
                }}
                animate={shouldReduce ? {} : { scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                aria-hidden
                className="absolute -left-10 top-8"
                animate={shouldReduce ? {} : { y: [0, -8, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarMark size="sm" color="#C4974A" className="opacity-85" />
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute -right-5 bottom-12"
                animate={shouldReduce ? {} : { scale: [1, 1.16, 1], opacity: [0.5, 1, 0.5] }}
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
            className="max-w-[760px]"
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
                className="mt-6 font-sans text-[17px] leading-8 max-w-[56ch]"
                style={{ color: '#A8C5D1' }}
              >
                I build and explain technical systems in ways people can understand and act on.
                My work is strongest where technical depth, workflow clarity, and stakeholder value need to come together fast.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
              {compactSignals.map((pill, i) => (
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
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Proof
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[34px] overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.56) 100%)',
            border: '1px solid rgba(74,159,174,0.14)',
            boxShadow: '0 16px 44px rgba(0,0,0,0.14)',
          }}
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={shouldReduce ? {} : { y: -3 }}
                className="relative p-7 md:p-8"
                style={{
                  borderRight:
                    i !== proofStats.length - 1 && i < 3 ? '1px solid rgba(74,159,174,0.10)' : undefined,
                  borderBottom:
                    i < 2 ? '1px solid rgba(74,159,174,0.10)' : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <StarMark size="xs" color={i % 2 === 0 ? '#4A9FAE' : '#C4974A'} className="opacity-70" />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#7FAFBB' }}
                  >
                    Proof {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="font-display text-[44px] leading-none text-text-base">
                  {item.value}
                </div>

                <p
                  className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: '#4A9FAE' }}
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
            ))}
          </div>
        </motion.div>
      </Section>

      <Section paddingY="sm">
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
            <StarMark size="xs" color="#C4974A" className="opacity-80" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
              Why I fit SE roles
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden p-7 md:p-8 lg:p-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,33,50,0.72) 0%, rgba(8,27,42,0.60) 100%)',
            border: '1px solid rgba(74,159,174,0.14)',
            boxShadow: '0 18px 48px rgba(0,0,0,0.16)',
          }}
        >
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

          <div className="grid xl:grid-cols-[0.86fr_1.14fr] gap-8 lg:gap-10 relative">
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
                Why recruiters <br />
                remember me
              </h2>

              <p
                className="mt-6 max-w-[30ch] font-sans text-[16px] leading-8"
                style={{ color: '#A8C5D1' }}
              >
                I sit at the intersection of demo craft, technical fluency, and business translation.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-4"
            >
              {strengths.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={shouldReduce ? {} : { y: -5, scale: 1.01 }}
                  className="rounded-[28px] p-6"
                  style={{
                    background: 'rgba(8, 27, 42, 0.34)',
                    border: '1px solid rgba(74,159,174,0.12)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[12px] uppercase tracking-[0.16em]"
                      style={{ color: '#7FAFBB' }}
                    >
                      {card.number}
                    </span>
                    <StarMark
                      size="xs"
                      color={i % 2 === 0 ? '#4A9FAE' : '#C4974A'}
                      className="opacity-70"
                    />
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
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Section>

      <Section paddingY="sm">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start"
        >
          <motion.div
            variants={fadeUp}
            whileHover={shouldReduce ? {} : { y: -4 }}
            className="rounded-[32px] p-7 md:p-8"
            style={{
              background: 'rgba(15,42,61,0.50)',
              border: '1px solid rgba(196,151,74,0.18)',
              boxShadow: '0 0 32px rgba(196,151,74,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: '#7FAFBB' }}
              >
                What I bring
              </span>
            </div>

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
              <div className="flex items-center gap-2 mb-4">
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