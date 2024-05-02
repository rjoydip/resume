import { createClient } from '@vercel/edge-config'
import { env } from 'std-env'
import type { FeatureFlagType } from '@/types'

const { EDGE_CONFIG } = env
export const runtime = 'edge'
const edgeConfig = createClient(EDGE_CONFIG)

export async function GET(_: Request) {
  const data = await edgeConfig.getAll<FeatureFlagType>()
  return Response.json(data ?? {})
}
