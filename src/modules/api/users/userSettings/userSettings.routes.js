'use strict';

/**
 * @fileoverview This file defines the routes for user account, profile, appearance, and log operations.
 * The routes handle HTTP requests to manage user profiles, accounts, appearance settings, and logs.
 * Unsupported HTTP methods on these routes will return a "Method Not Supported" response.
 */

import express from 'express';

import uploadMiddleware from '../../../../middleware/upload.middleware.js';
import userLogRoutes from './userLog/userLog.routes.js';
import usersAccountValidator from './userAccount/userAccount.validator.js';
import usersAccountController from './userAccount/userAccount.controller.js';
import userProfileController from './userProfile/userProfile.controller.js';
import usersProfileValidator from './userProfile/updateProfile.validator.js';
import methodNotSupported from '../../../../shared/methodNotSupported.js';
import userAppearanceValidator from './userAppearance/userAppearance.validator.js';
import userAppearanceController from './userAppearance/userAppearance.controller.js';

const router = express.Router();

router
    .route('/profile')
    .get(userProfileController.getProfile)
    .put(
        uploadMiddleware.single('image'),
        usersProfileValidator.updateProfile,
        userProfileController.updateProfile
    )
    .all(methodNotSupported);

router
    .route('/account')
    .delete(
        usersAccountValidator.deleteAccount,
        usersAccountController.deleteAccount
    )
    .all(methodNotSupported);

router
    // TODO: user appearance management, eg: theme, font size, etc
    .route('/appearance')
    .get(userAppearanceController.getAppearance)
    .put(
        userAppearanceValidator.updateAppearance,
        userAppearanceController.updateAppearance
    )
    .all(methodNotSupported);

// router
//     // TODO: user security management, eg: email, mobile, password, 2FA, etc
//     .route('/security')
//     .get(userProfileController.getProfile)
//     .put(
//         uploadMiddleware.single('image'),
//         usersAccountValidator.deleteAccount,
//         userProfileController.updateProfile
//     )
//     .delete(usersAccountValidator.deleteAccount, userProfileController.updateProfile)
//     .all(methodNotSupported);

// TODO: user log management, eg: security, activities
router.use('/log', userLogRoutes);

export default router;
