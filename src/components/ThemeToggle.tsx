import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../store/theme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className="theme-toggle relative h-6 w-[46px] flex-shrink-0 rounded-full border-[1.5px] outline-none transition-colors"
      style={{
        background: dark ? 'var(--blue)' : 'var(--bg-surface3)',
        borderColor: dark ? 'var(--blue)' : 'var(--border)',
      }}
    >
      <Moon
        size={12}
        className="pointer-events-none absolute left-[5px] top-1/2 -translate-y-1/2 transition-opacity"
        style={{ color: '#a9e2ff', opacity: dark ? 1 : 0 }}
      />
      <Sun
        size={12}
        className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/2 transition-opacity"
        style={{ color: '#9aa0a6', opacity: dark ? 0 : 1 }}
      />
      <span
        className="theme-toggle-knob absolute left-[2px] top-[2px] h-[17px] w-[17px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: dark ? 'translateX(22px)' : 'translateX(0)' }}
      />
    </button>
  )
}
