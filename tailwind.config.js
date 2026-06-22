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
        background:  '#FDF4F0',
        card:        '#FFFAF8',
        surface:     '#FAF0EB',
        border:      '#F2D9CF',
        divider:     '#EDD5C8',
        text:        '#3D2314',
        subtle:      '#8B6355',
        muted:       '#C4A090',
        olive:       '#8B8E25',
        peach:       '#F2C4A8',
        rose:        '#E8A4A4',
        terra:       '#D84F23',
        terraLight:  '#F2C4B0',
        sage:        '#A8C5A0',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],       // wordmark only
        heading: ['Lora', 'Georgia', 'serif'],                   // h1, h2, page titles
        body:    ['Inter', 'system-ui', 'sans-serif'],           // paragraphs
        ui:      ['Space Grotesk', 'system-ui', 'sans-serif'],   // badges, pills, labels
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
