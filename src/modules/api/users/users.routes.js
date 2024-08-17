'use strict';

/**
 * @fileoverview This file defines the main router for handling user settings. The routes are protected by authentication middleware,
 * which ensures that only authenticated users with the appropriate access types can access these routes.
 */

import express from 'express';

import userSettingsRoutes from './userSettings/userSettings.routes.js';
import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';

const router = express.Router();

router.use(
    '/settings',
    authenticateMiddleware(accessTypesConstants.USER),
    userSettingsRoutes
);

export default router;
