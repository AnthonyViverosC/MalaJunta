/** @type {import('tailwindcss').Config} */
// MALA JUNTA · Sistema de diseño
// Paleta inspirada en el logo: dorado/bronce cálido sobre negro carbón.
// Estructura moderna/póster: tipografía condensada (Anton) + grotesca (Space Grotesk).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // ── Fondos oscuros ─────────────────────────────────
        ink: {
          950: '#0a0a0b',
          900: '#101011',
          800: '#17171a',
          700: '#201f22',
          600: '#2c2a2c',
          500: '#3a373a',
        },
        // ── Dorado (acento principal) — nombre "acid" heredado ─
        acid: {
          300: '#f2dca0',
          400: '#e5b96a',
          500: '#d4a24e',
          600: '#b8843a',
          700: '#8c5e2e',
        },
        // ── Cobre/terracota (acento secundario / alertas) ──
        flame: {
          300: '#e7a483',
          400: '#d9764f',
          500: '#c14f2f',
          600: '#9e3a1f',
          700: '#7a2c17',
        },
        bone: {
          DEFAULT: '#f3ece0',
          muted: '#a89e8c',
        },
        // ── Alias heredados → nueva paleta dorada ──────────
        night: {
          950: '#0a0a0b',
          900: '#101011',
          800: '#17171a',
          700: '#201f22',
          600: '#2c2a2c',
        },
        bronze: {
          400: '#f2dca0',
          500: '#e5b96a',
          600: '#d4a24e',
          700: '#b8843a',
        },
        gold: {
          400: '#f2dca0',
          500: '#e5b96a',
          600: '#d4a24e',
        },
        neon: {
          pink: '#c14f2f',
          cyan: '#e5b96a',
          violet: '#d4a24e',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        script: ['Anton', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        hard: '5px 5px 0 0 #000',
        'hard-acid': '5px 5px 0 0 #d4a24e',
        'hard-flame': '5px 5px 0 0 #c14f2f',
        gold: '6px 6px 0 0 rgba(212,162,78,0.9)',
        card: '0 24px 60px -30px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        tape: 'repeating-linear-gradient(45deg, #e5b96a 0 22px, #0a0a0b 22px 44px)',
        'tape-flame': 'repeating-linear-gradient(45deg, #c14f2f 0 22px, #0a0a0b 22px 44px)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'acid-line': 'linear-gradient(90deg, transparent, #e5b96a, transparent)',
        'radial-spot':
          'radial-gradient(circle at 20% 10%, rgba(229,185,106,0.14), transparent 55%), radial-gradient(circle at 80% 90%, rgba(193,79,47,0.10), transparent 50%)',
        'gold-line': 'linear-gradient(90deg, transparent, #e5b96a, transparent)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseHard: {
          '0%,100%': { boxShadow: '5px 5px 0 0 #d4a24e' },
          '50%': { boxShadow: '5px 5px 0 0 #b8843a' },
        },
        haloPulse: {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        shimmer: 'shimmer 4s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        blink: 'blink 1.4s steps(1) infinite',
        riseIn: 'riseIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
        glow: 'pulseHard 2.6s ease-in-out infinite',
        halo: 'haloPulse 3.2s ease-in-out infinite',
        'spin-slow': 'spinSlow 14s linear infinite',
      },
    },
  },
  plugins: [],
};
