import type { DarkColorType, LightColorType } from '@/types'

export const metadata = {
  name: 'Joydip Roy',
  description: 'JR',
  generator: 'blog, rjoydip, resume',
}

export function getLightThemeColors(): LightColorType[] {
  return ['yellow', 'blue', 'green', 'red', 'violet', 'zinc', 'orange', 'rose', 'slate', 'light', 'system']
}

export function getDarkThemeColors(): DarkColorType[] {
  return ['yellow-dark', 'blue-dark', 'green-dark', 'red-dark', 'violet-dark', 'zinc-dark', 'orange-dark', 'rose-dark', 'slate-dark', 'dark']
}

export const companies = [
  'Ascentspark',
  'Infosys',
  'Tech Mahindra',
  'Webskitters',
]
export const projectLinkTypes = ['web', 'mobile']
export const socialMedia = ['gitHub', 'linkedIn', 'x']
export const workMode = ['Work from Home', 'Hybrid', 'Office']
export const techStacks = ['angular', 'aws', 'bitbucket', 'bootstrap', 'cucumber', 'cypress', 'deno', 'docker', 'etl', 'express', 'firebase', 'fastify', 'git', 'github', 'gitlab', 'gmc', 'graphql', 'instana', 'javascript', 'jenkins', 'jest', 'kafka', 'laravel', 'mongodb', 'mongoose', 'mysql', 'nextjs', 'nodejs', 'postgresql', 'react', 'reactjs', 'snyk', 'springboot', 'typescript', 'vercel', 'vitest', 'ionic', 'groovy', 'electron', 'php']
