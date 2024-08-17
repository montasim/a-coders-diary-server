'use strict';

/**
 * @fileoverview This file exports a function `verifyJwtToken` which verifies the authenticity
 * of a JSON Web Token (JWT). It uses the `jsonwebtoken` library to decode and verify the
 * token against a secret key specified in the configuration file.
 */

import jwt from 'jsonwebtoken';

import configuration from '../configuration/configuration.js';

/**
 * verifyJwtToken - A function that verifies the authenticity of a JSON Web Token (JWT).
 * It uses the `jsonwebtoken` library to decode and verify the token against a secret key
 * specified in the configuration file.
 *
 * @function
 * @param {string} token - The JWT to be verified.
 * @returns {Object} - The decoded token if it is valid.
 * @throws {Error} - If the token is invalid or verification fails.
 */
const verifyJwtToken = (token) => {
    return jwt.verify(token, configuration.jwt.secret);
};

export default verifyJwtToken;
