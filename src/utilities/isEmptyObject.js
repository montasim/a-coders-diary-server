'use strict';

/**
 * @fileoverview This file exports a function `isEmptyObject` which checks whether a given value
 * is an empty object. It first verifies if the value is an object and then uses a helper
 * function `isEmpty` to check if the object has no own enumerable properties. The function
 * also handles cases where the object might be created with `Object.create(null)`.
 */

/**
 * isEmpty - A helper function that checks if an object has no own enumerable properties.
 *
 * @function
 * @param {Object} obj - The object to check.
 * @returns {boolean} - Returns `true` if the object has no own enumerable properties, otherwise `false`.
 */
const isEmpty = (obj) => {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
};

/**
 * isEmptyObject - A function that checks if a given value is an empty object. It first verifies
 * if the value is an object and if it has a prototype of either `null` or `Object.prototype`.
 * It then uses the `isEmpty` helper function to check if the object has no own enumerable properties.
 *
 * @function
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is an empty object, otherwise `false`.
 */
const isEmptyObject = (value) => {
    if (value === null) {
        // null or undefined
        return false;
    }

    if (typeof value !== 'object') {
        // boolean, number, string, function, etc.
        return false;
    }

    const proto = Object.getPrototypeOf(value);

    // consider `Object.create(null)`, commonly used as a safe map
    // before `Map` support, an empty object as well as `{}`
    if (proto !== null && proto !== Object.prototype) {
        return false;
    }

    return isEmpty(value);
};

export default isEmptyObject;
