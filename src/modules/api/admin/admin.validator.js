'use strict';

/**
 * @fileoverview This file defines and exports the `adminValidator` object, which contains middleware functions
 * for validating admin-related requests using Joi schemas. Each function validates a specific request property
 * against a defined schema, ensuring that the incoming data meets the required criteria before proceeding to the
 * corresponding controller action.
 */

import adminSchema from './admin.schema.js';
import validateWithSchema from '../../../shared/validateWithSchema.js';

/**
 * createNewAdmin - Middleware for validating the request body when creating a new admin.
 * This function uses the `adminSchema.createNewAdmin` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const createNewAdmin = validateWithSchema([
    {
        schema: adminSchema.createNewAdmin,
        property: 'body',
    },
]);

/**
 * verifyAdmin - Middleware for validating the request parameters when verifying an admin.
 * This function uses the `adminSchema.verifyAdmin` schema to validate the parameters of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const verifyAdmin = validateWithSchema([
    {
        schema: adminSchema.verifyAdmin,
        property: 'params',
    },
]);

/**
 * resendAdminVerification - Middleware for validating the request parameters when resending admin verification.
 * This function uses the `adminSchema.resendAdminVerification` schema to validate the parameters of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const resendAdminVerification = validateWithSchema([
    {
        schema: adminSchema.resendAdminVerification,
        property: 'params',
    },
]);

/**
 * adminLogin - Middleware for validating the request body when logging in an admin.
 * This function uses the `adminSchema.login` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const adminLogin = validateWithSchema([
    {
        schema: adminSchema.login,
        property: 'body',
    },
]);

/**
 * requestNewAdminPassword - Middleware for validating the request body when requesting a new admin password.
 * This function uses the `adminSchema.requestNewAdminPassword` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const requestNewAdminPassword = validateWithSchema([
    {
        schema: adminSchema.requestNewAdminPassword,
        property: 'body',
    },
]);

/**
 * resetAdminPassword - Middleware for validating the request body when resetting an admin password.
 * This function uses the `adminSchema.resetAdminPassword` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const resetAdminPassword = validateWithSchema([
    {
        schema: adminSchema.resetAdminPassword,
        property: 'body',
    },
]);

/**
 * adminValidator - An object that holds various middleware functions for validating admin-related requests.
 * These functions use Joi schemas to validate the input data for admin endpoints, ensuring the data meets the required criteria.
 *
 * @typedef {Object} AdminValidator
 * @property {Function} createNewAdmin - Middleware for validating the request body when creating a new admin.
 * @property {Function} verifyAdmin - Middleware for validating the request parameters when verifying an admin.
 * @property {Function} resendAdminVerification - Middleware for validating the request parameters when resending admin verification.
 * @property {Function} adminLogin - Middleware for validating the request body when logging in an admin.
 * @property {Function} requestNewAdminPassword - Middleware for validating the request body when requesting a new admin password.
 * @property {Function} resetAdminPassword - Middleware for validating the request body when resetting an admin password.
 */
const adminValidator = {
    createNewAdmin,
    verifyAdmin,
    resendAdminVerification,
    adminLogin,
    requestNewAdminPassword,
    resetAdminPassword,
};

export default adminValidator;
