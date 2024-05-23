import tinydate from 'tinydate'

export const runtime = 'edge'

export async function GET(_: Request) {
  const today = new Date()
  const stamp = tinydate('Today is: {MMMM} {DD}, {YYYY}', {
    MMMM: d => d.toLocaleString('default', { month: 'long' }),
    DD: d => d.getDate(),
  })
  return Response.json({
    status: 'up',
    timeStamp: stamp(today),
  })
}
