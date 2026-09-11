import { stats } from '../data/resume'
import { Counter } from './Counter'
import { RevealGroup, revealItem } from './Reveal'
import { motion } from 'framer-motion'

/** Four figures in a divided strip, bordered top and bottom. */
export function Stats() {
  return (
    <section className="border-y border-line py-10 md:py-14">
      <RevealGroup className="mx-auto grid max-w-shell grid-cols-3 gap-y-8 px-6 md:grid-cols-6 md:gap-y-0">
        {stats.map((s) => (
          <motion.div key={s.label} variants={revealItem} className="stat px-2 text-center md:px-5">
            <div
              className="font-display font-extrabold leading-none text-ink"
              style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', letterSpacing: '-1.2px' }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-[12px] leading-snug tracking-[0.2px] text-ink-3 md:text-[12.5px]">{s.label}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  )
}
