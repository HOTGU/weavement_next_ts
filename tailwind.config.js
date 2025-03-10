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
        // racing: ["var(--racing)"],
        // pretendard: ["var(--pretendard)"],
        pretendard: ["Pretendard", "sans-serif"],
        racing: ["Racing Sans One", "sans-serif"],
        ibm: ["IBM Plex Sans KR", "sans-serif"],
      },
      colors: {
        accent: "#A6192E",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
