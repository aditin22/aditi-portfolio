import { motion } from 'framer-motion'
import { ArrowRight, Building2, Calendar, GitBranch } from 'lucide-react'
import { caseStudies, type CaseStudy } from '../data/resume'
import { useDiagram } from '../store/diagram'
import { FlowChain } from './FlowChain'
import { ProjectGlyph } from './ProjectGlyph'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const HUES: Record<string, string> = { fylflix: 'tile-sky', tally: 'tile-lilac', recon: 'tile-mint' }

function Study({ cs }: { cs: CaseStudy }) {
  const openDiagram = useDiagram((s) => s.open)

  return (
    <article id={`case-${cs.id}`} className={`tile ${HUES[cs.id]} scroll-mt-24`}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="flex items-baseline gap-3">
            <span
              className="font-display text-[13px] font-extrabold tracking-[1px]"
              style={{ color: `var(--${cs.accent}-text)` }}
            >
              {cs.index}
            </span>
            <h3 className="font-display text-[26px] font-extrabold leading-tight tracking-[-0.8px] text-ink md:text-[30px]">
              {cs.name}
            </h3>
          </div>
          <p className="mt-1 text-[15px] font-semibold" style={{ color: `var(--${cs.accent}-text)` }}>
            {cs.kicker}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={12.5} /> {cs.org}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Calendar size={12.5} /> {cs.period}
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {cs.stack.map((s) => (
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

        <div
          className="w-full overflow-hidden rounded-xl px-3 py-2 md:w-[260px]"
          style={{ background: 'color-mix(in srgb, var(--bg-page) 45%, transparent)' }}
        >
          <ProjectGlyph id={cs.id === 'recon' ? 'recon' : cs.id} accent={cs.accent} />
        </div>
      </div>

      {/* ── Problem + ownership ────────────────────────────────────────── */}
      <div className="mt-8 grid gap-8 border-t border-line pt-7 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">Problem</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{cs.problem}</p>

          <h4 className="mt-6 font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">
            What I owned
          </h4>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
            {cs.owned.map((o) => (
              <li key={o} className="flex items-start gap-2 text-[13.5px] text-ink-2">
                <span
                  className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: `var(--${cs.accent})` }}
                  aria-hidden="true"
                />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">
            Engineering challenges
          </h4>
          <ul className="mt-2.5 space-y-3.5">
            {cs.challenges.map((c) => (
              <li key={c.title}>
                <p className="font-display text-[14px] font-bold tracking-[-0.2px] text-ink">{c.title}</p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Flows ──────────────────────────────────────────────────────── */}
      <div className="mt-7 space-y-5 border-t border-line pt-7">
        {cs.flows.map((f) => (
          <FlowChain key={f.title} title={f.title} steps={f.steps} accent={cs.accent} />
        ))}
      </div>

      {/* ── Impact + diagram link ──────────────────────────────────────── */}
      <div className="mt-7 flex flex-wrap items-end justify-between gap-5 border-t border-line pt-7">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10">
          {cs.impact.map((m) => (
            <div key={m.label}>
              <dd
                className="font-display text-[26px] font-extrabold leading-none tracking-[-1px]"
                style={{ color: `var(--${cs.accent}-text)` }}
              >
                {m.value}
              </dd>
              <dt className="mt-1 text-[12px] text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>

        {cs.diagram && (
          <a
            href="#architecture"
            onClick={() => openDiagram(cs.diagram!)}
            className="btn-primary group !py-2.5"
          >
            <GitBranch size={15} />
            Explore the architecture
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </article>
  )
}

export function FeaturedWork() {
  return (
    <section id="work" className="relative border-y border-line bg-surface2/40">
      <div className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
        <SectionHead
          eyebrow="Featured engineering work"
          title="Systems I've"
          accent="shipped."
          blurb="Three production systems, each with the problem, what I owned, and the engineering decisions that made it hold up."
        />
        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id} delay={0.05 * i}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
                <Study cs={cs} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
