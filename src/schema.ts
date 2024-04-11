import { any, array, email, maxLength, maxValue, minLength, minValue, nullable, nullish, number, object, Output, picklist, regex, startsWith, string, transform, union, url } from 'valibot'

const today = new Date()
const techStackSchema = array(picklist([
    "angular",
    "aws",
    "bitbucket",
    "bootstrap",
    "bun",
    "cucumber",
    "cypress",
    "deno",
    "docker",
    "electron",
    "etl",
    "express",
    "firebase",
    "git",
    "github",
    "github-actions",
    "gitlab",
    "graphql",
    "instana",
    "ionic",
    "javascript",
    "jenkins",
    "jest",
    "jira",
    "kafka",
    "laravel",
    "linux",
    "mac",
    "mongodb",
    "mongoose",
    "mysql",
    "nextjs",
    "nodejs",
    "npm",
    "php",
    "playwright",
    "postgresql",
    "postman",
    "prisma",
    "react",
    "reactjs",
    "snyk",
    "springboot",
    "typescript",
    "vercel",
    "vitest",
    "windows",
]))

export const educationSchema = array(object({
    school: string(),
    degree: string(),
    location: string(),
    cgpa: nullable(number([minValue(0.0), maxValue(10.0)])),
    aggregate: nullable(transform(string([
        regex(/\d+%/)
    ]), str => `${parseFloat(str.slice(0, -1)) / 100}`)),
    start: union([
        number([
            minValue(2005), 
            maxValue(2016),
        ]),
        string([
            minValue("2005"),
            maxValue("2016"),
        ])]),
    end: union([
        number([
            minValue(2010),
            maxValue(2016),
        ]),
        string([
            minValue("2010"),
            maxValue("2016"),
        ])]),
}))

export const workSchema = array(object({
    company: string(),
    position: string(),
    description: string(),
    link: string([url()]),
    mode: array(picklist(['Work from Home', 'Hybrid', 'Office'])),
    logo: any(),
    techStacks: techStackSchema,
    start: union([
        number([
            minValue(2005),
            maxValue(today.getFullYear()),
        ]),
        string([
            minValue("2005"),
            maxValue(today.getFullYear().toString()),
        ])]),
    end: nullable(union([
        number([
            minValue(2017),
            maxValue(today.getFullYear()),
        ]),
        string([
            minValue("2017"),
            maxValue(today.getFullYear().toString()),
        ])])),
}))

export const skillsSchema = object({
    cloud: techStackSchema,
    "cross-platform": techStackSchema,
    devOps: techStackSchema,
    database: techStackSchema,
    languages: techStackSchema,
    "object-relational-mapping": techStackSchema,
    "operating-system": techStackSchema,
    test: techStackSchema,
    tools: techStackSchema,
})

export const projectsSchema = array(object({
    title: string(),
    description: string(),
    techStacks: techStackSchema,
    links: nullish(array(object({
        type: picklist(["web", "mobile"]),
        label: string(),
        href: string([url()]),
    })))
}))

export const contactSchema = object({
    email: string([email()]),
    tel: string([startsWith("+")]),
    social: array(object({
        name: string(),
        url: string([url()]),
        icon: any()
    })),
})

export const ResumeDataSchema = object({
    name: string([minLength(4)]),
    initials: string([minLength(1), maxLength(4)]),
    location: string(),
    locationLink: string([url()]),
    avatarUrl: string([url()]),
    personalWebsiteUrl: string([url()]),
    about: string([maxLength(1000)]),
    summary: string([]),
    contact: contactSchema,
    education: educationSchema,
    work: workSchema,
    skills: skillsSchema,
    projects: projectsSchema
})