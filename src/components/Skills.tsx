import { motion, useReducedMotion } from 'framer-motion'
import { Cloud, Database, FlaskConical, MonitorSmartphone, Server, ShieldCheck } from 'lucide-react'
import { skills } from '../data/resume'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const ICONS = {
  Server,
  MonitorSmartphone,
  Database,
  ShieldCheck,
  FlaskConical,
  Cloud,
} as const

const HUES = ['tile-lilac', 'tile-sky', 'tile-mint', 'tile-sand', 'tile-aqua', 'tile-sky']

/**
 * The stack, top to bottom — client layer down to cloud. Each layer says what
 * it holds and, more usefully, which shipped project it actually carried, so
 * the list reads as evidence rather than a wall of keywords.
 */
function Layer({ g, i }: { g: (typeof skills)[number]; i: number }) {
  const reduced = useReducedMotion()
  const Icon = ICONS[g.icon as keyof typeof ICONS] ?? Server

  return (
    <Reveal delay={0.05 * i}>
      <motion.div
        whileHover={reduced ? undefined : { x: 4 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        className={`tile ${HUES[i % HUES.length]} group relative overflow-hidden`}
      >
        {/* Accent edge, drawn on hover */}
        <span
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: `var(--${g.accent})` }}
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-[240px_1fr] md:items-start md:gap-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `color-mix(in srgb, var(--${g.accent}) 18%, transparent)`,
                color: `var(--${g.accent}-text)`,
              }}
            >
              <Icon size={18} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-display text-[17px] font-extrabold tracking-[-0.4px] text-ink">
                  {g.group}
                </h3>
                <span className="font-mono text-[11px] text-ink-4">
                  {String(g.items.length).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[1.2px] text-ink-4">
                Layer {String(i + 1).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s}>
                  <span
                    className="inline-block rounded-md px-2.5 py-1 text-[12.5px] font-medium text-ink-2 transition-colors"
                    style={{ background: 'color-mix(in srgb, var(--bg-page) 45%, transparent)' }}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-3">
              <span className="font-mono uppercase tracking-[1.2px] text-ink-4">Shipped in</span>
              {g.usedIn.map((p) => (
                <span
                  key={p}
                  className="rounded-full px-2 py-0.5 font-medium"
                  style={{
                    background: `color-mix(in srgb, var(--${g.accent}) 16%, transparent)`,
                    color: `var(--${g.accent}-text)`,
                  }}
                >
                  {p}
                </span>
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative border-y border-line bg-surface2/40">
      <div className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
        <SectionHead
          eyebrow="Toolkit"
          title="The stack I actually"
          accent="ship with."
          blurb="Six layers, client down to cloud — each one listed with the project it carried in production."
        />

        <div className="space-y-3.5">
          {skills.map((g, i) => (
            <Layer key={g.group} g={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
