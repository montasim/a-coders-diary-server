'use strict';

/**
 * @fileoverview This module defines the router for handling home-related operations.
 * It includes routes for retrieving a list of items from the home service, with caching and method not supported handling.
 */

import express from 'express';

import homeController from './home.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import cacheMiddleware from '../../../middleware/cache.middleware.js';
import configuration from '../../../configuration/configuration.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Retrieve home data.
     *     description: Returns information about the API portal including version, license, and contact details.
     *     responses:
     *       200:
     *         description: Home data fetched successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 version:
     *                   type: string
     *                 license:
     *                   type: string
     *                 description:
     *                   type: string
     *                 engines:
     *                   type: object
     *                   properties:
     *                     node:
     *                       type: string
     *                     yarn:
     *                       type: string
     *                 homepage:
     *                   type: string
     *                 bugs:
     *                   type: string
     *                 environment:
     *                   type: object
     *                   properties:
     *                     current:
     *                       type: string
     *                     apiVersion:
     *                       type: string
     *                 support:
     *                   type: object
     *                   properties:
     *                     email:
     *                       type: string
     *                 author:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *                     mobile:
     *                       type: string
     *                     linkedin:
     *                       type: string
     *                     github:
     *                       type: string
     *       500:
     *         description: Internal server error.
     *   all:
     *     summary: Handles unsupported methods.
     *     description: Returns an error if an unsupported HTTP method is used on this route.
     *     responses:
     *       405:
     *         description: Method not supported.
     *     tags:
     *       - Home Management
     */
    .get(homeController, cacheMiddleware.create(configuration.cache.timeout))
    .all(methodNotSupported);

export default router;
