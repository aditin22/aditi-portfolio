import { motion } from 'framer-motion'
import { BarPair, Donut, Rails, Spark } from './charts'
import { RevealGroup, revealItem } from './Reveal'
import { SectionHead } from './SectionHead'

const TILES = [
  {
    kind: 'bars' as const,
    hue: 'tile-lilac',
    title: 'RECON modernization',
    note: '.NET Framework → .NET Core + React',
  },
  {
    kind: 'rails' as const,
    hue: 'tile-mint',
    title: 'Reporting ETL runtime',
    note: 'SQL / SSIS pipeline tuning',
  },
  {
    kind: 'donut' as const,
    hue: 'tile-sand',
    title: 'SSRS reports automated',
    note: 'PwC · Carronade · Aurelius',
  },
  {
    kind: 'spark' as const,
    hue: 'tile-sky',
    title: 'Shipping cadence',
    note: '25% faster release cycles',
  },
]

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden">
      <div className="mx-auto max-w-shell px-6 py-16 md:py-[68px]">
        <SectionHead
          eyebrow="Measured impact"
          title="The numbers,"
          accent="drawn."
          blurb="Every figure here is one I own from a shipped system."
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => (
            <motion.figure
              key={t.title}
              variants={revealItem}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`tile ${t.hue} group relative overflow-hidden`}
            >
              {t.kind === 'bars' && (
                <BarPair
                  accent="dotnet"
                  a={{ label: 'Legacy', value: 100, caption: '100%' }}
                  b={{ label: 'Rebuilt', value: 70, caption: '−30%' }}
                />
              )}
              {t.kind === 'rails' && (
                <Rails
                  accent="data"
                  rows={[
                    { label: 'Before', value: 6, display: '6 hrs', muted: true },
                    { label: 'After', value: 2, display: '2 hrs' },
                  ]}
                />
              )}
              {t.kind === 'donut' && (
                <Donut value={100} suffix="+" pct={92} accent="cloud" caption="across 6 report families" />
              )}
              {t.kind === 'spark' && <Spark accent="react" points={[1, 3, 4, 6, 8, 10]} />}

              <figcaption className="mt-5">
                <h3 className="font-display text-[15px] font-bold tracking-[-0.3px] text-ink">
                  {t.title}
                </h3>
                <p className="mt-1 text-[12.5px] text-ink-3">{t.note}</p>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
