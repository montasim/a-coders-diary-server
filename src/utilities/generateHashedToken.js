'use strict';

/**
 * @fileoverview This file exports an asynchronous function `generateHashedToken`
 * which uses the `crypto` library to generate a SHA-256 hashed representation of a given token.
 * This function is useful for securely hashing tokens before storing them in a database or for
 * other cryptographic purposes.
 */

import crypto from 'crypto';

/**
 * generateHashedToken - An asynchronous function that generates a SHA-256 hashed representation
 * of a given token using the `crypto` library. It takes a plaintext token, hashes it, and returns
 * the hashed token in hexadecimal format.
 *
 * @function
 * @async
 * @param {string} token - The plaintext token to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed token in hexadecimal format.
 */
const generateHashedToken = async (token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return hashedToken;
};

export default generateHashedToken;
