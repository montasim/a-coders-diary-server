'use strict';

/**
 * @fileoverview This file exports an asynchronous function `getAuthenticationToken`
 * which extracts the authentication token from an HTTP header. The function checks
 * if the header starts with the 'Bearer ' prefix and, if so, returns the token. If the
 * header does not contain a valid token, it returns null.
 */

/**
 * getAuthenticationToken - An asynchronous function that extracts the authentication token
 * from an HTTP header. It checks if the header starts with the 'Bearer ' prefix and, if so,
 * returns the token without the prefix. If the header does not contain a valid token, it returns null.
 *
 * @function
 * @async
 * @param {string} header - The HTTP header containing the authentication token.
 * @returns {Promise<string|null>} - A promise that resolves to the extracted token if the header
 * contains a valid token, or null if it does not.
 */
const getAuthenticationToken = async (header) => {
    const bearer = 'Bearer ';

    return (await header?.startsWith(bearer))
        ? header.slice(bearer.length)
        : null;
};

export default getAuthenticationToken;
