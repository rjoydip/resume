# rjresume

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rjoydip/rjresume)

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

- [X] Move data fetching individual page
- [X] Better data fetching using [TanStack Query](https://tanstack.com/query)
- [X] Resolve vitest warning
- [ ] ESLint version upgrade to V9
- [ ] Enhance code coverage
- [ ] E2E test
  - [X] Enable ARIA labels
  - [X] Enable CI code coverage
  - [ ] Enable ARIA snapshot
  - [ ] Enable snapshot testing
  - [X] Cover all pages
  - [ ] Enable test for mobile

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
