'use strict';

/**
 * @fileoverview This module configures the morgan logger middleware for use in an Express application.
 * Morgan is a middleware that logs HTTP requests and responses, providing insights into the traffic
 * that the application handles. This configuration extends the basic functionality by customizing the
 * log format and integrating with the application's logging service. It logs various aspects of each
 * request and response, such as method, URL, status, content length, response time, referrer, and
 * user-agent. A custom token is also defined to log JSON stringified request bodies, enhancing the
 * diagnostic capabilities of the logs.
 *
 * @requires module:morgan HTTP request logger middleware for node.js.
 * @requires module:service/logger.service Custom logging service to handle log output.
 */

import morgan from 'morgan';

import loggerService from '../service/logger.service.js';

// Custom token to log requestBooks bodies
morgan.token('body', (req) => JSON.stringify(req.body));

/**
 * Sets up morgan to log HTTP request and response details in a custom format to the application's
 * logger service. The log output includes standard HTTP transaction details along with execution time
 * and client metadata, configured to provide a comprehensive overview of incoming requests and outgoing
 * responses. The integration with the custom logger ensures that logs are consistent with other application
 * logs and are managed according to the overall logging strategy.
 *
 * @module morganConfiguration
 * @function
 * @param {Object} options - Configuration options for the morgan middleware.
 * @returns {Function} Middleware function that logs HTTP transactions.
 * @description Configures morgan logger to use a custom format and integration with the application's logging system.
 */
const morganConfiguration = morgan(
    (tokens, req, res) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            // 'body:', tokens.body(req, res), // Log requestBooks body
            'from',
            tokens.referrer(req, res),
            'user-agent:',
            tokens['user-agent'](req, res),
        ].join(' ');
    },
    { stream: { write: (message) => loggerService.info(message) } }
);

export default morganConfiguration;
