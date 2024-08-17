'use strict';

/**
 * @fileoverview This file defines the Mongoose schema for the Roles model. The schema includes
 * fields for role details, such as name and permissions, and includes shared schema components
 * for consistent fields like isActive, createdBy, and updatedBy. The schema also features unique
 * indexing on the name field, and middleware for validation and error handling.
 */

import mongoose, { Schema } from 'mongoose';

import rolesConstants from './roles.constant.js';
import sharedSchema from '../../../shared/schema.js';

/**
 * roleSchema - Mongoose schema for the Roles model. This schema defines the structure
 * and constraints for storing role-related data in the database. It includes:
 *
 * - name: String (required, unique, trimmed, minlength, maxlength)
 * - permissions: Array of ObjectIds referencing the Permissions model
 * - isActive: Shared schema for active status
 * - createdBy: Shared schema for created by admin details
 * - updatedBy: Shared schema for updated by admin details
 *
 * The schema also includes automatic timestamping for creation and updates,
 * and ensures uniqueness of the name field.
 */
const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Please provide a name for the role.'],
            minlength: [
                rolesConstants.lengths.NAME_MIN,
                `Role name must be at least ${rolesConstants.lengths.NAME_MIN} characters long.`,
            ],
            maxlength: [
                rolesConstants.lengths.NAME_MAX,
                `Role name cannot exceed ${rolesConstants.lengths.NAME_MAX} characters in length.`,
            ],
            description:
                'The name of the role. It must be unique and conform to specified length constraints.',
        },
        permissions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Permissions',
                description: 'Array of associated permissions.',
            },
        ],
        isActive: sharedSchema.isActiveSchema,
        createdBy: sharedSchema.createdByAdminSchema,
        updatedBy: sharedSchema.updatedByAdminSchema,
    },
    {
        timestamps: true,
        versionKey: false,
        description:
            'Schema for storing user data with automatic timestamping for creation and updates.',
    }
);

// Create a unique index on the name field
roleSchema.index({ name: 1 }, { unique: true });

/**
 * Pre-save and update Middleware - A middleware that runs before save and update operations to
 * ensure the presence of createdBy and updatedBy fields. Throws an error if these fields are missing.
 *
 * @param {Function} next - The next middleware function in the stack.
 * @throws {Error} - Throws an error if createdBy or updatedBy fields are missing.
 */
roleSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    if (
        (this.isNew && !this.createdBy) ||
        (this._update && !this._update.updatedBy)
    ) {
        return next(new Error('Creator or updater is required.'));
    }
    next();
});

/**
 * Error Handling Middleware - A middleware that runs after save and update operations to handle
 * unique constraint violations. If a duplicate name is detected, it throws an error indicating
 * that the role name already exists.
 *
 * @param {Error} error - The error object passed to the middleware.
 * @param {Document} doc - The document being processed.
 * @param {Function} next - The next middleware function in the stack.
 */
roleSchema.post(['save', 'findOneAndUpdate'], (error, doc, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Role name already exists.'));
    } else {
        next(error);
    }
});

const RolesModel = mongoose.model('Roles', roleSchema);

export default RolesModel;
