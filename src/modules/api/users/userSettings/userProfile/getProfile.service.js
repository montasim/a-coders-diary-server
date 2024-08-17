'use strict';

/**
 * @fileoverview This file defines the service functions for handling operations related to user profiles.
 * The services include methods to retrieve and update user profile details. These functions interact with the `UsersModel`
 * and handle data retrieval, updates, error responses, and logging. Additional utilities are used for file validation and
 * interactions with Google Drive for image uploads.
 */

import UsersModel from '../../users.model.js';
import errorResponse from '../../../../../utilities/errorResponse.js';
import httpStatus from '../../../../../constant/httpStatus.constants.js';
import sendResponse from '../../../../../utilities/sendResponse.js';
import loggerService from '../../../../../service/logger.service.js';
import isEmptyObject from '../../../../../utilities/isEmptyObject.js';
import validateFile from '../../../../../utilities/validateFile.js';
import userConstants from '../../users.constants.js';
import mimeTypesConstants from '../../../../../constant/mimeTypes.constants.js';
import fileExtensionsConstants from '../../../../../constant/fileExtensions.constants.js';
import GoogleDriveService from '../../../../../service/googleDrive.service.js';

/**
 * Retrieves the profile details for the requesting user.
 *
 * This function fetches the profile details of the authenticated user from the `UsersModel`.
 * It removes sensitive data before returning the user details. If the user is not found or an error occurs,
 * it returns an appropriate error response.
 *
 * @async
 * @function
 * @name getProfile
 * @param {string} userId - The ID of the user requesting the profile details.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the user profile details or an error message.
 */
const getProfile = async (userId) => {
    try {
        const user = await UsersModel.findById(userId).lean();
        if (!user) {
            return errorResponse(
                'Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Remove sensitive data, considering the user may have multiple emails
        user.emails.forEach((email) => {
            delete email.emailVerifyToken;
            delete email.emailVerifyTokenExpires;
        });
        user.mobiles.forEach((mobile) => {
            delete mobile.phoneVerifyToken;
            delete mobile.phoneVerifyTokenExpires;
        });
        delete user.passwordHash;
        delete user.resetPasswordVerifyToken;
        delete user.resetPasswordVerifyTokenExpires;

        return sendResponse(user, 'User fetched successfully.', httpStatus.OK);
    } catch (error) {
        loggerService.error(`Failed to get user details: ${error}`);

        return errorResponse(
            error.message || 'Failed to get user details.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * Updates the profile details for the requesting user.
 *
 * This function updates the profile details of the authenticated user in the `UsersModel`.
 * It validates the provided update data and handles image uploads if an image is provided. The function also ensures
 * the user is authenticated and exists. If successful, it returns the updated user data excluding sensitive information.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name updateProfile
 * @param {string} requester - The ID of the user requesting the update.
 * @param {Object} updateData - The data containing the new profile details.
 * @param {Object} userImage - The image file to be uploaded, if provided.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the updated user profile details or an error message.
 */
const updateProfile = async (requester, updateData, userImage) => {
    try {
        // Fetch the existing user; no need to lean() if updates are to be applied.
        const existingUser = await UsersModel.findById(requester);
        if (!existingUser) {
            return errorResponse(
                'Unauthorized. Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Validate provided update data
        if (isEmptyObject(updateData)) {
            return errorResponse(
                'Please provide update data.',
                httpStatus.BAD_REQUEST
            );
        }

        // // Optionally, check if the updates are allowed based on the schema
        // const updatesAllowed = ['name', 'bio', 'username']; // Example fields that can be updated
        // const updates = Object.keys(updateData).filter(key => updatesAllowed.includes(key));
        // if (updates.length === 0) {
        //     return errorResponse('Invalid update fields.', httpStatus.BAD_REQUEST);
        // }

        // Handle image upload and update if provided
        if (userImage) {
            const fileValidationResults = validateFile(
                userImage,
                userConstants.imageSize,
                [mimeTypesConstants.JPG, mimeTypesConstants.PNG],
                [fileExtensionsConstants.JPG, fileExtensionsConstants.PNG]
            );

            if (!fileValidationResults.isValid) {
                return errorResponse(
                    fileValidationResults.message,
                    httpStatus.BAD_REQUEST
                );
            }

            // Remove the old image file if it exists
            const oldFileId = existingUser.image?.fileId;
            if (oldFileId) {
                await GoogleDriveService.deleteFile(oldFileId);
            }

            // Upload new image file
            const newImageData = await GoogleDriveService.uploadFile(userImage);
            if (!newImageData || newImageData instanceof Error) {
                return errorResponse(
                    'Failed to update image.',
                    httpStatus.INTERNAL_SERVER_ERROR
                );
            }

            // Update image data in update object
            updateData.image = {
                fileId: newImageData.fileId,
                shareableLink: newImageData.shareableLink,
                downloadLink: newImageData.downloadLink,
            };
        }

        // Apply updates to the user document
        updateData.updatedBy = requester; // Track who made the update
        const updatedUser = await UsersModel.findByIdAndUpdate(
            requester,
            { $set: updateData },
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
            'User updated successfully.',
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

const userProfileService = {
    getProfile,
    updateProfile,
};

export default userProfileService;
