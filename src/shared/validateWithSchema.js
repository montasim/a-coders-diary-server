'use strict';

/**
 * @fileoverview This module provides a middleware function to validate request data against predefined Joi schemas.
 * It wraps the validation process in an asynchronous error handling service to manage exceptions seamlessly.
 * The middleware is flexible, allowing for the validation of different parts of the request object (e.g., body, query, params) by configuring it with appropriate schemas.
 * This approach ensures that incoming data conforms to expected formats before reaching route handlers, enhancing data integrity and security within the application.
 */

import asyncErrorHandlerService from '../service/asyncErrorHandler.service.js';
import customValidationMessage from './customValidationMessage.js';
import httpStatus from '../constant/httpStatus.constants.js';

/**
 * @function validateWithSchema
 * A middleware generator function that creates a middleware to validate specified properties of the request object against provided Joi schemas.
 * It applies custom validation messages and allows configuration of Joi validation options. If validation fails, it sends a formatted error response; otherwise, it sanitizes the data by type conversion and proceeds to the next middleware.
 *
 * @param {Array} schemas - An array of objects, each containing a `schema` to validate against and a `property` of the request object to apply the schema to.
 * @param {Object} [options] - Optional configuration for Joi validation, such as `abortEarly`, `convert`, and custom messages.
 * @returns {Function} Returns an express middleware function that handles validation for the request.
 */
const validateWithSchema = (schemas, options = {}) => {
    return asyncErrorHandlerService(async (req, res, next) => {
        const defaultOptions = {
            abortEarly: false,
            convert: true,
            messages: customValidationMessage,
            ...options,
        };

        for (const { schema, property } of schemas) {
            const { error, value } = schema.validate(
                req[property],
                defaultOptions
            );

            if (error) {
                const errorData = {
                    route: req.originalUrl,
                    timeStamp: new Date(),
                    success: false,
                    data: {},
                    message: error.details
                        .map((detail) => detail.message)
                        .join(', '),
                    status: httpStatus.BAD_REQUEST,
                };

                return res.status(errorData.status).json(errorData);
            }

            // Replace req[property] with the validated and type-converted value
            req[property] = value;
        }

        next();
    });
};

export default validateWithSchema;
