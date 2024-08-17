'use strict';

/**
 * @fileoverview This file exports an asynchronous function `decodeAuthenticationToken`
 * which is designed to verify and decode a JSON Web Token (JWT) for authentication purposes.
 * The token verification is performed using the `jsonwebtoken` library and relies on
 * a secret key provided in the configuration file. The function ensures that the token is
 * valid and not expired before decoding and returning its payload.
 */

import jwt from 'jsonwebtoken';

import configuration from '../configuration/configuration.js';

/**
 * verifyAuthenticationToken - An asynchronous helper function that verifies the validity of a
 * JWT using the `jsonwebtoken` library. It checks the token against a secret key and resolves
 * with the decoded token data if successful, or rejects with an error if the token is invalid or expired.
 *
 * @function
 * @async
 * @param {string} token - The JWT to be verified.
 * @returns {Promise<Object>} - A promise that resolves to the decoded token data if the token is valid,
 * or rejects with an error if the token is invalid or expired.
 */
const verifyAuthenticationToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, configuration.jwt.secret, (err, decodedToken) => {
            if (err) {
                reject(err); // Token verification failed (e.g., token is expired or invalid)
            } else {
                resolve(decodedToken); // Return the decoded token data
            }
        });
    });
};

/**
 * decodeAuthenticationToken - An asynchronous function that verifies and decodes a JWT for
 * authentication purposes. It utilizes the `verifyAuthenticationToken` helper function to
 * perform the verification and decoding process.
 *
 * @function
 * @async
 * @param {string} token - The JWT to be verified and decoded.
 * @returns {Promise<Object>} - A promise that resolves to the decoded token data if the token is valid,
 * or rejects with an error if the token is invalid or expired.
 */
const decodeAuthenticationToken = async (token) => {
    return await verifyAuthenticationToken(token);
};

export default decodeAuthenticationToken;
