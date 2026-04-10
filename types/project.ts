export type ProjectTag =
  | 'AI'
  | 'Systems'
  | 'Full-Stack'
  | 'Product'
  | 'UX'
  | 'Demo'
  | 'Automation'

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
  demoUrl?: string
  githubUrl?: string

  // ── Detail page narrative ───────────────────────────────────────────────────
  problem: string           // 2-4 sentences.
  solution: string          // 2-4 sentences.
  impact: string            // 2-4 sentences.
  buildNotes?: string       // Optional technical insight. 1-3 sentences.
}
