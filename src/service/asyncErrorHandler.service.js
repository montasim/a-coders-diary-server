'use strict';

/**
 * @fileoverview This module provides a higher-order function (HOF) that wraps asynchronous route handlers in an Express
 * application, aiming to streamline error handling. By encapsulating the try/catch block within this function, it allows
 * async route handlers to be written without explicitly including error handling logic. This service simplifies the
 * implementation of error handling by automatically catching any exceptions that occur during the execution of the
 * wrapped async functions and passing them to the next middleware in the stack, specifically the error-handling middleware.
 *
 * This approach not only reduces boilerplate code but also ensures that errors are consistently handled across different
 * parts of the application, improving code maintainability and reliability.
 */

/**
 * Wraps asynchronous Express route handlers to automatically catch errors and pass them to the Express error-handling
 * middleware. This function takes any async function as an argument and returns a new function that executes the
 * original function and handles any errors that are thrown. It is particularly useful for routes that perform
 * operations which might throw exceptions, such as database operations or external API calls, ensuring that these
 * errors are properly managed and do not cause unhandled promise rejections.
 *
 * @module asyncErrorHandlerService
 * @description Provides a middleware wrapper for handling errors in async route handlers.
 */
const asyncErrorHandlerServiceService = (fn) => async (req, res, next) => {
    try {
        // Await the execution of the passed-in function
        await fn(req, res, next);
    } catch (error) {
        // In case of an error, pass it to the next error handling middleware
        next(error);
    }
};

export default asyncErrorHandlerServiceService;
