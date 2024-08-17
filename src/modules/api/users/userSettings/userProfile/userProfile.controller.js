'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to user profiles.
 * It leverages the shared controller utilities to retrieve and update user profile details.
 *
 * The `userProfileController` object includes methods to:
 * - Retrieve the profile details for the requesting user.
 * - Update the profile details for the requesting user.
 */

import userProfileService from './getProfile.service.js';
import controller from '../../../../../shared/controller.js';

const userProfileController = {
    /**
     * Retrieves the profile details for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to fetch the profile details for the authenticated requester. It delegates the actual service logic
     * to the `userProfileService` and specifies the `getProfile` method.
     *
     * @function
     * @name userProfileController.getProfile
     * @param {Object} request - The request object containing the requester's details.
     * @param {Object} response - The response object used to send back the profile details.
     *
     * @returns {Promise<void>} - A promise that resolves with the profile details for the requester.
     */
    getProfile: controller.updateByRequester(userProfileService, 'getProfile'),

    /**
     * Updates the profile details for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to update the profile details for the authenticated requester. It delegates the actual service logic
     * to the `userProfileService` and specifies the `updateProfile` method.
     *
     * @function
     * @name userProfileController.updateProfile
     * @param {Object} request - The request object containing the requester's details and the new profile details.
     * @param {Object} response - The response object used to send back the updated profile details.
     *
     * @returns {Promise<void>} - A promise that resolves with the updated profile details for the requester.
     */
    updateProfile: controller.updateByRequester(
        userProfileService,
        'updateProfile'
    ),
};

export default userProfileController;
