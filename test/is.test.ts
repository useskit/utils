/* eslint-disable no-new-wrappers */
/* eslint-disable no-new-object */
import { describe, expect, it } from 'vitest'
import { isArray, isBoolean, isDate, isElement, isEmply, isFunction, isIterable, isNumber, isNumeric, isObject, isPlainObject, isPrimitive, isString, isTextNode, isWindow } from '../src/is'
class C {
  hello() {
    console.log('hell')
  }
}
const htmlElement = document.createElement('div')
htmlElement.innerHTML = `<div id="example">
<p id="p1" class="aaa bbb"/>
<p id="p2" class="aaa ccc"/>
<p id="p3" class="bbb ccc"/>
</div>`
const pTags = htmlElement.getElementsByTagName('p')

describe('is', () => {
  it('isObject', () => {
    // @vitest-environment jsdom
    expect(isObject({})).eq(true)
    expect(isObject({ foo: 1 })).eq(true)
    expect(isObject(new Object())).eq(true)
    expect(isObject(window)).eq(true)

    expect(isObject(htmlElement)).eq(true)
    expect(isObject(new Date())).eq(true)
    expect(isObject([])).eq(true)
    expect(isObject(new Number(3))).eq(true)
    expect(isObject(new String('foo'))).eq(true)

    expect(isObject(null)).eq(false)
    expect(isObject(1)).eq(false)
    expect(isObject('foo')).eq(false)
    expect(isObject(false)).eq(false)
    expect(isObject(undefined)).eq(false)
  })
  it('isPlainObject', () => {
    expect(isPlainObject({})).eq(true)
    expect(isPlainObject({ foo: 1 })).eq(true)
    expect(isPlainObject(new Object())).eq(true)

    expect(isPlainObject(window)).eq(false)
    expect(isPlainObject(document)).eq(false)
    expect(isPlainObject(new Date())).eq(false)
    expect(isPlainObject([])).eq(false)
    expect(isPlainObject([])).eq(false)
    expect(isPlainObject(1)).eq(false)
    expect(isPlainObject('foo')).eq(false)
    expect(isPlainObject(false)).eq(false)
    expect(isPlainObject(new Number(3))).eq(false)
    expect(isPlainObject(new String('foo'))).eq(false)
    expect(isPlainObject(null)).eq(false)
    expect(isPlainObject(undefined)).eq(false)
  })

  it('isWindow', () => {
    expect(isWindow({})).eq(false)
    expect(isWindow(window)).eq(true)
    expect(isWindow(document)).eq(false)
    expect(isWindow('')).eq(false)
    expect(isWindow(1)).eq(false)
  })

  it('isElement', () => {
    expect(isElement(htmlElement)).toBe(true)

    expect(isElement(1)).toBe(false)
    expect(isElement('1')).toBe(false)
    expect(isElement(null)).toBe(false)
    expect(isElement(undefined)).toBe(false)
    expect(isElement({})).toBe(false)
    expect(isElement({ foo: 1 })).toBe(false)
  })

  it('isTextNode', () => {
    expect(isTextNode(htmlElement)).toBe(false)
  })

  it('isPrimitive', () => {
    expect(isPrimitive({})).eq(false)
    expect(isPrimitive({ foo: 1 })).eq(false)
    expect(isPrimitive(new Object())).eq(false)
    expect(isPrimitive(window)).eq(false)
    expect(isPrimitive(htmlElement)).eq(false)
    expect(isPrimitive(new Date())).eq(false)
    expect(isPrimitive([])).eq(false)
    expect(isPrimitive(null)).eq(false)
    expect(isPrimitive(undefined)).eq(false)
    expect(isPrimitive(new Number(3))).eq(false)
    expect(isPrimitive(new String('foo'))).eq(false)

    expect(isPrimitive(1)).eq(true)
    expect(isPrimitive('foo')).eq(true)
    expect(isPrimitive(false)).eq(true)
  })

  it('isNumber', () => {
    expect(isNumber(0)).eq(true)
    expect(isNumber(1)).eq(true)
    expect(isNumber(1.1)).eq(true)
    expect(isNumber(-1)).eq(true)
    expect(isNumber(-1.1)).eq(true)
    expect(isNumber(Number.MAX_VALUE)).eq(true)
    expect(isNumber(Number.MIN_VALUE)).eq(true)
    expect(isNumber(Math.PI)).eq(true)
    expect(isNumber(Number('3.1'))).eq(true)

    expect(isNumber('0')).eq(false)
    expect(isNumber('1')).eq(false)
    expect(isNumber('1.1')).eq(false)
    expect(isNumber('-1')).eq(false)
    expect(isNumber('-1.1')).eq(false)

    expect(isNumber({})).eq(false)
    expect(isNumber(window)).eq(false)
    expect(isNumber(document)).eq(false)
  })

  it('isNumeric', () => {
    expect(isNumeric(0)).eq(true)
    expect(isNumeric(1)).eq(true)
    expect(isNumeric(1.1)).eq(true)
    expect(isNumeric(-1)).eq(true)
    expect(isNumeric(-1.1)).eq(true)
    expect(isNumeric(Number.MAX_VALUE)).eq(true)
    expect(isNumeric(Number.MIN_VALUE)).eq(true)
    expect(isNumeric(Math.PI)).eq(true)
    expect(isNumeric(Number('3.1'))).eq(true)

    expect(isNumeric('0')).eq(true)
    expect(isNumeric('1')).eq(true)
    expect(isNumeric('1.1')).eq(true)
    expect(isNumeric('-1')).eq(true)
    expect(isNumeric('-1.1')).eq(true)

    expect(isNumeric({})).eq(false)
    expect(isNumeric(window)).eq(false)
    expect(isNumeric(document)).eq(false)
    expect(isNumeric('')).eq(false)
  })

  it('isString', () => {
    expect(isString({})).eq(false)
    expect(isString({ foo: 1 })).eq(false)
    expect(isString(new Object())).eq(false)
    expect(isString(new Date())).eq(false)
    expect(isString([])).eq(false)
    expect(isString(null)).eq(false)
    expect(isString(undefined)).eq(false)
    expect(isString(new Number(3))).eq(false)
    expect(isString(1)).eq(false)
    expect(isString(false)).eq(false)
    expect(isString(new String('foo'))).eq(false)

    expect(isString('foo')).eq(true)
  })

  it('isBoolean', () => {
    expect(isBoolean({})).eq(false)
    expect(isBoolean({ foo: 1 })).eq(false)
    expect(isBoolean(new Object())).eq(false)
    expect(isBoolean(new Date())).eq(false)
    expect(isBoolean([])).eq(false)
    expect(isBoolean(null)).eq(false)
    expect(isBoolean(undefined)).eq(false)
    expect(isBoolean(new Number(3))).eq(false)
    expect(isBoolean(1)).eq(false)
    expect(isBoolean(new String('foo'))).eq(false)
    expect(isBoolean('foo')).eq(false)

    expect(isBoolean(false)).eq(true)
  })

  it('isDate', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(true)).toBe(false)
    expect(isDate(1)).toBe(false)
    expect(isDate('1')).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate([])).toBe(false)
    expect(isDate({})).toBe(false)
  })

  it('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(false)).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray('foo')).toBe(false)
    expect(isArray(1)).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(new Date())).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(document.getElementsByTagName('body'))).toBe(false)
    expect(isArray(new C())).toBe(false)
  })

  it('isFunction', () => {
    expect(isFunction({})).eq(false)
    expect(isFunction({ foo: 1 })).eq(false)
    expect(isFunction(new Object())).eq(false)
    expect(isFunction(new Date())).eq(false)
    expect(isFunction([])).eq(false)
    expect(isFunction(null)).eq(false)
    expect(isFunction(undefined)).eq(false)
    expect(isFunction(new Number(3))).eq(false)
    expect(isFunction(1)).eq(false)
    expect(isFunction(new String('foo'))).eq(false)
    expect(isFunction('foo')).eq(false)
    expect(isFunction(false)).eq(false)

    expect(isFunction(() => {})).eq(true)
    expect(isFunction(() => {})).eq(true)
  })

  it('isIterable', () => {
    expect(isIterable({})).eq(false)
    expect(isIterable({ foo: 1 })).eq(false)
    expect(isIterable(new Object())).eq(false)
    expect(isIterable(new Date())).eq(false)
    expect(isIterable(null)).eq(false)
    expect(isIterable(undefined)).eq(false)
    expect(isIterable('foo')).eq(false)
    expect(isIterable(false)).eq(false)
    expect(isIterable(() => {})).eq(false)
    expect(isIterable(() => {})).eq(false)
    expect(isIterable(1)).eq(false)
    expect(isIterable(new Number(3))).eq(false)

    expect(isIterable(new String('foo'))).eq(true)
    expect(isIterable([])).eq(true)
    expect(isIterable([1, 2, 3])).eq(true)
    expect(isIterable(pTags)).eq(true)
  })

  it('isEmply', () => {
    expect(isEmply({})).eq(true)
    expect(isEmply(null)).eq(true)
    expect(isEmply(undefined)).eq(true)
    expect(isEmply('')).eq(true)
    expect(isEmply([])).eq(true)
    expect(isEmply([1])).eq(false)
    expect(isEmply(1)).eq(false)
  })
})
