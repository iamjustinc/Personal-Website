import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'

export const projects: Project[] = [
  {
    slug: 'handoffai',
    name: 'HandoffAI',
    tagline:
      'Salesforce-native sales handoff workflow that turns Opportunity data into structured, reviewable account-transition summaries.',
    summary:
      'Designed for handoffs where context gets lost between teams. The workflow organizes Opportunity data into editable summaries, saved history, and exportable handoff records.',
    featured: false,
    order: 1,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: false,
    demoPageEnabled: false,
    launchStatus: 'active',
    role: 'Product Builder',
    tags: ['Workflow', 'Product', 'Systems'],
    stack: ['Lightning Web Components', 'Apex', 'SOQL', 'Custom Objects', 'Permission Sets'],
    year: 2026,
    outcome:
      'Scoped the MVP around handoff generation, user review, saved history, and export so the workflow keeps a human in the loop.',
    thumbnail: '',
    screenshots: [],
    panelAccentColor: '#4A9FAE',
    overview:
      'HandoffAI is a Salesforce-native workflow designed to turn Opportunity information into structured account-transition summaries that a user can review, edit, save, and export before a handoff moves downstream.',
    problem:
      'Sales handoffs often lose context between the Opportunity and the next team. Notes are incomplete, next steps are unclear, and transition risks stay buried in scattered fields or memory.',
    users:
      'Built for sales and downstream account teams that need clearer account transitions and less information loss between stages of the workflow.',
    solution:
      'HandoffAI turns Opportunity information into a structured handoff draft, then keeps the user in control through review, editing, saved history, and export.',
    impact:
      'The product is designed to reduce missing context, unclear next steps, and transition risk by making handoff information structured and reviewable before it moves downstream.',
    buildNotes:
      'Built on Salesforce record pages with Lightning Web Components, Apex, SOQL, custom objects, and permission sets so the workflow stays close to the data it organizes.',
    reflection:
      'The strongest decision was keeping review and editing in the loop so the workflow stays useful without pretending automation should replace handoff judgment.',
  },
  {
    slug: 'harmoniq',
    name: 'harmonIQ',
    tagline:
      'CRM data-readiness workflow that profiles import risk, recommends transparent fixes, and exports a cleaned CSV.',
    summary:
      'Built for RevOps and Sales Ops teams preparing data before CRM import. The MVP profiles missing owners, invalid values, and routing-breaking issues before clean export.',
    featured: false,
    order: 2,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: false,
    demoPageEnabled: false,
    launchStatus: 'active',
    role: 'Product Builder',
    tags: ['Workflow', 'AI', 'Systems'],
    stack: ['Data Profiling', 'Explainable Scoring', 'Review Controls', 'CSV Export'],
    year: 2026,
    outcome:
      'Tested with five sales and CRM users, which simplified the review flow and reprioritized missing-context alerts in the MVP.',
    thumbnail: '',
    screenshots: [],
    panelAccentColor: '#0F7A7A',
    overview:
      'harmonIQ is a pre-import CRM data-readiness workflow for RevOps and Sales Ops teams. It profiles file quality, surfaces explainable risk, recommends corrections, and supports review before export.',
    problem:
      'Poor-quality data breaks routing, ownership, and downstream CRM workflows before it is even imported. Teams need a way to catch missing owners, invalid values, and inconsistent fields before those issues spread.',
    users:
      'Built for RevOps and Sales Ops teams cleaning data before import and trying to avoid routing-breaking errors downstream.',
    solution:
      'harmonIQ profiles incoming CRM data, highlights explainable risk, recommends transparent fixes, lets users review changes, and exports a cleaned CSV users can inspect before import.',
    impact:
      'The product is designed to keep weak data from entering core CRM workflows by making risk visible before import instead of after routing and reporting begin to fail.',
    buildNotes:
      'The MVP focused on transparent scoring and review controls so users can understand why a row is risky before accepting a fix.',
    reflection:
      'Testing with five sales and CRM users pushed the product toward a simpler review flow and higher-priority missing-context alerts.',
  },
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline:
      'AI career intelligence system that turns job descriptions and resumes into fit signals, skill gaps, and action roadmaps.',
    summary:
      'Kestrel helps job seekers turn confusing job descriptions and resumes into fit signals, skill gaps, and a clear action roadmap.',
    featured: true,
    order: 3,
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
