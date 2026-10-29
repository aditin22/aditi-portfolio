import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { marquee, profile } from '../data/resume'
import { HeroCube } from './HeroCube'
import { ParticleField } from './ParticleField'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/** Headline words rise one at a time: 20px up and in, 80ms apart. */
const word = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

function Words({ text }: { text: string }) {
  const parts = text.split(' ')
  return (
    <>
      {parts.map((w, i) => (
        <span key={i}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

/**
 * "I" followed by one verb of the job at a time. Every phrase sits in the same
 * grid cell, so the cell is as wide as the longest one and the line never
 * jumps as they swap; only opacity and transform change. Reduced motion gets
 * the whole sentence, still.
 */
function Rotator({ phrases }: { phrases: string[] }) {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced) return
    const t = window.setInterval(() => setI((v) => (v + 1) % phrases.length), 2200)
    return () => window.clearInterval(t)
  }, [reduced, phrases.length])

  const sentence = `I ${phrases.slice(0, -1).map((p) => p.replace(/\.$/, '')).join(', ')} and ${phrases[phrases.length - 1]}`
  if (reduced) return <>{sentence}</>

  const prev = (i - 1 + phrases.length) % phrases.length
  return (
    <>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true" className="inline-flex max-w-full gap-[0.28em] text-left">
        <span>I</span>
        <span className="inline-grid min-w-0">
          {phrases.map((p, k) => (
            <motion.span
              key={p}
              className="col-start-1 row-start-1 text-white"
              initial={false}
              animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : k === prev ? -14 : 14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {p}
            </motion.span>
          ))}
        </span>
      </span>
    </>
  )
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

      <div className="relative z-[2] mx-auto grid w-full max-w-[1220px] flex-1 items-center gap-10 px-6 pb-6 pt-28 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={rise}
            className="t-eyebrow"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <span className="live-dot" />
            Open to opportunities
          </motion.span>

          <motion.h1
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="t-h1 text-white"
          >
            <span className="block">
              <Words text={profile.name} />
            </span>
            <span className="t-acc block">
              <Words text={`${profile.role}.`} />
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-4 font-display text-[18px] font-bold tracking-[-0.3px] md:text-[22px]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <Rotator phrases={profile.rotator} />
          </motion.p>

          <motion.ul
            variants={rise}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 lg:justify-start"
            aria-label="Core stack"
          >
            {profile.tagline.map((t, i) => (
              <li key={t} className="flex items-center gap-2 text-[14px] font-semibold text-white">
                {/* Separator leads the item so a wrapped line never ends in a dangling dot. */}
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(255,255,255,0.45)' }} />
                )}
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={rise}
            className="mt-5 max-w-[560px] text-[15.5px] leading-[1.55] md:mt-6 md:text-[17px] md:leading-[1.6]"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {profile.positioning}
          </motion.p>

          <motion.div variants={rise} className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {[`${profile.years} years experience`, profile.location].map((t) => (
              <span
                key={t}
                className="rounded-md px-2.5 py-1 font-mono text-[12px] font-medium text-white"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)' }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={rise} className="mt-7 flex flex-nowrap items-center justify-center gap-2.5 md:mt-8 md:gap-3 lg:justify-start">
            <a href="#work" className="btn-white btn-compact">
              View projects
              <ArrowRight size={16} />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
              download
              className="btn-glass btn-compact"
            >
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-6 flex items-center justify-center gap-5 lg:justify-start"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </motion.div>
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
