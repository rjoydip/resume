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
export const techStacks = ['angular', 'aws', 'bitbucket', 'bootstrap', 'bun', 'cucumber', 'cypress', 'deno', 'docker', 'electron', 'etl', 'express', 'firebase', 'fastify', 'git', 'github', 'github-actions', 'gitlab', 'gmc', 'graphql', 'instana', 'ionic', 'javascript', 'jenkins', 'jest', 'jira', 'kafka', 'laravel', 'linux', 'mac', 'mongodb', 'mongoose', 'mysql', 'nextjs', 'nodejs', 'npm', 'pnpm', 'php', 'playwright', 'postgresql', 'postman', 'prisma', 'react', 'reactjs', 'snyk', 'springboot', 'typescript', 'vercel', 'vitest', 'windows', 'yarn']
