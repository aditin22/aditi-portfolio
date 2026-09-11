import { useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ArchNode } from './ArchNode'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useTheme } from '../store/theme'

const nodeTypes = { arch: ArchNode }

function n(
  id: string,
  x: number,
  y: number,
  data: Record<string, unknown>,
): Node {
  return { id, type: 'arch', position: { x, y }, data, draggable: true }
}

function e(
  id: string,
  source: string,
  target: string,
  opts: { label?: string; animated?: boolean; sh?: string; th?: string } = {},
): Edge {
  return {
    id,
    source,
    target,
    sourceHandle: opts.sh ?? 's-right',
    targetHandle: opts.th ?? 't-left',
    animated: opts.animated ?? true,
    label: opts.label,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
    labelBgPadding: [6, 3],
    labelBgBorderRadius: 4,
  }
}

type Diagram = { title: string; caption: string; nodes: Node[]; edges: Edge[] }

const DIAGRAMS: Record<'tally' | 'fylflix', Diagram> = {
  tally: {
    title: 'Tally Connector',
    caption:
      'A Windows Service reads 26 TallyPrime entities over local IPC, stages them in SQLite, and delta-syncs to the cloud. Every write-back is idempotent, so a retry after a network drop can never post the same financial entry twice.',
    nodes: [
      n('tally', 0, 120, { label: 'TallyPrime', sub: 'on-premise ERP', icon: 'Building2', accent: 'cloud', handles: ['right'] }),
      n('svc', 250, 120, { label: 'Windows Service', sub: '.NET 10 / C#', icon: 'Cpu', accent: 'dotnet', handles: ['left', 'right', 'bottom', 'top'] }),
      n('sqlite', 250, 260, { label: 'SQLite Stage', sub: 'delta queue', icon: 'Database', accent: 'data', handles: ['top', 'right'] }),
      n('auth', 250, -10, { label: 'OAuth 2.0', sub: 'client credentials', icon: 'ShieldCheck', accent: 'react', handles: ['bottom'] }),
      n('s3', 540, 40, { label: 'AWS S3', sub: 'document store', icon: 'Cloud', accent: 'cloud', handles: ['left'] }),
      n('pg', 540, 160, { label: 'PostgreSQL', sub: 'cloud workflows', icon: 'Server', accent: 'data', handles: ['left', 'right'] }),
      n('recon', 540, 280, { label: 'Reconciliation', sub: 'no duplicate posts', icon: 'CheckCheck', accent: 'dotnet', handles: ['left', 'top'] }),
    ],
    edges: [
      e('e1', 'tally', 'svc', { label: 'IPC' }),
      e('e2', 'svc', 'sqlite', { sh: 's-bottom', th: 't-top', label: 'stage' }),
      e('e3', 'auth', 'svc', { sh: 's-bottom', th: 't-top', animated: false, label: 'token' }),
      e('e4', 'svc', 's3', { label: 'upload' }),
      e('e5', 'svc', 'pg', { label: 'write-back' }),
      e('e6', 'sqlite', 'recon', { label: 'delta' }),
      e('e7', 'recon', 'pg', { sh: 's-top', th: 't-right', animated: false, label: 'verify' }),
    ],
  },
  fylflix: {
    title: 'FylFlix Platform',
    caption:
      'Four product surfaces share one design system and one auth core. Razorpay activation is verified by polling rather than trusting the client, and every organization boundary is enforced by RBAC before a query is ever issued.',
    nodes: [
      n('b2c', 0, 0, { label: 'B2C', sub: 'consumer app', icon: 'Users', accent: 'react', handles: ['right'] }),
      n('b2b', 0, 90, { label: 'B2B', sub: '100+ services', icon: 'Briefcase', accent: 'react', handles: ['right'] }),
      n('legal', 0, 180, { label: 'Legal', sub: 'booking & chat', icon: 'Scale', accent: 'react', handles: ['right'] }),
      n('admin', 0, 270, { label: 'Admin', sub: 'operations', icon: 'Settings', accent: 'react', handles: ['right'] }),
      n('ds', 265, 135, { label: 'Design System', sub: 'Radix + Tailwind', icon: 'Component', accent: 'react', handles: ['left', 'right', 'bottom'] }),
      n('auth', 530, 20, { label: 'Auth Core', sub: 'OAuth 2.0 · JWT', icon: 'KeyRound', accent: 'dotnet', handles: ['left', 'right'] }),
      n('rbac', 530, 135, { label: 'Multi-org RBAC', sub: 'scoped access', icon: 'ShieldCheck', accent: 'dotnet', handles: ['left', 'right'] }),
      n('pay', 530, 250, { label: 'Razorpay', sub: 'polled verification', icon: 'CreditCard', accent: 'cloud', handles: ['left', 'right'] }),
      n('api', 790, 135, { label: 'REST APIs', sub: 'PostgreSQL', icon: 'Database', accent: 'data', handles: ['left'] }),
    ],
    edges: [
      e('f1', 'b2c', 'ds'),
      e('f2', 'b2b', 'ds'),
      e('f3', 'legal', 'ds'),
      e('f4', 'admin', 'ds'),
      e('f5', 'ds', 'auth', { label: 'session' }),
      e('f6', 'ds', 'rbac'),
      e('f7', 'ds', 'pay', { label: 'checkout' }),
      e('f8', 'auth', 'api', { animated: false }),
      e('f9', 'rbac', 'api', { label: 'scoped query' }),
      e('f10', 'pay', 'api', { animated: false, label: 'idempotent activation' }),
    ],
  },
}

type Key = keyof typeof DIAGRAMS

export function Architecture() {
  const [key, setKey] = useState<Key>('tally')
  const theme = useTheme((s) => s.theme)
  const d = DIAGRAMS[key]

  // Remount React Flow when the diagram changes so fitView re-runs on the new graph.
  const flow = useMemo(
    () => (
      <ReactFlow
        key={key}
        nodes={d.nodes}
        edges={d.edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.4}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        edgesFocusable={false}
        colorMode={theme}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--border-mid)" />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    ),
    [key, d, theme],
  )

  return (
    <section id="architecture" className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
      <SectionHead
        eyebrow="System design"
        title="The diagrams behind"
        accent="the bullet points."
        blurb="Drag a node, pan the canvas, zoom in. These are the two architectures I spent the most time inside — rendered with React Flow rather than screenshotted."
      />

      <Reveal>
        <div className="mb-4 inline-flex rounded-lg border border-line bg-surface p-1 shadow-xs">
          {(Object.keys(DIAGRAMS) as Key[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKey(k)}
              aria-pressed={key === k}
              className="relative rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors"
              style={{ color: key === k ? '#fff' : 'var(--text-secondary)' }}
            >
              {key === k && (
                <span className="absolute inset-0 rounded-md bg-brand" style={{ zIndex: 0 }} />
              )}
              <span className="relative z-[1]">{DIAGRAMS[k].title}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className="h-[440px] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-card md:h-[500px]"
          style={{ background: 'var(--bg-surface)' }}
        >
          {flow}
        </div>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-ink-2">{d.caption}</p>
      </Reveal>
    </section>
  )
}

export default Architecture
