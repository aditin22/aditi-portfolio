export type Accent = 'react' | 'dotnet' | 'data' | 'cloud'

export const profile = {
  name: 'Aditi Navhal',
  /** Non-breaking hyphen (U+2011): stops the hero headline breaking after "Full-". */
  role: 'Product Manager & Full‑Stack Engineer',
  /** The two halves, named. Rendered as the hero's stack rail. */
  tagline: ['Discovery & PRDs', 'Roadmap', 'React / Next.js', 'C# / .NET', 'SQL'],
  positioning:
    'Three years across fintech, legaltech and industrial B2B. I run the discovery and write the requirements, then build the product in React, Next.js, C# and SQL.',
  years: 3,
  /** Served from public/; resolved against the Vite base at render time. */
  resumeFile: 'Aditi_Navhal_Resume.pdf',
  location: 'Delhi NCR, India',
  email: 'aditinavhal01@gmail.com',
  /** Gmail's web compose, prefilled. A bare mailto: does nothing on machines
   *  with no mail client configured, which is most of them. */
  emailHref:
    'https://mail.google.com/mail/?view=cm&fs=1&to=aditinavhal01%40gmail.com&su=' +
    encodeURIComponent('Hello Aditi - via your portfolio'),
  phone: '+91-8769589069',
  linkedin: 'https://www.linkedin.com/in/aditi-navhal-952b57193/',
  github: 'https://github.com/aditin22',
  summary:
    'Product-focused engineer with 3 years across fintech, legaltech and industrial B2B. I run discovery with stakeholders, author the PRDs and BRDs and own the roadmap, then build in React, Next.js, TypeScript and C#/.NET over SQL Server and PostgreSQL. Shipped a 0-to-1 buyer platform as a freelance engagement, a four-surface services platform that reached 500+ sign-ups in one filing season, an offline-to-cloud financial sync service, and a hedge-fund reconciliation platform modernisation.',
}

/** Six figures: three product outcomes, three engineering ones. */
export const stats = [
  { value: 3, suffix: '', label: 'Years shipping products' },
  { value: 500, suffix: '+', label: 'Sign-ups in one filing season' },
  { value: 180, suffix: '+', label: 'Service pages launched' },
  { value: 100, suffix: '+', label: 'Financial reports automated' },
  { value: 26, suffix: '', label: 'Tally entities synchronized' },
  { value: 15, suffix: '+', label: 'Analytics events specified' },
]

/* ────────────────────────────────────────────────────────────────────────────
   PROJECTS

   The front door. Every entry answers the same four questions in the same
   order - problem, what I personally did, what happened, where to see it -
   because that is what someone screening an application actually reads.

   `links` is never empty. Where the code is employer-owned or under a client
   NDA there is no repository to give, so the link points at the interactive
   architecture diagram further down the page and says plainly why. Inventing
   a dead demo URL would be worse than admitting the constraint.
   ──────────────────────────────────────────────────────────────────────────── */

export type ProjectLink = {
  label: string
  href: string
  /** `demo` and `repo` are the two a reviewer scans for; `internal` is honest about NDA work. */
  kind: 'demo' | 'repo' | 'case' | 'internal'
}

export type Project = {
  id: string
  index: string
  name: string
  kicker: string
  org: string
  period: string
  accent: Accent
  /** Where the work sat on the product/engineering line. Sums to 100. */
  split: { product: number; engineering: number }
  /** One sentence each. Four lines, no more. */
  problem: string
  did: string
  happened: string
  links: ProjectLink[]
  stack: string[]
  /** Headline hat worn, shown as a chip beside the title. */
  hat: string
}

