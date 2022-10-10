/**
 * UsesKit Js v0.1.1  Author: Aipeli
 * Website: https://www.useskit.com
 * Email:   useskit@gmail.com
 * Released under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

  function byteLength(charest = 'utf8') {
      let total = 0;
      charest = charest ? charest.toLowerCase() : '';
      if (charest === 'utf-16' || charest === 'utf16') {
          for (let i = 0; i < this.length; i++) {
              if (this.charCodeAt(i) <= 0xFFFF)
                  total += 2;
              else
                  total += 4;
          }
      }
      else {
          for (let i = 0; i < this.length; i++) {
              const charCode = this.charCodeAt(i);
              if (charCode <= 0x007F)
                  total += 1;
              else if (charCode <= 0x07FF)
                  total += 2;
              else if (charCode <= 0xFFFF)
                  total += 3;
              else
                  total += 4;
          }
      }
      return total;
  }
  function repeat(n) {
      let s = this.toString();
      let total = '';
      while (n > 0) {
          if (n % 2 === 1)
              total += s;
          if (n === 1)
              break;
          s += s;
          n = n >> 1;
      }
      return total;
  }
  function truncate(length, truncation) {
      length = ~~length;
      truncation = truncation === undefined ? '...' : truncation;
      return this.length > length ? this.slice(0, length) + truncation : String(this);
  }
  function capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
  function stripTags() {
      return String(this || '').replace(/<[^>]*>/g, '');
  }
  function stripScript() {
      return String(this || '').replace(/<script[^>]*>.*?<\/script>/g, '');
  }

  function getElementByXpath(xpath, context) {
      try {
          const elms = document.evaluate(xpath, context || document, null, XPathResult.ANY_TYPE, null);
          const arr = [];
          let elm = elms.iterateNext();
          while (elm) {
              arr.push(elm);
              elm = elms.iterateNext();
          }
          return arr;
      }
      catch (error) {
          console.error(error);
          return [];
      }
  }
  function deepClone$1(target) {
      if (target === null || typeof target !== 'object')
          return target;
      let cache = null;
      if (!deepClone$1.cache)
          deepClone$1.cache = new WeakMap();
      cache = deepClone$1.cache;
      if (cache.has(target)) {
          console.log('hey guys cache hit!!');
          return cache.get(target);
      }
      const result = Array.isArray(target) ? [] : {};
      for (const key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key))
              result[key] = deepClone$1(target[key]);
      }
      cache.set(target, result);
      return result;
  }

  const toString = Object.prototype.toString;
  function isObject(v) {
      return !!v && typeof v === 'object';
  }
  const isPlainObject = (toString.call(null) === '[object Object]')
      ? function (v) {
          return v !== null && v !== undefined && toString.call(v) === '[object Object]' && v.ownerDocument === undefined;
      }
      : function (v) {
          return toString.call(v) === '[object Object]';
      };
  function isWindow(v) {
      const r = /^\[object (?:Window|DOMWindw|global)\]$/;
      return r.test(toString.call(v));
  }
  function isElement(v) {
      return v ? v.nodeType === 1 : false;
  }
  function isUndefined(object) {
      return typeof object === 'undefined';
  }
  function isTextNode(v) {
      return v ? v.nodeName === '#text' : false;
  }
  function isPrimitive(v) {
      const type = typeof v;
      return type === 'string' || type === 'number' || type === 'boolean';
  }
  function isNumber(v) {
      return typeof v === 'number' && isFinite(v);
  }
  function isNumeric(v) {
      return !isNaN(parseFloat(v)) && isFinite(v);
  }
  function isString(v) {
      return typeof v === 'string';
  }
  function isBoolean(v) {
      return typeof v === 'boolean';
  }
  function isDate(v) {
      return toString.call(v) === '[object Date]';
  }
  const isArray = ('isArray' in Array)
      ? Array.isArray
      : function (v) {
          return toString.call(v) === '[object Array]';
      };
  function isFunction(v) {
      return toString.apply(v) === '[object Function]';
  }
  function isIterable(v) {
      const r = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/;
      if (!v || typeof v.length !== 'number' || typeof v === 'string' || isFunction(v))
          return false;
      if (!v.propertyIsEnumerable)
          return !!v.item;
      if (v.hasOwnProperty('length') && !v.propertyIsEnumerable('length'))
          return true;
      return r.test(toString.call(v));
  }
  function isEmply(v, allowEmptyString = false) {
      return (v === undefined)
          || (v === null)
          || (!allowEmptyString ? v === '' : false)
          || (isNaN(v) && v.toString() === 'NaN')
          || (isArray(v) && v.length === 0)
          || (isObject(v) && Object.keys(v).length === 0);
  }

  function _objectIndexOf(item) {
      for (let i = 0; i < this.length; i++) {
          if (isPlainObject(this[i]) && isPlainObject(item) && JSON.stringify(this[i]) === JSON.stringify(item))
              return i;
      }
      return -1;
  }
  function _arrayIndexOf(item) {
      for (let i = 0; i < this.length; i++) {
          if (isArray(this[i]) && isArray(item) && JSON.stringify(this[i]) === JSON.stringify(item))
              return i;
      }
      return -1;
  }
  function _nanIndexOf(arr) {
      for (let i = 0; i < arr.length; i++) {
          if (isNaN(arr[i]) && arr[i].toString() === 'NaN')
              return i;
      }
      return -1;
  }
  function inArray(item) {
      let index = -1;
      isArray(item)
          ? index = _arrayIndexOf.call(this, item)
          : isPlainObject(item)
              ? index = _objectIndexOf.call(this, item)
              : (typeof item === 'number') && isNaN(item)
                  ? index = _nanIndexOf(this)
                  : index = this.indexOf(item);
      return index;
  }
  function removeAt(index) {
      if (index < 0 || index >= this.length) {
          return false;
      }
      else {
          this.splice(index, 1);
          return true;
      }
  }
  function remove(item) {
      const index = inArray.call(this, item);
      if (index === -1)
          return false;
      return removeAt.call(this, index);
  }
  function deepClone() {
      return deepClone$1.call(this, this);
  }
  function compact() {
      return this.filter((v) => { return !isEmply(v); });
  }
  function unique() {
      const c = [];
      for (let i = 0; i < this.length; i++) {
          const item = this[i];
          if (c.inArray(item) === -1)
              c.push(item);
      }
      return c;
  }
  function without(other) {
      return this.filter((val) => {
          return other.inArray(val) === -1;
      });
  }
  function pluck(key) {
      const r = [];
      this.forEach((v) => {
          if (isPlainObject(v) && !isEmply(v))
              r.push(v[key]);
      });
      return r;
  }
  function groupBy(value) {
      const result = {};
      const iterator = isFunction(value) ? value : function (obj) { return obj[value]; };
      this.forEach((v, index) => {
          const key = iterator(v, index);
          if (!isEmply(key)) {
              if (isEmply(result[key]))
                  result[key] = [];
              result[key].push(v);
          }
      });
      return result;
  }
  function sortBy(scope = '', desc = false) {
      const array = this.map((item) => {
          if (!isEmply(scope)) {
              if (isObject(item[scope]))
                  console.warn(`参与排序的值包含了对象,可能会影响排序结果, 提示: [${scope}:${JSON.stringify(item[scope])}]`);
              return { el: item, re: item[scope] };
          }
          else {
              return { el: item, re: item };
          }
      }).sort((left, right) => {
          const a = left.re;
          const b = right.re;
          if (desc)
              return a < b ? 1 : a > b ? -1 : 0;
          else
              return a < b ? -1 : a > b ? 1 : 0;
      });
      return array.pluck('el');
  }
  function union(other) {
      const union = this.concat(other.filter((val) => {
          return this.inArray(val) === -1;
      }));
      return union;
  }
  function intersect(other) {
      return this.filter((val) => {
          return other.inArray(val) > -1;
      });
  }
  function diff(other) {
      return this.filter((val) => {
          return other.inArray(val) === -1;
      }).concat(other.filter((val) => {
          return this.inArray(val) === -1;
      }));
  }

  function getArguments() {
      const names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
          .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
          .replace(/\s+/g, '').split(',');
      return names.length === 1 && !names[0] ? [] : names;
  }

  function toJson() {
      return JSON.stringify(this);
  }

  function isLeapYear() {
      const y = this.getFullYear();
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }
  function getFirstDateInMonth() {
      return new Date(this.getFullYear(), this.getMonth(), 1);
  }
  function getLastDateInMonth() {
      return new Date(this.getFullYear(), this.getMonth() + 1, 0);
  }
  function getFirstDateInQuarter() {
      return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3, 1);
  }
  function getLastDateInQuarter() {
      return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3 + 3, 0);
  }
  function getDaysInMonth() {
      const y = this.getFullYear();
      switch (this.getMonth()) {
          case 0:
          case 2:
          case 4:
          case 6:
          case 7:
          case 9:
          case 11:
              return 31;
          case 1:
              return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
          default:
              return 30;
      }
  }
  function _addsub(v, offset, unit) {
      let newDate;
      switch (unit) {
          case 'y'  :
              newDate = new Date(v.setFullYear(v.getFullYear() + offset));
              break;
          case 'M'  :
              newDate = new Date(v.setMonth(v.getMonth() + offset));
              break;
          case 'w'  :
              newDate = new Date(v.setDate(v.getDate() + offset * 7));
              break;
          case 'd'  :
              newDate = new Date(v.setDate(v.getDate() + offset));
              break;
          case 'h'  :
              newDate = new Date(v.setHours(v.getHours() + offset));
              break;
          case 'm'  :
              newDate = new Date(v.setMinutes(v.getMinutes() + offset));
              break;
          case 's'  :
              newDate = new Date(v.setSeconds(v.getSeconds() + offset));
              break;
          case 'ms'  :
              newDate = new Date(v.setMilliseconds(v.getMilliseconds() + offset));
              break;
          default:
              newDate = new Date(0);
              break;
      }
      return newDate;
  }
  function addDate(offset, unit) {
      return _addsub(this, offset, unit);
  }
  function subDate(offset, unit) {
      return _addsub(this, -offset, unit);
  }
  function setLocale(locale) {
      this.locale = locale;
      return this;
  }
  function format(fmt = 'YYYY/MM/DD HH:mm:ss') {
      const _locale = this.locale || Date.locale || 'eng';
      const lng = [
          {
              eng: {
                  a: ['am', 'pm'],
                  A: ['AM', 'PM'],
                  dd: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                  ddd: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  dddd: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              },
              zho: {
                  a: ['上午', '下午'],
                  A: ['上午', '下午'],
                  dd: ['一', '二', '三', '四', '五', '六', '日'],
                  ddd: ['星一', '星二', '星三', '星四', '星五', '星六', '星日'],
                  dddd: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                  MMM: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
                  MMMM: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              },
          },
      ];
      const _lng = lng.pluck(_locale);
      const o = {
          YY: this.getFullYear().toString().substring(2),
          YYYY: this.getFullYear().toString(),
          M: (this.getMonth() + 1).toString(),
          MM: (this.getMonth() + 1).toString().padStart(2, '0'),
          MMM: _lng.pluck('MMM').flat(1)[this.getMonth()],
          MMMM: _lng.pluck('MMMM').flat(1)[this.getMonth()],
          DD: this.getDate().toString().padStart(2, '0'),
          HH: this.getHours().toString().padStart(2, '0'),
          hh: this.getHours() < 13 ? this.getHours().toString().padStart(2, '0') : (this.getHours() - 12).toString().padStart(2, '0'),
          mm: this.getMinutes().toString().padStart(2, '0'),
          ss: this.getSeconds().toString().padStart(2, '0'),
          a: this.getHours() < 13 ? _lng.pluck('a').flat(1)[0] : _lng.pluck('a').flat(1)[1],
          A: this.getHours() < 13 ? _lng.pluck('A').flat(1)[0] : _lng.pluck('A').flat(1)[1],
          E: this.getDay() === 0 ? 7 : this.getDay(),
          d: this.getDay(),
          dd: _lng.pluck('dd').flat(1)[this.getDay() - 1],
          ddd: _lng.pluck('ddd').flat(1)[this.getDay() - 1],
          dddd: _lng.pluck('dddd').flat(1)[this.getDay() - 1],
      };
      Object.keys(o).forEach((key) => {
          fmt = fmt.replace(new RegExp(`\\b${key}\\b`, 'g'), o[key]);
      });
      return fmt;
  }

  Object.prototype.toJson = toJson;
  Function.prototype.getArguments = getArguments;
  String.prototype.repeat = repeat;
  String.prototype.truncate = truncate;
  String.prototype.stripScript = stripScript;
  String.prototype.stripTags = stripTags;
  String.prototype.capitalize = capitalize;
  String.prototype.byteLength = byteLength;
  Array.prototype.remove = remove;
  Array.prototype.removeAt = removeAt;
  Array.prototype.inArray = inArray;
  Array.prototype.deepClone = deepClone;
  Array.prototype.compact = compact;
  Array.prototype.unique = unique;
  Array.prototype.pluck = pluck;
  Array.prototype.without = without;
  Array.prototype.groupBy = groupBy;
  Array.prototype.sortBy = sortBy;
  Array.prototype.union = union;
  Array.prototype.intersect = intersect;
  Array.prototype.diff = diff;
  Date.prototype.setLocale = setLocale;
  Date.prototype.isLeapYear = isLeapYear;
  Date.prototype.getFirstDateInMonth = getFirstDateInMonth;
  Date.prototype.getLastDateInMonth = getLastDateInMonth;
  Date.prototype.getFirstDateInQuarter = getFirstDateInQuarter;
  Date.prototype.getLastDateInQuarter = getLastDateInQuarter;
  Date.prototype.getDaysInMonth = getDaysInMonth;
  Date.prototype.format = format;
  Date.prototype.add = addDate;
  Date.prototype.sub = subDate;

  exports.deepClone = deepClone$1;
  exports.getElementByXpath = getElementByXpath;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isElement = isElement;
  exports.isEmply = isEmply;
  exports.isFunction = isFunction;
  exports.isIterable = isIterable;
  exports.isNumber = isNumber;
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isPlainObject = isPlainObject;
  exports.isPrimitive = isPrimitive;
  exports.isString = isString;
  exports.isTextNode = isTextNode;
  exports.isUndefined = isUndefined;
  exports.isWindow = isWindow;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
