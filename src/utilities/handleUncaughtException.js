'use strict';

/**
 * @fileoverview This file includes the handleUncaughtException function, which is tasked with
 * managing uncaught exceptions in the application. It logs the error details and attempts a
 * graceful shutdown of the server to prevent any further issues. This function is crucial for
 * ensuring that the server does not continue to operate in an unstable or unpredictable state
 * after an uncaught exception occurs. It helps maintain the robustness and reliability of the
 * application by ensuring that errors are handled and logged appropriately, and that the
 * application shuts down cleanly if recovery is not feasible.
 *
 * @requires module:initiateGracefulShutdown Utility function to facilitate a controlled shutdown.
 * @requires module:service/logger.service Logger service for logging error information and shutdown process.
 */

import initiateGracefulShutdown from './initiateGracefulShutdown.js';
import loggerService from '../service/logger.service.js';

/**
 * Handles uncaught exceptions by logging the exception details and attempting to shut down the
 * server gracefully. This is vital for preventing the server from running in a compromised state,
 * which could lead to data corruption or other system failures. The function logs the error,
 * including its stack trace, and tries to close all resources properly before terminating the process.
 *
 * @async
 * @function handleUncaughtException
 * @param {Error} error The uncaught exception error object.
 * @param {Object} server The server instance where the uncaught exception occurred.
 * @description Manages the response to uncaught exceptions by attempting a graceful shutdown of the server.
 */
const handleUncaughtException = async (error, server) => {
    loggerService.error(`Uncaught Exception: ${error.message}`, error.stack);

    try {
        await initiateGracefulShutdown('Uncaught Exception', server, error);
    } catch (shutdownError) {
        loggerService.error(
            `Failed to shutdown gracefully: ${shutdownError.message}`
        );

        process.exit(1);
    }
};

export default handleUncaughtException;
