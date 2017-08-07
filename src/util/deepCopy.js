/**
 * Deep Copyer
 * Performs a deep copy on object literals and arrays and covers all nested
 * object literals and arrays.
 * @author Benjamin Huang
 */

"use strict";

const toStr = Object.prototype.toString;

/**
 * Checks whether an object literal or array is a "deep copy" with another
 * specified object literal or array.
 * @param   a - an object literal or an array.
 * @param   b - an object literal or an array to compare with.
 * @return  returns true if all values and nested items are clones of each
 *          other. Returns false otherwise.
 */
function isDeepCopy(a, b) {
    for (const c in a) {
        if (toStr.call(a[c]) === "[object Object]" ||
            toStr.call(a[c]) === "[object Array]") {
            if (!b[c] || a[c] === b[c]) {
                return false;
            }

            return isDeepCopy(a[c], b[c]);
        }

        if (a[c] !== b[c])
            return false;
    }

    return true;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the object literal to copy the values of all
 *          sources into.
 * @param   ...sources - one or more object literals to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target object literal.
 */
function deepMergeObject(target, ...sources) {
    let src;

    for (const i of sources)
        if (toStr.call(target) !== "[object Object]" ||
            toStr.call(i) !== "[object Object]")
            return;

    for (const source of sources) {
        for (const item in source) {
            src = source[item];
            target[item] =  toStr.call(src) === "[object Object]" ?
                            Object.assign({}, deepMergeObject({}, src)) : (
                                toStr.call(src) === "[object Array]" ?
                                deepMergeArray([], src) :
                                source[item]);
        }
    }

    return target;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the array to copy the values of all
 *          sources into.
 * @param   ...sources - one or more arrays to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target array.
 */
function deepMergeArray(target, ...sources) {
    for (const i of sources)
        if (toStr.call(target) !== "[object Array]" ||
            toStr.call(i) !== "[object Array]")
            return;

    for (const source of sources) {
        for (const item of source) {
            target.push(
                toStr.call(item) === "[object Array]" ?
                deepMergeArray([], item) : (
                    toStr.call(item) === "[object Object]" ?
                    deepMergeObject({}, item) :
                    item)
            );
        }
    }

    return target;
}

export { isDeepCopy, deepMergeObject, deepMergeArray };
