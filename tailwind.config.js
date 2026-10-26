import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#0A192F', 900: '#112240', 800: '#172E50' },
        bullion: '#D4AF37',
        signal: { green: '#10B981', red: '#EF4444', amber: '#F59E0B' },
        surface: 'var(--bg-primary)',
        panel: 'var(--bg-secondary)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        line: 'var(--border)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(10, 25, 47, 0.07)',
        'gold-glow': '0 0 0 3px rgba(212, 175, 55, 0.15)',
      },
      borderRadius: { '2.5xl': '1.25rem' },
      animation: { 'fade-up': 'fadeUp 0.32s ease-out both' },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [forms],
};
