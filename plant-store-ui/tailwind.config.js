/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#F4F1E8',
        'brand-green': {
          light: '#6B8A7A',
          DEFAULT: '#294B29',
          dark: '#1E3923',
        },
        'brand-gray': '#A9B4A8',
        'brand-brown': '#785C3D',
      },
      fontFamily: {
        'serif': ['Lora', 'serif'], // Elegant serif for headings
        'sans': ['Inter', 'sans-serif'], // Clean sans-serif for body text
      },
    },
  },
  plugins: [],
};