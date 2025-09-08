/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#1C1C1C",
        coolgray: "#3C3F41",
        offwhite: "#F5F5F5",
        limeneon: "#A3FF12",
        electric: "#FF3CAC",
        tealblue: "#00B3B3",
      },
    },
  },
  plugins: [],
};
