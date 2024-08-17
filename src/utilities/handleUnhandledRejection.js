'use strict';

/**
 * @fileoverview This file contains the handleUnhandledRejection function, which addresses
 * unhandled promise rejections within the application. It logs the rejection details and
 * initiates a graceful shutdown process to prevent any further complications. This module
 * is crucial for maintaining the application's stability and reliability, as unhandled
 * rejections can lead to unpredictable behavior and potential crashes. By ensuring these
 * are managed properly, the application avoids running in a potentially corrupted state.
 *
 * @requires module:initiateGracefulShutdown Utility to initiate a controlled shutdown of the server.
 * @requires module:service/logger.service Logger service for recording errors and operational events.
 */

import initiateGracefulShutdown from './initiateGracefulShutdown.js';
import loggerService from '../service/logger.service.js';

/**
 * Handles unhandled promise rejections by logging the error and attempting a graceful shutdown
 * of the server. This function is essential for maintaining system integrity and reliability,
 * as unhandled rejections can cause parts of the application to fail silently or behave unexpectedly.
 * It ensures that all resources are closed properly and that the server does not continue running
 * under compromised conditions.
 *
 * @async
 * @function handleUnhandledRejection
 * @param {Error} error The promise rejection error object.
 * @param {Object} server The server instance that needs to be shut down.
 * @description Manages the response to unhandled promise rejections by attempting a graceful shutdown.
 */
const handleUnhandledRejection = async (error, server) => {
    loggerService.error(
        `Unhandled Rejection: ${error instanceof Error ? error.message : error}`,
        error.stack
    );

    try {
        await initiateGracefulShutdown('Unhandled Rejection', server, error);
    } catch (shutdownError) {
        loggerService.error(
            `Failed to shutdown gracefully: ${shutdownError.message}`
        );

        process.exit(1);
    }
};

export default handleUnhandledRejection;
