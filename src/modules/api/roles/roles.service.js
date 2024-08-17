'use strict';

/**
 * @fileoverview This file defines the service functions for managing roles. These services include
 * functions for creating, retrieving, updating, and deleting roles. The services interact with the
 * Roles model and utilize various utilities for logging, response handling, and validation.
 * Additionally, functions for populating related fields and managing roles lists are provided.
 */

import validatePermissions from '../../../shared/validatePermissions.js';
import RolesModel from './roles.model.js';
import httpStatus from '../../../constant/httpStatus.constants.js';
import errorResponse from '../../../utilities/errorResponse.js';
import sendResponse from '../../../utilities/sendResponse.js';
import isEmptyObject from '../../../utilities/isEmptyObject.js';
import loggerService from '../../../service/logger.service.js';
import PermissionsModel from '../permissions/permissions.model.js';
import constants from '../../../constant/constants.js';
import AdminActivityLoggerModel from '../admin/adminActivityLogger/adminActivityLogger.model.js';
import adminActivityLoggerConstants from '../admin/adminActivityLogger/adminActivityLogger.constants.js';
import service from '../../../shared/service.js';

/**
 * populateRoleFields - A helper function to populate related fields in the role documents.
 *
 * @param {Object} query - The Mongoose query object.
 * @returns {Promise<Object>} - The query result with populated fields.
 */
const populateRoleFields = async (query) => {
    return await query
        .populate({
            path: 'permissions',
            populate: [
                {
                    path: 'createdBy',
                    select: 'name image department designation isActive',
                },
                {
                    path: 'updatedBy',
                    select: 'name image department designation isActive',
                },
            ],
        })
        .populate({
            path: 'createdBy',
            select: 'name image department designation isActive',
        })
        .populate({
            path: 'updatedBy',
            select: 'name image department designation isActive',
        });
};

/**
 * createRole - Service function to create a new role. This function validates the provided permissions,
 * sets the createdBy field, and creates the role. It also logs the creation action and populates the
 * necessary fields upon creation.
 *
 * @param {Object} requester - The user creating the role.
 * @param {Object} newRoleData - The data for the new role.
 * @returns {Promise<Object>} - The created role or an error response.
 */
