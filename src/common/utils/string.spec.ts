import { caseIgnoreEqual, joinArrByMaxLength } from './string'

describe('caseIgnoreEqual', () => {
  it('should return falsy value when either param is falsy', () => {
    const source = null
    const target = ''
    expect(caseIgnoreEqual(source, target)).toBeFalsy()
  })

  it('should return true when two params just differ in chararacter case', () => {
    const source = '0xAB'
    const target = '0Xab'
    expect(caseIgnoreEqual(source, target)).toBeTruthy()
  })
})

describe('joinArrByMaxLength', () => {
  const prefix = 'prefix+'
  const maxLength = 10
  const sep = ','
  it('should ignore invalid item', () => {
    const arr = ['', , null, undefined, 'abcdefg']
    expect(joinArrByMaxLength(arr, maxLength, prefix, sep)).toHaveLength(0)
  })
  it('should join array items within the given length', () => {
    const arr = ['abc', 'def']
    expect(joinArrByMaxLength(arr, maxLength, prefix, sep)).toEqual([
      'prefix+abc',
      'prefix+def',
    ])
  })
})
