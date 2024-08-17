'use strict';

/**
 * @fileoverview This module provides a service for validating permissions against stored permission records in the database.
 * It includes a function to verify if a set of given permission IDs are all valid by checking their existence in the permissions collection.
 * This is crucial for authorization purposes where permissions need to be verified before granting access to resources or actions within the application.
 */

import PermissionModel from '../modules/api/permissions/permissions.model.js';

/**
 * @function validatePermissions
 * Checks if all the specified permission IDs exist in the database. This function is essential for validating permissions as part of access control mechanisms.
 * It retrieves permission documents from the database based on the provided IDs and compares the count of found permissions with the count of requested IDs.
 *
 * @param {Array} permissions - An array of permission IDs to validate.
 * @returns {Promise<Boolean>} Returns true if all provided permission IDs are valid and exist in the database; otherwise, returns false.
 */
const validatePermissions = async (permissions) => {
    const validPermissions = await PermissionModel.find({
        _id: { $in: permissions },
    }).select('_id');

    return validPermissions.length === permissions.length;
};

export default validatePermissions;
