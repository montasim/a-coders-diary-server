'use strict';

/**
 * @fileoverview This file defines various Joi schemas for validating pronouns-related data. The
 * schemas include base validation for pronouns fields, as well as specific schemas for creating,
 * updating, and querying pronouns. The schemas ensure that data conforms to the required formats,
 * lengths, and patterns, and include custom validation messages for better error reporting.
 */

import Joi from 'joi';

import pronounsConstants from './pronouns.constant.js';
import customValidationMessage from '../../../shared/customValidationMessage.js';
import validationService from '../../../service/validation.service.js';

/**
 * pronounsSchemaBase - Base Joi schema for validating pronouns-related fields. This schema includes:
 *
 * - name: String (trimmed, minLength, maxLength, matched against a pattern)
 * - page: String (minLength, default value, custom parsing to integer)
 * - limit: String (minLength, maxLength, default value, custom parsing to integer)
 * - sort: String (trimmed, default value)
 * - isActive: Boolean
 * - createdBy: ObjectId
 * - updatedBy: ObjectId
 * - createdAt: Date
 * - updatedAt: Date
 *
 * This schema is used as the base for more specific pronouns schemas.
 */
const pronounsSchemaBase = Joi.object({
    name: validationService
        .createStringField(
            pronounsConstants.lengths.NAME_MIN,
            pronounsConstants.lengths.NAME_MAX
        )
        .regex(pronounsConstants.pattern.NAME)
        .messages({
            'string.empty': 'Name cannot be empty.',
            'string.min': `Name must be at least ${pronounsConstants.lengths.NAME_MIN} characters long.`,
            'string.max': `Name cannot be more than ${pronounsConstants.lengths.NAME_MAX} characters long.`,
            'string.pattern.base':
                'Name must only contain alphabetic characters and appropriate separators like spaces. For example, "Male", "Female".',
            'any.required': 'Name is required.',
        }),
    page: Joi.string()
        .min(1)
        .default(1)
        .custom((value, helpers) => parseInt(value)),
    limit: Joi.string()
        .min(1)
        .max(100)
        .default(10)
        .custom((value, helpers) => parseInt(value)),
    sort: Joi.string().trim().default('createdAt'),
    isActive: validationService.booleanField,
    createdBy: validationService.objectIdField,
    updatedBy: validationService.objectIdField,
    createdAt: validationService.dateField,
    updatedAt: validationService.dateField,
}).strict();

/**
 * createPronounsSchema - Joi schema for validating data when creating a pronoun. This schema
 * makes the 'name' and 'isActive' fields required.
 */
const createPronounsSchema = pronounsSchemaBase.fork(
    ['name', 'isActive'],
    (field) => field.required()
);

/**
 * updatePronounsSchema - Joi schema for validating data when updating a pronoun. This schema
 * makes all fields optional and requires at least one field to be provided.
 */
const updatePronounsSchema = pronounsSchemaBase
    .fork(Object.keys(pronounsSchemaBase.describe().keys), (field) =>
        field.optional()
    )
    .min(1);

/**
 * pronounsIdsParamSchema - Joi schema for validating a list of pronouns IDs passed as a parameter.
 * This schema ensures that the 'ids' field is an array of valid ObjectIds and includes custom validation
 * messages.
 */
const pronounsIdsParamSchema = Joi.object({
    ids: validationService.objectIdsField.required(),
})
    .required()
    .messages(customValidationMessage);

/**
 * getPronounsQuerySchema - Joi schema for validating query parameters when retrieving pronouns.
 * This schema makes all fields optional and uses the base pronouns schema for validation.
 */
const getPronounsQuerySchema = pronounsSchemaBase.fork(
    [
        'name',
        'isActive',
        'page',
        'limit',
        'sort',
        'createdBy',
        'updatedBy',
        'createdAt',
        'updatedBy',
    ],
    (field) => field.optional()
);

/**
 * pronounsIdParamSchema - Joi schema for validating a single pronouns ID passed as a parameter.
 * This schema ensures that the 'pronounsId' field is a valid ObjectId.
 */
const pronounsIdParamSchema = Joi.object({
    pronounsId: validationService.objectIdField.required(),
}).strict();

/**
 * pronounsSchema - Object containing all the defined Joi schemas for pronouns validation:
 *
 * - createPronounsSchema: Schema for validating data when creating a pronoun.
 * - updatePronounsSchema: Schema for validating data when updating a pronoun.
 * - getPronounsQuerySchema: Schema for validating query parameters when retrieving pronouns.
 * - pronounsIdsParamSchema: Schema for validating a list of pronouns IDs passed as a parameter.
 * - pronounsIdParamSchema: Schema for validating a single pronouns ID passed as a parameter.
 */
const pronounsSchema = {
    createPronounsSchema,
    updatePronounsSchema,
    getPronounsQuerySchema,
    pronounsIdsParamSchema,
    pronounsIdParamSchema,
};

export default pronounsSchema;
