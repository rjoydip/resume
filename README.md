# rjresume

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rjoydip/rjresume)
[![Deploy](https://github.com/rjoydip/resume/actions/workflows/deploy.yaml/badge.svg)](https://github.com/rjoydip/rjresume/actions/workflows/deploy.yaml)

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
   git clone https://github.com/rjoydip/rjresume.git
   ```

2. Move to the cloned directory

   ```bash
   cd rjresume
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
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

6. Monitor using `React Scan`.

```bash
npx react-scan@latest http://127.0.0.1:3000
// Or
pnpm scan
```

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
