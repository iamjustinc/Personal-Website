'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { EmailCopy } from '@/components/ui/EmailCopy'
import { staggerContainer, fadeUp, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

export function ContactSection() {
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up      = useMotionSafe(fadeUp)

  return (
    <Section
      id="contact"
      style={{ borderTop: '1px solid rgba(15,122,122,0.10)' } as React.CSSProperties}
    >
      <div className="max-w-[640px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="flex flex-col"
        >
          {/* Label */}
          <motion.div variants={up}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5"
              style={{
                background: 'rgba(15,122,122,0.08)',
                border: '1px solid rgba(15,122,122,0.22)',
              }}
            >
              <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                Contact
              </span>
            </div>
            <h2 className="font-display text-h1 text-text-base">
              Let&apos;s talk.
            </h2>
          </motion.div>

          <motion.p
            variants={up}
            className="font-sans text-base mt-4 leading-relaxed"
            style={{ color: '#A8C5D1' }}
          >
            {siteConfig.currentlyOpen}
          </motion.p>

          {/* Email */}
          <motion.div variants={up} className="mt-8">
            <EmailCopy email={siteConfig.email} />
          </motion.div>

          {/* Social links */}
          <motion.div variants={up} className="flex gap-5 items-center mt-6">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm transition-colors duration-200 hover:text-text-base group"
              style={{ color: '#A8C5D1' }}
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm transition-colors duration-200 hover:text-text-base group"
              style={{ color: '#A8C5D1' }}
            >
              <Github size={18} />
              <span>GitHub</span>
              <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={up}
            className="mt-16 pt-6 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
          >
            <p className="font-sans text-xs" style={{ color: 'rgba(168,197,209,0.45)' }}>
              © {new Date().getFullYear()} {siteConfig.copyrightName}
            </p>
            <div className="flex items-center gap-1.5">
              <StarMark size="xs" color="#C4974A" className="opacity-30" />
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(168,197,209,0.30)' }}>
                SE · PM
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
