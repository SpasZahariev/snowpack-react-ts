import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{tsx,ts,jsx,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'whiteish': '#f9f7f7',
        'light-blue': '#dbe2ef',
        'very-blue': '#3f72af',
        'dark-blue': '#112d4e',
        'grayish': '#707070',
        'almost-black': '#242424',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
