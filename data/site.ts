import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Justin Chang',
  seoTitle: 'Justin Chang | Aspiring Product Manager · AI Product Builder',
  seoDescription:
    'Justin Chang builds AI-native products for CRM and enterprise workflows, turning ambiguous problems into scoped, testable products through discovery, prioritization, and iteration.',
  roleTag: 'ASPIRING PRODUCT MANAGER · AI PRODUCT BUILDER',
  heroStatement:
    'I build AI-native products for CRM and enterprise workflows. I turn ambiguous problems into scoped, testable products through discovery, prioritization, and iteration.',
  heroTechLine: 'Salesforce · Agentforce · Python · SQL · TypeScript · React · Next.js',
  resumeUrl: '/Justin_Chang_Resume.pdf',
  resumeDownloadName: 'Justin_Chang_Resume.pdf',

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
    'I translate ambiguous workflow and data problems into scoped products, align stakeholders around the build, and test solutions with users.',
    'My strongest work sits where product judgment, technical fluency, and stakeholder communication all need to stay aligned.',
    'I map the workflow first, isolate the highest-impact gap, and scope the smallest product that makes the next decision clearer.',
    'I am an aspiring product manager targeting Associate Product Manager and early-career product builder roles across AI, CRM, and workflow-heavy teams.',
  ],

  aboutHighlights: [
    'AI-native product design',
    'CRM and enterprise workflows',
    'Explainable decision support',
    'Technical to stakeholder communication',
  ],

  whyIFit: {
    eyebrow: 'WHY I FIT',
    heading: 'Product judgment backed by technical execution',
    supportingCopy:
      'I translate ambiguous workflow and data problems into scoped products, align stakeholders around the build, and test solutions with users.',
    signals: [
      {
        value: '30K+',
        label: 'RECORDS MODELED',
        description:
          'Scoped a PTSD risk-prediction study and translated clinical questions into five prioritized analytical objectives.',
        animateTo: 30,
        suffix: 'K+',
      },
      {
        value: '70%',
        label: 'LESS MANUAL ANALYSIS',
        description:
          'Built reusable Python and R pipelines that reduced repetitive analysis and improved stakeholder access to results.',
        animateTo: 70,
        suffix: '%',
      },
      {
        value: '63%',
        label: 'HIGHER COMPLETION',
        description:
          'Redesigned recruitment and scheduling workflows across 100+ sessions for a 136-participant study.',
        animateTo: 63,
        suffix: '%',
      },
      {
        value: 'AI + CRM',
        label: 'PRODUCT BUILDER',
        description:
          'Built harmonIQ for CRM data readiness and HandoffAI for Salesforce-native sales handoffs.',
      },
    ],
    supportingColumns: [
      {
        heading: 'TARGET ROLES',
        content: 'Aspiring Product Manager · Early-Career Product Builder · AI + CRM Workflows',
      },
      {
        heading: 'PRODUCT STRENGTHS',
        content:
          'Product discovery · product strategy · requirements definition · MVP scoping · prioritization · user testing · workflow design · stakeholder management',
      },
      {
        heading: 'TECHNICAL FLUENCY',
        content:
          'Salesforce · Agentforce · Apex · SOQL · Python · SQL · R · TypeScript · React · Next.js · Tableau',
      },
    ],
  },

  photoSrc: '/images/pfp.png',

  career: [
    {
      role: 'ML Data Analyst',
      company: 'Temerty Centre for AI Research and Education in Medicine',
      period: 'Apr 2025 to Jun 2026',
      description:
        'Defined the technical scope for a PTSD risk-prediction study using 30K patient records, translated an ambiguous research problem into five analytical objectives, and partnered with clinicians to build explainable ML workflows that cut manual analysis time by 70%.',
      tags: ['Product Requirements', 'Explainable AI', 'Risk Scoring'],
    },
    {
      role: 'Project Lead',
      company: 'Ontario Institute for Studies in Education',
      period: 'Sep 2024 to Jun 2026',
      description:
        'Expanded a solo research initiative into a five-member team, owned prioritization across recruitment, scheduling, documentation, and reporting for a 136-participant study, and raised completion rates by 63% while cutting data inconsistencies by 85%.',
      tags: ['Workflow Redesign', 'Prioritization', 'Shared Systems'],
    },
    {
      role: 'Neuroimaging Data Analyst',
      company: 'CAMH, Centre for Addiction and Mental Health',
      period: 'Aug 2024 to May 2025',
      description:
        'Redesigned fMRI data intake and preprocessing across 200+ imaging sessions for a 72-participant study, then built, documented, and demoed a repeatable R analytics pipeline that became the team’s default workflow.',
      tags: ['Workflow Redesign', 'Stakeholder Collaboration', 'Technical Communication'],
    },
    {
      role: 'Research Data Analyst',
      company: 'CAMH, Centre for Addiction and Mental Health',
      period: 'Sep 2023 to Jun 2024',
      description:
        'Coordinated study requirements across 60+ patients and 20+ stakeholders, then built a centralized Excel and Tableau tracking system that eliminated duplicate outreach and cut handoff prep from hours to minutes.',
      tags: ['Requirements Coordination', 'SQL/Tableau', 'Documentation'],
    },
  ],

  education: [
    {
      school: 'University of San Francisco',
      degree: 'Master of Science in Information Systems',
      period: 'Aug 2026 to May 2027',
      details: ['Focus: AI Product Management, Enterprise Platforms, Data Architecture, and Applied AI'],
    },
    {
      school: 'University of Toronto',
      degree: 'Honours Bachelor of Science',
      period: 'Sep 2022 to Jun 2026',
      details: [
        'Double Major in Cognitive Science & Psychology',
        'Relevant Coursework: Computer Programming, Data Structures, Statistics, Human-Computer Interaction',
      ],
    },
  ],

  skillGroups: [
    {
      label: 'Product Management',
      accent: '#4A9FAE',
      items: [
        'Product discovery',
        'Customer research',
        'Product strategy',
        'Requirements definition',
        'MVP scoping',
        'Feature prioritization',
        'User testing',
        'Workflow design',
        'Product analytics',
        'Stakeholder management',
      ],
    },
    {
      label: 'Salesforce Platform',
      accent: '#0F7A7A',
      items: [
        'Agentforce',
        'Salesforce CRM',
        'Lightning Web Components',
        'Apex',
        'SOQL',
        'Custom objects',
        'Permission sets',
        'Record-page experiences',
        'Salesforce Agile Practices Trailmix',
      ],
    },
    {
      label: 'AI & Data',
      accent: '#C4974A',
      items: [
        'Machine learning',
        'Generative AI',
        'NLP',
        'LLM applications',
        'Agentic workflow design',
        'Human-in-the-loop AI',
        'AI evaluation',
        'Model explainability',
        'Data architecture',
      ],
    },
    {
      label: 'Technical',
      accent: '#7EE7F2',
      items: [
        'Python',
        'SQL',
        'R',
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'REST APIs',
        'JSON schemas',
        'Git',
      ],
    },
    {
      label: 'Design & Communication',
      accent: '#D8B76E',
      items: [
        'Figma',
        'Tableau',
        'Technical demos',
        'Stakeholder presentations',
        'English',
        'Mandarin',
      ],
    },
  ],

  profileFacts: [
    { label: 'Portfolio', value: 'justinchang.me' },
    { label: 'Languages', value: 'English · Mandarin' },
  ],

  email: 'jchang59@dons.usfca.edu',
  linkedinUrl: 'https://linkedin.com/in/jjustin-chang',
  githubUrl: 'https://github.com/iamjustinc',
  currentlyOpen:
    'Aspiring Product Manager · Early-Career Product Builder · AI + CRM Workflows',
  contactHeading: "Let's connect.",
  contactDescription:
    'Email is the fastest way to reach me for recruiting conversations, portfolio context, and product walkthroughs.',
  copyrightName: 'Justin Chang',
}
