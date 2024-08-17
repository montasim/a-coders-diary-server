'use strict';

/**
 * @fileoverview This file defines and exports the `adminService` object, which contains various
 * asynchronous functions to manage admin-related operations. These functions include creating a new admin,
 * verifying an admin, resending verification emails, requesting a new password, resetting passwords,
 * logging in, and logging out. The service functions utilize models, utilities, and other services
 * to perform the necessary operations and return standardized responses.
 */

import bcrypt from 'bcrypt';

import AdminModel from './admin.model.js';
import sendResponse from '../../../utilities/sendResponse.js';
import httpStatus from '../../../constant/httpStatus.constants.js';
import validateEmail from '../../../utilities/validateEmail.js';
import generateVerificationToken from '../../../utilities/generateVerificationToken.js';
import configuration from '../../../configuration/configuration.js';
import environment from '../../../constant/envTypes.constants.js';
import prepareEmailContent from '../../../shared/prepareEmailContent.js';
import EmailService from '../../../service/email.service.js';
import prepareEmail from '../../../shared/prepareEmail.js';
import errorResponse from '../../../utilities/errorResponse.js';
import generateHashedToken from '../../../utilities/generateHashedToken.js';
import comparePassword from '../../../utilities/comparePassword.js';
import validatePassword from '../../../utilities/validatePassword.js';
import createHashedPassword from '../../../utilities/createHashedPassword.js';
import generateTempPassword from '../../../utilities/generateTempPassword.js';
import createAuthenticationToken from '../../../utilities/createAuthenticationToken.js';
import UsersModel from '../users/users.model.js';
import loggerService from '../../../service/logger.service.js';
import defaultConstants from '../../../constant/default.constants.js';
import AdminActivityLoggerModel from './adminActivityLogger/adminActivityLogger.model.js';
import adminActivityLoggerConstants from './adminActivityLogger/adminActivityLogger.constants.js';

