/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        light: {
          bg: '#FFFFFF',
          bgSecondary: '#F5F5F5',
          text: '#111111',
          muted: '#666666',
          border: '#E5E5E5',
        },
        dark: {
          bg: '#0F0F0F',
          bgSecondary: '#171717',
          text: '#F5F5F5',
          muted: '#A1A1A1',
          border: '#2A2A2A',
        },
        accent: {
          green: '#4F7A6B',
          gray: '#8A8A8A',
          blue: '#5B7FA6',
        },
      },
      maxWidth: {
        content: '1100px',
        prose: '680px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
