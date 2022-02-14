import { getRandomNum } from './number'

export const getRandomElement = (arr: any[]) => {
  const index = getRandomNum(arr.length)
  return arr?.[index]
}

export const caseIgnoreEqual = (source: string, target: string) => {
  return source && target && source.toLowerCase() === target.toLowerCase()
}

export const joinArrByMaxLength = function (
  arr: string[],
  maxLength: number,
  prefix = '',
  sep = ','
): string[] {
  const chunks: string[][] = []
  const allowLength = maxLength - prefix.length
  const arrLength = arr.length
  const sepLength = sep.length
  let chunk: string[] = []
  let chunkLength = 0
  for (let i = 0; i < arrLength; i++) {
    const item = arr[i]

    // ignore blank and oversized element
    const invalidItem = !item || item.length > allowLength
    if (invalidItem) {
      continue
    }

    // push chunk and clear if oversized after join item
    const afterLength =
      chunkLength + item.length + (chunk.length ? sepLength : 0)
    const oversized = afterLength > allowLength
    if (oversized) {
      chunks.push(chunk)
      chunk = []
      chunkLength = 0
    }

    chunk.push(item)
    chunkLength = chunkLength + item.length + (chunk.length ? sepLength : 0)

    const lastItem = i === arr.length - 1
    if (lastItem && chunk.length) {
      chunks.push(chunk)
    }
  }

  return chunks.map((chunk) => `${prefix}${chunk.join(sep)}`)
}

export const isEmpty = (value: unknown) => {
  if (value === undefined) {
    return false
  }
  if (value === null) {
    return false
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false
  }
  return true
}
