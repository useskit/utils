import { describe, expect, it } from 'vitest'
import '../dist/index.esm'
declare global {
  interface String {
    byteLength(this: string, charest?: string): number
    repeat(n: number): string
    truncate(length: number, truncation?: string): string
    capitalize(): string
    stripTags(): string
    stripScript(): string
  }
}

describe('string', () => {
  it('byteLength', () => {
    expect('abc123!@#'.byteLength()).eq(9)
    expect('中国人'.byteLength('utf8')).eq(9)
    expect('中国人'.byteLength('utf16')).eq(6)
  })

  it('repeat', () => {
    expect('abc123!@#'.repeat(2)).eq('abc123!@#abc123!@#')
  })

  it('truncate', () => {
    expect('abc123!@#'.truncate(6)).eq('abc123...')
    expect('abc123中国人'.truncate(7)).eq('abc123中...')
    expect('abc123!@#'.truncate(6, '___')).eq('abc123___')
  })

  it('capitalize', () => {
    expect('abc123!@#'.capitalize()).eq('Abc123!@#')
    expect('123abc!@#'.capitalize()).eq('123abc!@#')
    expect('中国人123abc!@#'.capitalize()).eq('中国人123abc!@#')
  })

  it('stripTags', () => {
    expect('<p>abc123!@#</p>'.stripTags()).eq('abc123!@#')
    expect('<div><p>abc123!@#</p><p>中国人</p></div>'.stripTags()).eq('abc123!@#中国人')
  })

  it('stripScript', () => {
    expect('<p>abc123!@#</p>'.stripScript()).eq('<p>abc123!@#</p>')
    expect('<script>console.log(\'hello world\')</script>'.stripTags()).eq('console.log(\'hello world\')')
  })
})
