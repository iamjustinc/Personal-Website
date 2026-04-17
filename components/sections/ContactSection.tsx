'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { StarMark } from '@/components/ui/StarMark'
import { HoverSparkle } from '@/components/ui/HoverSparkle'
import { staggerContainer, fadeUp, useMotionSafe } from '@/lib/motion'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

type ContactSectionProps = {
  mode?: 'section' | 'page'
}

function CopyEmailButton({
  email,
  large = false,
}: {
  email: string
  large?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'group inline-flex w-full items-center justify-between gap-4 rounded-[18px] border px-4 py-3 text-left transition-all duration-200',
        large ? 'max-w-[560px]' : 'max-w-[480px]',
      )}
      style={{
        background: 'rgba(10,24,44,0.52)',
        borderColor: 'rgba(15,122,122,0.18)',
        boxShadow:
          '0 10px 36px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.02) inset',
      }}
      aria-label={`Copy ${email}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            background: 'rgba(15,122,122,0.12)',
            border: '1px solid rgba(15,122,122,0.18)',
          }}
        >
          <Mail size={18} color="#A8C5D1" />
        </div>

        <div className="min-w-0">
          <p
            className={cn(
              'font-sans font-medium text-text-base truncate',
              large ? 'text-[18px] md:text-[19px]' : 'text-[15px]',
            )}
          >
            {email}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            Click to copy
          </p>
        </div>
      </div>

      <div
        className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5"
        style={{
          background: 'rgba(15,122,122,0.08)',
          border: '1px solid rgba(15,122,122,0.16)',
        }}
      >
        {copied ? <Check size={14} color="#4A9FAE" /> : <Copy size={14} color="#A8C5D1" />}
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
          {copied ? 'Copied' : 'Copy'}
        </span>
      </div>
    </motion.button>
  )
}

function CompactLink({
  href,
  icon: Icon,
  label,
  download,
}: {
  href: string
  icon: LucideIcon
  label: string
  download?: string
}) {
  return (
    <a
      href={href}
      download={download}
      target={!download && href.startsWith('http') ? '_blank' : undefined}
      rel={!download && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-text-base"
      style={{ color: '#A8C5D1' }}
    >
      <Icon size={16} />
      <span>{label}</span>
      <ArrowUpRight
        size={12}
        className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0"
      />
    </a>
  )
}

function ActionCard({
  href,
  icon: Icon,
  title,
  body,
  download,
}: {
  href: string
  icon: LucideIcon
  title: string
  body: string
  download?: string
}) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto')

  return (
    <HoverSparkle className="block">
      <motion.a
        href={href}
        download={download}
        target={!download && isExternal && !href.startsWith('mailto') ? '_blank' : undefined}
        rel={!download && isExternal && !href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group block rounded-[22px] border p-5 transition-all duration-200"
        style={{
          background: 'rgba(10,24,44,0.48)',
          borderColor: 'rgba(15,122,122,0.18)',
          boxShadow:
            '0 16px 42px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.02) inset',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: 'rgba(15,122,122,0.12)',
                border: '1px solid rgba(15,122,122,0.18)',
              }}
            >
              <Icon size={18} color="#A8C5D1" />
            </div>

            <div>
              <p className="font-sans text-[17px] font-medium text-text-base">{title}</p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: '#8DAFC0' }}>
                {body}
              </p>
            </div>
          </div>

          <ArrowUpRight
            size={16}
            className="mt-1 shrink-0 opacity-45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            color="#A8C5D1"
          />
        </div>
      </motion.a>
    </HoverSparkle>
  )
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{
        background: 'rgba(15,122,122,0.08)',
        border: '1px solid rgba(15,122,122,0.16)',
      }}
    >
      <StarMark size="xs" color="#4A9FAE" className="opacity-70" />
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
        {children}
      </span>
    </div>
  )
}

function SectionFooter({ showThanks = true }: { showThanks?: boolean }) {
  return (
    <div
      className="mt-16 flex items-center justify-between border-t pt-6"
      style={{ borderColor: 'rgba(15,122,122,0.10)' }}
    >
      <div>
        <p className="font-sans text-xs" style={{ color: 'rgba(168,197,209,0.45)' }}>
          © {new Date().getFullYear()} {siteConfig.copyrightName}
        </p>
        {showThanks && (
          <p className="mt-2 text-sm" style={{ color: 'rgba(168,197,209,0.50)' }}>
            Thanks for stopping by! This was built with a lot care :D
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <StarMark size="xs" color="#C4974A" className="opacity-30" />
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: 'rgba(168,197,209,0.30)' }}
        >
          SE · PM
        </span>
      </div>
    </div>
  )
}

function ContactPageLayout() {
  return (
    <div className="mx-auto w-full max-w-[1220px]">
      <div className="grid items-start gap-14 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
        {/* Left column */}
        <div className="max-w-[760px]">
          

          <h2 className="font-display text-hero leading-none text-text-base">
            Contact Me!
          </h2>

          <p
            className="mt-6 max-w-[760px] font-sans leading-relaxed"
            style={{ color: '#A8C5D1', fontSize: '18px' }}
          >
            Whether you want to talk product demos, solutions engineering, AI workflow design, or
            early-career opportunities, I’d love to connect!
          </p>

          <div className="mt-10">
            <CopyEmailButton email={siteConfig.email} large />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <CompactLink href={siteConfig.linkedinUrl} icon={Linkedin} label="LinkedIn" />
            <CompactLink href={siteConfig.githubUrl} icon={Github} label="GitHub" />
            <CompactLink href={siteConfig.resumeUrl} download="Justin-Chang-Resume.pdf" icon={Download} label="Résumé" />
          </div>

          <SectionFooter showThanks={false} />
        </div>

        {/* Right column */}
        <div className="relative xl:pt-1">
          <div
            className="rounded-[28px] border p-5 md:p-6"
            style={{
              background: 'rgba(10,24,44,0.42)',
              borderColor: 'rgba(15,122,122,0.16)',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.02) inset',
            }}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="font-sans text-[20px] font-medium text-text-base">
                  Best ways to reach me
                </p>
                <p className="mt-1 text-sm" style={{ color: '#8DAFC0' }}>
                  Quick links for intros, projects, and opportunities.
                </p>
              </div>

              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: 'rgba(15,122,122,0.10)',
                  border: '1px solid rgba(15,122,122,0.18)',
                }}
              >
                <Sparkles size={18} color="#C4974A" />
              </div>
            </div>

            <div className="space-y-4">
              <ActionCard
                href={`mailto:${siteConfig.email}`}
                icon={Send}
                title="Email me"
                body="Best for role opportunities, product discussions, and collaboration."
              />
              <ActionCard
                href={siteConfig.linkedinUrl}
                icon={Linkedin}
                title="Connect on LinkedIn"
                body="Reach out for recruiting, networking, and quick professional intros."
              />
              <ActionCard
                href={siteConfig.githubUrl}
                icon={Github}
                title="View GitHub"
                body="Browse projects, code, and product experiments I’ve been building."
              />
              <ActionCard
                href={siteConfig.resumeUrl}
                download="Justin-Chang-Resume.pdf"
                icon={Download}
                title="Download résumé"
                body="A quick way to review experience, projects, and technical range."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSectionLayout() {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-16">
      <div className="relative">

        <h2 className="font-display text-h1 text-text-base">Let&apos;s talk.</h2>

        <p
          className="mt-5 max-w-[680px] font-sans leading-relaxed"
          style={{ color: '#A8C5D1', fontSize: '16px' }}
        >
          {siteConfig.currentlyOpen}
        </p>

        <div className="mt-8">
          <CopyEmailButton email={siteConfig.email} />
        </div>

        <SectionFooter showThanks />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">

        <div>
          <p className="mb-4 font-sans text-[22px] font-medium text-text-base">Profiles</p>
          <div className="space-y-3">
            <CompactLink href={siteConfig.linkedinUrl} icon={Linkedin} label="LinkedIn" />
            <CompactLink href={siteConfig.githubUrl} icon={Github} label="GitHub" />
          </div>
        </div>

        <div>
          <p className="mb-4 font-sans text-[22px] font-medium text-text-base">Availability</p>
          <div className="space-y-3 text-sm" style={{ color: '#A8C5D1' }}>
            <div className="flex items-start gap-2">
              <StarMark size="xs" color="#4A9FAE" className="mt-1 opacity-70" />
              <span>Open to early-career SE + PM roles</span>
            </div>
            <div className="flex items-start gap-2">
              <StarMark size="xs" color="#C4974A" className="mt-1 opacity-70" />
              <span>Interested in AI systems, product demos, and customer-facing work</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactSection({ mode = 'section' }: ContactSectionProps) {
  const isPage = mode === 'page'
  const stagger = useMotionSafe(staggerContainer(0.08))
  const up = useMotionSafe(fadeUp)

  return (
    <Section
      id={isPage ? undefined : 'contact'}
      paddingY={isPage ? 'lg' : 'default'}
      className={cn('relative overflow-hidden', isPage && 'min-h-[calc(100vh-4rem)]')}
      style={{ borderTop: '1px solid rgba(15,122,122,0.10)' }}
    >
      <div
        className="pointer-events-none absolute right-[-100px] bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(74,159,174,0.06)' }}
        aria-hidden
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        <motion.div variants={up}>
          {isPage ? <ContactPageLayout /> : <ContactSectionLayout />}
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default ContactSection