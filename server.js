/**
 * @fileoverview This file is the main entry point for the server application. It initializes
 * services like the email and database services, sets up error handling for uncaught exceptions
 * and unhandled promise rejections, and starts the server based on the configuration. It also
 * handles server shutdown gracefully by responding to system termination signals.
 *
 * @requires module:app The main Express application module.
 * @requires module:configuration/configuration Application-specific configuration details.
 * @requires module:service/email.service Email service to handle email operations.
 * @requires module:service/database.service Database service for database connection and operations.
 * @requires module:utilities/handleServerError Utility to handle server-related errors.
 * @requires module:utilities/shutdownHandler Utility to handle graceful shutdown of the server.
 * @requires module:utilities/handleUncaughtException Utility to handle uncaught exception errors.
 * @requires module:utilities/handleUnhandledRejection Utility to handle unhandled promise rejections.
 * @requires module:service/logger.service Logger service for logging information and errors.
 */
import app from './src/app.js';

import configuration from './src/configuration/configuration.js';
import EmailService from './src/service/email.service.js';
import DatabaseService from './src/service/database.service.js';
import handleServerError from './src/utilities/handleServerError.js';
import shutdownHandler from './src/utilities/shutdownHandler.js';
import handleUncaughtException from './src/utilities/handleUncaughtException.js';
import handleUnhandledRejection from './src/utilities/handleUnhandledRejection.js';
import loggerService from './src/service/logger.service.js';

/**
 * Starts the server by connecting to necessary services like Email and Database,
 * then listens on the configured port. It also sets up handlers for server errors,
 * uncaught exceptions, unhandled promise rejections, and OS signals for shutdown.
 * This setup ensures that the server runs smoothly and terminates gracefully under various conditions.
 *
 * @async
 * @function startServer
 * @description Initializes and starts the server with proper error handling and service setup.
 */
const startServer = async () => {
    try {
        await EmailService.connect();
        await DatabaseService.connect();

        // Uppercase the first letter of the environment
        const envCapitalized =
            configuration.env.charAt(0).toUpperCase() +
            configuration.env.slice(1);

        const server = app.listen(configuration.port, () => {
            loggerService.info(
                `${envCapitalized} server started on port ${configuration.port}`
            );
        });

        // Server Startup Errors - Such as port in use, permissions issues, etc.
        server.on('error', (error) => handleServerError(error, server));

        // Uncaught Exceptions - These are errors that were not caught and handled within your code.
        process.on('uncaughtException', (error) =>
            handleUncaughtException(error, server)
        );

        // Unhandled Promise Rejections - Promises that fail without a .catch() handler.
        process.on('unhandledRejection', (error) =>
            handleUnhandledRejection(error, server)
        );

        // Process Signals - SIGINT and SIGTERM, which are typical termination signals sent by operating systems or manually by users.
        process.on('SIGINT', () => shutdownHandler('SIGINT', server));
        process.on('SIGTERM', () => shutdownHandler('SIGTERM', server));
    } catch (error) {
        loggerService.error('Failed to start the server:', error);

        process.exit(1); // Exit the process with failure
    }
};

startServer();
