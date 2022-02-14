import _ from 'lodash'
import { isNumeric } from 'mathjs'
import { caseIgnoreEqual } from './string'

export type GroupFn<T> =
  | ((ele: T) => string)
  | ((ele: T, index: number) => string)
export type ForEachFn<T> =
  | ((group: T[]) => void)
  | ((group: T[], key: string) => void)
export type MapFn<T, V> = ((group: T[]) => V) | ((group: T[], key: string) => V)

/**
 * get random number between 0 and scope, [0, scope)
 *
 * @param scope
 * @returns
 */
export const getRandomNum = (scope: number) => {
  return Math.floor(Math.random() * scope)
}

export const hexToDecimal = (hex: string) => {
  try {
    return parseInt(hex ?? '0', 16)
  } catch (e) {
    return 0
  }
}

/**
 * description Scale down the given number by given decimals
 */
export const deflate = (
  num: number | string,
  decimals: number | string = 18
) => {
  return +num / Math.pow(10, +decimals)
}

/**
 * Scale up or down the given number by given decimals
 */
export const numScale = function (
  decimals: number | string = 18,
  num: number | string = 1
) {
  return +num * Number(`1e${decimals}`)
}

export const getTokenAmount = (
  totalSupply: string | number,
  userBalance: string | number,
  ...tokenReserves: Array<string | number>
) => {
  const share = Number(userBalance) / Number(totalSupply)
  const tokenAssets = tokenReserves.map(
    (tokenReserve) => Number(tokenReserve) * share
  )
  return {
    tokenAssets,
    share,
  }
}

/**
 * Group collection by given groupFn and invoke given mapFn for each group to return an compacted array
 */
export const groupMap = <T, V>(
  arr: T[],
  groupFn: GroupFn<T>,
  mapFn: MapFn<T, V>
) => {
  return (_.compact(_.map(_.groupBy(arr, groupFn), mapFn)) as unknown) as V[]
}

export const getNumberFromPercentage = (pecentage: string) => {
  if (!pecentage) return null
  const result = Number(pecentage.split('%')[0]) / 100
  return isNumeric(result) ? result : null
}

export const getNumberFromAbbr = (numberText: string) => {
  const decimalMap = {
    b: 1000000000,
    m: 1000000,
    k: 1000,
  }

  if (!numberText) return null
  let result: number
  const tvlArr = String(numberText).replace(/,/g, '').split('')
  if (caseIgnoreEqual(tvlArr[0], '$')) {
    tvlArr.shift()
  }
  const lastElement = tvlArr[tvlArr.length - 1]
  const decimal = decimalMap[lastElement.toLowerCase()]
  if (decimal) {
    tvlArr.pop()
    result = Number(tvlArr.join('')) * decimal
  } else {
    result = Number(tvlArr.join(''))
  }
  return isNumeric(result) ? result : numberText
}
