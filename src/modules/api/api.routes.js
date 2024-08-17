'use strict';

/**
 * @fileoverview This module defines the main router for the application, which handles various routes for different functionalities.
 * It includes routes for authentication, book management, detection services, publications, subjects, trending items, user management, writer management, permissions, roles, admin operations, pronouns, and user profiles.
 * The router applies authentication middleware where necessary to protect routes that require user access.
 */

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './auth/auth.routes.js';
import detectRoutes from './detect/detect.routes.js';
import usersRoutes from './users/users.routes.js';
import authenticateMiddleware from '../../middleware/authenticate.middleware.js';
import routesConstants from '../../constant/routes.constants.js';
import permissionRoutes from './permissions/permission.routes.js';
import rolesRoutes from './roles/roles.routes.js';
import adminRoutes from './admin/admin.routes.js';
import pronounsRoutes from './pronouns/pronouns.routes.js';
import userProfileRoutes from './userProfile/userProfile.routes.js';
import accessTypesConstants from '../../constant/accessTypes.constants.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the JSDoc documentation
const docsPath = path.join(
    process.cwd(),
    'src',
    'modules',
    'api',
    'documentation',
    'code'
);

// Read the Swagger JSON from the file system
const swaggerDocument = JSON.parse(
    // fs.readFileSync('./src/modules/api/documentation/api/swagger.json', 'utf8')
    fs.readFileSync(
        path.join(__dirname, 'documentation', 'api', 'swagger.json'),
        'utf8'
    )
);

// Serve JSDoc documentation on the /api/v1/code-docs route
router.use('/documentation/code', express.static(docsPath));

// API documentation route setup
router.use(
    '/documentation/api',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Application routes
router.use(`/${routesConstants.admin.routes}`, adminRoutes);
router.use(`/${routesConstants.auth.routes}`, authRoutes);
router.use(`/${routesConstants.detect.routes}`, detectRoutes);
router.use(`/${routesConstants.pronouns.routes}`, pronounsRoutes);
router.use(`/${routesConstants.permissions.routes}`, permissionRoutes);
router.use(`/${routesConstants.roles.routes}`, rolesRoutes);
router.use(
    `/${routesConstants.user.routes}`,
    authenticateMiddleware(accessTypesConstants.USER),
    usersRoutes
);
// router.use('/', userProfileRoutes);

export default router;
