import { describe, expect, expectTypeOf, it } from 'vitest'
import type { IconType, LightColorType, ProjectCardProps } from '../src/types'
import { DarkColorType, FeatureFlagType } from '../src/types'

describe('types and Interfaces', () => {
  describe('projectCardProps', () => {
    it('should have required properties', () => {
      const props: ProjectCardProps = {
        title: 'Sample Project',
        description: 'This is a sample project description.',
        techStacks: ['JavaScript', 'TypeScript', 'React'],
      }
      expectTypeOf(props).toMatchTypeOf<{
        title: string
        description: string
        techStacks: Array<string>
      }>
    })
  })

  describe('iconType', () => {
    it('should have valid values', () => {
      const validIcons: IconType[] = [
        'api',
        'dot',
        'web',
        'map',
        'email',
        'mail',
        'smartphone',
        'mobile',
        'phone',
        'server',
        'backend',
        'circle-dot',
        'badge-check',
        'angular',
        'aws',
        'bitbucket',
        'bootstrap',
        'bun',
        'cucumber',
        'cypress',
        'deno',
        'docker',
        'electron',
        'express',
        'firebase',
        'fastify',
        'git',
        'github',
        'github-actions',
        'gitlab',
        'graphql',
        'ionic',
        'javascript',
        'jenkins',
        'jest',
        'jira',
        'kafka',
        'laravel',
        'linux',
        'linkedin',
        'mac',
        'macos',
        'mongodb',
        'mongoose',
        'mysql',
        'next',
        'nextjs',
        'node',
        'nodejs',
        'npm',
        'pnpm',
        'php',
        'playwrite',
        'postgresql',
        'postman',
        'prisma',
        'prismaorm',
        'react',
        'reactjs',
        'springboot',
        'typescript',
        'twitter',
        'vercel',
        'vitest',
        'windows',
        'yarn',
        'x',
      ]
      expectTypeOf(validIcons).toEqualTypeOf<IconType>
    })
  })

  describe('lightColorType', () => {
    it('should have valid values', () => {
      const validColors: LightColorType[] = [
        'yellow',
        'blue',
        'green',
        'red',
        'violet',
        'zinc',
        'orange',
        'rose',
        'slate',
        'slate',
        'light',
      ]
      expectTypeOf(validColors).toEqualTypeOf<LightColorType>
    })
  })

  describe('darkColorType', () => {
    it('should have valid values', () => {
      const validColors: DarkColorType[] = [
        'yellow-dark',
        'blue-dark',
        'green-dark',
        'red-dark',
        'violet-dark',
        'zinc-dark',
        'orange-dark',
        'rose-dark',
        'slate-dark',
        'dark',
      ]
      expect(validColors).toEqual(expect.arrayContaining(Object.values(DarkColorType)))
    })
  })

  describe('featureFlagType', () => {
    it('should have valid values', () => {
      const validFlags: FeatureFlagType[] = [
        {
          FF_SHOW_PROFILE_IMAGE: true,
        },
        {
          FF_SHOW_PROFILE_IMAGE: false,
        },
      ]
      expect(validFlags).toEqual(expect.arrayContaining(Object.values(FeatureFlagType)))
    })
  })
})