export const projects: Project[] = [
  {
    id: 'urjasetu',
    index: '01',
    name: 'UrjaSetu BioEnergy',
    kicker: '0-to-1 buyer platform for industrial biomass fuel',
    org: 'Freelance',
    period: 'Sep 2026 - Present',
    accent: 'data',
    hat: 'Product + build',
    split: { product: 70, engineering: 30 },
    problem:
      'Factories across Delhi NCR buy boiler fuel over WhatsApp and phone calls - no published specifications, no comparable pricing, and no way to tell a real supplier from a broker reselling someone else’s stock.',
    did:
      'Ran discovery into the client’s offline sales process, authored the PRDs and BRDs, owned the roadmap with a 2-person engineering team, and designed the funnel myself: a 4-question Fuel Finder, a fuel-switch calculator and a supplier checklist that all feed one context-prefilled quote form.',
    happened:
      'Shipped the first version for client review in October and folded their feedback straight back in; they now demo it to existing buyers ahead of an IndiaMART and Google launch. 15+ analytics events instrument quotes, recommendations, calculator runs and contacts.',
    links: [
      { label: 'Live site', href: 'https://urjasetu-alpha.vercel.app', kind: 'demo' },
      { label: 'Repo is private, client work', href: '', kind: 'internal' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },
  {
    id: 'fylflix',
    index: '02',
    name: 'FylFlix',
    kicker: 'Legal, tax and finance services platform - four surfaces, one core',
    org: 'WFYI Technology',
    period: 'Jan 2026 - Aug 2026',
    accent: 'react',
    hat: 'Product owner + full-stack',
    split: { product: 45, engineering: 55 },
    problem:
      'One company selling legal, tax and finance services to four different kinds of customer, on four separate surfaces - and every new service page was hand-built by an engineer.',
    did:
      'Defined the customer journeys for four user segments, authored the PRDs and BRDs and led a 5 to 7 person cross-functional group - then built the shared React/Next.js design system, the OAuth 2.0 + JWT auth core, multi-organization RBAC and the Razorpay checkout, plus a configuration-driven page template non-engineers could use.',
    happened:
      '500+ ITR sign-ups in one filing season, 12 business clients on the finance suite, and 180+ public service pages live - new ones now ship without any engineering work at all.',
    links: [
      { label: 'Live product', href: 'https://fylflix.com', kind: 'demo' },
      { label: 'Architecture walkthrough', href: '#architecture', kind: 'case' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'OAuth 2.0', 'JWT', 'Razorpay'],
  },
  {
    id: 'aurora',
    index: '03',
    name: 'Aurora UI',
    kicker: 'Accessible React component library, built from scratch',
    org: 'Open source - MIT',
    period: '2026',
    accent: 'cloud',
    hat: 'Engineering',
    split: { product: 15, engineering: 85 },
    problem:
      'Component libraries look right and fall apart the moment you unplug the mouse. The hard problems in a design system are focus management, keyboard navigation and ARIA relationships that stay correct as content changes.',
    did:
      'Built 12 components with no headless-UI dependency, writing the focus trap, roving tabindex, typeahead, scroll lock and inert handling myself and exporting them as hooks, on a two-layer token system where dark mode redefines only the semantic layer.',
    happened:
      'axe-core runs against every story and fails CI, so an accessibility regression blocks the build instead of landing. 16.3 kB brotli, ESM-only and correctly externalised, with every interaction test a story you can open and watch replay.',
    links: [
      { label: 'Live Storybook', href: 'https://aditin22.github.io/aurora-ui/storybook/', kind: 'demo' },
      { label: 'GitHub repo', href: 'https://github.com/aditin22/aurora-ui', kind: 'repo' },
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Storybook', 'axe-core'],
  },
  {
    id: 'tally',
    index: '04',
    name: 'Tally Connector',
    kicker: 'Offline-to-cloud financial synchronization service',
    org: 'WFYI Technology',
    period: '2026',
    accent: 'dotnet',
    hat: 'Engineering',
    split: { product: 15, engineering: 85 },
    problem:
      'On-premise TallyPrime data had to reach cloud workflows across 26 entity types, over office connectivity that drops - without ever posting a financial entry twice.',
    did:
      'Built a .NET 10 / C# Windows Service that stages every change in SQLite first, delta-syncs only what moved to AWS S3 and PostgreSQL, and makes each write-back idempotent behind reconciliation checks, with encrypted secrets, structured logging and an xUnit suite over the sync paths.',
    happened:
      '20 installs in its first week, and no duplicate postings - a retry after a dropped connection re-sends the same work without charging the books twice.',
    links: [
      { label: 'Interactive architecture', href: '#architecture', kind: 'case' },
      { label: 'Source is employer-owned', href: '', kind: 'internal' },
    ],
    stack: ['C#', '.NET 10', 'Windows Service', 'SQLite', 'PostgreSQL', 'AWS S3', 'xUnit'],
  },
  {
    id: 'recon',
    index: '05',
    name: 'RECON',
    kicker: 'Hedge-fund reconciliation platform, modernised in place',
    org: 'Indus Valley Partners',
    period: 'Jul 2023 - Dec 2025',
    accent: 'data',
    hat: 'Engineering + client-facing',
    split: { product: 25, engineering: 75 },
    problem:
      'A legacy .NET Framework platform that hedge funds close their books on had to be modernised - while it stayed in production for the clients running on it.',
    did:
      'Led a 3 to 4 person team through the migration to .NET Core with a React front end, delivering 10+ production features end to end - SQL Server schema and indexing, .NET Core Web APIs, React components - and sat directly with Aurelius Capital Management translating their reconciliation problems into the backlog.',
    happened:
      '30% faster, 25% quicker release cycles. Alongside it, 100+ SSRS financial and compliance reports automated for PwC, Carronade and Aurelius, with a key ETL workflow cut from roughly 6 hours to 2.',
    links: [
      { label: 'Case study', href: '#case-recon', kind: 'case' },
      { label: 'Enterprise product - no public repo', href: '', kind: 'internal' },
    ],
    stack: ['.NET Core', 'C#', 'React', 'SQL Server', 'SSRS', 'SSIS', 'T-SQL'],
  },
]

export type Role = {
  company: string
  companyNote?: string
  /** Shown as a neutral chip where the engagement is not a staff role. */
  kind?: string
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
    company: 'UrjaSetu BioEnergy',
    title: 'Product manager and developer',
    kind: 'Freelance',
    location: 'Delhi NCR, India',
    period: 'Sep 2026 - Present',
    current: true,
    summary:
      'A freelance engagement taking a biomass-fuel buyer platform from discovery to production: stakeholder interviews, PRDs and BRDs, the roadmap, and the quote funnel itself, with a 2-person engineering team.',
    caseStudies: ['urjasetu'],
    projects: [
      {
        name: 'UrjaSetu Platform',
        subtitle: '0-to-1 industrial buyer journey',
        accent: 'data',
        metrics: [
          { value: '12', label: 'NCR industrial hubs' },
          { value: '15+', label: 'analytics events' },
          { value: '4', label: 'question Fuel Finder' },
          { value: 'Live', label: 'client-facing' },
        ],
        bullets: [
          'Led discovery, PRDs/BRDs and the roadmap for a 0-to-1 biomass fuel buyer platform targeting 12 NCR industrial hubs, working with a 2-person engineering team.',
          'Designed a quote-generation journey connecting a 4-question Fuel Finder, a fuel-switch calculator and a supplier checklist to a context-prefilled inquiry form.',
          'Prioritised conservative fuel-equivalence estimates over unverified savings claims so buyers could trust the numbers, and built market-sizing and unit-economics models to inform pricing.',
          'Shipped the first version for client review in October and incorporated their feedback; the client now shows it to existing buyers ahead of an IndiaMART and Google launch.',
          'Specified 15+ analytics events to measure the funnel across quotes, recommendations, calculator use and contacts.',
        ],
      },
    ],
  },
  {
    company: 'WFYI Technology - FylFlix',
    title: 'Software Engineer (Product Ownership)',
    location: 'Delhi NCR, India',
    period: 'Jan 2026 - Aug 2026',
    current: false,
    summary:
      'Owned both the product and the engineering across four FylFlix surfaces - customer journeys, PRDs and a 5 to 7 person cross-functional group on one side; the shared design system, auth core, RBAC and payments on the other.',
    caseStudies: ['fylflix', 'tally'],
    projects: [
      {
        name: 'FylFlix Platform',
        subtitle: 'B2C, B2B, Legal & Admin',
        accent: 'react',
        metrics: [
          { value: '500+', label: 'ITR sign-ups' },
          { value: '180+', label: 'service pages' },
          { value: '12', label: 'business clients' },
          { value: '100+', label: 'B2B services' },
        ],
        bullets: [
          'Defined distinct customer journeys for four user segments across legal, tax and finance, including the end-to-end Talk to Lawyer flow from intake and consultation booking through to Razorpay payment.',
          'Replaced per-page development with a reusable, data-driven template, launching 180+ public service pages and letting non-engineers add new ones without further engineering work.',
          'Owned development across four product surfaces, building reusable React/Next.js components and a shared design system in TypeScript, Radix UI and Tailwind CSS.',
          'Integrated Razorpay payments and subscriptions with polling-based verification, idempotent activation, configurable plans and GST invoice workflows.',
          'Designed shared authentication and workspace flows using OAuth 2.0, JWT, Google OAuth, secure callbacks and refresh-token handling, with multi-organization RBAC.',
          'Scoped a staff admin MVP for 4 roles with the founders, deferring 13 lower-priority features with explicit triggers for revisiting each, such as funnel analytics at 500+ users.',
        ],
      },
      {
        name: 'Tally Connector',
        subtitle: '.NET 10 offline-to-cloud synchronization',
        accent: 'dotnet',
        metrics: [
          { value: '26', label: 'Tally entities' },
          { value: '20', label: 'installs, week one' },
          { value: 'Idempotent', label: 'write-back' },
          { value: 'xUnit', label: 'automated tests' },
        ],
        bullets: [
          'Built a .NET 10 / C# Windows Service synchronizing data across 26 TallyPrime entities with AWS S3 and PostgreSQL-based cloud workflows, reaching 20 installs in its first week.',
          'Designed durable delta-sync and idempotent write-back mechanisms using SQLite-backed processing and reconciliation safeguards to prevent duplicate financial postings.',
          'Secured the service using OAuth 2.0 client credentials, encrypted secrets, secure IPC, structured logging and automated xUnit testing.',
        ],
      },
    ],
  },
  {
    company: 'Indus Valley Partners (IVP)',
    title: 'Software Engineer',
    companyNote: 'Promoted from Associate Software Engineer',
    location: 'Mumbai, Maharashtra',
    period: 'Jul 2023 - Dec 2025',
    current: false,
    summary:
      'Modernized a live hedge-fund reconciliation platform from .NET Framework to .NET Core + React, led a 3 to 4 person team, and automated 100+ financial reports for PwC, Carronade and Aurelius.',
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
          'Led a 3 to 4 member team migrating RECON, an ML-assisted reconciliation platform, from .NET Framework to .NET Core, delivering 10+ production features and 25% faster release cycles.',
          'Partnered with Aurelius Capital Management on hedge-fund reconciliation and reporting workflows, translating client requirements and operational issues into product improvements.',
          'Developed end-to-end modules across SQL database design, .NET Core REST APIs and reusable React components.',
          'Conducted peer code reviews and mentored junior team members while collaborating with QA, product and client-facing teams.',
        ],
      },
      {
        name: 'Client Engagements',
        subtitle: 'PwC, Carronade Capital & Aurelius Capital Management',
        accent: 'data',
        metrics: [
          { value: '100+', label: 'SSRS reports' },
          { value: '6h -> 2h', label: 'ETL runtime' },
          { value: '3', label: 'institutional clients' },
        ],
        bullets: [
          'Developed and automated 100+ SSRS financial and compliance reports covering Taxlot, Gain & Loss, Security Master, liquidity, counterparty and portfolio reporting.',
          'Enhanced SQL/SSIS ETL pipelines, reducing major reporting workflows from approximately 6 hours to 2 hours and improving month-end processing by 30%.',
        ],
      },
    ],
  },
]

