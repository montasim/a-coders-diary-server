'use strict';

/**
 * @fileoverview This file exports an asynchronous function `validatePassword` which validates
 * a password based on multiple criteria. It checks the password's length, presence of
 * uppercase and lowercase letters, digits, and special characters. It also checks for
 * simple patterns and common passwords.
 */

import patterns from '../constant/patterns.constants.js';
import loadListFromFile from './loadListFromFile.js';

/**
 * validatePassword - An asynchronous function that validates a password based on several criteria.
 * It checks if the password is between 8 and 20 characters, contains at least one uppercase letter,
 * one lowercase letter, one digit, and one special character. The function also checks for simple
 * patterns or common passwords and ensures that the password is not listed in a common passwords file.
 *
 * @function
 * @async
 * @param {string} password - The password to validate.
 * @returns {Promise<string>} - A promise that resolves to 'Valid' if the password passes all checks,
 * or an appropriate error message if it fails any check.
 */
const validatePassword = async (password) => {
    // Check minimum and maximum length
    if (password.length < 8 || password.length > 20) {
        return 'Password must be between 8 and 20 characters';
    }

    // Check for at least one uppercase letter
    if (!patterns.UPPERCASE.test(password)) {
        return 'Password must contain at least 1 uppercase letter';
    }

    // Check for at least one lowercase letter
    if (!patterns.LOWERCASE.test(password)) {
        return 'Password must contain at least 1 lowercase letter';
    }

    // Check for at least one digit
    if (!patterns.DIGITS.test(password)) {
        return 'Password must contain at least 1 digit';
    }

    // Check for at least one special character
    if (!patterns.SPECIAL_CHARACTERS.test(password)) {
        return 'Password must contain at least 1 special character';
    }

    // Example simple pattern check (sequential characters or too simple)
    if (
        password.match(/^(.)\1+$/) ||
        password === '1234' ||
        password.toLowerCase() === 'password'
    ) {
        return 'Password contains a simple pattern or is a common password';
    }

    // Consider integrating a more comprehensive check against a list of common passwords
    const commonPasswords = await loadListFromFile(
        '../vendor/commonPasswords.txt'
    );
    if (commonPasswords.has(password)) {
        return 'Use of common password is not allowed';
    }

    // If all checks pass, return a success message or the valid password
    return 'Valid';
};

export default validatePassword;
