'use strict';

/**
 * @fileoverview This module defines the controller for handling status-related operations.
 * It leverages an asynchronous error handling service to process the request and send the appropriate response.
 * The controller retrieves status data from the status service and sends it in the response.
 */

import asyncErrorHandlerService from '../../../service/asyncErrorHandler.service.js';
import statusService from './status.service.js';

/**
 * Handles the status-related request and response.
 *
 * This function uses the `asyncErrorHandlerService` to process the request asynchronously.
 * It calls the `statusService` to retrieve the status data and sends it in the response.
 *
 * @function
 * @name statusController
 * @param {Object} req - The request object containing any necessary parameters or body data.
 * @param {Object} res - The response object used to send back the status data.
 *
 * @returns {void} - The function sends the status data in the HTTP response.
 */
const statusController = asyncErrorHandlerService((req, res) => {
    const statusData = statusService(req);

    res.status(statusData.status).send(statusData);
});

export default statusController;
