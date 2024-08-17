'use strict';

/**
 * @fileoverview This file defines various Joi schemas for validating roles-related data. The
 * schemas include base validation for role fields, as well as specific schemas for creating,
 * updating, and querying roles. The schemas ensure that data conforms to the required formats,
 * lengths, and patterns, and include custom validation messages for better error reporting.
 */

import Joi from 'joi';

import rolesConstants from './roles.constant.js';
import customValidationMessage from '../../../shared/customValidationMessage.js';
import validationService from '../../../service/validation.service.js';

/**
 * roleSchemaBase - Base Joi schema for validating roles-related fields. This schema includes:
 *
 * - name: String (trimmed, minLength, maxLength, regex pattern)
 * - permissions: Array of ObjectIds referencing the Permissions model
 * - page: String (minLength, default value, custom parsing to integer)
 * - limit: String (minLength, maxLength, default value, custom parsing to integer)
 * - sort: String (trimmed, default value)
 * - isActive: Boolean
 * - createdBy: ObjectId
 * - updatedBy: ObjectId
 * - createdAt: Date
 * - updatedAt: Date
 *
 * This schema is used as the base for more specific roles schemas.
 */
const roleSchemaBase = Joi.object({
    name: validationService
        .createStringField(
            rolesConstants.lengths.NAME_MIN,
            rolesConstants.lengths.NAME_MAX
        )
        .regex(rolesConstants.pattern.name)
        .messages({
            'string.pattern.base': `{#label} with value {#value} must start with an uppercase letter followed by lowercase letters, and must not include numbers or special characters.`,
        }),
    permissions: Joi.array()
        .items(validationService.objectIdsField.required())
        .required()
        .messages({
            'any.custom': 'Invalid permission ID format.',
            ...customValidationMessage,
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
 * createRoleSchema - Joi schema for validating data when creating a role. This schema
 * makes the 'name' field required.
 */
const createRoleSchema = roleSchemaBase.fork(['name'], (field) =>
    field.required()
);

/**
 * updateRoleSchema - Joi schema for validating data when updating a role. This schema
 * makes all fields optional and requires at least one field to be provided.
 */
const updateRoleSchema = roleSchemaBase
    .fork(Object.keys(roleSchemaBase.describe().keys), (field) =>
        field.optional()
    )
    .min(1);

/**
 * roleIdsParamSchema - Joi schema for validating a list of role IDs passed as a parameter.
 * This schema ensures that the 'ids' field is an array of valid ObjectIds and includes custom validation
 * messages.
 */
const roleIdsParamSchema = Joi.object({
    ids: validationService.objectIdsField.required(),
})
    .required()
    .messages(customValidationMessage);

/**
 * getRolesQuerySchema - Joi schema for validating query parameters when retrieving roles.
 * This schema makes all fields optional and uses the base roles schema for validation.
 */
const getRolesQuerySchema = roleSchemaBase.fork(
    [
        'name',
        'permissions',
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
 * roleIdParamSchema - Joi schema for validating a single role ID passed as a parameter.
 * This schema ensures that the 'roleId' field is a valid ObjectId.
 */
const roleIdParamSchema = Joi.object({
    roleId: validationService.objectIdField.required(),
}).strict();

/**
 * rolesSchema - Object containing all the defined Joi schemas for roles validation:
 *
 * - createRoleSchema: Schema for validating data when creating a role.
 * - updateRoleSchema: Schema for validating data when updating a role.
 * - getRolesQuerySchema: Schema for validating query parameters when retrieving roles.
 * - roleIdsParamSchema: Schema for validating a list of role IDs passed as a parameter.
 * - roleIdParamSchema: Schema for validating a single role ID passed as a parameter.
 */
const rolesSchema = {
    createRoleSchema,
    updateRoleSchema,
    getRolesQuerySchema,
    roleIdsParamSchema,
    roleIdParamSchema,
};

export default rolesSchema;
