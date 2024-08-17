'use strict';

/**
 * @fileoverview This file defines the controller functions for managing roles. These functions
 * handle the creation, retrieval, updating, and deletion of roles by interacting with the
 * roles service. Each function utilizes a shared controller to streamline the handling of
 * standard CRUD operations.
 */

import controller from '../../../shared/controller.js';
import rolesService from './roles.service.js';
import routesConstants from '../../../constant/routes.constants.js';

/**
 * rolesController - Object containing all the defined controller functions for roles management:
 *
 * - createRole: Controller function to handle the creation of a new role.
 * - createDefaultRole: Controller function to handle the creation of a default role.
 * - getRoleList: Controller function to handle the retrieval of a list of roles.
 * - getRoleById: Controller function to handle the retrieval of a role by its ID.
 * - updateRoleById: Controller function to handle the updating of a role by its ID.
 * - deleteRoleById: Controller function to handle the deletion of a role by its ID.
 * - deleteRoleByList: Controller function to handle the deletion of a list of roles.
 */
const rolesController = {
    /**
     * createRole - Controller function to handle the creation of a new role. This function
     * delegates the creation logic to the roles service and uses a shared controller method
     * to handle the request and response.
     *
     * @param {Object} req - The request object containing the role data to create.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    createRole: controller.create(rolesService, 'createRole'),

    /**
     * createDefaultRole - Controller function to handle the creation of a default role. This function
     * delegates the creation logic to the roles service and uses a shared controller method
     * to handle the request and response.
     *
     * @param {Object} req - The request object containing the role data to create.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    createDefaultRole: controller.create(rolesService, 'createDefaultRole'),

    /**
     * getRoleList - Controller function to handle the retrieval of a list of roles. This function
     * delegates the retrieval logic to the roles service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the query parameters.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    getRoleList: controller.getList(rolesService, 'getRoleList'),

    /**
     * getRoleById - Controller function to handle the retrieval of a role by its ID. This function
     * delegates the retrieval logic to the roles service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the role ID.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    getRoleById: controller.getById(
        rolesService,
        'getRoleById',
        routesConstants.roles.params
    ),

    /**
     * updateRoleById - Controller function to handle the updating of a role by its ID. This function
     * delegates the update logic to the roles service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the role ID and update data.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    updateRoleById: controller.updateById(
        rolesService,
        'updateRoleById',
        routesConstants.roles.params
    ),

    /**
     * deleteRoleById - Controller function to handle the deletion of a role by its ID. This function
     * delegates the deletion logic to the roles service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the role ID.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    deleteRoleById: controller.deleteById(
        rolesService,
        'deleteRoleById',
        routesConstants.roles.params
    ),

    /**
     * deleteRoleByList - Controller function to handle the deletion of a list of roles. This function
     * delegates the deletion logic to the roles service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the list of role IDs.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    deleteRoleByList: controller.deleteList(rolesService, 'deleteRoleList'),
};

export default rolesController;
