'use strict';

/**
 * @fileoverview This module implements a middleware function for role-based authentication and authorization
 * within an Express application. It verifies the presence and validity of an authentication token, decodes it,
 * and checks the user's role and optional permissions against the requirements specified for accessing a route.
 * This middleware is crucial for securing routes and ensuring that only authorized users can access certain
 * functionalities or data within the application.
 *
 * The module utilizes various helper functions and constants to perform its duties:
 * - It retrieves authentication tokens from the request headers.
 * - Decodes tokens to extract user information.
 * - Validates user roles and permissions against predefined constants.
 * - Logs all authentication steps, successes, and failures.
 * - Creates structured error messages for different types of authentication failures.
 *
 * By centralizing authentication logic in this middleware, the application maintains a consistent and manageable
 * approach to securing routes, making it easier to update and enforce authentication and authorization rules across
 * the application.
 */

import getAuthenticationToken from '../utilities/getAuthenticationToken.js';
import httpStatus from '../constant/httpStatus.constants.js';
import decodeAuthenticationToken from '../utilities/decodeAuthenticationToken.js';
import validateUserRequest from '../utilities/validateUserRequest.js';
import validateAdminRequest from '../utilities/validateAdminRequest.js';
import validatePermission from '../utilities/validatePermission.js';
import loggerService from '../service/logger.service.js';
import accessTypesConstants from '../constant/accessTypes.constants.js';

// TODO: add proper message for failed authentication including reason

const AUTH_HEADER = 'authorization';

// Helper to create error response data
const createErrorData = (message, status, route) => ({
    timeStamp: new Date(),
    success: false,
    data: {},
    message,
    status,
    route,
});

/**
 * Constructs a middleware function that handles authentication and authorization based on roles and permissions.
 * It ensures that each request to the server is accompanied by a valid authentication token and that the requestor
 * has the appropriate permissions to perform the requested action. This middleware is vital for maintaining the
 * security and integrity of the application, preventing unauthorized access and actions.
 *
 * @module authenticateMiddleware
 * @function
 * @param {String} roleCheck - The role required to access the route, defaults to both user and admin.
 * @param {String|null} requiredPermission - Specific permission needed to perform the requested action, if any.
 * @returns {Function} Express middleware function that authenticates and authorizes requests.
 * @description Provides a middleware for role-based authentication and optional permission checks.
 */
const authenticateMiddleware =
    (roleCheck = accessTypesConstants.BOTH, requiredPermission = null) =>
    async (req, res, next) => {
        loggerService.debug(
            `Starting authentication for route ${req.originalUrl}`
        );

        const token = await getAuthenticationToken(req.headers[AUTH_HEADER]);

        // Early exit if no token is provided
        if (!token) {
            const errorMessage = `Access Denied: No authentication token was found in your request. Please provide a valid token.`;
            loggerService.error(errorMessage);

            return res
                .status(httpStatus.FORBIDDEN)
                .send(
                    createErrorData(
                        errorMessage,
                        httpStatus.FORBIDDEN,
                        req.originalUrl
                    )
                );
        }

        try {
            const decodedData = await decodeAuthenticationToken(token);
            if (!decodedData) {
                const errorMessage = `Authentication Failed: The provided token is invalid or corrupted. ${token}`;
                loggerService.error(errorMessage);

                throw new Error('Invalid token.');
            }

            const requester = decodedData?.currentUser?._id;
            let isAuthorized;

            switch (roleCheck) {
                case accessTypesConstants.ADMIN:
                    isAuthorized = await validateAdminRequest(requester);
                    break;
                case accessTypesConstants.USER:
                    isAuthorized = await validateUserRequest(requester);
                    break;
                case accessTypesConstants.BOTH:
                    isAuthorized =
                        (await validateUserRequest(requester)) ||
                        (await validateAdminRequest(requester));
                    break;
                default:
                    isAuthorized = false;
            }

            // Early exit if not authorized
            if (!isAuthorized) {
                const errorMessage = `Unauthorized Access: You do not have the required role to access this resource. ${requester}`;
                loggerService.warn(errorMessage);

                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(
                        createErrorData(
                            errorMessage,
                            httpStatus.UNAUTHORIZED,
                            req.originalUrl
                        )
                    );
            }

            // Handle permission check if required
            if (requiredPermission) {
                const hasPermission = await validatePermission(
                    decodedData?.currentUser?.designation,
                    requiredPermission
                );
                if (!hasPermission) {
                    const errorMessage = `Permission Denied: You lack the necessary permission ('${requiredPermission}') to perform this action.`;
                    loggerService.warn(errorMessage);

                    return res
                        .status(httpStatus.UNAUTHORIZED)
                        .send(
                            createErrorData(
                                errorMessage,
                                httpStatus.UNAUTHORIZED,
                                req.originalUrl
                            )
                        );
                }
            } else {
                loggerService.info(
                    `No specific permissions required for access to route ${req.originalUrl}`
                );
            }

            req.sessionUser = decodedData; // Attach user info to the request

            loggerService.info(
                `Authentication successful for user ID: ${requester}`
            );

            next();
        } catch (error) {
            loggerService.error(
                `Authentication error: ${error.message} at ${req.originalUrl}`
            );

            return res
                .status(httpStatus.FORBIDDEN)
                .send(
                    createErrorData(
                        `Your session has expired or the token is invalid: ${error.message}. Please login again.`,
                        httpStatus.FORBIDDEN,
                        req.originalUrl
                    )
                );
        }
    };

export default authenticateMiddleware;
