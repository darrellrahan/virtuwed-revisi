import React from 'react'
import Opening from './Theme2/Opening'
import Hero from './Theme2/Hero'
import Date from './Theme2/Date'
import Bride from './Theme2/Bride'
import DetailDate from './Theme2/DetailDate'
import Moment from './Theme2/Moment'
import Story from './Theme2/Story'
import Gallery from './Theme2/Gallery'
import Wish from './Theme2/Wish'
import Footer from './Theme2/Footer'
import { RootState } from '@/src/app/[lang]/redux/reducers'


import localFont from "next/font/local";

export const benton = localFont({
    src: [
        {
            // path: "./fonts/benton/BentonModDisp-Light.otf",
            path: "../../../public/assets/fonts/theme/theme2/benton/BentonModDisp-Light.otf",
            weight: "300",
        },
        {
            // path: "./fonts/benton/BentonModDisp-Regular.otf",
            path: "../../../public/assets/fonts/theme/theme2/benton/BentonModDisp-Regular.otf",
            weight: "400",
        },
        {
            path: "../../../public/assets/fonts/theme/theme2/benton/BentonModDisp-Semibold.otf",
            weight: "600",
        },
        {
            path: "../../../public/assets/fonts/theme/theme2/benton/BentonModDisp-Bold.otf",
            weight: "700",
        },
        {
            path: "../../../public/assets/fonts/theme/theme2/benton/BentonModDisp-Black.otf",
            weight: "900",
        },
    ],
});

export const lovelyCoffee = localFont({
    src: "../../../public/assets/fonts/theme/theme2/lovely-coffee/LovelyCoffee.otf",
});

import { Playfair_Display } from 'next/font/google'
import { Locale } from '@/i18n.config'
// const playFair = Playfair_Display({ subsets: ['latin'] })
export const playFair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], })

const Theme2 = ({ lang }: { lang: Locale }) => {
    return (
        <main className='bg-[#003C4C] overflow-x-hidden'>
            <Opening lang={lang} />
            <Hero />
            <Date />
            <Bride />
            <DetailDate />
            <Moment />
            <Story />
            <Gallery />
            <Wish />
            <Footer />
        </main>
    )
}

export default Theme2