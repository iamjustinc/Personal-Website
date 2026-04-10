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
        bg: '#F7F4EE',
        surface: '#FFFFFF',
        'surface-muted': '#EDEAE2',
        border: '#E8E3D8',
        'text-base': '#1C1B18',
        'text-muted': '#8C8A82',
        accent: '#F05A28',
        'accent-hover': '#D94E20',
        // accent-sub is used as a direct style value via hexToRgba — see lib/utils.ts
        link: '#4A90D9',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(56px,8vw,96px)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        h1: ['clamp(36px,5vw,56px)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h2: ['clamp(24px,3vw,36px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['clamp(18px,2vw,22px)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        card: '16px',
        panel: '12px',
        btn: '8px',
        tag: '6px',
        status: '10px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.10)',
        'panel-sm': '0 2px 12px rgba(0,0,0,0.05)',
        panel: '0 4px 24px rgba(0,0,0,0.08)',
        'panel-deep': '0 12px 48px rgba(0,0,0,0.13)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        float1: {
          '0%,100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
        float3: {
          '0%,100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-1.5deg)' },
        },
      },
      animation: {
        float1: 'float1 5s ease-in-out infinite',
        float2: 'float2 6s ease-in-out infinite 0.8s',
        float3: 'float3 4.5s ease-in-out infinite 1.6s',
      },
    },
  },
  plugins: [],
}

export default config
