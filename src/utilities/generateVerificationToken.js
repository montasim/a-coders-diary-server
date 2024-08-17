'use strict';

/**
 * @fileoverview This file exports an asynchronous function `generateVerificationToken`
 * which generates a verification token for email verification purposes. The function
 * uses the `crypto` library to create a random token, hashes it using the `generateHashedToken`
 * function, and sets an expiration time for the token. The plain token is also returned for use
 * in the verification URL.
 */

import crypto from 'crypto';

import generateHashedToken from './generateHashedToken.js';

/**
 * generateVerificationToken - An asynchronous function that generates a verification token
 * for email verification. It creates a random token using the `crypto` library, hashes the
 * token using the `generateHashedToken` function, and sets the token expiration time to 1 hour
 * from the current time. The function returns the hashed token, the expiration time, and the
 * plain token for use in the verification URL.
 *
 * @function
 * @async
 * @returns {Promise<Object>} - A promise that resolves to an object containing the hashed
 * verification token, the token expiration time, and the plain token.
 */
const generateVerificationToken = async () => {
    const verifyToken = crypto.randomBytes(20).toString('hex');
    const emailVerifyToken = await generateHashedToken(verifyToken);
    const emailVerifyTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    return {
        emailVerifyToken,
        emailVerifyTokenExpires,
        plainToken: verifyToken, // Return the plain token for use in the verification URL
    };
};

export default generateVerificationToken;
