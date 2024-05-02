import { createClient } from '@vercel/edge-config'
import { env } from 'std-env'
import type { FeatureFlagType } from '@/types'

export const runtime = 'edge'

export async function GET(_: Request) {
  const edgeConfig = createClient(env.EDGE_CONFIG)
  const data = await edgeConfig.getAll<FeatureFlagType>()
  return Response.json(data ?? {})
}
