'use strict';

/**
 * @fileoverview This file exports a function `getHostData` which extracts the hostname
 * and port from an Express request object. This function is useful for retrieving
 * host-related information from incoming HTTP requests.
 */

/**
 * getHostData - A function that extracts the hostname and port from an Express request
 * object. It returns an object containing the hostname and port properties.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @returns {Object} - An object containing the hostname and port of the request.
 */
const getHostData = (req) => {
    return {
        hostname: req.hostname,
        port: req.port,
    };
};

export default getHostData;
