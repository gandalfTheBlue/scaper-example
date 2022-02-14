import {
  deflate,
  getRandomNum,
  GroupFn,
  groupMap,
  MapFn,
  numScale,
} from './number'

describe('getRandomNum', () => {
  it('should return a random number in the scope', () => {
    expect(getRandomNum(10) < 10).toBeTruthy()
  })
})

describe('deflate', () => {
  it('should deflate the number with given decimals', () => {
    expect(deflate(180000, 5)).toBe(1.8)
  })
})

describe('groupMap', () => {
  const arr = ['a', 'ab', 'b', 'ba']
  const groupFn: GroupFn<string> = (ele: string) => ele.slice(0, 1)
  const mapFn: MapFn<string, string[]> = (group: string[], key: string) =>
    group.map((ele) => ele + key)
  it('given array should be grouped by first character and to concat their common first character for each group', () => {
    const result = groupMap<string, string[]>(arr, groupFn, mapFn)
    expect(result).toStrictEqual([
      ['aa', 'aba'],
      ['bb', 'bab'],
    ])
  })
})

describe('numScale', () => {
  it('should return 1e19 when passed number 1 and decimals 19 ', () => {
    expect(numScale(19)).toEqual(1e19)
  })
  it('should return -1e19 when passed number 1 and decimals -19 ', () => {
    expect(numScale(-19)).toEqual(1e-19)
  })
})
