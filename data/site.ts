import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Justin Chang',
  roleTag: 'Aspiring Associate Product Manager · AI-Native Product Builder',
  heroStatement:
    'Aspiring Associate Product Manager building AI-native tools for CRM, enterprise workflows, and data systems. I map messy processes, scope practical solutions, and build them with technical fluency.',
  resumeUrl: '/api/resume',

  logoSrc: '/images/justin-logo.png',
  portraitSrc: '/images/me.png',

  showCapabilityStrip: true,
  capabilities: [
    {
      label: 'PRODUCT DISCOVERY',
      description:
        'I map messy workflows, identify the real problem, and turn it into scoped, prioritized product requirements.',
    },
    {
      label: 'STAKEHOLDER COMMUNICATION',
      description:
        'I explain workflows, AI outputs, and product tradeoffs in ways technical and nontechnical teams can quickly trust.',
    },
    {
      label: 'TECHNICAL FLUENCY',
      description:
        'I build and ship the products I scope, so my product judgment stays grounded in what is actually feasible.',
    },
  ],

  aboutStatements: [
    'I’m strongest where product judgment meets technical depth. I like understanding how a system works, where it breaks, and what to build next.',
    'Associate Product Manager and early-career product roles make sense for me because they sit at the intersection of user needs, technical feasibility, and business context.',
    'I approach ambiguous problems by mapping the workflow first, finding the highest-impact gap, then scoping the simplest product that solves it.',
    'I’m looking for early-career product roles where technical credibility, communication, and product judgment all matter.',
  ],

  aboutHighlights: [
    'AI-native product design',
    'CRM and enterprise workflows',
    'Full-stack product execution',
    'Technical to nontechnical communication',
  ],

  photoSrc: '/images/pfp.png',

  career: [
    {
      role: 'ML Data Analyst',
      company: 'Temerty Centre for AI Research and Education in Medicine',
      period: 'Apr 2025 to Jun 2026',
      description:
        'Translated clinical and technical stakeholder needs into product requirements for an AI risk-scoring workflow across 30K+ records, prioritizing a pipeline that cut manual analysis time by 70% and designing explainable, decision-ready outputs.',
      tags: ['Product Requirements', 'Explainable AI', 'Risk Scoring'],
    },
    {
      role: 'Project Lead',
      company: 'Ontario Institute for Studies in Education',
      period: 'Sep 2023 to Jun 2026',
      description:
        'Redesigned recruitment and scheduling workflows across 100+ sessions, raising completion rates by 63%. Built a shared planning system that cut inconsistencies by 85% as the project scaled from solo work into a team operation.',
      tags: ['Workflow Redesign', 'Prioritization', 'Shared Systems'],
    },
    {
      role: 'Imaging Data Analyst',
      company: 'CAMH, Centre for Addiction and Mental Health',
      period: 'Aug 2024 to May 2025',
      description:
        'Redesigned data intake workflows across 200+ fMRI sessions with clinical, technical, and operations stakeholders, translating complex analyses into decision-ready insights and driving adoption through clear documentation and demonstrations.',
      tags: ['Workflow Redesign', 'Stakeholder Collaboration', 'Technical Communication'],
    },
    {
      role: 'Research Data Analyst',
      company: 'CAMH, Centre for Addiction and Mental Health',
      period: 'Sep 2023 to Jun 2024',
      description:
        'Coordinated requirements and scheduling across 60+ patients and 20+ team members, building a centralized tracking system in Excel, SQL, R, and Tableau. Standardized onboarding and documentation to improve handoffs and ramp-up time.',
      tags: ['Requirements Coordination', 'SQL/Tableau', 'Documentation'],
    },
  ],

  email: 'justin886847@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/jjustin-chang',
  githubUrl: 'https://github.com/iamjustinc',
  currentlyOpen:
    'Open to early-career Associate Product Manager and adjacent product roles focused on AI, CRM workflows, and technical execution.',
  copyrightName: 'Justin Chang',
}
