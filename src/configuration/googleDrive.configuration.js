'use strict';

/**
 * @fileoverview This module sets up and configures the authentication mechanism for Google Drive API
 * using JSON Web Tokens (JWT). It uses the @googleapis/drive package to interact with Google Drive,
 * initializing a JWT client with credentials and required scopes based on the application's configuration.
 * This setup allows the application to securely access and manipulate files on Google Drive according to the
 * defined scopes. Handling proper authentication is crucial for enabling features that rely on Google Drive
 * for file storage and management.
 *
 * @requires module:@googleapis/drive Google's official library for interacting with Google Drive.
 * @requires module:configuration/configuration Configuration module that contains Google Drive API keys and scopes.
 */

import google from '@googleapis/drive';

import configuration from '../configuration/configuration.js';

/**
 * Asynchronously configures and returns a JWT client for Google Drive, authorized with the necessary
 * credentials and scope. This client can then be used throughout the application to interact with Google Drive,
 * ensuring that all interactions are authenticated and authorized according to the configured access level.
 * Properly handling this authentication process is vital for the integrity and security of the file operations
 * the application performs on Google Drive.
 *
 * @module googleDriveConfiguration
 * @async
 * @function
 * @returns {Promise<Object>} An authorized JWT client for Google Drive or an error object if authentication fails.
 * @description Configures and authenticates a JWT client for interacting with Google Drive API.
 */
const googleDriveConfiguration = async () => {
    try {
        // Define the scope of access required by the application.
        const SCOPE = [configuration.googleDrive.scope];
        const private_key = Buffer.from(
            configuration.googleDrive.privateKey,
            'base64'
        ).toString('utf-8');

        // Initialize a JWT client for authentication with Google Drive.
        const jwtClient = new google.auth.JWT(
            configuration.googleDrive.client,
            null,
            private_key,
            SCOPE
        );

        // Authorize the JWT client.
        await jwtClient.authorize();

        // Return the authorized JWT client.
        return jwtClient;
    } catch (error) {
        return error;
    }
};

export default googleDriveConfiguration;
