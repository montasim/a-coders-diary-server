'use strict';

/**
 * @fileoverview This file exports an asynchronous function `validateAdminRequest`
 * which validates if a request is made by an existing admin. It checks the existence
 * of an admin in the database using the `AdminModel`.
 */

import AdminModel from '../modules/api/admin/admin.model.js';

/**
 * validateAdminRequest - An asynchronous function that validates if a request is made
 * by an existing admin. It queries the database to check if an admin with the given
 * ID exists and returns a boolean indicating the result.
 *
 * @function
 * @async
 * @param {string} requestedBy - The ID of the user making the request.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the admin exists,
 * otherwise `false`.
 */
const validateAdminRequest = async (requestedBy) => {
    const requestedUserDetails = await AdminModel.exists({ _id: requestedBy });

    return !!requestedUserDetails;
};

export default validateAdminRequest;
