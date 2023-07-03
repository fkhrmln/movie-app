/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rick-and-morty': "url('/rick-and-morty.jpg')",
        'rick-and-morty-darker': "url('/rick-and-morty-darker.jpg')",
        netflix: "url('/netflix.png')",
      },
      colors: {
        netflix: '#E50914',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
