/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      // ── All colors point to CSS variables defined in src/index.css ──
      // To retheme the entire site, only edit the :root block in index.css
      colors: {
        canvas:      'var(--color-canvas)',
        surface:     'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',
        parchment:   'var(--color-parchment)',

        border:        'var(--color-border)',
        'border-warm': 'var(--color-border-warm)',

        ink:     'var(--color-ink)',
        'ink-2': 'var(--color-ink-2)',
        'ink-3': 'var(--color-ink-3)',
        'ink-4': 'var(--color-ink-4)',

        accent:         'var(--color-accent)',
        'accent-2':     'var(--color-accent-2)',
        'accent-warm':  'var(--color-accent-warm)',
        'accent-muted': 'var(--color-accent-muted)',
        sienna:         'var(--color-sienna)',
        sand:           'var(--color-sand)',

        dark:    'var(--color-dark)',
        'dark-2':'var(--color-dark-2)',
        'dark-3':'var(--color-dark-3)',
        'dark-4':'var(--color-dark-4)',
      },
      backgroundImage: {
        'warm-gradient':    'linear-gradient(135deg, var(--color-canvas) 0%, var(--color-surface) 50%, var(--color-surface-2) 100%)',
        'accent-gradient':  'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%)',
        'sienna-gradient':  'linear-gradient(135deg, var(--color-sienna) 0%, var(--color-accent) 100%)',
      },
      boxShadow: {
        'soft':     '0 1px 3px 0 rgba(74,39,24,0.07), 0 1px 2px -1px rgba(74,39,24,0.04)',
        'card':     '0 2px 12px -2px rgba(74,39,24,0.10), 0 1px 4px -1px rgba(74,39,24,0.06)',
        'elevated': '0 8px 32px -8px rgba(74,39,24,0.18), 0 2px 8px -2px rgba(74,39,24,0.08)',
        'glow':     '0 0 0 3px rgba(89,34,25,0.12)',
        'warm':     '0 4px 24px -4px rgba(89,34,25,0.15)',
      },
    },
  },
  plugins: [],
};
