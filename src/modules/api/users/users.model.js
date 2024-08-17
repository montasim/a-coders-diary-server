'use strict';

/**
 * @fileoverview This file defines the Mongoose schema for storing user data.
 * The schema includes fields for system information, core user information, contact information,
 * authentication and security, professional information, social and external accounts, login and session management,
 * activity tracking, privacy settings, and appearance. The schema also includes custom validations and pre-save hooks.
 */

import mongoose, { Schema } from 'mongoose';

import sharedSchema from '../../../shared/schema.js';

// TODO: modular schema definition

/**
 * Schema for storing user email information.
 *
 * @constant
 * @type {mongoose.Schema}
 * @description This schema includes fields for:
 * - email: The email address of the user.
 * - isPrimaryEmail: A flag indicating whether the email is the primary email for the user.
 * - isEmailVerified: A flag indicating whether the email has been verified.
 * - emailVerifyToken: A token used for email verification.
 * - emailVerifyTokenExpires: The expiry date for the email verification token.
 */
const emailSchema = new Schema({
    email: sharedSchema.emailSchema,

    // Flag to indicate primary email
    isPrimaryEmail: sharedSchema.isPrimaryEmailSchema,

    // Verification status of the email
    isEmailVerified: sharedSchema.isEmailVerifiedSchema,

    // Token for email verification
    emailVerifyToken: sharedSchema.emailVerifyTokenSchema,

    // Expiry date for the email verification token
    emailVerifyTokenExpires: sharedSchema.emailVerifyTokenExpiresSchema,
});

/**
 * Schema for storing user mobile information.
 *
 * @constant
 * @type {mongoose.Schema}
 * @description This schema includes fields for:
 * - mobile: The mobile number of the user.
 * - isPrimaryMobile: A flag indicating whether the mobile number is the primary mobile for the user.
 * - isMobileVerified: A flag indicating whether the mobile number has been verified.
 * - mobileVerifyToken: A token used for mobile number verification.
 * - mobileVerifyTokenExpires: The expiry date for the mobile verification token.
 */
const mobileSchema = new Schema({
    mobile: sharedSchema.mobileSchema,

    // Flag to indicate primary mobile
    isPrimaryMobile: sharedSchema.isPrimaryMobileSchema,

    // Verification status of the mobile number
    isMobileVerified: sharedSchema.isMobileVerifiedSchema,

    // Token for mobile number verification
    mobileVerifyToken: sharedSchema.mobileVerifyTokenSchema,

    // Expiry date for the mobile verification token
    mobileVerifyTokenExpires: sharedSchema.mobileVerifyTokenExpiresSchema,
});

/**
 * Schema for storing user data with automatic timestamping for creation and updates.
 *
 * @constant
 * @type {mongoose.Schema}
 * @description This schema includes fields for:
 * - System Information: Numeric ID, User ID
 * - Core User Information: Name, Username, Image, Date of Birth, Bio, Pronouns
 * - Contact Information: Emails, Mobiles, Address
 * - Authentication and Security: Password Hash, Role, Two-Factor Authentication, Password Reset Tokens
 * - Professional Information: Company
 * - Social and External Accounts: URLs, Social Media Accounts, External OAuth
 * - Login and Session Management: Login Details, Sessions
 * - Activity Tracking and Privacy: Activities, Privacy Settings
 * - Appearance: Appearance Settings
 * - Metadata: Active Status, Created By, Updated By
 *
 * The schema also includes custom validation for unique emails and pre-save hooks to prevent email updates after account creation.
 */
