'use strict';

/**
 * @fileoverview This module defines the main router for the application, which handles various routes for different functionalities.
 * It includes routes for home-related operations, status checks, and testing uncaught exceptions.
 */

import express from 'express';

import homeRoutes from './home/home.routes.js';
import statusRoutes from './status/status.routes.js';
import testUncaughtExceptionRoutes from './testUncaughtException/testUncaughtException.routes.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Home page route.
 *     description: This endpoint serves the home page of the application.
 *     responses:
 *       200:
 *         description: Home page accessed successfully.
 *     tags:
 *       - Home
 */
router.use('/', homeRoutes);

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Status check.
 *     description: This endpoint checks the current status of the application to ensure it is running properly.
 *     responses:
 *       200:
 *         description: Application is running.
 *       500:
 *         description: Error in application status.
 *     tags:
 *       - Status
 */
router.use('/status', statusRoutes);

/**
 * @openapi
 * /test-uncaught-exception:
 *   get:
 *     summary: Test uncaught exception.
 *     description: This endpoint is used to test the handling of uncaught exceptions within the application.
 *     responses:
 *       500:
 *         description: Uncaught exception occurred and handled.
 *     tags:
 *       - Test Uncaught Exception
 */
router.use('/test-uncaught-exception', testUncaughtExceptionRoutes);

export default router;
