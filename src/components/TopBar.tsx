import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#impact', label: 'Impact' },
  { href: '#projects', label: 'Projects' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
]

export function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const onHero = !scrolled
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently crossing the upper third of the viewport.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive('#' + hit.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.3] },
    )
    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        height: 'var(--topbar-h)',
        background: scrolled ? 'color-mix(in srgb, var(--bg-page) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      }}
    >
      <div className="mx-auto flex h-full max-w-shell items-center gap-4 px-5 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-[15px] font-extrabold tracking-[-0.4px] transition-colors"
          style={{ color: onHero ? '#fff' : 'var(--text-primary)' }}
        >
          <Logo />
          aditi<span className="text-brand">.</span>navhal
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors"
              style={{ color: onHero ? 'rgba(255,255,255,0.82)' : 'var(--text-secondary)' }}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: onHero ? 'rgba(255,255,255,0.16)' : 'var(--bg-surface2)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className="relative"
                style={active === l.href ? { color: onHero ? '#fff' : 'var(--text-primary)' } : undefined}
              >
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-[10px] px-4 py-2 text-[13px] font-semibold shadow-xs transition-transform hover:-translate-y-0.5 sm:block"
            style={
              onHero
                ? { background: '#fff', color: '#00699d' }
                : { background: 'var(--blue)', color: '#fff' }
            }
          >
            Get in touch
          </a>
          <button
            type="button"
            className="rounded-lg p-1.5 transition-colors md:hidden"
            style={{ color: onHero ? '#fff' : 'var(--text-secondary)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Read-progress hairline */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-pop md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface2 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get in touch
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
