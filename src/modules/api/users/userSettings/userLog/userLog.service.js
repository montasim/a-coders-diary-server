'use strict';

/**
 * @fileoverview This file defines the service functions for handling operations related to user logs.
 * The services include methods to retrieve various types of user logs including activity logs, security logs,
 * and account logs. These functions interact with the `UsersModel` to filter and return the appropriate log data,
 * and handle error responses and logging.
 */

import UsersModel from '../../users.model.js';
import errorResponse from '../../../../../utilities/errorResponse.js';
import httpStatus from '../../../../../constant/httpStatus.constants.js';
import sendResponse from '../../../../../utilities/sendResponse.js';
import loggerService from '../../../../../service/logger.service.js';
import userConstants from '../../users.constants.js';

/**
 * Retrieves the activity log for the requesting user.
 *
 * This function fetches the activity log of the authenticated user from the `UsersModel`.
 * It filters activities to include only those related to appearance and profile changes.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name getActivityLog
 * @param {string} requester - The ID of the user requesting the activity log.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the activity log or an error message.
 */
const getActivityLog = async (requester) => {
    try {
        const activitiesProjection = {
            activities: {
                $filter: {
                    input: '$activities',
                    as: 'activity',
                    cond: {
                        $or: [
                            {
                                $eq: [
                                    '$$activity.category',
                                    userConstants.activityType.APPEARANCE,
                                ],
                            },
                            {
                                $eq: [
                                    '$$activity.category',
                                    userConstants.activityType.PROFILE,
                                ],
                            },
                        ],
                    },
                },
            },
        };

        const user = await UsersModel.findById(
            requester,
            activitiesProjection
        ).lean();

        if (!user) {
            return errorResponse(
                'Unauthorized. Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Now the user object will only contain the filtered activities
        return sendResponse(
            {
                activities: user.activities,
            },
            'Activities fetched successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get activities: ${error}`);

        return errorResponse(
            error.message || 'Failed to get activities.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * Retrieves the security log for the requesting user.
 *
 * This function fetches the security log of the authenticated user from the `UsersModel`.
 * It filters activities to include only those related to security changes.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name getSecurityLog
 * @param {string} requester - The ID of the user requesting the security log.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the security log or an error message.
 */
const getSecurityLog = async (requester) => {
    try {
        const activitiesProjection = {
            activities: {
                $filter: {
                    input: '$activities',
                    as: 'activity',
                    cond: {
                        $or: [
                            {
                                $eq: [
                                    '$$activity.category',
                                    userConstants.activityType.SECURITY,
                                ],
                            },
                        ],
                    },
                },
            },
        };

        const user = await UsersModel.findById(
            requester,
            activitiesProjection
        ).lean();

        if (!user) {
            return errorResponse(
                'Unauthorized. Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Now the user object will only contain the filtered activities
        return sendResponse(
            {
                activities: user.activities,
            },
            'Activities fetched successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get activities: ${error}`);

        return errorResponse(
            error.message || 'Failed to get activities.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * Retrieves the account log for the requesting user.
 *
 * This function fetches the account log of the authenticated user from the `UsersModel`.
 * It filters activities to include only those related to account changes.
 * If the user is not found or an error occurs, it returns an appropriate error response.
 *
 * @async
 * @function
 * @name getAccountLog
 * @param {string} requester - The ID of the user requesting the account log.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the account log or an error message.
 */
const getAccountLog = async (requester) => {
    try {
        const activitiesProjection = {
            activities: {
                $filter: {
                    input: '$activities',
                    as: 'activity',
                    cond: {
                        $or: [
                            {
                                $eq: [
                                    '$$activity.category',
                                    userConstants.activityType.ACCOUNT,
                                ],
                            },
                        ],
                    },
                },
            },
        };

        const user = await UsersModel.findById(
            requester,
            activitiesProjection
        ).lean();

        if (!user) {
            return errorResponse(
                'Unauthorized. Please login first.',
                httpStatus.UNAUTHORIZED
            );
        }

        // Now the user object will only contain the filtered activities
        return sendResponse(
            {
                activities: user.activities,
            },
            'Activities fetched successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to get activities: ${error}`);

        return errorResponse(
            error.message || 'Failed to get activities.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

const userLogService = {
    getActivityLog,
    getSecurityLog,
    getAccountLog,
};

export default userLogService;
