'use strict';

/**
 * @fileoverview This file exports an object `adminController` which contains methods for managing admin-related operations.
 * These methods are created by utilizing a shared controller utility and an admin service. The methods include creating a new admin,
 * verifying an admin, resending verification emails, requesting new passwords, resetting passwords, logging in, and logging out.
 */

import adminService from './admin.service.js';
import controller from '../../../shared/controller.js';

/**
 * adminController - An object that holds various methods for managing admin-related operations.
 * These methods utilize a shared controller utility and an admin service to perform specific actions.
 *
 * @typedef {Object} AdminController
 * @property {Function} createNewAdmin - Method to create a new admin user.
 * @property {Function} verifyAdmin - Method to verify an admin user.
 * @property {Function} resendAdminVerification - Method to resend admin verification email.
 * @property {Function} requestNewAdminPassword - Method to request a new password for an admin user.
 * @property {Function} resetAdminPassword - Method to reset the password for an admin user.
 * @property {Function} adminLogin - Method to handle admin user login.
 * @property {Function} adminLogout - Method to handle admin user logout.
 */
const adminController = {
    /**
     * createNewAdmin - Method to create a new admin user.
     * This method calls the `createNewUser` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    createNewAdmin: controller.createNewUser(adminService, 'createNewAdmin'),

    /**
     * verifyAdmin - Method to verify an admin user.
     * This method calls the `verify` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    verifyAdmin: controller.verify(adminService, 'verifyAdmin'),

    /**
     * resendAdminVerification - Method to resend admin verification email.
     * This method calls the `resendVerification` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    resendAdminVerification: controller.resendVerification(
        adminService,
        'resendAdminVerification'
    ),

    /**
     * requestNewAdminPassword - Method to request a new password for an admin user.
     * This method calls the `requestNewPassword` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    requestNewAdminPassword: controller.requestNewPassword(
        adminService,
        'requestNewAdminPassword'
    ),

    /**
     * resetAdminPassword - Method to reset the password for an admin user.
     * This method calls the `resetPassword` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    resetAdminPassword: controller.resetPassword(
        adminService,
        'resetAdminPassword'
    ),

    /**
     * adminLogin - Method to handle admin user login.
     * This method calls the `login` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    adminLogin: controller.login(adminService, 'adminLogin'),

    /**
     * adminLogout - Method to handle admin user logout.
     * This method calls the `logout` function from the shared controller with the admin service and the specific action name.
     *
     * @function
     */
    adminLogout: controller.logout(adminService, 'adminLogout'),
};

export default adminController;
