/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#765b46',
        secondary: '#906020',
        tertiary: '#D5AF6F',
        backgroundColor: '#e7d2b7'
      },
      backgroundImage: {
        'flower-dark': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/flower-dark-min.png)",
        'story-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/orn-story-texture-min.png)",
      },
    },
  },
  plugins: [],
}
