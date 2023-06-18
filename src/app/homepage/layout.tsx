import { Playfair_Display } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const playFair = Playfair_Display({ subsets: ['latin'] })

export default function HomepageLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={playFair.className}>{children}</body>
        </html>
    )
}