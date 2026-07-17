export type CapabilityItem = {
  label: string        // JetBrains Mono uppercase. Max 25 chars.
  description: string  // 1-2 sentence expansion. Max 80 chars.
}

export type WhyIFitSignal = {
  value: string
  label: string
  description: string
  animateTo?: number
  suffix?: string
}

export type WhyIFitColumn = {
  heading: string
  content: string
}

export type EducationItem = {
  school: string
  degree: string
  period: string
  details?: string[]
}

export type SkillGroup = {
  label: string
  accent: string
  items: string[]
}

export type HeroPanelItem = {
  slug: string
  projectName: string
  accentColor: string
  imageSrc?: string
}

export type CareerItem = {
  role: string
  company: string
  period: string
  description: string
  tags?: string[]
  current?: boolean
}

export type SiteConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: string
  seoTitle: string
  seoDescription: string
  roleTag: string
  heroStatement: string
  heroTechLine: string
  resumeUrl: string
  resumeDownloadName: string

  /** Brand logo shown in nav. e.g. /images/justin-logo.png */
  logoSrc?: string
  /** Round portrait shown in hero right column and About. e.g. /images/me.png */
  portraitSrc?: string

  // ── Sections ────────────────────────────────────────────────────────────────
  showCapabilityStrip: boolean
  capabilities: CapabilityItem[]
  heroFloatingPanels?: HeroPanelItem[]

  // ── About ───────────────────────────────────────────────────────────────────
  aboutStatements: string[]
  /** Highlights listed as star-marked items in the About section. */
  aboutHighlights?: string[]
  whyIFit: {
    eyebrow: string
    heading: string
    supportingCopy: string
    signals: WhyIFitSignal[]
    supportingColumns: WhyIFitColumn[]
  }
  /** Legacy: square photo. Use portraitSrc for the round portrait. */
  photoSrc?: string

  // ── Career ──────────────────────────────────────────────────────────────────
  career?: CareerItem[]
  education?: EducationItem[]
  skillGroups?: SkillGroup[]
  profileFacts?: { label: string; value: string }[]

  // ── Contact ─────────────────────────────────────────────────────────────────
  email: string
  linkedinUrl: string
  githubUrl: string
  currentlyOpen: string
  contactHeading: string
  contactDescription: string

  // ── Footer ──────────────────────────────────────────────────────────────────
  copyrightName: string
}
