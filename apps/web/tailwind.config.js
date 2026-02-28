/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        dark: '#03100b', // Deep rich forest green background
        glass: 'rgba(255, 255, 255, 0.03)', // Softer glass
        'glass-hover': 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
