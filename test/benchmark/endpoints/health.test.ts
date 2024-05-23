import assert from 'node:assert'
import consola from 'consola'
import { runBenchmark, writeBenchmarkResult } from 'test/test-utils'

async function main() {
  const result = await runBenchmark('http://localhost:3000/api/health')
  const { requests, non2xx } = result
  assert.ok(result['2xx'] > 1000, 'request count should be higher than 1000')
  assert.equal(non2xx, 0, 'non 200 count should be 0')
  assert.ok(requests.average > 100, 'request average should be higher than 100')
  await writeBenchmarkResult(
    'health.coverage.json',
    JSON.stringify(result),
  )
}

main().catch(consola.error)
