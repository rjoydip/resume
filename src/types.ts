import type { Output } from 'valibot'
import type { aboutSchema, contactSchema, educationSchema, keySkillsSchema, projectsSchema, skillsSchema, worksSchema } from './schema'
import type schema from './schema'

export type ResumeDataType = Output<typeof schema>
export type EducationType = Output<typeof educationSchema>
export type AboutType = Output<typeof aboutSchema>
export type ContactType = Output<typeof contactSchema>
export type WorksType = Output<typeof worksSchema>
export type SkillsType = Output<typeof skillsSchema>
export type KeySkillsType = Output<typeof keySkillsSchema>
export type ProjectsType = Output<typeof projectsSchema>

export interface ProjectCardProps {
  title: string
  description: string
  techStacks: string[]
  links?: {
    type: 'web' | 'mobile'
    href: string
    label: string
  }[] | null
}

export type IconType =
  | 'api'
  | 'dot'
  | 'web'
  | 'map'
  | 'email'
  | 'mail'
  | 'smartphone'
  | 'mobile'
  | 'phone'
  | 'server'
  | 'backend'
  | 'circle-dot'
  | 'badge-check'
  // Programming languages
  | 'angular'
  | 'aws'
  | 'bitbucket'
  | 'bootstrap'
  | 'bun'
  | 'cucumber'
  | 'cypress'
  | 'deno'
  | 'docker'
  | 'electron'
  | 'express'
  | 'firebase'
  | 'fastify'
  | 'git'
  | 'github'
  | 'github-actions'
  | 'gitlab'
  | 'graphql'
  | 'ionic'
  | 'javascript'
  | 'jenkins'
  | 'jest'
  | 'jira'
  | 'kafka'
  | 'laravel'
  | 'linux'
  | 'linkedin'
  | 'mac'
  | 'macos'
  | 'mongodb'
  | 'mongoose'
  | 'mysql'
  | 'next'
  | 'nextjs'
  | 'node'
  | 'nodejs'
  | 'npm'
  | 'pnpm'
  | 'php'
  | 'playwrite'
  | 'postgresql'
  | 'postman'
  | 'prisma'
  | 'prismaorm'
  | 'react'
  | 'reactjs'
  | 'springboot'
  | 'typescript'
  | 'twitter'
  | 'vercel'
  | 'vitest'
  | 'windows'
  | 'yarn'
  | 'x'
  | null
export type LightColorType = 'yellow' | 'blue' | 'green' | 'red' | 'violet' | 'zinc' | 'orange' | 'rose' | 'slate' | 'slate' | 'light'
export type DarkColorType = 'yellow-dark' | 'blue-dark' | 'green-dark' | 'red-dark' | 'violet-dark' | 'zinc-dark' | 'orange-dark' | 'rose-dark' | 'slate-dark' | 'dark'

export interface FeatureFlagType {
  FF_SHOW_PROFILE_IMAGE: boolean
}
