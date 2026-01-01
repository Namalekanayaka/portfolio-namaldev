/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo 500
        secondary: "#a855f7", // Purple 500
        accent: "#ec4899", // Pink 500
        dark: "#050505", // Almost black
        "dark-light": "#1a1a1a",
      },
      fontFamily: {
         sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
