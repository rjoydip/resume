import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono()

app.get('*', async (c) => {
  return c.html(`
    <html>
      <head>
      </head>
      <body>
        <h1>Welcome to Hono.js</h1>
      </body>
    </html>
  `)
})

export const runtime = 'edge'
export const GET = handle(app)