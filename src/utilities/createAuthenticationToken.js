'use strict';

/**
 * @fileoverview This file exports an asynchronous function `createAuthenticationToken`
 * which generates a JSON Web Token (JWT) for authentication purposes. It uses the
 * `jsonwebtoken` library to sign the token and the `uuid` library to create a unique
 * token ID. The function includes user details, designation, and device information
 * in the token payload, and configures the token's expiration based on settings
 * from the configuration file.
 */

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import configuration from '../configuration/configuration.js';

/**
 * createAuthenticationToken - An asynchronous function that generates a JWT for
 * user authentication. It creates a unique token ID using `uuid`, sets the token's
 * expiry, and includes user details, designation, and device information in the
 * token payload. The token is signed using a secret from the configuration file
 * and set to expire based on a configurable duration.
 *
 * @function
 * @async
 * @param {Object} userDetails - The details of the user for whom the token is being generated.
 * @param {string} designation - The designation of the user.
 * @param {string} device - The device information from which the request is made.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the
 * generated token and token details, or an error if the token generation fails.
 */
const createAuthenticationToken = async (userDetails, designation, device) => {
    try {
        const tokenDetails = {
            tokenId: uuidv4(),
            expiry: new Date(
                Date.now() +
                    configuration.jwt.accessExpirationMinutes * 60 * 1000
            ),
            currentUser: {
                _id: userDetails._id,
                designation,
                device,
            },
        };

        const token = jwt.sign(tokenDetails, configuration.jwt.secret, {
            expiresIn: `${configuration.jwt.accessExpirationMinutes}h`,
        });

        return { token, tokenDetails };
    } catch (error) {
        return error;
    }
};

export default createAuthenticationToken;
