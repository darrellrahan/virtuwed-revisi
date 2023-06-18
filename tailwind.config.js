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
        // primary: '#765b46',
        // secondary: '#906020',
        // tertiary: '#D5AF6F',
        // backgroundColor: '#e7d2b7'

        primary: '#D1B0B0'
      },
      fontFamily: {
        heading: ['var(--font-deAetna)'],
        body: ['var(--font-amiamie)'],
      },
      backgroundImage: {
        // LANDING PAGE PURPOSE
        'tagline': "url(https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80)",


        // UNDANGAN DIGITAL PURPOSE
        'flower-dark': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/flower-dark-min.png)",
        'story-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/orn-story-texture-min.png)",
        'silent-garden': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-savedate-min.png)",
        'line-orn-event': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/line-orn-event-min.png)",
        'forest': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-op5-min.png)",
        'forest-potrait': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-potrait-min.png)",
        'forest-landscape': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-min.png)",
        'rsvp-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-rsvp-texture-min.png)",
        'cover-wedding': "url(https://i.pinimg.com/564x/dc/be/fb/dcbefb01fe6b39ddeea5d8ce52fbb20e.jpg)"

      },
    },
  },
  plugins: [],
}
