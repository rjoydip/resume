import type { Metadata } from 'next'
import { z } from 'zod'

import { columns } from './components/columns'
import { InsightTables } from './components/insight-tables'
import { dataSchema } from './data/schema'
import { insightData } from './data/seed'

export const metadata: Metadata = {
  title: 'Insight Tables',
  description: 'A table which contains information',
}

// Simulate a database read.
async function getInsightData() {
  return z.array(dataSchema).parse(insightData)
}

export default async function InsightTablePage() {
  const data = await getInsightData()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <InsightTables data={data} columns={columns} />
      </div>
    </>
  )
}
