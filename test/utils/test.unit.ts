import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { filterObject } from '@/lib/utils'

export async function getTestFixturesAsync(name: string, omitKey?: string) {
  const jsonData = await readFile(`${resolve('test', 'fixtures')}/${name}.json`)
  return omitKey ? filterObject(JSON.parse(jsonData.toString()), omitKey) : JSON.parse(jsonData.toString())
}
