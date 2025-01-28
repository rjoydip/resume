import type { DarkColorType, LightColorType } from '@/types'

export const today = new Date()
export function getLightThemeColors(): LightColorType[] {
  return ['light', 'system']
}

export function getDarkThemeColors(): DarkColorType[] {
  return ['dark']
}

export const metadata = {
  name: 'Joydip Roy',
  description: 'JR',
  generator: 'blog, rjoydip, resume',
}
export const languages = [{
  name: 'English',
  isNative: false,
}, {
  name: 'Bengali',
  isNative: true,
}]
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
