import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ListBlobResultBlob } from '@vercel/blob'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ObjType<T> {
  [key: string]: T
}

export function filterObject<T>(obj: ObjType<T>, deleteKey: string | string[]): ObjType<T> {
  return Object.keys(obj)
    .filter(key => typeof deleteKey === 'string' ? key !== deleteKey : deleteKey.includes(key))
    .reduce((result, current) => {
      result[current] = obj[current]
      return result
    }, {} as ObjType<T>)
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
