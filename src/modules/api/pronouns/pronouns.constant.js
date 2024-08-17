'use strict';

/**
 * @fileoverview This file defines constants for validating pronouns-related data. It includes
 * constraints on the length of names and a regular expression pattern for validating names
 * with flexible capitalization rules. These constants are used to ensure that pronouns-related
 * data adheres to the required format and length restrictions.
 */

/**
 * lengths - An object containing constants for the minimum and maximum lengths of names.
 *
 * - NAME_MIN: Minimum length for a name (3 characters).
 * - NAME_MAX: Maximum length for a name (100 characters).
 */
const lengths = {
    NAME_MIN: 3,
    NAME_MAX: 100,
};

const pattern = {
    /**
     * Regular expression for validating names with flexible capitalization rules.
     *
     * This pattern matches names where the first word starts with an uppercase letter followed by one or more lowercase letters,
     * and any subsequent words can start with any lowercase letter. This is suitable for less formal names or phrases used in user input.
     * The pattern ensures that the first word adheres to capitalization norms, while subsequent words are more flexibly handled.
     *
     * Examples of valid names:
     * - Male (single word, starting uppercase)
     * - Rather not say (subsequent words start lowercase)
     * - Not specified (subsequent words start lowercase)
     *
     * @example
     * const namePattern = /^[A-Z][a-z]+(?: [a-z]+)*$/;
     * console.log(namePattern.test("Male")); // true
     * console.log(namePattern.test("female")); // false (first word must start with uppercase)
     * console.log(namePattern.test("Rather not say")); // true
     * console.log(namePattern.test("Gay D")); // true (second word can be lowercase)
     */
    NAME: /^[A-Z][a-z]+(?: [a-z]+)*$/,
};

/**
 * pronounsConstants - An object containing constants for pronouns validation:
 *
 * - lengths: An object containing constants for the minimum and maximum lengths of names.
 * - pattern: An object containing regular expression patterns for validating names.
 */
const pronounsConstants = {
    lengths,
    pattern,
};

export default pronounsConstants;
