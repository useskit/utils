import { describe, expect, it } from 'vitest'
import '../dist/index.esm'

declare global {
  interface Date {
    isLeapYear(this: Date): boolean
    getFirstDateInMonth(this: Date): Date
    getLastDateInMonth(this: Date): Date
    getFirstDateInQuarter(this: Date): Date
    getLastDateInQuarter(this: Date): Date
    getDaysInMonth(this: Date): number
    format(fmt?: string): string
    setLocale(locale: string): Date
    add(offset: number, unit: unitOfTime.All): Date
    sub(offset: number, unit: unitOfTime.All): Date
  }
  interface DateConstructor{
    /**
     * 本地语言
     */
    locale: string
    /**
    * 设置本地语言
    * @param locale 本地语言
    */
    setLocale(locale: string): void
  }
}
declare namespace unitOfTime{
  type _base = (
    'year' | 'years' | 'y' |
    'month' | 'months' | 'M' |
    'week' | 'weeks' | 'w' |
    'day' | 'days' | 'd' |
    'hour' | 'hours' | 'h' |
    'minute' | 'minutes' | 'm' |
    'second' | 'seconds' | 's' |
    'millisecond' | 'milliseconds' | 'ms'
  )
  export type All = _base
}

// 全局设置 Date 本地语言
Date.locale = 'zho'

describe('date', () => {
  it('isLeapYear', () => {
    expect(new Date('2020-01-01').isLeapYear()).eq(true)
    expect(new Date('2021-01-01').isLeapYear()).eq(false)
  })
  it('getFirstDateInMonth', () => {
    expect(new Date('2020-01-10').getFirstDateInMonth().toJSON()).eq('2019-12-31T16:00:00.000Z')
    expect(new Date('2021-02-10').getFirstDateInMonth().toJSON()).eq('2021-01-31T16:00:00.000Z')
  })
  it('getLastDateInMonth', () => {
    expect(new Date('2020-01-10').getLastDateInMonth().toJSON()).eq('2020-01-30T16:00:00.000Z')
    expect(new Date('2021-02-10').getLastDateInMonth().toJSON()).eq('2021-02-27T16:00:00.000Z')
  })
  it('getFirstDateInQuarter', () => {
    expect(new Date('2020-01-10').getFirstDateInQuarter().toJSON()).eq('2019-12-31T16:00:00.000Z')
    expect(new Date('2021-02-10').getFirstDateInQuarter().toJSON()).eq('2020-12-31T16:00:00.000Z')
  })
  it('getLastDateInQuarter', () => {
    expect(new Date('2020-01-10').getLastDateInQuarter().toJSON()).eq('2020-03-30T16:00:00.000Z')
    expect(new Date('2021-02-10').getLastDateInQuarter().toJSON()).eq('2021-03-30T16:00:00.000Z')
  })
  it('getDaysInMonth', () => {
    expect(new Date('2020-01-10').getDaysInMonth()).eq(31)
    expect(new Date('2021-02-10').getDaysInMonth()).eq(28)
  })
  it('format', () => {
    console.log(new Date(Date.now()))
    console.log(new Date(Date.now()).format())
    console.log(new Date(Date.now()).setLocale('eng').format('YYYY/MM/DD hh:mm:ss, YY, YYYY, M, MM, MMM, MMMM, d, E, dd, ddd, dddd, HH, hh, mm, ss, a, A'))
    console.log(new Date(Date.now()).format('YYYY/MM/DD hh:mm:ss, YY, YYYY, M, MM, MMM, MMMM, d, E, dd, ddd, dddd, HH, hh, mm, ss, a, A'))
  })
  it('addsub', () => {
    console.log(new Date(Date.now()).add(300, 'h').sub(300, 'h').format())
  })
})
