import { getDataAsync } from '@/data'
import type { ResumeDataType } from '@/types'

export async function GET(_: Request, { params }: { params: { slug: keyof ResumeDataType } }) {
  const data = await getDataAsync()
  return Response.json(data[params.slug] ?? {})
}
