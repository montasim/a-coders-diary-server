'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to user accounts.
 * It leverages the shared controller utilities to perform actions on user accounts.
 *
 * The `userAccountController` object includes a method to:
 * - Delete a user account.
 */

import userAccountService from './userAccount.service.js';
import controller from '../../../../../shared/controller.js';

/**
 * Deletes a user account.
 *
 * This function uses the `create` method from the shared controller utilities
 * to handle the deletion of a user account. It delegates the actual service logic
 * to the `userAccountService` and specifies the `deleteAccount` method.
 *
 * @function
 * @name userAccountController.deleteAccount
 * @param {Object} request - The request object containing the details for deleting the user account.
 * @param {Object} response - The response object used to send back the confirmation of the account deletion.
 *
 * @returns {Promise<void>} - A promise that resolves with the confirmation of the account deletion.
 */
const userAccountController = {
    deleteAccount: controller.create(userAccountService, 'deleteAccount'),
};

export default userAccountController;
