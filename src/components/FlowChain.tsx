import { ArrowRight } from 'lucide-react'
import type { Accent } from '../data/resume'

/**
 * A pipeline as a row of steps. A bare "→" entry renders as a divider -
 * used to split a before/after chain like a modernization.
 */
export function FlowChain({ title, steps, accent }: { title: string; steps: string[]; accent: Accent }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[1.3px] text-ink-4">
        {title}
      </div>
      <ol className="flex flex-wrap items-center gap-y-2">
        {steps.map((step, i) => {
          if (step === '→') {
            return (
              <li key={i} className="mx-2 flex items-center" aria-hidden="true">
                <span className="h-px w-5" style={{ background: `var(--${accent})` }} />
                <ArrowRight size={14} style={{ color: `var(--${accent})` }} />
              </li>
            )
          }
          const next = steps[i + 1]
          const showArrow = next !== undefined && next !== '→'
          return (
            <li key={i} className="flex items-center">
              <span
                className="rounded-md px-2.5 py-1.5 text-[12.5px] font-semibold text-ink"
                style={{ background: 'color-mix(in srgb, var(--bg-page) 50%, transparent)' }}
              >
                {step}
              </span>
              {showArrow && (
                <ArrowRight
                  size={13}
                  className="mx-1.5 flex-shrink-0"
                  style={{ color: `var(--${accent})` }}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
