# rjresume

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rjoydip/rjresume)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

`Resume` with print-friendly layout [resume.rjoydip.com](https://resume.rjoydip.com).

## Features

- Built using `Next.js 15`, `React`, `Typescript`, `@radix-ui` and `TailwindCSS`
- Auto generated Layout
- Responsive for different devices
- Optimized for [Next.js](http://nextjs.org/) and [Vercel](https://vercel.com/)
- Identified and fix slow code using [million](https://million.dev/)
- Unit tested using [vitest](https://vitest.dev/)
- E2E tested using [playwright](https://playwright.dev/)

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

5. Start the test:

   ```bash
   bun run test
   ```

6. Open the [Config file](./src/data.ts) for static data and remaining dynamic data are in `Vercel Blob Storage`

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

- [x] Data fetching individual page
- [x] Better data fetching using [TanStack Query](https://tanstack.com/query)
- [x] Fixture data in `DEV` & `TEST` time
- [x] `vitest`
  - [x] Resolve warning
  - [ ] Enhance codecov
- [x] ESLint
  - [x] Version upgrade to `V9`
  - [x] Configure `a11y` plugin
- [ ] E2E test
  - [x] Enable `ARIA` labels
  - [x] Show codecov in CI
  - [ ] Enable `ARIA` snapshot
  - [ ] Enable snapshot testing
  - [x] Cover all pages
  - [x] Enable test for mobile
  - [x] Cross platform test in CI

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
