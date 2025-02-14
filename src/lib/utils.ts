import { ResumeType, SectionsType } from '@/types'
import type { ListBlobResultBlob } from '@vercel/blob'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { isDevelopment, isTest } from 'std-env'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>(blobs: ListBlobResultBlob[], name: keyof ResumeType): Promise<T> {
  if (isDevelopment || isTest) {
    const { resumeData }: { resumeData: ResumeType } = await import(`../../test/fixtures/data.fixture`)
    return Promise.resolve((resumeData[name] ?? {}) as T)
  }

  const blob = blobs
    .filter(i => i.pathname.replace(/\.[^/.]+$/, '') === name)
    .pop()

  if (blob) {
    const response = await fetch(blob.url)
    if (response.ok) return response.json()
    else throw new Error('Failed to fetch data')
  } else {
    return {} as T
  }
}
