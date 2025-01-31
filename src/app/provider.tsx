'use client'

import type { QueryClient } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/qclient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode, useEffect, useState } from 'react'
import { isDevelopment } from 'std-env'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient, setQueryClient] = useState<QueryClient>()

  useEffect(() => {
    const qClient = async () => {
      const client = await getQueryClient()
      setQueryClient(client)
    }
    qClient()
  }, [])

  return (
    queryClient && (
      <QueryClientProvider client={queryClient}>
        {children}
        {isDevelopment && <ReactQueryDevtools initialIsOpen />}
      </QueryClientProvider>
    )
  )
}
