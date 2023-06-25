export default function HomepageLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}