import { motion, useReducedMotion } from 'framer-motion'
import type { Accent } from '../data/resume'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * A small looping diagram per project — the shape of the system rather than a
 * screenshot. Each one animates the single idea that made the project hard.
 */
export function ProjectGlyph({ id, accent }: { id: string; accent: Accent }) {
  const reduced = useReducedMotion()
  const c = `var(--${accent})`
  const soft = `var(--${accent}-soft)`
  const loop = reduced ? {} : { repeat: Infinity, repeatType: 'loop' as const }

  const common = {
    viewBox: '0 0 240 96',
    className: 'h-24 w-full',
    'aria-hidden': true as const,
  }

  if (id === 'fylflix') {
    // Four surfaces feeding one shared core. Flow is drawn with a travelling
    // dash rather than a dot on an offset-path: motion-path on SVG elements
    // leaks invalid attributes through React, and a dash reads just as clearly.
    const ys = [14, 38, 58, 82]
    return (
      <svg {...common}>
        {ys.map((y, i) => {
          const d = `M28,${y} C80,${y} 80,48 120,48`
          return (
            <g key={y}>
              <path d={d} fill="none" stroke="var(--border-mid)" strokeWidth="1.5" />
              <motion.path
                d={d}
                fill="none"
                stroke={c}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="6 12"
                animate={reduced ? undefined : { strokeDashoffset: [0, -36] }}
                transition={{ duration: 1.6, delay: i * 0.18, ease: 'linear', ...loop }}
              />
              <rect x="6" y={y - 6} width="22" height="12" rx="3" fill={soft} stroke={c} strokeWidth="1" />
            </g>
          )
        })}
        <motion.circle
          cx="120"
          cy="48"
          r="13"
          fill={soft}
          stroke={c}
          strokeWidth="1.5"
          animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 2.2, ease: 'easeInOut', ...loop }}
          style={{ transformOrigin: '120px 48px' }}
        />
        <path d="M133,48 L176,48" stroke={c} strokeWidth="1.5" fill="none" />
        <rect
          x="176"
          y="28"
          width="52"
          height="40"
          rx="6"
          fill="var(--bg-surface2)"
          stroke="var(--border-mid)"
          strokeWidth="1"
        />
        {[38, 48, 58].map((y, i) => (
          <motion.rect
            key={y}
            x="184"
            y={y - 2}
            height="4"
            rx="2"
            fill={c}
            initial={{ width: 0 }}
            animate={reduced ? { width: 34 } : { width: [0, 34, 34, 0] }}
            transition={{ duration: 3.2, delay: i * 0.2, ease: EASE, ...loop }}
          />
        ))}
      </svg>
    )
  }

  if (id === 'tally') {
    // A packet moving on-prem → stage → cloud, with the retry that must not double-post.
    const path = 'M22,68 L74,68 L74,30 L166,30 L166,60 L218,60'
    return (
      <svg {...common}>
        <path d={path} fill="none" stroke="var(--border-mid)" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path
          d={path}
          fill="none"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="8 10"
          animate={reduced ? undefined : { strokeDashoffset: [0, -36] }}
          transition={{ duration: 1.4, ease: 'linear', ...loop }}
        />
        {[
          { x: 22, y: 68, label: 'ERP' },
          { x: 74, y: 30, label: 'svc' },
          { x: 166, y: 60, label: 'db' },
        ].map((n, i) => (
          <motion.circle
            key={n.label}
            cx={n.x}
            cy={n.y}
            r="6"
            fill="var(--bg-surface)"
            stroke={c}
            strokeWidth="2"
            animate={reduced ? undefined : { scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, delay: i * 0.45, ease: 'easeInOut', ...loop }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
        <circle cx="218" cy="60" r="8" fill={soft} stroke={c} strokeWidth="2" />
        <motion.path
          d="M214,60 l3,3.5 l6,-7"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2.8, ease: EASE, ...loop }}
        />
        <text x="22" y="88" textAnchor="middle" fontSize="8" fill="var(--text-hint)" fontFamily="monospace">
          tally
        </text>
        <text x="218" y="82" textAnchor="middle" fontSize="8" fill="var(--text-hint)" fontFamily="monospace">
          cloud
        </text>
      </svg>
    )
  }

  if (id === 'recon') {
    // Two ledgers, matched row by row.
    const rows = [16, 34, 52, 70]
    return (
      <svg {...common}>
        <rect x="8" y="6" width="72" height="82" rx="6" fill="var(--bg-surface2)" stroke="var(--border-mid)" />
        <rect x="160" y="6" width="72" height="82" rx="6" fill="var(--bg-surface2)" stroke="var(--border-mid)" />
        {rows.map((y, i) => (
          <g key={y}>
            <rect x="16" y={y} width="56" height="8" rx="4" fill="var(--border-mid)" />
            <rect x="168" y={y} width="56" height="8" rx="4" fill="var(--border-mid)" />
            <motion.path
              d={`M80,${y + 4} L160,${y + 4}`}
              stroke={c}
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.4, delay: i * 0.28, ease: EASE, ...loop }}
            />
            <motion.circle
              cx="120"
              cy={y + 4}
              r="3"
              fill={c}
              initial={{ scale: 0 }}
              animate={reduced ? { scale: 1 } : { scale: [0, 1, 1, 0] }}
              transition={{ duration: 3.4, delay: i * 0.28 + 0.5, ease: EASE, ...loop }}
              style={{ transformOrigin: `120px ${y + 4}px` }}
            />
          </g>
        ))}
      </svg>
    )
  }

  // clients — a report estate building itself
  const bars = [
    { x: 14, h: 30 },
    { x: 40, h: 48 },
    { x: 66, h: 38 },
    { x: 92, h: 62 },
    { x: 118, h: 52 },
    { x: 144, h: 72 },
    { x: 170, h: 60 },
    { x: 196, h: 80 },
  ]
  return (
    <svg {...common}>
      <line x1="8" y1="88" x2="232" y2="88" stroke="var(--border-mid)" strokeWidth="1" />
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width="18"
          rx="3"
          fill={i === bars.length - 1 ? c : soft}
          stroke={c}
          strokeWidth="1"
          initial={{ height: 0, y: 88 }}
          animate={
            reduced
              ? { height: b.h, y: 88 - b.h }
              : { height: [0, b.h, b.h, 0], y: [88, 88 - b.h, 88 - b.h, 88] }
          }
          transition={{ duration: 4, delay: i * 0.12, ease: EASE, ...loop }}
        />
      ))}
    </svg>
  )
}
