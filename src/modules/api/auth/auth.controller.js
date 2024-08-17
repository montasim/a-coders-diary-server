'use strict';

/**
 * @fileoverview This file defines and exports the `authController` object, which contains methods for managing
 * authentication-related operations. These methods are created by utilizing a shared controller utility and an
 * authentication service. The methods include signup, email verification, resending verification emails,
 * requesting new passwords, resetting passwords, logging in, and logging out.
 */

import authService from './auth.service.js';
import controller from '../../../shared/controller.js';

/**
 * authController - An object that holds various methods for managing authentication-related operations.
 * These methods utilize a shared controller utility and an authentication service to perform specific actions.
 *
 * @typedef {Object} AuthController
 * @property {Function} signup - Method to sign up a new user.
 * @property {Function} verify - Method to verify a user's email.
 * @property {Function} resendVerification - Method to resend the email verification link.
 * @property {Function} requestNewPassword - Method to request a new password.
 * @property {Function} resetPassword - Method to reset the password.
 * @property {Function} login - Method to log in a user.
 * @property {Function} logout - Method to log out a user.
 */
const authController = {
    /**
     * signup - Method to sign up a new user.
     * This method calls the `signup` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    signup: controller.signup(authService, 'signup'),

    /**
     * verify - Method to verify a user's email.
     * This method calls the `verify` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    verify: controller.verify(authService, 'verify'),

    /**
     * resendVerification - Method to resend the email verification link.
     * This method calls the `resendVerification` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    resendVerification: controller.resendVerification(
        authService,
        'resendVerification'
    ),

    /**
     * requestNewPassword - Method to request a new password.
     * This method calls the `requestNewPassword` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    requestNewPassword: controller.requestNewPassword(
        authService,
        'requestNewPassword'
    ),

    /**
     * resetPassword - Method to reset the password.
     * This method calls the `resetPassword` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    resetPassword: controller.resetPassword(authService, 'resetPassword'),

    /**
     * login - Method to log in a user.
     * This method calls the `login` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    login: controller.login(authService, 'login'),

    /**
     * logout - Method to log out a user.
     * This method calls the `logout` function from the shared controller with the authentication service and the specific action name.
     *
     * @function
     */
    logout: controller.logout(authService, 'logout'),
};

export default authController;
