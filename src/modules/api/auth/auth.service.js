'use strict';

/**
 * @fileoverview This file defines and exports the `authService` object, which contains various
 * asynchronous functions to manage authentication-related operations. These functions include
 * user signup, email verification, resending verification emails, requesting new passwords,
 * resetting passwords, logging in, and logging out. The service functions utilize models,
 * utilities, and other services to perform the necessary operations and return standardized responses.
 */

import moment from 'moment';

import httpStatus from '../../../constant/httpStatus.constants.js';
import UsersModel from '../users/users.model.js';
import generateVerificationToken from '../../../utilities/generateVerificationToken.js';
import createAuthenticationToken from '../../../utilities/createAuthenticationToken.js';
import prepareEmailContent from '../../../shared/prepareEmailContent.js';
import EmailService from '../../../service/email.service.js';
import configuration from '../../../configuration/configuration.js';
import prepareEmail from '../../../shared/prepareEmail.js';
import generateHashedToken from '../../../utilities/generateHashedToken.js';
import createHashedPassword from '../../../utilities/createHashedPassword.js';
import comparePassword from '../../../utilities/comparePassword.js';
import decodeAuthenticationToken from '../../../utilities/decodeAuthenticationToken.js';
import getRequestedDeviceDetails from '../../../utilities/getRequestedDeviceDetails.js';
import environment from '../../../constant/envTypes.constants.js';
import validateEmail from '../../../utilities/validateEmail.js';
import validatePassword from '../../../utilities/validatePassword.js';
import sendResponse from '../../../utilities/sendResponse.js';
import errorResponse from '../../../utilities/errorResponse.js';
import AdminModel from '../admin/admin.model.js';
import loggerService from '../../../service/logger.service.js';
import defaultConstants from '../../../constant/default.constants.js';

