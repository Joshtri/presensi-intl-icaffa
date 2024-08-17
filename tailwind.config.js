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
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
    flowbite.plugin(),


  ],
}