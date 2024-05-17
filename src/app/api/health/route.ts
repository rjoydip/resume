export const runtime = 'edge'

export async function GET(_: Request) {
  return Response.json({
    status: 'up',
  })
}
