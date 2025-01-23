import type { FilterObjType } from '@/types.ts'
import type { ListBlobResultBlob } from '@vercel/blob'
import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterObject<T>(obj: FilterObjType<T>, deleteKey: string | string[]): FilterObjType<T> {
  return Object.keys(obj)
    .filter(key => typeof deleteKey === 'string' ? key !== deleteKey : !deleteKey.includes(key))
    .reduce((result, current) => {
      result[current] = obj[current]
      return result
    }, {} as FilterObjType<T>)
}

export async function fetchData<T>(blobs: ListBlobResultBlob[], name: string): Promise<T> {
  // TODO: Uncomment this block if want to use data fetching from fixtures
  /* if (isDevelopment) {
    const { resumeData } = await import('../../fixtures/data.ts')
    return (resumeData as Record<string, any>)[name]
  } */

  const blob = blobs
    .filter(i => i.pathname.replace(/\.[^/.]+$/, '') === name)
    .pop()

  if (blob) {
    const { data, status } = await axios.get(blob.url)
    if (status === 200)
      return data
    else
      throw new Error('Failed to fetch data')
  }
  else {
    return {} as T
  }
}
