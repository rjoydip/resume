import type { ResumeType } from '@/types'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { isDevelopment, isTest } from 'std-env'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>(name: keyof ResumeType): Promise<T> {
  let data
  if (isDevelopment || isTest) {
    const { resumeData }: { resumeData: ResumeType } = await import(`../../test/fixtures/data.fixture`)
    return Promise.resolve((resumeData[name] ?? {}) as T)
  }

  try {
    switch (name) {
      case 'about':
        data = (await import('../data/about')).default
        break
      case 'educations':
        data = (await import('../data/educations')).default
        break
      case 'projects':
        data = (await import('../data/projects')).default
        break
      case 'skills':
        data = (await import('../data/skills')).default
        break
      case 'strengths':
        data = (await import('../data/strengths')).default
        break
      case 'works':
        data = (await import('../data/works')).default
        break
      default:
        data = {}
        break
    }
    return data as T
  }
  catch (e) {
    throw new Error(String(e))
  }
}
