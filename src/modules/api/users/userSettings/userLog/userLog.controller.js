'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to user logs.
 * It leverages the shared controller utilities to retrieve various types of user logs including activity, security, and account logs.
 *
 * The `userLogController` object includes methods to:
 * - Retrieve the activity log for the requesting user.
 * - Retrieve the security log for the requesting user.
 * - Retrieve the account log for the requesting user.
 */

import userLogService from './userLog.service.js';
import controller from '../../../../../shared/controller.js';

const userLogController = {
    /**
     * Retrieves the activity log for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to fetch the activity log for the authenticated requester. It delegates the actual service logic
     * to the `userLogService` and specifies the `getActivityLog` method.
     *
     * @function
     * @name userLogController.getActivityLog
     * @param {Object} request - The request object containing the requester's details.
     * @param {Object} response - The response object used to send back the activity log.
     *
     * @returns {Promise<void>} - A promise that resolves with the activity log for the requester.
     */
    getActivityLog: controller.updateByRequester(
        userLogService,
        'getActivityLog'
    ),

    /**
     * Retrieves the security log for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to fetch the security log for the authenticated requester. It delegates the actual service logic
     * to the `userLogService` and specifies the `getSecurityLog` method.
     *
     * @function
     * @name userLogController.getSecurityLog
     * @param {Object} request - The request object containing the requester's details.
     * @param {Object} response - The response object used to send back the security log.
     *
     * @returns {Promise<void>} - A promise that resolves with the security log for the requester.
     */
    getSecurityLog: controller.updateByRequester(
        userLogService,
        'getSecurityLog'
    ),

    /**
     * Retrieves the account log for the requesting user.
     *
     * This function uses the `updateByRequester` method from the shared controller utilities
     * to fetch the account log for the authenticated requester. It delegates the actual service logic
     * to the `userLogService` and specifies the `getAccountLog` method.
     *
     * @function
     * @name userLogController.getAccountLog
     * @param {Object} request - The request object containing the requester's details.
     * @param {Object} response - The response object used to send back the account log.
     *
     * @returns {Promise<void>} - A promise that resolves with the account log for the requester.
     */
    getAccountLog: controller.updateByRequester(
        userLogService,
        'getAccountLog'
    ),
};

export default userLogController;
