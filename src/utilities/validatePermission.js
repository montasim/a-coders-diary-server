'use strict';

/**
 * @fileoverview This file exports an asynchronous function `validatePermission` which validates
 * if a specific role has a required permission. It queries the roles and permissions models
 * to check if the role possesses the necessary permission and logs the process at various stages.
 */

import PermissionsModel from '../modules/api/permissions/permissions.model.js';
import loggerService from '../service/logger.service.js';
import RolesModel from '../modules/api/roles/roles.model.js';

/**
 * validatePermission - An asynchronous function that validates if a specific role has a required permission.
 * It retrieves the role and its associated permissions from the database, checks if the required permission exists,
 * and verifies if the role includes the required permission. The function logs the process and results.
 *
 * @function
 * @async
 * @param {string} designation - The ID of the role to be validated.
 * @param {string} requiredPermission - The name of the required permission to validate.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the role has the required permission, otherwise `false`.
 */
const validatePermission = async (designation, requiredPermission) => {
    try {
        loggerService.info(`Validating permission for role: ${designation}`);

        // Asynchronously find the role by ID and populate the permissions details
        const roleWithPermissions = await RolesModel.findById(
            designation,
            'permissions'
        )
            .populate({
                path: 'permissions',
                select: 'name -_id',
            })
            .lean();

        if (!roleWithPermissions || !roleWithPermissions.permissions) {
            loggerService.warn(`No permissions found for role: ${designation}`);

            return false;
        }

        // Extract only the names of the permissions from the populated documents
        const availablePermissionNames = roleWithPermissions.permissions.map(
            (perm) => perm.name
        );
        loggerService.info(
            `Permissions available for role ${designation}: ${availablePermissionNames.join(', ')}`
        );

        // Get the requiredPermission from the PermissionsModel asynchronously
        const validateRequiredPermission = await PermissionsModel.exists({
            name: requiredPermission,
        });

        // If the requiredPermission does not exist in the PermissionsModel, return false
        if (!validateRequiredPermission) {
            loggerService.warn(
                `Required permission not found: ${requiredPermission}`
            );

            return false;
        }

        // Check if the requiredPermission is in the availablePermissionNames
        const hasPermission =
            availablePermissionNames.includes(requiredPermission);
        loggerService.info(
            `Permission ${requiredPermission} for role ${designation} validation result: ${hasPermission}`
        );
        return hasPermission;
    } catch (error) {
        loggerService.error('Error checking permissions:', error);

        return false;
    }
};

export default validatePermission;
