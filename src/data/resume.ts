export type Accent = 'react' | 'dotnet' | 'data' | 'cloud'

export const profile = {
  name: 'Aditi Navhal',
  role: 'Full-Stack Software Engineer',
  tagline: ['C# / .NET', 'React', 'Next.js', 'TypeScript', 'SQL'],
  positioning:
    'Building scalable fintech and enterprise applications across frontend, backend, APIs, payments, authentication and data systems.',
  years: 3,
  /** Served from public/; resolved against the Vite base at render time. */
  resumeFile: 'Aditi_Navhal_Resume.pdf',
  location: 'Delhi NCR, India',
  email: 'aditinavhal01@gmail.com',
  /** Gmail's web compose, prefilled. A bare mailto: does nothing on machines
   *  with no mail client configured, which is most of them. */
  emailHref:
    'https://mail.google.com/mail/?view=cm&fs=1&to=aditinavhal01%40gmail.com&su=' +
    encodeURIComponent('Hello Aditi — via your portfolio'),
  phone: '+91-8769589069',
  linkedin: 'https://www.linkedin.com/in/aditi-navhal-952b57193/',
  github: 'https://github.com/aditin22',
  summary:
    'Software Engineer with 3 years of experience building and modernizing enterprise applications using C#, .NET Core, React, TypeScript, SQL, and REST APIs. Experienced in end-to-end product development, secure authentication and RBAC, payment integrations, data-intensive financial systems, and reliable offline-to-cloud synchronization. Strong foundation in OOP, system design, API development, testing, database design, and Agile delivery.',
}

export const stats = [
  { value: 3, suffix: '', label: 'Years professional engineering' },
  { value: 4, suffix: '', label: 'Product surfaces owned' },
  { value: 100, suffix: '+', label: 'B2B services supported' },
  { value: 26, suffix: '', label: 'Entities synchronized' },
  { value: 100, suffix: '+', label: 'Financial reports automated' },
  { value: 10, suffix: '+', label: 'Production releases' },
]

