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
      className="w-[128px] rounded-xl border bg-surface px-2.5 py-2 shadow-card transition-shadow hover:shadow-pop md:w-auto md:min-w-[164px] md:px-3.5 md:py-2.5"
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
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg md:h-7 md:w-7"
          style={{ background: `var(--${d.accent}-soft)`, color: `var(--${d.accent}-text)` }}
        >
          <Icon size={15} />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="break-words text-[12px] font-semibold leading-snug text-ink md:whitespace-nowrap md:text-[13px]">{d.label}</div>
          {d.sub && (
            <div className="mt-0.5 break-words font-mono text-[10px] leading-snug text-ink-3 md:whitespace-nowrap md:text-[10.5px]">{d.sub}</div>
          )}
        </div>
      </div>
    </div>
  )
}
