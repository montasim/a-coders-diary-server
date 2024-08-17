'use strict';

/**
 * @fileoverview This module defines the `methodNotSupported` middleware function which is utilized to handle HTTP requests using methods that are not supported by a given route.
 * It dynamically checks the allowed methods for the route and responds with a '405 Method Not Allowed' status if the request method is not supported.
 * The function also sets the 'Allow' header in the response to inform the client about the valid methods for the requested route. This middleware enhances API security and robustness by ensuring that clients adhere to the specified request methods.

 * @description The `methodNotSupported` function serves as an integral part of HTTP request validation in web applications, especially RESTful services, where it's crucial to enforce method constraints.
 * By providing clear feedback on allowed methods and blocking unsupported ones, this function aids in maintaining the integrity and proper use of the API. It is typically used in routes as a fallback option when a requested method is not implemented.
 */

import httpStatus from '../constant/httpStatus.constants.js';

const methodNotSupported = (req, res) => {
    // Extract the methods allowed for the current route
    const methods = req.route.methods;
    const allowedMethods = Object.keys(methods)
        .filter((method) => methods[method] === true && method !== '_all') // Exclude '_all'
        .map((method) => method.toUpperCase())
        .join(', ');

    const methodNotSupportedData = {
        route: req.originalUrl,
        timeStamp: new Date(),
        success: false,
        data: {},
        message: `Method "${req.method}" is not allowed for the requested route. Allowed methods: ${allowedMethods}`,
        status: httpStatus.METHOD_NOT_ALLOWED,
    };

    // Set the Allow header dynamically based on the supported methods
    res.set('Allow', allowedMethods)
        .status(methodNotSupportedData.status)
        .send(methodNotSupportedData);
};

export default methodNotSupported;
