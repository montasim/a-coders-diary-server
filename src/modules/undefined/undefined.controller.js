'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to undefined routes.
 * It leverages an asynchronous error handling service to process the request and send the appropriate response.
 * The controller retrieves data from the undefined service and sends it in the response.
 */

import asyncErrorHandlerService from '../../service/asyncErrorHandler.service.js';
import undefinedService from './undefined.service.js';

/**
 * Handles the request and response for undefined routes.
 *
 * This function uses the `asyncErrorHandlerService` to process the request asynchronously.
 * It calls the `undefinedService` to retrieve data and sends it in the response.
 *
 * @function
 * @name undefinedController
 * @param {Object} req - The request object containing any necessary parameters or body data.
 * @param {Object} res - The response object used to send back the data.
 *
 * @returns {void} - The function sends the data in the HTTP response.
 */
const undefinedController = asyncErrorHandlerService((req, res) => {
    const undefinedData = undefinedService(req);

    res.status(undefinedData.status).send(undefinedData);
});

export default undefinedController;
