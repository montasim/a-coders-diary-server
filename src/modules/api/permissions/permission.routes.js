'use strict';

/**
 * @fileoverview This file sets up the routes for permissions-related operations in an Express application.
 * It defines the endpoints for creating, retrieving, updating, and deleting permissions,
 * as well as assigning default permissions. The routes include middleware for authentication,
 * validation, and caching to ensure secure and efficient handling of requests.
 */

import express from 'express';

import permissionsValidator from './permissions.validator.js';
import permissionsController from './permissions.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import routesConstants from '../../../constant/routes.constants.js';
import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';
import cacheMiddleware from '../../../middleware/cache.middleware.js';
import configuration from '../../../configuration/configuration.js';

const router = express.Router();

/**
 * @openapi
 * /permissions/:
 *   post:
 *     summary: Creates a new permission.
 *     description: Creates a new permission record. This endpoint is accessible only to users with admin permissions.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the permission.
 *               description:
 *                 type: string
 *                 description: A brief description of the permission.
 *     responses:
 *       201:
 *         description: Permission created successfully.
 *       400:
 *         description: Invalid input data.
 *     tags:
 *       - Permissions Management
 *   get:
 *     summary: Retrieves a list of permissions.
 *     description: Fetches a list of permissions, optionally filtered by various criteria.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *     tags:
 *       - Permissions Management
 *   delete:
 *     summary: Deletes multiple permissions.
 *     description: Deletes a list of permissions based on provided identifiers.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of permission IDs to delete.
 *     responses:
 *       200:
 *         description: Permissions deleted successfully.
 *       400:
 *         description: Invalid request format.
 *     tags:
 *       - Permissions Management
 *   all:
 *     summary: Handles unsupported methods for the permissions endpoint.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Permissions Management
 */
router
    .route('/')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.create
        ),
        permissionsValidator.createPermission,
        permissionsController.createPermission,
        cacheMiddleware.invalidate(routesConstants.permissions.routes)
    )
    .get(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.getList
        ),
        permissionsValidator.getPermissionList,
        permissionsController.getPermissionList,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.deleteByList
        ),
        permissionsValidator.deletePermissionList,
        permissionsController.deletePermissionList,
        cacheMiddleware.invalidate(routesConstants.permissions.routes)
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /permissions/default:
 *   post:
 *     summary: Creates default permission set.
 *     description: Generates and assigns default permissions.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Default permissions created successfully.
 *     tags:
 *       - Permissions Management
 *   all:
 *     summary: Handles unsupported methods for the default permissions endpoint.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Permissions Management
 */
router
    .route('/default')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.createDefault
        ),
        permissionsController.createDefaultPermissionList,
        cacheMiddleware.invalidate(routesConstants.permissions.routes)
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /permissions/{id}:
 *   get:
 *     summary: Retrieves a permission by ID.
 *     description: Fetches details of a specific permission by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission.
 *     responses:
 *       200:
 *         description: Permission details retrieved successfully.
 *       404:
 *         description: Permission not found.
 *     tags:
 *       - Permissions Management
 *   put:
 *     summary: Updates a permission by ID.
 *     description: Modifies details of a specific permission using its ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the permission.
 *               description:
 *                 type: string
 *                 description: Updated description of the permission.
 *     responses:
 *       200:
 *         description: Permission updated successfully.
 *       404:
 *         description: Permission not found.
 *     tags:
 *       - Permissions Management
 *   delete:
 *     summary: Deletes a permission by ID.
 *     description: Removes a specific permission using its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission to delete.
 *     responses:
 *       200:
 *         description: Permission deleted successfully.
 *       404:
 *         description: Permission not found.
 *     tags:
 *       - Permissions Management
 *   all:
 *     summary: Handles unsupported methods for permission ID specific endpoint.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Permissions Management
 */
router
    .route(`/:${routesConstants.permissions.params}`)
    .get(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.getById
        ),
        permissionsValidator.getPermissionById,
        permissionsController.getPermissionById,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .put(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.updateById
        ),
        permissionsValidator.updatePermissionById,
        permissionsController.updatePermissionById,
        cacheMiddleware.invalidate(routesConstants.permissions.routes)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.permissions.permissions.deleteById
        ),
        permissionsValidator.deletePermissionById,
        permissionsController.deletePermissionById,
        cacheMiddleware.invalidate(routesConstants.permissions.routes)
    )
    .all(methodNotSupported);

export default router;
