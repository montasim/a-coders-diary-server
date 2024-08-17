'use strict';

/**
 * @fileoverview This file defines the Mongoose schema for the Permissions model. The schema includes
 * fields for permission details, such as name and status, and includes shared schema components for
 * consistent fields like isActive, createdBy, and updatedBy. The schema also features unique indexing
 * on the name field, and middleware for validation and error handling.
 */

import mongoose from 'mongoose';

import permissionsConstants from './permissions.constant.js';
import sharedSchema from '../../../shared/schema.js';

/**
 * permissionSchema - Mongoose schema for the Permissions model. This schema defines the structure
 * and constraints for storing permission-related data in the database. It includes:
 *
 * - name: String (required, unique, trimmed, lowercased, minlength, maxlength, matched against a pattern)
 * - isActive: Shared schema for active status
 * - createdBy: Shared schema for created by admin details
 * - updatedBy: Shared schema for updated by admin details
 *
 * The schema also includes automatic timestamping for creation and updates,
 * and ensures uniqueness of the name field.
 */
const permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            sparse: true,
            required: [true, 'Please provide a name for the permission.'],
            minlength: [
                permissionsConstants.lengths.NAME_MIN,
                `Permission name must be at least ${permissionsConstants.lengths.NAME_MIN} characters long.`,
            ],
            maxlength: [
                permissionsConstants.lengths.NAME_MAX,
                `Permission name must not exceed ${permissionsConstants.lengths.NAME_MAX} characters.`,
            ],
            match: [
                permissionsConstants.pattern.name,
                'Invalid permission name format. Please use a valid format.',
            ],
            description:
                'Name of the permission. Must be unique and conform to specified format constraints.',
        },
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
permissionSchema.index({ name: 1 }, { unique: true });

/**
 * Pre-save and update Middleware - A middleware that runs before save and update operations to
 * ensure the presence of createdBy and updatedBy fields. Throws an error if these fields are missing.
 *
 * @param {Function} next - The next middleware function in the stack.
 * @throws {Error} - Throws an error if createdBy or updatedBy fields are missing.
 */
permissionSchema.pre(['save', 'findOneAndUpdate'], function (next) {
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
 * that the permission name already exists.
 *
 * @param {Error} error - The error object passed to the middleware.
 * @param {Document} doc - The document being processed.
 * @param {Function} next - The next middleware function in the stack.
 */
permissionSchema.post(['save', 'findOneAndUpdate'], (error, doc, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Permission name already exists.'));
    } else {
        next(error);
    }
});

const PermissionsModel = mongoose.model('Permissions', permissionSchema);

export default PermissionsModel;
