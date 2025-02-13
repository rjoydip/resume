# rjresume

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rjoydip/rjresume)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

Simple web app that renders minimalist `Resume` with print-friendly layout.

## Features

- Built using Next.js 15, React, Typescript, @radix-ui and TailwindCSS
- Auto generated Layout
- Responsive for different devices
- Optimized for [Next.js](http://nextjs.org/) and [Vercel](https://vercel.com/)
- Identified and fix slow code using [million](https://million.dev/)
- Unit tested using [vitest](https://vitest.dev/)
- E2E tested (basic) using [playwright](https://playwright.dev/)

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
   bun install
   ```

4. Start the local Server:

   ```bash
   bun run dev
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

## TODO

- [x] Move data fetching individual page
- [x] Better data fetching using [TanStack Query](https://tanstack.com/query)
- [x] Resolve vitest warning
- [x] ESLint version upgrade to V9
- [ ] Provide fixture data in DEV mode
- [ ] Enhance code coverage (DOM)
- [ ] E2E test
  - [x] Enable ARIA labels
  - [ ] Enable ARIA snapshot
  - [ ] Enable snapshot testing
  - [x] Cover all pages
  - [ ] Enable test for mobile

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
