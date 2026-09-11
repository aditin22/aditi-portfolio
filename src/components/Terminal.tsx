import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type Line = { text: string; cls?: string; pause?: number }

const LINES: Line[] = [
  { text: '$ aditi --whoami', cls: 'text-brand' },
  { text: '', pause: 120 },
  { text: 'public sealed class Engineer', cls: 'text-[color:var(--dotnet-text)]' },
  { text: '{', cls: 'text-ink-3' },
  { text: '    Stack   => [".NET Core", "React", "TypeScript", "SQL"],', cls: 'text-ink-2' },
  { text: '    Shipped => "100+ services, 26 synced entities, 100+ reports",', cls: 'text-ink-2' },
  { text: '    Cares   => "idempotency, RBAC, clean data paths",', cls: 'text-ink-2' },
  { text: '}', cls: 'text-ink-3' },
  { text: '', pause: 160 },
  { text: '✓ build succeeded — 0 warnings', cls: 'text-[color:var(--green-text)]' },
]

/**
 * Types the block out line by line once it scrolls into view. The full text is
 * always in the DOM for screen readers; only the visible slice animates.
 */
export function Terminal() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || reduced) return
    if (line >= LINES.length) return
    const current = LINES[line]
    if (chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 14)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1)
      setChars(0)
    }, current.pause ?? 90)
    return () => clearTimeout(t)
  }, [started, line, chars, reduced])

  const done = reduced || line >= LINES.length

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-line shadow-float"
      style={{ background: 'var(--term-bg)' }}
    >
      <div
        className="flex items-center gap-2 border-b px-3.5 py-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#ff5f57' }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#febc2e' }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-2 font-mono text-[11px] tracking-wide" style={{ color: '#8a8f98' }}>
          engineer.cs — zsh
        </span>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75] md:text-[13px]">
        <code>
          {LINES.map((l, i) => {
            const visible = done ? l.text : i < line ? l.text : i === line ? l.text.slice(0, chars) : ''
            if (!done && i > line) return null
            return (
              <div key={i} className={l.cls ?? 'text-ink-2'} style={{ minHeight: '1.75em' }}>
                {visible}
                {!done && i === line && <span className="caret ml-0.5" />}
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
