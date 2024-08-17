'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to user appearance settings.
 * It leverages the shared controller utilities to retrieve and update user appearance settings.
 *
 * The `userAppearanceController` object includes methods to:
 * - Retrieve the appearance settings for the requesting user.
 * - Update the appearance settings for the requesting user.
 */

import userAppearanceService from './userAppearance.service.js';
import controller from '../../../../../shared/controller.js';

const userAppearanceController = {
    /**
     * Retrieves the appearance settings for the requesting user.
     *
     * This function uses the `getByRequester` method from the shared controller utilities
     * to fetch the appearance settings for the authenticated requester.
     * It delegates the actual service logic to the `userAppearanceService` and specifies the `getAppearance` method.
     *
     * @function
     * @name userAppearanceController.getAppearance
     * @param {Object} request - The request object containing the requester's details.
     * @param {Object} response - The response object used to send back the appearance settings.
     *
     * @returns {Promise<void>} - A promise that resolves with the appearance settings for the requester.
     */
    getAppearance: controller.getByRequester(
        userAppearanceService,
        'getAppearance'
    ),

    /**
     * Updates the appearance settings for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to update the appearance settings for the authenticated requester.
     * It delegates the actual service logic to the `userAppearanceService` and specifies the `updateAppearance` method.
     *
     * @function
     * @name userAppearanceController.updateAppearance
     * @param {Object} request - The request object containing the requester's details and the new appearance settings.
     * @param {Object} response - The response object used to send back the updated appearance settings.
     *
     * @returns {Promise<void>} - A promise that resolves with the updated appearance settings for the requester.
     */
    updateAppearance: controller.updateByRequester(
        userAppearanceService,
        'updateAppearance'
    ),
};

export default userAppearanceController;
