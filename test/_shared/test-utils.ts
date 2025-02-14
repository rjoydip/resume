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

export const capitalize = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

type BrowserName = 'firefox' | 'chromium' | 'webkit'
export function parseXMLContent(browserName: BrowserName, parser: any, content: string) {
  if (browserName === 'firefox') {
    return parser.parse(content)
  }
  else {
    const { html: { body } } = parser.parse(content)
    return body.div.at(0)
  }
}

export function memoize<T extends any[], R>(fn: (...args: T) => R | Promise<R>): (...args: T) => R | Promise<R> {
  const cache: Record<string, R | Promise<R>> = {}

  return (...args: T): R | Promise<R> => {
    const key = JSON.stringify(args)

    if (key in cache) {
      console.warn('Fetching from cache')
      return cache[key]
    }
    else {
      console.warn('Calculating result')
      const result = fn(...args)

      // For promise-based functions, clear the cache on rejection.
      if (result instanceof Promise) {
        result.catch(() => {
          delete cache[key]
        })
      }

      cache[key] = result
      return result
    }
  }
}
