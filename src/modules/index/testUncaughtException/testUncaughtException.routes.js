'use strict';

/**
 * @fileoverview This module defines the router for testing uncaught exceptions.
 * It includes a route for triggering a simulated uncaught exception and handles unsupported methods.
 */

import express from 'express';

import testUncaughtExceptionController from './testUncaughtException.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Test uncaught exception simulation.
     *     description: Triggers an uncaught exception to test the system's error handling capabilities.
     *     responses:
     *       500:
     *         description: Simulated uncaught exception.
     *   all:
     *     summary: Handles unsupported methods.
     *     description: Returns an error if an unsupported HTTP method is used on this route.
     *     responses:
     *       405:
     *         description: Method not supported.
     *     tags:
     *       - Error Testing
     */
    .get(testUncaughtExceptionController)
    .all(methodNotSupported);

export default router;
