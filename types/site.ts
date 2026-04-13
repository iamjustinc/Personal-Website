export type CapabilityItem = {
  label: string        // JetBrains Mono uppercase. Max 25 chars.
  description: string  // 1-2 sentence expansion. Max 80 chars.
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
  roleTag: string
  heroStatement: string
  resumeUrl: string

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
  /** Legacy: square photo. Use portraitSrc for the round portrait. */
  photoSrc?: string

  // ── Career ──────────────────────────────────────────────────────────────────
  career?: CareerItem[]

  // ── Contact ─────────────────────────────────────────────────────────────────
  email: string
  linkedinUrl: string
  githubUrl: string
  currentlyOpen: string

  // ── Footer ──────────────────────────────────────────────────────────────────
  copyrightName: string
}
