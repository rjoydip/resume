import type { SectionsType } from '@/types'
import type { ListBlobResultBlob } from '@vercel/blob'
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query'
import { list } from '@vercel/blob'
import { process } from 'std-env'
import { fetchData } from './utils'

function makeQueryClient(blobs: ListBlobResultBlob[]) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        queryFn: async ({ queryKey }: { queryKey: any }) => {
          return await fetchData(blobs, queryKey[0] as SectionsType)
        },
      },
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query)
          || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export async function getQueryClient() {
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(blobs)
  }
  else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient)
      browserQueryClient = makeQueryClient(blobs)
    return browserQueryClient
  }
}
