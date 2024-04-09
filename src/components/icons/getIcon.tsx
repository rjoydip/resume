import { Globe, Server, Smartphone } from "lucide-react";
import defu from "defu";
import clsx from "clsx";
import {
  AWS,
  Angular,
  Bootstrap,
  Bun,
  Cucumber,
  Cypress,
  Deno,
  Docker,
  Electron,
  Express,
  Firebase,
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

export type IconType =
  | "api"
  | "web"
  | "smartphone"
  | "mobile"
  | "phone"
  | "server"
  | "backend"
  // Programming languages
  | "angular"
  | "aws"
  | "bootstrap"
  | "bun"
  | "cucumber"
  | "cypress"
  | "deno"
  | "docker"
  | "electron"
  | "express"
  | "firebase"
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
  color?: string;
  colorwidth?: string;
}

export function getIcon(icon: IconType = null, $props: IconProps = {}) {
  const props = defu(
    {
      className: clsx(
        $props.className,
        `text-${$props.color ?? "black"}-${$props.colorwidth ?? "900"}`,
      ),
    },
    $props,
  );

  switch (icon?.toLowerCase()) {
    case "backend":
    case "server":
      return <Server {...props} />;
    case "mobile":
    case "phone":
    case "smartphone":
      return <Smartphone {...props} />;
    case "web":
      return <Globe {...props} />;
    // Programming Language
    case "angular":
      return <Angular {...props} />;
    case "aws":
      return <AWS {...props} />;
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
        <Badge className="px-1 py-0 text-[10px]" variant="secondary">
          {icon}
        </Badge>
      );
  }
}
