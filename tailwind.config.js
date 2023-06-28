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
        // UNDANGAN DIGITAL
        primaryInv: '#765b46',
        secondaryInv: '#906020',
        tertiaryInv: '#D5AF6F',
        backgroundColorInv: '#e7d2b7',

        // LANDING PAGE
        primary: '#D1B0B0',
        fontColor: '#3E4C59',
        fontColorHeading: '#313F4A'
      },
      fontFamily: {
        deAetna: ['var(--font-deAetna)'],
        amiamie: ['var(--font-amiamie)'],
        ade: ['var(--font-ade)'],
      },
      backgroundImage: {
        // LANDING PAGE PURPOSE
        'tagline': "url(https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80)",
        'cta': "url(https://images.pexels.com/photos/56926/pexels-photo-56926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",


        // UNDANGAN DIGITAL PURPOSE
        'flower-dark': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/flower-dark-min.png)",
        'story-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/orn-story-texture-min.png)",
        'silent-garden': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-savedate-min.png)",
        'line-orn-event': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/line-orn-event-min.png)",
        'forest': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-op5-min.png)",
        'forest-potrait': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-potrait-min.png)",
        'forest-landscape': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-forest-landscape-min.png)",
        'rsvp-texture': "url(https://katsudoto.id/media/template/custom/denis-serlyn/brown/bg-rsvp-texture-min.png)",
        'cover-wedding': "url(/assets/undanganDigital/Prewed24.jpeg)",
        'cover-session': "url(/assets/undanganDigital/Prewed13.jpeg)",
        'music-disc': "url(https://katsudoto.id/media/template/details/music.png)"


      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}
