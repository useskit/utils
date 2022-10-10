/**
 * UsesKit Js v0.1.1  Author: Aipeli
 * Website: https://www.useskit.com
 * Email:   useskit@gmail.com
 * Released under the MIT license
 */

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

export { isArray, isBoolean, isDate, isElement, isEmply, isFunction, isIterable, isNumber, isNumeric, isObject, isPlainObject, isPrimitive, isString, isTextNode, isUndefined, isWindow };
