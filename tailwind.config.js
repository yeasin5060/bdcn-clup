/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bcc: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          surface2: 'var(--surface2)',
          text: 'var(--text)',
          muted: 'var(--muted)',
          line: 'var(--line)',
          green: '#0b7a5a',
          'green-dark': '#07140f',
          'green-mid': '#0f261e',
          'green-selected': '#12332a',
          red: '#c8321f',
          'red-hover': '#a62716',
          'red-bright': '#e0412f',
          gold: '#e8b04a',
          warn: '#9a6b0c',
          ok: '#0b7a5a',
          bad: '#c8321f',
          info: '#2f6aa3',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif Display"', '"Noto Serif Bengali"', '"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans"', '"Noto Sans Bengali"', '"Noto Sans SC"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

