'use strict';

/**
 * @fileoverview This file defines and exports the `authValidator` object, which contains middleware functions
 * for validating authentication-related requests using Joi schemas. Each function validates a specific request
 * property against a defined schema, ensuring that the incoming data meets the required criteria before proceeding
 * to the corresponding controller action.
 */

import validateWithSchema from '../../../shared/validateWithSchema.js';
import authSchema from './auth.schema.js';

/**
 * signup - Middleware for validating the request body when signing up a new user.
 * This function uses the `authSchema.signup` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const signup = validateWithSchema([
    {
        schema: authSchema.signup,
        property: 'body',
    },
]);

/**
 * verify - Middleware for validating the request parameters when verifying a user's email.
 * This function uses the `authSchema.verify` schema to validate the parameters of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const verify = validateWithSchema([
    {
        schema: authSchema.verify,
        property: 'params',
    },
]);

/**
 * resendVerification - Middleware for validating the request parameters when resending the email verification link.
 * This function uses the `authSchema.resendVerification` schema to validate the parameters of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const resendVerification = validateWithSchema([
    {
        schema: authSchema.resendVerification,
        property: 'params',
    },
]);

/**
 * login - Middleware for validating the request body when logging in a user.
 * This function uses the `authSchema.login` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const login = validateWithSchema([
    {
        schema: authSchema.login,
        property: 'body',
    },
]);

/**
 * requestNewPassword - Middleware for validating the request body when requesting a new password.
 * This function uses the `authSchema.requestNewPassword` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const requestNewPassword = validateWithSchema([
    {
        schema: authSchema.requestNewPassword,
        property: 'body',
    },
]);

/**
 * resetPassword - Middleware for validating the request body when resetting a password.
 * This function uses the `authSchema.resetPassword` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const resetPassword = validateWithSchema([
    {
        schema: authSchema.resetPassword,
        property: 'body',
    },
]);

/**
 * logout - Middleware for validating the request body when logging out a user.
 * This function uses the `authSchema.signup` schema to validate the body of the request.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const logout = validateWithSchema([
    {
        schema: authSchema.signup,
        property: 'body',
    },
]);

/**
 * authValidator - An object that holds various middleware functions for validating authentication-related requests.
 * These functions use Joi schemas to validate the input data for authentication endpoints, ensuring the data meets the required criteria.
 *
 * @typedef {Object} AuthValidator
 * @property {Function} signup - Middleware for validating the request body when signing up a new user.
 * @property {Function} verify - Middleware for validating the request parameters when verifying a user's email.
 * @property {Function} resendVerification - Middleware for validating the request parameters when resending the email verification link.
 * @property {Function} login - Middleware for validating the request body when logging in a user.
 * @property {Function} requestNewPassword - Middleware for validating the request body when requesting a new password.
 * @property {Function} resetPassword - Middleware for validating the request body when resetting a password.
 * @property {Function} logout - Middleware for validating the request body when logging out a user.
 */
const authValidator = {
    signup,
    verify,
    resendVerification,
    login,
    requestNewPassword,
    resetPassword,
    logout,
};

export default authValidator;