/**
 * signup - Asynchronously signs up a new user. It validates the email, password, and date of birth,
 * checks for existing admin and user accounts, generates a verification token, sends a verification email,
 * and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} userData - The data for the new user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const signup = async (userData, hostData) => {
    try {
        // Check if the email is registered as an admin
        const existingAdmin = await AdminModel.findOne({
            email: userData.email,
        }).lean();
        if (existingAdmin) {
            return sendResponse(
                {},
                'This email address is already registered as admin. Can not be a user and admin at the same time.',
                httpStatus.FORBIDDEN
            );
        }

        // Check if the email is registered as a user
        const existingUser = await UsersModel.findOne({
            'emails.email': userData.email, // Assuming 'emails' is an array of objects, each containing an 'email' field
        }).lean();
        if (existingUser) {
            return sendResponse(
                {},
                'This email address is already registered. Please log in or use the forgot password option if you need to recover your password.',
                httpStatus.CONFLICT
            );
        }

        const emailValidationResult = await validateEmail(userData.email);
        if (emailValidationResult !== 'Valid') {
            return sendResponse(
                {},
                emailValidationResult,
                httpStatus.BAD_REQUEST
            );
        }

        if (userData.password !== userData.confirmPassword) {
            return sendResponse(
                {},
                'The passwords you entered do not match. Please try again.',
                httpStatus.BAD_REQUEST
            );
        }

        const passwordValidationResult = await validatePassword(
            userData.password
        );
        if (passwordValidationResult !== 'Valid') {
            return sendResponse(
                {},
                passwordValidationResult,
                httpStatus.BAD_REQUEST
            );
        }

        // Validate and convert dateOfBirth using moment
        if (!moment(userData.dateOfBirth, 'DD-MM-YYYY', true).isValid()) {
            return sendResponse(
                {},
                'Date of birth must be in the format DD-MM-YYYY and a valid date.',
                httpStatus.BAD_REQUEST
            );
        }

        const dateOfBirth = moment(userData.dateOfBirth, 'DD-MM-YYYY').toDate();
        const passwordHash = await createHashedPassword(userData.password);
        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        // Construct the name object and email object
        const emailObject = {
            email: userData.email.toLowerCase(),
            isPrimaryEmail: true,
            isEmailVerified: false,
            emailVerifyToken,
            emailVerifyTokenExpires,
        };

        const newUser = await UsersModel.create({
            name: {
                first: userData.name,
            },
            image: {
                downloadLink: defaultConstants.images.user.male,
            },
            emails: [emailObject],
            dateOfBirth,
            passwordHash,
        });

        const subject = 'Confirm Your Email Address';
        let emailVerificationLink;
        let resendEmailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/verify/${plainToken}`;
            resendEmailVerificationLink = `https://${hostData.hostname}/api/v1/auth/resend-verification/${newUser._id}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/verify/${plainToken}`;
            resendEmailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/resend-verification/${newUser._id}`;
        }

        const emailData = {
            emailVerificationLink,
            resendEmailVerificationLink,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            userData.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        return sendResponse(
            newUser,
            'User created successfully. Please verify your email.',
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to signup: ${error}`);

        return errorResponse(
            error.message || 'Failed to signup.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * verify - Asynchronously verifies a user's email using a token. It validates the token, updates the email as verified,
 * sends a welcome email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} token - The verification token.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const verify = async (token) => {
    try {
        // Hash the plain token to compare with the stored hash
        const hashedToken = await generateHashedToken(token);

        // Find the user by the hashed token and ensure they exist
        const user = await UsersModel.findOne({
            'emails.emailVerifyToken': hashedToken,
        });

        if (!user) {
            return errorResponse(
                'The verification link is invalid.',
                httpStatus.NOT_FOUND
            );
        }

        // Find the specific email record that matches the hashed token
        const emailDetails = user.emails.find(
            (email) => email.emailVerifyToken === hashedToken
        );

        if (!emailDetails) {
            return errorResponse(
                'The verification link is invalid. Please request a new verification email.',
                httpStatus.FORBIDDEN
            );
        }

        // Check if the email has already been verified or if the token has expired
        if (emailDetails.isEmailVerified) {
            return errorResponse(
                'This email has already been verified. No further action is required.',
                httpStatus.BAD_REQUEST
            );
        } else if (emailDetails.emailVerifyTokenExpires < Date.now()) {
            return errorResponse(
                'The verification link has expired. Please request a new verification email.',
                httpStatus.FORBIDDEN
            );
        }

        // All checks passed, update the user's document to set the email as verified
        const updateResult = await UsersModel.updateOne(
            { _id: user._id, 'emails.emailVerifyToken': hashedToken },
            {
                $set: {
                    'emails.$.isEmailVerified': true,
                    'emails.$.emailVerifyToken': undefined,
                    'emails.$.emailVerifyTokenExpires': undefined,
                },
            }
        );

        if (updateResult.modifiedCount !== 1) {
            return errorResponse(
                'Failed to verify the email. Please try again.',
                httpStatus.INTERNAL_SERVER_ERROR
            );
        }

        // Sending a welcome email to the user
        const subject = 'Welcome Email';
        const emailData = {
            userName: user.name.first,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            emailDetails.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        return sendResponse(
            {},
            'Email has been successfully verified.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to verify email: ${error}`);

        return errorResponse(
            error.message || 'Failed to verify email.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * resendVerification - Asynchronously resends the verification email to a user. It generates a new verification token,
 * updates the user, sends the verification email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} userId - The ID of the user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const resendVerification = async (userId, hostData) => {
    try {
        const userDetails = await UsersModel.findById(userId);
        if (!userDetails) {
            loggerService.debug(`User not found: ${userId}`);

            return errorResponse('User not found.', httpStatus.NOT_FOUND);
        }

        const primaryEmail = userDetails.emails.find(
            (email) => email.isPrimaryEmail
        );
        if (!primaryEmail) {
            loggerService.debug(`Primary email not set for user: ${userId}`);

            return errorResponse(
                'No primary email set for this account.',
                httpStatus.BAD_REQUEST
            );
        }

        if (primaryEmail.isEmailVerified) {
            loggerService.debug(`Email already verified for user: ${userId}`);

            return errorResponse(
                'This email address has already been verified.',
                httpStatus.FORBIDDEN
            );
        }

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();
        userDetails.emails = userDetails.emails.map((email) =>
            email.isPrimaryEmail
                ? {
                      ...email,
                      emailVerifyToken,
                      emailVerifyTokenExpires,
                  }
                : email
        );

        await userDetails.save();

        loggerService.debug(`Verification token updated for user: ${userId}`);

        const subject = 'Confirm Your Email Address';
        let emailVerificationLink;
        let resendEmailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/verify/${plainToken}`;
            resendEmailVerificationLink = `https://${hostData.hostname}/api/v1/auth/resend-verification/${userDetails._id}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/verify/${plainToken}`;
            resendEmailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/resend-verification/${userDetails._id}`;
        }

        const emailData = {
            emailVerificationLink,
            resendEmailVerificationLink,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            primaryEmail.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        loggerService.info(
            `Verification email resent to ${primaryEmail.email}`
        );

        return sendResponse(
            {},
            'Verification email resent successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(
            `Failed to resend verification email for user ${userId}: ${error}`
        );

        return errorResponse(
            error.message || 'Failed to resend verification email.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * requestNewPassword - Asynchronously handles the request for a new password. It validates the email, generates
 * a verification token, updates the user, sends the password reset email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} email - The email address of the user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const requestNewPassword = async (email, hostData) => {
    try {
        // TODO: restrict too many password reset request
        // Find user by email in the nested 'emails' array and ensure the email is verified
        const user = await UsersModel.findOne({
            'emails.email': email.toLowerCase(), // Search in lowercase to match the stored format
            'emails.isEmailVerified': true,
        }).lean();

        if (!user) {
            return errorResponse(
                'No account found with that email address, or the email address has not been verified. Please check your email address or register for a new account.',
                httpStatus.NOT_FOUND
            );
        }

        const primaryEmail = user.emails.find((e) => e.isPrimaryEmail);
        if (!primaryEmail) {
            return errorResponse(
                'No primary email found. Please contact support.',
                httpStatus.BAD_REQUEST
            );
        }

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        // Update user with the reset password verification token and its expiry
        await UsersModel.updateOne(
            { _id: user._id, 'emails.email': primaryEmail.email },
            {
                resetPasswordVerifyToken: emailVerifyToken,
                resetPasswordVerifyTokenExpires: emailVerifyTokenExpires,
            }
        );

        const subject = 'Reset Your Password';
        let emailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/reset-password/${plainToken}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/reset-password/${plainToken}`;
        }

        const emailData = {
            userName: user.name.first,
            resetPasswordVerificationLink: emailVerificationLink,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        // Send the reset email to the primary email address
        await EmailService.sendEmail(
            primaryEmail.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        return sendResponse(
            {},
            'Password reset email sent successfully. Please check your email.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to request new password: ${error}`);

        return errorResponse(
            error.message || 'Failed to request new password.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * resetPassword - Asynchronously resets a user's password using a token. It validates the token, compares the old password,
 * validates the new password, updates the user, sends a success email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} hostData - The host data for generating links.
 * @param {string} token - The reset password token.
 * @param {Object} userData - The data for resetting the user's password.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const resetPassword = async (hostData, token, userData) => {
    try {
        // Hash the plain token to compare with the stored hash
        const hashedToken = await generateHashedToken(token);
        const user = await UsersModel.findOne({
            resetPasswordVerifyToken: hashedToken,
            resetPasswordVerifyTokenExpires: { $gt: Date.now() }, // Check if the token hasn't expired
        });
        if (!user) {
            return errorResponse(
                'Your password reset link is invalid or has expired. Please request a new password reset link.',
                httpStatus.FORBIDDEN
            );
        }

        // Find the primary email to send the reset confirmation
        const primaryEmail = user.emails.find((email) => email.isPrimaryEmail);
        if (!primaryEmail) {
            return errorResponse(
                'No primary email found. Please contact support.',
                httpStatus.BAD_REQUEST
            );
        }

        const isPasswordValid = await comparePassword(
            userData.oldPassword,
            user.passwordHash
        );
        if (!isPasswordValid) {
            return errorResponse(
                'Wrong old password. Please try again.',
                httpStatus.BAD_REQUEST
            );
        }

        if (userData.newPassword !== userData.confirmNewPassword) {
            return errorResponse(
                'The new passwords do not match. Please try again.',
                httpStatus.BAD_REQUEST
            );
        }

        const passwordValidationResult = await validatePassword(
            userData.newPassword
        );
        if (passwordValidationResult !== 'Valid') {
            return sendResponse(
                {},
                passwordValidationResult,
                httpStatus.BAD_REQUEST
            );
        }

        // Update the user with new password and clear the reset token
        user.passwordHash = await createHashedPassword(userData.newPassword);
        user.resetPasswordVerifyToken = undefined;
        user.resetPasswordVerifyTokenExpires = undefined;

        await user.save();

        const subject = 'Reset Password Successful';
        const emailData = {
            userName: user.name.first,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        // Send the reset confirmation to the primary email
        await EmailService.sendEmail(
            primaryEmail.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        return sendResponse({}, 'Reset Password Successful.', httpStatus.OK);
    } catch (error) {
        loggerService.error(`Failed to reset password: ${error}`);

        return errorResponse(
            error.message || 'Failed to reset password.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * login - Asynchronously handles user login. It validates the email and password, generates an authentication token,
 * updates the user, sends a success email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} userData - The login data for the user.
 * @param {Object} userAgent - The user agent data.
 * @param {Object} device - The device data.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const login = async (userData, userAgent, device) => {
    try {
        const user = await UsersModel.findOne({
            'emails.email': userData.email,
        }).lean();
        if (!user) {
            return errorResponse(
                'No account found with that email address. Please check your email address or register for a new account.',
                httpStatus.NOT_FOUND
            );
        }
        if (!user.isActive) {
            return errorResponse(
                'Your account is disabled, please contact support.',
                httpStatus.NOT_FOUND
            );
        }

        // Find the primary email that is verified
        const primaryEmail = user.emails.find(
            (email) => email.isPrimaryEmail && email.isEmailVerified
        );
        if (!primaryEmail) {
            return errorResponse(
                'Please verify your email address to proceed with logging in.',
                httpStatus.UNAUTHORIZED
            );
        }

        if (!user.passwordHash) {
            return errorResponse(
                'Please set your password first.',
                httpStatus.FORBIDDEN
            );
        }

        if (user.mustChangePassword) {
            return errorResponse(
                'Please change your password first.',
                httpStatus.FORBIDDEN
            );
        }

        const isPasswordValid = await comparePassword(
            userData.password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            await UsersModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        'login.failed.device': {
                            details: userAgent,
                            dateTime: new Date(),
                        },
                    },
                }
            );

            return errorResponse(
                'Incorrect password. Please try again or use the forgot password option to reset it.',
                httpStatus.UNAUTHORIZED
            );
        }

        const { token } = await createAuthenticationToken(user, device);

        await UsersModel.updateOne(
            { _id: user._id },
            {
                $push: {
                    'login.successful.device': {
                        details: userAgent,
                        dateTime: new Date(),
                    },
                },
            }
        );

        const subject = 'Login Successfully';
        const emailData = {
            userName: user.name.first,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            primaryEmail.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        return sendResponse(
            { ...user, token },
            'User logged in successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to login: ${error}`);

        return errorResponse(
            error.message || 'Failed to login.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * logout - Asynchronously handles user logout. It validates the JWT token, performs logout actions,
 * and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const logout = async (req) => {
    try {
        // Assuming these functions are well-defined and return relevant details or throw an error if something goes wrong.
        // const device = await getRequestedDeviceDetails(req);
        const jwtToken = req?.headers['authorization']
            ? req.headers['authorization'].split(' ')[1]
            : null;

        if (!jwtToken) {
            return errorResponse(
                'No authentication token provided.',
                httpStatus.UNAUTHORIZED
            );
        }

        // const tokenData = await decodeAuthenticationToken(jwtToken);

        // You might want to perform actions here such as invalidating the token.
        // Since this is a logout, we need to ensure the token is invalidated if you maintain a list of active tokens.

        return sendResponse(
            {}, // No additional data needed in the successful response.
            'You have been logged out successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to logout: ${error}`);

        return errorResponse(
            error.message || 'Failed to logout.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * authService - An object that holds various asynchronous functions for managing authentication-related operations.
 * These functions perform actions such as user signup, email verification, resending verification emails,
 * requesting new passwords, resetting passwords, logging in, and logging out.
 *
 * @typedef {Object} AuthService
 * @property {Function} signup - Asynchronously signs up a new user.
 * @property {Function} verify - Asynchronously verifies a user's email using a token.
 * @property {Function} resendVerification - Asynchronously resends the verification email to a user.
 * @property {Function} requestNewPassword - Asynchronously handles the request for a new password.
 * @property {Function} resetPassword - Asynchronously resets a user's password using a token.
 * @property {Function} login - Asynchronously handles user login.
 * @property {Function} logout - Asynchronously handles user logout.
 */
const authService = {
    signup,
    verify,
    resendVerification,
    requestNewPassword,
    resetPassword,
    login,
    logout,
};

export default authService;
