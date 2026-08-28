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
        google: {
          blue: '#3186FF',
          red: '#FC413D',
          green: '#00B95C',
          yellow: '#FBBC04',
          hoverBlue: '#1a73e8',
          darkBg: '#0b0c10',
          darkCard: '#121317',
          darkBorder: '#23252e',
          lightBg: '#fbfbfd',
          lightCard: '#ffffff',
          lightBorder: '#e5e7eb'
        }
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Google Sans Code"', 'monospace']
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        }
      }
    },
  },
  plugins: [],
}
