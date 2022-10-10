import { describe, expect, it } from 'vitest'
import '../dist/index.esm'

declare global {
  interface Array<T> {
    removeAt(index: number): boolean
    remove(item: any, key?: string): boolean
    inArray(item: any): number
    deepClone(): T[]
    compact(): Array<any>
    unique(): any[]
    pluck(key: string): any[]
    without(other: Array<any>): Array<any>
    groupBy(this: Array<any>, v: any): Object
    sortBy(scope?: string, desc?: boolean): Array<any>
    union(other: Array<any>): Array<any>
    intersect(other: Array<any>): Array<any>
    diff(other: Array<any>): Array<any>
  }
}

describe('array', () => {
  it('removeAt', () => {
    const t1 = [1, 2, 3, 4, 5, 6]
    const t2 = [1, 'a', true, { k1: 'v1' }]
    t1.removeAt(0)
    t2.removeAt(3)
    expect(t1.length).toBe(5)
    expect(t1.toString()).toEqual('2,3,4,5,6')
    expect(t2.length).toEqual(3)
    expect(t2.toString()).toEqual('1,a,true')
  })

  it('remove', () => {
    const t1 = [1, 'a', true, [1, 'a'], { k1: 'v1' }]
    t1.remove({ k1: 'v1' }, 'k1')
    expect(t1.toString()).toEqual('1,a,true,1,a')
    t1.remove([1, 'a'])
    expect(t1.toString()).toEqual('1,a,true')
    t1.remove(1)
    expect(t1.toString()).toEqual('a,true')
    t1.remove('a')
    expect(t1.toString()).toEqual('true')
    t1.remove(true)
    expect(t1.toString()).toEqual('')
  })

  it('inArray', () => {
    const t1 = [1, 'a', true, [1, 'a'], { k1: 'v1' }, NaN]
    expect(t1.inArray({ a: 1 })).eq(-1)
    expect(t1.inArray(1)).toBe(0)
    expect(t1.inArray('a')).toBe(1)
    expect(t1.inArray(true)).toBe(2)
    expect(t1.inArray([1, 'a'])).toBe(3)
    expect(t1.inArray({ k1: 'v1' })).toBe(4)
    expect(t1.inArray(NaN)).toBe(5)
  })

  it('deepClone', () => {
    const t1 = [1, 'a', true, [1, 'a'], { k1: 'v1' }]
    const t2 = t1.deepClone()
    expect(t1.toString()).toEqual(t2.toString())
    expect(t1).not.toBe(t2)
  })

  it('compact', () => {
    const t1 = ['', null, [], {}, 1, 'a', true, { k1: 'v1' }, [1], undefined]
    expect(t1.compact().toString()).eq('1,a,true,[object Object],1')
  })

  it('unique', () => {
    const t1 = [null, undefined, 1, 'a', true, 1, 'a', { k1: 'v1' }, { k1: 'v1' }, [2], [2]]
    expect(t1.unique().toString()).eq(',,1,a,true,[object Object],2')
    expect(t1.unique().compact().toString()).eq('1,a,true,[object Object],2')
  })

  it('pluck', () => {
    const t1 = [null, undefined, 1, 'a', true, 1, 'a', { k1: 'v1' }, { k1: 'v2' }, [2], [2]]
    expect(t1.pluck('k1').toString()).eq('v1,v2')
  })

  // it('without', () => {
  //   const t1 = [1, 'a', true, { k1: 'v1' }, { k1: 'v2' }, [2], [2]]
  //   // expect(t1.without([1,[2]]).toJson()).eq('["a",true,{"k1":"v1"},{"k1":"v2"}]')
  // })

  it('groupBy', () => {
    const t1 = [
      1, 'a', [], 'name',
      { name: 'apples', category: 'fruits' },
      { name: 'oranges', category: 'fruits' },
      { name: 'potatoes', category: 'vegetables' },
    ]
    expect(JSON.stringify(t1.groupBy('category')), '{"fruits":[{"name":"apples","category":"fruits"},{"name":"oranges","category":"fruits"}],"vegetables":[{"name":"potatoes","category":"vegetables"}]}')
  })

  it('sortBy', () => {
    const t1 = [
      { name: 'oranges', category: 'fruits' },
      { name: 'potatoes', category: 'vegetables' },
      { name: 'apples', category: 'fruits' },
    ]
    expect(JSON.stringify(t1.sortBy('name')), '[{"name":"apples","category":"fruits"},{"name":"oranges","category":"fruits"},{"name":"potatoes","category":"vegetables"}]')
    const t2 = [1, 3, 2, 'b', 'a', 5, 4, 7, 6]
    expect(JSON.stringify(t2.sortBy())).eq('[1,2,3,"a","b",4,5,6,7]')
    const t3 = ['bxdadf', 'ba', 'a', { a: 2 }, { a: 1 }]
    expect(JSON.stringify(t3.sortBy())).eq('[{"a":2},{"a":1},"a","ba","bxdadf"]')
  })

  it('union', () => {
    const t1 = [1, 2, 3, 4, 6, NaN]
    const t2 = [1, 3, 5, 7, NaN]
    expect(JSON.stringify(t1.union(t2))).eq('[1,2,3,4,6,null,5,7]')
    expect(JSON.stringify(t1.union(t2).compact())).eq('[1,2,3,4,6,5,7]')
    expect(JSON.stringify(t1.union(t2).compact().sortBy())).eq('[1,2,3,4,5,6,7]')

    const o1 = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
    const o2 = [{ e: 5 }]
    expect(JSON.stringify(o1.union(o2))).eq('[{"a":1},{"b":2},{"c":3},{"d":4},{"e":5}]')

    const o3 = [{ a: 1 }, { a: 4 }, { a: 3 }, { a: 2 }]
    const o4 = [{ a: 1 }, { a: 5 }, {}]
    expect(JSON.stringify(o3.union(o4))).eq('[{"a":1},{"a":4},{"a":3},{"a":2},{"a":5},{}]')
    expect(JSON.stringify(o3.union(o4).compact())).eq('[{"a":1},{"a":4},{"a":3},{"a":2},{"a":5}]')
    expect(JSON.stringify(o3.union(o4).compact().sortBy('a'))).eq('[{"a":1},{"a":2},{"a":3},{"a":4},{"a":5}]')
  })

  it('intersect', () => {
    const t1 = [1, 2, 3, 4, 6, NaN]
    const t2 = [1, 3, 5, 7, NaN]
    expect(JSON.stringify(t1.intersect(t2))).eq('[1,3,null]')
    expect(JSON.stringify(t1.intersect(t2).compact())).eq('[1,3]')
    expect(JSON.stringify(t1.intersect(t2).compact().sortBy('', true))).eq('[3,1]')

    const o1 = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
    const o2 = [{ c: 3 }, { d: 4 }, { e: 5 }]
    expect(JSON.stringify(o1.intersect(o2))).eq('[{"c":3},{"d":4}]')

    const o3 = [{ a: 4 }, { a: 1 }, { a: 3 }, { a: 2 }, {}]
    const o4 = [{ a: 1 }, { a: 4 }, {}, { a: 5 }]
    expect(JSON.stringify(o3.intersect(o4))).eq('[{"a":4},{"a":1},{}]')
    expect(JSON.stringify(o3.intersect(o4).compact())).eq('[{"a":4},{"a":1}]')
    expect(JSON.stringify(o3.intersect(o4).compact().sortBy('a'))).eq('[{"a":1},{"a":4}]')
  })

  it('diff', () => {
    const t1 = [1, 2, 3, 4, 6, NaN]
    const t2 = [1, 3, 5, 7]

    expect(JSON.stringify(t1.diff(t2))).eq('[2,4,6,null,5,7]')
    expect(JSON.stringify(t1.diff(t2).compact())).eq('[2,4,6,5,7]')
    expect(JSON.stringify(t1.diff(t2).compact().sortBy())).eq('[2,4,5,6,7]')

    const o1 = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
    const o2 = [{ c: 3 }, { d: 4 }, { e: 5 }]
    expect(JSON.stringify(o1.diff(o2))).eq('[{"a":1},{"b":2},{"e":5}]')

    const o3 = [{ a: 4 }, { a: 1 }, { a: 3 }, { a: 2 }]
    const o4 = [{ a: 1 }, { a: 4 }, {}, { a: 5 }]
    expect(JSON.stringify(o3.diff(o4))).eq('[{"a":3},{"a":2},{},{"a":5}]')
    expect(JSON.stringify(o3.diff(o4).compact())).eq('[{"a":3},{"a":2},{"a":5}]')
    expect(JSON.stringify(o3.diff(o4).compact().sortBy('a'))).eq('[{"a":2},{"a":3},{"a":5}]')
  })
})
