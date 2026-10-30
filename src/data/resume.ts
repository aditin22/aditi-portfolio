export type Accent = 'react' | 'dotnet' | 'data' | 'cloud'

export const profile = {
  name: 'Aditi Navhal',
  /** Non-breaking hyphen (U+2011): stops the hero headline breaking after "Full-". */
  role: 'Software Engineer with Product Ownership',
  /** The two halves, named. Rendered as the hero's stack rail. */
  tagline: ['Discovery & PRDs', 'Roadmap', 'React / Next.js', 'C# / .NET', 'SQL'],
  positioning:
    'Three years across fintech and legaltech, from customer discovery to production code in React, Next.js, C# and SQL.',
  /** Cycled under the hero headline, one verb of the job at a time. */
  rotator: [
    'talk to the customers.',
    'write the PRD.',
    'cut the MVP.',
    'build it in React and .NET.',
    'measure what shipped.',
  ],
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
  linkedin: 'https://www.linkedin.com/in/aditinavhal/',
  github: 'https://github.com/aditin22',
  summary:
    'Software engineer with product ownership, three years across fintech and legaltech. At FylFlix I owned product decisions with the founders, built the roadmap from 100+ customer conversations and led a team of up to 10, while building the React/Next.js platform, authentication and payments; it reached 500+ ITR sign-ups and 380+ paid filings in one season. At IVP I worked client-facing with Aurelius Capital and led a 3 to 4 person .NET and React re-architecture. Currently leading UrjaSetu, a 0-to-1 client project, from discovery to launch.',
}

