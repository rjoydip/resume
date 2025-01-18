import type { ResumeDataType } from '@/types'
import { fetchData } from '@/lib/utils'
import { list } from '@vercel/blob'
import { env } from 'std-env'

export const runtime = 'edge'

export async function GET(_: Request, { params }: { params: { slug: keyof ResumeDataType } }) {
  const { blobs } = await list({
    token: env.BLOB_READ_WRITE_TOKEN,
  })
  const data = await fetchData(blobs, params.slug)
  return Response.json(data ?? {})
}
