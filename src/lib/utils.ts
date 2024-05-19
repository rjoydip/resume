import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ListBlobResultBlob } from '@vercel/blob'
import type { FilterObjType } from '@/types'

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

export async function fetchData(blobs: ListBlobResultBlob[], name: string) {
  const blob = blobs
    .filter(i => i.pathname.replace(/\.[^/.]+$/, '') === name)
    .pop()
  if (blob) {
    const res = await fetch(blob.url)

    if (!res.ok)
      throw new Error('Failed to fetch data')

    return await res.json()
  }
  else {
    return {}
  }
}
