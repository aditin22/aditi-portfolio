import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/* ── Face miniatures ───────────────────────────────────────────────────────
   Each face is a small, flat mockup of something in the resume. They are
   deliberately low-detail: at ~340px a face only has room for a label, two or
   three rows and a status. */

const chip = 'rounded-md px-2 py-[3px] text-[10.5px] font-semibold'
const row = 'flex items-center justify-between gap-2 rounded-lg px-2 py-1.5'
const rowBg = { background: 'rgba(255,255,255,0.13)' }
const faint = 'text-[11px]'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[1.4px]"
      style={{ color: '#a9e2ff' }}
    >
      {children}
    </div>
  )
}

function Bar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }}>
      <div
        className="h-full rounded-full transition-[width] duration-[900ms] ease-out"
        style={{ width: `${pct}%`, background: '#fff', transitionDelay: `${delay}ms` }}
      />
    </div>
  )
}

function PaymentsFace() {
  return (
    <>
      <Label>Payments · FylFlix</Label>
      <div className="flex flex-1 flex-col justify-center gap-1.5 text-white">
        <div className={row} style={rowBg}>
          <span className="text-[12px] font-semibold">Business · Annual</span>
          <span className="text-[12px] font-bold">₹24,000</span>
        </div>
        <div className={row} style={rowBg}>
          <span className={`${faint}`} style={{ color: 'rgba(255,255,255,0.8)' }}>
            GST 18%
          </span>
          <span className={faint}>₹4,320</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className={chip} style={{ background: 'rgba(52,168,83,0.9)', color: '#fff' }}>
            ✓ Verified
          </span>
          <span className="font-mono text-[10.5px]" style={{ color: 'rgba(255,255,255,0.8)' }}>
            idempotent
          </span>
        </div>
      </div>
    </>
  )
}

function SyncFace() {
  return (
    <>
      <Label>Tally Connector</Label>
      <div className="flex flex-1 flex-col justify-center gap-2 text-white">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-[32px] font-extrabold leading-none tracking-[-1px]">26</span>
          <span className={faint} style={{ color: 'rgba(255,255,255,0.8)' }}>
            entities synced
          </span>
        </div>
        <Bar pct={100} />
        <div className="mt-0.5 space-y-1">
          {['Ledgers', 'Vouchers', 'Stock items'].map((t) => (
            <div key={t} className="flex items-center justify-between">
              <span className={faint} style={{ color: 'rgba(255,255,255,0.85)' }}>
                {t}
              </span>
              <span className="text-[10.5px] font-semibold" style={{ color: '#7ee2a0' }}>
                ✓ ok
              </span>
            </div>
          ))}
        </div>
        <span className={`${chip} self-start`} style={{ background: 'rgba(255,255,255,0.16)' }}>
          0 duplicate postings
        </span>
      </div>
    </>
  )
}

function ReconFace() {
  return (
    <>
      <Label>RECON · matching</Label>
      <div className="flex flex-1 flex-col justify-center gap-1.5 text-white">
        {[
          ['TAXLOT-1042', '₹1.20M'],
          ['TAXLOT-1043', '₹0.84M'],
          ['TAXLOT-1044', '₹2.05M'],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center gap-1.5">
            <span
              className="flex-1 rounded-md px-2 py-1.5 font-mono text-[10.5px]"
              style={{ background: 'rgba(255,255,255,0.13)' }}
            >
              {a}
            </span>
            <span className="text-[12px]" style={{ color: '#7ee2a0' }}>
              ↔
            </span>
            <span
              className="flex-1 rounded-md px-2 py-1.5 text-right font-mono text-[10.5px]"
              style={{ background: 'rgba(255,255,255,0.13)' }}
            >
              {b}
            </span>
          </div>
        ))}
        <span className={`${chip} self-start`} style={{ background: 'rgba(52,168,83,0.9)' }}>
          Matched 3 / 3
        </span>
      </div>
    </>
  )
}

