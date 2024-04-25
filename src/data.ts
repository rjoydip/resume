import { parse } from 'valibot'
import schema from './schema'
import type { DarkColorType, LightColorType } from './types'
import {
  GitHub,
  LinkedIn,
  X,
} from '@/components/icons'

export const about = {
  name: "Joydip Roy",
  initials: "JR",
  location: "Kolkata, India",
  location_link: "https://maps.app.goo.gl/9uaiMJMPsHU4inX7A",
  description:
    "Full Stack Engineer who pays close attention to every detail, ensuring that the products I create are top-notch and carefully crafted.",
  professional_summary:
    "Experienced Full Stack Engineer with a proven track record of successfully leading multiple projects from inception to completion. Skilled in fostering collaborative team environments and adept at bringing out the best in team members. Demonstrated ability to build and lead teams, contributing to organizational growth. Proficient in TypeScript, JavaScript, and Node.js, with over 8 years of hands-on experience in esteemed companies.",
  avatar_url: "https://avatars.githubusercontent.com/u/112172822?v=4",
  website: "https://rjoydip.me",
}

export const contact = {
  email: "joydipand@gmail.com",
  tel: "+91-8697411233",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/rjoydip",
      icon: GitHub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rjoydip/",
      icon: LinkedIn,
    },
    {
      name: "X",
      url: "https://x.com/rjoydip11",
      icon: X,
    },
  ],
}

export const education = [
  {
    school: "Narula Institute Of Technology",
    degree: "Bachelor of Technology (W.B.U.T/M.A.K.A.U.T)",
    aggregate: null,
    cgpa: 7.84,
    location: "Kolkata, India",
    start: 2012,
    end: 2016,
  },
  {
    school: "Madhyamgram High School",
    degree: "Higher Secondary Education (12 th) (W.B.C.H.S.E)",
    aggregate: "63.80%",
    cgpa: null,
    location: "Kolkata, India",
    start: 2010,
    end: 2012,
  },
  {
    school: "Madhyamgram High School",
    degree: "Secondary Education (10 th) (W.B.B.S.E)",
    aggregate: "70.50%",
    cgpa: null,
    location: "Kolkata, India",
    start: 2005,
    end: 2010,
  },
]

export const work = [
  {
    company: "Tech Mahindra",
    link: "https://www.techmahindra.com/",
    mode: ["Work from Home", "Hybrid"],
    position: "Associate Tech Specialist",
    logo: null,
    start: "2022",
    end: null,
    description: "Tech Mahindra is a premier provider of digital transformation and consulting services. Specializing in innovative solutions, they help businesses adapt and thrive in the digital age, enhancing efficiency and competitiveness.",
    techStacks: [
      "bitbucket",
      "cucumber",
      "docker",
      "instana",
      "javascript",
      "jenkins",
      "jest",
      "jira",
      "nodejs",
      "npm",
      "reactjs",
      "snyk",
    ],
  },
  {
    company: "Infosys",
    link: "https://www.infosys.com/",
    mode: ["Office", "Work from Home"],
    position: "Consultant",
    logo: null,
    start: 2019,
    end: 2022,
    description: "Infosys is a global leader in consulting, technology, and outsourcing solutions. With a focus on driving digital innovation, Infosys helps clients navigate complex business challenges and achieve strategic goals. Their diverse portfolio of services spans across industries, delivering cutting-edge solutions tailored to meet the unique needs of each client.",
    techStacks: [
      "aws",
      "cucumber",
      "docker",
      "etl",
      "gitlab",
      "gmc",
      "javascript",
      "jira",
      "kafka",
      "nodejs",
      "reactjs",
      "springboot",
    ],
  },
  {
    company: "Webskitters",
    link: "https://www.webskitters.com/",
    mode: ["Office"],
    position: "Software Developer",
    logo: null,
    start: 2017,
    end: 2019,
    description: "Webskitters is a dynamic web development and digital marketing agency, specializing in crafting innovative online solutions tailored to clients' needs. With a focus on creativity and efficiency, Webskitters helps businesses establish a strong online presence and drive growth through strategic digital initiatives.",
    techStacks: [
      "angular",
      "gitlab",
      "javascript",
      "mongodb",
      "nodejs",
      "reactjs",
      "typescript",
    ],
  },
  {
    company: "Ascentspark",
    link: "https://www.ascentspark.com/",
    mode: ["Office"],
    position: "Junior Web Developer",
    logo: null,
    start: 2016,
    end: 2017,
    description: "Ascent Spark: Elevating brands through strategic digital marketing solutionsAscent Spark is a boutique digital marketing agency focused on elevating brands through strategic online initiatives. With a commitment to creativity and results-driven solutions, Ascent Spark helps businesses stand out and succeed in the competitive digital realm.",
    techStacks: ["angular", "ionic", "javascript", "laravel", "gitlab"],
  },
]

