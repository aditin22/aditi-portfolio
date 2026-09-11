import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Briefcase, ChevronDown, MapPin, TrendingUp } from 'lucide-react'
import { experience, type Role } from '../data/resume'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  // Draw the spine as the section scrolls past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 120,
    damping: 30,
  })

  return (
    <section id="work" className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
      <SectionHead
        eyebrow="Experience"
        title="Three years, two companies,"
        accent="systems that had to be right."
        blurb="Financial platforms and multi-surface products — where a duplicate write is a real problem and a slow report costs someone their evening."
      />

      <div ref={ref} className="relative pl-8 md:pl-12">
        {/* Spine */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-line md:left-[11px]" aria-hidden="true">
          <motion.div className="w-px bg-brand" style={{ height }} />
        </div>

        <div className="space-y-14 md:space-y-20">
          {experience.map((role) => (
            <div key={role.company} className="relative">
              {/* Node */}
              <span
                className="absolute -left-8 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 md:-left-12"
                style={{
                  borderColor: role.current ? 'var(--blue)' : 'var(--border-mid)',
                  background: 'var(--bg-page)',
                }}
              >
                {role.current && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
              </span>

              <Reveal>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {role.company}
                  </h3>
                  {role.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-2">
                      <span className="live-dot" />
                      Current
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-ink-3">
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink-2">
                    <Briefcase size={13} /> {role.title}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} /> {role.location}
                  </span>
                  <span className="font-mono text-[12px]">{role.period}</span>
                </div>

                {role.companyNote && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[color:var(--green-light)] px-2 py-1 text-[12px] font-medium text-[color:var(--green-text)]">
                    <TrendingUp size={12} /> {role.companyNote}
                  </p>
                )}
              </Reveal>

              <div className="mt-6 space-y-5">
                {role.projects.map((p, pi) => (
                  <ProjectBlock key={p.name} p={p} delay={0.06 * pi} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** One project inside a role: metrics first, prose on demand. */
function ProjectBlock({ p, delay }: { p: Role['projects'][number]; delay: number }) {
  const [open, setOpen] = useState(false)
  const preview = p.bullets.slice(0, 1)
  const rest = p.bullets.slice(1)

  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="group relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-xs transition-shadow hover:shadow-pop md:p-6"
      >
        <span
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: `var(--${p.accent})` }}
          aria-hidden="true"
        />

        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h4 className="font-display text-[17px] font-semibold tracking-tight text-ink">{p.name}</h4>
          <span
            className="rounded-md px-2 py-0.5 text-[11.5px] font-medium"
            style={{ background: `var(--${p.accent}-soft)`, color: `var(--${p.accent}-text)` }}
          >
            {p.subtitle}
          </span>
        </div>

        {/* Headline metrics carry the story; the bullets are the footnotes. */}
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-surface2 px-3 py-2.5">
              <dd
                className="font-display text-[15px] font-bold leading-tight tracking-tight"
                style={{ color: `var(--${p.accent}-text)` }}
              >
                {m.value}
              </dd>
              <dt className="mt-0.5 text-[11px] leading-tight text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>

        <ul className="mt-4 space-y-2.5">
          {preview.map((b) => (
            <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-ink-2">
              <span
                className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full"
                style={{ background: `var(--${p.accent})` }}
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key="rest"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2.5 overflow-hidden"
            >
              <li className="h-2.5" aria-hidden="true" />
              {rest.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-ink-2">
                  <span
                    className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: `var(--${p.accent})` }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md text-[12.5px] font-medium transition-colors hover:opacity-80"
            style={{ color: `var(--${p.accent}-text)` }}
          >
            {open ? 'Show less' : `${rest.length} more ${rest.length === 1 ? 'detail' : 'details'}`}
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}
      </motion.article>
    </Reveal>
  )
}
