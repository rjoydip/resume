import { Output } from "valibot";
import { ResumeDataSchema, aboutSchema, contactSchema, educationSchema, projectsSchema, skillsSchema, workSchema } from "./schema";

export type ResumeDataType = Output<typeof ResumeDataSchema>
export type EducationType = Output<typeof educationSchema>
export type AboutType = Output<typeof aboutSchema>
export type ContactType = Output<typeof contactSchema>
export type WorkType = Output<typeof workSchema>
export type SkillsType = Output<typeof skillsSchema>
export type ProjectType = Output<typeof projectsSchema>

export interface ProjectCardProps {
  title: string;
  description: string;
  techStacks: string[];
  links?: {
    type: "web" | "mobile";
    href: string;
    label: string;
  }[] | null;
}

export interface CommandMenuProps {
  links: { url: string; title: string }[];
}

export type LightColorType = 'yellow' | 'blue' | 'green' | 'red' | 'violet' | 'zinc' | 'orange' | 'rose' | 'slate' | 'slate' | 'light'
export type DarkColorType = 'yellow-dark' | 'blue-dark' | 'green-dark' | 'red-dark' | 'violet-dark' | 'zinc-dark' | 'orange-dark' | 'rose-dark' | 'slate-dark' | 'dark'