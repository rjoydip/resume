import type { Page } from '@playwright/test'
import { QueryClient } from '@tanstack/react-query'

export const today = new Date()
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export async function loadPage({ page, path }: { page: Page, path: string }) {
  await page.goto(path)
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('domcontentloaded')
}
