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
        pretendard: ["var(--font-pretendard)", "sans-serif"],
        racing: ["var(--font-racing)", "sans-serif"],
        ibm: ["var(--font-ibm)", "sans-serif"],
      },
      colors: {
        accent: "#A6192E",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  corePlugins: {
    preflight: true,
  },
};
