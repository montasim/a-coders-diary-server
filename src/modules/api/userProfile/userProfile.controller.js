'use strict';

/**
 * @fileoverview This file defines the controller functions for managing user profiles. These functions
 * handle the retrieval of user profiles by interacting with the userProfile service. Each function utilizes
 * a shared controller to streamline the handling of the request and response.
 */

import userProfileService from './userProfile.service.js';
import controller from '../../../shared/controller.js';

/**
 * userProfileController - Object containing the defined controller function for user profile management:
 *
 * - getProfile: Controller function to handle the retrieval of a user profile by username.
 */
const userProfileController = {
    /**
     * getProfile - Controller function to handle the retrieval of a user profile by username. This function
     * delegates the retrieval logic to the userProfile service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the username parameter.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    getProfile: controller.getById(
        userProfileService,
        'getProfile',
        'username'
    ),
};

export default userProfileController;
