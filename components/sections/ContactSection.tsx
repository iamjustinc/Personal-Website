'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EmailCopy } from '@/components/ui/EmailCopy'
import { staggerContainer, fadeUp, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'

export function ContactSection() {
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up      = useMotionSafe(fadeUp)

  return (
    <Section id="contact" className="border-t border-border">
      {/* Constrain to 600px — contact should feel calm and focused */}
      <div className="max-w-[600px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="flex flex-col"
        >
          {/* Heading */}
          <motion.div variants={up}>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display text-h1 text-text-base mt-2">
              Let&apos;s talk.
            </h2>
          </motion.div>

          {/* Availability line */}
          <motion.p variants={up} className="font-sans text-base text-text-muted mt-4">
            {siteConfig.currentlyOpen}
          </motion.p>

          {/* Email with copy */}
          <motion.div variants={up} className="mt-8">
            <EmailCopy email={siteConfig.email} />
          </motion.div>

          {/* Social links */}
          <motion.div variants={up} className="flex gap-6 items-center mt-6">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-text-base transition-colors duration-200"
            >
              <Linkedin size={20} />
              <span className="font-sans text-sm">LinkedIn</span>
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-text-base transition-colors duration-200"
            >
              <Github size={20} />
              <span className="font-sans text-sm">GitHub</span>
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div variants={up} className="mt-16 pt-6 border-t border-border">
            <p className="font-sans text-xs text-text-muted">
              © {new Date().getFullYear()} {siteConfig.copyrightName}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
