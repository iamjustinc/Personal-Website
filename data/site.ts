import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Justin Chang',
  roleTag: 'Solutions Engineering + Product Management',
  heroStatement: 'I turn complex systems and AI workflows into clear, usable products.',
  resumeUrl: '/resume.pdf',

  logoSrc:    '/images/justin-logo.png',
  portraitSrc: '/images/me.png',

  showCapabilityStrip: true,
  capabilities: [
    {
      label: 'PRODUCT + TECHNICAL',
      description: 'I build usable products, not just functioning code.',
    },
    {
      label: 'AI WORKFLOWS',
      description: 'Turning complex AI systems into clear user experiences.',
    },
    {
      label: 'SE / PM CROSSOVER',
      description: "Bridge between what's technically possible and what users actually need.",
    },
  ],

  heroFloatingPanels: [
    { slug: 'kestrel', projectName: 'Kestrel', accentColor: '#0F7A7A', imageSrc: '/images/projects/kestrel/thumb.png' },
    { slug: 'quail',   projectName: 'Quail',   accentColor: '#5E9FD4', imageSrc: '/images/projects/quail/thumb.png'   },
    { slug: 'chirpie', projectName: 'Chirpie', accentColor: '#62BDB8', imageSrc: '/images/projects/chirpie/thumb.png' },
  ],

  aboutStatements: [
    'I care about the gap between how a system works and how it feels to use. Most of my best work has lived in that gap.',
    "SE and PM roles attract me because they sit at the intersection of the technical and the human — and that's where the interesting problems are.",
    'I approach messy problems by mapping the system first, finding the leverage point, then building the simplest thing that actually solves it.',
    "I'm looking for roles where product thinking and technical credibility both matter.",
  ],

  aboutHighlights: [
    'AI workflow design and integration',
    'Solutions Engineering and pre-sales',
    'Full-stack product development',
    'Technical to non-technical communication',
  ],

  photoSrc: '/images/pfp.png',

  // ── Career ─────────────────────────────────────────────────────────────────
  // Update these with your real experience. Each item appears as a timeline
  // milestone in the Career section. Set current: true for your present role.
  career: [
    {
      role: 'Independent Product Builder',
      company: 'Self-directed',
      period: '2024 — Present',
      description:
        'Designed and shipped three AI-powered tools end-to-end: Kestrel, Quail, and Chirpie. Each project targets a real problem in how teams work with information.',
      tags: ['AI', 'Full-Stack', 'Product Design'],
      current: true,
    },
    {
      role: 'Solutions Engineering',
      company: '← Update with your role',
      period: '← Update',
      description:
        'Add a brief description of your SE work here — what problems you solved, what you built or demonstrated, and what outcomes you drove.',
      tags: ['Technical Sales', 'Integration', 'Demos'],
    },
    {
      role: 'Product Management',
      company: '← Update with your role',
      period: '← Update',
      description:
        'Add a brief description of your PM work here — what products you owned, what decisions you made, and what shipped.',
      tags: ['Roadmap', 'Discovery', 'Stakeholders'],
    },
  ],

  email: 'justin886847@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/justinc',
  githubUrl: 'https://github.com/justinc',
  currentlyOpen: 'Open to SE + PM roles at startups and growth-stage companies.',
  copyrightName: 'Justin Chang',
}