/** Professional outcomes only: three from the product side, three from the build. */
export const stats = [
  { value: 100, suffix: '+', label: 'Customer conversations behind a roadmap' },
  { value: 500, suffix: '+', label: 'ITR sign-ups in one filing season' },
  { value: 380, suffix: '+', label: 'Paid filings in the same season' },
  { value: 180, suffix: '+', label: 'Service pages launched' },
  { value: 100, suffix: '+', label: 'Financial reports automated' },
  { value: 26, suffix: '', label: 'Tally entities synchronized' },
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
    id: 'fylflix',
    index: '01',
    name: 'FylFlix',
    kicker: 'Legal, tax and finance services platform, four surfaces on one core',
    org: 'WFYI Technology',
    period: 'Jan 2026 - Aug 2026',
    accent: 'react',
    hat: 'Product owner + full-stack',
    split: { product: 55, engineering: 45 },
    problem:
      'One company selling legal, tax and finance services to four different kinds of customer, on four separate surfaces, and every new service page was hand-built by an engineer.',
    did:
      'Built the roadmap from 100+ customer conversations, cut the staff admin MVP to 4 roles with MoSCoW and led a team of up to 10 across engineering, QA, marketing and social. Then built the shared React/Next.js design system, the OAuth 2.0 + JWT auth core, multi-organization RBAC, the Razorpay checkout and a configuration-driven page template.',
    happened:
      '500+ ITR sign-ups and 380+ paid filings in one filing season, 12 business and 7+ legal clients, about a 25% lift in checkout conversion from discount codes in A/B tests, and 180+ service pages live with no further engineering work.',
    links: [
      { label: 'Live product', href: 'https://fylflix.com', kind: 'demo' },
      { label: 'Architecture walkthrough', href: '#architecture', kind: 'case' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'OAuth 2.0', 'JWT', 'Razorpay'],
  },
  {
    id: 'tally',
    index: '02',
    name: 'Tally Connector',
    kicker: 'Offline-to-cloud financial synchronization service',
    org: 'WFYI Technology',
    period: '2026',
    accent: 'dotnet',
    hat: 'Engineering + launch',
    split: { product: 25, engineering: 75 },
    problem:
      'On-premise TallyPrime data had to reach cloud workflows across 26 entity types, over office connectivity that drops, without ever posting a financial entry twice.',
    did:
      'Built a .NET 10 / C# Windows Service that stages every change in SQLite first, delta-syncs only what moved to AWS S3 and PostgreSQL, and makes each write-back idempotent behind reconciliation checks. Then led its go-to-market alongside the ITR filing season.',
    happened:
      '20 installs in its first week, and no duplicate postings: a retry after a dropped connection re-sends the same work without charging the books twice.',
    links: [
      { label: 'Interactive architecture', href: '#architecture', kind: 'case' },
      { label: 'Source is employer-owned', href: '', kind: 'internal' },
    ],
    stack: ['C#', '.NET 10', 'Windows Service', 'SQLite', 'PostgreSQL', 'AWS S3', 'xUnit'],
  },
  {
    id: 'recon',
    index: '03',
    name: 'RECON',
    kicker: 'Hedge-fund reconciliation platform, modernised in place',
    org: 'Indus Valley Partners',
    period: 'Jul 2023 - Dec 2025',
    accent: 'data',
    hat: 'Team lead + client-facing',
    split: { product: 35, engineering: 65 },
    problem:
      'A legacy .NET Framework platform that hedge funds close their books on had to be modernised while it stayed in production for the clients running on it.',
    did:
      'Ran requirement calls, demos, UAT and root-cause analysis on data breaks with Aurelius Capital Management, and wrote the user stories with acceptance criteria. As lead of a 3 to 4 person team, took the platform to .NET Core with a React front end and decided when each release was ready for production.',
    happened:
      '25% faster releases and 10+ production features. Alongside it, 100+ SSRS financial and compliance reports automated for PwC, Carronade and Aurelius, cutting report runtime by 30% and a key workflow from about 6 hours to 2.',
    links: [
      { label: 'Case study', href: '#case-recon', kind: 'case' },
      { label: 'Enterprise product, no public repo', href: '', kind: 'internal' },
    ],
    stack: ['.NET Core', 'C#', 'React', 'SQL Server', 'SSRS', 'SSIS', 'Azure DevOps'],
  },
  {
    id: 'urjasetu',
    index: '04',
    name: 'UrjaSetu BioEnergy',
    kicker: '0-to-1 B2B buyer platform for industrial biomass fuel',
    org: 'Client project',
    period: 'Sep 2026 - Present',
    accent: 'data',
    hat: 'Product + build',
    split: { product: 60, engineering: 40 },
    problem:
      'Factories across Delhi NCR buy boiler fuel over phone calls and WhatsApp, with no published specifications and no easy way to compare one supplier\u2019s quote against another\u2019s.',
    did:
      'Ran 15 to 20 days of discovery with industrial buyers and boiler operators and wrote the PRDs and BRDs, then built the buyer journey with a 2-person team: a 4-question Fuel Finder and a fuel-switch calculator that qualify leads, a supplier checklist that ranks quotes on delivered cost, and an ops dashboard for incoming enquiries.',
    happened:
      'The first version is live, with go-to-market planned on IndiaMART and Google. KPIs are set around quote requests per week and measured across 16 tracked events, and the calculator gives an energy-equivalent range with its assumptions visible instead of promising savings.',
    links: [
      { label: 'Live site', href: 'https://urjasetu-alpha.vercel.app', kind: 'demo' },
      { label: 'Case study', href: '#case-urjasetu', kind: 'case' },
      { label: 'Repo is private, client work', href: '', kind: 'internal' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },
  {
    id: 'aurora',
    index: '05',
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
    company: 'WFYI Technology - FylFlix',
    title: 'Software Engineer (Product Ownership)',
    location: 'Delhi NCR, India',
    period: 'Jan 2026 - Aug 2026',
    current: false,
    summary:
      'Owned product decisions with the founders and built much of what shipped: the roadmap, PRDs, sprints and the go/no-go call on one side; the shared UI, authentication and payments on the other.',
    caseStudies: ['fylflix', 'tally'],
    projects: [
      {
        name: 'FylFlix Platform',
        subtitle: 'B2C, B2B, Legal & Admin',
        accent: 'react',
        metrics: [
          { value: '500+', label: 'ITR sign-ups' },
          { value: '380+', label: 'paid filings' },
          { value: '~25%', label: 'checkout lift (A/B)' },
          { value: '180+', label: 'service pages' },
        ],
        bullets: [
          'Owned product decisions with the founders, leading a team of up to 10 across engineering, QA, marketing and social, and built the roadmap from 100+ customer conversations.',
          'Prioritised with MoSCoW: cut the staff admin MVP to 4 roles and deferred 13 features, each with a written trigger for revisiting it, such as funnel analytics at 500+ users.',
          'Wrote PRDs, BRDs, user stories and acceptance criteria; wireframed flows in Figma and Google Stitch; ran sprints in Jira and Notion and led UAT through to the go/no-go call.',
          'Chose WhatsApp over a portal for invoice collection, and bounded the Gemini tax projection to two outputs.',
          'Owned monetization: discount codes lifted checkout conversion about 25% in A/B tests. Tracked the funnel from sign-up to paid filing, and user retention, in Google Analytics and Mixpanel.',
          'Replaced per-page development with a reusable, data-driven template, launching 180+ public service pages that non-engineers can add to without engineering work.',
          'Built reusable React/Next.js components and a shared design system in TypeScript, Radix UI and Tailwind CSS across four product surfaces.',
          'Integrated Razorpay payments and subscriptions with polling-based verification, idempotent activation and GST invoices, on a shared OAuth 2.0 / JWT auth core with multi-organization RBAC.',
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
          'Built a .NET 10 / C# Windows Service synchronizing data across 26 TallyPrime entities with AWS S3 and PostgreSQL-based cloud workflows, then led its go-to-market with the ITR season: 20 installs in its first week.',
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
      'Client-facing with Aurelius Capital on a hedge-fund reconciliation platform: requirement calls, demos and UAT on one side, leading a 3 to 4 person team through the .NET Core and React re-architecture on the other.',
    caseStudies: ['recon'],
    projects: [
      {
        name: 'RECON',
        subtitle: 'Hedge Fund Reconciliation Platform',
        accent: 'dotnet',
        metrics: [
          { value: '25%', label: 'faster releases' },
          { value: '10+', label: 'feature releases' },
        ],
        bullets: [
          'Ran requirement calls, demos, UAT and root-cause analysis on data breaks with Aurelius Capital Management, translating their reconciliation issues into the backlog.',
          'Wrote user stories with acceptance criteria for BAs and engineers, planned sprints in Azure DevOps and Jira, and as team lead decided release readiness through QA to production.',
          'Led a 3 to 4 member team migrating RECON, an ML-assisted reconciliation platform, from .NET Framework to .NET Core, delivering 10+ production features and 25% faster release cycles.',
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

/** How I work: the same four steps on every project, each with where it happened. */
export const approach: { title: string; body: string; proof: string; accent: Accent }[] = [
  {
    title: 'Discover',
    accent: 'data',
    body: 'Talk to the people who will use it before a line of the PRD is written.',
    proof: '100+ customer conversations at FylFlix. 15 to 20 days with buyers and boiler operators for UrjaSetu. Requirement calls and root-cause analysis with Aurelius Capital at IVP.',
  },
  {
    title: 'Decide',
    accent: 'cloud',
    body: 'Write the PRD, cut the MVP, and write down what was deferred and what would bring it back.',
    proof: 'MoSCoW cut the FylFlix staff admin MVP to 4 roles, with 13 features deferred behind revisit triggers. WhatsApp chosen over a portal for invoice collection.',
  },
  {
    title: 'Build',
    accent: 'react',
    body: 'Build it with the team, in React, Next.js, C# and SQL, and own the release call.',
    proof: 'The FylFlix design system, auth core and Razorpay checkout. The Tally Connector in .NET 10. The RECON re-architecture with a 3 to 4 person team.',
  },
  {
    title: 'Measure',
    accent: 'dotnet',
    body: 'Instrument it before launch, so the next decision has numbers behind it.',
    proof: 'About a 25% checkout lift from A/B tests. Funnel and retention tracked in Google Analytics and Mixpanel. 16 tracked events on UrjaSetu.',
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
  /** What success looked like, before any of it was built. */
  goal: string
  /** How the needs were learned. Omitted where there was no discovery of note. */
  research?: string[]
  owned: string[]
  /** Horizontal step chains - the architecture the audit asked to see. */
  flows: { title: string; steps: string[] }[]
  challenges: { title: string; body: string }[]
  impact: { value: string; label: string }[]
  /** Which interactive diagram in the Architecture section to open. */
  diagram?: 'tally' | 'fylflix'
  /** Live product, where there is one to open. */
  live?: string
  /** What I would do differently. Rendered only once written. */
  learnings?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fylflix',
    index: '01',
    name: 'FylFlix Platform',
    kicker: 'Customer journeys, MVP scope and full-stack delivery',
    org: 'WFYI Technology',
    period: 'Jan 2026 - Aug 2026',
    accent: 'react',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'OAuth 2.0', 'JWT', 'Razorpay'],
    problem:
      'Customer and internal workflows had to run across four surfaces - B2C, B2B, Legal and Admin - on one auth core and one design system, with organization boundaries enforced everywhere.',
    goal: 'Let four customer segments buy both fixed-price services and custom, multi-stage legal work on one platform, and let the team add new services without an engineer.',
    research: [
      '100+ customer conversations behind the roadmap',
      'Founders, CAs and lawyers aligned on the trade-offs',
      'Funnel from sign-up to paid filing, and retention, in Google Analytics and Mixpanel',
    ],
    owned: [
      'Customer journeys for four segments',
      'PRDs & BRDs',
      'MVP scope & prioritization',
      'A team of up to 10',
      'Four frontend applications',
      'Shared UI / design system',
      'Authentication & workspaces',
      'Multi-organization RBAC',
      'Payments & subscriptions',
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
        title: 'MVP scope with explicit deferrals',
        body: 'Built the roadmap from 100+ customer conversations, then cut the staff admin MVP to four roles with MoSCoW and deferred 13 features, each with a written condition for revisiting it.',
      },
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
      { value: '500+', label: 'ITR sign-ups in one season' },
      { value: '380+', label: 'Paid filings' },
      { value: '~25%', label: 'Checkout lift in A/B tests' },
      { value: '180+', label: 'Service pages launched' },
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
    goal: 'Get every TallyPrime change into cloud workflows, even through an outage, with a retry that can never charge the books twice.',
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
    period: 'Jul 2023 - Dec 2025',
    accent: 'data',
    stack: ['.NET Core', 'REST APIs', 'React', 'SQL Server', 'Database design', 'SSRS', 'SSIS'],
    problem:
      'A legacy .NET Framework reconciliation platform that hedge funds close their books on had to be modernized - without disrupting the clients running on it.',
    goal: 'Move the platform to .NET Core and React while it stayed in production, and ship faster afterwards than before.',
    research: [
      'Requirement calls and demos with Aurelius Capital Management',
      'Root-cause analysis on data breaks',
      'UAT against acceptance criteria before each release',
    ],
    owned: [
      '.NET Framework → .NET Core migration',
      'REST API layer',
      'React component library',
      'SQL schema & database design',
      'Client requirements & workflows',
      'Team delivery & mentoring',
    ],
    flows: [
      {
        title: 'Modernization',
        steps: ['.NET Framework', 'Legacy UI', '→', '.NET Core', 'REST APIs', 'React', 'Reusable components'],
      },
    ],
    challenges: [
      {
        title: 'From client workflows to delivery',
        body: 'Ran requirement calls, demos and UAT with Aurelius Capital Management and wrote the user stories, then delivered the modules across SQL, .NET APIs and React.',
      },
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
      { value: '25%', label: 'Faster release cycles' },
      { value: '10+', label: 'Production releases' },
      { value: '100+', label: 'Reports automated' },
    ],
  },
  {
    id: 'urjasetu',
    index: '04',
    name: 'UrjaSetu BioEnergy',
    kicker: '0-to-1 buyer platform for industrial biomass fuel',
    org: 'Client project',
    period: 'Sep 2026 - Present',
    accent: 'data',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    problem:
      'Factories across Delhi NCR buy boiler fuel over phone calls and WhatsApp, with no published specifications and no easy way to compare one supplier\u2019s quote against another\u2019s.',
    goal: 'Turn an offline, call-and-WhatsApp purchase into one digital journey that ends in a qualified quote request.',
    research: [
      '15 to 20 days of discovery with industrial buyers and boiler operators',
      'Market-sizing and unit-economics models to inform pricing',
      'PRDs and BRDs written from what discovery found',
    ],
    owned: [
      'Discovery, PRDs & BRDs',
      'Buyer journey design',
      'KPIs & analytics plan',
      'Go-to-market plan',
      'Fuel Finder & calculator',
      'Supplier checklist',
      'Ops dashboard',
      'Next.js build',
    ],
    flows: [
      {
        title: 'Buyer journey',
        steps: ['Fuel Finder', 'Fuel calculator', 'Supplier checklist', 'Prefilled quote', 'Ops dashboard'],
      },
    ],
    challenges: [
      {
        title: 'Numbers a buyer can trust',
        body: 'The site never shows a number it cannot prove. The calculator gives an energy-equivalent range with every assumption visible, rather than a savings figure nobody has verified.',
      },
      {
        title: 'Every entry point carries its context',
        body: 'The Fuel Finder, the calculator and each delivery-area check pass their answers into the quote form, so an enquiry arrives already qualified.',
      },
      {
        title: 'Built for how buyers read',
        body: 'Every page can read itself aloud in English or Hindi, highlighting the section it is explaining, with captions where a device has no voice.',
      },
      {
        title: 'Measured from day one',
        body: 'KPIs set around quote requests per week, tracked across 16 events behind a consent banner, from the first question to a submitted quote.',
      },
    ],
    impact: [
      { value: '15 to 20', label: 'Days of buyer discovery' },
      { value: '16', label: 'Tracked funnel events' },
      { value: 'Live', label: 'First version' },
    ],
    live: 'https://urjasetu-alpha.vercel.app',
  },
]


export const skills: {
  group: string
  accent: Accent
  /** lucide icon name */
  icon: string
  /** Which projects this layer actually carried - taken from the roles above. */
  usedIn: string[]
  items: string[]
}[] = [
  {
    group: 'Product',
    accent: 'data',
    icon: 'Compass',
    usedIn: ['FylFlix Platform', 'UrjaSetu BioEnergy'],
    items: [
      'Product Strategy',
      'User Research',
      'Customer Journey Mapping',
      'Competitive Analysis',
      'PRDs & BRDs',
      'MVP Scoping',
      'Prioritization (MoSCoW)',
      'Roadmapping',
      'GTM Strategy',
      'Stakeholder Management',
    ],
  },
  {
    group: 'Delivery',
    accent: 'react',
    icon: 'ClipboardCheck',
    usedIn: ['FylFlix Platform', 'RECON'],
    items: [
      'User Stories',
      'Acceptance Criteria',
      'Sprint Planning',
      'UAT',
      'Agile / Scrum',
      'Client Engagement',
      'Jira',
      'Azure DevOps',
      'Notion',
      'Figma',
    ],
  },
  {
    group: 'Analytics & Business',
    accent: 'cloud',
    icon: 'LineChart',
    usedIn: ['FylFlix Platform', 'UrjaSetu BioEnergy'],
    items: [
      'KPI Tracking',
      'Funnel Analysis',
      'User Retention',
      'A/B Testing',
      'Event Tracking',
      'Unit Economics',
      'Market Sizing',
      'Monetization',
      'Google Analytics',
      'Mixpanel',
    ],
  },
  {
    group: 'Frontend',
    accent: 'react',
    icon: 'MonitorSmartphone',
    usedIn: ['FylFlix Platform', 'UrjaSetu BioEnergy', 'Aurora UI'],
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
    usedIn: ['Tally Connector', 'RECON', 'FylFlix Platform'],
    items: ['C#', '.NET Core', '.NET 10', 'REST APIs', 'Windows Services', 'OOP', 'Microservices', 'LLM APIs (Gemini)'],
  },
  {
    group: 'Databases & Data',
    accent: 'data',
    icon: 'Database',
    usedIn: ['Client Engagements', 'Tally Connector', 'RECON'],
    items: ['SQL', 'SQL Server', 'PostgreSQL', 'MySQL', 'SQLite', 'Database Design', 'SSRS', 'SSIS', 'ETL'],
  },
  {
    group: 'Security & Architecture',
    accent: 'cloud',
    icon: 'ShieldCheck',
    usedIn: ['FylFlix Platform', 'Tally Connector'],
    items: ['OAuth 2.0', 'JWT', 'RBAC', 'Idempotency', 'System Design', 'Application Architecture'],
  },
  {
    group: 'Testing & Tooling',
    accent: 'react',
    icon: 'FlaskConical',
    usedIn: ['Tally Connector', 'Aurora UI', 'RECON'],
    items: ['xUnit', 'Unit Testing', 'axe-core', 'Postman', 'CI/CD', 'Git', 'AWS S3'],
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
  { icon: 'Users', label: 'Led a team of up to 10', detail: 'Cross-functional, FylFlix' },
  { icon: 'Palette', label: 'Head of Atrangi', detail: 'Art Committee, NMIMS' },
  { icon: 'Mic', label: 'Ambiora & YSF', detail: 'Tech Fest - Youth Speaking Forum' },
  { icon: 'Trophy', label: 'State level', detail: 'Badminton' },
]

export const marquee = [
  'Product Discovery',
  'PRDs & BRDs',
  'Roadmapping',
  'MoSCoW',
  'User Stories',
  'A/B Testing',
  'Mixpanel',
  'Jira',
  'Figma',
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
