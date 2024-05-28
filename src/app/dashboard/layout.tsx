import * as React from 'react'
import type { Metadata } from 'next'

import { MainNav } from './components/nav/main-nav'
import { UserNav } from './components/nav/user-nav'
import { metadata as meta } from '@/data'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  generator: meta.generator,
  publisher: meta.name,
  icons: [{ rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' }],
  appleWebApp: {
    capable: true,
    title: meta.name,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col antialiased">{children}</div>
    </>
  )
}
