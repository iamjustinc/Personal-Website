import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'
import quailLanding from '../Quail.png'
import quailInterface from '../quail-interface.png'
import chirpieLanding from '../Chirpie.png'
import chirpieInterface from '../Chirpie-interface.png'

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
      'Kestrel is a Gen AI decision-support tool that converts unstructured job descriptions into structured career intelligence: a readiness score, aligned strengths, a skill-gap analysis, and a concrete action roadmap.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Product Thinker',
    tags: ['Gen AI', 'Decision Support', 'Full-Stack'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Tailwind'],
    year: 2026,
    outcome:
      'Designed explainable, card-based outputs so every recommendation is attributed and actionable, not just generated.',
    thumbnail: kestrelLanding.src,
    screenshots: [kestrelLanding.src, kestrelInterface.src],
    panelAccentColor: '#2A8B87',

    overview:
      'Kestrel is a Gen AI career intelligence system built to translate unstructured job descriptions into clear, structured outputs. A candidate submits a job description and their profile; Kestrel returns a readiness score, a breakdown of aligned strengths, a prioritized skill-gap analysis, and a concrete action roadmap. The system is built around a single principle: AI outputs are only useful when they are explainable. Every recommendation is labelled and attributed so users can reason with the system rather than just react to it.',

    problem:
      'Job seekers face a navigation problem, not an information problem. There is no shortage of career advice, but there is a shortage of advice that is specific, ranked, and actionable for a given candidate targeting a given role. Job descriptions are often vague, inconsistent, and written by committee. Most preparation tools respond to this with generic checklists and broad guidance. Candidates who follow that advice improve on average, but they rarely improve on the specific dimensions that matter most for the specific role they are targeting. The result is real effort, misdirected.',

    users:
      'The primary user is an early-career candidate, typically a student or recent graduate, who is targeting a specific competitive role and understands their own background but cannot clearly map it to what the job actually requires. They are motivated and ready to put in effort; they just need a clearer target. The secondary lens is the recruiter or hiring manager who regularly reads under-prepared applications and benefits from seeing candidates who have done the work to understand role fit before applying.',

    solution:
      'Kestrel takes a raw job description as input and runs it through a structured AI pipeline. The first pass extracts and normalizes the role requirements regardless of how inconsistently they are written. The second pass scores the candidate profile against those requirements and produces a readiness assessment. The third pass generates a ranked skill-gap analysis and a sequenced roadmap: what to focus on first, what to address next, and what to deprioritize. The full output is card-based and scannable. Each panel is an independent unit the user can act on without reading the entire analysis.',

    productLogic:
      'The readiness score appears first because users need an anchor before they can process detail. Without a clear orientation frame, skill-gap information produces anxiety rather than direction. Strengths surface before gaps for the same reason: confirming alignment before surfacing shortcomings makes users more receptive to hard feedback, not less. The roadmap is the most important section in the product. Most AI tools stop at diagnosis. Kestrel converts diagnosis into a prioritized action sequence, which is the difference between a report and a tool. All outputs include an attribution layer that shows what the AI identified in the job description and why each recommendation was generated. That transparency is a product requirement, not a design flourish. Without it, users can only follow recommendations blindly, which limits the product to users who already trust the system, and prevents anyone from building genuine understanding through use.',

    experienceDesign:
      'The core interface principle was: messy input, structured output. A disorganized job description enters; a clean, modular dashboard emerges. The output panels are independent so users can navigate directly to what matters rather than scrolling linearly through a long report. The visual hierarchy is anchored on the readiness score as the primary orientation point, with supporting panels arranged in a logical sequence from context to action. The interface avoids urgency signals, gamification, and progress mechanics that create friction without adding value. The goal was a product that a first-time user could navigate confidently without a walkthrough.',

    impact:
      'The product converts ambiguity into direction. A candidate who enters uncertain about their fit leaves with a ranked view of where they stand and a sequenced set of next steps. The system demonstrates that AI outputs can be structured, explainable, and immediately actionable rather than generative and exploratory. For a technical or product-oriented recruiting audience, the project communicates product judgment in defining the right outputs, engineering depth in building a reliable analysis pipeline, and design clarity in surfacing complex information in a form that does not require explanation.',

    buildNotes:
      'The core engineering challenge was consistent schema-constrained output across wildly varied job description formats. The solution was a multi-step pipeline where each stage produces a validated, typed schema that feeds the next stage as structured context. This prevents hallucination drift and ensures the readiness score, gap analysis, and roadmap are all derived from the same normalized understanding of the role. The frontend is a Next.js and TypeScript application with a Tailwind card system that maps directly to the output schema. PostgreSQL stores session and analysis history so users can track changes across profile iterations.',

    reflection:
      'The most important constraint was restraint. AI outputs can always be richer, but richer is not the same as more useful. The discipline was identifying the minimum set of outputs that would let a user leave with a clear next action rather than a longer reading list. Earlier versions of the output schema included more panels, more granularity, and more edge-case handling. Each iteration removed detail that produced noise without changing what a user would actually do next. Future versions would include resume editing directly within the output view, persistent tracking across multiple job applications, and role-specific preparation templates for technical and product interview formats. This project reinforced a principle that now shapes how I approach most product decisions: if a user cannot explain why a recommendation exists, they will not trust it, and a recommendation that is not trusted is not acted on, regardless of how accurate it is.',
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
    tags: ['Gen AI', 'Automation', 'Workflow'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Resend', 'Tailwind'],
    year: 2026,
    outcome:
      'Transforms inboxes into prioritized task pipelines, reducing triage time by 80%.',
    thumbnail: quailLanding.src,
    screenshots: [quailLanding.src, quailInterface.src],
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
    tags: ['Gen AI', 'Consumer', 'Full-Stack'],
    stack: ['Next.js', 'Python', 'OpenAI', 'Supabase'],
    year: 2026,
    outcome:
      'Built around source attribution, explainable summaries, and a digest flow designed for repeat use.',
    thumbnail: chirpieLanding.src,
    screenshots: [chirpieLanding.src, chirpieInterface.src],
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