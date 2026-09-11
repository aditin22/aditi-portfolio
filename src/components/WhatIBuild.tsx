import { motion } from 'framer-motion'
import { Landmark, Layers, ShieldCheck } from 'lucide-react'
import { whatIBuild } from '../data/resume'
import { RevealGroup, revealItem } from './Reveal'

const ICONS = { Layers, Landmark, ShieldCheck }
const HUES = ['tile-sky', 'tile-mint', 'tile-lilac']

/** Three cards that state the professional identity before any detail. */
export function WhatIBuild() {
  return (
    <section className="mx-auto max-w-shell px-6 pb-16 pt-14 md:pb-[68px] md:pt-16">
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {whatIBuild.map((w, i) => {
          const Icon = ICONS[w.icon as keyof typeof ICONS] ?? Layers
          return (
            <motion.div
              key={w.title}
              variants={revealItem}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className={`tile ${HUES[i]}`}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in srgb, var(--${w.accent}) 18%, transparent)`,
                  color: `var(--${w.accent}-text)`,
                }}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-[18px] font-extrabold tracking-[-0.4px] text-ink">
                {w.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{w.body}</p>
            </motion.div>
          )
        })}
      </RevealGroup>
    </section>
  )
}
