import { QueryClient } from '@tanstack/react-query'

export const apiURL = 'http://localhost/api'
export const today = new Date()
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
