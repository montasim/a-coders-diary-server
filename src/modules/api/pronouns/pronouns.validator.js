'use strict';

/**
 * @fileoverview This file defines validation middleware for pronouns-related API requests. The
 * middleware functions use Joi schemas to validate request data for creating, retrieving, updating,
 * and deleting pronouns. Each function ensures that the request data conforms to the defined
 * schema before proceeding to the next middleware or controller.
 */

import validateWithSchema from '../../../shared/validateWithSchema.js';
import pronounsSchema from './pronouns.schema.js';

/**
 * createPronouns - Middleware function to validate the request body when creating a new pronoun.
 * This function ensures that the request body contains valid data according to the createPronounsSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const createPronouns = validateWithSchema([
    { schema: pronounsSchema.createPronounsSchema, property: 'body' },
]);

/**
 * getPronounsList - Middleware function to validate the query parameters when retrieving a list of pronouns.
 * This function ensures that the query parameters contain valid data according to the getPronounsQuerySchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getPronounsList = validateWithSchema([
    { schema: pronounsSchema.getPronounsQuerySchema, property: 'query' },
]);

/**
 * getPronounsById - Middleware function to validate the request parameters when retrieving a pronoun by its ID.
 * This function ensures that the request parameters contain a valid pronouns ID according to the pronounsIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const getPronounsById = validateWithSchema([
    {
        schema: pronounsSchema.pronounsIdParamSchema,
        property: 'params',
    },
]);

/**
 * updatePronounsById - Middleware function to validate the request body and parameters when updating a pronoun by its ID.
 * This function ensures that the request body contains valid data according to the updatePronounsSchema and the request
 * parameters contain a valid pronouns ID according to the pronounsIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const updatePronounsById = validateWithSchema([
    { schema: pronounsSchema.pronounsIdParamSchema, property: 'params' },
    { schema: pronounsSchema.updatePronounsSchema, property: 'body' },
]);

/**
 * deletePronounsList - Middleware function to validate the query parameters when deleting a list of pronouns.
 * This function ensures that the query parameters contain valid data according to the pronounsIdsParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deletePronounsList = validateWithSchema([
    {
        schema: pronounsSchema.pronounsIdsParamSchema,
        property: 'query',
    },
]);

/**
 * deletePronounsById - Middleware function to validate the request parameters when deleting a pronoun by its ID.
 * This function ensures that the request parameters contain a valid pronouns ID according to the pronounsIdParamSchema.
 *
 * @param {Object} req - The request object containing the data to validate.
 * @param {Object} res - The response object to send validation errors or proceed with the request.
 * @param {Function} next - The next middleware function in the stack.
 */
const deletePronounsById = validateWithSchema([
    {
        schema: pronounsSchema.pronounsIdParamSchema,
        property: 'params',
    },
]);

/**
 * pronounsValidator - Object containing all the defined validation middleware functions for pronouns:
 *
 * - createPronouns: Middleware function to validate the request body when creating a new pronoun.
 * - getPronounsList: Middleware function to validate the query parameters when retrieving a list of pronouns.
 * - getPronounsById: Middleware function to validate the request parameters when retrieving a pronoun by its ID.
 * - updatePronounsById: Middleware function to validate the request body and parameters when updating a pronoun by its ID.
 * - deletePronounsList: Middleware function to validate the query parameters when deleting a list of pronouns.
 * - deletePronounsById: Middleware function to validate the request parameters when deleting a pronoun by its ID.
 */
const pronounsValidator = {
    createPronouns,
    getPronounsList,
    getPronounsById,
    updatePronounsById,
    deletePronounsList,
    deletePronounsById,
};

export default pronounsValidator;
