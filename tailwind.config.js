/** @type {import('tailwindcss').Config} */
import flowbite from  "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),


  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-slow': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'widen': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-in-slow': 'fade-in-slow 1.5s ease-in-out',
        'widen': 'widen 1.5s ease-in-out',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
    flowbite.plugin(),


  ],
}