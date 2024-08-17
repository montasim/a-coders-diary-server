'use strict';

/**
 * @fileoverview This file exports a higher-order function `asyncErrorHandlerService`
 * which is designed to handle errors in asynchronous middleware functions in Express.
 * It ensures that any errors occurring within the provided asynchronous function
 * are caught and passed to the next error handling middleware, maintaining the
 * stability and reliability of the application.
 */

/**
 * asyncErrorHandlerService - A higher-order function that wraps an asynchronous
 * middleware function to handle any potential errors. If an error is thrown
 * within the wrapped function, it catches the error and passes it to the next
 * middleware in the chain, which is typically an error handler.
 *
 * @function
 * @param {Function} fn - The asynchronous middleware function to be wrapped.
 * @returns {Function} - A new function that wraps the provided middleware function
 *                       with error handling logic.
 */
const asyncErrorHandlerService = (fn) => async (req, res, next) => {
    try {
        // Await the execution of the passed-in function
        await fn(req, res, next);
    } catch (error) {
        // In case of an error, pass it to the next error handling middleware
        next(error);
    }
};

export default asyncErrorHandlerService;
