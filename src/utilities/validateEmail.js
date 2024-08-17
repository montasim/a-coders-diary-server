'use strict';

/**
 * @fileoverview This file exports an asynchronous function `validateEmail` which validates
 * an email address against various criteria. It checks if the email format is valid,
 * ensures the email domain is not blocked or temporary, and prevents the use of email addresses
 * with a "+number" pattern. The function utilizes regular expressions and external lists of
 * blocked and temporary email domains.
 */

import patterns from '../constant/patterns.constants.js';
import loadListFromFile from './loadListFromFile.js';

/**
 * validateEmail - An asynchronous function that validates an email address against various criteria.
 * It checks if the email format is valid, ensures the email domain is not blocked or temporary, and
 * prevents the use of email addresses with a "+number" pattern. If the email passes all checks, it
 * returns 'Valid'; otherwise, it returns an appropriate error message.
 *
 * @function
 * @async
 * @param {string} email - The email address to validate.
 * @returns {Promise<string>} - A promise that resolves to 'Valid' if the email passes all checks,
 * or an appropriate error message if it fails any check.
 */
const validateEmail = async (email) => {
    if (!patterns.EMAIL.test(email)) {
        return 'Email must be a valid email';
    }

    const domain = email.split('@')[1].toLowerCase();

    const blockedEmailDomains = await loadListFromFile(
        '../vendor/blockedEmailDomains.txt'
    );
    if (blockedEmailDomains.has(domain)) {
        return 'Email services is not allowed';
    }

    const tempEmailDomains = await loadListFromFile(
        '../vendor/tempEmailDomains.txt'
    );
    if (tempEmailDomains.has(domain)) {
        return 'Use of temporary email services is not allowed';
    }

    if (email.split('@')[0].match(/\+\d+$/)) {
        return 'Emails with a "+number" pattern are not allowed';
    }

    return 'Valid'; // Return 'Valid' if all checks are passed
};

export default validateEmail;