/** The four things I actually do, in the order they happen on a project. */
export const whatIBuild: { icon: string; title: string; body: string; accent: Accent }[] = [
  {
    icon: 'Search',
    accent: 'data',
    title: 'Discovery & PRDs',
    body: 'Stakeholder interviews, customer journeys for each segment, PRDs and BRDs, and a roadmap with the deferrals written down.',
  },
  {
    icon: 'Layers',
    accent: 'react',
    title: 'Full-stack build',
    body: 'React and Next.js front ends on a shared design system, backed by C#/.NET services and relational databases.',
  },
  {
    icon: 'ShieldCheck',
    accent: 'dotnet',
    title: 'Money-safe systems',
    body: 'Payments, reconciliation and synchronization where a retry must never charge twice - OAuth 2.0, JWT, RBAC, idempotency.',
  },
  {
    icon: 'LineChart',
    accent: 'cloud',
    title: 'Measurement',
    body: 'Analytics events specified up front, funnel analysis, unit economics and market sizing - so the next decision has numbers behind it.',
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
  /** Horizontal step chains - the architecture the audit asked to see. */
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
    period: 'Jan 2026 - Present',
    accent: 'react',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'OAuth 2.0', 'JWT', 'Razorpay'],
    problem:
      'Customer and internal workflows had to run across four surfaces - B2C, B2B, Legal and Admin - on one auth core and one design system, with organization boundaries enforced everywhere.',
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
        body: 'Payment state is polled and verified server-side before anything activates, and activation is idempotent - a retried callback can never double-activate a plan.',
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
      'On-premise TallyPrime data had to reach cloud workflows reliably - 26 entity types, over connectivity that drops, without ever posting a financial entry twice.',
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
    period: 'Jul 2023 - Jan 2026',
    accent: 'data',
    stack: ['.NET Core', 'REST APIs', 'React', 'SQL Server', 'Database design', 'SSRS', 'SSIS'],
    problem:
      'A legacy .NET Framework reconciliation platform that hedge funds close their books on had to be modernized - without disrupting the clients running on it.',
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
        body: 'Owned modules from SQL design through .NET Core REST APIs to reusable React components - 10+ production feature releases.',
      },
      {
        title: 'Reporting accuracy',
        body: 'Validation, data-processing and workflow enhancements that improved reconciliation reporting for hedge-fund operations.',
      },
      {
        title: 'Client reporting, alongside',
        body: '100+ SSRS financial and compliance reports for PwC, Carronade Capital and Aurelius - Taxlot, Gain & Loss, Security Master, liquidity, counterparty, portfolio - with SQL/SSIS ETL cut from ~6 hours to 2.',
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
  /** Which shipped projects this layer actually carried - taken from the roles above. */
  usedIn: string[]
  items: string[]
}[] = [
  {
    group: 'Product',
    accent: 'data',
    icon: 'Compass',
    usedIn: ['UrjaSetu Platform', 'FylFlix Platform'],
    items: [
      'Product Discovery',
      'Customer Journey Mapping',
      'PRDs & BRDs',
      'MVP Definition',
      'Roadmapping',
      'Prioritization',
      'User Segmentation',
      'Stakeholder Management',
    ],
  },
  {
    group: 'Frontend',
    accent: 'react',
    icon: 'MonitorSmartphone',
    usedIn: ['FylFlix Platform', 'UrjaSetu Platform', 'Aurora UI'],
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'React Query',
      'Zustand',
      'Tailwind CSS',
      'Radix UI',
      'Accessibility (WAI-ARIA)',
    ],
  },
  {
    group: 'Backend',
    accent: 'dotnet',
    icon: 'Server',
    usedIn: ['Tally Connector', 'RECON'],
    items: ['C#', '.NET Core', '.NET 10', 'REST APIs', 'JSON', 'Windows Services', 'OOP', 'Microservices'],
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
    group: 'Analytics & Business',
    accent: 'cloud',
    icon: 'LineChart',
    usedIn: ['UrjaSetu Platform', 'FylFlix Platform'],
    items: [
      'Event Tracking',
      'Funnel Analysis',
      'Product Metrics',
      'Unit Economics',
      'Market Sizing',
      'Monetization',
      'Checkout & Payments',
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
    group: 'Testing & Delivery',
    accent: 'react',
    icon: 'FlaskConical',
    usedIn: ['Tally Connector', 'Aurora UI', 'RECON'],
    items: ['xUnit', 'Unit Testing', 'axe-core', 'CI/CD', 'Git', 'Agile / Scrum', 'AWS S3'],
  },
]

