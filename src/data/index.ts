import type { DarkColorType, LightColorType, MetaType } from '@/types'

export const today: Date = new Date()
export function getLightThemeColors(): LightColorType[] {
  return ['light', 'system']
}
export function getDarkThemeColors(): DarkColorType[] {
  return ['dark']
}
export const meta: MetaType = {
  name: 'Joydip Roy',
  description: 'JR',
  generator: 'blog, rjoydip, resume',
}
export const companies: string[] = [
  'Ascentspark',
  'Infosys',
  'Tech Mahindra',
  'Webskitters',
]
export const projectLinkTypes: string[] = ['web', 'mobile']
export const socialMedia: string[] = ['gitHub', 'linkedIn', 'x', 'web']
export const workMode: string[] = ['Work from Home', 'Hybrid', 'Office']
export const techStacks: string[] = ['angular', 'aws', 'bitbucket', 'bootstrap', 'cucumber', 'cypress', 'deno', 'docker', 'etl', 'express', 'firebase', 'fastify', 'git', 'github', 'gitlab', 'gmc', 'graphql', 'instana', 'javascript', 'jenkins', 'jest', 'kafka', 'laravel', 'mongodb', 'mongoose', 'mysql', 'nextjs', 'nodejs', 'postgresql', 'react', 'reactjs', 'snyk', 'springboot', 'typescript', 'vercel', 'vitest', 'ionic', 'groovy', 'electron', 'php']
