/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Pally', 'sans-serif'],
        body: ['Inter Tight', 'sans-serif'],
      },
      colors: {
        cream: '#FAF5EC',
        'brand-lime': '#C8D62A',
        lime: { DEFAULT: '#C8D62A' },
        darkbrown: '#2C1810',
        lavender: '#C8C3E8',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in',
        shake: 'shake 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
      }
    },
  },
  plugins: [],
}
