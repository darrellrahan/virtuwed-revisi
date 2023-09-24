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
        tertiary: '#FFD9D9',
        fontColorHeading: '#313F4A'
      },
      fontFamily: {
        deAetna: ['var(--font-deAetna)'],
        amiamie: ['var(--font-amiamie)'],
        ade: ['var(--font-ade)'],
      },
      backgroundImage: {
        // LANDING PAGE PURPOSE
        'tagline': "url(/assets/landingpage/tagline.avif)",
        'cta': "url(/assets/landingpage/cta.webp)",


        // UNDANGAN DIGITAL PURPOSE
        'flower-dark': "url(/assets/undanganDigital/website/flower-dark.png)",
        'story-texture': "url(/assets/undanganDigital/website/story-texture.png)",
        'silent-garden': "url(/assets/undanganDigital/website/silent-garden.png)",
        'line-orn-event': "url(/assets/undanganDigital/website/line-orn-event.png)",
        'forest': "url(/assets/undanganDigital/website/forest.png)",
        'forest-potrait': "url(/assets/undanganDigital/website/forest-potrait.png)",
        'forest-landscape': "url(/assets/undanganDigital/website/forest-landscape.png)",
        'rsvp-texture': "url(/assets/undanganDigital/website/rsvp-texture.png)",
        'cover-wedding': "url(/assets/undanganDigital/Prewed24.jpeg)",
        'cover-session': "url(/assets/undanganDigital/website/cover-session.avif)",
        'music-disc': "url(/assets/undanganDigital/website/music-disc.png)",

        // LOGIN & REGISTER
        'register': "url(/assets/landingpage/register.avif)",


      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      transitionDelay: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
