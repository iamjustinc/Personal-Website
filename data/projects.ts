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
    tagline:
      'AI career intelligence system that turns messy job descriptions into readiness scores, skill-gap analysis, and next-step recommendations.',
    summary:
      'Kestrel is an AI decision-support system built to translate unstructured job descriptions into clear, actionable outputs. It helps users understand where they stand, what skills they are missing, and what to do next.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Product Thinker',
    tags: ['AI', 'Decision Support', 'Product'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Tailwind'],
    year: 2026,
    outcome:
      'Designed explainable outputs and a live dashboard to make recommendations easy to act on.',
    thumbnail: '/images/projects/kestrel/thumb.png',
    screenshots: [],
    panelAccentColor: '#2A8B87',
    problem:
      'Job seekers often work from messy, inconsistent job descriptions and struggle to translate them into concrete priorities. Most tools stop at generic advice instead of helping people decide what matters now.',
    solution:
      'Kestrel converts raw job descriptions into structured readiness scores, skill gaps, and recommended next steps. The system is designed to make AI outputs legible, explainable, and immediately useful.',
    impact:
      'The product turns vague career information into clear action. It was built to demonstrate product judgment, structured AI outputs, and a workflow that users can trust and act on quickly.',
    buildNotes:
      'The hardest part was designing schema-constrained outputs that stayed consistent across wildly different job descriptions while still feeling useful and human-readable.',
  },
  {
    slug: 'quail',
    name: 'Quail Mail',
    tagline:
      'AI inbox triage assistant that turns high-volume email into prioritized action pipelines.',
    summary:
      'Quail Mail helps busy professionals reduce inbox overload by classifying messages, surfacing what matters, and turning email into clear next steps. It is built as both a usable workflow tool and a strong live demo.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Workflow Designer',
    tags: ['AI', 'Automation', 'Workflow'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Resend', 'Tailwind'],
    year: 2026,
    outcome:
      'Transforms inboxes into prioritized task pipelines, reducing triage time by 80%.',
    thumbnail: '/images/projects/quail/thumb.png',
    screenshots: [],
    panelAccentColor: '#5E9FD4',
    problem:
      'High-volume inboxes create constant friction. Important messages get buried, follow-ups are missed, and users spend too much time deciding what deserves attention first.',
    solution:
      'Quail Mail applies AI classification across sender, urgency, and context to surface priorities, recommend actions, and support faster decision-making. It also integrates production email delivery to show an end-to-end usable workflow.',
    impact:
      'The system demonstrates how AI can reduce operational friction in a familiar workflow. It was designed to clearly communicate both user value and technical implementation in a live product demo.',
    buildNotes:
      'A key challenge was making the prioritization logic feel believable and useful rather than gimmicky, while also wiring real-time analysis and production email delivery into a polished demo flow.',
  },
  {
    slug: 'chirpie',
    name: 'Chirpie',
    tagline:
      'AI news companion that turns multi-source content into personalized, explainable digests.',
    summary:
      'Chirpie ingests current events from multiple sources and delivers structured chat-style summaries with context, confidence, and attribution. It is designed around trust, clarity, and repeat engagement.',
    featured: false,
    order: 3,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Systems Designer',
    tags: ['AI', 'Product', 'Insights'],
    stack: ['Next.js', 'Python', 'OpenAI', 'Supabase'],
    year: 2026,
    outcome:
      'Built around source attribution, explainable summaries, and a digest flow designed for repeat use.',
    thumbnail: '/images/projects/chirpie/thumb.png',
    screenshots: [],
    panelAccentColor: '#62BDB8',
    problem:
      'People want quick updates, but most news tools overwhelm them with volume or flatten everything into generic summaries. That creates convenience at the expense of trust and context.',
    solution:
      'Chirpie pulls from multiple sources and structures outputs around headlines, supporting context, confidence, and original-report links. The result is a digest experience that feels faster without feeling shallow.',
    impact:
      'The product shows how structured AI outputs can improve trust and usability in information-heavy workflows. It was built to highlight product thinking around explainability, onboarding, and repeat engagement.',
    buildNotes:
      'The biggest challenge was balancing concise summaries with enough sourcing and context to keep the experience trustworthy instead of over-compressed.',
  },
]
