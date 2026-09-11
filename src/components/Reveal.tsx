import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Only the bottom edge is pulled in, so an entrance fires just before the
 * element rises into view. Trimming the top edge too would mean anything
 * already sitting at the top of the viewport — which is exactly where an
 * anchor jump lands a section — never triggers, leaving it invisible until
 * the visitor happens to scroll.
 */
export const VIEWPORT_MARGIN = '0px 0px -12% 0px'

/**
 * True once the element is in view, has been scrolled clean past, or is on
 * screen with nowhere left to scroll.
 *
 * The second case is not theoretical: an anchor jump moves the page by
 * thousands of pixels between two frames, so an element can go from below the
 * fold to above it without ever being observed as intersecting. The third
 * covers the trim zone — the bottom 12% is deliberately excluded so entrances
 * fire a beat early, but whatever sits there when the page is already at its
 * maximum scroll would otherwise wait for a scroll that can never happen.
 * Either way the result is content stuck at opacity 0 for the session.
 */
function useRevealed(ref: React.RefObject<HTMLElement>) {
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const [forced, setForced] = useState<'past' | 'pinned' | null>(null)

  useEffect(() => {
    if (inView || forced) return
    const check = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 0) {
        setForced('past')
        return
      }
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 2
      if (atBottom && r.top < window.innerHeight && r.bottom > 0) setForced('pinned')
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [ref, inView, forced])

  // Only a scrolled-past element skips its entrance — nobody is looking at it.
  // A pinned one is on screen, so it still gets the animation.
  return { show: inView || forced !== null, skip: forced === 'past' && !inView }
}

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Scroll-triggered entrance. Fires once, respects reduced-motion. */
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { show, skip } = useRevealed(ref)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={
        skip || reduced
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  )
}

/** Staggers direct children that use `revealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { show, skip } = useRevealed(ref)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      variants={{ show: { transition: { staggerChildren: skip ? 0 : stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}
