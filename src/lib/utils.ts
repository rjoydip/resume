import type { ResumeType } from '@/types'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { isTest } from 'std-env'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>(name: keyof ResumeType): Promise<T> {
  let data
  if (isTest) {
    const { resumeData }: { resumeData: ResumeType } = await import(`../../test/fixtures/data.fixture`)
    return Promise.resolve((resumeData[name] ?? {}) as T)
  }

  try {
    data = (await import(`../data/${name}.ts`)).default ?? {}
    return data as T
  }
  catch (e) {
    throw new Error(String(e))
  }
}
