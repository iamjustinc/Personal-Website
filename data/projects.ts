import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'
import harmoniqLanding from '../harmoniq-interface.png'
import harmoniqInterface from '../harmoniq-workspace.png'

export const projects: Project[] = [
  {
    slug: 'harmoniq',
    name: 'harmonIQ',
    tagline:
      'AI-assisted CRM data-readiness workspace that profiles risky records, explains recommended fixes, and exports business-ready data.',
    summary:
      'harmonIQ helps RevOps and Sales Ops teams turn messy CRM exports into business-ready data by profiling risk, explaining fixes, and keeping a human in the loop.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: true,
    demoPageEnabled: true,
    launchStatus: 'active',
    role: 'Product Builder',
    tags: ['AI', 'Decision Support', 'Workflow'],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Deterministic Rules Engine', 'LLM Recommendations'],
    year: 2026,
    outcome:
      'Tested with five sales and CRM users, whose feedback simplified the review flow and reprioritized missing-context alerts before launch.',
    thumbnail: harmoniqLanding.src,
    screenshots: [harmoniqLanding.src, harmoniqInterface.src],
    panelAccentColor: '#0F7A7A',
    liveUrl: 'https://harmoniq-crm.vercel.app',

    overview:
      'harmonIQ is a CRM data-readiness workspace built for RevOps and Sales Ops teams preparing an account or contact export before a routing update, planning cycle, or campaign. It profiles the dataset, ranks issues by business impact rather than raw frequency, explains each recommended fix in plain language, and lets the user review, approve, or edit every change before exporting a business-ready CSV and a change log.',

    problem:
      'Operations teams inherit CRM exports full of duplicate accounts, missing owners, inconsistent state and country values, and invalid contact fields. These are not just formatting issues — they break lead routing, distort reporting, and erode trust in the CRM before a team can act on the data. Today, non-technical operators either wait on engineering support or clean the file manually with no clear view of what actually matters first.',

    users:
      'Built for Revenue Operations and Sales Operations managers who receive a CRM export before a routing update, planning cycle, or campaign and need to know which issues to fix first, without waiting on engineering.',

    solution:
      'harmonIQ profiles an uploaded CSV, classifies issues into categories like missing owners, duplicate accounts, and inconsistent formatting, then ranks them by business severity, affected record count, and workflow urgency rather than raw frequency. Each recommendation includes a plain-language rationale and confidence signal, and the user can approve, skip, or manually resolve exceptions before exporting a cleaned CSV and change log.',

    impact:
      "In the product demo, reviewing the highest-priority issues first raised a sample export's readiness score from 35/100 to 68/100 before export, with routing- and territory-breaking issues addressed first. Testing with five sales and CRM users shaped two concrete changes: a simpler review flow and reprioritized alerts for missing ownership and context.",

    buildNotes:
      'The system splits work between deterministic logic and AI: null detection, duplicate heuristics, and readiness scoring run on deterministic rules so results stay consistent, while an LLM layer explains issue clusters and translates them into business language. When the AI layer is unavailable, the product falls back to deterministic and reference-based suggestions rather than blocking the review.',

    reflection:
      'The hardest product call was resisting the urge to make harmonIQ do everything a full ETL or master-data tool does. Narrowing V1 to one workflow, profiling and reviewing a CRM export before it causes downstream damage, made the trust model easier to design and the demo easier to explain.',
  },
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline:
      'AI career intelligence system that turns job descriptions and resumes into fit signals, skill gaps, and action roadmaps.',
    summary:
      'Kestrel helps job seekers turn confusing job descriptions and resumes into fit signals, skill gaps, and a clear action roadmap.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: true,
    demoPageEnabled: true,
    launchStatus: 'active',
    role: 'AI Product Builder',
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
      'Most career tools give generic advice. Job seekers need role-specific guidance they can use to decide what matters first.',

    users:
      'Built for early-career candidates targeting PM and adjacent technical roles who need a faster way to compare their background to role requirements.',

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
