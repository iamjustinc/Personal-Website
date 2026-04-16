import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Justin Chang',
  roleTag: 'Solutions Engineering + Product Management',
  heroStatement:
    'I turn complex systems, AI workflows, and data into clear demos, decisions, and usable products.',
  resumeUrl: '/RESUME.pdf',

  logoSrc: '/images/justin-logo.png',
  portraitSrc: '/images/me.png',

  showCapabilityStrip: true,
  capabilities: [
    {
      label: 'SOLUTIONS ENGINEERING',
      description:
        'I turn AI workflows, APIs, and technical systems into clear demos, decision tools, and customer-ready solutions.',
    },
    {
      label: 'TECHNICAL COMMUNICATION',
      description:
        'I explain models, pipelines, and product behavior in ways stakeholders, customers, and non-technical teams can quickly trust.',
    },
    {
      label: 'PRODUCT JUDGMENT',
      description:
        'I identify the right problem, prototype with speed, and ship tools that are useful, usable, and grounded in real workflows.',
    },
  ],

  aboutStatements: [
    'I’m strongest where technical complexity meets user clarity. I like understanding how a system works, where it breaks, and how to make it more usable.',
    'That is why Solutions Engineering and Product roles both make sense for me — they sit at the intersection of technical depth, user empathy, and business context.',
    'I approach messy problems by mapping the workflow first, finding the leverage point, then building the simplest thing that actually helps people move faster.',
    'I’m looking for early-career roles where technical credibility, communication, and product judgment all matter.',
  ],

  aboutHighlights: [
    'AI workflow design and integration',
    'Solutions Engineering and pre-sales',
    'Full-stack product development',
    'Technical to non-technical communication',
  ],

  photoSrc: '/images/pfp.png',

  career: [
    {
      role: 'Project Lead & Data Analyst',
      company: 'Temerty Centre for AI Research and Education in Medicine',
      period: 'Apr 2025 — Present',
      description:
        'Built predictive systems across 30K+ records and turned model outputs into risk-scoring workflows and dashboards that supported stakeholder decision-making.',
      tags: ['AI Systems', 'Dashboards', 'Stakeholders'],
      current: true,
    },
    {
      role: 'Senior Project Lead',
      company: 'Ontario Institute for Studies in Education',
      period: 'Sep 2023 — Present',
      description:
        'Re-architected recruitment and scheduling workflows across 100+ sessions, increasing completion rates by 63% and improving operational reliability across the team.',
      tags: ['Operations', 'Systems', 'Workflow Design'],
    },
    {
      role: 'Intern Data Analyst',
      company: 'CAMH',
      period: 'Aug 2024 — May 2025',
      description:
        'Built scalable data pipelines across 200+ fMRI sessions and translated complex analyses into clear stakeholder-facing insights for clinicians and research teams.',
      tags: ['Data Pipelines', 'Technical Communication', 'Insights'],
    },
    {
      role: 'Research Data Analyst',
      company: 'CAMH, PETRUSHKA Study',
      period: 'Sep 2023 — Jun 2024',
      description:
        'Built tracking systems in Excel, R, SQL, and Tableau to improve coordination, reduce errors, and standardize study operations across patients and team members.',
      tags: ['SQL', 'Tableau', 'Cross-Functional Coordination'],
    },
    {
      role: 'Independent Product Builder',
      company: 'Self-Directed',
      period: '2024 — Present',
      description:
        'Designed and shipped three AI-powered tools end-to-end — Kestrel, Quail Mail, and Chirpie — each focused on turning messy information into clear, usable workflows.',
      tags: ['AI', 'Full-Stack', 'Product Design'],
    },
  ],

  email: 'justin886847@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/jjustin-chang',
  githubUrl: 'https://github.com/iamjustinc',
  currentlyOpen:
  'Open to early-career SE + PM roles focused on technical systems and customer value.',
  copyrightName: 'Justin Chang',
}