'use strict';

/**
 * @fileoverview This file configures and exports the compression middleware setup for the
 * application server. The compression middleware is used to compress response bodies for
 * all requests that pass through it. This module sets specific parameters for compression
 * such as maximum level and condition-based filtering to optimize performance and control
 * data transmission efficiency. The use of this middleware can significantly reduce the size
 * of the response body, enhancing the speed of HTTP transactions particularly in environments
 * with bandwidth constraints.
 *
 * @requires module:compression Compression middleware for Node.js server responses.
 */

import compression from 'compression';

/**
 * Configures the compression middleware with specific settings to optimize the server's
 * response compression. The configuration sets the compression level to maximum and includes
 * a custom filter to selectively disable compression based on request headers. This setup
 * ensures that responses are efficiently compressed unless specifically requested otherwise
 * by the client, aiding in reduced latency and faster load times for end users.
 *
 * @module compressionConfiguration
 * @function
 * @param {Object} settings - Custom settings for the compression middleware.
 * @returns {Function} Compression middleware configured with custom settings.
 * @description Sets up response compression for the server with an option to bypass via request headers.
 */
const compressionConfiguration = compression({
    level: 9, // Maximum compression level
    threshold: 0, // Always compress, regardless of response size
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            // Do not compress responses if the 'x-no-compression' header is present
            return false;
        }

        // Always compress when the 'x-no-compression' header is not present
        return compression.filter(req, res);
    },
});

export default compressionConfiguration;
