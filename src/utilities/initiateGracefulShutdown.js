'use strict';

/**
 * @fileoverview This file exports an asynchronous function `initiateGracefulShutdown`
 * which is responsible for gracefully shutting down the server. The function logs the reason
 * for the shutdown, prepares and sends a critical issue email to the admin, and attempts to
 * close the server within a specified timeout period. If the server fails to close within
 * the timeout, it forces the shutdown.
 */

import EmailService from '../service/email.service.js';
import configuration from '../configuration/configuration.js';
import prepareEmailContent from '../shared/prepareEmailContent.js';
import prepareEmail from '../shared/prepareEmail.js';
import loggerService from '../service/logger.service.js';

/**
 * initiateGracefulShutdown - An asynchronous function that initiates a graceful shutdown of
 * the server. It logs the reason for the shutdown, prepares an email with the error details
 * and sends it to the admin, and attempts to close the server within a 30-second timeout.
 * If the server fails to close within the timeout, it forces the shutdown.
 *
 * @function
 * @async
 * @param {string} reason - The reason for the shutdown.
 * @param {Object} server - The server instance to be shut down.
 * @param {Error} error - The error object containing details about the issue that caused the shutdown.
 * @returns {Promise<void>} - A promise that resolves when the shutdown process is complete.
 */
const initiateGracefulShutdown = async (reason, server, error) => {
    loggerService.log(`Shutting down gracefully due to ${reason}.`);

    const emailData = {};

    emailData.reason = reason;
    emailData.errorCode = error.code;
    emailData.component = error.syscall;
    emailData.path = error.path;
    emailData.address = error.address;
    emailData.port = error.port;
    emailData.timeDetected = new Date().toDateString();

    const subject = 'System Error - Critical Issue Detected';
    const {
        pageTitle,
        preheaderText,
        heroSection,
        mainSection,
        footerContent,
    } = prepareEmailContent(subject, emailData);

    await EmailService.sendEmail(
        configuration.admin.email,
        subject,
        prepareEmail(
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent
        )
    );

    const shutdownTimeout = setTimeout(() => {
        loggerService.error('Shutdown timed out, forcing shutdown.');

        process.exit(1);
    }, 30000); // 30 seconds timeout

    try {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                clearTimeout(shutdownTimeout);

                if (error) {
                    loggerService.error(
                        `Failed to close server due to: ${error.message}`
                    );

                    reject(error);
                } else {
                    loggerService.log('Server successfully closed.');

                    resolve();
                }
            });
        });
    } catch (error) {
        throw new Error(`Shutdown failed due to: ${error.message}`);
    }
};

export default initiateGracefulShutdown;