function ApiFace() {
  return (
    <>
      <Label>REST API</Label>
      <div className="flex flex-1 flex-col justify-center gap-1.5 font-mono text-white">
        <div className="flex items-center gap-1.5">
          <span className={chip} style={{ background: 'rgba(52,168,83,0.9)' }}>
            GET
          </span>
          <span className="truncate text-[11px]" style={{ color: 'rgba(255,255,255,0.92)' }}>
            /api/positions
          </span>
        </div>
        <div
          className="rounded-lg p-2.5 text-[10.5px] leading-[1.65]"
          style={{ background: 'rgba(3,20,30,0.5)' }}
        >
          <div style={{ color: 'rgba(255,255,255,0.55)' }}>{'{'}</div>
          <div className="pl-2">
            <span style={{ color: '#a9e2ff' }}>"fund"</span>: "Carronade",
          </div>
          <div className="pl-2">
            <span style={{ color: '#a9e2ff' }}>"matched"</span>: true,
          </div>
          <div className="pl-2">
            <span style={{ color: '#a9e2ff' }}>"rows"</span>: 1042
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)' }}>{'}'}</div>
        </div>
        <span className="text-[11px] font-semibold" style={{ color: '#7ee2a0' }}>
          200 OK · 84ms
        </span>
      </div>
    </>
  )
}

function CodeFace() {
  return (
    <>
      <Label>C# · .NET 10</Label>
      <div
        className="flex flex-1 flex-col justify-center rounded-lg p-2.5 font-mono text-[10.5px] leading-[1.75] text-white"
        style={{ background: 'rgba(3,20,30,0.5)' }}
      >
        <div>
          <span style={{ color: '#a9e2ff' }}>if</span> (await _log.Seen(key))
        </div>
        <div className="pl-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
          return Result.Skip();
        </div>
        <div className="mt-1">
          <span style={{ color: '#a9e2ff' }}>await</span> _tally.Post(entry);
        </div>
        <div>
          <span style={{ color: '#a9e2ff' }}>await</span> _log.Mark(key);
        </div>
        <div className="mt-1.5" style={{ color: '#7ee2a0' }}>
          // never posts twice
        </div>
      </div>
    </>
  )
}

function ReportsFace() {
  const bars = [38, 55, 47, 72, 61, 88, 76, 100]
  return (
    <>
      <Label>SSRS · reporting</Label>
      <div className="flex flex-1 flex-col justify-center gap-2 text-white">
        <div className="flex h-[54px] items-end gap-[5px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{
                height: `${h}%`,
                background: i === bars.length - 1 ? '#a9e2ff' : 'rgba(255,255,255,0.42)',
              }}
            />
          ))}
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[28px] font-extrabold leading-none tracking-[-0.8px]">
            100+
          </span>
          <span className={faint} style={{ color: 'rgba(255,255,255,0.8)' }}>
            automated
          </span>
        </div>
        <span className={`${chip} self-start`} style={{ background: 'rgba(255,255,255,0.16)' }}>
          6h → 2h runtime
        </span>
      </div>
    </>
  )
}

/**
 * Faces sit at fixed positions on the die; rolling is done by rotating the
 * container. The step table accumulates -360° per axis every six steps so the
 * die always turns the same way instead of snapping back.
 */
const FACES = [
  { cls: 'cube-face-1', node: <PaymentsFace />, name: 'Payments' },
  { cls: 'cube-face-3', node: <SyncFace />, name: 'Offline-to-cloud sync' },
  { cls: 'cube-face-6', node: <ReconFace />, name: 'Reconciliation' },
  { cls: 'cube-face-4', node: <ApiFace />, name: 'REST APIs' },
  { cls: 'cube-face-5', node: <CodeFace />, name: 'Idempotent writes' },
  { cls: 'cube-face-2', node: <ReportsFace />, name: 'Reporting' },
]

const Y_STEP = [0, -90, -180, -270, -360, -360]
const X_STEP = [0, 0, 0, 0, -90, -270]

/**
 * Timing. The die opens with a quick tour — four rolls in about three seconds,
 * across both axes — so a visitor sees it turn before they've decided it's a
 * flat card. After that it settles into the slow cadence. A manual pick ends
 * the tour early and restarts the cruise timer.
 */
