'use strict';

/**
 * @fileoverview This file defines the service functions for managing permissions. These services include
 * functions for creating, retrieving, updating, and deleting permissions. The services interact with the
 * Permissions model and utilize various utilities for logging, response handling, and validation.
 * Additionally, functions for populating related fields and managing default permissions are provided.
 *//**
 * @fileoverview This file defines the service functions for managing permissions. These services include
 * functions for creating, retrieving, updating, and deleting permissions. The services interact with the
 * Permissions model and utilize various utilities for logging, response handling, and validation.
 * Additionally, functions for populating related fields and managing default permissions are provided.
 */

import PermissionsModel from './permissions.model.js';
import httpStatus from '../../../constant/httpStatus.constants.js';
import errorResponse from '../../../utilities/errorResponse.js';
import sendResponse from '../../../utilities/sendResponse.js';
import isEmptyObject from '../../../utilities/isEmptyObject.js';
import loggerService from '../../../service/logger.service.js';
import routesConstants from '../../../constant/routes.constants.js';
import generatePermissions from '../../../shared/generatePermissions.js';
import RolesModel from '../roles/roles.model.js';
import constants from '../../../constant/constants.js';
import service from '../../../shared/service.js';
import AdminActivityLoggerModel from '../admin/adminActivityLogger/adminActivityLogger.model.js';
import adminActivityLoggerConstants from '../admin/adminActivityLogger/adminActivityLogger.constants.js';

/**
 * populatePermissionFields - A helper function to populate related fields in the permission documents.
 *
 * @param {Object} query - The Mongoose query object.
 * @returns {Promise<Object>} - The query result with populated fields.
 */
const populatePermissionFields = async (query) => {
    return await query
        .populate({
            path: 'createdBy',
            select: 'name image department designation isActive',
        })
        .populate({
            path: 'updatedBy',
            select: 'name image department designation isActive',
        });
};

const permissionListParamsMapping = {};

/**
 * createPermission - Service function to create a new permission. This function checks for the existence
 * of a permission with the same name, creates the permission if it doesn't exist, and updates the admin role
 * with the new permission.
 *
 * @param {Object} requester - The user creating the permission.
 * @param {Object} newPermissionData - The data for the new permission.
 * @returns {Promise<Object>} - The created permission or an error response.
 */
