'use strict';

/**
 * @fileoverview This module defines the service function for retrieving the status of the application.
 * It handles the logic for constructing a response indicating the current status and handles any potential errors that may occur.
 */

import httpStatus from '../../../constant/httpStatus.constants.js';
import errorResponse from '../../../utilities/errorResponse.js';
import sendResponse from '../../../utilities/sendResponse.js';
import loggerService from '../../../service/logger.service.js';

/**
 * Retrieves the current status of the application.
 *
 * This function constructs a response indicating a successful status retrieval.
 * In case of an error, it logs the error and returns an appropriate error response.
 *
 * @function
 * @name statusService
 * @param {Object} req - The request object containing any necessary parameters or body data.
 * @returns {Object} - An object containing the status response or an error response.
 */
const statusService = (req) => {
    try {
        return sendResponse({}, 'Success', httpStatus.OK);
    } catch (error) {
        loggerService.error(`Failed to get roles: ${error}`);

        return errorResponse(
            error.message || 'Failed to get roles.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export default statusService;
