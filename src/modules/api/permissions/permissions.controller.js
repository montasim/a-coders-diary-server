'use strict';

/**
 * @fileoverview This file defines and exports the controller for handling permissions-related operations.
 * It utilizes a shared controller to define common CRUD operations such as creating, retrieving, updating, and deleting permissions.
 */

import controller from '../../../shared/controller.js';
import permissionsService from './permissions.service.js';
import routesConstants from '../../../constant/routes.constants.js';

const permissionsController = {
    /**
     * createPermission - Controller to handle the creation of a new permission.
     * Uses the shared controller's create method with the createPermission service.
     */
    createPermission: controller.create(permissionsService.createPermission),

    /**
     * createDefaultPermissionList - Controller to handle the creation of default permissions list.
     * Uses the shared controller's create method with the createDefaultPermissionList service.
     */
    createDefaultPermissionList: controller.create(
        permissionsService,
        'createDefaultPermissionList'
    ),

    /**
     * getPermissionList - Controller to handle retrieving a list of permissions.
     * Uses the shared controller's getList method with the getPermissionList service.
     */
    getPermissionList: controller.getList(
        permissionsService,
        'getPermissionList'
    ),

    /**
     * getPermissionById - Controller to handle retrieving a specific permission by ID.
     * Uses the shared controller's getById method with the getPermissionById service and route parameter.
     */
    getPermissionById: controller.getById(
        permissionsService,
        'getPermissionById',
        routesConstants.permissions.params
    ),

    /**
     * updatePermissionById - Controller to handle updating a specific permission by ID.
     * Uses the shared controller's updateById method with the updatePermissionById service and route parameter.
     */
    updatePermissionById: controller.updateById(
        permissionsService,
        'updatePermissionById',
        routesConstants.permissions.params
    ),

    /**
     * deletePermissionById - Controller to handle deleting a specific permission by ID.
     * Uses the shared controller's deleteById method with the deletePermissionById service and route parameter.
     */
    deletePermissionById: controller.deleteById(
        permissionsService,
        'deletePermissionById',
        routesConstants.permissions.params
    ),

    /**
     * deletePermissionList - Controller to handle deleting multiple permissions.
     * Uses the shared controller's deleteList method with the deletePermissionList service.
     */
    deletePermissionList: controller.deleteList(
        permissionsService,
        'deletePermissionList'
    ),
};

export default permissionsController;
