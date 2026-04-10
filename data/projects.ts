import type { Project } from '@/types/project'

/**
 * All portfolio projects.
 *
 * To add a project: append a new object. Set featured: false and pick the next order number.
 * To feature a different project: set featured: true on it, false on the current one.
 * To hide without deleting: set visible: false.
 * To remove from homepage but keep the detail page: set homepageVisible: false.
 */
export const projects: Project[] = [
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline: 'An AI-powered research tool that turns scattered information into structured insight.',
    summary:
      'Kestrel helps analysts move from raw data to structured findings in a fraction of the time. Built around an AI pipeline that reads, synthesizes, and presents information clearly.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Designer',
    tags: ['AI', 'Product', 'Full-Stack'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Tailwind'],
    year: 2024,
    outcome: 'Reduced research synthesis time by 70% in internal testing.',
    thumbnail: '/images/projects/kestrel/thumb.jpg',
    screenshots: [],
    panelAccentColor: '#F05A28',
    problem:
      'Analysts spend most of their time organizing information rather than drawing conclusions from it. Existing tools either do too much or require too much manual work to be useful.',
    solution:
      'Kestrel is a research pipeline that ingests sources, extracts structured findings, and presents them in a scannable, editable format. The AI handles structure; the user handles judgment.',
    impact:
      'Early testing showed a 70% reduction in time from source to structured output. Users consistently described the output as "actually usable on first pass."',
    buildNotes:
      'The hardest part was prompt engineering for consistency — getting the model to produce the same schema across wildly different source types.',
  },
  {
    slug: 'quail',
    name: 'Quail',
    tagline: 'A lightweight CRM layer that lives inside the tools your team already uses.',
    summary:
      'Quail brings relationship context into Slack and email without asking teams to change their workflow. It surfaces the right information at the right moment.',
    featured: false,
    order: 1,
    visible: true,
    homepageVisible: true,
    role: 'Solo Developer',
    tags: ['Systems', 'Automation', 'Product'],
    stack: ['Node.js', 'TypeScript', 'Slack API', 'Notion API'],
    year: 2024,
    outcome: 'Adopted by 3 pilot teams within two weeks of launch.',
    thumbnail: '/images/projects/quail/thumb.jpg',
    screenshots: [],
    panelAccentColor: '#4A90D9',
    problem:
      'Small teams lose relationship context constantly — who spoke to whom, what was promised, what the next step is. CRMs are too heavy to maintain consistently.',
    solution:
      'Quail hooks into existing communication tools and automatically logs relationship activity, surfaces context at the right moment, and requires zero manual data entry.',
    impact:
      'Three pilot teams adopted it within two weeks. One team lead described it as "the first CRM tool that doesn\'t feel like a CRM."',
  },
  {
    slug: 'chirpie',
    name: 'Chirpie',
    tagline: 'A social listening tool that tracks signal across noise for product teams.',
    summary:
      'Chirpie monitors online conversations about a product or space and distills them into actionable product insights — not just raw mention counts.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: true,
    role: 'Builder',
    tags: ['AI', 'Product', 'UX'],
    stack: ['Next.js', 'Python', 'OpenAI', 'Supabase'],
    year: 2024,
    outcome: 'Surfaces weekly insight summaries that PMs describe as "actually useful."',
    thumbnail: '/images/projects/chirpie/thumb.jpg',
    screenshots: [],
    panelAccentColor: '#6BCB77',
    problem:
      'Product teams know social listening matters but existing tools surface volume, not insight. You get a dashboard full of mentions with no clear signal.',
    solution:
      'Chirpie pulls from multiple sources, filters noise using a custom relevance model, and distills what remains into weekly insight summaries with actionable framing.',
    impact:
      'PMs using Chirpie consistently describe the weekly summaries as the most useful thing they read that week. Signal-to-noise ratio is dramatically higher than alternatives.',
  },
]
