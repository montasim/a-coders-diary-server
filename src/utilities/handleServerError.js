'use strict';

/**
 * @fileoverview This file contains the handleServerError function, which is responsible for
 * handling server startup errors. It logs the error and attempts a graceful shutdown of the
 * server. In case the graceful shutdown fails, it logs the shutdown error and exits the process
 * with a failure status. This module is critical for managing unexpected failures during the
 * server's startup phase and ensuring that shutdown procedures are correctly executed to prevent
 * potential resource leaks or other complications.
 *
 * @requires module:initiateGracefulShutdown Utility to initiate a graceful shutdown of the server.
 * @requires module:service/logger.service Logger service for logging error information.
 */

import initiateGracefulShutdown from './initiateGracefulShutdown.js';
import loggerService from '../service/logger.service.js';

/**
 * Handles errors that occur during the server's startup phase. It logs the initial error,
 * attempts a graceful shutdown, and handles any errors that may occur during the shutdown
 * process. If shutting down gracefully fails, it forcibly exits the process to prevent
 * the server from running in an unstable state.
 *
 * @async
 * @function handleServerError
 * @param {Error} error The error object representing the startup error.
 * @param {Object} server The server object that encountered the startup error.
 * @description Manages server errors by logging and attempting to shutdown gracefully.
 */
const handleServerError = async (error, server) => {
    loggerService.error(
        `Server startup error on port ${server.address().port}: ${error.message}`
    );

    try {
        await initiateGracefulShutdown('Startup Failure', server, error);
    } catch (shutdownError) {
        loggerService.error(
            `Error during graceful shutdown: ${shutdownError.message}`
        );

        process.exit(1);
    }
};

export default handleServerError;
