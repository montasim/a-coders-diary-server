'use strict';

/**
 * @fileoverview This file defines validation middleware for permissions-related API requests. The
 * middleware functions use Joi schemas to validate request data for creating, retrieving, updating,
 * and deleting permissions. Each function ensures that the request data conforms to the defined
 * schema before proceeding to the next middleware or controller.
 */

import validateWithSchema from '../../../shared/validateWithSchema.js';
import permissionsSchema from './permissions.schema.js';

/**
 * createPermission - Middleware function to validate the request body when creating a new permission.
 * This function ensures that the request body contains valid data according to the createPermissionSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const createPermission = validateWithSchema([
    { schema: permissionsSchema.createPermissionSchema, property: 'body' },
]);

/**
 * getPermissionList - Middleware function to validate the query parameters when retrieving a list of permissions.
 * This function ensures that the query parameters contain valid data according to the getPermissionsQuerySchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getPermissionList = validateWithSchema([
    { schema: permissionsSchema.getPermissionsQuerySchema, property: 'query' },
]);

/**
 * getPermissionById - Middleware function to validate the request parameters when retrieving a permission by its ID.
 * This function ensures that the request parameters contain a valid permission ID according to the permissionIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getPermissionById = validateWithSchema([
    {
        schema: permissionsSchema.permissionIdParamSchema,
        property: 'params',
    },
]);

/**
 * updatePermissionById - Middleware function to validate the request body and parameters when updating a permission by its ID.
 * This function ensures that the request body contains valid data according to the updatePermissionSchema and the request
 * parameters contain a valid permission ID according to the permissionIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const updatePermissionById = validateWithSchema([
    { schema: permissionsSchema.permissionIdParamSchema, property: 'params' },
    { schema: permissionsSchema.updatePermissionSchema, property: 'body' },
]);

/**
 * deletePermissionList - Middleware function to validate the query parameters when deleting a list of permissions.
 * This function ensures that the query parameters contain valid data according to the permissionIdsParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deletePermissionList = validateWithSchema([
    {
        schema: permissionsSchema.permissionIdsParamSchema,
        property: 'query',
    },
]);

/**
 * deletePermissionById - Middleware function to validate the request parameters when deleting a permission by its ID.
 * This function ensures that the request parameters contain a valid permission ID according to the permissionIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deletePermissionById = validateWithSchema([
    {
        schema: permissionsSchema.permissionIdParamSchema,
        property: 'params',
    },
]);

/**
 * permissionsValidator - Object containing all the defined validation middleware functions for permissions:
 *
 * - createPermission: Middleware function to validate the request body when creating a new permission.
 * - getPermissionList: Middleware function to validate the query parameters when retrieving a list of permissions.
 * - getPermissionById: Middleware function to validate the request parameters when retrieving a permission by its ID.
 * - updatePermissionById: Middleware function to validate the request body and parameters when updating a permission by its ID.
 * - deletePermissionList: Middleware function to validate the query parameters when deleting a list of permissions.
 * - deletePermissionById: Middleware function to validate the request parameters when deleting a permission by its ID.
 */
const permissionsValidator = {
    createPermission,
    getPermissionList,
    getPermissionById,
    updatePermissionById,
    deletePermissionList,
    deletePermissionById,
};

export default permissionsValidator;
