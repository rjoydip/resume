import type { Client } from 'autocannon'
import { Buffer } from 'node:buffer'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import autocannon from 'autocannon'
import consola from 'consola'

export const autocannonOptions: Omit<autocannon.Options, 'url'> = {
  connections: 10, // default
  pipelining: 1, // default
  duration: 10, // default
  workers: 5,
  setupClient: (client: Client) => {
    client.on('response', consola.log)
  },
}

export async function runBenchmark(url: string): Promise<autocannon.Result> {
  return new Promise((resolve, reject) => {
    const instance = autocannon({
      url,
      connections: 10, // Number of concurrent connections
      duration: 10, // Test duration in seconds
    }, (err, result) => {
      if (err)
        return reject(err)
      return resolve(result)
    })

    autocannon.track(instance, { renderProgressBar: false })
  })
}

export async function writeBenchmarkResult(filename: string, data: string) {
  const benchmarkPath = '../coverage/benchmark'
  if (!existsSync(benchmarkPath))
    await mkdir(new URL(benchmarkPath, import.meta.url), { recursive: true })
  await writeFile(
    new URL(`${benchmarkPath}/${filename}`, import.meta.url),
    new Uint8Array(Buffer.from(typeof data === 'string' ? data : typeof data === 'object' ? JSON.stringify(data) : '')),
    { encoding: 'utf8' },
  )
}
