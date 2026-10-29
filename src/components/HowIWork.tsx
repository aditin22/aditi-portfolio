import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { approach } from '../data/resume'
import { SectionHead } from './SectionHead'

type Step = (typeof approach)[number]

/**
 * One step of the process. Each step owns the segment of line running down to
 * the next one, drawn by its own scroll progress, so the line never has to
 * know how tall the steps are. The dot and copy light up as the line arrives.
 * Only transform and opacity animate.
 */
function StepRow({ s, i, last }: { s: Step; i: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 62%', 'end 62%'] })
  const lit = useTransform(scrollYProgress, [0, 0.12], [0.32, 1])
  const dot = useTransform(scrollYProgress, [0, 0.12], [0.55, 1])
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <li ref={ref} className="relative grid grid-cols-[40px_1fr] gap-x-5 pb-12 last:pb-0 md:grid-cols-[56px_1fr] md:gap-x-8 md:pb-16">
      {!last && (
        <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-[22px] w-[2px] bg-line md:left-[27px]">
          <motion.span
            className="absolute inset-0 origin-top"
            style={{ background: `var(--${s.accent})`, scaleY: reduced ? 1 : draw }}
          />
        </span>
      )}

      <motion.span
        aria-hidden="true"
        className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full font-mono text-[12px] font-bold text-white md:h-14 md:w-14 md:text-[13px]"
        style={{ background: `var(--${s.accent})`, scale: reduced ? 1 : dot }}
      >
        {String(i + 1).padStart(2, '0')}
      </motion.span>

      <motion.div style={{ opacity: reduced ? 1 : lit }} className="min-w-0 pt-1.5 md:pt-3">
        <h3 className="font-display text-[22px] font-extrabold tracking-[-0.6px] text-ink md:text-[26px]">{s.title}</h3>
        <p className="mt-1.5 max-w-[620px] text-[16px] leading-relaxed text-ink-2">{s.body}</p>
        <p
          className="mt-4 max-w-[680px] rounded-xl px-4 py-3 text-[13.5px] leading-relaxed text-ink-2"
          style={{ background: `color-mix(in srgb, var(--${s.accent}) 10%, transparent)` }}
        >
          <span className="mr-2 font-mono text-[10.5px] font-bold uppercase tracking-[1.3px]" style={{ color: `var(--${s.accent}-text)` }}>
            Where
          </span>
          {s.proof}
        </p>
      </motion.div>
    </li>
  )
}

/** The approach, as four steps joined by a line that draws itself on scroll. */
export function HowIWork() {
  return (
    <section id="approach" className="mx-auto max-w-shell px-6 pb-16 pt-14 md:pb-[68px] md:pt-16">
      <SectionHead
        eyebrow="How I work"
        title="The same four steps,"
        accent="on every project."
        blurb="Each step with where it happened, so the approach is something you can check rather than take on trust."
      />
      <ol className="relative">
        {approach.map((s, i) => (
          <StepRow key={s.title} s={s} i={i} last={i === approach.length - 1} />
        ))}
      </ol>
    </section>
  )
}
