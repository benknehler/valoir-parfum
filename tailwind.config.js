/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050403',
        obsidian: '#0b0807',
        noir: '#11100f',
        cream: '#f5ead9',
        porcelain: '#fff8eb',
        champagne: '#d7bc85',
        antique: '#b99157',
        oxblood: '#4f0710',
        ruby: '#8e0e1d',
        amber: '#c26a1b',
        smoke: '#817367',
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.28em',
        nav: '0.13em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        luxury: '0 34px 120px rgba(0, 0, 0, 0.42)',
        glow: '0 0 90px rgba(215, 188, 133, 0.16)',
      },
    },
  },
  plugins: [],
};
