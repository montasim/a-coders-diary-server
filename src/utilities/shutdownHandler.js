'use strict';

/**
 * @fileoverview This file defines the shutdownHandler function, which is designed to handle
 * graceful shutdown of the server when it receives termination signals like SIGINT or SIGTERM.
 * The function ensures that all necessary cleanup processes, such as database disconnections,
 * are performed before shutting down the server. This module plays a critical role in
 * maintaining the integrity and consistency of the application state during shutdown,
 * preventing data loss and other issues that might arise from abrupt termination.
 *
 * @requires module:service/database.service Database service for managing database connections.
 * @requires module:initiateGracefulShutdown Utility function to facilitate a controlled shutdown.
 * @requires module:service/logger.service Logger service for logging shutdown events and errors.
 */

import DatabaseService from '../service/database.service.js';
import initiateGracefulShutdown from './initiateGracefulShutdown.js';
import loggerService from '../service/logger.service.js';

/**
 * Handles operating system signals for server shutdown, ensuring all critical services
 * like database connections are properly closed before the server shuts down. This function
 * is key in maintaining application integrity and consistency when the server is asked to
 * terminate, either by OS signals or manually by the user. It attempts to gracefully shut down
 * the server and logs any errors that occur during this process.
 *
 * @async
 * @function shutdownHandler
 * @param {string} signal The signal received that initiates the shutdown (e.g., 'SIGINT', 'SIGTERM').
 * @param {Object} server The server instance to be shut down.
 * @description Manages the graceful shutdown of the server in response to received signals.
 */
const shutdownHandler = async (signal, server) => {
    loggerService.log(`Received ${signal}.`);

    try {
        await DatabaseService.disconnect();
        await initiateGracefulShutdown(signal, server);
    } catch (shutdownError) {
        loggerService.error(
            `Error during graceful shutdown on ${signal}: ${shutdownError.message}`
        );

        process.exit(1);
    }
};

export default shutdownHandler;
