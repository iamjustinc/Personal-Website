import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'

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
]
