'use strict';

/**
 * @fileoverview This file defines the service functions for handling operations related to user appearance settings.
 * The services include methods to retrieve and update the appearance settings for a user.
 * These functions interact with the `UsersModel` and handle data retrieval, updates, error responses, and logging.
 */

import UsersModel from '../../users.model.js';
import errorResponse from '../../../../../utilities/errorResponse.js';
import httpStatus from '../../../../../constant/httpStatus.constants.js';
import sendResponse from '../../../../../utilities/sendResponse.js';
import loggerService from '../../../../../service/logger.service.js';

/**
 * Retrieves the appearance settings for the requesting user.
 *
 * This function fetches the appearance settings of the authenticated user from the `UsersModel`.
 * It ensures the user is authenticated and exists in the database. If successful, it returns the appearance settings.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name getAppearance
 * @param {string} requester - The ID of the user requesting the appearance settings.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the appearance settings or an error message.
 */
const getAppearance = async (requester) => {
    try {
        const user = await UsersModel.findById(requester).lean();
        if (!user) {
            return errorResponse(
                'Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Fetch only the appearance data of the user
        const userAppearance = await UsersModel.findById(
            requester,
            'appearance'
        ).lean();
        if (!userAppearance) {
            return errorResponse('User not found.', httpStatus.NOT_FOUND);
        }

        // Successfully retrieved appearance data
        return sendResponse(
            userAppearance.appearance,
            'Appearance data retrieved successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to retrieve appearance data: ${error}`);

        return errorResponse(
            'Failed to retrieve appearance data.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * Updates the appearance settings for the requesting user.
 *
 * This function updates the appearance settings of the authenticated user in the `UsersModel`.
 * It validates the update data, logs the change in the user's activity record, and ensures the user is authenticated and exists.
 * If successful, it returns the updated user data excluding sensitive information.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name updateAppearance
 * @param {string} requester - The ID of the user requesting the update.
 * @param {Object} updateData - The data containing the new appearance settings.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the updated user data or an error message.
 */
const updateAppearance = async (requester, updateData) => {
    try {
        const existingUser = await UsersModel.findById(requester);
        if (!existingUser) {
            return errorResponse(
                'Unauthorized. Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Check if the 'theme' object and 'name' field exists in updateData
        if (!updateData.theme || typeof updateData.theme.name !== 'string') {
            return errorResponse(
                'Invalid or missing theme data.',
                httpStatus.BAD_REQUEST
            );
        }

        // Capture the old theme details
        const oldThemeName =
            existingUser.appearance &&
            existingUser.appearance.theme &&
            existingUser.appearance.theme.name
                ? existingUser.appearance.theme.name
                : 'None';

        const themeUpdate = {
            'appearance.theme.name': updateData.theme.name,
            updatedBy: requester,
        };

        // Prepare the activity record with old and new theme details
        const activityRecord = {
            category: userConstants.activityType.APPEARANCE,
            action: 'update theme',
            details: `Theme updated from '${oldThemeName}' to '${updateData.theme.name}'`,
            metadata: {
                oldTheme: oldThemeName,
                updatedTheme: updateData.theme.name,
            },
            date: new Date(), // Ensure date is set at the time of the operation
        };

        // Update user document with theme change and log activity
        const updatedUser = await UsersModel.findByIdAndUpdate(
            requester,
            {
                $set: themeUpdate,
                $push: { activities: activityRecord }, // Push the new activity to the activities array
            },
            { new: true, runValidators: true }
        ).lean();

        // Remove sensitive data before sending to client
        delete updatedUser.passwordHash;
        delete updatedUser.resetPasswordVerifyToken;
        delete updatedUser.resetPasswordVerifyTokenExpires;
        delete updatedUser.emailVerifyToken;
        delete updatedUser.emailVerifyTokenExpires;

        return sendResponse(
            updatedUser,
            'User theme updated successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to update user: ${error}`);

        return errorResponse(
            'Failed to update user.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const userAppearanceService = {
    getAppearance,
    updateAppearance,
};

export default userAppearanceService;
