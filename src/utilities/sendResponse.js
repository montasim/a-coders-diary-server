'use strict';

/**
 * @fileoverview This file exports a function `sendResponse` which creates a standardized
 * response object for successful HTTP requests. The function includes a timestamp,
 * success flag, data payload, message, and status code. It is designed to ensure
 * consistent response formatting across the application.
 */

import httpStatus from '../constant/httpStatus.constants.js';

/**
 * sendResponse - A function that creates a standardized response object for successful
 * HTTP requests. The response includes a timestamp, a success flag set to true, a data
 * payload, a message, and an HTTP status code (defaulting to OK).
 *
 * @function
 * @param {Object} data - The data payload to be included in the response.
 * @param {string} message - The message to be included in the response.
 * @param {number} [status=httpStatus.OK] - The HTTP status code for the response.
 * @returns {Object} - An object representing the response, including the timestamp,
 * success flag, data payload, message, and status code.
 */
const sendResponse = (data, message, status = httpStatus.OK) => ({
    timeStamp: new Date(),
    success: true,
    data,
    message,
    status,
});

export default sendResponse;
