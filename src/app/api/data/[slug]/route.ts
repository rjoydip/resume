import { list } from '@vercel/blob'
import { fetchData } from '@/lib/utils'
import type { ResumeDataType } from '@/types'

export const runtime = 'edge'

export async function GET(_: Request, { params }: { params: { slug: keyof ResumeDataType } }) {
  const { blobs } = await list()
  const data = await fetchData(blobs, params.slug)
  return Response.json(data ?? {})
}
