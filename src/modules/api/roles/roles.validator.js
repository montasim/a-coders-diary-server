'use strict';

/**
 * @fileoverview This file defines validation middleware for roles-related API requests. The
 * middleware functions use Joi schemas to validate request data for creating, retrieving, updating,
 * and deleting roles. Each function ensures that the request data conforms to the defined
 * schema before proceeding to the next middleware or controller.
 */

import validateWithSchema from '../../../shared/validateWithSchema.js';
import rolesSchema from './roles.schema.js';

/**
 * createRole - Middleware function to validate the request body when creating a new role.
 * This function ensures that the request body contains valid data according to the createRoleSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const createRole = validateWithSchema([
    { schema: rolesSchema.createRoleSchema, property: 'body' },
]);

/**
 * getRoleList - Middleware function to validate the query parameters when retrieving a list of roles.
 * This function ensures that the query parameters contain valid data according to the getRolesQuerySchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getRoleList = validateWithSchema([
    {
        schema: rolesSchema.getRolesQuerySchema,
        property: 'query',
    },
]);

/**
 * getRoleById - Middleware function to validate the request parameters when retrieving a role by its ID.
 * This function ensures that the request parameters contain a valid role ID according to the roleIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getRoleById = validateWithSchema([
    {
        schema: rolesSchema.roleIdParamSchema,
        property: 'params',
    },
]);

/**
 * updateRoleById - Middleware function to validate the request body and parameters when updating a role by its ID.
 * This function ensures that the request body contains valid data according to the updateRoleSchema and the request
 * parameters contain a valid role ID according to the roleIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const updateRoleById = validateWithSchema([
    {
        schema: rolesSchema.roleIdParamSchema,
        property: 'params',
    },
    {
        schema: rolesSchema.updateRoleSchema,
        property: 'body',
    },
]);

/**
 * deleteRoleByList - Middleware function to validate the query parameters when deleting a list of roles.
 * This function ensures that the query parameters contain valid data according to the roleIdsParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deleteRoleByList = validateWithSchema([
    {
        schema: rolesSchema.roleIdsParamSchema,
        property: 'query',
    },
]);

/**
 * deleteRoleById - Middleware function to validate the request parameters when deleting a role by its ID.
 * This function ensures that the request parameters contain a valid role ID according to the roleIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deleteRoleById = validateWithSchema([
    {
        schema: rolesSchema.roleIdParamSchema,
        property: 'params',
    },
]);

/**
 * rolesValidator - Object containing all the defined validation middleware functions for roles:
 *
 * - createRole: Middleware function to validate the request body when creating a new role.
 * - getRoleList: Middleware function to validate the query parameters when retrieving a list of roles.
 * - getRoleById: Middleware function to validate the request parameters when retrieving a role by its ID.
 * - updateRoleById: Middleware function to validate the request body and parameters when updating a role by its ID.
 * - deleteRoleByList: Middleware function to validate the query parameters when deleting a list of roles.
 * - deleteRoleById: Middleware function to validate the request parameters when deleting a role by its ID.
 */
const rolesValidator = {
    createRole,
    getRoleList,
    getRoleById,
    updateRoleById,
    deleteRoleByList,
    deleteRoleById,
};

export default rolesValidator;
