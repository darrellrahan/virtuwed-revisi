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
        // primary: '#D1B0B0',
        fontColor: '#3E4C59',
        fontColorHeading: '#313F4A',

        // PRIMARY
        // primary: "linear-gradient(107deg, #FFD9D9 -7.85%, #FF9797 88.84%)",
        secondary: "#FF9797",
        tertiary: "#D4AF37",
        White: "#FFFFF0",

        primaryGradient: {
          start: '#FFD9D9',   // Warna pada langkah pertama
          end: '#FF9797',     // Warna pada langkah kedua
        },



        // NEUTRAL
        dark: "#181926",
        N900: "#1F2223",
        N800: "#363939",
        N700: "#57595A",
        N600: "#797A7B",
        N500: "#8E9090",
        N400: "#B1B2B2",
        N300: "#D2D3D3",
        N200: "#EAEAEA",
        N100: "#F6F6F6",

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
        'flower-pink': "url(/assets/undanganDigital/website/flower-pink.png)",
        'story-texture': "url(/assets/undanganDigital/website/story-pink.png)",
        'silent-garden': "url(/assets/undanganDigital/website/silent-garden-pink.png)",
        'line-orn-event': "url(/assets/undanganDigital/website/line-orn-event.png)",
        'forest': "url(/assets/undanganDigital/website/forest-2-pink.png)",
        'forest-potrait': "url(/assets/undanganDigital/website/forest-pink.png)",
        'forest-landscape': "url(/assets/undanganDigital/website/forest-landscape-pink.png)",
        'rsvp-texture': "url(/assets/undanganDigital/website/rsvp-pink.png)",
        'cover-wedding': "url(/assets/undanganDigital/Prewed24.jpeg)",
        'cover-session': "url(/assets/undanganDigital/website/cover-session.avif)",
        'music-disc': "url(/assets/undanganDigital/website/music-disc.png)",

        // LOGIN & REGISTER
        'register': "url(/assets/landingpage/register.avif)",

        // RESEPSI VIRTUAL
        'guestBookInsideRight': "url(/assets/ballroom/guestBookInsideRight.webp)",
        'guestBookInsideLeft': "url(/assets/ballroom/guestBookInsideLeft.webp)",
        'guestBookCover': "url(/assets/ballroom/guestBookCover.jpg)",

        // KENANGAN VIRTUAL
        'pengantin1': "url('/assets/kenanganVirtual/gallery/Prewed1.jpeg')",
        'pengantin2': "url('/assets/kenanganVirtual/gallery/Prewed2.jpeg')",
        'pengantin3': "url('/assets/kenanganVirtual/gallery/Prewed3.jpeg')",
        'pengantin4': "url('/assets/kenanganVirtual/gallery/Prewed4.jpeg')",
        'pengantin5': "url('/assets/kenanganVirtual/gallery/Prewed5.jpeg')",
        'pengantin6': "url('/assets/kenanganVirtual/gallery/Prewed6.jpeg')",
      },
      screens: {
        'tall': { 'raw': '(min-height: 700px)' },
        // => @media (min-height: 800px) { ... }
      },
      linearGradientColors: {
        '107': '107deg, #primaryGradient-start -7.85%, #primaryGradient-end 88.84%',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      transitionDelay: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-gradients")
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "linear-gradient(107deg, #FFD9D9 -7.85%, #FF9797 88.84%)",
          "secondary": "#FF9797",
          "accent": "#D4AF37",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light"
    ],
  },
}
