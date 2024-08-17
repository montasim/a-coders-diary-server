'use strict';

/**
 * @fileoverview This module defines the service function for handling requests to undefined routes.
 * It constructs a response indicating that the route is invalid and handles any potential errors that may occur.
 */

import httpStatus from '../../constant/httpStatus.constants.js';
import errorResponse from '../../utilities/errorResponse.js';
import sendResponse from '../../utilities/sendResponse.js';
import loggerService from '../../service/logger.service.js';

/**
 * Handles requests to undefined routes.
 *
 * This function constructs a response indicating that the route is invalid with a 404 status.
 * In case of an error, it logs the error and returns an appropriate error response.
 *
 * @function
 * @name undefinedService
 * @returns {Object} - An object containing the response indicating the invalid route or an error response.
 */
const undefinedService = () => {
    try {
        return sendResponse({}, 'Invalid route!', httpStatus.NOT_FOUND);
    } catch (error) {
        loggerService.error(`Failed to process request: ${error}`);

        return errorResponse(
            error.message || 'Failed to process request.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export default undefinedService;
