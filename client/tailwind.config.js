/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        // => @media (min-width: 480px) { ... }
        xxs: "360px",
        // => @media (min-width: 320px) { ... }
      },
    },
  },
  plugins: [],
};
