'use strict';

/**
 * @fileoverview This file defines the routes for managing roles using Express. It includes routes
 * for creating, retrieving, updating, and deleting roles, and applies various middlewares for
 * authentication, validation, caching, and method support.
 */

import express from 'express';

import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import routesConstants from '../../../constant/routes.constants.js';
import rolesValidator from './roles.validator.js';
import rolesController from './roles.controller.js';
import cacheMiddleware from '../../../middleware/cache.middleware.js';
import configuration from '../../../configuration/configuration.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';

const router = express.Router();

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Creates a new role.
 *     description: Creates a new role with specified permissions. This endpoint requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *       400:
 *         description: Invalid data provided.
 *     tags:
 *       - Role Management
 *   get:
 *     summary: Retrieves a list of roles.
 *     description: Fetches a list of roles based on pagination and filters. Requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of the roles list
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of roles per page
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       404:
 *         description: No roles found.
 *     tags:
 *       - Role Management
 *   delete:
 *     summary: Deletes a list of roles by IDs.
 *     description: Deletes roles based on a list of IDs provided in the request. Requires admin permissions.
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
 *                 description: List of role IDs to delete
 *     responses:
 *       200:
 *         description: Roles deleted successfully.
 *       400:
 *         description: Invalid request format.
 *     tags:
 *       - Role Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Role Management
 */
router
    .route('/')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.create
        ),
        rolesValidator.createRole,
        rolesController.createRole,
        cacheMiddleware.invalidate(routesConstants.roles.routes)
    )
    .get(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.getList
        ),
        rolesValidator.getRoleList,
        rolesController.getRoleList,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.deleteByList
        ),
        rolesValidator.deleteRoleByList,
        rolesController.deleteRoleByList,
        cacheMiddleware.invalidate(routesConstants.roles.routes)
    )
    .all(methodNotSupported);

/** @openapi
 * /roles/default:
 *   post:
 *     summary: Creates or updates the default role.
 *     description: Creates or updates the default role with all available permissions. Requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Default role created or updated successfully.
 *       400:
 *         description: Failed to create or update the default role.
 *     tags:
 *       - Role Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Role Management
 */
router
    .route('/default')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.createDefault
        ),
        rolesController.createDefaultRole,
        cacheMiddleware.invalidate(routesConstants.roles.routes)
    )
    .all(methodNotSupported);

/** @openapi
 * /roles/{roleId}:
 *   get:
 *     summary: Retrieves a role by ID.
 *     description: Fetches a role by its ID. Requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to retrieve.
 *     responses:
 *       200:
 *         description: Role retrieved successfully.
 *       404:
 *         description: Role not found.
 *     tags:
 *       - Role Management
 *   put:
 *     summary: Updates a role by ID.
 *     description: Updates the specified role's details by ID. Requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *       404:
 *         description: Role not found.
 *     tags:
 *       - Role Management
 *   delete:
 *     summary: Deletes a role by ID.
 *     description: Deletes the specified role by its ID. Requires admin permissions.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role deleted successfully.
 *       404:
 *         description: Role not found.
 *     tags:
 *       - Role Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Role Management
 */
router
    .route(`/:${routesConstants.roles.params}`)
    .get(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.getById
        ),
        rolesValidator.getRoleById,
        rolesController.getRoleById,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .put(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.updateById
        ),
        rolesValidator.updateRoleById,
        rolesController.updateRoleById,
        cacheMiddleware.invalidate(routesConstants.roles.routes)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.roles.permissions.deleteById
        ),
        rolesValidator.deleteRoleById,
        rolesController.deleteRoleById,
        cacheMiddleware.invalidate(routesConstants.roles.routes)
    )
    .all(methodNotSupported);

export default router;
