import { useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ArchNode } from './ArchNode'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { useDiagram, type DiagramKey } from '../store/diagram'
import { useTheme } from '../store/theme'

const nodeTypes = { arch: ArchNode }

type Side = 'top' | 'right' | 'bottom' | 'left'
type XY = readonly [number, number]

type NodeSpec = {
  id: string
  label: string
  sub: string
  icon: string
  accent: 'react' | 'dotnet' | 'data' | 'cloud'
  /** Wide layout: laid out left-to-right. */
  wide: XY
  wideHandles: Side[]
  /** Narrow layout: a single column that reads as a pipeline on a phone. */
  narrow: XY
  narrowHandles: Side[]
}

type EdgeSpec = {
  id: string
  source: string
  target: string
  label?: string
  animated?: boolean
  /** [sourceHandle, targetHandle] per layout. */
  wide: readonly [string, string]
  narrow: readonly [string, string]
}

/**
 * Two hand-placed layouts per diagram rather than one graph scaled down.
 * Fitting the wide layout into a phone drove React Flow's zoom to 0.56, which
 * rendered 13px node labels at 7px - legible only in principle. The narrow
 * layout is tall and single-column so it fits at roughly 1:1.
 */
const DIAGRAMS = {
  tally: {
    title: 'Tally Connector',
    caption:
      'A Windows Service reads 26 TallyPrime entities over local IPC, stages them in SQLite, and delta-syncs to the cloud. Every write-back is idempotent, so a retry after a network drop can never post the same financial entry twice.',
    nodes: [
      { id: 'tally', label: 'TallyPrime', sub: 'on-premise ERP', icon: 'Building2', accent: 'cloud',
        wide: [0, 120], wideHandles: ['right'], narrow: [0, 0], narrowHandles: ['bottom'] },
      { id: 'auth', label: 'OAuth 2.0', sub: 'client credentials', icon: 'ShieldCheck', accent: 'react',
        wide: [250, -10], wideHandles: ['bottom'], narrow: [158, 92], narrowHandles: ['left'] },
      { id: 'svc', label: 'Windows Service', sub: '.NET 10 / C#', icon: 'Cpu', accent: 'dotnet',
        wide: [250, 120], wideHandles: ['left', 'right', 'bottom', 'top'], narrow: [0, 92], narrowHandles: ['top', 'right', 'bottom'] },
      { id: 'sqlite', label: 'SQLite Stage', sub: 'delta queue', icon: 'Database', accent: 'data',
        wide: [250, 260], wideHandles: ['top', 'right'], narrow: [0, 200], narrowHandles: ['top', 'bottom'] },
      { id: 'recon', label: 'Reconciliation', sub: 'no duplicate posts', icon: 'CheckCheck', accent: 'dotnet',
        wide: [540, 280], wideHandles: ['left', 'top'], narrow: [0, 308], narrowHandles: ['top', 'bottom'] },
      { id: 'pg', label: 'PostgreSQL', sub: 'cloud workflows', icon: 'Server', accent: 'data',
        wide: [540, 160], wideHandles: ['left', 'right'], narrow: [0, 416], narrowHandles: ['top', 'right', 'bottom'] },
      { id: 's3', label: 'AWS S3', sub: 'document store', icon: 'Cloud', accent: 'cloud',
        wide: [540, 40], wideHandles: ['left'], narrow: [0, 524], narrowHandles: ['top'] },
    ] satisfies NodeSpec[],
    edges: [
      { id: 'e1', source: 'tally', target: 'svc', label: 'IPC', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'e3', source: 'auth', target: 'svc', label: 'token', animated: false, wide: ['s-bottom', 't-top'], narrow: ['s-left', 't-right'] },
      { id: 'e2', source: 'svc', target: 'sqlite', label: 'stage', wide: ['s-bottom', 't-top'], narrow: ['s-bottom', 't-top'] },
      { id: 'e6', source: 'sqlite', target: 'recon', label: 'delta', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'e7', source: 'recon', target: 'pg', label: 'verify', animated: false, wide: ['s-top', 't-right'], narrow: ['s-bottom', 't-top'] },
      { id: 'e5', source: 'svc', target: 'pg', label: 'write-back', wide: ['s-right', 't-left'], narrow: ['s-right', 't-right'] },
      { id: 'e4', source: 'pg', target: 's3', label: 'upload', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
    ] satisfies EdgeSpec[],
  },
  fylflix: {
    title: 'FylFlix Platform',
    caption:
      'Four product surfaces share one design system and one auth core. Razorpay activation is verified by polling rather than trusting the client, and every organization boundary is enforced by RBAC before a query is ever issued.',
    nodes: [
      { id: 'b2c', label: 'B2C', sub: 'consumer app', icon: 'Users', accent: 'react',
        wide: [0, 0], wideHandles: ['right'], narrow: [0, 0], narrowHandles: ['bottom'] },
      { id: 'b2b', label: 'B2B', sub: '100+ services', icon: 'Briefcase', accent: 'react',
        wide: [0, 90], wideHandles: ['right'], narrow: [158, 0], narrowHandles: ['bottom'] },
      { id: 'legal', label: 'Legal', sub: 'booking & chat', icon: 'Scale', accent: 'react',
        wide: [0, 180], wideHandles: ['right'], narrow: [0, 74], narrowHandles: ['bottom'] },
      { id: 'admin', label: 'Admin', sub: 'operations', icon: 'Settings', accent: 'react',
        wide: [0, 270], wideHandles: ['right'], narrow: [158, 74], narrowHandles: ['bottom'] },
      { id: 'ds', label: 'Design System', sub: 'Radix + Tailwind', icon: 'Component', accent: 'react',
        wide: [265, 135], wideHandles: ['left', 'right', 'bottom'], narrow: [79, 164], narrowHandles: ['top', 'bottom'] },
      { id: 'auth', label: 'Auth Core', sub: 'OAuth 2.0 · JWT', icon: 'KeyRound', accent: 'dotnet',
        wide: [530, 20], wideHandles: ['left', 'right'], narrow: [0, 258], narrowHandles: ['top', 'bottom'] },
      { id: 'rbac', label: 'Multi-org RBAC', sub: 'scoped access', icon: 'ShieldCheck', accent: 'dotnet',
        wide: [530, 135], wideHandles: ['left', 'right'], narrow: [158, 258], narrowHandles: ['top', 'bottom'] },
      { id: 'pay', label: 'Razorpay', sub: 'polled verification', icon: 'CreditCard', accent: 'cloud',
        wide: [530, 250], wideHandles: ['left', 'right'], narrow: [79, 348], narrowHandles: ['top', 'bottom'] },
      { id: 'api', label: 'REST APIs', sub: 'PostgreSQL', icon: 'Database', accent: 'data',
        wide: [790, 135], wideHandles: ['left'], narrow: [79, 438], narrowHandles: ['top'] },
    ] satisfies NodeSpec[],
    edges: [
      { id: 'f1', source: 'b2c', target: 'ds', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f2', source: 'b2b', target: 'ds', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f3', source: 'legal', target: 'ds', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f4', source: 'admin', target: 'ds', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f5', source: 'ds', target: 'auth', label: 'session', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f6', source: 'ds', target: 'rbac', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f7', source: 'ds', target: 'pay', label: 'checkout', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f8', source: 'auth', target: 'api', animated: false, wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f9', source: 'rbac', target: 'api', label: 'scoped query', wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
      { id: 'f10', source: 'pay', target: 'api', label: 'idempotent activation', animated: false, wide: ['s-right', 't-left'], narrow: ['s-bottom', 't-top'] },
    ] satisfies EdgeSpec[],
  },
} as const

type Key = DiagramKey

/**
 * True below the `lg` breakpoint, kept in sync with ArchNode's classes.
 * Tablets take the vertical layout too: squeezing the wide graph into 768px
 * drove FylFlix to 0.63 zoom with 10px labels.
 */
function useNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const on = (e: MediaQueryListEvent) => setNarrow(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return narrow
}

export function Architecture() {
  const key = useDiagram((s) => s.key)
  const setKey = useDiagram((s) => s.open)
  const theme = useTheme((s) => s.theme)
  const narrow = useNarrow()
  const d = DIAGRAMS[key]

  const nodes: Node[] = useMemo(
    () =>
      d.nodes.map((n) => {
        const [x, y] = narrow ? n.narrow : n.wide
        return {
          id: n.id,
          type: 'arch',
          position: { x, y },
          draggable: true,
          data: {
            label: n.label,
            sub: n.sub,
            icon: n.icon,
            accent: n.accent,
            handles: narrow ? n.narrowHandles : n.wideHandles,
          },
        }
      }),
    [d, narrow],
  )

  const edges: Edge[] = useMemo(
    () =>
      d.edges.map((e) => {
        const [sh, th] = narrow ? e.narrow : e.wide
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: sh,
          targetHandle: th,
          animated: e.animated ?? true,
          label: e.label,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 4,
        }
      }),
    [d, narrow],
  )

  return (
    <section id="architecture" className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
      <SectionHead
        eyebrow="System design"
        title="The diagrams behind"
        accent="the bullet points."
        blurb="Drag a node or pan the canvas. These are the two architectures I spent the most time inside - rendered with React Flow rather than screenshotted."
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
              {key === k && <span className="absolute inset-0 rounded-md bg-brand" style={{ zIndex: 0 }} />}
              <span className="relative z-[1]">{DIAGRAMS[k].title}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        {/* Narrow screens get a tall box: the vertical layout is a column, and
            with zoom locked, fitView is the only thing that sizes the diagram -
            so the box's proportions decide how large the nodes render. The
            heights below let it scale *up* past 1:1 rather than stay compact. */}
        <div className="h-[640px] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:h-[760px] lg:h-[500px]">
          <ReactFlow
            key={`${key}-${narrow ? 'n' : 'w'}`}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: narrow ? 0.04 : 0.18 }}
            minZoom={0.4}
            maxZoom={1.35}
            /* The diagram is fitted on mount; a visitor can drag nodes and pan,
               but not zoom - wheel, pinch and double-click all stay inert so
               scrolling past the section never hijacks the page. */
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            nodesConnectable={false}
            edgesFocusable={false}
            colorMode={theme}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--border-mid)" />
          </ReactFlow>
        </div>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-ink-2">{d.caption}</p>
      </Reveal>
    </section>
  )
}

export default Architecture
