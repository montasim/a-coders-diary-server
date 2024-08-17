'use strict';

/**
 * @fileoverview This file sets up the Express router for admin-related routes. It includes routes for
 * creating a new admin, verifying an admin, resending verification emails, requesting a new password,
 * resetting passwords, logging in, and logging out. The routes use various middlewares for authentication,
 * validation, and handling unsupported methods.
 */

import express from 'express';

import adminValidator from './admin.validator.js';
import adminController from './admin.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';
import routesConstants from '../../../constant/routes.constants.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: Creates a new admin.
 *     description: Creates a new administrator account. This endpoint is accessible only to users with admin permissions.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address for the new admin.
 *               password:
 *                 type: string
 *                 description: Password for the new admin account.
 *     responses:
 *       201:
 *         description: Admin created successfully.
 *       409:
 *         description: Email already registered.
 *       403:
 *         description: Email already registered as a user.
 *       400:
 *         description: Invalid email provided.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/')
    .post(
        authenticateMiddleware(
            accessTypesConstants.ADMIN,
            routesConstants.admin.permissions.create
        ),
        adminValidator.createNewAdmin,
        adminController.createNewAdmin
    )
    // .get(adminValidator.getAdmin, adminController.getAdmin)
    // .delete(adminValidator.deleteAdmin, adminController.deleteAdmin)
    .all(methodNotSupported);

/**
 * @openapi
 * /verify/{token}:
 *   get:
 *     summary: Verifies an admin's email.
 *     description: Verifies the admin's email using the provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to the admin's email.
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       403:
 *         description: Invalid or expired token.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/verify/:token')
    .get(adminValidator.verifyAdmin, adminController.verifyAdmin)
    .all(methodNotSupported);

/**
 * @openapi
 * /resend-verification/{id}:
 *   get:
 *     summary: Resends verification email.
 *     description: Resends the verification email to the admin using the admin ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID for whom to resend the verification email.
 *     responses:
 *       200:
 *         description: Verification email resent successfully.
 *       404:
 *         description: Admin not found.
 *       403:
 *         description: Email already verified.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/resend-verification/:id')
    .get(
        adminValidator.resendAdminVerification,
        adminController.resendAdminVerification
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /requestBooks-new-password:
 *   put:
 *     summary: Requests a new admin password.
 *     description: Initiates a password reset process for an admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the admin.
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *       404:
 *         description: No account found with that email address.
 *       401:
 *         description: Email not verified.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/requestBooks-new-password')
    .put(
        adminValidator.requestNewAdminPassword,
        adminController.requestNewAdminPassword
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /reset-password/{token}:
 *   put:
 *     summary: Resets an admin's password.
 *     description: Resets the admin's password using a provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token sent to the admin's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set.
 *               confirmNewPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       403:
 *         description: Invalid or expired token.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/reset-password/:token')
    .put(adminValidator.resetAdminPassword, adminController.resetAdminPassword)
    .all(methodNotSupported);

// router
//     .route('/admin/:adminId')
//     .get(adminValidator.adminId, adminController.getAdminById)
//     .delete(adminValidator.adminId, adminController.deleteAdminById)
//     .all(methodNotSupported);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Admin login.
 *     description: Authenticates an admin and provides a session token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the admin logging in.
 *               password:
 *                 type: string
 *                 description: Password of the admin.
 *     responses:
 *       200:
 *         description: Login successful.
 *       404:
 *         description: No account found with that email address.
 *       401:
 *         description: Incorrect password or email not verified.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/login')
    .post(adminValidator.adminLogin, adminController.adminLogin)
    .all(methodNotSupported);

/**
 * @openapi
 * /logout:
 *   get:
 *     summary: Admin logout.
 *     description: Logs out an admin and invalidates the session token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: No authentication token provided.
 *     tags:
 *       - Admin Management
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Admin Management
 */
router
    .route('/logout')
    .get(
        authenticateMiddleware(accessTypesConstants.ADMIN),
        adminController.adminLogout
    )
    .all(methodNotSupported);

export default router;
