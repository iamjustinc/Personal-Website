'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { StarField } from '@/components/ui/StarField'
import { fadeUp, fadeIn, staggerContainer, useMotionSafe } from '@/lib/motion'

const snapshotCards = [
  {
    title: 'Target roles',
    content: 'Solutions Engineering · Technical Product · Product Operations · AI/Data Workflows',
  },
  {
    title: 'Technical stack',
    content: 'Python · SQL · TypeScript · React · Next.js · OpenAI APIs · Tableau',
  },
  {
    title: 'Core strengths',
    content: 'Technical demos · workflow mapping · stakeholder communication · dashboards',
  },
  {
    title: 'Proof',
    content: '30K+ records processed · 70% faster analysis · 63% higher study completion · 3 live AI products',
  },
]

export function RecruiterSnapshotSection() {
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)
  const inn = useMotionSafe(fadeIn)

  return (
    <Section id="snapshot" paddingY="sm" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[4%] top-[8%] h-48 w-48 rounded-full blur-3xl"
          style={{ background: 'rgba(15,122,122,0.08)' }}
        />
        <div
          className="absolute right-[6%] bottom-[10%] h-56 w-56 rounded-full blur-3xl"
          style={{ background: 'rgba(196,151,74,0.05)' }}
        />
        <StarField
          className="opacity-72"
          stars={[
            { x: '4%', y: '18%', size: 1.2, color: '#7EE7F2', opacity: 0.28, halo: 1.2 },
            { x: '16%', y: '82%', size: 1.0, color: '#F4D58D', opacity: 0.24, halo: 1.0 },
            { x: '48%', y: '10%', size: 1.0, color: '#E6EEF2', opacity: 0.22, halo: 1.0 },
            { x: '72%', y: '76%', size: 1.1, color: '#7EE7F2', opacity: 0.26, halo: 1.1 },
            { x: '94%', y: '26%', size: 1.3, color: '#C4974A', opacity: 0.28, halo: 1.2, twinkle: true, delay: 1.2, duration: 5.8 },
          ]}
        />
      </div>

      <motion.div
        variants={inn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mb-10 flex flex-col items-center text-center"
      >
        <h2 className="font-display text-h1 leading-tight text-text-base">
          Recruiter snapshot
        </h2>
        <p
          className="mt-4 max-w-[560px] font-sans text-[15px] leading-relaxed"
          style={{ color: '#A8C5D1' }}
        >
          Fast signals for HR, hiring managers, and technical reviewers.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {snapshotCards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={up}
            className="group relative overflow-hidden rounded-[24px] p-5"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,33,50,0.68) 0%, rgba(8,27,42,0.52) 100%)',
              border: '1px solid rgba(74,159,174,0.16)',
              boxShadow: '0 18px 46px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px opacity-70"
              style={{
                background:
                  index % 2 === 0
                    ? 'linear-gradient(90deg, transparent, rgba(74,159,174,0.52), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(196,151,74,0.48), transparent)',
              }}
            />

            <div className="mb-3 flex items-center gap-2">
              <StarMark
                size="xs"
                color={index % 2 === 0 ? '#4A9FAE' : '#C4974A'}
                className="opacity-75"
              />
              <p
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: '#7FAFBB' }}
              >
                {card.title}
              </p>
            </div>

            <p
              className="font-sans text-[14px] leading-6"
              style={{ color: '#D8E8EE' }}
            >
              {card.content}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
