import './globals.css'
// import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const playFair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'Virtuwed',
  description: 'Wujudkan pernikahan yang mewah dan elegan anda, secara virtual.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={playFair.className}>{children}</body>
    </html>
  )
}
