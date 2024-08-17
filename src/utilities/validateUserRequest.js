'use strict';

/**
 * @fileoverview This file exports an asynchronous function `validateUserRequest` which
 * checks if a user exists in the database based on the provided user ID. The function
 * queries the `UsersModel` to verify the existence of the user and returns a boolean result.
 */

import UsersModel from '../modules/api/users/users.model.js';

/**
 * validateUserRequest - An asynchronous function that validates if a user exists in the database
 * based on the provided user ID. It queries the `UsersModel` to check if a user with the given
 * ID exists and returns a boolean indicating the result.
 *
 * @function
 * @async
 * @param {string} requestedBy - The ID of the user to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the user exists, otherwise `false`.
 */
const validateUserRequest = async (requestedBy) => {
    const requestedUserDetails = await UsersModel.exists({ _id: requestedBy });

    return !!requestedUserDetails;
};

export default validateUserRequest;
