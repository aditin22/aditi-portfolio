/** Orbiting mark: a pulsing core with a satellite tracing a 5s circle. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.2" stroke="var(--border-mid)" strokeWidth="1" opacity="0.7" />
      <circle className="logo-core" cx="12" cy="12" r="4.4" fill="var(--blue)" />
      <g className="logo-orbit">
        <circle cx="12" cy="1.8" r="2.1" fill="var(--green)" />
      </g>
    </svg>
  )
}
