import { BadgeCheck, CircleDot, Dot, Github, Globe, MailIcon, MapPin, PhoneIcon, Server, Smartphone } from "lucide-react";
import {
  AWS,
  Angular,
  Bitbucket,
  Bootstrap,
  Bun,
  Cucumber,
  Cypress,
  Deno,
  Docker,
  Electron,
  Express,
  Firebase,
  Git,
  GithubActions,
  Gitlab,
  GraphQL,
  Ionic,
  JIRA,
  Javascript,
  Jenkins,
  Jest,
  Kafka,
  Laravel,
  Linux,
  MacOS,
  MongoDB,
  Mongoose,
  MySQL,
  NPM,
  NextJS,
  NodeJS,
  PHP,
  Playwright,
  PostgreSQL,
  Postman,
  Prisma,
  ReactJS,
  Springboot,
  Typescript,
  Vercel,
  Vitest,
  Windows,
} from "./svg";
import { Badge } from "../ui/badge";
import humanizeString from "humanize-string";

export type IconType =
  | "api"
  | "dot"
  | "web"
  | "map"
  | "email"
  | "mail"
  | "smartphone"
  | "mobile"
  | "phone"
  | "server"
  | "backend"
  | "circle-dot"
  | "badge-check"
  // Programming languages
  | "angular"
  | "aws"
  | "bitbucket"
  | "bootstrap"
  | "bun"
  | "cucumber"
  | "cypress"
  | "deno"
  | "docker"
  | "electron"
  | "express"
  | "firebase"
  | "git"
  | "github"
  | "github-actions"
  | "gitlab"
  | "graphql"
  | "ionic"
  | "javascript"
  | "jenkins"
  | "jest"
  | "jira"
  | "kafka"
  | "laravel"
  | "linux"
  | "mac"
  | "macos"
  | "mongodb"
  | "mongoose"
  | "mysql"
  | "next"
  | "nextjs"
  | "node"
  | "nodejs"
  | "npm"
  | "php"
  | "playwrite"
  | "postgresql"
  | "postman"
  | "prisma"
  | "prismaorm"
  | "react"
  | "reactjs"
  | "springboot"
  | "typescript"
  | "vercel"
  | "vitest"
  | "windows"
  | null;

interface IconProps {
  className?: string;
  href?: string;
  strokeWidth?: number;
}

export function getIcon(icon: IconType = null, props: IconProps = {}) {
  switch (icon?.toLowerCase()) {
    case "dot":
      return <Dot {...props} />;
    case "backend":
    case "server":
      return <Server {...props} />;
    case "email":
    case "mail":
      return <MailIcon {...props} />
    case "mobile":
    case "phone":
      return <PhoneIcon {...props} />
    case "smartphone":
      return <Smartphone {...props} />;
    case "web":
      return <Globe {...props} />;
    case "map":
      return <MapPin {...props} />
    case "circle-dot":
      return <CircleDot {...props} />
    case "badge-check":
      return <BadgeCheck {...props} />
    // Programming Language
    case "angular":
      return <Angular {...props} />;
    case "aws":
      return <AWS {...props} />;
    case "bitbucket":
      return <Bitbucket {...props} />;
    case "bootstrap":
      return <Bootstrap {...props} />;
    case "bun":
      return <Bun {...props} />;
    case "cucumber":
      return <Cucumber {...props} />;
    case "cypress":
      return <Cypress {...props} />;
    case "deno":
      return <Deno {...props} />;
    case "docker":
      return <Docker {...props} />;
    case "electron":
      return <Electron {...props} />;
    case "express":
      return <Express {...props} />;
    case "firebase":
      return <Firebase {...props} />;
    case "git":
      return <Git {...props} />;
    case "github":
      return <Github {...props} />;
    case "github-actions":
      return <GithubActions {...props} />;
    case "gitlab":
      return <Gitlab {...props} />;
    case "graphql":
      return <GraphQL {...props} />;
    case "ionic":
      return <Ionic {...props} />;
    case "javascript":
      return <Javascript {...props} />;
    case "jenkins":
      return <Jenkins {...props} />;
    case "jest":
      return <Jest {...props} />;
    case "jira":
      return <JIRA {...props} />;
    case "kafka":
      return <Kafka {...props} />;
    case "laravel":
      return <Laravel {...props} />;
    case "linux":
      return <Linux {...props} />;
    case "mac":
      return <MacOS {...props} />;
    case "mongodb":
      return <MongoDB {...props} />;
    case "mongoose":
      return <Mongoose {...props} />;
    case "mysql":
      return <MySQL {...props} />;
    case "next":
    case "nextjs":
      return <NextJS {...props} />;
    case "node":
    case "nodejs":
      return <NodeJS {...props} />;
    case "npm":
      return <NPM {...props} />;
    case "php":
      return <PHP {...props} />;
    case "playwright":
      return <Playwright {...props} />;
    case "postgresql":
      return <PostgreSQL {...props} />;
    case "postman":
      return <Postman {...props} />;
    case "prisma":
      return <Prisma {...props} />;
    case "react":
    case "reactjs":
      return <ReactJS {...props} />;
    case "springboot":
      return <Springboot {...props} />;
    case "typescript":
      return <Typescript {...props} />;
    case "vercel":
      return <Vercel {...props} />;
    case "vitest":
      return <Vitest {...props} />;
    case "windows":
      return <Windows {...props} />;
    default:
      return (
        icon ? <Badge className="px-1 py-0 text-[10px]" variant="secondary">
          {humanizeString(icon.toString())}
        </Badge> : null
      );
  }
}
