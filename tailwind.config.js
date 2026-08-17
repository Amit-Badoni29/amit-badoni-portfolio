/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-bg)',
        elevated: 'var(--color-bg-elevated)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        accent: 'var(--color-primary)',
        'accent-dim': 'var(--color-primary-dim)',
        'accent-2': 'var(--color-accent-2)',
        'on-accent': 'var(--color-on-accent)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'blob-drift': 'blob 18s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
