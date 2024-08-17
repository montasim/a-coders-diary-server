'use strict';

/**
 * @fileoverview This module provides a custom validator for MongoDB ObjectIds using the Mongoose library.
 * The validator ensures that a given value is a valid MongoDB ObjectId and provides a meaningful error message
 * if the validation fails. This is particularly useful for validating ObjectIds in various schemas and request
 * parameters within an application.
 *
 * The primary functionalities include:
 * - `objectIdValidator`: A helper function that performs the validation check for MongoDB ObjectIds and returns an
 *   appropriate error message if the validation fails.
 * - `customObjectIdValidator`: A higher-order function that generates a custom validator function for a specific
 *   property, leveraging the `objectIdValidator` to perform the actual validation.
 *
 * These functions are designed to be easily integrated into Joi validation schemas, providing a reusable and consistent
 * way to validate MongoDB ObjectIds across different parts of an application. The validator functions ensure that the
 * error messages are specific to the property being validated, enhancing the clarity and usability of the validation
 * feedback.
 */

import mongoose from 'mongoose';

/**
 * Validates a given value to check if it is a valid MongoDB ObjectId.
 * If the value is not a valid ObjectId, it returns a custom error message specifying the property being validated.
 *
 * @param {string} value - The value to be validated.
 * @param {Object} helpers - The Joi helpers object, used to generate custom error messages.
 * @param {string} property - The name of the property being validated.
 * @returns {string} The validated value if it is a valid ObjectId.
 * @throws {Error} If the value is not a valid ObjectId, an error with a custom message is thrown.
 * @example
 * const validationResult = objectIdValidator('507f1f77bcf86cd799439011', helpers, 'userId');
 */
const objectIdValidator = (value, helpers, property) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message(`Invalid ID format for ${property}.`);
    }

    return value;
};

/**
 * Generates a custom validator function for a specific property, leveraging the objectIdValidator to perform the actual validation.
 * This function is intended to be used within Joi validation schemas to validate MongoDB ObjectIds.
 *
 * @param {string} property - The name of the property being validated.
 * @returns {Function} A custom validator function that can be used in a Joi schema.
 * @example
 * const userIdValidator = customObjectIdValidator('userId');
 * const schema = Joi.object({
 *     userId: Joi.string().custom(userIdValidator),
 * });
 */
const customObjectIdValidator = (property) => {
    return (value, helpers) => objectIdValidator(value, helpers, property);
};

export default customObjectIdValidator;
