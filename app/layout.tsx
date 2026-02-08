import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

import { Outfit, IBM_Plex_Mono } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Email Signature Generator",
  description: "Lightweight email signature generator with multiple professional styles",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