const INTRO_STEPS = 4
const INTRO_MS = 800
const CRUISE_MS = 3600
const ROLL_INTRO_MS = 550
const ROLL_MS = 1050
const START_DELAY_MS = 700

export function HeroCube() {
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  // Fire the tour when the die is actually on screen — on phones it sits
  // below the fold, and a tour nobody sees is wasted.
  const inView = useInView(stageRef, { once: true, margin: '0px 0px -15% 0px' })

  const [started, setStarted] = useState(false)
  const [manual, setManual] = useState(false)
  const [step, setStep] = useState(0)
  // Bumped on every manual pick so the auto-advance timer restarts. Without
  // this the interval keeps its original phase and a face chosen just before
  // it fires is snatched away a moment later.
  const [nudge, setNudge] = useState(0)
  // The caption trails the roll: naming a face before it has turned into view
  // reads as a bug, so it only catches up once the die has settled.
  const [settled, setSettled] = useState(0)

  // The pace switches when the tour's last roll is *scheduled*; the duration
  // switches one step later so that roll still plays at tour speed.
  const intro = started && !manual && step < INTRO_STEPS
  const rollMs = started && !manual && step <= INTRO_STEPS ? ROLL_INTRO_MS : ROLL_MS

  // Above the fold on landing is the common case, so check that directly once
  // the ref is attached rather than waiting on the observer; the observer
  // covers the die scrolling into view later (phones stack it below the copy).
  useEffect(() => {
    if (reduced) return
    const el = stageRef.current
    const r = el?.getBoundingClientRect()
    const visibleNow = !!r && r.top < window.innerHeight && r.bottom > 0
    if (!inView && !visibleNow) return
    const id = setTimeout(() => setStarted(true), START_DELAY_MS)
    return () => clearTimeout(id)
  }, [inView, reduced])

  useEffect(() => {
    if (reduced || !started) return
    const id = setInterval(() => setStep((n) => n + 1), intro ? INTRO_MS : CRUISE_MS)
    return () => clearInterval(id)
  }, [reduced, started, intro, nudge])

  useEffect(() => {
    if (reduced) {
      setSettled(step)
      return
    }
    const id = setTimeout(() => setSettled(step), rollMs)
    return () => clearTimeout(id)
  }, [step, reduced, rollMs])

  const cycle = Math.floor(step / 6)
  const pos = step % 6
  const shown = settled % 6
  const y = -360 * cycle + Y_STEP[pos]
  const x = -360 * cycle + X_STEP[pos]

  return (
    <div className="relative flex flex-col items-center">
      <div className="cube-stage" ref={stageRef}>
        <div
          className="cube"
          style={{
            transform: `rotateX(${x}deg) rotateY(${y}deg)`,
            transitionDuration: `${rollMs}ms`,
          }}
        >
          {FACES.map((f) => (
            <div key={f.cls} className={`cube-face ${f.cls}`}>
              <div className="cube-face-in">{f.node}</div>
            </div>
          ))}
        </div>
        <span className="cube-floor" aria-hidden="true" />
      </div>

      {/* Face label + manual control */}
      <div className="mt-[44px] flex items-center gap-2.5">
        <span
          className="font-mono text-[10.5px] uppercase tracking-[1.4px]"
          style={{ color: 'rgba(255,255,255,0.66)' }}
        >
          {FACES[shown].name}
        </span>
        <span className="flex gap-1.5">
          {FACES.map((f, i) => (
            <button
              key={f.cls}
              type="button"
              aria-label={`Show ${f.name}`}
              aria-current={i === shown}
              onClick={() => {
                // Always roll forward to the requested face; picking the
                // current one takes the long way round rather than doing nothing.
                setStep((n) => n + ((i - (n % 6) + 6) % 6 || 6))
                setManual(true)
                setNudge((v) => v + 1)
              }}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === shown ? 14 : 6,
                background: i === shown ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </span>
      </div>

      <span className="sr-only">
        A rotating cube showing six pieces of shipped work: {FACES.map((f) => f.name).join(', ')}.
      </span>
    </div>
  )
}