export const skills = {
  cloud: ["vercel", "aws"],
  "cross-platform": ["ionic", "electron"],
  devOps: ["docker", "jenkins"],
  database: ["mongodb", "postgresql", "mysql"],
  languages: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "angular",
    "deno",
    "bun",
  ],
  "object-relational-mapping": ["prisma", "mongoose"],
  "operating-system": ["linux", "mac", "windows"],
  test: ["cucumber", "jest", "vitest", "cypress", "playwright"],
  tools: [
    "postman",
    "jira",
    "graphql",
    "kafka",
    "bitbucket",
    "git",
    "github",
    "gitlab",
    "github-actions",
    "snyk",
    "instana",
  ],
}

export const key_skills = [
  "Full Stack Development",
  "Project Leadership",
  "Team Building and Leadership",
  "Collaboration and Communication",
  "TypeScript",
  "JavaScript",
  "Node.js"
]

export const projects = [
  {
    title: "Bridge Boffin",
    description: "Learning bridge game for kids",
    techStacks: ["bootstrap", "gitlab", "javascript", "laravel", "php"],
    links: [
      {
        type: "web",
        label: "bridgeboffin.com",
        href: "https://www.bridgeboffin.com",
      },
    ],
    company: "Ascentspark",
  },
  {
    title: "Menu Pulse",
    description:
      "The Restaurant-Based Social Network & Menu Wiki. Menu Pulse is a web and smartphone application-based platform for restaurants, menus, pictures, and reviews launching.",
    techStacks: [
      "angular",
      "bootstrap",
      "gitlab",
      "ionic",
      "javascript",
      "laravel",
    ],
    links: [
      {
        type: "web",
        label: "menupulse.com",
        href: "https://www.menupulse.com",
      },
      {
        type: "mobile",
        label: "Menupulse",
        href: "https://play.google.com/store/apps/details?id=com.Menupulse.Menupulse",
      },
    ],
    company: "Ascentspark",
  },
  {
    title: "Inagrab",
    description:
      "Inagrab is the best deal search engine that allows you to make the best possible decision in the shortest possible time.",
    techStacks: ["angular", "gitlab", "ionic", "nodejs", "npm", "typescript"],
    links: [
      {
        type: "mobile",
        label: "inagrab",
        href: "https://play.google.com/store/apps/details?id=in.youstart.inagrab",
      },
    ],
    company: "Webskitters",
  },
  {
    title: "Tapp - Drinking App",
    description:
      "The drinking game played by superheroes. Open Tapp App and your drinking destiny will be in the palm of your hands. No need to know the rules, hey create your own and let the drinks spill.",
    techStacks: ["angular", "gitlab", "ionic", "nodejs", "npm", "typescript"],
    links: [
      {
        type: "mobile",
        label: "tapp",
        href: "https://play.google.com/store/apps/details?id=com.dat.tapp",
      },
    ],
    company: "Webskitters",
  },
  {
    title: "Classified",
    description: "Post advertisement application",
    techStacks: [
      "angular",
      "firebase",
      "gitlab",
      "ionic",
      "nodejs",
      "npm",
      "typescript",
    ],
    links: [
      {
        type: "mobile",
        label: "classifieds",
        href: "https://play.google.com/store/apps/details?id=com.classifieds.universe",
      },
    ],
    company: "Webskitters",
  },
  {
    title: "The Scope App",
    description:
      "MEDICAL NEWS. RESIDENCY HUMOR. The Scope offers the week's best in evidence-based medicine, written in plain language for a nationwide audience of young physicians. This app features all of our fresh takes on medical journal articles in an easy-to-read, easy-to-search format. It's perfect for rotation prep and research presentations.",
    techStacks: [
      "express",
      "gitlab",
      "mongodb",
      "nodejs",
      "npm",
      "typescript",
    ],
    links: [
      {
        type: "mobile",
        label: "thescope",
        href: "https://play.google.com/store/apps/details?id=com.thescope",
      },
    ],
    company: "Webskitters",
  },
  {
    title: "Mizizi",
    description:
      "The Mizizi will allow users to locate and find a stylist, barbers, nail technician, eyebrow and eyelash technicians all over the world.",
    techStacks: [
      "angular",
      "express",
      "gitlab",
      "mongodb",
      "nodejs",
      "npm",
      "typescript",
    ],
    links: [
      {
        type: "mobile",
        label: "miziziapp.com",
        href: "https://miziziapp.com",
        App: "https://play.google.com/store/apps/details?id=com.mizizi",
      },
      {
        type: "web",
        label: "mizizi",
        href: "https://play.google.com/store/apps/details?id=com.mizizi",
      },
    ],
    company: "Webskitters",
  },
  {
    title: "LetsEat",
    description:
      "Order delicious home-cooked meals. See who's cooking in your neighborhood.",
    techStacks: [
      "express",
      "gitlab",
      "mongodb",
      "nodejs",
      "npm",
      "typescript",
    ],
    company: "Webskitters",
  },
  {
    title: "Card sort",
    description:
      "Realtime data analytics application by collecting users activity data and admin manageable.",
    techStacks: [
      "angular",
      "electron",
      "firebase",
      "gitlab",
      "nodejs",
      "npm",
      "typescript",
    ],
    company: "Webskitters",
  },
  {
    title: "CVS",
    description: "CVS Health, established in 1963, is a leading American healthcare company with over 9,900 retail locations nationwide. Offering a wide range of services including pharmacies, clinics, and digital health solutions, CVS aims to provide accessible and affordable healthcare for all.",
    techStacks: [
      "gmc",
    ],
    link: [],
    isClient: true,
    company: "Infosys",
    client_country: 'Canada'
  },
  {
    title: "Northwestern Mutual",
    description: "Northwestern Mutual, founded in 1857, is a leading U.S.-based financial services company. Specializing in life insurance, it offers a range of services including investment management and retirement planning, prioritizing personalized financial guidance for its clients' long-term security",
    techStacks: [
      "etl",
      "gitlab",
      "kafka",
      "jenkins",
      "nodejs",
      "springboot",
    ],
    link: [],
    isClient: true,
    company: "Infosys",
    client_country: 'USA'
  },
  {
    title: "Macmillan",
    description: "Macmillan Learning is a leading educational publisher, offering textbooks and digital tools for higher education. Committed to innovation, it provides resources to empower educators and students alike",
    techStacks: [
      "nodejs",
      "typescript",
      "jenkins",
      "bitbucket",
    ],
    link: [],
    isClient: true,
    company: "Tech Mahindra",
    client_country: 'USA'
  }
]

const payload = {
  about,
  contact,
  education,
  work,
  skills,
  key_skills,
  projects,
}

export default parse(schema, payload)

export function getLightThemeColors(): LightColorType[] {
  return ['yellow', 'blue', 'green', 'red', 'violet', 'zinc', 'orange', 'rose', 'slate', 'light']
}

export function getDarkThemeColors(): DarkColorType[] {
  return ['yellow-dark', 'blue-dark', 'green-dark', 'red-dark', 'violet-dark', 'zinc-dark', 'orange-dark', 'rose-dark', 'slate-dark', 'dark']
}
