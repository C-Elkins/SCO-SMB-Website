/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        'primary-navy': '#153B6B',
        'accent-teal': '#00A8B5',
        'neutral-light': '#E9ECEF',
        'neutral-dark': '#2E2E2E',
        'success-green': '#28a745',
        'warning-orange': '#fd7e14',
        'danger-red': '#dc3545',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px -2px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      animation: {
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'float-medium': 'float-medium 8s ease-in-out infinite',
        'float-fast': 'float-fast 6s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'scan-horizontal': 'scan-horizontal 15s ease-in-out infinite',
        'scan-vertical': 'scan-vertical 20s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'particle-float': 'particle-float 4s ease-in-out infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-40px, -20px) rotate(180deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, -40px) rotate(90deg)' },
          '50%': { transform: 'translate(-30px, -10px) rotate(180deg)' },
          '75%': { transform: 'translate(10px, 30px) rotate(270deg)' },
        },
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(40px, 40px)' },
        },
        'scan-horizontal': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw)', opacity: '0' },
        },
        'scan-vertical': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};