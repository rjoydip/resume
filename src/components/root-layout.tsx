import * as React from 'react'
import type { Metadata } from 'next'
import { isDevelopment, isTest } from 'std-env'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import {
  getDarkThemeColors,
  getLightThemeColors,
  metadata as meta,
} from '@/data'
import { Toaster } from '@/components/ui/toaster'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  generator: meta.generator,
  publisher: meta.name,
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
  ],
  appleWebApp: {
    capable: true,
    title: meta.name,
  },
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
        {!isDevelopment && !isTest && <SpeedInsights />}
      </body>
    </html>
  )
}
