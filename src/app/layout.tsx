import './globals.css'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })


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
      <body>{children}</body>
    </html>
  )
}
