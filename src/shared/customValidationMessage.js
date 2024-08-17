'use strict';

/**
 * @fileoverview This module provides a set of custom validation messages for use with the Joi validation library.
 * These messages are designed to offer clear and user-friendly feedback for various validation errors, such as empty strings,
 * length constraints, numeric values, arrays, booleans, required fields, and MongoDB ObjectIds.
 *
 * The primary functionalities include:
 * - Predefined validation messages for different types of Joi validation errors, including:
 *   - String validation errors: empty strings, minimum and maximum length constraints.
 *   - Number validation errors: base type, integer type, minimum and maximum value constraints.
 *   - Array validation errors: base type.
 *   - Boolean validation errors: base type.
 *   - Required field errors: any required fields.
 *   - MongoDB ObjectId validation errors: base type.
 *
 * These custom messages enhance the readability and usability of validation feedback by providing specific and contextual
 * information about why a particular validation failed. They can be easily integrated into Joi schemas to standardize
 * validation error messages across the application.
 */

const customValidationMessage = {
    'string.empty': `{#label} cannot be empty.`,
    'string.min': `{#label} should have a minimum length of {#limit}.`,
    'string.max': `{#label} should not exceed a maximum length of {#limit}.`,
    'number.base': `{#label} must be a number.`,
    'number.integer': `{#label} must be an integer.`,
    'number.min': `{#label} should not be less than {#limit}.`,
    'number.max': `{#label} should not exceed {#limit}.`,
    'array.base': `{#label} must be an array.`,
    'boolean.base': '{#label} must be a boolean.',
    'any.required': `{#label} is required.`,
    'objectid.base': `{#label} must be a valid MongoDB ObjectId.`,
};

export default customValidationMessage;
