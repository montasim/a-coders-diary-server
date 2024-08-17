'use strict';

/**
 * @fileoverview This file sets up the main Express router with different route handlers.
 * It includes routes for the index, API routes with versioning, and a handler for undefined routes.
 * The configuration file is used to set the API version dynamically.
 */

import express from 'express';

import indexRoutes from './modules/index/index.routes.js';
import ApiRoutes from './modules/api/api.routes.js';
import undefinedController from './modules/undefined/undefined.controller.js';
import configuration from './configuration/configuration.js';

/**
 * Router setup - This function configures the Express router with the following routes:
 *
 * - Index routes: Handles the root path ('/') with `indexRoutes`.
 * - API routes: Handles API paths with versioning, using `configuration.version` for dynamic versioning.
 * - Undefined routes: Catches all undefined routes and handles them with `undefinedController`.
 *
 * @returns {Object} - The configured Express router instance.
 */
const router = express.Router();

router.use('/', indexRoutes);

router.use(`/api/${configuration.version}`, ApiRoutes);

/**
 * @openapi
 * /*:
 *   all:
 *     summary: Handle undefined routes.
 *     description: Returns an error response for any requests made to undefined routes.
 *     responses:
 *       404:
 *         description: Invalid route!
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Error Handling
 */
router.use('*', undefinedController);

export default router;
