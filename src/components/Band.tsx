import { Reveal } from './Reveal'
import { Terminal } from './Terminal'

/**
 * Full-bleed colour band. The reference uses these to break a long dark page
 * into chapters; this one carries the positioning statement and the terminal.
 */
export function Band() {
  return (
    <section className="band overflow-hidden py-16 md:py-[72px]">
      <div className="mx-auto grid max-w-shell items-center gap-10 px-6 md:grid-cols-[1fr_0.95fr] md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="min-w-0">
          <Reveal>
            <span className="t-eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Meet the engineer
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-display text-white">
              I build the parts that
              <br />
              <span className="t-acc">can't be wrong.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className="mt-5 max-w-[600px] text-[18px] leading-[1.6]"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Payment activation that can't double-charge. Financial sync that can't post twice.
              Reconciliation a hedge fund closes its books on. The work is mostly in the edges.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="min-w-0">
          <Terminal />
        </Reveal>
      </div>
    </section>
  )
}
