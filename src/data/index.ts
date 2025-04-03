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
export const techStacks: string[] = ['Angular', 'AWS', 'Bitbucket', 'Bootstrap', 'Cucumber', 'Cypress', 'Deno', 'Docker', 'ETL', 'Express', 'Firebase', 'Fastify', 'Git', 'Github', 'Gitlab', 'GMC', 'GraphQL', 'Instana', 'Javascript', 'Jenkins', 'Jest', 'Kafka', 'Laravel', 'Mongodb', 'Mongoose', 'MySQL', 'Nextjs', 'Nodejs', 'PostgreSQL', 'React', 'Reactjs', 'Snyk', 'Springboot', 'Typescript', 'Vercel', 'Vitest', 'Ionic', 'Groovy', 'Electron', 'PHP']
