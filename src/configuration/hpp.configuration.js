'use strict';

/**
 * @fileoverview This module configures and extends the HTTP Parameter Pollution (HPP) protection
 * middleware for an Express application. HPP attacks involve sending multiple HTTP parameters of the
 * same name to exploit the web application's parameter handling logic. This configuration not only
 * applies standard HPP protection but also adds custom logic to detect and log attempts to pollute
 * sensitive parameters such as 'user', 'auth', and 'token'. Logging such attempts is crucial for
 * security monitoring and incident response.
 *
 * @requires module:hpp Middleware to protect against HTTP Parameter Pollution attacks.
 * @requires module:service/logger.service Logger service to record potential security incidents.
 */

import hpp from 'hpp';

import loggerService from '../service/logger.service.js';

/**
 * Customizes HPP middleware by adding a pre-check for sensitive parameters to identify and log
 * any parameter pollution attempts before applying the standard HPP protection. This additional
 * layer of logging helps in early detection of potential exploitation attempts, enhancing the
 * application's security posture against complex HTTP parameter-based attacks.
 *
 * @module hppConfiguration
 * @function
 * @param {Object} options - Configuration options for the HPP middleware.
 * @returns {Function} Middleware function that extends HPP with custom security checks.
 * @description Sets up HPP middleware with enhanced security measures to prevent and log HTTP Parameter Pollution attacks.
 */
const hppConfiguration = (options) => {
    return (req, res, next) => {
        // Check for multiple instances of sensitive parameters
        const sensitiveParams = ['user', 'auth', 'token'];

        sensitiveParams.forEach((param) => {
            if (req.query[param] && Array.isArray(req.query[param])) {
                loggerService.warn(
                    `HPP attempt detected on parameter: ${param}`,
                    req.query[param]
                );
                // Optionally, handle this as an incident report
            }
        });

        // Use the standard HPP middleware with configured options
        return hpp(options)(req, res, next);
    };
};

export default hppConfiguration;
