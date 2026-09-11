import { useEffect, useRef } from 'react'

type P = { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Constellation canvas behind the hero. Nodes drift, near-neighbours get a
 * line, and the cursor pushes a soft wake through the field. Everything is
 * drawn from CSS tokens so it re-tints with the theme, and the RAF loop stops
 * whenever the section scrolls out of view or the user prefers reduced motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let running = true
    let w = 0
    let h = 0
    let dots: P[] = []
    const mouse = { x: -9999, y: -9999 }

    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      return {
        line: cs.getPropertyValue('--blue').trim() || '#35aae5',
        dot: cs.getPropertyValue('--blue-mid').trim() || '#89c4e2',
        alt: cs.getPropertyValue('--dotnet').trim() || '#8f74ff',
      }
    }
    let palette = read()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Density scales with area, capped so phones stay smooth.
      const count = Math.min(90, Math.max(28, Math.round((w * h) / 16000)))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.7 + 1.1,
      }))
    }

    const LINK = 132
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of dots) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
        }
        // Wrap rather than bounce — no visible walls.
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // Cursor wake: nudge anything inside the radius gently outward.
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 130 * 130 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const push = (1 - d / 130) * 0.9
          p.x += (dx / d) * push
          p.y += (dy / d) * push
        }
      }

      // Links first so dots sit on top of them.
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d > LINK) continue
          const near = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < 150
          ctx.globalAlpha = (1 - d / LINK) * (near ? 0.55 : 0.24)
          ctx.strokeStyle = near ? palette.alt : palette.line
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const p of dots) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 150
        ctx.globalAlpha = near ? 0.95 : 0.62
        ctx.fillStyle = near ? palette.alt : palette.dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      if (running) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Idle the loop when the hero is off-screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(draw)
        } else if (!e.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const themeObs = new MutationObserver(() => {
      palette = read()
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      themeObs.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
