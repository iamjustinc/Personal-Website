import type { Project } from '@/types/project'

import kestrelLanding from '../Kestrel.png'
import kestrelInterface from '../kestrel-interface.png'
import harmoniqLanding from '../harmoniq-interface.png'
import harmoniqInterface from '../harmoniq-workspace.png'

export const kestrelDemoUrl =
  'https://www.linkedin.com/posts/jjustin-chang_buildinpublic-solutionsengineering-productmanagement-ugcPost-7448104114703527936-W0CI/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC8kyn8BgbHl-T6FxSq__vvSg2wW3sCT8SM'

export const projects: Project[] = [
  {
    slug: 'harmoniq',
    name: 'harmonIQ',
    tagline:
      'CRM data-readiness product that profiles high-impact issues, recommends fixes, and preserves user review before export.',
    summary:
      'harmonIQ helps RevOps and SalesOps teams profile CRM failures, prioritize fixes, and review changes before clean export.',
    featured: true,
    order: 1,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: true,
    demoPageEnabled: true,
    launchStatus: 'active',
    role: 'Product Builder',
    tags: ['AI', 'Decision Support', 'Workflow'],
    stack: ['Product Discovery', 'Risk Scoring', 'Explainable AI', 'Clean CSV Export'],
    year: 2026,
    outcome:
      'Tested with five sales and CRM users, whose feedback simplified the review flow and reprioritized missing-context alerts before launch.',
    thumbnail: harmoniqLanding.src,
    screenshots: [harmoniqLanding.src, harmoniqInterface.src],
    panelAccentColor: '#0F7A7A',
    liveUrl: 'https://harmoniq-crm.vercel.app',
    liveCtaLabel: 'Live Demo',
    liveAriaLabel: 'Open the harmonIQ live demo in a new tab',
    homepageFeature: {
      categories: ['Business-Risk Profiling', 'Explainable AI', 'Reviewable Export'],
      description:
        'harmonIQ profiles CRM failures, prioritizes fixes by business impact, and keeps users in control before clean export.',
      supportingDescription:
        'Built for RevOps and SalesOps teams, it uses explainable risk scoring and reviewable recommendations so operators can focus on the issues that matter first.',
      roleRelevance:
        'Role relevance: business-impact prioritization · explainable AI · human-in-the-loop trust · MVP scoping',
      signals: [
        {
          value: '5',
          label: 'USERS TESTED',
          description:
            'Sales and CRM user feedback simplified the review flow before launch.',
        },
        {
          value: 'CRM',
          label: 'DATA READINESS',
          description:
            'Profiles missing owners, invalid values, and routing-breaking issues before downstream workflows fail.',
        },
        {
          value: 'RISK',
          label: 'EXPLAINABLE PRIORITIZATION',
          description:
            'Ranks issues by business severity so the highest-impact fixes surface first.',
        },
        {
          value: 'CSV',
          label: 'REVIEWABLE EXPORT',
          description:
            'Preserves human review before exporting a cleaned dataset and change log.',
        },
      ],
      stack: [
        'Product Discovery',
        'Risk Scoring',
        'Explainable AI',
        'Human-in-the-Loop Review',
        'Clean CSV Export',
      ],
      ctas: [
        {
          href: '/projects/harmoniq/demo',
          label: 'Open Demo',
          variant: 'primary',
        },
        {
          href: 'https://harmoniq-crm.vercel.app',
          label: 'Live Demo',
          ariaLabel: 'Open the harmonIQ live demo in a new tab',
          external: true,
          variant: 'secondary',
        },
        {
          href: '/projects/harmoniq',
          label: 'Read Case Study',
          variant: 'secondary',
        },
      ],
    },

    overview:
      'harmonIQ is a CRM data-readiness product built for RevOps and SalesOps teams preparing data before downstream routing, reporting, and handoff workflows. It centers data profiling, explainable risk scoring, recommended fixes, and clean CSV export in an auditable review-and-export flow.',

    problem:
      'RevOps and SalesOps teams deal with missing owners, inconsistent fields, invalid values, and routing-breaking CRM errors before data can be trusted downstream. Without a clear way to prioritize the failures that matter most, cleanup becomes slow, manual, and difficult to trust.',

    users:
      'Built for RevOps and SalesOps users responsible for pre-import CRM hygiene and downstream workflow reliability.',

    solution:
      'harmonIQ focuses the MVP on data profiling, explainable risk scoring, recommended fixes, and clean CSV export. Users can review recommendations, simplify record review, and preserve control before changes are exported.',

    impact:
      'Testing with five sales and CRM users simplified record review, reprioritized missing-context alerts, and reinforced user control over recommended changes.',

    buildNotes:
      'The MVP emphasized explainable risk scoring and user review so the workflow stayed auditable and trustworthy for CRM updates.',

    reflection:
      'Keeping the scope centered on one pre-import workflow made the product easier to explain, easier to test with users, and easier to trust.',
  },
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline:
      'AI career intelligence system that turns job descriptions into structured, actionable plans.',
    summary:
      'Kestrel turns complex job descriptions into structured, actionable plans using AI and NLP, helping users move from ambiguous requirements to clear priorities.',
    featured: true,
    order: 2,
    visible: true,
    homepageVisible: true,
    detailPageEnabled: true,
    demoPageEnabled: false,
    launchStatus: 'active',
    role: 'AI Product Builder',
    tags: ['AI Workflow Design', 'Structured Outputs', 'Explainable AI', 'Rapid Prototyping'],
    stack: [
      'LLM Prompting',
      'Natural Language Processing',
      'JSON Schemas',
      'Explainable AI',
      'Comparative Dashboard',
      'Structured Outputs',
    ],
    year: 2026,
    outcome:
      'Designed an explainable comparative dashboard that keeps AI recommendations transparent and actionable.',
    thumbnail: kestrelLanding.src,
    screenshots: [kestrelLanding.src, kestrelInterface.src],
    panelAccentColor: '#2A8B87',
    previewLinkHref: kestrelDemoUrl,
    previewLinkAriaLabel: 'Open the Kestrel product demo on LinkedIn',
    liveUrl: kestrelDemoUrl,
    liveCtaLabel: 'Live Demo',
    liveAriaLabel: 'Open the Kestrel product demo on LinkedIn',
    demoCtaUrl: kestrelDemoUrl,
    demoCtaLabel: 'Open Demo',
    demoCtaAriaLabel: 'Open the Kestrel product demo on LinkedIn',
    demoUrl: kestrelDemoUrl,
    homepageFeature: {
      categories: [
        'AI WORKFLOW DESIGN',
        'STRUCTURED OUTPUTS',
        'EXPLAINABLE AI',
        'RAPID PROTOTYPING',
      ],
      description:
        'Kestrel turns complex job descriptions into structured, actionable plans using AI and NLP, helping users move from ambiguous requirements to clear priorities.',
      supportingDescription:
        'Instead of returning generic chatbot advice, Kestrel uses LLM prompts and JSON schemas to organize role requirements and present recommendations through a transparent comparative dashboard.',
      roleRelevance:
        'Role relevance: ambiguous problem framing · AI prototyping · structured data workflows · explainability · end-to-end product execution',
      signals: [
        {
          value: 'AI',
          label: 'WORKFLOW PROTOTYPE',
          description:
            'Converted an open-ended career-planning problem into a guided AI product workflow.',
        },
        {
          value: 'NLP',
          label: 'REQUIREMENT PARSING',
          description:
            'Transforms dense job descriptions into structured requirements and actionable priorities.',
        },
        {
          value: 'JSON',
          label: 'SCHEMA-BASED OUTPUTS',
          description:
            'Uses defined schemas to make AI-generated outputs consistent, usable, and easier to evaluate.',
        },
        {
          value: 'E2E',
          label: 'PRODUCT EXECUTION',
          description:
            'Designed the workflow, built the product experience, and translated complex AI outputs into clear user actions.',
        },
      ],
      stack: [
        'LLM Prompting',
        'Natural Language Processing',
        'JSON Schemas',
        'Explainable AI',
        'Comparative Dashboard',
        'Structured Outputs',
      ],
      mediaHref: kestrelDemoUrl,
      mediaAriaLabel: 'Open the Kestrel product demo on LinkedIn',
      ctas: [
        {
          href: kestrelDemoUrl,
          label: 'Open Demo',
          ariaLabel: 'Open the Kestrel product demo on LinkedIn',
          external: true,
          variant: 'primary',
        },
        {
          href: '/projects/kestrel',
          label: 'View Case Study',
          variant: 'secondary',
        },
      ],
    },

    overview:
      'Kestrel is an AI career intelligence system that transforms job descriptions into structured role signals and comparative guidance for the next step a candidate should take.',

    problem:
      'Job seekers often work from scattered advice, repeated resume edits, and unclear role expectations without a structured way to prioritize what matters for a specific opportunity.',

    users:
      'Built for candidates who need a clearer way to compare their background against a target job and decide where to focus preparation time.',

    solution:
      'Kestrel uses LLM prompts and JSON schemas to turn job descriptions into structured action-plan outputs, then presents the result in a comparative dashboard that keeps recommendations transparent and actionable.',

    productLogic:
      'The product leads with orientation first, then action, so users can see what the role asks for before deciding what to improve next.',

    experienceDesign:
      'The interface is built around one principle: messy input, structured output. The dashboard keeps the comparison readable and explainable instead of burying the recommendation in chat.',

    impact:
      'The project reframed career prep from generic advice into a structured decision view focused on fit, gaps, and next steps.',

    buildNotes:
      'The main technical challenge was turning inconsistent job descriptions into consistent structured outputs. Typed schemas kept the AI workflow explainable and easier to compare across roles.',

    reflection:
      'Prioritizing explainability over a generic chatbot clarified the product: users needed a transparent comparison and concrete next steps, not more open-ended advice.',
  },
]
