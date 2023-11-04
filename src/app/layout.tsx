import localFont from 'next/font/local'
import './globals.css'
import Head from 'next/head'
import { ReduxProvider } from './redux/provider'

export const metadata = {
  title: 'Virtuwed',
  description: 'Wujudkan pernikahan yang mewah dan elegan anda, secara virtual.',
}


const amiamie = localFont({
  src: [

    {
      path: '../../public/assets/fonts/amiamie/Amiamie-Light.ttf',
      weight: '300'
    },
    {
      path: '../../public/assets/fonts/amiamie/Amiamie-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/assets/fonts/amiamie/Amiamie-Black.ttf',
      weight: '700'
    }
  ],
  variable: '--font-amiamie'
})

const deAetna = localFont({
  src: [
    {
      path: '../../public/assets/fonts/deAetna/DeAetna-Caption.otf',
      weight: '700'
    }
  ],
  variable: '--font-deAetna'
})

const ade = localFont({
  src: [
    {
      path: '../../public/assets/fonts/ade/Ade-Display.otf',
      weight: '400'
    }
  ],
  variable: '--font-ade'
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preload" href="/video.mp4" as="video" />
      </Head>
      <body className={`${amiamie.variable} ${deAetna.variable} ${ade.variable}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body >
    </html >
  )
}
