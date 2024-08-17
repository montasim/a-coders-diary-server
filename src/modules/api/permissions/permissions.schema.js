'use strict';

/**
 * @fileoverview This file defines various Joi schemas for validating permissions-related data. The
 * schemas include base validation for permission fields, as well as specific schemas for creating,
 * updating, and querying permissions. The schemas ensure that data conforms to the required formats,
 * lengths, and patterns, and include custom validation messages for better error reporting.
 */

import Joi from 'joi';

import permissionsConstants from './permissions.constant.js';
import customValidationMessage from '../../../shared/customValidationMessage.js';
import validationService from '../../../service/validation.service.js';
import routesConstants from '../../../constant/routes.constants.js';
import generatePermissions from '../../../shared/generatePermissions.js';

const validNames = generatePermissions(routesConstants);

/**
 * permissionSchemaBase - Base Joi schema for validating permission-related fields. This schema includes:
 *
 * - name: String (trimmed, lowercased, minLength, maxLength, matched against a pattern, valid values)
 * - page: String (minLength, default value, custom parsing to integer)
 * - limit: String (minLength, maxLength, default value, custom parsing to integer)
 * - sort: String (trimmed, default value)
 * - isActive: Boolean
 * - createdBy: ObjectId
 * - updatedBy: ObjectId
 * - createdAt: Date
 * - updatedAt: Date
 *
 * This schema is used as the base for more specific permission schemas.
 */
const permissionSchemaBase = Joi.object({
    name: validationService
        .createStringField(
            permissionsConstants.lengths.NAME_MIN,
            permissionsConstants.lengths.NAME_MAX
        )
        .regex(permissionsConstants.pattern.name)
        .valid(...validNames)
        .messages({
            'any.only': `Name must be one of the following: ${validNames.join(', ')}`,
            'string.pattern.base': 'Name must be one of above.',
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
 * createPermissionSchema - Joi schema for validating data when creating a permission. This schema
 * makes the 'name' and 'isActive' fields required.
 */
const createPermissionSchema = permissionSchemaBase.fork(
    ['name', 'isActive'],
    (field) => field.required()
);

/**
 * updatePermissionSchema - Joi schema for validating data when updating a permission. This schema
 * makes all fields optional and requires at least one field to be provided.
 */
const updatePermissionSchema = permissionSchemaBase
    .fork(Object.keys(permissionSchemaBase.describe().keys), (field) =>
        field.optional()
    )
    .min(1);

/**
 * permissionIdsParamSchema - Joi schema for validating a list of permission IDs passed as a parameter.
 * This schema ensures that the 'ids' field is an array of valid ObjectIds and includes custom validation
 * messages.
 */
const permissionIdsParamSchema = Joi.object({
    ids: validationService.objectIdsField.required(),
})
    .required()
    .messages(customValidationMessage);

/**
 * getPermissionsQuerySchema - Joi schema for validating query parameters when retrieving permissions.
 * This schema makes all fields optional and uses the base permission schema for validation.
 */
const getPermissionsQuerySchema = permissionSchemaBase.fork(
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
 * permissionIdParamSchema - Joi schema for validating a single permission ID passed as a parameter.
 * This schema ensures that the 'permissionId' field is a valid ObjectId.
 */
const permissionIdParamSchema = Joi.object({
    permissionId: validationService.objectIdField.required(),
}).strict();

/**
 * permissionsSchema - Object containing all the defined Joi schemas for permissions validation:
 *
 * - createPermissionSchema: Schema for validating data when creating a permission.
 * - updatePermissionSchema: Schema for validating data when updating a permission.
 * - getPermissionsQuerySchema: Schema for validating query parameters when retrieving permissions.
 * - permissionIdsParamSchema: Schema for validating a list of permission IDs passed as a parameter.
 * - permissionIdParamSchema: Schema for validating a single permission ID passed as a parameter.
 */
const permissionsSchema = {
    createPermissionSchema,
    updatePermissionSchema,
    getPermissionsQuerySchema,
    permissionIdsParamSchema,
    permissionIdParamSchema,
};

export default permissionsSchema;
