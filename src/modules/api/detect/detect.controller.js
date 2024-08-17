'use strict';

/**
 * @fileoverview This file defines and exports the controller for handling detection-related requests.
 * The controller uses an async error handler to process the incoming requests, invoke the detection service,
 * and send the appropriate response back to the client.
 */

import asyncErrorHandlerService from '../../../service/asyncErrorHandler.service.js';
import detectService from './detect.service.js';

// TODO: use controller for controller
/**
 * detectController - Handles detection-related requests.
 * Uses the async error handler to process the request, invoke the detection service, and send the response.
 *
 * @async
 * @function
 * @param {Object} req - The request object, containing the details of the HTTP request.
 * @param {Object} res - The response object, used to send the response back to the client.
 */
const detectController = asyncErrorHandlerService(async (req, res) => {
    const browserData = await detectService(req);

    browserData.route = req.originalUrl;

    res.status(browserData.status).send(browserData);
});

export default detectController;
