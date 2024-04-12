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