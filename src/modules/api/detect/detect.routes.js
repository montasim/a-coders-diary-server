'use strict';

/**
 * @fileoverview This file sets up the Express router for handling detection-related HTTP requests.
 * The router defines the routes and their corresponding handlers, utilizing the detect controller
 * and a method not supported handler for unsupported HTTP methods.
 */

import express from 'express';

import methodNotSupported from '../../../shared/methodNotSupported.js';
import detectController from './detect.controller.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Detects user-agent information.
 *     description: Retrieves and returns information about the user's device, operating system, browser, IP address, and more based on the incoming request headers.
 *     responses:
 *       200:
 *         description: User-agent information detected successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 language:
 *                   type: string
 *                   description: Preferred language of the user extracted from the 'Accept-Language' header.
 *                 os:
 *                   type: string
 *                   description: Operating system of the user's device.
 *                 ip:
 *                   type: string
 *                   description: IP address of the user.
 *                 device:
 *                   type: string
 *                   description: Type of device used, such as Desktop, Tablet, Mobile, or Unknown.
 *                 browser:
 *                   type: string
 *                   description: Browser used by the user.
 *                 browserVersion:
 *                   type: string
 *                   description: Version of the browser.
 *                 timeZone:
 *                   type: string
 *                   description: Time zone of the user based on browser settings.
 *                 referrer:
 *                   type: string
 *                   description: Referrer URL if the request came from another site.
 *                 cookies:
 *                   type: string
 *                   description: Raw cookie header from the request.
 *                 geo:
 *                   type: object
 *                   description: Optional geolocation data based on the user's IP address.
 *                   properties:
 *                     country:
 *                       type: string
 *                       description: Country derived from the IP address.
 *                     region:
 *                       type: string
 *                       description: Region derived from the IP address.
 *                     city:
 *                       type: string
 *                       description: City derived from the IP address.
 *     tags:
 *       - User Detection
 *   all:
 *     summary: Handles unsupported methods for the root route.
 *     description: Returns an error if an unsupported HTTP method is used on the root route.
 *     responses:
 *       405:
 *         description: Method not supported on the root route.
 *     tags:
 *       - User Detection
 */
router.route('/').get(detectController).all(methodNotSupported);

export default router;