const createRole = async (requester, newRoleData) => {
    try {
        loggerService.info('Starting role creation process.');

        // Validate permissions in the role
        loggerService.debug('Validating the permissions of the new role.');
        const arePermissionsValid = await validatePermissions(
            newRoleData.permissions
        );
        if (!arePermissionsValid) {
            loggerService.warn('Validation of permissions failed.');
            return errorResponse(
                'Invalid permissions provided.',
                httpStatus.BAD_REQUEST
            );
        }

        // Set createdBy field
        newRoleData.createdBy = requester;

        loggerService.debug(`Set createdBy to requester: ${requester}`);

        // Attempt to create the role, checking for existing role in the same operation if possible
        loggerService.debug('Attempting to create the role.');
        const newRole = await RolesModel.create(newRoleData).catch((err) => {
            if (err.code === 11000) {
                // MongoDB duplicate key error on 'name'
                loggerService.error(
                    `Duplicate role name error: ${newRoleData.name}`
                );
                return errorResponse(
                    `Role name "${newRoleData.name}" already exists.`,
                    httpStatus.BAD_REQUEST
                );
            }

            loggerService.error('Error during role creation:', err);
            throw err;
        });

        loggerService.info(`Role created successfully: ${newRole}`);

        // Populate fields immediately upon creation if supported
        loggerService.debug('Populating role fields post-creation.');
        const populatedRole = await populateRoleFields(
            RolesModel.findById(newRole._id)
        );

        // Log the creation action
        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.CREATE,
            description: 'Created a new role',
            details: JSON.stringify(populatedRole),
            affectedId: newRole._id,
        });

        // Successful response
        return sendResponse(
            populatedRole,
            'Role created successfully.',
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to create role: ${error}`);

        return errorResponse(
            error.message || 'Failed to create role.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * createDefaultRole - Service function to create or update the default role with all permissions.
 * This function fetches all permissions, upserts the default role, logs the action, and handles the response.
 *
 * @param {Object} requester - The user creating or updating the default role.
 * @returns {Promise<Object>} - The created or updated default role or an error response.
 */
const createDefaultRole = async (requester) => {
    try {
        // Fetch all permissions IDs
        const allPermissions = await PermissionsModel.find({}, '_id'); // More efficient field selection
        const permissionsIds = allPermissions.map(
            (permission) => permission._id
        );

        // Upsert operation to either update the existing role or create a new one
        const updateResult = await RolesModel.updateOne(
            { name: constants.defaultName.adminRole },
            { $set: { permissions: permissionsIds, createdBy: requester } },
            { upsert: true, new: true } // Ensures that document is returned if it's an update
        );

        // Find the role to populate necessary fields
        const roleDetails = await populateRoleFields(
            RolesModel.findById(updateResult.upsertedId || updateResult._id)
        );

        // Log the creation action; this could potentially be made asynchronous if it blocks critical processing
        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.CREATE,
            description: 'Created default role',
            details: JSON.stringify(roleDetails),
            affectedId: updateResult.upsertedId || updateResult._id,
        });

        // Handling the response message based on the operation result
        const message = updateResult.upsertedCount
            ? 'Role created successfully.'
            : 'Role updated successfully.';

        return sendResponse(
            roleDetails,
            message,
            updateResult.upsertedCount ? httpStatus.CREATED : httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to create or update role: ${error}`);

        return errorResponse(
            error.message || 'Failed to create or update role.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * getRoleList - Service function to retrieve a list of roles based on provided parameters.
 * This function builds the query, fetches the roles, logs the action, and returns the paginated result.
 *
 * @param {Object} requester - The user requesting the role list.
 * @param {Object} params - The query parameters for retrieving the roles list.
 * @returns {Promise<Object>} - The retrieved list of roles or an error response.
 */
const getRoleList = async (requester, params) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = '-createdAt',
            name,
            createdBy,
            updatedBy,
            createdAt,
            updatedAt,
        } = params;
        const query = {
            ...(name && { name: new RegExp(name, 'i') }),
            ...(createdBy && { createdBy }),
            ...(updatedBy && { updatedBy }),
            ...(createdAt && { createdAt }),
            ...(updatedAt && { updatedAt }),
        };

        const totalRoles = await RolesModel.countDocuments(query);
        const totalPages = Math.ceil(totalRoles / limit);
        const roles = await populateRoleFields(
            RolesModel.find(query)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit)
        );

        // Log the fetched action; this could potentially be made asynchronous if it blocks critical processing
        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.FETCH,
            description: 'Fetched role list',
            details: JSON.stringify(roles),
        });

        if (!roles.length) {
            return sendResponse({}, 'No roles found.', httpStatus.NOT_FOUND);
        }

        return sendResponse(
            {
                roles,
                totalRoles,
                totalPages,
                currentPage: page,
                pageSize: limit,
                sort,
            },
            `${roles.length} roles fetched successfully.`,
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get roles: ${error}`);

        return errorResponse(
            error.message || 'Failed to get roles.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * getRoleById - Service function to retrieve a role by its ID. This function fetches the role,
 * populates the necessary fields, logs the action, and returns the role.
 *
 * @param {Object} requester - The user requesting the role.
 * @param {String} roleId - The ID of the role to retrieve.
 * @returns {Promise<Object>} - The retrieved role or an error response.
 */
const getRoleById = async (requester, roleId) => {
    try {
        const resource = await populateRoleFields(RolesModel.findById(roleId));
        if (!resource) {
            return errorResponse(`Role not found.`, httpStatus.NOT_FOUND);
        }

        // Log the fetched action; this could potentially be made asynchronous if it blocks critical processing
        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.FETCH,
            description: 'Fetched role list',
            details: JSON.stringify(resource),
        });

        return sendResponse(
            resource,
            `Role fetched successfully.`,
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get role: ${error}`);

        return errorResponse(
            error.message || 'Failed to get role.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * updateRoleById - Service function to update a role by its ID. This function validates the update data,
 * sets the updatedBy field, updates the role, logs the action, and returns the updated role.
 *
 * @param {Object} requester - The user updating the role.
 * @param {String} roleId - The ID of the role to update.
 * @param {Object} updateData - The data to update the role with.
 * @returns {Promise<Object>} - The updated role or an error response.
 */
const updateRoleById = async (requester, roleId, updateData) => {
    try {
        if (isEmptyObject(updateData)) {
            return errorResponse(
                'Please provide update data.',
                httpStatus.BAD_REQUEST
            );
        }

        updateData.updatedBy = requester;

        // Attempt to update the role
        const updatedRole = await RolesModel.findByIdAndUpdate(
            roleId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return sendResponse({}, 'Role not found.', httpStatus.NOT_FOUND);
        }

        // Optionally populate if necessary (could be omitted based on requirements)
        const populatedRole = await populateRoleFields(
            RolesModel.findById(updatedRole._id)
        );

        // Log the update action
        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.UPDATE,
            description: 'Role updated',
            details: JSON.stringify(populatedRole),
            affectedId: updatedRole._id,
        });

        return sendResponse(
            populatedRole,
            'Role updated successfully.',
            httpStatus.OK
        );
    } catch (error) {
        // Handle specific errors, like duplicate names, here
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return sendResponse(
                {},
                `Role name "${updateData.name}" already exists.`,
                httpStatus.BAD_REQUEST
            );
        }

        loggerService.error(`Failed to update role: ${error}`);

        return errorResponse(
            error.message || 'Failed to update role.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * deleteRoleByList - Service function to delete a list of roles by their IDs. This function utilizes a
 * shared service to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the roles.
 * @param {Array<String>} roleIds - The IDs of the roles to delete.
 * @returns {Promise<Object>} - The result of the deletion process or an error response.
 */
const deleteRoleByList = async (requester, roleIds) => {
    return await service.deleteResourcesByList(
        requester,
        RolesModel,
        roleIds,
        'role'
    );
};

/**
 * deleteRoleById - Service function to delete a role by its ID. This function utilizes a shared service
 * to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the role.
 * @param {String} roleId - The ID of the role to delete.
 * @returns {Promise<Object>} - The result of the deletion process or an error response.
 */
const deleteRoleById = async (requester, roleId) => {
    return service.deleteResourceById(requester, RolesModel, roleId, 'role');
};

/**
 * rolesService - Object containing all the defined service functions for roles management:
 *
 * - createRole: Service function to create a new role.
 * - createDefaultRole: Service function to create or update the default role with all permissions.
 * - getRoleList: Service function to retrieve a list of roles based on provided parameters.
 * - getRoleById: Service function to retrieve a role by its ID.
 * - updateRoleById: Service function to update a role by its ID.
 * - deleteRoleByList: Service function to delete a list of roles by their IDs.
 * - deleteRoleById: Service function to delete a role by its ID.
 */
const rolesService = {
    createRole,
    createDefaultRole,
    getRoleList,
    getRoleById,
    updateRoleById,
    deleteRoleByList,
    deleteRoleById,
};

export default rolesService;
