/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Caveat"', '"Patrick Hand"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      /* Use CSS variables via Tailwind */
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        brand: 'var(--brand)',
        'brand-soft': 'var(--brand-soft)',
        'paper-line': 'var(--paper-line)',
      },

      boxShadow: {
        paper: '0 8px 30px rgba(0,0,0,0.08)',
      },

      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },

  plugins: [],
};