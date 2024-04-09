import {
  Ascentspark,
  GitHub,
  Infosys,
  LinkedIn,
  TechMahindra,
  Webskitters,
  X,
} from "@/components/icons";

export const RESUME_DATA = {
  name: "Joydip Roy",
  initials: "JR",
  location: "Kolkata, India",
  locationLink: "https://maps.app.goo.gl/9uaiMJMPsHU4inX7A",
  about:
    "Detail-oriented Full Stack Engineer dedicated to crafting high-quality products with meticulous precision.",
  summary:
    "As a seasoned Full Stack Engineer, I've adeptly guided numerous projects from conception to fruition. My leadership fosters collaborative teams, cultivating an atmosphere conducive to peak performance. Proficient in TypeScript, JavaScript, and Node.js, I bring over 8+ years of invaluable expertise gained through tenure with esteemed IT companies.",
  avatarUrl: "https://avatars.githubusercontent.com/u/112172822?v=4",
  personalWebsiteUrl: "https://rjoydip.me",
  contact: {
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
  },
  education: [
    {
      school: "Narula Institute Of Technology",
      degree: "Bachelor of Technology (W.B.U.T/M.A.K.A.U.T)",
      aggregate: "",
      cgpa: "7.84",
      location: "Kolkata, India",
      start: "2012",
      end: "2016",
    },
    {
      school: "Madhyamgram High School",
      degree: "Higher Secondary Education (12 th) (W.B.C.H.S.E)",
      aggregate: "63.80%",
      location: "Kolkata, India",
      start: "2010",
      end: "2012",
    },
    {
      school: "Madhyamgram High School",
      degree: "Secondary Education (10 th) (W.B.B.S.E)",
      aggregate: "70.50%",
      location: "Kolkata, India",
      start: "2010",
      end: "2012",
    },
  ],
  work: [
    {
      company: "Tech Mahindra",
      link: "https://www.techmahindra.com/",
      badges: ["Work from Home", "Hybrid"],
      title: "Associate Tech Specialist",
      logo: <TechMahindra />,
      start: "2022",
      end: null,
      description: "",
      technologies: [
        "Nodejs",
        "NPM",
        "Jenkins",
        "JavaScript",
        "reactjs",
        "Jira",
        "docker",
        "Jest",
        "Cucumber",
        "Snyk",
        "Instana",
      ],
    },
    {
      company: "Infosys",
      link: "https://www.infosys.com/",
      badges: ["Office", "Work from Home"],
      title: "Consultant",
      logo: <Infosys />,
      start: "2019",
      end: "2022",
      description: "",
      technologies: [
        "JavaScript",
        "Nodejs",
        "SpringBoot",
        "Kafka",
        "aws",
        "Reactjs",
        "Jira",
        "docker",
        "Cucumber",
        "GitLab",
        "ETL",
      ],
    },
    {
      company: "Webskitters Technology Solutions Pvt. Ltd",
      link: "https://www.webskitters.com/",
      badges: ["Office"],
      title: "Software Developer",
      logo: <Webskitters />,
      start: "2017",
      end: "2019",
      description: "Building web and hybrid application along with the backend",
      technologies: [
        "JavaScript",
        "Angular",
        "Nodejs",
        "Reactjs",
        "Mongodb",
        "Typescript",
        "GitLab",
      ],
    },
    {
      company: "Techmancer Web Development Pvt. Ltd (Ascentspark)",
      link: "https://www.ascentspark.com/",
      badges: ["Office"],
      title: "Junior Web Developer",
      logo: <Ascentspark />,
      start: "2016",
      end: "2017",
      description: "Building web and hybrid application along with the backend",
      technologies: ["Laravel", "Angular", "Ionic", "JavaScript", "GitLab"],
    },
  ],
  skills: [
    {
      Languages: [
        "JavaScript",
        "TypeScript",
        "React",
        "Nextjs",
        "Nodejs",
        "Angular",
        "Deno",
        "bun"
      ],
    },
    {
      Cloud: ["Vercel", "AWS"],
    },
    {
      DevOps: ["Docker", "Jenkins"],
    },
    { Database: ["MongoDB", "PostgreSQL", "MySQL"] },
    { ORM: ["Prisma", "Mongoose"] },
    { Test: ["Cucumber", "Jest", "Vitest", "Cypress", "Playwright"] },
    {
      OS: ["Windows", "Linux", "Mac"],
    },
    {
      "Cross Platform": ["Ionic", "Electron"],
    },
    {
      Tools: [
        "JIRA",
        "GraphQL",
        "Kafka",
        "Postman",
        "Snyk",
        "Instana",
        "GMC Automation",
      ],
    },
  ],
  projects: [
    {
      title: "Bridge Boffin",
      description: "Learning bridge game for kids",
      technologies: ["Laravel", "Bootstrap", "PHP", "gitlab", "javascript"],
      links: [
        {
          type: "web",
          label: "bridgeboffin.com",
          href: "https://www.bridgeboffin.com",
        },
      ],
    },
    {
      title: "Menu Pulse",
      description:
        "The Restaurant-Based Social Network & Menu Wiki. Menu Pulse is a web and smartphone application-based platform for restaurants, menus, pictures, and reviews launching.",
      technologies: ["Laravel", "Bootstrap", "Ionic", "angular", "gitlab", "javascript"],
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
    },
    {
      title: "Inagrab",
      description:
        "Inagrab is the best deal search engine that allows you to make the best possible decision in the shortest possible time.",
      technologies: [
        "angular",
        "Ionic",
        "Typescript",
        "node",
        "npm",
        "gitlab",
      ],
      links: [
        {
          type: "mobile",
          label: "inagrab",
          href: "https://play.google.com/store/apps/details?id=in.youstart.inagrab",
        },
      ],
    },
    {
      title: "Tapp - Drinking App",
      description:
        "The drinking game played by superheroes. Open Tapp App and your drinking destiny will be in the palm of your hands. No need to know the rules, hey create your own and let the drinks spill.",
      technologies: ["angular", "Ionic", "node", "npm", "gitlab", "typescript"],
      links: [
        {
          type: "mobile",
          label: "tapp",
          href: "https://play.google.com/store/apps/details?id=com.dat.tapp",
        },
      ],
    },
    {
      title: "Classified",
      description: "Post advertisement application",
      technologies: [
        "angular",
        "Ionic",
        "Firebase",
        "node",
        "npm",
        "gitlab",
        "typescript"
      ],
      links: [
        {
          type: "mobile",
          label: "classifieds",
          href: "https://play.google.com/store/apps/details?id=com.classifieds.universe",
        },
      ],
    },
    {
      title: "The Scope App",
      description:
        "MEDICAL NEWS. RESIDENCY HUMOR. The Scope offers the week's best in evidence-based medicine, written in plain language for a nationwide audience of young physicians. This app features all of our fresh takes on medical journal articles in an easy-to-read, easy-to-search format. It's perfect for rotation prep and research presentations.",
      links: [
        {
          type: "mobile",
          label: "thescope",
          href: "https://play.google.com/store/apps/details?id=com.thescope",
        },
      ],
      technologies: ["nodejs", "Express", "MongoDB", "npm", "gitlab", "typescript"],
    },
    {
      title: "Mizizi",
      description:
        "The Mizizi will allow users to locate and find a stylist, barbers, nail technician, eyebrow and eyelash technicians all over the world.",
      technologies: [
        "nodejs",
        "Express",
        "Mongodb",
        "Angular",
        "npm",
        "gitlab",
        "typescript"
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
    },
    {
      title: "LetsEat",
      description:
        "Order delicious home-cooked meals. See who's cooking in your neighborhood.",
      technologies: [
        "nodejs",
        "Express",
        "Mongodb",
        "npm",
        "gitlab",
        "typescript"
      ],
    },
    {
      title: "Card sort",
      description:
        "Realtime data analytics application by collecting users activity data and admin manageable.",
      technologies: ["Angular", "Firebase", "electron", "node", "npm", "gitlab", "typescript"],
    },
  ],
} as const;
