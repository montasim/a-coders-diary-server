'use strict';

/**
 * @fileoverview This file exports a function `generateTempPassword` which generates a temporary password
 * of a specified length range, ensuring it meets certain complexity requirements. The password includes
 * uppercase letters, lowercase letters, digits, and special characters. It also exports a helper function
 * `getRandomCharFromPattern` to retrieve random characters based on given patterns.
 */

import patterns from '../constant/patterns.constants.js';

/**
 * getRandomCharFromPattern - A helper function that retrieves a random character from a string that matches
 * a given pattern. This function is used to ensure that the generated password contains characters from
 * various character sets.
 *
 * @function
 * @param {RegExp} pattern - A regular expression pattern to match characters from.
 * @returns {string} - A randomly selected character that matches the provided pattern.
 */
const getRandomCharFromPattern = (pattern) => {
    const matchingChars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:"<>?`~[];,./|\\-='.match(
            pattern
        );
    return matchingChars[Math.floor(Math.random() * matchingChars.length)];
};

/**
 * generateTempPassword - A function that generates a temporary password with a length within the specified
 * range. The generated password includes at least one uppercase letter, one lowercase letter, one digit,
 * and one special character. It ensures that the password meets the complexity requirements and shuffles
 * the characters to avoid predictable sequences.
 *
 * @function
 * @param {number} min - The minimum length of the generated password.
 * @param {number} max - The maximum length of the generated password.
 * @returns {string} - A randomly generated password that meets the specified length and complexity requirements.
 */
const generateTempPassword = (min, max) => {
    // Ensure min and max are within acceptable range
    if (min < 8) min = 8;
    if (max > 20) max = 20;
    if (min > max) [min, max] = [max, min]; // Swap if min is greater than max

    const length = Math.floor(Math.random() * (max - min + 1)) + min; // Random length between min and max
    let password = '';

    // Ensure password meets all requirements
    password += getRandomCharFromPattern(patterns.UPPERCASE);
    password += getRandomCharFromPattern(patterns.LOWERCASE);
    password += getRandomCharFromPattern(patterns.DIGITS);
    password += getRandomCharFromPattern(patterns.SPECIAL_CHARACTERS);

    // Fill the rest of the password with random characters from all possible patterns
    while (password.length < length) {
        const allPatterns = [
            patterns.UPPERCASE,
            patterns.LOWERCASE,
            patterns.DIGITS,
            patterns.SPECIAL_CHARACTERS,
        ];
        const randomPattern =
            allPatterns[Math.floor(Math.random() * allPatterns.length)];
        password += getRandomCharFromPattern(randomPattern);
    }

    // Shuffle the password to avoid predictable sequences
    password = password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');

    return password;
};

export default generateTempPassword;
