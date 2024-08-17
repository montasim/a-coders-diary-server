'use strict';

/**
 * @fileoverview This module defines the router for handling status-related operations.
 * It includes routes for retrieving the status of the application and handles unsupported methods.
 */

import express from 'express';

import statusController from './status.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Check system status.
     *     description: Checks and returns the current operational status of the system.
     *     responses:
     *       200:
     *         description: System is operational.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'Success'
     *       500:
     *         description: Internal server error.
     *   all:
     *     summary: Handles unsupported methods.
     *     description: Returns an error if an unsupported HTTP method is used on this route.
     *     responses:
     *       405:
     *         description: Method not supported.
     *     tags:
     *       - System Status
     */
    .get(statusController)
    .all(methodNotSupported);

export default router;
