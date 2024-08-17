'use strict';

/**
 * @fileoverview This file defines the routes for managing pronouns using Express. It includes routes
 * for creating, retrieving, updating, and deleting pronouns, and applies various middlewares for
 * authentication, validation, caching, and method support.
 */

import express from 'express';

import pronounsValidator from './pronouns.validator.js';
import pronounsController from './pronouns.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import routesConstants from '../../../constant/routes.constants.js';
import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';
import cacheMiddleware from '../../../middleware/cache.middleware.js';
import configuration from '../../../configuration/configuration.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: Create pronouns
 *     description: Creates a new set of pronouns, accessible only to users with admin permissions.
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
 *                 description: The name of the pronouns set.
 *     responses:
 *       201:
 *         description: Pronouns created successfully.
 *       400:
 *         description: Bad request, e.g., missing name or pronouns already exist.
 *     tags:
 *       - Pronouns Management
 *   get:
 *     summary: Retrieve all pronouns
 *     description: Retrieves a list of all pronouns, results can be cached.
 *     responses:
 *       200:
 *         description: A list of pronouns.
 *     tags:
 *       - Pronouns Management
 *   delete:
 *     summary: Delete multiple pronouns
 *     description: Deletes a list of pronouns based on their IDs, accessible only to admin users.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of pronouns IDs to delete.
 *     responses:
 *       200:
 *         description: Pronouns deleted successfully.
 *       400:
 *         description: Bad request, e.g., some IDs do not exist.
 *     tags:
 *       - Pronouns Management
 *   all:
 *     summary: Method not supported
 *     responses:
 *       405:
 *         description: HTTP method not supported.
 *     tags:
 *       - Pronouns Management
 */
router
    .route('/')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.pronouns.permissions.create
        ),
        pronounsValidator.createPronouns,
        pronounsController.createPronouns,
        cacheMiddleware.invalidate(routesConstants.pronouns.routes)
    )
    .get(
        pronounsValidator.getPronounsList,
        pronounsController.getPronounsList,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.pronouns.permissions.deleteByList
        ),
        pronounsValidator.deletePronounsList,
        pronounsController.deletePronounsList,
        cacheMiddleware.invalidate(routesConstants.pronouns.routes)
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Retrieve pronouns by ID
 *     description: Retrieves a single set of pronouns by ID, results can be cached.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pronouns to retrieve.
 *     responses:
 *       200:
 *         description: Pronouns retrieved successfully.
 *       404:
 *         description: Pronouns not found.
 *     tags:
 *       - Pronouns Management
 *   put:
 *     summary: Update pronouns by ID
 *     description: Updates an existing set of pronouns by ID, accessible only to admin users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pronouns to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the pronouns set.
 *     responses:
 *       200:
 *         description: Pronouns updated successfully.
 *       404:
 *         description: Pronouns not found.
 *       400:
 *         description: Bad request, e.g., duplicate name.
 *     tags:
 *       - Pronouns Management
 *   delete:
 *     summary: Delete pronouns by ID
 *     description: Deletes a single set of pronouns by ID, accessible only to admin users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pronouns to delete.
 *     responses:
 *       200:
 *         description: Pronouns deleted successfully.
 *       404:
 *         description: Pronouns not found.
 *     tags:
 *       - Pronouns Management
 *   all:
 *     summary: Method not supported
 *     responses:
 *       405:
 *         description: HTTP method not supported.
 *     tags:
 *       - Pronouns Management
 */
router
    .route(`/:${routesConstants.pronouns.params}`)
    .get(
        pronounsValidator.getPronounsById,
        pronounsController.getPronounsById,
        cacheMiddleware.create(configuration.cache.timeout)
    )
    .put(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.pronouns.permissions.updateById
        ),
        pronounsValidator.updatePronounsById,
        pronounsController.updatePronounsById,
        cacheMiddleware.invalidate(routesConstants.pronouns.routes)
    )
    .delete(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.pronouns.permissions.deleteById
        ),
        pronounsValidator.deletePronounsById,
        pronounsController.deletePronounsById,
        cacheMiddleware.invalidate(routesConstants.pronouns.routes)
    )
    .all(methodNotSupported);

export default router;
