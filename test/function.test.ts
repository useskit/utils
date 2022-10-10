import { describe, expect, it } from 'vitest'
import '../dist/index.esm'

declare global {
  interface Function {
    getArguments(): Array<string>
  }
}
function hello(name: string, message: string) {
  console.log('hello world', name, message)
}

describe('function', () => {
  it('getArguments', () => {
    expect(hello.getArguments().toJson()).eq('["name","message"]')
  })
})
