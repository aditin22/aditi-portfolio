export type Accent = 'react' | 'dotnet' | 'data' | 'cloud'

export const profile = {
  name: 'Aditi Navhal',
  role: 'Software Engineer',
  tagline: ['C# / .NET Core', 'React / TypeScript', 'SQL', 'REST APIs'],
  location: 'Delhi NCR, India',
  email: 'aditinavhal01@gmail.com',
  phone: '+91-8769589069',
  linkedin: 'https://www.linkedin.com/in/aditi-navhal-952b57193/',
  github: 'https://github.com/aditin22',
  summary:
    'Software Engineer with 3 years of experience building and modernizing enterprise applications using C#, .NET Core, React, TypeScript, SQL, and REST APIs. Experienced in end-to-end product development, secure authentication and RBAC, payment integrations, data-intensive financial systems, and reliable offline-to-cloud synchronization. Strong foundation in OOP, system design, API development, testing, database design, and Agile delivery.',
}

export const stats = [
  { value: 3, suffix: '+', label: 'Years shipping production software' },
  { value: 100, suffix: '+', label: 'B2B services delivered on FylFlix' },
  { value: 30, suffix: '%', label: 'Performance gain on RECON modernization' },
  { value: 26, suffix: '', label: 'TallyPrime entities synced to cloud' },
]

export type Role = {
  company: string
  companyNote?: string
  title: string
  location: string
  period: string
  current: boolean
  projects: {
    name: string
    subtitle: string
    accent: Accent
    metrics: { value: string; label: string }[]
    bullets: string[]
  }[]
}

export const experience: Role[] = [
  {
    company: 'WFYI Technology — FylFlix',
    title: 'Software Engineer',
    location: 'Delhi NCR, India',
    period: 'Jan 2026 — Present',
    current: true,
    projects: [
      {
        name: 'FylFlix Platform',
        subtitle: 'B2C, B2B, Legal & Admin',
        accent: 'react',
        metrics: [
          { value: '4', label: 'product surfaces' },
          { value: '100+', label: 'B2B services' },
          { value: 'Razorpay', label: 'payments & GST' },
          { value: 'OAuth 2.0', label: 'shared auth' },
        ],
        bullets: [
          'Owned development across four FylFlix product surfaces, building reusable React/Next.js components and a shared design system using TypeScript, Radix UI, and Tailwind CSS.',
          'Delivered a B2B platform covering 100+ services, including search and discovery, analytics dashboards, document workflows, calendar features, and multi-organization RBAC.',
          'Integrated Razorpay payments and subscriptions, implementing polling-based payment verification, idempotent activation, configurable plans, and GST invoice workflows.',
          'Built Legal workflows for lawyer booking, quotations, cart and checkout, and real-time-style messaging with pagination and unread indicators.',
          'Designed and implemented shared authentication and workspace flows using OAuth 2.0, JWT authentication, Google OAuth, secure callbacks, and refresh-token handling.',
        ],
      },
      {
        name: 'Tally Connector',
        subtitle: '.NET Offline-to-Cloud Synchronization',
        accent: 'dotnet',
        metrics: [
          { value: '26', label: 'Tally entities' },
          { value: '.NET 10', label: 'Windows Service' },
          { value: 'Idempotent', label: 'write-back' },
          { value: 'xUnit', label: 'automated tests' },
        ],
        bullets: [
          'Built a .NET 10 / C# Windows Service synchronizing data across 26 TallyPrime entities with AWS S3 and PostgreSQL-based cloud workflows.',
          'Designed durable delta-sync and idempotent write-back mechanisms using SQLite-backed processing and reconciliation safeguards to prevent duplicate financial postings.',
          'Secured the service using OAuth 2.0 client credentials, encrypted secrets, secure IPC, structured logging, and automated xUnit testing.',
        ],
      },
    ],
  },
  {
    company: 'Indus Valley Partners (IVP)',
    title: 'Software Engineer',
    companyNote: 'Promoted from Associate Software Engineer',
    location: 'Mumbai, Maharashtra',
    period: 'Jul 2023 — Jan 2026',
    current: false,
    projects: [
      {
        name: 'RECON',
        subtitle: 'Hedge Fund Reconciliation Platform',
        accent: 'dotnet',
        metrics: [
          { value: '+30%', label: 'performance' },
          { value: '25%', label: 'faster releases' },
          { value: '10+', label: 'feature releases' },
        ],
        bullets: [
          'Modernized a legacy financial application from .NET Framework to .NET Core + React, contributing to a 30% performance improvement and 25% faster release cycles.',
          'Developed end-to-end modules across SQL database design, .NET Core REST APIs, and reusable React components, contributing to 10+ production feature releases.',
          'Built reconciliation workflows for hedge-fund operations and improved reporting accuracy through validation, data-processing, and workflow enhancements.',
          'Conducted peer code reviews and mentored junior team members while collaborating with QA, product, and client-facing teams.',
        ],
      },
      {
        name: 'Client Engagements',
        subtitle: 'PwC, Carronade Capital & Aurelius Capital Management',
        accent: 'data',
        metrics: [
          { value: '100+', label: 'SSRS reports' },
          { value: '6h → 2h', label: 'ETL runtime' },
          { value: '3', label: 'institutional clients' },
        ],
        bullets: [
          'Developed and automated 100+ SSRS financial and compliance reports covering Taxlot, Gain & Loss, Security Master, liquidity, counterparty, and portfolio reporting.',
          'Enhanced SQL/SSIS ETL pipelines, reducing major reporting workflows from approximately 6 hours to 2 hours and improving month/year-end processing efficiency.',
        ],
      },
    ],
  },
]

