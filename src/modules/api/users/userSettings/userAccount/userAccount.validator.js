'use strict';

/**
 * @fileoverview This file defines the validator functions for user account operations.
 * The validators ensure that the data provided in the requests conform to the defined Joi schemas.
 * The validation is applied to request bodies for deleting user accounts.
 */

import validateWithSchema from '../../../../../shared/validateWithSchema.js';
import usersSchema from '../../users.schema.js';

/**
 * Middleware to validate the request body for deleting a user account.
 *
 * This function uses the `usersSchema.deleteUser` schema to validate the request body.
 * It ensures that the data provided in the body conforms to the required formats, lengths, and patterns.
 *
 * @function
 * @name deleteAccount
 * @param {Object} req - The request object containing the body to be validated.
 * @param {Object} res - The response object used to send back validation errors, if any.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {void}
 */
const deleteAccount = validateWithSchema([
    {
        schema: usersSchema.deleteUser,
        property: 'body',
    },
]);

const usersAccountValidator = {
    deleteAccount,
};

export default usersAccountValidator;
