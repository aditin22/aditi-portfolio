import { create } from 'zustand'

type Theme = 'light' | 'dark'

const KEY = 'an-theme'

function apply(theme: Theme) {
  const root = document.documentElement
  // Skip the global cross-fade for one frame so the whole page flips at once
  // instead of every element easing independently.
  root.classList.add('theme-snap')
  root.classList.toggle('dark', theme === 'dark')
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => root.classList.remove('theme-snap'))
  })
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode - the pre-paint script falls back to dark */
  }
}

// Read what index.html already painted, so the store and the DOM agree.
const initial: Theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export const useTheme = create<{ theme: Theme; toggle: () => void }>((set, get) => ({
  theme: initial,
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    apply(next)
    set({ theme: next })
  },
}))
