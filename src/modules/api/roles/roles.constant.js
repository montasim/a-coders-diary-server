'use strict';

/**
 * @fileoverview This file defines constants for validating roles-related data. It includes
 * constraints on the length of role names and patterns to ensure they adhere to the required
 * length restrictions and format. These constants are used in various validation schemas
 * throughout the application.
 */

/**
 * lengths - An object containing constants for the minimum and maximum lengths of role names.
 *
 * - NAME_MIN: Minimum length for a role name (3 characters).
 * - NAME_MAX: Maximum length for a role name (100 characters).
 */
const lengths = {
    NAME_MIN: 3,
    NAME_MAX: 100,
};

/**
 * pattern - An object containing regular expression patterns for validating role names.
 *
 * - name: Regular expression pattern for role names.
 */
const pattern = {
    /**
     * name - Regular expression pattern for validating role names. The pattern ensures that
     * the role name starts with an uppercase letter followed by lowercase letters and contains
     * a space separating two words, each starting with a lowercase letter.
     *
     * @example
     * const namePattern = /^[A-Z][a-z]+ [a-z]+$/;
     * console.log(namePattern.test("Admin role")); // true
     * console.log(namePattern.test("admin Role")); // false (first word must start with uppercase)
     */
    name: /^[A-Z][a-z]+ [a-z]+$/,
};

/**
 * rolesConstants - An object containing constants for role validation:
 *
 * - lengths: An object containing constants for the minimum and maximum lengths of role names.
 * - pattern: An object containing regular expression patterns for validating role names.
 */
const rolesConstants = {
    lengths,
    pattern,
};

export default rolesConstants;
