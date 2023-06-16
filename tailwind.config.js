/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        racing: ["var(--racing)"],
      },
      colors: {
        accent: "#A6192E",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
