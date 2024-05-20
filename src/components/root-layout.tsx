import * as React from 'react'
import type { Metadata } from 'next'
import { isEdgeLight } from 'std-env'
import Head from 'next/head'
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
      <Head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
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
        {isEdgeLight && <SpeedInsights />}
      </body>
    </html>
  )
}
