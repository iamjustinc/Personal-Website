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
      'AI role-readiness tool that turns job descriptions and resumes into fit signals, skill gaps, and action roadmaps.',
    summary:
      'Kestrel helps job seekers turn confusing job descriptions and resumes into fit signals, skill gaps, and a clear action roadmap.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    launchStatus: 'active',
    role: 'Technical Product Builder',
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
      'Kestrel helps job seekers compare a job description and resume, then returns fit signals, skill gaps, and a clear action plan.',

    problem:
      'Most career tools give generic advice. Job seekers need role-specific guidance they can act on quickly.',

    users:
      'Built for early-career candidates who need a faster way to compare their background to role requirements.',

    solution:
      'Kestrel extracts role requirements, compares them against a resume, and returns fit signals, skill gaps, and next-step guidance in a structured dashboard.',

    productLogic:
      'The product leads with orientation first, then action. Score, strengths, gaps, and roadmap appear in a sequence that makes the output easier to trust and use.',

    experienceDesign:
      'The interface is built around one principle: messy input, structured output. Every panel is scannable, independent, and designed to reduce cognitive overload.',

    impact:
      'The project shows product judgment, AI output design, and decision-support thinking in one flow.',

    buildNotes:
      'The main engineering challenge was producing consistent structured output from inconsistent job descriptions. A staged pipeline and typed schema kept recommendations aligned and reliable.',

    reflection:
      'The biggest lesson was restraint. The product became stronger by reducing output noise and focusing only on the information that changes what a user does next.',
  },
  {
    slug: 'quail',
    name: 'Quail Mail',
    tagline:
      'AI inbox triage tool that turns email overload into prioritized decisions and next steps.',
    summary:
      'Quail Mail helps busy professionals turn inbox overload into prioritized email decisions, summaries, and next-step suggestions.',
    featured: false,
    order: 3,
    visible: true,
    homepageVisible: false,
    launchStatus: 'comingSoon',
    role: 'AI Workflow Builder',
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
      'Quail Mail helps users triage crowded inboxes by surfacing priority messages, summaries, and next steps.',

    problem:
      'High-volume inboxes bury important messages and slow down decision-making. Users need help seeing what matters first.',

    users:
      'Built for busy professionals, operators, and customer-facing teams who need faster email triage without losing context.',

    solution:
      'Quail Mail scores messages for urgency, context, and actionability, then groups them into clear priorities with suggested next steps.',

    productLogic:
      'The system is designed around workflow compression. Instead of treating every email equally, it reduces attention load by helping users decide what matters first.',

    experienceDesign:
      'The interface emphasizes quick scanning, low-friction categorization, and a cleaner path from message review to action.',

    impact:
      'The project shows how AI can support faster prioritization without taking control away from the user.',

    buildNotes:
      'The hardest part was making prioritization feel believable and useful while integrating real-time analysis and production email delivery into a polished product flow.',

    reflection:
      'This project reinforced that AI workflow tools are strongest when the logic feels reliable, visible, and grounded in how people already work.',
  },
  {
    slug: 'chirpie',
    name: 'Chirpie',
    tagline:
      'AI news product that turns multi-source reporting into source-grounded summaries and follow-up context.',
    summary:
      'Chirpie turns multi-source news into source-grounded summaries, trust cues, and follow-up context.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: false,
    launchStatus: 'comingSoon',
    role: 'Technical Product Builder',
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
      'Chirpie turns high-volume reporting into concise digests with source grounding, trust cues, and follow-up context.',

    problem:
      'People want quick updates, but most news tools either overwhelm them with volume or flatten stories into generic summaries that lose trust and context.',

    users:
      'Built for users who want faster news updates without giving up source awareness or context.',

    solution:
      'Chirpie pulls from multiple sources and structures outputs around headlines, supporting context, confidence, and source links.',

    productLogic:
      'The product prioritizes trust as much as speed. Summaries are more useful when users can see where information came from and how much confidence to place in it.',

    experienceDesign:
      'The interface is designed to feel lightweight and conversational while still preserving attribution and enough structure to support repeat use.',

    impact:
      'The project shows how AI summaries can stay concise without losing the trust signals users need.',

    buildNotes:
      'The main challenge was balancing concise summaries with enough sourcing and context to keep the experience trustworthy instead of over-compressed.',

    reflection:
      'Chirpie reinforced that summarization products succeed when they reduce information load without removing the signals users need to trust what they are reading.',
  },
]