export type Role = {
  company: string
  companyNote?: string
  title: string
  location: string
  period: string
  current: boolean
  /** Two lines, not the resume bullets. */
  summary: string
  /** Case-study ids this role links to. */
  caseStudies: string[]
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
    summary:
      'Own four FylFlix product surfaces end to end — shared design system, auth and RBAC, payments — and built the .NET service that syncs on-premise Tally data to the cloud.',
    caseStudies: ['fylflix', 'tally'],
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
    summary:
      'Modernized a live hedge-fund reconciliation platform from .NET Framework to .NET Core + React, and automated 100+ financial reports for PwC, Carronade and Aurelius.',
    caseStudies: ['recon'],
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

export const whatIBuild: { icon: string; title: string; body: string; accent: Accent }[] = [
  {
    icon: 'Layers',
    accent: 'react',
    title: 'Full-stack products',
    body: 'React and Next.js frontends backed by scalable .NET APIs and relational databases.',
  },
  {
    icon: 'Landmark',
    accent: 'data',
    title: 'Financial systems',
    body: 'Payments, reconciliation, reporting, synchronization and data-intensive workflows.',
  },
  {
    icon: 'ShieldCheck',
    accent: 'dotnet',
    title: 'Secure platforms',
    body: 'OAuth 2.0, JWT, RBAC, multi-organization permissions and secure integrations.',
  },
]

export type CaseStudy = {
  id: string
  index: string
  name: string
  kicker: string
  org: string
  period: string
  accent: Accent
  stack: string[]
  problem: string
  owned: string[]
  /** Horizontal step chains — the architecture the audit asked to see. */
  flows: { title: string; steps: string[] }[]
  challenges: { title: string; body: string }[]
  impact: { value: string; label: string }[]
  /** Which interactive diagram in the Architecture section to open. */
  diagram?: 'tally' | 'fylflix'
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fylflix',
    index: '01',
    name: 'FylFlix Platform',
    kicker: 'Production fintech & compliance platform',
    org: 'WFYI Technology',
    period: 'Jan 2026 — Present',
    accent: 'react',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'OAuth 2.0', 'JWT', 'Razorpay'],
    problem:
      'Customer and internal workflows had to run across four surfaces — B2C, B2B, Legal and Admin — on one auth core and one design system, with organization boundaries enforced everywhere.',
    owned: [
      'Four frontend applications',
      'Shared UI / design system',
      'Authentication & workspaces',
      'Multi-organization RBAC',
      'B2B discovery · 100+ services',
      'Payments & subscriptions',
      'Legal booking & messaging',
      'Document workflows',
      'Analytics dashboards',
    ],
    flows: [
      {
        title: 'Authentication',
        steps: ['Google OAuth', 'Secure callback', 'JWT', 'Refresh token', 'Workspace', 'RBAC'],
      },
      {
        title: 'Payments',
        steps: ['Checkout', 'Razorpay', 'Polling', 'Server verification', 'Idempotent activation', 'GST invoice'],
      },
    ],
    challenges: [
      {
        title: 'One auth core, four surfaces',
        body: 'A single OAuth 2.0 / JWT flow with secure callbacks and refresh-token handling, shared by every product instead of re-implemented per app.',
      },
      {
        title: 'Trust the server, not the client',
        body: 'Payment state is polled and verified server-side before anything activates, and activation is idempotent — a retried callback can never double-activate a plan.',
      },
      {
        title: 'Organization boundaries',
        body: 'Multi-org RBAC is enforced before a query is issued, so no surface can reach across a tenant by accident.',
      },
    ],
    impact: [
      { value: '4', label: 'Product surfaces' },
      { value: '100+', label: 'B2B services' },
      { value: '1', label: 'Shared design system' },
      { value: 'Live', label: 'Razorpay subscriptions' },
    ],
    diagram: 'fylflix',
  },
  {
    id: 'tally',
    index: '02',
    name: 'Tally Connector',
    kicker: 'Offline-to-cloud synchronization engine',
    org: 'WFYI Technology',
    period: '2026',
    accent: 'dotnet',
    stack: ['C#', '.NET 10', 'Windows Service', 'SQLite', 'PostgreSQL', 'AWS S3', 'OAuth 2.0', 'xUnit', 'Serilog'],
    problem:
      'On-premise TallyPrime data had to reach cloud workflows reliably — 26 entity types, over connectivity that drops, without ever posting a financial entry twice.',
    owned: [
      '.NET 10 Windows Service',
      'SQLite-backed local processing',
      'Delta synchronization',
      'Idempotent write-back',
      'OAuth 2.0 client credentials',
      'Encrypted secrets & secure IPC',
      'Structured logging',
      'Automated xUnit suite',
    ],
    flows: [
      {
        title: 'Data path',
        steps: ['TallyPrime', 'Windows Service', 'SQLite stage', 'Delta sync', 'AWS S3 · Cloud APIs', 'PostgreSQL'],
      },
    ],
    challenges: [
      {
        title: 'Offline connectivity',
        body: 'Work is staged locally in SQLite, so the service keeps processing when the network disappears and drains the queue when it returns.',
      },
      {
        title: 'Duplicate prevention',
        body: 'Every write-back is idempotent and guarded by reconciliation checks, so a retry after a failure cannot post the same entry twice.',
      },
      {
        title: 'Incremental sync',
        body: 'Delta sync ships only what changed across the 26 entities instead of re-sending everything on each run.',
      },
      {
        title: 'Security',
        body: 'OAuth 2.0 client credentials, encrypted secrets and secure IPC between the service and its host.',
      },
      {
        title: 'Reliability',
        body: 'Serilog structured logging around every sync path, with xUnit tests covering the delta and write-back logic.',
      },
    ],
    impact: [
      { value: '26', label: 'Entities synchronized' },
      { value: '0', label: 'Duplicate postings' },
      { value: '.NET 10', label: 'Windows Service' },
    ],
    diagram: 'tally',
  },
  {
    id: 'recon',
    index: '03',
    name: 'RECON',
    kicker: 'Enterprise hedge-fund reconciliation platform',
    org: 'Indus Valley Partners',
    period: 'Jul 2023 — Jan 2026',
    accent: 'data',
    stack: ['.NET Core', 'REST APIs', 'React', 'SQL Server', 'Database design', 'SSRS', 'SSIS'],
    problem:
      'A legacy .NET Framework reconciliation platform that hedge funds close their books on had to be modernized — without disrupting the clients running on it.',
    owned: [
      '.NET Framework → .NET Core migration',
      'REST API layer',
      'React component library',
      'SQL schema & database design',
      'Reconciliation workflows',
      'Peer reviews & mentoring',
    ],
    flows: [
      {
        title: 'Modernization',
        steps: ['.NET Framework', 'Legacy UI', '→', '.NET Core', 'REST APIs', 'React', 'Reusable components'],
      },
    ],
    challenges: [
      {
        title: 'Modernize in place',
        body: 'Moved a live financial application to .NET Core + React while it stayed in production for clients.',
      },
      {
        title: 'End to end',
        body: 'Owned modules from SQL design through .NET Core REST APIs to reusable React components — 10+ production feature releases.',
      },
      {
        title: 'Reporting accuracy',
        body: 'Validation, data-processing and workflow enhancements that improved reconciliation reporting for hedge-fund operations.',
      },
      {
        title: 'Client reporting, alongside',
        body: '100+ SSRS financial and compliance reports for PwC, Carronade Capital and Aurelius — Taxlot, Gain & Loss, Security Master, liquidity, counterparty, portfolio — with SQL/SSIS ETL cut from ~6 hours to 2.',
      },
    ],
    impact: [
      { value: '+30%', label: 'Performance' },
      { value: '25%', label: 'Faster release cycles' },
      { value: '10+', label: 'Production releases' },
      { value: '100+', label: 'Reports automated' },
    ],
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
