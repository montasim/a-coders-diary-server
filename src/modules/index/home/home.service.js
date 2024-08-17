'use strict';

/**
 * @fileoverview This module defines the service function for retrieving home-related data.
 * It constructs a detailed response containing API information, versioning, support details, and author information.
 * The service handles potential errors and logs them appropriately.
 */

import httpStatus from '../../../constant/httpStatus.constants.js';
import configuration from '../../../configuration/configuration.js';
import sendResponse from '../../../utilities/sendResponse.js';
import errorResponse from '../../../utilities/errorResponse.js';
import loggerService from '../../../service/logger.service.js';

/**
 * Retrieves home-related data.
 *
 * This function constructs and returns an object containing:
 * - A welcome message
 * - API version information
 * - License details
 * - Engine requirements
 * - Homepage URL
 * - Bug reporting URL
 * - Environment details
 * - Support contact information
 * - Author information
 *
 * In case of an error, it logs the error and returns an appropriate error response.
 *
 * @async
 * @function
 * @name homeService
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the home data.
 */
const homeService = async () => {
    try {
        const homeData = {
            message: 'Welcome to the API portal.',
            version: '1.0.0',
            license: 'MIT',
            description: '',
            engines: {
                node: '>=20.x',
                yarn: '>=1.22.x',
            },
            homepage: configuration.github.repository,
            bugs: `${configuration.github.repository}/issues`,
            environment: {
                current: configuration.env,
                apiVersion: configuration.version,
            },
            support: {
                email: 'montasimmamun@gmail.com',
            },
            author: {
                name: 'Mohammad Montasim -Al- Mamun Shuvo',
                email: 'montasimmamun@gmail.com',
                mobile: '+8801722815469',
                linkedin: 'https://www.linkedin.com/in/montasim',
                github: 'https://github.com/montasim',
            },
        };

        return sendResponse(
            homeData,
            'Home data fetched successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get home data: ${error}`);

        return errorResponse(
            error.message || 'Failed to get home data.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export default homeService;
