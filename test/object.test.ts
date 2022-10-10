import { describe, expect, it } from 'vitest'
import '../dist/index.esm'

declare global {
  interface Object {
    toJson(): string
  }
}
describe('object', () => {
  it('toJSON', () => {
    expect({ a: 1 }.toJson()).eq('{"a":1}')
    expect('hello world'.toJson()).eq('"hello world"')
    expect([1, 2, 3].toJson()).eq('[1,2,3]')
  })
})
