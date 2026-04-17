import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'
import quailLanding from '../Quail.png'
import quailInterface from '../quail-interface.png'
import chirpieLanding from '../Chirpie.png'
import chirpieInterface from '../Chirpie-interface.png'

export const projects: Project[] = [
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline:
      'AI career intelligence system that turns job descriptions into readiness scores, skill gaps, and next-step roadmaps.',
    summary:
      'Kestrel is a decision-support tool that converts messy job descriptions into clear, structured career guidance users can act on immediately.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Product Thinker',
    tags: ['Gen AI', 'Decision Support', 'Full-Stack'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Tailwind'],
    year: 2026,
    outcome:
      'Designed explainable, card-based outputs so every recommendation is specific, attributed, and actionable.',
    thumbnail: kestrelLanding.src,
    screenshots: [kestrelLanding.src, kestrelInterface.src],
    panelAccentColor: '#2A8B87',
    liveUrl: 'https://kestrel-resume.vercel.app/',

    overview:
      'Kestrel helps candidates understand role fit faster. Users submit a job description and profile, then receive a readiness score, aligned strengths, ranked skill gaps, and a practical roadmap.',

    problem:
      'Most career tools give generic advice. Job seekers need guidance that is specific to the exact role they are targeting and clear enough to act on right away.',

    users:
      'Built for early-career candidates targeting competitive roles who need a clearer way to map their background to job requirements.',

    solution:
      'Kestrel runs job descriptions through a structured AI pipeline that extracts requirements, scores fit, surfaces skill gaps, and generates a prioritized roadmap in a card-based dashboard.',

    productLogic:
      'The product leads with orientation first, then action. Score, strengths, gaps, and roadmap appear in a sequence that makes the output easier to trust and use.',

    experienceDesign:
      'The interface is built around one principle: messy input, structured output. Every panel is scannable, independent, and designed to reduce cognitive overload.',

    impact:
      'The project shows how AI outputs can be made more explainable, structured, and useful. It communicates product judgment, systems thinking, and design clarity in one flow.',

    buildNotes:
      'The main engineering challenge was producing consistent structured output from inconsistent job descriptions. A staged pipeline and typed schema kept recommendations aligned and reliable.',

    reflection:
      'The biggest lesson was restraint. The product became stronger by reducing output noise and focusing only on the information that changes what a user does next.',
  },
  {
    slug: 'quail',
    name: 'Quail Mail',
    tagline:
      'AI inbox triage assistant that turns high-volume email into prioritized action pipelines.',
    summary:
      'Quail Mail helps busy professionals reduce inbox overload by surfacing priorities, recommending actions, and turning email into a clearer workflow.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: true,
    role: 'Builder + Workflow Designer',
    tags: ['Gen AI', 'Automation', 'Workflow'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Resend', 'Tailwind'],
    year: 2026,
    outcome:
      'Transforms inboxes into prioritized task pipelines and makes triage faster, clearer, and easier to demo.',
    thumbnail: quailLanding.src,
    screenshots: [quailLanding.src, quailInterface.src],
    panelAccentColor: '#5E9FD4',
    liveUrl: 'https://quail-mail.vercel.app/',

    overview:
      'Quail Mail is an AI workflow tool for people who deal with too much email. It classifies messages, surfaces what matters, and helps users move from inbox overload to clear next steps.',

    problem:
      'High-volume inboxes create constant friction. Important messages get buried, follow-ups are missed, and users spend too much time deciding what deserves attention first.',

    users:
      'Built for busy professionals, operators, and founders who need faster email triage without losing context or control.',

    solution:
      'Quail Mail scores messages across sender, urgency, and context, then groups them into more actionable categories so users can prioritize faster and with less friction.',

    productLogic:
      'The system is designed around workflow compression. Instead of treating every email equally, it reduces attention load by helping users decide what matters first.',

    experienceDesign:
      'The interface emphasizes quick scanning, low-friction categorization, and a cleaner path from message review to action.',

    impact:
      'The project shows how AI can improve a familiar workflow by reducing noise and helping users act faster without making the experience feel gimmicky.',

    buildNotes:
      'The hardest part was making prioritization feel believable and useful while integrating real-time analysis and production email delivery into a polished product flow.',

    reflection:
      'This project reinforced that AI workflow tools are strongest when the logic feels reliable, visible, and grounded in how people already work.',
  },
  {
    slug: 'chirpie',
    name: 'Chirpie',
    tagline:
      'AI news companion that turns multi-source content into personalized, explainable digests.',
    summary:
      'Chirpie ingests current events from multiple sources and delivers structured chat-style summaries built around trust, clarity, and repeat engagement.',
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
    liveUrl: 'https://chirpie-news.vercel.app/',

    overview:
      'Chirpie is an AI-native news companion that turns high-volume reporting into structured, chat-style digests with context, confidence, and clear attribution.',

    problem:
      'People want quick updates, but most news tools either overwhelm them with volume or flatten everything into generic summaries that lose trust and context.',

    users:
      'Built for users who want faster news consumption without giving up credibility, source awareness, or useful context.',

    solution:
      'Chirpie pulls from multiple sources and structures outputs around headlines, supporting context, confidence, and source links so summaries feel concise without feeling shallow.',

    productLogic:
      'The product prioritizes trust as much as speed. Summaries are more useful when users can see where information came from and how much confidence to place in it.',

    experienceDesign:
      'The interface is designed to feel lightweight and conversational while still preserving attribution and enough structure to support repeat use.',

    impact:
      'The project shows how structured AI outputs can improve trust and usability in information-heavy workflows, especially when explainability is treated as a product feature.',

    buildNotes:
      'The main challenge was balancing concise summaries with enough sourcing and context to keep the experience trustworthy instead of over-compressed.',

    reflection:
      'Chirpie reinforced that summarization products succeed when they reduce information load without removing the signals users need to trust what they are reading.',
  },
]
