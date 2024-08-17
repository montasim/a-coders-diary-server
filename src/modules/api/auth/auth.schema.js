'use strict';

/**
 * @fileoverview This file defines and exports Joi validation schemas for authentication-related operations.
 * These schemas are used to validate the input data for various authentication endpoints, including
 * signup, email verification, resending verification emails, requesting new passwords, resetting passwords, and logging in.
 * The validation schemas utilize the validationService for common field validations and include custom error messages for specific validation rules.
 */

import Joi from 'joi';

import customValidationMessage from '../../../shared/customValidationMessage.js';
import userConstants from '../users/users.constants.js';
import validationService from '../../../service/validation.service.js';

/**
 * authSchemaBase - Base Joi schema for validating common fields used in authentication-related operations.
 * Ensures that fields such as name, dateOfBirth, email, password, confirmPassword, oldPassword, newPassword, confirmNewPassword,
 * token, and id meet the specified criteria.
 *
 * @typedef {Object} AuthSchemaBase
 * @property {Object} name - String field representing the user's name. Must start with an uppercase letter followed by lowercase letters for each word.
 * @property {Object} dateOfBirth - String field representing the user's date of birth. Must be in the format DD-MM-YYYY and a valid date.
 * @property {Object} email - String field representing the user's email address. Validates the format and ensures it meets common email requirements.
 * @property {Object} password - String field representing the user's password. Validates the complexity and ensures it meets common password requirements.
 * @property {Object} confirmPassword - String field representing the confirmation of the user's password. Ensures it matches the password field.
 * @property {Object} oldPassword - String field representing the user's old password. Used for password reset operations.
 * @property {Object} newPassword - String field representing the user's new password. Validates the complexity and ensures it meets common password requirements.
 * @property {Object} confirmNewPassword - String field representing the confirmation of the user's new password. Ensures it matches the newPassword field.
 * @property {Object} token - String field representing the verification token. Must be a 40-character hexadecimal string.
 * @property {Object} id - ObjectId field representing the user's ID. Validates that it is a valid ObjectId.
 */
const authSchemaBase = Joi.object({
    name: validationService
        .createStringField(
            userConstants.lengths.NAME.FIRST_MIN,
            userConstants.lengths.NAME.FIRST_MAX
        )
        .regex(userConstants.pattern.NAME)
        .messages({
            'string.pattern.base': `{#label} with value "{#value}" must start with an uppercase letter followed by lowercase letters for each word, separated by a single space if multiple words. No numbers or special characters are allowed.`,
        }),
    dateOfBirth: Joi.string()
        .regex(userConstants.pattern.DATE_OF_BIRTH)
        .message(
            'Date of birth must be in the format DD-MM-YYYY and a valid date.'
        ),
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
 * signup - Joi schema for validating the data to sign up a new user.
 * Ensures that the name, dateOfBirth, email, password, and confirmPassword fields are required and meet the specified criteria.
 *
 * @function
 */
const signup = authSchemaBase.fork(
    ['name', 'dateOfBirth', 'email', 'password', 'confirmPassword'],
    (field) => field.required()
);

/**
 * verify - Joi schema for validating the data to verify a user's email.
 * Ensures that the token field is required and meets the specified criteria.
 *
 * @function
 */
const verify = authSchemaBase.fork(['token'], (field) => field.required());

/**
 * resendVerification - Joi schema for validating the data to resend the email verification link.
 * Ensures that the id field is required and meets the specified criteria.
 *
 * @function
 */
const resendVerification = authSchemaBase.fork(['id'], (field) =>
    field.required()
);

/**
 * requestNewPassword - Joi schema for validating the data to request a new password.
 * Ensures that the email field is required and meets the specified criteria.
 *
 * @function
 */
const requestNewPassword = authSchemaBase.fork(['email'], (field) =>
    field.required()
);

/**
 * resetPassword - Joi schema for validating the data to reset a password.
 * Ensures that the oldPassword, newPassword, and confirmNewPassword fields are required and meet the specified criteria.
 *
 * @function
 */
const resetPassword = authSchemaBase.fork(
    ['oldPassword', 'newPassword', 'confirmNewPassword'],
    (field) => field.required()
);

/**
 * login - Joi schema for validating the data to log in a user.
 * Ensures that the email and password fields are required and meet the specified criteria.
 *
 * @function
 */
const login = authSchemaBase.fork(['email', 'password'], (field) =>
    field.required()
);

/**
 * authSchema - An object that holds various Joi validation schemas for authentication-related operations.
 * These schemas ensure that the input data for authentication endpoints meet the required criteria.
 *
 * @typedef {Object} AuthSchema
 * @property {Object} signup - Joi schema for validating the data to sign up a new user.
 * @property {Object} verify - Joi schema for validating the data to verify a user's email.
 * @property {Object} resendVerification - Joi schema for validating the data to resend the email verification link.
 * @property {Object} requestNewPassword - Joi schema for validating the data to request a new password.
 * @property {Object} resetPassword - Joi schema for validating the data to reset a password.
 * @property {Object} login - Joi schema for validating the data to log in a user.
 */
const authSchema = {
    signup,
    verify,
    resendVerification,
    requestNewPassword,
    resetPassword,
    login,
};

export default authSchema;
