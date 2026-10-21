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
              How I work
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-display text-white">
              Requirements and code,
              <br />
              <span className="t-acc">written by the same person.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className="mt-5 max-w-[600px] text-[18px] leading-[1.6]"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Discovery with the people who will use it, requirements written down with the
              deferrals made explicit, then the code: payment activation that charges exactly once,
              financial sync that posts every entry exactly once. The work is in the edges.
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