export type Project = {
  id: string
  name: string
  subtitle: string
  org: string
  period: string
  accent: Accent
  blurb: string
  highlights: { label: string; value: string }[]
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'fylflix',
    name: 'FylFlix Platform',
    subtitle: 'B2C · B2B · Legal · Admin',
    org: 'WFYI Technology',
    period: '2026 — Present',
    accent: 'react',
    blurb:
      'Four product surfaces on one shared design system. Search and discovery, analytics dashboards, document workflows, calendar, and multi-organization RBAC — plus Razorpay subscriptions with idempotent activation and GST invoicing.',
    highlights: [
      { label: 'Services live', value: '100+' },
      { label: 'Product surfaces', value: '4' },
      { label: 'Payments', value: 'Razorpay' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Radix UI', 'Tailwind CSS', 'OAuth 2.0', 'JWT'],
  },
  {
    id: 'tally',
    name: 'Tally Connector',
    subtitle: 'Offline-to-Cloud Synchronization',
    org: 'WFYI Technology',
    period: '2026',
    accent: 'dotnet',
    blurb:
      'A .NET 10 Windows Service that keeps 26 TallyPrime entities in step with the cloud. Durable delta-sync, idempotent write-back and reconciliation safeguards mean a retry can never post a financial entry twice.',
    highlights: [
      { label: 'Entities synced', value: '26' },
      { label: 'Duplicate postings', value: 'Zero' },
      { label: 'Runtime', value: '.NET 10' },
    ],
    stack: ['C#', '.NET 10', 'Windows Service', 'SQLite', 'PostgreSQL', 'AWS S3', 'xUnit', 'Serilog'],
  },
  {
    id: 'recon',
    name: 'RECON',
    subtitle: 'Hedge Fund Reconciliation Platform',
    org: 'Indus Valley Partners',
    period: '2023 — 2026',
    accent: 'data',
    blurb:
      'Modernized a legacy .NET Framework financial platform to .NET Core + React, end to end — SQL schema design, REST APIs, and a reusable React component layer that carried 10+ production feature releases.',
    highlights: [
      { label: 'Performance', value: '+30%' },
      { label: 'Release cycles', value: '25% faster' },
      { label: 'Feature releases', value: '10+' },
    ],
    stack: ['.NET Core', 'React', 'SQL Server', 'REST APIs', 'Database Design'],
  },
  {
    id: 'clients',
    name: 'Client Engagements',
    subtitle: 'PwC · Carronade Capital · Aurelius Capital',
    org: 'Indus Valley Partners',
    period: '2023 — 2026',
    accent: 'cloud',
    blurb:
      'Automated 100+ SSRS financial and compliance reports — Taxlot, Gain & Loss, Security Master, liquidity, counterparty and portfolio — and tuned the SQL/SSIS ETL pipelines feeding them.',
    highlights: [
      { label: 'Reports automated', value: '100+' },
      { label: 'Pipeline runtime', value: '6h → 2h' },
      { label: 'Clients', value: '3' },
    ],
    stack: ['SSRS', 'SSIS', 'SQL', 'ETL', 'Reporting'],
  },
]

export const skills: {
  group: string
  accent: Accent
  /** lucide icon name */
  icon: string
  /** Which shipped projects this layer actually carried — taken from the roles above. */
  usedIn: string[]
  items: string[]
}[] = [
  {
    group: 'Backend',
    accent: 'dotnet',
    icon: 'Server',
    usedIn: ['Tally Connector', 'RECON'],
    items: ['C#', '.NET Core', '.NET 10', 'REST APIs', 'JSON', 'Windows Services', 'OOP'],
  },
  {
    group: 'Frontend',
    accent: 'react',
    icon: 'MonitorSmartphone',
    usedIn: ['FylFlix Platform', 'RECON'],
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'React Query',
      'Zustand',
      'Tailwind CSS',
      'Radix UI',
    ],
  },
  {
    group: 'Databases & Data',
    accent: 'data',
    icon: 'Database',
    usedIn: ['Client Engagements', 'Tally Connector', 'RECON'],
    items: [
      'SQL',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Database Design',
      'Indexes',
      'Views',
      'SSRS',
      'SSIS',
      'ETL',
    ],
  },
  {
    group: 'Security & Architecture',
    accent: 'cloud',
    icon: 'ShieldCheck',
    usedIn: ['FylFlix Platform', 'Tally Connector'],
    items: [
      'OAuth 2.0',
      'JWT',
      'RBAC',
      'Idempotency',
      'System Design',
      'Application Architecture',
    ],
  },
  {
    group: 'Testing & Tools',
    accent: 'react',
    icon: 'FlaskConical',
    usedIn: ['Tally Connector', 'RECON'],
    items: ['xUnit', 'Unit Testing', 'Git', 'Agile / Scrum', 'Serilog'],
  },
  {
    group: 'Cloud',
    accent: 'cloud',
    icon: 'Cloud',
    usedIn: ['Tally Connector'],
    items: ['AWS S3'],
  },
]

export const education = {
  school: 'Mukesh Patel School of Technology Management & Engineering',
  university: 'NMIMS',
  degree: 'B.Tech, Information Technology',
  period: '2019 — 2023',
  cgpa: 3.99,
  cgpaMax: 4.0,
  rank: 1,
  percentile: 99,
}

/** Everything outside the code — kept as icon + short label, no prose. */
export const highlights: { icon: string; label: string; detail: string }[] = [
  { icon: 'Users', label: 'Led a team of 3', detail: 'Core application re-architecture' },
  { icon: 'Palette', label: 'Head of Atrangi', detail: 'Art Committee, NMIMS' },
  { icon: 'Mic', label: 'Ambiora & YSF', detail: 'Tech Fest · Youth Speaking Forum' },
  { icon: 'Trophy', label: 'State level', detail: 'Badminton' },
]

export const marquee = [
  'C#',
  '.NET Core',
  '.NET 10',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Radix UI',
  'React Query',
  'Zustand',
  'PostgreSQL',
  'SQL Server',
  'SQLite',
  'SSRS',
  'SSIS',
  'AWS S3',
  'OAuth 2.0',
  'JWT',
  'xUnit',
  'Serilog',
  'Git',
]
