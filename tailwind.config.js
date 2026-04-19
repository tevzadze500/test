/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontSize: {
        'xs': ['0.6rem', { lineHeight: '0.8rem' }],
        'sm': ['0.7rem', { lineHeight: '1rem' }],
        'base': ['0.8rem', { lineHeight: '1.2rem' }],
        'lg': ['0.9rem', { lineHeight: '1.4rem' }],
        'xl': ['1rem', { lineHeight: '1.5rem' }],
        '2xl': ['1.2rem', { lineHeight: '1.6rem' }],
        '3xl': ['1.5rem', { lineHeight: '1.875rem' }],
        '4xl': ['1.8rem', { lineHeight: '2.25rem' }],
        '5xl': ['2.4rem', { lineHeight: '1' }],
        '6xl': ['3rem', { lineHeight: '1' }],
        '7xl': ['3.6rem', { lineHeight: '1' }],
        '8xl': ['4.8rem', { lineHeight: '1' }],
        '9xl': ['6.4rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
