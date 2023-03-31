/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  // content: [
  //   './pages/**/*.{html,js}',
  //   './components/**/*.{html,js}',
  // ],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [],
}
