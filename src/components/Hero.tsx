import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { marquee, profile } from '../data/resume'
import { HeroCube } from './HeroCube'
import { ParticleField } from './ParticleField'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * Full-bleed gradient hero: centred type over a deep blue wash, two soft orbs
 * for depth, and the stack rail running along the bottom edge.
 */
export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="hero-gradient relative flex flex-col overflow-hidden"
      style={{ minHeight: 'calc(100dvh - 48px)' }}
    >
      <span className="hero-orb hero-orb-a" aria-hidden="true" />
      <span className="hero-orb hero-orb-b" aria-hidden="true" />
      <ParticleField />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1220px] flex-1 items-center gap-10 px-6 pb-6 pt-32 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={rise}
            className="t-eyebrow"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <span className="live-dot" />
            Open to Software Engineer roles
          </motion.span>

          <motion.h1 variants={rise} className="t-h1 text-white">
            <span className="block">Three years of</span>
            <span className="block">enterprise systems.</span>
            <span className="t-acc block">Shipped.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[560px] text-[17px] leading-[1.6]"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            {profile.name} — Software Engineer building with C#, .NET Core, React and SQL.
            Payments, hedge-fund reconciliation and offline-to-cloud sync, built to stay correct
            under real load.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#work" className="btn-white">
              See the work
              <ArrowRight size={17} />
            </a>
            <a href={`mailto:${profile.email}`} className="btn-glass">
              <Mail size={17} />
              Get in touch
            </a>
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-7 text-[13px] font-semibold uppercase tracking-[1.6px]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {profile.location} · 3 years experience
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <HeroCube />
        </motion.div>
      </div>

      {/* Stack rail, white-on-gradient like the reference's company strip */}
      <div className="marquee-rail relative z-[2] w-full overflow-hidden pb-7">
        <div className="marquee-track flex w-max items-center gap-[30px] pr-[30px]" aria-hidden="true">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap text-[15px] font-semibold"
              style={{ color: 'rgba(255,255,255,0.86)' }}
            >
              {t}
              <span
                className="ml-[22px] h-1 w-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              />
            </span>
          ))}
        </div>
        <span className="sr-only">Technologies: {marquee.join(', ')}</span>
      </div>

      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-2 z-[2] mx-auto h-6 w-px"
          style={{ background: 'rgba(255,255,255,0.4)' }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </section>
  )
}
