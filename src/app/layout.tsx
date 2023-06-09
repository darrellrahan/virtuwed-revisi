import './globals.css'
// import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const playFair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
