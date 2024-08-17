'use strict';

/**
 * @fileoverview This file sets up the Express router for authentication-related routes.
 * It includes routes for login, logout, requesting a new password, resending verification emails,
 * resetting passwords, signing up, and verifying email addresses. The routes use various middlewares
 * for validation, authentication, and handling unsupported methods.
 */

import express from 'express';

import authValidator from './auth.validator.js';
import authController from './auth.controller.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';
import authenticateMiddleware from '../../../middleware/authenticate.middleware.js';
import accessTypesConstants from '../../../constant/accessTypes.constants.js';

const router = express.Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       200:
 *         description: Authentication successful.
 *       401:
 *         description: Authentication failed.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/login')
    .post(authValidator.login, authController.login)
    .all(methodNotSupported);

/**
 * @openapi
 * /logout:
 *   get:
 *     summary: Logout
 *     description: Logs out a user and invalidates the session token.
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: User not logged in.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/logout')
    .get(
        authenticateMiddleware(accessTypesConstants.USER),
        authController.logout
    )
    .all(methodNotSupported);

/**
 * @openapi
 * /request-new-password:
 *   put:
 *     summary: Request New Password
 *     description: Initiates a password reset process for a user by sending them an email with a reset link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address associated with the user account.
 *     responses:
 *       200:
 *         description: Reset email sent successfully.
 *       404:
 *         description: No user found with this email.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/request-new-password')
    .put(authValidator.requestNewPassword, authController.requestNewPassword)
    .all(methodNotSupported);

/**
 * @openapi
 * /resend-verification/{id}:
 *   get:
 *     summary: Resend Verification Email
 *     description: Resends the verification email to the user based on the user ID provided.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user.
 *     responses:
 *       200:
 *         description: Verification email resent successfully.
 *       404:
 *         description: User not found.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/resend-verification/:id')
    .get(authValidator.resendVerification, authController.resendVerification)
    .all(methodNotSupported);

/**
 * @openapi
 * /reset-password/{token}:
 *   put:
 *     summary: Reset Password
 *     description: Allows a user to reset their password using a valid token received via email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token received for resetting the password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user.
 *               confirmNewPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       403:
 *         description: Invalid or expired token.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/reset-password/:token')
    .put(authValidator.resetPassword, authController.resetPassword)
    .all(methodNotSupported);

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Sign Up
 *     description: Registers a new user and sends a verification email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address for the new user.
 *               password:
 *                 type: string
 *                 description: Password for the new user.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the password.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       409:
 *         description: Email already in use.
 *       400:
 *         description: Invalid data provided.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/signup')
    .post(authValidator.signup, authController.signup)
    .all(methodNotSupported);

/**
 * @openapi
 * /verify/{token}:
 *   get:
 *     summary: Verify Email
 *     description: Verifies a user's email using a token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       403:
 *         description: Invalid or expired token.
 *     tags:
 *       - Authentication
 *   all:
 *     summary: Handles unsupported methods.
 *     description: Returns an error if an unsupported HTTP method is used.
 *     responses:
 *       405:
 *         description: Method not supported.
 *     tags:
 *       - Authentication
 */
router
    .route('/verify/:token')
    .get(authValidator.verify, authController.verify)
    .all(methodNotSupported);

export default router;
