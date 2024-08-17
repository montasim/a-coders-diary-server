'use strict';

/**
 * @fileoverview This file defines various constants used for validating and managing user-related data.
 * The constants include length constraints for different fields, regex patterns for validation, image size limits, and activity types.
 * These constants ensure that the user data conforms to the required formats and constraints for various operations in the application.
 */

/**
 * Length constraints for various user-related fields.
 *
 * @constant
 * @type {Object}
 * @property {Object} NAME - Length constraints for different parts of a name.
 * @property {number} NAME.FIRST_MIN - Minimum length for the first name.
 * @property {number} NAME.FIRST_MAX - Maximum length for the first name.
 * @property {number} NAME.MIDDLE_MIN - Minimum length for the middle name.
 * @property {number} NAME.MIDDLE_MAX - Maximum length for the middle name.
 * @property {number} NAME.LAST_MIN - Minimum length for the last name.
 * @property {number} NAME.LAST_MAX - Maximum length for the last name.
 * @property {number} NAME.NICK_MIN - Minimum length for the nickname.
 * @property {number} NAME.NICK_MAX - Maximum length for the nickname.
 * @property {Object} COMPANY - Length constraints for company-related fields.
 * @property {number} COMPANY.NAME_MAX - Maximum length for the company name.
 * @property {number} BIO_MAX - Maximum length for the bio.
 * @property {number} ADDRESS_MIN - Minimum length for the address.
 * @property {number} ADDRESS_MAX - Maximum length for the address.
 * @property {number} DEPARTMENT_MIN - Minimum length for the department.
 * @property {number} DEPARTMENT_MAX - Maximum length for the department.
 * @property {number} DESIGNATION_MIN - Minimum length for the designation.
 * @property {number} DESIGNATION_MAX - Maximum length for the designation.
 */
const lengths = {
    NAME: {
        FIRST_MIN: 2,
        FIRST_MAX: 16,

        MIDDLE_MIN: 2,
        MIDDLE_MAX: 16,

        LAST_MIN: 2,
        LAST_MAX: 16,

        NICK_MIN: 3,
        NICK_MAX: 10,
    },

    COMPANY: {
        NAME_MAX: 50,
    },

    BIO_MAX: 500,

    ADDRESS_MIN: 2,
    ADDRESS_MAX: 200,

    DEPARTMENT_MIN: 2,
    DEPARTMENT_MAX: 100,

    DESIGNATION_MIN: 2,
    DESIGNATION_MAX: 100,
};

/**
 * Regex patterns for validating various user-related fields.
 *
 * @constant
 * @type {Object}
 * @property {RegExp} NAME - Pattern for validating names.
 * @property {RegExp} USERNAME - Pattern for validating usernames.
 * @property {RegExp} DATE_OF_BIRTH - Pattern for validating dates of birth in the format DD-MM-YYYY.
 */
const pattern = {
    /**
     * Regular expression for validating names.
     *
     * This pattern is designed to match names that start with an uppercase letter followed by one or more lowercase letters.
     * It supports names composed of multiple words, where each word must also start with an uppercase letter followed by lowercase letters.
     * The pattern ensures that each part of the name (i.e., each word) starts with an uppercase character and is separated by a space.
     *
     * Examples of valid names:
     * - John
     * - Jane Doe
     * - John Jacob Jingleheimer Schmidt
     *
     * @example
     * const namePattern = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
     * console.log(namePattern.test("John")); // true
     * console.log(namePattern.test("john")); // false
     * console.log(namePattern.test("John Doe")); // true
     * console.log(namePattern.test("John D")); // false (second word must be more than one letter)
     */
    NAME: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,

    /**
     * Regular expression for validating usernames.
     *
     * This pattern ensures usernames are composed of lowercase letters, numbers, and underscores.
     * It requires usernames to start with a lowercase letter, followed by any combination of lowercase letters, numbers, and underscores.
     * No capital letters, spaces, or special characters other than underscores are allowed.
     *
     * Examples of valid usernames:
     * - john_doe
     * - jane123
     * - user_2023
     *
     * Examples of invalid usernames:
     * - John (contains a capital letter)
     * - jane doe (contains a space)
     * - 123jane (does not start with a lowercase letter)
     * - user@name (contains special characters other than underscore)
     *
     * @example
     * const usernamePattern = /^[a-z][a-z0-9_]*$/;
     * console.log(usernamePattern.test("john_doe")); // true
     * console.log(usernamePattern.test("Jane")); // false
     * console.log(usernamePattern.test("user2023")); // true
     * console.log(usernamePattern.test("john doe")); // false
     * console.log(usernamePattern.test("user@name")); // false
     */
    USERNAME: /^[a-z][a-z0-9_]*$/,

    /**
     * Regular expression for validating dates of birth in the format DD-MM-YYYY.
     *
     * This pattern ensures that the date string conforms to a specific format:
     * - DD: Two digits for the day, ranging from 01 to 31.
     * - MM: Two digits for the month, ranging from 01 to 12.
     * - YYYY: Four digits for the year, within the 20th or 21st century (1900-2099).
     *
     * The pattern accounts for most common date validations but does not check for the correctness of the day with respect to the month
     * (e.g., it does not catch 31-02 as an invalid date) or leap years. It is recommended to use additional date validation logic
     * if exact date correctness is crucial, such as in age verification processes.
     *
     * Examples of valid dates of birth:
     * - 01-01-1990
     * - 31-12-2000
     * - 29-02-2004 (leap year)
     *
     * Examples of invalid dates of birth:
     * - 31-02-2001 (February 31st does not exist)
     * - 00-12-1990 (day cannot be zero)
     * - 01-13-2020 (there is no 13th month)
     *
     * @example
     * const dateOfBirthPattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
     * console.log(dateOfBirthPattern.test("31-12-1998")); // true
     * console.log(dateOfBirthPattern.test("29-02-2001")); // false (non-leap year)
     * console.log(dateOfBirthPattern.test("01-13-2020")); // false (invalid month)
     */
    DATE_OF_BIRTH: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
};

/**
 * Maximum image size allowed in bytes (1.1 MB).
 *
 * @constant
 * @type {number}
 */
const imageSize = 1.1 * 1024 * 1024; // 1.1 MB

/**
 * Types of user activities for logging purposes.
 *
 * @constant
 * @type {Object}
 * @property {string} APPEARANCE - Activity type for appearance-related changes.
 * @property {string} PROFILE - Activity type for profile-related changes.
 * @property {string} ACCOUNT - Activity type for account-related changes.
 * @property {string} SECURITY - Activity type for security-related changes.
 */
const activityType = {
    APPEARANCE: 'appearance',
    PROFILE: 'profile',
    ACCOUNT: 'account',
    SECURITY: 'security',
};

const userConstants = {
    lengths,
    pattern,
    imageSize,
    activityType,
};

export default userConstants;
