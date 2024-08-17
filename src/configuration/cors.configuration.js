'use strict';

/**
 * @fileoverview This file defines the CORS (Cross-Origin Resource Sharing) configuration for the
 * application's server. CORS is a security feature that allows or restricts requested resources on a web
 * server depending on where the HTTP request was initiated. This configuration is crucial for ensuring that
 * the server responds only to requests from allowed origins, thereby preventing unwanted cross-site interactions.
 *
 * This module sets up a whitelist of allowed origins, specifies which HTTP methods are allowed, defines acceptable
 * headers, and other CORS-related settings such as credentials support, preflight continuation, and the maximum age
 * for the caching of the preflight response.
 */

/**
 * Configures CORS policy for the application, specifying which origins, HTTP methods, headers are allowed, and
 * whether credentials (cookies, authentication data) are included in cross-origin requests. This setup helps
 * to secure the application by controlling cross-origin access in accordance with defined security standards
 * and operational requirements.
 *
 * @module corsConfiguration
 * @property {Function} origin - A function to dynamically check the request origin against a whitelist and allow or deny it.
 * @property {number} optionsSuccessStatus - HTTP status code to use for successful OPTIONS requests, supporting legacy browsers.
 * @property {string} methods - Specifies which HTTP methods are allowed for CORS requests.
 * @property {string[]} allowedHeaders - Defines which headers can be used during the actual request.
 * @property {boolean} credentials - Indicates whether the request can include user credentials like cookies, HTTP authentication or client-side SSL certificates.
 * @property {boolean} preflightContinue - Determines if the app should pass the CORS preflight response to the next handler.
 * @property {number} maxAge - Defines the maximum time (in seconds) the results of a preflight request can be cached.
 * @description Sets up the CORS middleware configuration to ensure secure and controlled access across different domains.
 */
const corsConfiguration = {
    origin: (origin, callback) => {
        const whitelist = ['http://localhost:5000', '127.0.01:5000']; // List of allowed origins

        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // This allows the server to send cookies
    preflightContinue: false,
    maxAge: 24 * 60 * 60, // 24 hours
};

export default corsConfiguration;
