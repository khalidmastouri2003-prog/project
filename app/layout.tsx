import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zid-Sales",
  description: "Zid-Sales (SmartStock.ma)",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