/**
 * createNewAdmin - Asynchronously creates a new admin user. It validates the email, checks for existing admin and user accounts,
 * generates a verification token, sends a verification email, and logs the admin creation activity.
 *
 * @function
 * @async
 * @param {Object} requester - The user making the request.
 * @param {Object} adminData - The data for the new admin user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const createNewAdmin = async (requester, adminData, hostData) => {
    try {
        const existingAdmin = await AdminModel.findOne({
            email: adminData.email,
        }).lean();
        if (existingAdmin) {
            return sendResponse(
                {},
                'This email address is already registered. Please tell the admin to log in or use the forgot password option if needed to recover password.',
                httpStatus.CONFLICT
            );
        }

        const existingUser = await UsersModel.findOne({
            email: adminData.email,
        }).lean();
        if (existingUser) {
            return sendResponse(
                {},
                'This email address is already registered as user. Can not be a user and admin at the same time.',
                httpStatus.FORBIDDEN
            );
        }

        const emailValidationResult = await validateEmail(adminData.email);
        if (emailValidationResult !== 'Valid') {
            return sendResponse(
                {},
                emailValidationResult,
                httpStatus.BAD_REQUEST
            );
        }

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        const newUser = await AdminModel.create({
            ...adminData,
            image: {
                downloadLink: defaultConstants.images.user.male,
            },
            emailVerifyToken,
            emailVerifyTokenExpires,
        });

        const subject = 'Confirm Your Email Address';
        let emailVerificationLink;
        let resendEmailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/verify/${plainToken}`;
            resendEmailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/resend-verification/${newUser._id}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/verify/${plainToken}`;
            resendEmailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/resend-verification/${newUser._id}`;
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
            adminData.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.CREATE,
            description: `${adminData.email} created successfully.`,
            details: JSON.stringify(newUser),
        });

        return sendResponse(
            newUser,
            'Admin created successfully. Please tell the admin to verify email.',
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to create admin: ${error}`);

        return errorResponse(
            error.message || 'Failed to create admin.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * verifyAdmin - Asynchronously verifies an admin user using a token. It validates the token, sets the email verified flag,
 * generates a temporary password, sends a welcome email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} token - The verification token.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const verifyAdmin = async (token, hostData) => {
    try {
        // Hash the plain token to compare with the stored hash
        const hashedToken = await generateHashedToken(token);
        const adminDetails = await AdminModel.findOne({
            emailVerifyToken: hashedToken,
            emailVerifyTokenExpires: { $gt: Date.now() }, // Check if the token hasn't expired
        });

        if (!adminDetails) {
            return errorResponse(
                'The verification link is invalid or has expired. Please requestBooks a new verification email.',
                httpStatus.FORBIDDEN
            );
        }

        // Set the email verified flag to true and clear the verification token fields
        adminDetails.isEmailVerified = true;
        adminDetails.emailVerifyToken = undefined;
        adminDetails.emailVerifyTokenExpires = undefined;

        // Generate a temporary password
        const tempPassword = generateTempPassword(8, 12);
        // Save the hashed temporary password and set mustChangePassword to true
        adminDetails.passwordHash = await bcrypt.hash(tempPassword, 10);
        adminDetails.mustChangePassword = true;

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        // Update user with the reset password verification token and its expiry
        adminDetails.resetPasswordVerifyToken = emailVerifyToken;
        adminDetails.resetPasswordVerifyTokenExpires = emailVerifyTokenExpires;

        await adminDetails.save();

        let emailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/reset-password/${plainToken}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/reset-password/${plainToken}`;
        }

        const subject = 'Welcome Admin';
        const emailData = {
            userName: adminDetails.name,
            emailVerificationLink,
            tempPassword,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            adminDetails.email,
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
        loggerService.error(`Failed to verify admin: ${error}`);

        return errorResponse(
            error.message || 'Failed to verify admin.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * resendAdminVerification - Asynchronously resends the verification email to an admin user. It generates a new verification token,
 * updates the admin user, sends the verification email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} adminId - The ID of the admin user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const resendAdminVerification = async (adminId, hostData) => {
    try {
        const adminDetails = await AdminModel.findById(adminId);
        if (!adminDetails) {
            return errorResponse('Admin not found.', httpStatus.NOT_FOUND);
        }

        if (adminDetails.isEmailVerified) {
            return errorResponse(
                'This email address has already been verified. No further action is required.',
                httpStatus.FORBIDDEN
            );
        }

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        // Update the user with new verification token and expiry
        adminDetails.emailVerifyToken = emailVerifyToken;
        adminDetails.emailVerifyTokenExpires = emailVerifyTokenExpires;

        await adminDetails.save();

        const subject = 'Confirm Your Email Address';
        let emailVerificationLink;
        let resendEmailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/verify/${plainToken}`;
            resendEmailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/resend-verification/${adminDetails._id}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/verify/${plainToken}`;
            resendEmailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/resend-verification/${adminDetails._id}`;
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
            adminDetails.email,
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
            'Verification email resent successfully.',
            httpStatus.OK
        );
    } catch (error) {
        loggerService.error(`Failed to resend verification: ${error}`);

        return errorResponse(
            error.message || 'Failed to resend verification.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * requestNewAdminPassword - Asynchronously handles the request for a new admin password. It validates the email, generates
 * a verification token, updates the admin user, sends the password reset email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {string} email - The email address of the admin user.
 * @param {Object} hostData - The host data for generating links.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const requestNewAdminPassword = async (email, hostData) => {
    try {
        const adminDetails = await AdminModel.findOne({
            email,
        }).lean();
        if (!adminDetails) {
            return errorResponse(
                'No account found with that email address. Please check your email address or register for a new account.',
                httpStatus.NOT_FOUND
            );
        }

        if (!adminDetails.isEmailVerified) {
            return errorResponse(
                'Your email address has not been verified yet. Please verify your email to proceed with password reset.',
                httpStatus.UNAUTHORIZED
            );
        }

        const { emailVerifyToken, emailVerifyTokenExpires, plainToken } =
            await generateVerificationToken();

        // Update user with the reset password verification token and its expiry
        await AdminModel.updateOne(
            { _id: adminDetails._id },
            {
                resetPasswordVerifyToken: emailVerifyToken,
                resetPasswordVerifyTokenExpires: emailVerifyTokenExpires,
            }
        );

        const subject = 'Reset Your Password';
        let emailVerificationLink;

        if (configuration.env === environment.PRODUCTION) {
            emailVerificationLink = `https://${hostData.hostname}/api/v1/auth/admin/reset-password/${plainToken}`;
        } else {
            emailVerificationLink = `http://${hostData.hostname}:${configuration.port}/api/v1/auth/admin/reset-password/${plainToken}`;
        }

        const emailData = {
            userName: adminDetails.name,
            resetPasswordVerificationLink: emailVerificationLink,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            adminDetails.email,
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
        loggerService.error(`Failed to request password: ${error}`);

        return errorResponse(
            error.message || 'Failed to request password.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * resetAdminPassword - Asynchronously resets an admin password using a token. It validates the token, compares the old password,
 * validates the new password, updates the admin user, sends a success email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} hostData - The host data for generating links.
 * @param {string} token - The reset password token.
 * @param {Object} adminData - The data for resetting the admin password.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const resetAdminPassword = async (hostData, token, adminData) => {
    try {
        // Hash the plain token to compare with the stored hash
        const hashedToken = await generateHashedToken(token);
        const adminDetails = await AdminModel.findOne({
            resetPasswordVerifyToken: hashedToken,
            resetPasswordVerifyTokenExpires: { $gt: Date.now() }, // Check if the token hasn't expired
        });
        if (!adminDetails) {
            return errorResponse(
                'Your password reset link is invalid or has expired. Please requestBooks a new password reset link.',
                httpStatus.FORBIDDEN
            );
        }

        if (!adminDetails.passwordHash) {
            return errorResponse(
                'Please set your password first.',
                httpStatus.FORBIDDEN
            );
        }

        const isPasswordValid = await comparePassword(
            adminData.oldPassword,
            adminDetails.passwordHash
        );
        if (!isPasswordValid) {
            return errorResponse(
                'Wrong old password. Please try again.',
                httpStatus.BAD_REQUEST
            );
        }

        if (adminData.newPassword !== adminData.confirmNewPassword) {
            return errorResponse(
                'The new passwords do not match. Please try again.',
                httpStatus.BAD_REQUEST
            );
        }

        const passwordValidationResult = await validatePassword(
            adminData.newPassword
        );
        if (passwordValidationResult !== 'Valid') {
            return sendResponse(
                {},
                passwordValidationResult,
                httpStatus.BAD_REQUEST
            );
        }

        // Update the user with new password and expiry
        adminDetails.passwordHash = await createHashedPassword(
            adminData.newPassword
        );
        adminDetails.mustChangePassword = false;
        adminDetails.resetPasswordVerifyToken = undefined;
        adminDetails.resetPasswordVerifyTokenExpires = undefined;

        await adminDetails.save();

        const subject = 'Reset Password Successful';
        const emailData = {
            userName: adminDetails.name,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        await EmailService.sendEmail(
            adminDetails.email,
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
        loggerService.error(`Failed to reset password. ${error}`);

        return errorResponse(
            error.message || 'Failed to reset password.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * adminLogin - Asynchronously handles admin user login. It validates the email and password, generates an authentication token,
 * updates the admin user, sends a success email, and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} adminData - The login data for the admin user.
 * @param {Object} userAgent - The user agent data.
 * @param {Object} device - The device data.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const adminLogin = async (adminData, userAgent, device) => {
    try {
        // Consolidate multiple populate calls into a single, efficient query
        const adminDetails = await AdminModel.findOne({
            email: adminData.email,
        })
            .populate({
                path: 'designation',
                populate: {
                    path: 'permissions createdBy updatedBy',
                    select: 'name image department designation isActive',
                },
            })
            .populate(
                'createdBy updatedBy',
                'name image department designation isActive'
            )
            .lean();

        if (!adminDetails) {
            return errorResponse(
                'No account found with that email address. Please check your email address or register for a new account.',
                httpStatus.NOT_FOUND
            );
        }

        // Consolidate checks for email verification, password setup, and change requirement
        if (
            !adminDetails.isEmailVerified ||
            !adminDetails.passwordHash ||
            adminDetails.mustChangePassword
        ) {
            const messages = {
                isEmailVerified:
                    'Please verify your email address to proceed with logging in.',
                passwordHash: 'Please set your password first.',
                mustChangePassword: 'Please change your password first.',
            };
            const statusCodes = {
                isEmailVerified: httpStatus.UNAUTHORIZED,
                passwordHash: httpStatus.FORBIDDEN,
                mustChangePassword: httpStatus.FORBIDDEN,
            };

            for (const key in messages) {
                if (!adminDetails[key]) {
                    return errorResponse(messages[key], statusCodes[key]);
                }
            }
        }

        // Password validation and handling failed login attempt
        const isPasswordValid = await comparePassword(
            adminData.password,
            adminDetails?.passwordHash
        );
        if (!isPasswordValid) {
            await AdminModel.updateOne(
                { _id: adminDetails?._id },
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

        const designation = adminDetails?.designation?._id;
        const { token } = await createAuthenticationToken(
            adminDetails,
            designation,
            device
        );

        // Updating login success details
        await AdminModel.updateOne(
            { _id: adminDetails?._id },
            {
                $push: {
                    'login.successful.device': {
                        details: userAgent,
                        dateTime: new Date(),
                    },
                },
            }
        );

        // Prepare and send success login email
        const subject = 'Login Successfully';
        const emailData = {
            userName: adminDetails?.name,
        };
        const {
            pageTitle,
            preheaderText,
            heroSection,
            mainSection,
            footerContent,
        } = prepareEmailContent(subject, emailData);

        EmailService.sendEmail(
            adminDetails?.email,
            subject,
            prepareEmail(
                pageTitle,
                preheaderText,
                heroSection,
                mainSection,
                footerContent
            )
        );

        // Clean up sensitive data
        [
            'passwordHash',
            'emailVerifyToken',
            'emailVerifyTokenExpires',
            'phoneVerifyToken',
            'phoneVerifyTokenExpires',
            'resetPasswordVerifyToken',
            'resetPasswordVerifyTokenExpires',
        ].forEach((key) => delete adminDetails[key]);

        return sendResponse(
            { ...adminDetails, token },
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
 * adminLogout - Asynchronously handles admin user logout. It validates the JWT token, performs logout actions,
 * and returns a standardized response.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @returns {Promise<Object>} - A promise that resolves to a standardized response.
 */
const adminLogout = async (req) => {
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
 * adminService - An object that holds various asynchronous functions for managing admin-related operations.
 * These functions perform actions such as creating a new admin, verifying an admin, resending verification
 * emails, requesting a new password, resetting passwords, logging in, and logging out.
 *
 * @typedef {Object} AdminService
 * @property {Function} createNewAdmin - Asynchronously creates a new admin user.
 * @property {Function} verifyAdmin - Asynchronously verifies an admin user using a token.
 * @property {Function} resendAdminVerification - Asynchronously resends the verification email to an admin user.
 * @property {Function} requestNewAdminPassword - Asynchronously handles the request for a new admin password.
 * @property {Function} resetAdminPassword - Asynchronously resets an admin password using a token.
 * @property {Function} adminLogin - Asynchronously handles admin user login.
 * @property {Function} adminLogout - Asynchronously handles admin user logout.
 */
const adminService = {
    createNewAdmin,
    verifyAdmin,
    resendAdminVerification,
    requestNewAdminPassword,
    resetAdminPassword,
    adminLogin,
    adminLogout,
};

export default adminService;
