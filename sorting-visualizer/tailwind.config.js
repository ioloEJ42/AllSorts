/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'bounce-subtle': 'bounce-subtle 0.5s ease-in-out infinite',
        'glow': 'glow 1s ease-in-out infinite',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'glow': {
          '0%, 100%': { opacity: 0.5, height: '100%' },
          '50%': { opacity: 1, height: '150%' },
        },
        'scan': {
          '0%, 100%': { transform: 'translateY(-50px)' },
          '50%': { transform: 'translateY(50px)' },
        },
      },
    },
  },
  plugins: [],
};