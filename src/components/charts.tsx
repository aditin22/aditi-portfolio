import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Counter } from './Counter'
import { VIEWPORT_MARGIN } from './Reveal'
import type { Accent } from '../data/resume'

const EASE = [0.16, 1, 0.3, 1] as const

/** Two vertical bars — a before and an after — that grow from the baseline. */
export function BarPair({
  a,
  b,
  accent,
}: {
  a: { label: string; value: number; caption: string }
  b: { label: string; value: number; caption: string }
  accent: Accent
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const max = Math.max(a.value, b.value)

  return (
    <div ref={ref} className="flex h-[168px] items-end justify-center gap-7">
      {[a, b].map((bar, i) => {
        const pct = (bar.value / max) * 100
        const isAfter = i === 1
        return (
          <div key={bar.label} className="flex h-full flex-col items-center justify-end gap-2">
            <span
              className="font-display text-[15px] font-bold tracking-tight"
              style={{ color: isAfter ? `var(--${accent}-text)` : 'var(--text-muted)' }}
            >
              {bar.caption}
            </span>
            <motion.div
              className="w-12 rounded-t-md md:w-14"
              style={{
                background: isAfter
                  ? `linear-gradient(to top, var(--${accent}), color-mix(in srgb, var(--${accent}) 45%, transparent))`
                  : 'var(--bg-surface3)',
              }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${pct}%` } : { height: 0 }}
              transition={{ duration: reduced ? 0 : 1.1, delay: i * 0.14, ease: EASE }}
            />
            <span className="text-[11.5px] text-ink-3">{bar.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/** Radial progress ring with the figure counting up inside it. */
export function Donut({
  value,
  suffix = '',
  pct,
  accent,
  caption,
}: {
  value: number
  suffix?: string
  pct: number
  accent: Accent
  caption: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const R = 54
  const C = 2 * Math.PI * R

  return (
    <div ref={ref} className="flex h-[168px] flex-col items-center justify-center gap-2">
      <div className="relative">
        <svg width="136" height="136" viewBox="0 0 136 136" className="-rotate-90">
          <circle cx="68" cy="68" r={R} fill="none" stroke="var(--bg-surface3)" strokeWidth="9" />
          <motion.circle
            cx="68"
            cy="68"
            r={R}
            fill="none"
            stroke={`var(--${accent})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - (pct / 100) * C } : { strokeDashoffset: C }}
            transition={{ duration: reduced ? 0 : 1.5, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold tracking-tight text-ink">
            <Counter value={value} suffix={suffix} />
          </span>
        </div>
      </div>
      <span className="text-[11.5px] text-ink-3">{caption}</span>
    </div>
  )
}

/** Two horizontal rails — the second visibly shorter — for a runtime cut. */
export function Rails({
  rows,
  accent,
}: {
  rows: { label: string; value: number; display: string; muted?: boolean }[]
  accent: Accent
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const max = Math.max(...rows.map((r) => r.value))

  return (
    <div ref={ref} className="flex h-[168px] flex-col justify-center gap-5 px-1">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[12px] text-ink-3">{r.label}</span>
            <span
              className="font-display text-[15px] font-bold tracking-tight"
              style={{ color: r.muted ? 'var(--text-muted)' : `var(--${accent}-text)` }}
            >
              {r.display}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface3">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: r.muted ? 'var(--border-mid)' : `var(--${accent})`,
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(r.value / max) * 100}%` } : { width: 0 }}
              transition={{ duration: reduced ? 0 : 1.2, delay: i * 0.16, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Cumulative area + line, drawn left to right. */
export function Spark({ points, accent }: { points: number[]; accent: Accent }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const reduced = useReducedMotion()
  const W = 260
  const H = 110
  const max = Math.max(...points)
  const coords = points.map((p, i) => [
    (i / (points.length - 1)) * W,
    H - (p / max) * (H - 14) - 7,
  ])
  const line = coords.map((c, i) => `${i ? 'L' : 'M'}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`
  const id = `spark-${accent}`

  return (
    <div ref={ref} className="flex h-[168px] flex-col items-center justify-center gap-3">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="110" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`var(--${accent})`} stopOpacity="0.32" />
            <stop offset="100%" stopColor={`var(--${accent})`} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#${id})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`var(--${accent})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: reduced ? 0 : 1.5, ease: EASE }}
        />
        {coords.map((c, i) => (
          <motion.circle
            key={i}
            cx={c[0]}
            cy={c[1]}
            r="3"
            fill="var(--bg-surface)"
            stroke={`var(--${accent})`}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.11 }}
            style={{ transformOrigin: `${c[0]}px ${c[1]}px` }}
          />
        ))}
      </svg>
      <span className="text-[11.5px] text-ink-3">10+ production feature releases</span>
    </div>
  )
}
