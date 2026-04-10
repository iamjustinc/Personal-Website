import type { SiteConfig } from '@/types/site'

/**
 * Global site configuration.
 * Update this file to change copy, links, and section toggles.
 */
export const siteConfig: SiteConfig = {
  name: 'Justin C.',
  roleTag: 'Solutions Engineering + Product Management',
  heroStatement: 'I turn complex systems and AI workflows into clear, usable products.',
  resumeUrl: '/resume.pdf',

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
    { slug: 'kestrel', projectName: 'Kestrel', accentColor: '#F05A28' },
    { slug: 'quail',   projectName: 'Quail',   accentColor: '#4A90D9' },
    { slug: 'chirpie', projectName: 'Chirpie', accentColor: '#6BCB77' },
  ],

  aboutStatements: [
    'I care about the gap between how a system works and how it feels to use. Most of my best work has lived in that gap.',
    "SE and PM roles attract me because they sit at the intersection of the technical and the human — and that's where the interesting problems are.",
    'I approach messy problems by mapping the system first, finding the leverage point, then building the simplest thing that actually solves it.',
    "I'm looking for roles where product thinking and technical credibility both matter.",
  ],

  // photoSrc: '/images/justin.jpg', // uncomment when ready

  email: 'justin@example.com',
  linkedinUrl: 'https://linkedin.com/in/justinc',
  githubUrl: 'https://github.com/justinc',
  currentlyOpen: 'Open to SE + PM roles at startups and growth-stage companies.',
  copyrightName: 'Justin C.',
}
