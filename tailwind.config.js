/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Open Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        page: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        surface2: 'var(--bg-surface2)',
        surface3: 'var(--bg-surface3)',
        hover: 'var(--bg-hover)',
        line: 'var(--border)',
        'line-mid': 'var(--border-mid)',
        ink: 'var(--text-primary)',
        'ink-2': 'var(--text-secondary)',
        'ink-3': 'var(--text-muted)',
        'ink-4': 'var(--text-hint)',
        brand: 'var(--blue)',
        'brand-dark': 'var(--blue-dark)',
        'brand-light': 'var(--blue-light)',
        'brand-text': 'var(--blue-text)',
        ok: 'var(--green)',
        warn: 'var(--yellow)',
        bad: 'var(--red)',
      },
      boxShadow: {
        xs: 'var(--shadow-sm)',
        card: 'var(--shadow)',
        pop: 'var(--shadow-md)',
        float: 'var(--shadow-lg)',
      },
      maxWidth: { shell: '1120px' },
    },
  },
  plugins: [],
}
