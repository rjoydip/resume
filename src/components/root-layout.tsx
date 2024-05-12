import * as React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { getDarkThemeColors, getLightThemeColors, metadata as meta } from '@/data'
import { Toaster } from '@/components/ui/toaster'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[...getLightThemeColors(), ...getDarkThemeColors()]}
        >
          {children}
        </NextThemesProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  )
}