const createPermission = async (requester, newPermissionData) => {
    try {
        const exists = await PermissionsModel.exists({
            name: newPermissionData.name,
        });
        if (exists) {
            return sendResponse(
                {},
                `Permission name "${newPermissionData.name}" already exists.`,
                httpStatus.BAD_REQUEST
            );
        }

        newPermissionData.createdBy = requester;

        const newPermission = await PermissionsModel.create(newPermissionData);

        // add new permission to the admin role
        const adminRoleDetails = await RolesModel.findOne({
            name: constants.defaultName.adminRole,
        }).lean();
        if (adminRoleDetails) {
            // Role exists, update it by adding the new permission
            await RolesModel.updateOne(
                { _id: adminRoleDetails._id },
                {
                    $addToSet: { permissions: newPermission._id },
                }
            );
        } else {
            // Role does not exist, create it with the new permission
            const newRole = new RolesModel({
                name: constants.defaultName.adminRole,
                permissions: [newPermission._id], // Use an array to initialize permissions
                createdBy: requester,
            });

            await newRole.save();
        }

        // Populate the necessary fields after creation
        const populatedPermission = await populatePermissionFields(
            PermissionsModel.findById(newPermission._id)
        );

        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.CREATE,
            description: `${newPermissionData.name} created successfully.`,
            details: JSON.stringify(populatedPermission),
        });

        return sendResponse(
            populatedPermission,
            'Permission created successfully.',
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to create permission: ${error}`);

        return errorResponse(
            error.message || 'Failed to create permission.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * createDefaultPermissionList - Service function to create a default list of permissions. This function
 * generates permissions from predefined routes, checks for existing permissions, and creates any missing
 * permissions.
 *
 * @param {Object} requester - The user creating the default permissions.
 * @returns {Promise<Object>} - The result of the permissions creation process, including any errors.
 */
const createDefaultPermissionList = async (requester) => {
    try {
        // Generate permissions
        const permissions = generatePermissions(routesConstants);
        const createdPermissions = [];
        const errors = [];

        // Fetch existing permissions in one call
        const existingPermissions = await PermissionsModel.find({
            name: { $in: permissions },
        })
            .lean()
            .select('name')
            .exec();

        const existingNames = new Set(existingPermissions.map((p) => p.name));

        const permissionsToCreate = permissions
            .filter((p) => !existingNames.has(p))
            .map((permissionName) => ({
                name: permissionName,
                isActive: true,
                createdBy: requester,
                updatedBy: requester, // Assuming the creator is initially also the updater
            }));

        if (permissionsToCreate.length > 0) {
            // Bulk insert new permissions
            const newPermissions =
                await PermissionsModel.insertMany(permissionsToCreate);

            // Optionally populate necessary fields after creation - this would still require individual fetches, but it's optional
            const populatedPermissions = await populatePermissionFields(
                PermissionsModel.find({
                    _id: { $in: newPermissions.map((p) => p._id) },
                })
            );

            createdPermissions.push(...populatedPermissions);
        }

        const message = `Permissions creation process completed with ${createdPermissions.length} permissions created.`;
        if (errors.length) {
            message += ` There were errors with ${errors.length} permissions.`;
        }

        return sendResponse(
            {
                createdPermissions,
                errors,
            },
            message,
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to create permissions: ${error.message}`);

        return errorResponse(
            'Failed to create permissions due to an internal server error.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * getPermissionList - Service function to retrieve a list of permissions based on provided parameters.
 * This function utilizes a shared service to handle the retrieval and mapping of parameters.
 *
 * @param {Object} requester - The user requesting the permissions list.
 * @param {Object} params - The query parameters for retrieving the permissions list.
 * @returns {Promise<Object>} - The retrieved list of permissions.
 */
const getPermissionList = async (requester, params) => {
    return service.getResourceList(
        PermissionsModel,
        populatePermissionFields,
        params,
        permissionListParamsMapping,
        'permission'
    );
};

/**
 * getPermissionById - Service function to retrieve a permission by its ID. This function utilizes a shared
 * service to handle the retrieval and population of related fields.
 *
 * @param {String} permissionId - The ID of the permission to retrieve.
 * @returns {Promise<Object>} - The retrieved permission or an error response.
 */
const getPermissionById = async (permissionId) => {
    return service.getResourceById(
        PermissionsModel,
        populatePermissionFields,
        permissionId,
        'Permission'
    );
};

/**
 * updatePermissionById - Service function to update a permission by its ID. This function checks for the
 * existence of the permission, updates it with the provided data, and logs the update action.
 *
 * @param {Object} requester - The user updating the permission.
 * @param {String} permissionId - The ID of the permission to update.
 * @param {Object} updateData - The data to update the permission with.
 * @returns {Promise<Object>} - The updated permission or an error response.
 */
const updatePermissionById = async (requester, permissionId, updateData) => {
    try {
        if (isEmptyObject(updateData)) {
            return errorResponse(
                'Please provide update data.',
                httpStatus.BAD_REQUEST
            );
        }

        updateData.updatedBy = requester;

        // Attempt to update the permission
        const updatedPermission = await PermissionsModel.findByIdAndUpdate(
            permissionId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPermission) {
            return sendResponse(
                {},
                'Permission not found.',
                httpStatus.NOT_FOUND
            );
        }

        // Optionally populate if necessary (could be omitted based on requirements)
        const populatedPermission = await populatePermissionFields(
            PermissionsModel.findById(updatedPermission._id)
        );

        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.UPDATE,
            description: `${permissionId} updated successfully.`,
            details: JSON.stringify(populatedPermission),
            affectedId: permissionId,
        });

        return sendResponse(
            populatedPermission,
            'Permission updated successfully.',
            httpStatus.OK
        );
    } catch (error) {
        // Handle specific errors, like duplicate names, here
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return sendResponse(
                {},
                `Permission name "${updateData.name}" already exists.`,
                httpStatus.BAD_REQUEST
            );
        }

        loggerService.error(`Failed to update permission: ${error}`);

        return errorResponse(
            error.message || 'Failed to update permission.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * deletePermissionList - Service function to delete a list of permissions by their IDs. This function
 * utilizes a shared service to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the permissions.
 * @param {Array<String>} permissionIds - The IDs of the permissions to delete.
 * @returns {Promise<Object>} - The result of the deletion process.
 */
const deletePermissionList = async (requester, permissionIds) => {
    return await service.deleteResourcesByList(
        requester,
        PermissionsModel,
        permissionIds,
        'permission'
    );
};

/**
 * deletePermissionById - Service function to delete a permission by its ID. This function utilizes a
 * shared service to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the permission.
 * @param {String} permissionId - The ID of the permission to delete.
 * @returns {Promise<Object>} - The result of the deletion process.
 */
const deletePermissionById = async (requester, permissionId) => {
    return service.deleteResourceById(
        requester,
        PermissionsModel,
        permissionId,
        'permission'
    );
};

/**
 * permissionsService - Object containing all the defined service functions for permissions management:
 *
 * - createPermission: Service function to create a new permission.
 * - createDefaultPermissionList: Service function to create a default list of permissions.
 * - getPermissionList: Service function to retrieve a list of permissions based on provided parameters.
 * - getPermissionById: Service function to retrieve a permission by its ID.
 * - updatePermissionById: Service function to update a permission by its ID.
 * - deletePermissionList: Service function to delete a list of permissions by their IDs.
 * - deletePermissionById: Service function to delete a permission by its ID.
 */
const permissionsService = {
    createPermission,
    createDefaultPermissionList,
    getPermissionList,
    getPermissionById,
    updatePermissionById,
    deletePermissionList,
    deletePermissionById,
};

export default permissionsService;
