const konstaConfig = require('konsta/config');

/** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./src/**/*.{html,js,svelte,ts}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// wrap your config with konstaConfig
module.exports = konstaConfig({
  // rest of your usual Tailwind CSS config here
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