export const education = {
  school: 'Mukesh Patel School of Technology Management & Engineering',
  university: 'NMIMS',
  degree: 'B.Tech, Information Technology',
  period: '2019 - 2023',
  cgpa: 3.99,
  cgpaMax: 4.0,
  rank: 1,
  percentile: 99,
}

/** Everything outside the code - kept as icon + short label, no prose. */
export const highlights: { icon: string; label: string; detail: string }[] = [
  { icon: 'Users', label: 'Led 5-7 people', detail: 'Cross-functional, FylFlix' },
  { icon: 'Palette', label: 'Head of Atrangi', detail: 'Art Committee, NMIMS' },
  { icon: 'Mic', label: 'Ambiora & YSF', detail: 'Tech Fest - Youth Speaking Forum' },
  { icon: 'Trophy', label: 'State level', detail: 'Badminton' },
]

export const marquee = [
  'Product Discovery',
  'PRDs & BRDs',
  'Roadmapping',
  'React',
  'Next.js',
  'TypeScript',
  'C#',
  '.NET Core',
  '.NET 10',
  'Tailwind CSS',
  'Radix UI',
  'PostgreSQL',
  'SQL Server',
  'SQLite',
  'SSRS',
  'SSIS',
  'AWS S3',
  'OAuth 2.0',
  'JWT',
  'xUnit',
  'Funnel Analysis',
  'Unit Economics',
  'Git',
]
