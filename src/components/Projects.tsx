import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Calendar } from 'lucide-react'
import { projects } from '../data/resume'
import { ProjectGlyph } from './ProjectGlyph'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const HUES = ['tile-sky', 'tile-lilac', 'tile-mint', 'tile-sand']

function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  // Cursor-tracked spotlight — cheap (two CSS vars) and gives every card a
  // sense of surface without a per-frame re-render of the content.
  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true })
  }

  return (
    <Reveal delay={0.07 * i}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`tile ${HUES[i % HUES.length]} group relative h-full overflow-hidden transition-shadow duration-300 hover:shadow-float`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, color-mix(in srgb, var(--${p.accent}) 12%, transparent), transparent 70%)`,
            opacity: spot.on ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div className="relative">
          {/* The system's shape, before a word of description. */}
          <div
            className="mb-5 overflow-hidden rounded-xl px-3 py-2"
            style={{ background: 'color-mix(in srgb, var(--bg-page) 45%, transparent)' }}
          >
            <ProjectGlyph id={p.id} accent={p.accent} />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">{p.name}</h3>
              <p className="mt-1 text-[13.5px] font-medium" style={{ color: `var(--${p.accent}-text)` }}>
                {p.subtitle}
              </p>
            </div>
            <span
              className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ background: `var(--${p.accent})` }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={12.5} /> {p.org}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Calendar size={12.5} /> {p.period}
            </span>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-ink-2">{p.blurb}</p>

          <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-lg" style={{ background: 'color-mix(in srgb, var(--text-primary) 10%, transparent)' }}>
            {p.highlights.map((h) => (
              <div key={h.label} className="px-3 py-2.5" style={{ background: 'color-mix(in srgb, var(--bg-page) 45%, transparent)' }}>
                <dd className="font-display text-[15px] font-bold tracking-tight text-ink">{h.value}</dd>
                <dt className="mt-0.5 text-[11px] leading-tight text-ink-3">{h.label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-md px-2 py-1 font-mono text-[11.5px] text-ink-3"
                style={{ background: 'color-mix(in srgb, var(--bg-page) 40%, transparent)' }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative border-y border-line bg-surface2/40">
      <div className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
        <SectionHead
          eyebrow="Selected work"
          title="Four systems, four"
          accent="different kinds of hard."
          blurb="A multi-surface product platform, a financial sync service that cannot double-post, a legacy modernization, and a reporting estate serving three institutional clients."
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
