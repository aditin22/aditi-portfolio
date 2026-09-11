import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  Box,
  Briefcase,
  Building2,
  CheckCheck,
  Cloud,
  Component,
  Cpu,
  CreditCard,
  Database,
  KeyRound,
  Scale,
  Server,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import type { Accent } from '../data/resume'

/** Only the icons the diagrams actually place — a namespace import would pull
 *  the whole lucide set into this chunk. */
const ICONS = {
  Box,
  Briefcase,
  Building2,
  CheckCheck,
  Cloud,
  Component,
  Cpu,
  CreditCard,
  Database,
  KeyRound,
  Scale,
  Server,
  Settings,
  ShieldCheck,
  Users,
} as const

export type ArchNodeData = {
  label: string
  sub?: string
  icon: keyof typeof ICONS
  accent: Accent
  /** Which sides actually get a connector — keeps stray dots off leaf nodes. */
  handles?: ('top' | 'right' | 'bottom' | 'left')[]
}

const SIDE = {
  top: Position.Top,
  right: Position.Right,
  bottom: Position.Bottom,
  left: Position.Left,
} as const

export function ArchNode({ data }: NodeProps) {
  const d = data as unknown as ArchNodeData
  const Icon = ICONS[d.icon] ?? Box
  const sides = d.handles ?? ['left', 'right']

  return (
    <div
      className="min-w-[164px] rounded-xl border bg-surface px-3.5 py-2.5 shadow-card transition-shadow hover:shadow-pop"
      style={{ borderColor: `color-mix(in srgb, var(--${d.accent}) 45%, var(--border))` }}
    >
      {sides.map((s) => (
        <Handle
          key={`t-${s}`}
          type="target"
          id={`t-${s}`}
          position={SIDE[s]}
          style={{ background: `var(--${d.accent})`, opacity: 0 }}
        />
      ))}
      {sides.map((s) => (
        <Handle
          key={`s-${s}`}
          type="source"
          id={`s-${s}`}
          position={SIDE[s]}
          style={{ background: `var(--${d.accent})`, opacity: 0 }}
        />
      ))}

      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: `var(--${d.accent}-soft)`, color: `var(--${d.accent}-text)` }}
        >
          <Icon size={15} />
        </span>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-ink">{d.label}</div>
          {d.sub && <div className="mt-0.5 font-mono text-[10.5px] text-ink-3">{d.sub}</div>}
        </div>
      </div>
    </div>
  )
}
