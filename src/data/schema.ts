import { any, array, date, decimal, email, maxLength, maxValue, minLength, minValue, nullable, nullish, number, object, Output, picklist, regex, startsWith, string, transform, union, url } from 'valibot'

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

export const ResumeDataSchema = object({
    name: string([minLength(4)]),
    initials: string([minLength(1), maxLength(4)]),
    location: string(),
    locationLink: string([url()]),
    avatarUrl: string([url()]),
    personalWebsiteUrl: string([url()]),
    about: string([maxLength(1000)]),
    summary: string([]),
    contact: object({
        email: string([email()]),
        tel: string([startsWith("+")]),
        social: array(object({
            name: string(),
            url: string([url()]),
            icon: any()
        })),
    }),
    education: array(object({
        school: string(),
        degree: string(),
        location: string(),
        cgpa: nullish(number([minValue(0.0), maxValue(10.0)])),
        aggregate: nullish(transform(string([
            regex(/\d+%/)
        ]), str => parseFloat(str.slice(0, -1)) / 100)),
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
    })),
    work: array(object({
        company: string(),
        position: string(),
        description: string(),
        link: string([url()]),
        badges: array(picklist(['Work from Home', 'Hybrid', 'Office'])),
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
        end: nullish(union([
            number([
                minValue(2017),
                maxValue(today.getFullYear()),
            ]),
            string([
                minValue("2017"),
                maxValue(today.getFullYear().toString()),
            ])])),
    })),
    skills: object({
        cloud: techStackSchema,
        "cross-platform": techStackSchema,
        devOps: techStackSchema,
        database: techStackSchema,
        languages: techStackSchema,
        "object-relational-mapping": techStackSchema,
        "operating-system": techStackSchema,
        test: techStackSchema,
        tools: techStackSchema,
    }),
    projects: array(object({
        title: string(),
        description: string(),
        techStacks: techStackSchema,
        links: nullish(array(object({
            type: picklist(["web", "mobile"]),
            label: string(),
            href: string([url()]),
        })))
    }))
})

export type ResumeDataType = Output<typeof ResumeDataSchema>