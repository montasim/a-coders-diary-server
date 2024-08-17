'use strict';

/**
 * @fileoverview This file defines the routes for user-related operations, including user activity and security.
 * The routes handle HTTP GET requests to fetch user information for activity and security sections.
 * Unsupported HTTP methods on these routes will return a "Method Not Supported" response.
 */

import express from 'express';

import methodNotSupported from '../../../../../shared/methodNotSupported.js';

const router = express.Router();

/**
 * @openapi
 * /activity:
 *   get:
 *     summary: Fetch user activity information.
 *     description: Retrieves activity-related information for a user. Only authorized users can access this endpoint.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User activity information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: Unique identifier of the user.
 *                 lastLogin:
 *                   type: string
 *                   format: date-time
 *                   description: Last login time of the user.
 *                 lastActivity:
 *                   type: string
 *                   format: date-time
 *                   description: Last activity time of the user.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found.
 *     tags:
 *       - User Management
 *   all:
 *     summary: Handles unsupported methods for user activity route.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - User Management
 */
router.route('/activity').get(usersController.getUser).all(methodNotSupported);

/**
 * @openapi
 * /security:
 *   get:
 *     summary: Fetch user security settings.
 *     description: Retrieves security-related settings for a user. Accessible only to authenticated users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User security settings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: Unique identifier of the user.
 *                 twoFactorEnabled:
 *                   type: boolean
 *                   description: Indicates if two-factor authentication is enabled.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found.
 *     tags:
 *       - User Management
 *   all:
 *     summary: Handles unsupported methods for user security route.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - User Management
 */
router.route('/security').get(usersController.getUser).all(methodNotSupported);

export default router;
