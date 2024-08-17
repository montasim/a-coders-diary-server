'use strict';

/**
 * @fileoverview This file defines the Express router for managing user profiles. It includes routes
 * for retrieving a user profile by username and applies a methodNotSupported middleware for unsupported
 * HTTP methods.
 */

import express from 'express';

import methodNotSupported from '../../../shared/methodNotSupported.js';
import userProfileController from './userProfile.controller.js';

const router = express.Router();

/**
 * @openapi
 * /{username}:
 *   get:
 *     summary: Retrieve user profile by username.
 *     description: Fetches the user profile based on the provided username. This endpoint respects the user's privacy settings and only returns information allowed under those settings.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user whose profile is being requested.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bio:
 *                   type: string
 *               example:
 *                 username: "johndoe"
 *                 email: "johndoe@example.com"
 *                 bio: "Here is a little about me..."
 *       404:
 *         description: User not found.
 *       403:
 *         description: Access to the profile is forbidden.
 *     tags:
 *       - User Profile Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - User Profile Management
 */
router
    .route('/:username')
    .get(userProfileController.getProfile)
    .all(methodNotSupported);

export default router;
