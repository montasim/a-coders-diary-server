'use strict';

/**
 * @fileoverview This file defines the Mongoose schema for the Admin model. The schema includes
 * fields for personal details, contact information, department, designation, authentication
 * details, verification tokens, login and session management, activity tracking, appearance
 * settings, and status indicators. The schema also includes pre-save middleware to prevent
 * updating of certain fields and uses shared schema components for consistency.
 */

import mongoose from 'mongoose';

import adminConstants from './admin.constants.js';
import sharedSchema from '../../../shared/schema.js';

/**
 * adminSchema - Mongoose schema for the Admin model. This schema defines the structure
 * and constraints for storing admin-related data in the database. It includes:
 *
 * - name: String (required, minLength, maxLength)
 * - image: Embedded schema for image details
 * - email: Embedded schema for email details
 * - mobile: Embedded schema for mobile details
 * - address: Embedded schema for address details
 * - department: String (minLength, maxLength)
 * - designation: Embedded schema for role details
 * - passwordHash: String (trimmed)
 * - mustChangePassword: Embedded schema for password change requirement
 * - isEmailVerified: Embedded schema for email verification status
 * - isPhoneVerified: Embedded schema for mobile verification status
 * - emailVerifyToken: Embedded schema for email verification token
 * - emailVerifyTokenExpires: Embedded schema for email verification token expiry
 * - phoneVerifyToken: Embedded schema for mobile verification token
 * - phoneVerifyTokenExpires: Embedded schema for mobile verification token expiry
 * - resetPasswordVerifyToken: Embedded schema for password reset verification token
 * - resetPasswordVerifyTokenExpires: Embedded schema for password reset verification token expiry
 * - login: Embedded schema for login details
 * - sessions: Array of embedded schemas for session details
 * - activities: Array of embedded schemas for activity tracking
 * - appearance: Embedded schema for appearance settings
 * - isActive: Embedded schema for active status
 * - createdBy: Embedded schema for created by admin details
 * - updatedBy: Embedded schema for updated by admin details
 *
 * The schema also includes automatic timestamping for creation and updates,
 * and a pre-update middleware to prevent email updates.
 */
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the name'],
            minlength: [
                adminConstants.lengths.NAME_MIN,
                `name must be at least ${adminConstants.lengths.NAME_MIN} characters long`,
            ],
            maxlength: [
                adminConstants.lengths.NAME_MAX,
                `name must be less than ${adminConstants.lengths.NAME_MAX} characters long`,
            ],
        },
        // TODO: set default image fpr admin
        image: sharedSchema.imageSchema,
        email: sharedSchema.emailSchema,
        mobile: sharedSchema.mobileSchema,
        address: sharedSchema.addressSchema,
        department: {
            type: String,
            minlength: [
                adminConstants.lengths.DEPARTMENT_MIN,
                `department must be at least ${adminConstants.lengths.DEPARTMENT_MIN} characters long`,
            ],
            maxlength: [
                adminConstants.lengths.DEPARTMENT_MAX,
                `department must be less than ${adminConstants.lengths.DEPARTMENT_MAX} characters long`,
            ],
        },

        // designation is the role of the user
        designation: sharedSchema.roleSchema,

        passwordHash: {
            type: String,
            trim: true,
            description:
                'Stores the hashed password for secure authentication.',
        },
        mustChangePassword: sharedSchema.mustChangePasswordSchema,
        isEmailVerified: sharedSchema.isEmailVerifiedSchema,
        isPhoneVerified: sharedSchema.isMobileVerifiedSchema,
        emailVerifyToken: sharedSchema.emailVerifyTokenSchema,
        emailVerifyTokenExpires: sharedSchema.emailVerifyTokenExpiresSchema,
        phoneVerifyToken: sharedSchema.mobileVerifyTokenSchema,
        phoneVerifyTokenExpires: sharedSchema.mobileVerifyTokenExpiresSchema,
        resetPasswordVerifyToken: sharedSchema.resetPasswordVerifyTokenSchema,
        resetPasswordVerifyTokenExpires:
            sharedSchema.resetPasswordVerifyTokenExpiresSchema,

        // Login and Session Management
        login: sharedSchema.loginSchema,
        sessions: [sharedSchema.sessionsSchema],

        // Activity Tracking and Privacy
        activities: [sharedSchema.activitiesSchema],

        // Appearance
        appearance: sharedSchema.appearanceSchema,

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

/**
 * Pre-update Middleware - A middleware that runs before update operations to prevent updating the email field.
 * This middleware checks if the update operation includes a modification to the email field and throws an error
 * if such an update is attempted.
 *
 * @param {Function} next - The next middleware function in the stack.
 * @throws {Error} - Throws an error if an attempt is made to update the email field.
 */
adminSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    const update = this.getUpdate();

    if (update.$set && update.$set.email) {
        throw new Error('updating email is not allowed.');
    }

    next();
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;
