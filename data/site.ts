import type { SiteConfig } from '@/types/site'

export const siteConfig: SiteConfig = {
  name: 'Justin Chang',
  seoTitle: 'Justin Chang | Aspiring Product Manager · AI Product Builder',
  seoDescription:
    'Justin Chang builds AI products, workflow systems, and stakeholder-ready analytics, with experience across product discovery, explainable AI, CRM workflows, and applied ML.',
  roleTag: 'ASPIRING PRODUCT MANAGER · AI PRODUCT BUILDER',
  heroStatement:
    'I build AI products, workflow systems, and stakeholder-ready analytics. My work spans product discovery, explainable AI, CRM workflows, and applied ML.',
  heroTechLine: 'Databricks · Salesforce Platform · Python · SQL · R · React · Next.js',
  resumeUrl: '/JUSTIN_SALESFORCE_APM_RESUME.pdf',
  resumeDownloadName: 'JUSTIN_SALESFORCE_APM_RESUME.pdf',

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
    'I translate ambiguous workflow, data, and AI problems into structured requirements, stakeholder-ready systems, and clearer next steps.',
    'My strongest work sits where product judgment, technical fluency, and stakeholder communication all need to stay aligned.',
    'I care most about explainability, user trust, and the workflows people actually use before and after a product ships.',
    'I am an aspiring product manager targeting Associate Product Manager and early-career product builder roles across AI, data, and workflow-heavy teams.',
  ],

  aboutHighlights: [
    'AI product design',
    'Workflow discovery',
    'Explainable analytics',
    'Stakeholder-ready communication',
  ],

  whyIFit: {
    eyebrow: 'WHY I FIT',
    heading: 'Product judgment backed by technical execution',
    supportingCopy:
      'I translate ambiguous workflow and data problems into structured requirements, stakeholder-ready systems, and user-tested products.',
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
        value: '15',
        label: 'USERS TESTED',
        description:
          'Tested Kestrel action-plan outputs with 15 users and harmonIQ with five CRM users.',
        animateTo: 15,
      },
    ],
    supportingColumns: [
      {
        heading: 'TARGET ROLES',
        content: 'Aspiring Product Manager · Early-Career Product Builder · AI + Data Workflows',
      },
      {
        heading: 'PRODUCT STRENGTHS',
        content:
          'Product discovery · product strategy · requirements definition · MVP scoping · prioritization · user testing · workflow design · stakeholder management',
      },
      {
        heading: 'TECHNICAL FLUENCY',
        content:
          'Python · SQL · R · TypeScript · React · Next.js · Salesforce Platform · Databricks training',
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
        'Defined the technical scope for a PTSD risk-prediction study using 30K patient records, translated the problem into five prioritized analytical objectives, and helped build explainable statistical and ML workflows that cut manual analysis time by 70%.',
      tags: ['Product Requirements', 'Explainable AI', 'Risk Scoring'],
    },
    {
      role: 'Project Lead',
      company: 'Ontario Institute for Studies in Education',
      period: 'Sep 2024 to Jun 2026',
      description:
        'Expanded a solo research initiative into a five-member team, owned prioritization across recruitment, scheduling, documentation, and reporting for a two-phase 136-participant study, and raised completion rates by 63% while cutting data inconsistencies by 85%.',
      tags: ['Workflow Redesign', 'Prioritization', 'Shared Systems'],
    },
    {
      role: 'Neuroimaging Data Analyst',
      company: 'CAMH, Centre for Addiction and Mental Health',
      period: 'Aug 2024 to May 2025',
      description:
        'Redesigned fMRI data intake and preprocessing via fMRIPrep across 200+ imaging sessions for a 72-participant study, then built, documented, and demoed a repeatable R analytics pipeline that became the team’s default workflow.',
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
      accent: '#0F7A7A',
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
        'Salesforce Platform',
      ],
    },
    {
      label: 'Databricks Training',
      accent: '#7EE7F2',
      items: [
        'Databricks Platform Administration',
        'Databricks AI/BI',
        'SQL Analytics on Databricks',
        'Fundamentals Accreditation',
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
      ],
    },
    {
      label: 'Languages',
      accent: '#C4974A',
      items: [
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
    'Aspiring Product Manager · Early-Career Product Builder · AI + Data Workflows',
  contactHeading: "Let's connect.",
  contactDescription:
    'Email is the fastest way to reach me for recruiting conversations, portfolio context, and product or analytics walkthroughs.',
  copyrightName: 'Justin Chang',
}
