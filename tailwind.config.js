/**
 * tailwind.config.js
 *
 * Colors are sourced from lib/tokens.ts (PALETTE).
 * update PALETTE in tokens.ts first,
 * then mirror it here.token names must stay in sync.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background:  '#74512D',
        card:        '#FFFAF8',
        surface:     '#61481C',
        border:      '#F2D9CF',
        divider:     '#453b1e',
        text:        '#1c0b02',
        subtle:      '#1f2a20',
        muted:       '#8D0B41',
        olive:       '#8B8E25',
        peach:       '#F2C4A8',
        rose:        '#E8A4A4',
        navy:        '#102E50',
        terra:       '#D84F23',
        terraLight:  '#F2C4B0',
        sage:        '#A8C5A0',
      },
      fontFamily: {
        display: ['var(--font-wooden-log)', 'Georgia', 'serif'],
        // Use Safety as the default for body and UI so non-custom text uses it
        body: ['var(--font-bonny-medium)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-circus)', 'system-ui', 'sans-serif'],
        ui: ['var(--font-fette)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        pill: '9999px',
      },
      boxShadow: {
        card:         '0 1px 3px rgba(61,35,20,0.08), 0 4px 16px rgba(61,35,20,0.06)',
        'card-hover': '0 4px 24px rgba(139,142,37,0.15), 0 1px 3px rgba(61,35,20,0.08)',
        glow:         '0 0 20px rgba(139,142,37,0.2)',
        'glow-terra': '0 0 20px rgba(216,79,35,0.2)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'leaf-sway': {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%':      { transform: 'rotate(4deg)' },
        },
        'wave-flow': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%':      { transform: 'translateX(-40px)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.4s ease-out forwards',
        'leaf-sway': 'leaf-sway 3s ease-in-out infinite',
        'wave-flow': 'wave-flow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
