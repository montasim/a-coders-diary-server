'use strict';

/**
 * @fileoverview This file exports an object `adminConstants` which contains various constants
 * used for validating admin-related data. These constants include minimum and maximum lengths
 * for different fields, a regular expression pattern for validating names, and a maximum image size.
 */

/**
 * lengths - An object that holds minimum and maximum length constraints for various fields.
 *
 * @property {number} NAME_MIN - Minimum length for a name.
 * @property {number} NAME_MAX - Maximum length for a name.
 * @property {number} EMAIL_MIN - Minimum length for an email.
 * @property {number} EMAIL_MAX - Maximum length for an email.
 * @property {number} MOBILE_MIN - Minimum length for a mobile number.
 * @property {number} MOBILE_MAX - Maximum length for a mobile number.
 * @property {number} ADDRESS_MIN - Minimum length for an address.
 * @property {number} ADDRESS_MAX - Maximum length for an address.
 * @property {number} DEPARTMENT_MIN - Minimum length for a department name.
 * @property {number} DEPARTMENT_MAX - Maximum length for a department name.
 * @property {number} DESIGNATION_MIN - Minimum length for a designation.
 * @property {number} DESIGNATION_MAX - Maximum length for a designation.
 * @property {number} PASSWORD_MIN - Minimum length for a password.
 * @property {number} PASSWORD_MAX - Maximum length for a password.
 */
const lengths = {
    NAME_MIN: 2,
    NAME_MAX: 50,

    EMAIL_MIN: 5,
    EMAIL_MAX: 100,

    MOBILE_MIN: 11,
    MOBILE_MAX: 14,

    ADDRESS_MIN: 2,
    ADDRESS_MAX: 200,

    DEPARTMENT_MIN: 2,
    DEPARTMENT_MAX: 100,

    DESIGNATION_MIN: 2,
    DESIGNATION_MAX: 100,

    PASSWORD_MIN: 8,
    PASSWORD_MAX: 30,
};

/**
 * Regular expression for validating names.
 *
 * This pattern requires a name to:
 * - Start with an uppercase letter
 * - Followed by one or more lowercase letters
 * - Optionally followed by one or more spaces and additional names, each starting with an uppercase letter and followed by lowercase letters
 *
 * This regex is designed to ensure names follow a common format where each name starts with an uppercase letter.
 *
 * @example
 * // Returns true for valid names
 * console.log(pattern.name.test("John Doe")); // true
 * console.log(pattern.name.test("Alice")); // true
 * console.log(pattern.name.test("Mary Jane Smith")); // true
 *
 * // Returns false for invalid names
 * console.log(pattern.name.test("john doe")); // false (first letter is not uppercase)
 * console.log(pattern.name.test("Alice1")); // false (contains a digit)
 * console.log(pattern.name.test("MARY JANE SMITH")); // false (all uppercase)
 *
 * @type {RegExp}
 */
const pattern = {
    name: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
};

/**
 * imageSize - The maximum allowable image size in bytes.
 *
 * @type {number}
 * @default 1.1 * 1024 * 1024 (1.1 MB)
 */
const imageSize = 1.1 * 1024 * 1024; // 1.1 MB

/**
 * adminConstants - An object that holds various constants used for validating admin-related data.
 * It includes:
 *
 * - Length constraints for fields such as name, email, mobile number, address, department, designation, and password.
 * - Regular expression patterns for validating specific fields.
 * - Maximum allowable image size in bytes.
 *
 * @typedef {Object} AdminConstants
 * @property {Object} lengths - An object containing minimum and maximum length constraints for various fields.
 * @property {Object} pattern - An object containing regular expression patterns for validating specific fields.
 * @property {number} imageSize - The maximum allowable image size in bytes.
 */
const adminConstants = {
    lengths,
    pattern,
    imageSize,
};

export default adminConstants;
