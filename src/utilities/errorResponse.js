'use strict';

/**
 * @fileoverview This file exports a function `errorResponse` which is used to create a standardized
 * error response object. The function takes an error message and an optional status code as inputs
 * and returns an object containing the timestamp, success flag, data payload, error message, and
 * status code. This is useful for consistent error handling and response formatting across the application.
 */

import httpStatus from '../constant/httpStatus.constants.js';

/**
 * errorResponse - A function that generates a standardized error response object.
 * The response includes a timestamp, a success flag set to false, an empty data payload,
 * the provided error message, and the provided status code (defaulting to BAD_REQUEST).
 *
 * @function
 * @param {string} message - The error message to be included in the response.
 * @param {number} [status=httpStatus.BAD_REQUEST] - The HTTP status code for the error response.
 * @returns {Object} - An object representing the error response, including the timestamp,
 * success flag, data payload, error message, and status code.
 */
const errorResponse = (message, status = httpStatus.BAD_REQUEST) => ({
    timeStamp: new Date(),
    success: false,
    data: {},
    message,
    status,
});

export default errorResponse;
