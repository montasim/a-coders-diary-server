'use strict';

/**
 * @fileoverview This file defines and exports Joi validation schemas for admin-related operations.
 * These schemas are used to validate the input data for various admin endpoints, including
 * creating a new admin, verifying an admin, resending verification emails, requesting a new password,
 * resetting passwords, and logging in. The validation schemas utilize the validationService for
 * common field validations and include custom error messages for specific validation rules.
 */

import Joi from 'joi';
import validationService from '../../../service/validation.service.js';
import adminConstants from './admin.constants.js';
import customValidationMessage from '../../../shared/customValidationMessage.js';

/**
 * authSchemaBase - Base Joi schema for validating common fields used in admin-related operations.
 * Ensures that fields such as name, email, password, confirmPassword, oldPassword, newPassword, confirmNewPassword,
 * token, and id meet the specified criteria.
 *
 * @typedef {Object} AuthSchemaBase
 * @property {Object} name - String field representing the admin's name. Must start with an uppercase letter followed by lowercase letters for each word.
 * @property {Object} email - String field representing the admin's email address. Validates the format and ensures it meets common email requirements.
 * @property {Object} password - String field representing the admin's password. Validates the complexity and ensures it meets common password requirements.
 * @property {Object} confirmPassword - String field representing the confirmation of the admin's password. Ensures it matches the password field.
 * @property {Object} oldPassword - String field representing the admin's old password. Used for password reset operations.
 * @property {Object} newPassword - String field representing the admin's new password. Validates the complexity and ensures it meets common password requirements.
 * @property {Object} confirmNewPassword - String field representing the confirmation of the admin's new password. Ensures it matches the newPassword field.
 * @property {Object} token - String field representing the verification token. Must be a 40-character hexadecimal string.
 * @property {Object} id - ObjectId field representing the admin's ID. Validates that it is a valid ObjectId.
 */
const authSchemaBase = Joi.object({
    name: validationService
        .createStringField(
            adminConstants.lengths.NAME_MIN,
            adminConstants.lengths.NAME_MAX
        )
        .regex(adminConstants.pattern.name)
        .messages({
            'string.pattern.base': `{#label} with value "{#value}" must start with an uppercase letter followed by lowercase letters for each word, separated by a single space if multiple words. No numbers or special characters are allowed.`,
        }),
    email: validationService.emailField,
    password: validationService.passwordField,
    confirmPassword: Joi.valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match',
    }),
    oldPassword: validationService.passwordField,
    newPassword: validationService.passwordField,
    confirmNewPassword: Joi.valid(Joi.ref('newPassword')).messages({
        'any.only': 'New passwords do not match',
    }),
    token: Joi.string()
        .length(40) // Length should be 40 characters for a 20-byte hex string
        .hex() // Validate that the string is a hexadecimal number
        .messages({
            'string.length': `{#label} must be exactly 40 characters long.`,
            'string.hex': `{#label} must only consist of hexadecimal characters (0-9, a-f).`,
            ...customValidationMessage,
        }),
    id: validationService.objectIdField,
}).strict();

/**
 * createNewAdmin - Joi schema for validating the data to create a new admin.
 * Ensures that the name and email fields are required and meet the specified criteria.
 *
 * @function
 */
const createNewAdmin = authSchemaBase.fork(['name', 'email'], (field) =>
    field.required()
);

/**
 * verifyAdmin - Joi schema for validating the data to verify an admin.
 * Ensures that the token field is required and meets the specified criteria.
 *
 * @function
 */
const verifyAdmin = authSchemaBase.fork(['token'], (field) => field.required());

/**
 * resendAdminVerification - Joi schema for validating the data to resend admin verification.
 * Ensures that the id field is required and meets the specified criteria.
 *
 * @function
 */
const resendAdminVerification = authSchemaBase.fork(['id'], (field) =>
    field.required()
);

/**
 * requestNewAdminPassword - Joi schema for validating the data to request a new admin password.
 * Ensures that the email field is required and meets the specified criteria.
 *
 * @function
 */
const requestNewAdminPassword = authSchemaBase.fork(['email'], (field) =>
    field.required()
);

/**
 * resetAdminPassword - Joi schema for validating the data to reset an admin password.
 * Ensures that the oldPassword, newPassword, and confirmNewPassword fields are required and meet the specified criteria.
 *
 * @function
 */
const resetAdminPassword = authSchemaBase.fork(
    ['oldPassword', 'newPassword', 'confirmNewPassword'],
    (field) => field.required()
);

/**
 * login - Joi schema for validating the data for admin login.
 * Ensures that the email and password fields are required and meet the specified criteria.
 *
 * @function
 */
const login = authSchemaBase.fork(['email', 'password'], (field) =>
    field.required()
);

/**
 * adminSchema - An object that holds various Joi validation schemas for admin-related operations.
 * These schemas ensure that the input data for admin endpoints meet the required criteria.
 *
 * @typedef {Object} AdminSchema
 * @property {Object} createNewAdmin - Joi schema for validating the data to create a new admin.
 * @property {Object} verifyAdmin - Joi schema for validating the data to verify an admin.
 * @property {Object} resendAdminVerification - Joi schema for validating the data to resend admin verification.
 * @property {Object} requestNewAdminPassword - Joi schema for validating the data to request a new admin password.
 * @property {Object} resetAdminPassword - Joi schema for validating the data to reset an admin password.
 * @property {Object} login - Joi schema for validating the data for admin login.
 */
const adminSchema = {
    createNewAdmin,
    verifyAdmin,
    resendAdminVerification,
    requestNewAdminPassword,
    resetAdminPassword,
    login,
};

export default adminSchema;
