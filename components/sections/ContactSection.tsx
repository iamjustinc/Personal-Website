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
import { StarField } from '@/components/ui/StarField'
import { Constellation } from '@/components/ui/Constellation'
import { Starburst } from '@/components/ui/Starburst'
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
            Direct email
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
            Built to show how I translate systems into walkthroughs, workflows, and decisions.
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <StarMark size="xs" color="#C4974A" className="opacity-30" />
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: 'rgba(168,197,209,0.30)' }}
        >
          Technical Systems
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
            I&apos;m looking for early-career conversations around technical systems, AI workflows,
            product operations, and stakeholder translation.
          </p>

          <div className="mt-10">
            <CopyEmailButton email={siteConfig.email} large />
          </div>

          <div
            className="mt-8 max-w-[620px] rounded-[22px] border p-5"
            style={{
              background: 'rgba(10,24,44,0.38)',
              borderColor: 'rgba(15,122,122,0.15)',
              boxShadow:
                '0 14px 42px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.02) inset',
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <StarMark size="xs" color="#C4974A" className="opacity-80" />
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                Primary fit
              </p>
            </div>
            <p className="font-sans text-[15px] leading-relaxed" style={{ color: '#A8C5D1' }}>
              Technical, product, and data teams that need workflow discovery, clear walkthroughs,
              and systems translated into usable value.
            </p>
          </div>

          <div
            className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
            style={{ borderColor: 'rgba(15,122,122,0.10)' }}
          >
            <p className="font-sans text-sm" style={{ color: 'rgba(168,197,209,0.55)' }}>
              Best next step: email or LinkedIn for technical, product, and data recruiting
              conversations.
            </p>
            <div className="flex items-center gap-1.5">
              <StarMark size="xs" color="#C4974A" className="opacity-30" />
              <span
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: 'rgba(168,197,209,0.30)' }}
              >
                Systems + Product
              </span>
            </div>
          </div>
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
                  Recruiter actions
                </p>
                <p className="mt-1 text-sm" style={{ color: '#8DAFC0' }}>
                  Start with email or LinkedIn; résumé and GitHub are there for deeper review.
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
                body="Fastest route for technical/product roles, recruiter intros, and interview follow-ups."
              />
              <ActionCard
                href={siteConfig.linkedinUrl}
                icon={Linkedin}
                title="Connect on LinkedIn"
                body="Best for recruiting conversations, role fit, and quick context."
              />
              <ActionCard
                href={siteConfig.githubUrl}
                icon={Github}
                title="View GitHub"
                body="Secondary proof for implementation style, AI workflows, and product systems."
              />
              <ActionCard
                href={siteConfig.resumeUrl}
                download="Justin-Chang-Resume.pdf"
                icon={Download}
                title="Download résumé"
                body="Review experience across data pipelines, dashboards, walkthroughs, and technical communication."
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

        <h2 className="font-display text-h1 text-text-base">Let&apos;s talk solutions.</h2>

        <p
          className="mt-5 max-w-[680px] font-sans leading-relaxed"
          style={{ color: '#A8C5D1', fontSize: '16px' }}
        >
          Open to early-career roles where technical systems, workflow translation, and stakeholder
          clarity turn complexity into usable value.
        </p>

        <div className="mt-8">
          <CopyEmailButton email={siteConfig.email} />
        </div>

        <SectionFooter showThanks />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">

        <div>
          <p className="mb-4 font-sans text-[22px] font-medium text-text-base">Recruiter links</p>
          <div className="space-y-3">
            <CompactLink href={siteConfig.linkedinUrl} icon={Linkedin} label="LinkedIn profile" />
            <CompactLink href={siteConfig.githubUrl} icon={Github} label="GitHub projects" />
          </div>
        </div>

        <div>
          <p className="mb-4 font-sans text-[22px] font-medium text-text-base">Best fit</p>
          <div className="space-y-3 text-sm" style={{ color: '#A8C5D1' }}>
            <div className="flex items-start gap-2">
              <StarMark size="xs" color="#4A9FAE" className="mt-1 opacity-70" />
              <span>Early-career technical product, data, and systems roles</span>
            </div>
            <div className="flex items-start gap-2">
              <StarMark size="xs" color="#C4974A" className="mt-1 opacity-70" />
              <span>Technical walkthroughs, discovery, and workflow translation</span>
            </div>
            <div className="flex items-start gap-2">
              <StarMark size="xs" color="#4A9FAE" className="mt-1 opacity-70" />
              <span>Customer-facing teams turning complex systems into usable value</span>
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

      {/*
        Distant starfield — scattered, asymmetrical pinpoints across the
        negative space. Only 2 of 5 twinkle; the rest are static anchors
        suggesting depth without motion. Treatment: "calm night-sky before
        dawn," differentiated from every other section on the site.
      */}
      <StarField
        className="z-0"
        stars={[
          { x: '7%',  y: '18%', size: 2.0, color: '#E6EEF2', opacity: 0.55, halo: 2.0 },
          { x: '22%', y: '62%', size: 1.5, color: '#A8C5D1', opacity: 0.42, halo: 1.4 },
          { x: '38%', y: '88%', size: 1.5, color: '#E6EEF2', opacity: 0.38, halo: 1.4 },
          { x: '74%', y: '12%', size: 2.5, color: '#F4D58D', opacity: 0.50, halo: 2.0, twinkle: true, delay: 0,   duration: 5.2 },
          { x: '91%', y: '58%', size: 1.8, color: '#7EE7F2', opacity: 0.45, halo: 1.8, twinkle: true, delay: 2.4, duration: 4.6 },
          /* — quiet density fill: distant, restrained — */
          { x: '12%', y: '38%', size: 1.4, color: '#F4D58D', opacity: 0.40, halo: 1.4 },
          { x: '46%', y: '26%', size: 1.3, color: '#A8C5D1', opacity: 0.36, halo: 1.2 },
          { x: '62%', y: '76%', size: 1.5, color: '#7EE7F2', opacity: 0.38, halo: 1.5 },
          { x: '83%', y: '36%', size: 1.0, color: '#E6EEF2', opacity: 0.30, halo: 1.0 },
          { x: '28%', y: '82%', size: 1.2, color: '#A8C5D1', opacity: 0.32, halo: 1.2 },
        ]}
      />

      {/*
        Left constellation — quiet teal 3-point marker. Static.
        Right constellation — gold 3-point, bilaterally balanced.
        Together: "two stars watching from either side." Contact = departure.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[3%] top-[40%] z-0 hidden md:block"
      >
        <Constellation
          width={64}
          height={48}
          color="#4A9FAE"
          lineOpacity={0.20}
          pointOpacity={0.65}
          points={[
            { x: 6,  y: 38, size: 1.4 },
            { x: 30, y: 14, size: 1.8 },
            { x: 58, y: 34, size: 1.2 },
          ]}
          connections={[[0, 1], [1, 2]]}
        />
      </div>

      {/* Right margin constellation — gold, distant, quiet */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] bottom-[28%] z-0 hidden md:block"
      >
        <Constellation
          width={72}
          height={52}
          color="#F4D58D"
          lineOpacity={0.18}
          pointOpacity={0.56}
          points={[
            { x: 8,  y: 44, size: 1.2 },
            { x: 34, y: 20, size: 1.6 },
            { x: 66, y: 38, size: 1.1, twinkle: true, delay: 1.8 },
          ]}
          connections={[[0, 1], [1, 2]]}
        />
      </div>

      {/* Faint starburst — upper-right, soft presence, like a distant star */}
      <div className="pointer-events-none absolute right-[10%] top-[14%] hidden lg:block">
        <Starburst size="sm" color="#E6EEF2" haloColor="#A8C5D1" opacity={0.26} pulse delay={2.8} duration={8.0} />
      </div>

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
