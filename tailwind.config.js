/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        surface: 'var(--surface)',
        'surface-sunken': 'var(--surface-sunken)',
        'surface-raised': 'var(--surface-raised)',
        hairline: 'var(--hairline)',
        'hairline-strong': 'var(--hairline-strong)',
        track: 'var(--track)',

        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        'ink-inverse': 'var(--ink-inverse)',

        // Action / data — the single accent
        action: 'var(--action)',
        'action-ink': 'var(--action-ink)',
        'action-tint': 'var(--action-tint)',
        'action-border': 'var(--action-border)',
        'action-bar': 'var(--action-bar)',

        // Semantic: pass, attention, deduction
        pass: 'var(--pass)',
        'pass-fill': 'var(--pass-fill)',
        'pass-tint': 'var(--pass-tint)',
        'pass-border': 'var(--pass-border)',

        warn: 'var(--warn)',
        'warn-fill': 'var(--warn-fill)',
        'warn-tint': 'var(--warn-tint)',
        'warn-border': 'var(--warn-border)',

        bad: 'var(--bad)',
        'bad-fill': 'var(--bad-fill)',
        'bad-tint': 'var(--bad-tint)',
        'bad-border': 'var(--bad-border)',

        // Legacy / University tokens for compatibility
        university: {
          dark: '#080c14',
          card: '#0f172a',
          accent: '#4f46e5',
          gold: '#f59e0b',
          crimson: '#e11d48',
          teal: '#0d9488',
        }
      },

      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        'hero': ['48px', { lineHeight: '1', letterSpacing: '-2px', fontWeight: '700' }],
        'hero-den': ['19px', { lineHeight: '1', fontWeight: '500' }],
        'stat': ['30px', { lineHeight: '1', letterSpacing: '-1px', fontWeight: '700' }],
        'cell': ['17px', { lineHeight: '1', fontWeight: '700' }],
        'screen-title': ['18px', { lineHeight: '1', letterSpacing: '-0.45px', fontWeight: '700' }],
        'card-title': ['15px', { lineHeight: '1', letterSpacing: '-0.2px', fontWeight: '700' }],
        'label': ['10.5px', { lineHeight: '1', letterSpacing: '0.06em', fontWeight: '600' }],
        'micro': ['11px', { lineHeight: '1.3' }],
        'meta': ['11.5px', { lineHeight: '1' }],
        'body-sm': ['12.5px', { lineHeight: '1.55' }],
      },

      borderRadius: {
        'badge': '4px',
        'pill': '6px',
        'chip': '7px',
        'field': '8px',
        'tile': '9px',
        'inner': '10px',
        'card': '12px',
        'role': '20px',
      },

      boxShadow: {
        'avatar': '0 1px 4px rgba(15,23,42,.12)',
        'focus': '0 0 0 3px var(--focus-ring)',
      },

      keyframes: {
        agRise: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        agGrow: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        agPopIn: {
          from: { opacity: '0', transform: 'scale(.55)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        agShimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        agPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        agSpin: {
          to: { transform: 'rotate(360deg)' },
        },
        agFade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },

      animation: {
        rise: 'agRise .5s cubic-bezier(.2,.8,.2,1) both',
        grow: 'agGrow .9s cubic-bezier(.2,.8,.2,1) both',
        popIn: 'agPopIn .45s cubic-bezier(.2,1.4,.4,1) both',
        shimmer: 'agShimmer 1.5s linear infinite',
        livePulse: 'agPulse 1.4s ease-in-out infinite',
        slowPulse: 'agPulse 1.8s ease-in-out infinite',
        ring: 'agSpin .7s linear infinite',
        fade: 'agFade .3s ease-out both',
      },
    },
  },
  plugins: [],
}
