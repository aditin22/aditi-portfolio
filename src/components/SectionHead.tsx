import { Reveal } from './Reveal'

export function SectionHead({
  eyebrow,
  title,
  accent,
  blurb,
  invert = false,
  center = false,
}: {
  eyebrow: string
  title: string
  /** Trailing clause rendered in the light-blue accent, as on the reference. */
  accent?: string
  blurb?: string
  invert?: boolean
  center?: boolean
}) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}>
      <Reveal>
        <span
          className="t-eyebrow"
          style={{ color: invert ? 'rgba(255,255,255,0.6)' : 'var(--blue)' }}
        >
          {!invert && <span className="h-px w-7 bg-brand" />}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="t-h2" style={{ color: invert ? '#fff' : 'var(--text-primary)' }}>
          {title}
          {accent && <span className="t-acc"> {accent}</span>}
        </h2>
      </Reveal>
      {blurb && (
        <Reveal delay={0.12}>
          <p
            className={`t-sub ${center ? 'mx-auto' : ''}`}
            style={invert ? { color: 'rgba(255,255,255,0.75)' } : undefined}
          >
            {blurb}
          </p>
        </Reveal>
      )}
    </div>
  )
}
