import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const cypressFixturePath = resolve('cypress', 'fixtures')

type ObjType<T> = {
  [key: string]: T;
};

function filterObject<T>(obj: ObjType<T>, deleteKey: string | string[]): ObjType<T> {
  return Object.keys(obj)
    .filter(key => typeof deleteKey === 'string' ? key !== deleteKey : deleteKey.includes(key))
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
    }, {} as ObjType<T>);
}

export async function getFixturesAsync(name: string, omitKey?: string) {
  const jsonData = await readFile(`${cypressFixturePath}/${name}.json`)
  return omitKey ? filterObject(JSON.parse(jsonData.toString()), omitKey) : JSON.parse(jsonData.toString());
}