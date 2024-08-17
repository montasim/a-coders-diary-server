'use strict';

/**
 * @fileoverview This file defines the Mongoose schema for logging administrative activities.
 * The schema captures information about user actions, including the user ID, action type,
 * description, additional details, and affected entity IDs. It also includes automatic timestamping
 * for the creation of each log entry.
 */

import mongoose, { Schema } from 'mongoose';

import adminActivityLoggerConstants from './adminActivityLogger.constants.js';

/**
 * adminActivityLoggerSchema - Mongoose schema for logging administrative activities.
 * This schema defines the structure and constraints for storing admin activity logs in the database.
 * It includes:
 *
 * - user: ObjectId (required, reference to Admin)
 * - action: String (required, must be one of the predefined action types)
 * - description: String (required, brief description of the action)
 * - details: Mixed (optional, additional details about the action)
 * - affectedId: Array of ObjectId (optional, IDs of the entities affected by the action)
 *
 * The schema also includes automatic timestamping for the creation of each log entry,
 * but does not update the timestamp on updates.
 */
const adminActivityLoggerSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
            required: [true, 'User ID is required for logging activities.'],
            description: 'The ID of the user who performed the action.',
        },
        action: {
            type: String,
            required: [true, 'Action type must be specified.'],
            enum: Object.values(adminActivityLoggerConstants.actionTypes),
            description:
                'Type of action performed. Must be one of the predefined actions.',
        },
        description: {
            type: String,
            required: [true, 'A description of the action is required.'],
            description:
                'A brief description of the action performed by the user.',
        },
        details: {
            type: Schema.Types.Mixed, // Changed to Mixed to allow any data type
            description: 'Additional details about the action in any format.',
        },
        affectedId: [
            {
                type: Schema.Types.ObjectId,
                description:
                    'ID of the entity affected by the action, if applicable.',
            },
        ],
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
        description:
            'Schema for logging administrative activities, including user actions and system events.',
    }
);

const AdminActivityLoggerModel = mongoose.model(
    'AdminActivityLogger',
    adminActivityLoggerSchema
);

export default AdminActivityLoggerModel;
