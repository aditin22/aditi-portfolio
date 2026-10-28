import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, Calendar, Github, Lock, Network } from 'lucide-react'
import { projects, type Project, type ProjectLink } from '../data/resume'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const HUES: Record<string, string> = {
  urjasetu: 'tile-mint',
  fylflix: 'tile-sky',
  aurora: 'tile-sand',
  tally: 'tile-lilac',
  recon: 'tile-aqua',
}

/** The four questions, asked of every project in the same order. */
const ROWS = [
  { key: 'problem', label: 'The problem' },
  { key: 'did', label: 'What I did' },
  { key: 'happened', label: 'What happened' },
] as const

function LinkButton({ link, accent }: { link: ProjectLink; accent: string }) {
  // No href means there is nothing to link to - employer or client code. Say so
  // in place rather than leaving the row looking unfinished.
  if (!link.href) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-2 text-[12.5px] font-medium text-ink-3">
        <Lock size={13} aria-hidden="true" />
        {link.label}
      </span>
    )
  }

  const external = link.href.startsWith('http')
  const Icon = link.kind === 'repo' ? Github : link.kind === 'case' ? Network : ArrowUpRight

  // The live demo is the one a reviewer is hunting for, so it is the only
  // filled button on the card.
  const filled = link.kind === 'demo'

  return (
    <a
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="group/link inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-semibold transition-all hover:-translate-y-0.5"
      style={
        filled
          ? { background: `var(--${accent})`, color: '#fff' }
          : {
              background: 'color-mix(in srgb, var(--bg-page) 55%, transparent)',
              color: `var(--${accent}-text)`,
              border: '1px solid color-mix(in srgb, var(--border-mid) 70%, transparent)',
            }
      }
    >
      {link.kind !== 'demo' && <Icon size={13} aria-hidden="true" />}
      {link.label}
      {link.kind === 'demo' && (
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      )}
    </a>
  )
}

/** Horizontal meter showing where the work sat between the two disciplines. */
function SplitMeter({ p }: { p: Project }) {
  return (
    <div className="min-w-0">
      <div
        className="flex h-[7px] w-full overflow-hidden rounded-full"
        role="img"
        aria-label={`${p.split.product} percent product work, ${p.split.engineering} percent engineering`}
      >
        <span style={{ width: `${p.split.product}%`, background: `var(--${p.accent})` }} />
        <span
          style={{
            width: `${p.split.engineering}%`,
            background: `color-mix(in srgb, var(--${p.accent}) 26%, transparent)`,
          }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.8px] text-ink-3">
        <span style={{ color: `var(--${p.accent}-text)` }}>Product {p.split.product}</span>
        <span>Engineering {p.split.engineering}</span>
      </div>
    </div>
  )
}

function Card({ p }: { p: Project }) {
  return (
    <motion.article
      id={`project-${p.id}`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`tile ${HUES[p.id]} scroll-mt-24`}
    >
      {/* ── Identity ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-[12px] font-bold tracking-[1px]"
              style={{ color: `var(--${p.accent}-text)` }}
            >
              {p.index}
            </span>
            <h3 className="font-display text-[24px] font-extrabold leading-tight tracking-[-0.7px] text-ink md:text-[28px]">
              {p.name}
            </h3>
          </div>
          <p className="mt-1 text-[14.5px] font-semibold" style={{ color: `var(--${p.accent}-text)` }}>
            {p.kicker}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={12.5} aria-hidden="true" /> {p.org}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Calendar size={12.5} aria-hidden="true" /> {p.period}
            </span>
          </div>
        </div>

        <span
          className="flex-shrink-0 rounded-full px-3 py-1.5 text-[12px] font-bold"
          style={{
            background: `color-mix(in srgb, var(--${p.accent}) 20%, transparent)`,
            color: `var(--${p.accent}-text)`,
          }}
        >
          {p.hat}
        </span>
      </div>

      {/* ── The four lines ─────────────────────────────────────────────── */}
      <dl className="mt-7 space-y-4 border-t border-[color:color-mix(in_srgb,var(--border-mid)_55%,transparent)] pt-6">
        {ROWS.map((row) => (
          <div key={row.key} className="grid gap-1 md:grid-cols-[132px_1fr] md:gap-5">
            <dt className="pt-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">
              {row.label}
            </dt>
            <dd className="text-[14.5px] leading-[1.6] text-ink-2">{p[row.key]}</dd>
          </div>
        ))}

        <div className="grid gap-2 md:grid-cols-[132px_1fr] md:gap-5">
          <dt className="pt-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">
            See it
          </dt>
          <dd className="flex flex-wrap items-center gap-2">
            {p.links.map((l) => (
              <LinkButton key={l.label} link={l} accent={p.accent} />
            ))}
          </dd>
        </div>
      </dl>

      {/* ── Split + stack ──────────────────────────────────────────────── */}
      <div className="mt-7 grid gap-5 border-t border-[color:color-mix(in_srgb,var(--border-mid)_55%,transparent)] pt-5 md:grid-cols-[minmax(170px,210px)_1fr] md:items-center md:gap-8">
        <SplitMeter p={p} />
        <ul className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li
              key={s}
              className="rounded-md px-2 py-1 font-mono text-[11.5px] text-ink-2"
              style={{ background: 'color-mix(in srgb, var(--bg-page) 45%, transparent)' }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

/**
 * The front door. Five projects, each answering the same four questions, with
 * the live link or the repository sitting on the card rather than buried in a
 * paragraph - the thing an application reviewer opens the page looking for.
 */
export function Projects() {
  const live = projects.filter((p) => p.links.some((l) => l.kind === 'demo')).length
  const repos = projects.filter((p) => p.links.some((l) => l.kind === 'repo')).length

  return (
    <section id="work" className="relative border-y border-line bg-surface2/40">
      <div className="mx-auto max-w-shell px-6 py-16 md:py-[72px]">
        <SectionHead
          eyebrow="Selected work"
          title="Five projects."
          accent="User needs, product decisions, implementation and outcomes."
          blurb="Three from my roles at FylFlix and IVP, a client platform I am taking from discovery to launch, and an open-source component library."
        />

        <Reveal>
          <p className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-line bg-surface px-4 py-3 text-[13px] text-ink-2 md:mb-10">
            <span className="inline-flex items-center gap-2 font-semibold text-ink">
              <span className="live-dot" />
              {live} live links
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Github size={13} aria-hidden="true" /> {repos} open-source repository
            </span>
            <span className="text-ink-3">
              Employer and client code stays private, so those projects link to the live product or an
              interactive architecture diagram. Aurora UI has its source on GitHub.
            </span>
          </p>
        </Reveal>

        <div className="space-y-5 md:space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 2) * 0.05}>
              <Card p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
