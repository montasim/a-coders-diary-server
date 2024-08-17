'use strict';

/**
 * @fileoverview This file defines the validator functions for user appearance operations.
 * The validators ensure that the data provided in the requests conform to the defined Joi schemas.
 * The validation is applied to request bodies for updating user appearance settings.
 */

import validateWithSchema from '../../../../../shared/validateWithSchema.js';
import usersSchema from '../../users.schema.js';

/**
 * Middleware to validate the request body for updating user appearance settings.
 *
 * This function uses the `usersSchema.updateAppearance` schema to validate the request body.
 * It ensures that the data provided in the body conforms to the required formats, lengths, and patterns.
 *
 * @function
 * @name updateAppearance
 * @param {Object} req - The request object containing the body to be validated.
 * @param {Object} res - The response object used to send back validation errors, if any.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {void}
 */
const updateAppearance = validateWithSchema([
    {
        schema: usersSchema.updateAppearance,
        property: 'body',
    },
]);

const userAppearanceValidator = {
    updateAppearance,
};

export default userAppearanceValidator;
