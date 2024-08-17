'use strict';

/**
 * @fileoverview This file defines the routes for user log operations, including account logs and security logs.
 * The routes handle HTTP GET requests to fetch various types of user logs for the authenticated user.
 * Unsupported HTTP methods on these routes will return a "Method Not Supported" response.
 */

import express from 'express';

import userLogController from './userLog.controller.js';
import methodNotSupported from '../../../../../shared/methodNotSupported.js';

const router = express.Router();

/**
 * @openapi
 * /account:
 *   get:
 *     summary: Fetches the account log for the authenticated user.
 *     description: Retrieves the activity log of the user associated with account-related changes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account activities retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       description:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized. Please log in first.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - User Log Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - User Log Management
 */
router
    .route('/account')
    .get(userLogController.getAccountLog)
    .all(methodNotSupported);

/**
 * @openapi
 * /security:
 *   get:
 *     summary: Fetches the security log for the authenticated user.
 *     description: Retrieves the security log of the user, including all security-related activities.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security activities retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       description:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized. Please log in first.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - User Log Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - User Log Management
 */
router
    .route('/security')
    .get(userLogController.getSecurityLog)
    .all(methodNotSupported);

router
    .route('/security')
    .get(userLogController.getSecurityLog)
    .all(methodNotSupported);

export default router;
