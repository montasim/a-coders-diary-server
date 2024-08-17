'use strict';

/**
 * @fileoverview This module configures and provides an email service for an Express application using the nodemailer
 * library. It includes functionalities to connect to an SMTP server and send emails. The service is designed to handle
 * email operations robustly, with built-in connection verification and retry mechanisms. It ensures that the application
 * can send emails reliably by maintaining a persistent connection with the email server, and automatically reconnecting
 * and retrying failed operations where necessary.
 *
 * The service initializes a transporter object with SMTP configuration details from the application's configuration module,
 * verifies the connection, and logs the status. If the initial connection fails, the service attempts to reconnect
 * periodically. For sending emails, the service checks if the transporter is initialized and, if not, throws an error.
 * It handles email sending errors by attempting to reconnect to the SMTP server and retrying the email transmission.
 *
 * Key components include:
 * - `connect`: Establishes and verifies a connection to the SMTP server.
 * - `sendEmail`: Sends an email using the established SMTP connection and handles retries if the send operation initially fails.
 *
 * This modular approach to handling email operations decouples the email functionality from the rest of the application,
 * promoting separation of concerns and making the email service easy to manage and scale.
 */

import nodemailer from 'nodemailer';

import configuration from '../configuration/configuration.js';
import loggerService from './logger.service.js';

let transporter;
let isInitialized = false; // Initialized with a default value

/**
 * Establishes and verifies a connection to the SMTP server configured in the application settings. This function initializes
 * the nodemailer transporter with SMTP credentials and then attempts to verify the connection by interacting with the server.
 * If the connection is successful, it logs the connection status and sets the service as initialized. If the connection fails,
 * it logs the error and attempts to reconnect after a delay. This method ensures that the email service is ready and capable
 * of sending emails before any send operations are attempted.
 *
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established and verified, or
 *                          it continuously retries until a connection is established.
 * @example
 * try {
 *     await EmailService.connect();
 *     console.log('Email service connected and verified');
 * } catch (error) {
 *     console.error('Email service failed to connect:', error);
 * }
 */
const connect = async () => {
    try {
        transporter = nodemailer.createTransport({
            host: configuration.email.smtp.host,
            port: configuration.email.smtp.port,
            secure: false, // Note: secure should typically be true if using port 465
            auth: {
                user: configuration.email.smtp.auth.user,
                pass: configuration.email.smtp.auth.pass,
            },
        });

        await transporter.verify();

        loggerService.info(
            `Email service is now connected to SMTP host ${transporter.options.host} on port ${transporter.options.port}, Secure ${transporter.options.secure}`
        );

        isInitialized = true;
    } catch (error) {
        loggerService.error(`Email service connection error: ${error.message}`);
        loggerService.info(
            'Attempting to reconnect email service in 2 seconds...'
        );

        setTimeout(connect, 2000); // Retry connection after 2 seconds
    }
};

/**
 * Sends an email using the previously verified SMTP transporter. This function first checks if the email service is initialized.
 * If not, it throws an error to prevent email sending attempts. It constructs the email content and dispatches it using the
 * transporter. If the email is successfully sent, it logs the success. If there's a failure in sending the email, it logs the
 * error, attempts to reconnect to the SMTP server, and retries the send operation. This method ensures robust handling of email
 * operations, providing resilience against transient network or server issues.
 *
 * @async
 * @function sendEmail
 * @param {string} emailAddress The recipient's email address.
 * @param {string} subject The subject line of the email.
 * @param {string} html The HTML body content of the email.
 * @returns {Promise<void>} A promise that resolves if the email is successfully sent after possibly reconnecting,
 *                          or rejects with an error if all attempts fail.
 * @example
 * try {
 *     await EmailService.sendEmail('test@example.com', 'Greetings', '<h1>Hello, World!</h1>');
 *     console.log('Email sent successfully');
 * } catch (error) {
 *     console.error('Failed to send email:', error);
 * }
 */
const sendEmail = async (emailAddress, subject, html) => {
    if (!isInitialized) {
        throw new Error(
            'Cannot send email: email transporter is not initialized.'
        );
    }

    try {
        const info = await transporter.sendMail({
            from: configuration.email.smtp.auth.user,
            to: emailAddress,
            subject,
            html,
        });

        loggerService.info(
            `Email sent successfully to ${emailAddress}. Message ID: ${info.messageId}`
        );
    } catch (error) {
        loggerService.error(`Email send failure: ${error.message}`);
        loggerService.info(
            'Reconnecting email service to resolve send failure...'
        );

        await connect(); // Reconnect and then retry

        const retryInfo = await transporter.sendMail({
            from: configuration.email.smtp.auth.user,
            to: emailAddress,
            subject,
            html,
        });

        loggerService.info(
            `Email successfully sent after reconnection. Message ID: ${retryInfo.messageId}`
        );
    }
};

const EmailService = {
    connect,
    sendEmail,
};

export default EmailService;
