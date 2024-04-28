import humanizeString from 'humanize-string'
import {
  BadgeCheck,
  CircleDot,
  Dot,
  Github,
  Gitlab,
  Globe,
  Linkedin,
  MailIcon,
  MapPin,
  PhoneIcon,
  Server,
  Smartphone,
  Twitter,
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Angular } from './angular'
import { Bun } from './bun'
import { AWS } from './aws'
import { Bitbucket } from './bitbucket'
import { PNPM } from './pnpm'
import { PostgreSQL } from './postgresql'
import { Postman } from './postman'
import { Prisma } from './prisma'
import { ReactJS } from './react'
import { Springboot } from './springboot'
import { Typescript } from './typescript'
import { Vercel } from './vercel'
import { Vitest } from './vitest'
import { Windows } from './windows'
import { Yarn } from './yarn'
import { Bootstrap } from './bootstrap'
import { Cucumber } from './cucumber'
import { Cypress } from './cypress'
import { Deno } from './deno'
import { Docker } from './docker'
import { Electron } from './electron'
import { Express } from './express'
import { Fastify } from './fastify'
import { Firebase } from './firebase'
import { Git } from './git'
import { GithubActions } from './github-actions'
import { GraphQL } from './graphql'
import { Ionic } from './ionic'
import { Javascript } from './javascript'
import { Jenkins } from './jenkins'
import { Jest } from './jest'
import { JIRA } from './jira'
import { Kafka } from './kafka'
import { Laravel } from './laravel'
import { Linux } from './linux'
import { MacOS } from './mac'
import { MongoDB } from './mongodb'
import { Mongoose } from './mongoose'
import { MySQL } from './mysql'
import { NextJS } from './next'
import { NPM } from './npm'
import { NodeJS } from './node'
import { PHP } from './php'
import { Playwright } from './playwright'
import type { IconType } from '@/types'

interface IconProps {
  className?: string
  href?: string
  strokeWidth?: number
}

export function getIcon(icon: IconType = null, props: IconProps = {}) {
  switch (icon?.toLowerCase()) {
    case 'dot':
      return <Dot {...props} />
    case 'backend':
    case 'server':
      return <Server {...props} />
    case 'email':
    case 'mail':
      return <MailIcon {...props} />
    case 'mobile':
    case 'phone':
      return <PhoneIcon {...props} />
    case 'smartphone':
      return <Smartphone {...props} />
    case 'web':
      return <Globe {...props} />
    case 'map':
      return <MapPin {...props} />
    case 'circle-dot':
      return <CircleDot {...props} />
    case 'badge-check':
      return <BadgeCheck {...props} />
    case 'linkedin':
      return <Linkedin {...props} />
    // Programming Language
    case 'angular':
      return <Angular {...props} />
    case 'aws':
      return <AWS {...props} />
    case 'bitbucket':
      return <Bitbucket {...props} />
    case 'bootstrap':
      return <Bootstrap {...props} />
    case 'bun':
      return <Bun {...props} />
    case 'cucumber':
      return <Cucumber {...props} />
    case 'cypress':
      return <Cypress {...props} />
    case 'deno':
      return <Deno {...props} />
    case 'docker':
      return <Docker {...props} />
    case 'electron':
      return <Electron {...props} />
    case 'express':
      return <Express {...props} />
    case 'firebase':
      return <Firebase {...props} />
    case 'fastify':
      return <Fastify {...props} />
    case 'git':
      return <Git {...props} />
    case 'github':
      return <Github {...props} />
    case 'twitter':
    case 'x':
      return <Twitter {...props} />
    case 'github-actions':
      return <GithubActions {...props} />
    case 'gitlab':
      return <Gitlab {...props} />
    case 'graphql':
      return <GraphQL {...props} />
    case 'ionic':
      return <Ionic {...props} />
    case 'javascript':
      return <Javascript {...props} />
    case 'jenkins':
      return <Jenkins {...props} />
    case 'jest':
      return <Jest {...props} />
    case 'jira':
      return <JIRA {...props} />
    case 'kafka':
      return <Kafka {...props} />
    case 'laravel':
      return <Laravel {...props} />
    case 'linux':
      return <Linux {...props} />
    case 'mac':
      return <MacOS {...props} />
    case 'mongodb':
      return <MongoDB {...props} />
    case 'mongoose':
      return <Mongoose {...props} />
    case 'mysql':
      return <MySQL {...props} />
    case 'next':
    case 'nextjs':
      return <NextJS {...props} />
    case 'node':
    case 'nodejs':
      return <NodeJS {...props} />
    case 'npm':
      return <NPM {...props} />
    case 'pnpm':
      return <PNPM {...props} />
    case 'php':
      return <PHP {...props} />
    case 'playwright':
      return <Playwright {...props} />
    case 'postgresql':
      return <PostgreSQL {...props} />
    case 'postman':
      return <Postman {...props} />
    case 'prisma':
      return <Prisma {...props} />
    case 'react':
    case 'reactjs':
      return <ReactJS {...props} />
    case 'springboot':
      return <Springboot {...props} />
    case 'typescript':
      return <Typescript {...props} />
    case 'vercel':
      return <Vercel {...props} />
    case 'vitest':
      return <Vitest {...props} />
    case 'windows':
      return <Windows {...props} />
    case 'yarn':
      return <Yarn {...props} />
    default:
      return icon
        ? (
          <Badge className="px-1 py-0 text-[10px]" variant="secondary">
            {humanizeString(icon.toString())}
          </Badge>
          )
        : null
  }
}
