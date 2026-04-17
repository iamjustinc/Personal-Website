export type ProjectTag =
  | 'AI'
  | 'Gen AI'
  | 'Systems'
  | 'Full-Stack'
  | 'Product'
  | 'UX'
  | 'Demo'
  | 'Automation'
  | 'Workflow'
  | 'Consumer'
  | 'Decision Support'
  | 'Web App'
  | '0→1'

export type ProjectLaunchStatus = 'active' | 'comingSoon'

export type Project = {
  // ── Identity ────────────────────────────────────────────────────────────────
  slug: string              // URL slug. Never change after publish.
  name: string              // "Kestrel"
  tagline: string           // One punchy sentence. Max 80 chars.
  summary: string           // 2-3 sentences for cards. Max 200 chars.

  // ── Display control ─────────────────────────────────────────────────────────
  featured: boolean         // Exactly one should be true at a time.
  order: number             // Grid sort order, 1-indexed. Featured project excluded.
  visible: boolean          // false = hidden everywhere without deleting.
  homepageVisible: boolean  // false = accessible at /projects/[slug] but off homepage.
  launchStatus?: ProjectLaunchStatus // active = fully available, comingSoon = preview-only.

  // ── Metadata ────────────────────────────────────────────────────────────────
  role: string              // "Builder + Designer"
  tags: ProjectTag[]        // Max 3 rendered on cards.
  stack: string[]           // Shown on detail page only.
  year: number

  // ── Proof ───────────────────────────────────────────────────────────────────
  outcome: string           // One specific result sentence. No vague claims.

  // ── Media ───────────────────────────────────────────────────────────────────
  thumbnail: string         // Required. Static fallback. "/images/projects/[slug]/thumb.jpg"
  heroImage?: string        // Detail page header. Falls back to thumbnail.
  previewVideo?: string     // Short loop for card hover. "/videos/[slug]-preview.mp4" (muted, 5-15s)
  demoVideo?: string        // Full walkthrough. YouTube or Loom embed URL.
  screenshots: string[]     // Detail page gallery.
  floatingPanelImage?: string // Hero section panel. Falls back to thumbnail.
  panelAccentColor: string  // Hex. Color dot on hero floating panel badge.

  // ── Links ───────────────────────────────────────────────────────────────────
  liveUrl?: string          // External production URL — "Try It Out" CTA
  demoUrl?: string          // Embed URL (Loom / YouTube) for /demo page
  githubUrl?: string

  // ── Detail page narrative ───────────────────────────────────────────────────
  problem: string           // 2-4 sentences.
  solution: string          // 2-4 sentences.
  impact: string            // 2-4 sentences.
  buildNotes?: string       // Optional technical insight. 1-3 sentences.

  // ── Extended case study sections (optional) ─────────────────────────────────
  // When present, these unlock additional sections on the case study page.
  // Falls back gracefully for projects that only have the core fields above.
  overview?: string         // Richer executive summary for the case study page.
                            //   Falls back to `summary` if omitted.
  users?: string            // User lens: primary user + secondary audience.
  productLogic?: string     // Key product decisions and the reasoning behind them.
  experienceDesign?: string // UX principles and interface approach.
  reflection?: string       // Learnings, tradeoffs, and future directions.
}
