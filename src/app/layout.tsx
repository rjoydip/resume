import type { Metadata } from 'next'
import Providers from '@/components/provider'
import { getDarkThemeColors, getLightThemeColors, meta } from '@/data/index'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Inter } from 'next/font/google'
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

function Layout({ children }: { children: React.ReactNode }) {
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
          <Providers>{children}</Providers>
        </NextThemesProvider>
      </body>
    </html>
  )
}

export default Layout
