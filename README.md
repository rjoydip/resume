# rjoydip-resume

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rjoydip/resume)
[![Deploy](https://github.com/rjoydip/resume/actions/workflows/deploy.yaml/badge.svg)](https://github.com/rjoydip/resume/actions/workflows/deploy.yaml)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

Simple web app that renders minimalist CV with print-friendly layout. Built with Next.js and shadcn/ui, deployed on Vercel.

## Features

- Setup only takes a few minutes [single config file](./src/data.ts)
- Built using Next.js 14, React, Typescript, Shadcn/ui, TailwindCSS
- Auto generated Layout
- Responsive for different devices
- Optimized for Next.js and Vercel

## Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rjoydip/resume.git
   ```

2. Move to the cloned directory

   ```bash
   cd resume
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Start the local Server:

   ```bash
   yarn dev
   ```

5. Open the [Config file](./src/data.ts) and make changes

## Run with Docker

Build the container

```sh
docker compose build
```

Run the container

```sh
docker compose up -d
```

Stop the Container

```sh
docker compose down
```

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
