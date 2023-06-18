import localFont from 'next/font/local'
import Footer from '@/components/Footer'
import './globals.css'

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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${amiamie.variable} ${deAetna.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
