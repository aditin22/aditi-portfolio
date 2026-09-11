import { stats } from '../data/resume'
import { Counter } from './Counter'
import { RevealGroup, revealItem } from './Reveal'
import { motion } from 'framer-motion'

/** Four figures in a divided strip, bordered top and bottom. */
export function Stats() {
  return (
    <section className="border-y border-line py-10 md:py-14">
      <RevealGroup className="mx-auto grid max-w-shell grid-cols-2 gap-y-8 px-6 md:grid-cols-4 md:gap-y-0">
        {stats.map((s) => (
          <motion.div key={s.label} variants={revealItem} className="stat px-2 text-center md:px-5">
            <div
              className="font-display font-extrabold leading-none text-ink"
              style={{ fontSize: 'clamp(34px, 4vw, 46px)', letterSpacing: '-1.4px' }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2.5 text-[13px] tracking-[0.3px] text-ink-3">{s.label}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  )
}