const userSchema = new mongoose.Schema(
    {
        // System Information
        // TODO: auto increment the user id sequentially like user-1 user-2
        // Numeric field to hold the incrementing value
        numericId: sharedSchema.numericIdSchema,
        // String field to hold the full ID with prefix
        userId: sharedSchema.userIdSchema,
        // Core User Information
        name: sharedSchema.nameSchema,
        // TODO: validate unique username
        // TODO: suggest unique username when updating
        username: sharedSchema.usernameSchema,
        // TODO: when user sign up set a default image for user
        image: sharedSchema.imageSchema,
        dateOfBirth: sharedSchema.dateOfBirthSchema,
        bio: sharedSchema.bioSchema,
        // TODO: set default pronouns
        pronouns: sharedSchema.pronounsSchema,

        // Contact Information
        emails: [emailSchema],
        mobiles: [mobileSchema],
        address: sharedSchema.addressSchema,

        // Authentication and Security
        passwordHash: sharedSchema.passwordHashSchema,
        // TODO: roles will be one of RolesModel
        role: sharedSchema.roleSchema,
        twoFactorEnabled: sharedSchema.twoFactorEnabledSchema,
        twoFactorSecret: sharedSchema.twoFactorSecretSchema,
        mustChangePassword: sharedSchema.mustChangePasswordSchema,
        resetPasswordVerifyToken: sharedSchema.resetPasswordVerifyTokenSchema,
        resetPasswordVerifyTokenExpires:
            sharedSchema.resetPasswordVerifyTokenExpiresSchema,

        // Professional Information
        company: sharedSchema.companySchema,

        // Social and External Accounts
        url: sharedSchema.urlSchema,
        socialAccounts: {
            facebook: sharedSchema.facebookSchema,
            twitter: sharedSchema.twitterSchema,
            linkedIn: sharedSchema.linkedInSchema,
            github: sharedSchema.githubSchema,
        },
        externalOAuth: sharedSchema.externalOAuthSchema,

        // Login and Session Management
        login: sharedSchema.loginSchema,
        sessions: [sharedSchema.sessionsSchema],

        // Activity Tracking and Privacy
        activities: [sharedSchema.activitiesSchema],
        privacySettings: {
            // TODO: use VisibilityModel
            profileVisibility: sharedSchema.profileVisibilitySchema,
        },

        // Appearance
        appearance: sharedSchema.appearanceSchema,

        isActive: sharedSchema.isActiveSchema,
        // TODO: create a system to initialy create a new user
        createdBy: sharedSchema.createdByAdminSchema,
        // TODO: create a system to update user data with limited access
        // TODO: create a model to define what admin can update about the user
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
 * Custom validation to check the uniqueness of the email.
 *
 * This validation ensures that the email addresses provided for a user are unique across the entire collection.
 * It checks for the existence of other users with the same email addresses and excludes the current document from the check if it's an update.
 *
 * @async
 * @function
 * @name validateEmails
 * @param {Array} emails - The array of email objects to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the validation passed.
 * @throws {Error} - Throws an error if the email addresses are not unique.
 */
userSchema.path('emails').validate(async function (emails) {
    const emailAddresses = emails.map((email) => email.email);
    const userCount = await mongoose.model('Users').countDocuments({
        'emails.email': { $in: emailAddresses },
        _id: { $ne: this._id }, // Exclude the current document from the check if it's an update
    });
    return !userCount; // If there are no users with these emails, the validation passes
}, 'Email already exists.');

/**
 * Pre-save hook to prevent email updates after account creation.
 *
 * This hook checks for attempts to update any email field and throws an error if such an attempt is detected.
 * It ensures that email addresses cannot be changed once the user account has been created.
 *
 * @function
 * @name preSaveHook
 * @param {function} next - The next middleware function in the request-response cycle.
 * @throws {Error} - Throws an error if an attempt to update an email field is detected.
 */
userSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    const update = this.getUpdate();
    // Check for attempts to update any email field
    if (
        update.$set &&
        (update.$set['emails.$.email'] || update.$set['emails'])
    ) {
        throw new Error(
            'Email updates are not permitted after account creation.'
        );
    }

    next();
});

const UsersModel = mongoose.model('Users', userSchema);

export default UsersModel;
