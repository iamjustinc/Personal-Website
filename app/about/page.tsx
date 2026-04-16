'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarburstButton } from '@/components/ui/StarburstButton'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { siteConfig } from '@/data/site'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'
import { HeroVisual } from '@/components/hero/HeroVisual'

const signalPills = [
  'AI workflows',
  'Technical demos',
  'Dashboard design',
  'Stakeholder communication',
  'Full-stack prototyping',
  'Product judgment',
]

const valueCards = [
  {
    eyebrow: 'What I do best',
    title: 'I turn technical complexity into clear decisions, usable workflows, and convincing demos.',
    body:
      'My strongest work lives at the intersection of systems thinking, communication, and product execution — where architecture needs to become something a user, stakeholder, or customer can actually understand and act on.',
  },
  {
    eyebrow: 'Why SE + PM',
    title: 'I’m strongest in roles where technical credibility and user judgment both matter.',
    body:
      'I like understanding how a system works, where it breaks, what matters most to the user, and how to shape the clearest solution around that. That is why Solutions Engineering and technical Product roles both make sense for me.',
  },
  {
    eyebrow: 'What I optimize for',
    title: 'I care less about shipping features in isolation and more about making products easier to trust, adopt, and use.',
    body:
      'That means better workflow design, better communication, and better product decisions — not just building something functional, but building something people can quickly understand and believe in.',
  },
]

const proofStats = [
  {
    value: '30K+',
    label: 'records analyzed in health AI systems',
  },
  {
    value: '70%',
    label: 'manual analysis time reduced in pipeline work',
  },
  {
    value: '63%',
    label: 'completion lift from workflow redesign',
  },
  {
    value: '3',
    label: 'AI product demos built for real user workflows',
  },
]

const capabilityCards = [
  {
    title: 'Solutions Engineering',
    body:
      'Explaining product capability through tailored demos, structured workflows, and clear technical storytelling that connects system depth to customer value.',
  },
  {
    title: 'Product Thinking',
    body:
      'Breaking messy problems into leverage points, then shaping the simplest solution that improves the user experience and the business outcome.',
  },
  {
    title: 'AI Systems + Workflow Design',
    body:
      'Designing systems where models, structured outputs, interface logic, and human judgment work together instead of fighting each other.',
  },
  {
    title: 'Technical Communication',
    body:
      'Making architecture, tradeoffs, and system behavior legible to non-technical stakeholders without flattening the complexity that matters.',
  },
]

const quickProof = [
  'Built predictive systems and dashboards for stakeholder decision-making in health AI environments.',
  'Designed workflow tools and data systems that improved reliability, planning, and operational efficiency.',
  'Built and demoed AI products across inbox triage, career intelligence, and personalized news workflows.',
  'Comfortable working across Python, SQL, TypeScript, Next.js, APIs, and user-facing system design.',
]

const currentFocus = [
  'Open to early-career Solutions Engineering and technical Product roles.',
  'Especially interested in AI, workflow, platform, and customer-facing product environments.',
  'Best fit where I can combine technical depth, communication, and product execution.',
]

export default function AboutPage() {
  const firstName = siteConfig.name.split(' ')[0]
  const lastName = siteConfig.name.split(' ').slice(1).join(' ')

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

        <div className="grid lg:grid-cols-[0.96fr_1.04fr] gap-12 lg:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="scale-[0.84] sm:scale-[0.92] lg:scale-100 origin-center">
              <HeroVisual />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-[720px]"
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
                  Solutions Engineering + Product
                </span>
              </div>

              <h1 className="font-display text-hero text-text-base leading-none text-balance">
                {firstName}{' '}
                <span style={{ color: '#4A9FAE' }}>{lastName}</span>
              </h1>

              <p
                className="mt-6 font-sans text-[17px] leading-8 max-w-[60ch]"
                style={{ color: '#A8C5D1' }}
              >
                I’m strongest where technical depth, user clarity, and business context meet.
                I like taking systems that feel messy or abstract and turning them into workflows,
                demos, and product experiences that people can understand, trust, and act on.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
              {signalPills.map((pill) => (
                <div
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
                  style={{
                    background: 'rgba(10,32,48,0.62)',
                    border: '1px solid rgba(74,159,174,0.18)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
                  }}
                >
                  <StarMark size="xs" color="#C4974A" className="opacity-70" />
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                    style={{ color: '#9BC0CB' }}
                  >
                    {pill}
                  </span>
                </div>
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
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {valueCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
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
              Capabilities
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {capabilityCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-[26px] p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,33,50,0.62) 0%, rgba(8,27,42,0.50) 100%)',
                border: '1px solid rgba(74,159,174,0.13)',
                minHeight: 220,
              }}
            >
              <div className="flex items-center gap-2">
                <StarMark size="xs" color="#4A9FAE" className="opacity-65" />
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: '#7FAFBB' }}
                >
                  Capability
                </span>
              </div>

              <h3 className="mt-4 font-sans text-[22px] leading-[1.15] font-semibold text-text-base text-balance">
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
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-[30px] p-7"
            style={{
              background: 'rgba(15,42,61,0.50)',
              border: '1px solid rgba(196,151,74,0.20)',
              boxShadow: '0 0 32px rgba(196,151,74,0.06)',
            }}
          >
            <div className="space-y-4">
              {quickProof.map((item) => (
                <div key={item} className="flex items-start gap-3">
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
                </div>
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
                      className="font-sans text-[15px] leading-6"
                      style={{ color: '#A8C5D1' }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  )
}