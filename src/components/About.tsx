import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { Mic, Palette, Trophy, Users } from 'lucide-react'
import { education, highlights } from '../data/resume'
import { Reveal, RevealGroup, revealItem, VIEWPORT_MARGIN } from './Reveal'
import { SectionHead } from './SectionHead'

const EASE = [0.16, 1, 0.3, 1] as const
const ICONS = { Users, Palette, Mic, Trophy }

/** Counts up with decimals - the grade is 3.99, not 4. */
function Decimal({ to, places = 2 }: { to: number; places?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(to)
      return
    }
    const c = animate(0, to, { duration: 1.5, ease: EASE, onUpdate: (v) => setN(v) })
    return () => c.stop()
  }, [inView, to, reduced])

  return <span ref={ref}>{n.toFixed(places)}</span>
}

/** Near-full arc: the grade as a dial you read before you read the number. */
function GradeDial() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const R = 62
  const C = 2 * Math.PI * R
  const pct = education.cgpa / education.cgpaMax

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative">
        <svg width="152" height="152" viewBox="0 0 152 152" className="-rotate-90">
          <circle cx="76" cy="76" r={R} fill="none" stroke="var(--bg-page)" strokeWidth="11" opacity="0.55" />
          <motion.circle
            cx="76"
            cy="76"
            r={R}
            fill="none"
            stroke="var(--data)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - pct * C } : { strokeDashoffset: C }}
            transition={{ duration: reduced ? 0 : 1.6, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[34px] font-extrabold leading-none tracking-[-1.4px] text-ink">
            <Decimal to={education.cgpa} />
          </span>
          <span className="mt-1 font-mono text-[11px] text-ink-3">/ {education.cgpaMax.toFixed(2)}</span>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[1.4px] text-ink-3">CGPA</p>
    </div>
  )
}

/** A "#1" medallion - rank as a thing you win, not a line of text. */
function RankMedal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        className="relative flex h-[152px] w-[152px] items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <svg width="152" height="152" viewBox="0 0 152 152" aria-hidden="true">
          <circle cx="76" cy="76" r="62" fill="none" stroke="var(--cloud)" strokeWidth="2" opacity="0.45" />
          <circle cx="76" cy="76" r="53" fill="color-mix(in srgb, var(--cloud) 16%, transparent)" />
          {/* Laurel: leaves climbing the lower arc from the base, each one
              rotated tangent to the circle so the wreath reads as a wreath
              rather than a scatter of spikes. */}
          {[-1, 1].map((side) =>
            [28, 52, 76, 100].map((deg, k) => {
              const a = (deg * Math.PI) / 180
              const x = 76 + side * Math.sin(a) * 60
              const y = 76 + Math.cos(a) * 60
              const rot = (Math.atan2(y - 76, x - 76) * 180) / Math.PI + 90
              return (
                <ellipse
                  key={`${side}-${k}`}
                  cx={x}
                  cy={y}
                  rx="8"
                  ry="3.6"
                  fill="var(--cloud)"
                  opacity={0.5 + k * 0.12}
                  transform={`rotate(${rot} ${x} ${y})`}
                />
              )
            }),
          )}
        </svg>
        <span className="absolute font-display text-[42px] font-extrabold leading-none tracking-[-2px] text-ink">
          #1
        </span>
      </motion.div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[1.4px] text-ink-3">In program</p>
    </div>
  )
}

/**
 * The cohort as a distribution with a marker out on the right tail. "Top 1%"
 * is an abstraction; a curve with you standing at the edge of it is not.
 */
function Percentile() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()

  const W = 190
  const H = 96
  const BASE = H - 12
  // Gaussian sampled across the width, scaled to the box.
  const pt = (i: number, n = 60) => {
    const x = (i / n) * W
    const t = (i / n) * 6 - 3
    return [x, BASE - Math.exp(-0.5 * t * t) * (H - 28)] as const
  }
  const pts = Array.from({ length: 61 }, (_, i) => pt(i))
  const toPath = (list: readonly (readonly [number, number])[]) =>
    list.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

  const line = toPath(pts)
  const area = `${line} L${W},${BASE} L0,${BASE} Z`

  // The marker sits where the top 1% begins; everything right of it is the slice.
  const markI = 53
  const [markX, markY] = pt(markI)
  const tail = pts.slice(markI)
  const tailArea = `${toPath(tail)} L${W},${BASE} L${markX.toFixed(1)},${BASE} Z`

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex h-[152px] items-center">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <linearGradient id="pctl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--react)" stopOpacity="0.26" />
              <stop offset="100%" stopColor="var(--react)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d={area}
            fill="url(#pctl)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: reduced ? 0 : 0.8, delay: 0.4 }}
          />
          <motion.path
            d={tailArea}
            fill="var(--data)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.55 } : {}}
            transition={{ duration: reduced ? 0 : 0.6, delay: 1.05 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="var(--react)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduced ? 0 : 1.4, ease: EASE }}
          />
          <line x1="0" y1={BASE} x2={W} y2={BASE} stroke="var(--border-mid)" strokeWidth="1" />

          <motion.g
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <line
              x1={markX}
              y1={markY - 26}
              x2={markX}
              y2={BASE}
              stroke="var(--data)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx={markX} cy={markY} r="5.5" fill="var(--data)" stroke="var(--bg-surface)" strokeWidth="2.5" />
            <text
              x={markX + 7}
              y={markY - 18}
              fontSize="10"
              fontWeight="700"
              fill="var(--data-text)"
              fontFamily="'JetBrains Mono', monospace"
            >
              1%
            </text>
          </motion.g>
        </svg>
      </div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[1.4px] text-ink-3">Top 1% of cohort</p>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
      <SectionHead eyebrow="Background" title="Where it" accent="comes from." />

      <Reveal>
        <div className="tile tile-aqua">
          {/* Institution line, then the three credentials as pictures */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-5">
            <div>
              <h3 className="font-display text-[17px] font-extrabold tracking-[-0.4px] text-ink">
                {education.university}
                <span className="ml-2 text-[13px] font-semibold text-ink-3">{education.degree}</span>
              </h3>
              <p className="mt-1 text-[12.5px] text-ink-3">{education.school}</p>
            </div>
            <span className="font-mono text-[12px] text-ink-3">{education.period}</span>
          </div>

          <div className="grid gap-8 pt-7 sm:grid-cols-3">
            <GradeDial />
            <RankMedal />
            <Percentile />
          </div>
        </div>
      </Reveal>

      {/* Everything outside the code, as medallions */}
      <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => {
          const Icon = ICONS[h.icon as keyof typeof ICONS] ?? Users
          return (
            <motion.div
              key={h.label}
              variants={revealItem}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="tile tile-sand flex flex-col items-center gap-3 text-center"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: 'color-mix(in srgb, var(--cloud) 20%, transparent)',
                  color: 'var(--cloud-text)',
                }}
              >
                <Icon size={21} />
              </span>
              <div>
                <p className="font-display text-[14.5px] font-extrabold tracking-[-0.3px] text-ink">
                  {h.label}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-ink-3">{h.detail}</p>
              </div>
            </motion.div>
          )
        })}
      </RevealGroup>
    </section>
  )
}
