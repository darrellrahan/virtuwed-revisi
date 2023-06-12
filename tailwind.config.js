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
        'silent-garden': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-savedate-min.png)",
        'line-orn-event': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/line-orn-event-min.png)",
        'forest': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-op5-min.png)",
        'forest-potrait': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-potrait-min.png)",
        'forest-landscape': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-min.png)",
        'rsvp-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-rsvp-texture-min.png)"
      },
    },
  },
  plugins: [],
}
