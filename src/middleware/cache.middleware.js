'use strict';

/**
 * @fileoverview This module provides caching middleware functionalities for an Express application using NodeCache.
 * It includes functions to create cache entries based on request URLs and methods, and to invalidate cache entries
 * based on specific routes. This caching mechanism enhances performance by storing the results of expensive operations
 * (typically GET requests) and serving them directly from the cache on subsequent requests, reducing the need for
 * re-execution and thus speeding up response times.
 *
 * The module defines two main functions:
 * - `create`: Dynamically generates a caching layer for requests, with a customizable duration for cache entries.
 *   It intercepts outgoing responses and caches them if they meet specific criteria (e.g., successful GET responses).
 * - `invalidate`: Provides a way to programmatically clear cached entries when data modifications occur that would
 *   render the cached data stale, such as after POST, PUT, or DELETE operations on related resources.
 *
 * These functions are essential for maintaining fresh and efficient data delivery in web applications where certain
 * responses are costly to generate and do not change frequently.
 */

import NodeCache from 'node-cache';

import loggerService from '../service/logger.service.js';

const cache = new NodeCache();

/**
 * Creates a caching middleware for Express routes that caches responses based on request URLs and methods. This function
 * allows for setting a custom duration for each cache entry. For GET requests, it attempts to retrieve a cached response and
 * serve it if available. For non-GET requests, it generates a unique cache key to store the response for future access. If a
 * response for a GET request is not found in the cache, it overrides the default res.send method to cache the new response
 * before sending it to the client. This approach enhances performance by reducing the need for repeated processing of the
 * same requests.
 *
 * @param {number} [duration=3600] - The duration in seconds for which the cache entry should remain valid.
 * @returns {Function} An Express middleware function that checks for cached data or caches new data as needed.
 * @example
 * // Usage within an Express route
 * app.get('/api/data', cacheMiddleware.create(600), (req, res) => {
 *     res.send('This is the response data');
 * });
 */
const create = (duration = 3600) => {
    return (req, res, next) => {
        let key;

        // If the requestBooks is a GET requestBooks, extract the resource name from the URL
        if (req.method === 'GET') {
            // Extract the last segment of the URL as the cache key
            const urlSegments = req.originalUrl.split('/');

            key = urlSegments[urlSegments.length - 1].split('?')[0];

            loggerService.debug(`Cache key generated for GET request: ${key}`);
        } else {
            // Create a unique cache key for non-GET requests based on route and method
            const routeName = req.route.path
                .replace(/\//g, '_')
                .replace(/:/g, '');
            key = `${routeName}_${req.method}_${req.originalUrl || req.url}`;

            loggerService.debug(
                `Cache key generated for non-GET request: ${key}`
            );
        }

        // Cache retrieval for GET requests
        if (req.method === 'GET') {
            const cachedBody = cache.get(key);
            if (cachedBody) {
                loggerService.info(
                    `Cache hit: Serving from cache for key ${key}`
                );

                return res.status(cachedBody.status).send(cachedBody.body);
            } else {
                loggerService.warn(`Cache miss: No entry found for key ${key}`);

                // Overriding response methods to cache new data
                const originalSend = res.send.bind(res);
                const originalStatus = res.status.bind(res);
                let responseStatus = 200;

                // Override the send method to cache the response
                res.status = (code) => {
                    responseStatus = code;

                    return originalStatus(code);
                };

                // Override the send method to cache the response
                res.send = (body) => {
                    if (responseStatus >= 200 && responseStatus < 300) {
                        cache.set(
                            key,
                            { body, status: responseStatus },
                            duration
                        );

                        loggerService.info(
                            `Data cached for key ${key} with status ${responseStatus}`
                        );
                    }

                    originalSend(body);
                };

                next();
            }
        } else {
            next();
        }
    };
};

/**
 * Returns a middleware function that invalidates cache entries based on the specified route name. It scans the cache for
 * any keys that start with the given route name and deletes them. This function is typically used to clear cache entries
 * following POST, PUT, DELETE, or other types of requests that modify the data related to cached responses. The
 * invalidation ensures that subsequent requests receive the most current data, preventing stale data issues.
 *
 * @param {string} routeName - The base route name used to identify which cache entries to invalidate.
 * @returns {Function} An Express middleware function that invalidates cache entries matching the specified route.
 * @example
 * // Usage within an Express route to clear cache after a data update
 * app.post('/api/data', dataController.update, cacheMiddleware.invalidate('data'), (req, res) => {
 *     res.send('Data updated successfully');
 * });
 */
const invalidate = (routeName) => {
    return (req, res, next) => {
        // Directly use the routeName as the key to invalidate
        const keys = cache.keys();

        // Loop through all the keys in the cache and delete the ones that match the routeName
        keys.forEach((key) => {
            if (key.startsWith(routeName)) {
                cache.del(key);

                loggerService.info(`Cache invalidated for key ${key}`);
            }
        });

        next();
    };
};

const cacheMiddleware = {
    create,
    invalidate,
};

export default cacheMiddleware;
