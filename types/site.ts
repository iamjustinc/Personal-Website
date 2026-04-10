export type CapabilityItem = {
  label: string        // JetBrains Mono uppercase. Max 25 chars.
  description: string  // 1-2 sentence expansion. Max 80 chars.
}

export type HeroPanelItem = {
  slug: string
  projectName: string
  accentColor: string  // Hex.
  imageSrc?: string    // Path to screenshot. Falls back to PlaceholderImage.
}

export type SiteConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: string
  roleTag: string
  heroStatement: string     // One sentence. Max 80 chars.
  resumeUrl: string

  // ── Sections ────────────────────────────────────────────────────────────────
  showCapabilityStrip: boolean
  capabilities: CapabilityItem[]
  heroFloatingPanels?: HeroPanelItem[]

  // ── About ───────────────────────────────────────────────────────────────────
  aboutStatements: string[]  // 3-4 items. Each is 1-3 sentences.
  photoSrc?: string

  // ── Contact ─────────────────────────────────────────────────────────────────
  email: string
  linkedinUrl: string
  githubUrl: string
  currentlyOpen: string

  // ── Footer ──────────────────────────────────────────────────────────────────
  copyrightName: string
}
