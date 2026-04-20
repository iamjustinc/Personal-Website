import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Dark ocean system ───────────────────────────────────────────────
        bg:              '#0A1628',  // deep ocean navy, page base
        'bg-mid':        '#0D1E35',  // mid-depth layer
        surface:         '#0F2A3D',  // panel / card surface
        'surface-muted': '#0B1F31',  // recessed surface
        'surface-bright':'#142E44',  // elevated surface (hover, active)
        border:          'rgba(15,122,122,0.18)',  // teal border at low opacity
        'border-bright': 'rgba(15,122,122,0.35)',  // hover/focus border

        // ── Typography ──────────────────────────────────────────────────────
        'text-base':  '#E8F4F8',   // near-white, slightly warm
        'text-muted': '#A8C5D1',   // muted teal-slate

        // ── Accent system ───────────────────────────────────────────────────
        accent:         '#0F7A7A',  // primary teal
        'accent-bright':'#4A9FAE',  // lighter aqua (gradient pair)
        'accent-hover': '#0E6B6B',  // pressed teal
        gold:           '#C4974A',  // dune gold, selective highlight
        'gold-muted':   '#E8D5AE',  // soft gold tint

        // accent-sub used as direct rgba; see lib/utils.ts
        link: '#4A9FAE',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'Menlo',     'monospace'],
      },
      fontSize: {
        hero: ['clamp(52px,7.5vw,96px)', { lineHeight: '1.0',  letterSpacing: '-0.02em'  }],
        h1:   ['clamp(36px,5vw,56px)',   { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        h2:   ['clamp(24px,3vw,36px)',   { lineHeight: '1.15', letterSpacing: '-0.01em'  }],
        h3:   ['clamp(18px,2vw,22px)',   { lineHeight: '1.3'                              }],
      },
      borderRadius: {
        card:   '20px',
        panel:  '14px',
        btn:    '8px',
        tag:    '6px',
        status: '10px',
        pill:   '9999px',
      },
      boxShadow: {
        card:        '0 2px 20px rgba(0,0,0,0.35)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.50)',
        'panel-sm':  '0 2px 12px rgba(0,0,0,0.30)',
        panel:       '0 4px 28px rgba(0,0,0,0.40)',
        'panel-deep':'0 12px 56px rgba(0,0,0,0.55)',
        glow:        '0 0 32px rgba(15,122,122,0.25)',
        'glow-gold': '0 0 20px rgba(196,151,74,0.30)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        float1: {
          '0%,100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%':     { transform: 'translateY(-8px) rotate(-3deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%':     { transform: 'translateY(-6px) rotate(2deg)' },
        },
        float3: {
          '0%,100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%':     { transform: 'translateY(-10px) rotate(-1.5deg)' },
        },
        shoot: {
          '0%':   { transform: 'translate(0,0) scaleX(0)', opacity: '0' },
          '5%':   { opacity: '1', transform: 'translate(0,0) scaleX(1)' },
          '100%': { transform: 'translate(400px, 200px) scaleX(1)', opacity: '0' },
        },
      },
      animation: {
        float1: 'float1 5s ease-in-out infinite',
        float2: 'float2 6s ease-in-out infinite 0.8s',
        float3: 'float3 4.5s ease-in-out infinite 1.6s',
        shoot:  'shoot var(--shoot-duration, 3.5s) ease-in var(--shoot-delay, 0s) infinite',
      },
    },
  },
  plugins: [],
}

export default config
