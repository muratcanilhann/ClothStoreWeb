/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
     
      fontFamily:{
        beatriceDisplayTrial: ["Beatrice Display Trial", "sans-serif"],
      },
      backgroundImage: {
        "noisy-background": "url(./src/assets/noisy-background.png)"
      }
    },
  },
  plugins: [],
}

