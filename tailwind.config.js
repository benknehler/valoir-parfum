/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf7ef',
        pearl: '#fffdf8',
        linen: '#f1e6d5',
        champagne: '#d6bd86',
        gold: '#b9975b',
        taupe: '#a99a88',
        clay: '#d8c6ad',
        amber: '#bd7a2f',
        cherry: '#7b1f2b',
        rosewood: '#3d2022',
        charcoal: '#1d1915',
        ink: '#16120f',
        smoke: '#746b61',
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
        luxury: '0 34px 120px rgba(68, 46, 24, 0.14)',
        glow: '0 28px 100px rgba(190, 139, 71, 0.18)',
      },
    },
  },
  plugins: [],
};
