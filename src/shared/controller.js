'use strict';

/**
 * @fileoverview This module defines a set of asynchronous controllers used to handle various user-related operations in a web application.
 * Each controller is a higher-order function that utilizes an async error handling service to gracefully manage exceptions and errors that occur during API calls.
 * The controllers cover a range of functionalities including user management (creation, deletion, update), authentication (login, logout, password reset), and data retrieval.
 * These operations often involve interacting with external services or databases, and the controllers are designed to abstract these interactions
 * through a service layer, ensuring the API routes remain clean and maintainable.
 *
 * @description The module exports a 'controller' object containing methods for managing user lifecycle events and authentication processes.
 * Each method in the controller object is implemented using the asyncErrorHandlerService to ensure that errors are caught and handled properly without crashing the server.
 * The controllers are structured to receive data from requests, interact with the service layer, and return appropriate responses to the client.
 * This design helps decouple the network transport layer from the business logic, promoting cleaner and more modular code architecture.
 */

import asyncErrorHandlerService from '../utilities/asyncErrorHandler.js';
import getRequesterId from '../utilities/getRequesterId.js';
import loggerService from '../service/logger.service.js';
import getHostData from '../utilities/getHostData.js';
import getRequestedDeviceDetails from '../utilities/getRequestedDeviceDetails.js';

// TODO: Implement the `controller` log
// TODO: utilize the hostData for every controller

/**
 * @function createNewUser
 * Creates a new user by invoking the provided service function with necessary parameters extracted from the request.
 * Utilizes host data and requester identification for logging and service customization.
 *
 * @param {Object} service - The service object containing business logic for user creation.
 * @param {Function} createFunction - The specific function on the service object to call for creating a new user.
 */
const createNewUser = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const hostData = getHostData(req);
        const newUserData = await service[createFunction](
            requester,
            req.body,
            hostData
        );

        newUserData.route = req.originalUrl;
        res.status(newUserData.status).send(newUserData);
    });

/**
 * @function signup
 * Handles user signup requests. Extracts host data from the request and calls the provided service function.
 *
 * @param {Object} service - The service object containing business logic for user signup.
 * @param {Function} createFunction - The specific function on the service object to handle signup operations.
 */
const signup = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const newUserData = await service[createFunction](req.body, hostData);

        newUserData.route = req.originalUrl;
        res.status(newUserData.status).send(newUserData);
    });

/**
 * @function verify
 * Processes user email verification using a token provided in the request parameters. It retrieves host data for logging.
 *
 * @param {Object} service - The service object containing business logic for user verification.
 * @param {Function} createFunction - The specific function on the service object to verify the user's email.
 */
const verify = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const verifyData = await service[createFunction](
            req.params.token,
            hostData
        );

        verifyData.route = req.originalUrl;
        res.status(verifyData.status).send(verifyData);
    });

/**
 * @function resendVerification
 * Allows users to request another verification email if the first was not received or expired.
 *
 * @param {Object} service - The service object containing business logic for resending verification emails.
 * @param {Function} createFunction - The function responsible for handling the resend verification process.
 */
const resendVerification = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const verificationData = await service[createFunction](
            req.params.id,
            hostData
        );

        verificationData.route = req.originalUrl;
        res.status(verificationData.status).send(verificationData);
    });

/**
 * @function requestNewPassword
 * Provides functionality for users to request a password reset. This function extracts necessary information from the request and passes it to the service layer.
 *
 * @param {Object} service - The service object that contains business logic for password reset requests.
 * @param {Function} createFunction - The specific service function to handle new password requests.
 */
const requestNewPassword = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const requestNewPasswordData = await service[createFunction](
            req.body.email,
            hostData
        );

        requestNewPasswordData.route = req.originalUrl;
        res.status(requestNewPasswordData.status).send(requestNewPasswordData);
    });

/**
 * @function resetPassword
 * Handles user requests to reset their password using a token provided through a previous password reset request.
 *
 * @param {Object} service - The service object containing business logic for resetting passwords.
 * @param {Function} createFunction - The specific function on the service object to reset the user's password.
 */
const resetPassword = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const userData = {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword,
        };
        const requestNewPasswordData = await service[createFunction](
            hostData,
            req.params.token,
            userData
        );

        requestNewPasswordData.route = req.originalUrl;
        res.status(requestNewPasswordData.status).send(requestNewPasswordData);
    });

/**
 * @function login
 * Manages user login requests by validating credentials and generating session information. Records device and host data for security and auditing.
 *
 * @param {Object} service - The service object containing business logic for user login.
 * @param {Function} createFunction - The specific function on the service object to handle user login.
 */
const login = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const device = await getRequestedDeviceDetails(req);
        const loginData = await service[createFunction](
            req.body,
            req.headers['user-agent'],
            device,
            hostData
        );

        loginData.route = req.originalUrl;
        res.status(loginData.status).send(loginData);
    });

/**
 * @function logout
 * Handles user logout requests, ensuring that session data is cleared and logging out is done securely.
 *
 * @param {Object} service - The service object containing business logic for user logout.
 * @param {Function} createFunction - The specific function on the service object to handle user logout.
 */
const logout = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const hostData = getHostData(req);
        const device = await getRequestedDeviceDetails(req);
        const logoutData = await service[createFunction](req, device, hostData);

        logoutData.route = req.originalUrl;
        res.status(logoutData.status).send(logoutData);
    });

/**
 * @function createWithId
 * Creates a resource associated with a specific ID provided in the request parameters. This controller is used when the creation of a resource is dependent on an existing entity.
 *
 * @param {Object} service - The service object containing the business logic.
 * @param {Function} createFunction - The specific function in the service to create the resource.
 * @param {string} resourceId - The parameter name for the resource ID in the request.
 */
const createWithId = (service, createFunction, resourceId) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const paramsId = req.params[resourceId];

        // Determine the params to pass based on the presence of `paramsId`.
        const body = paramsId ? [requester, paramsId] : [requester];

        // Call the service function with the appropriate query.
        const newData = await service[createFunction](...body);

        loggerService.info(
            `Entity created by ${requester} at ${req.originalUrl}`,
            newData
        );

        newData.route = req.originalUrl;
        res.status(newData.status).send(newData);
    });

/**
 * @function create
 * Generic creation controller that can handle requests with or without file uploads as part of the data payload.
 *
 * @param {Object} service - The service object containing business logic for creating resources.
 * @param {Function} createFunction - The specific function on the service object to handle resource creation.
 */
const create = (service, createFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const includesFile = req.file;

        // Determine the body to pass based on the presence of `includesFile`.
        const body = includesFile
            ? [requester, req.body, includesFile]
            : [requester, req.body];

        // Call the service function with the appropriate query.
        const newData = await service[createFunction](...body);

        loggerService.info(
            `Entity created by ${requester} at ${req.originalUrl}`,
            newData
        );

        newData.route = req.originalUrl;
        res.status(newData.status).send(newData);
    });

/**
 * @function getList
 * Retrieves a list of resources based on the query parameters provided by the requester.
 *
 * @param {Object} service - The service object containing business logic for retrieving resource lists.
 * @param {Function} getListFunction - The specific function on the service object to fetch the list of resources.
 */
const getList = (service, getListFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req) || null;

        // Determine the query to pass based on the presence of `requester`.
        const query = requester ? [requester, req.query] : [req.query];

        // Call the service function with the appropriate query.
        const dataList = getListFunction
            ? await service[getListFunction](...query)
            : await service(...query);

        loggerService.info(
            `Entity list retrieved for requester ${requester || 'anonymous'} at ${req.originalUrl}`
        );

        dataList.route = req.originalUrl;
        res.status(dataList.status).send(dataList);
    });

/**
 * @function getById
 * Fetches a specific resource by ID provided in the request parameters, utilizing requester data for access control and logging.
 *
 * @param {Object} service - The service object containing business logic for fetching resources by ID.
 * @param {Function} getByIdFunction - The specific function on the service object to retrieve a resource by ID.
 * @param {string} paramsId - The parameter name for the resource ID in the request.
 */
const getById = (service, getByIdFunction, paramsId) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);

        // Determine the parameters to pass based on the presence of `requester`.
        const params = requester
            ? [requester, req.params[paramsId]]
            : [req.params[paramsId]];

        // Call the service function with the appropriate parameters.
        const data = await service[getByIdFunction](...params);

        loggerService.info(
            `Details retrieved for entity ID ${req.params[paramsId]} by ${requester} at ${req.originalUrl}`
        );

        data.route = req.originalUrl;
        res.status(data.status).send(data);
    });

/**
 * @function getByRequester
 * Retrieves information specific to the requester based on their identification in the system.
 *
 * @param {Object} service - The service object containing business logic for retrieving data by requester ID.
 * @param {Function} getByIdFunction - The specific function on the service object to fetch data for the requester.
 */
const getByRequester = (service, getByIdFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);

        // Call the service function with the appropriate parameters.
        const requesterData = await service[getByIdFunction](requester);

        loggerService.info(
            `Details retrieved for entity ID ${req.params[requester]} by ${requester} at ${req.originalUrl}`
        );

        requesterData.route = req.originalUrl;
        res.status(requesterData.status).send(requesterData);
    });

/**
 * @function updateById
 * Updates a specific resource based on its ID provided in the request parameters, handling complex updates including file uploads.
 *
 * @param {Object} service - The service object containing business logic for updating resources.
 * @param {Function} updateByIdFunction - The specific function on the service object to update a resource by ID.
 * @param {string} paramsId - The parameter name for the resource ID in the request.
 */
const updateById = (service, updateByIdFunction, paramsId) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const includesFile = req.file;

        // Determine the query to pass based on the presence of `requester`.
        const body = includesFile
            ? [requester, paramsId, req.body, includesFile]
            : [requester, paramsId, req.body];

        // Call the service function with the appropriate query.
        const updatedData = await service[updateByIdFunction](...body);

        loggerService.info(
            `Entity ${req.params[paramsId]} updated by ${requester} at ${req.originalUrl}`
        );

        updatedData.route = req.originalUrl;
        res.status(updatedData.status).send(updatedData);
    });

/**
 * @function updateByRequester
 * Updates data specific to the requester, supporting updates that include file uploads.
 *
 * @param {Object} service - The service object containing business logic for updates related to the requester.
 * @param {Function} updateByIdFunction - The specific function on the service object for updating requester-specific data.
 */
const updateByRequester = (service, updateByIdFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const includesFile = req.file;

        // Determine the query to pass based on the presence of `requester`.
        const body = [requester, req.body, includesFile];

        // Call the service function with the appropriate query.
        const updatedData = await service[updateByIdFunction](...body);

        loggerService.info(
            `Entity ${req.params[requester]} updated by ${requester} at ${req.originalUrl}`
        );

        updatedData.route = req.originalUrl;
        res.status(updatedData.status).send(updatedData);
    });

/**
 * @function deleteById
 * Deletes a specific resource by its ID, provided in the request parameters. This controller ensures secure and auditable deletion processes.
 *
 * @param {Object} service - The service object containing business logic for deleting resources.
 * @param {Function} deleteByIdFunction - The specific function on the service object to delete a resource by ID.
 * @param {string} paramsId - The parameter name for the resource ID in the request.
 */
const deleteById = (service, deleteByIdFunction, paramsId) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const deletedData = await service[deleteByIdFunction](
            requester,
            req.params[paramsId]
        );

        loggerService.warn(
            `Entity ${req.params[paramsId]} deleted by ${requester} at ${req.originalUrl}`
        );

        deletedData.route = req.originalUrl;
        res.status(deletedData.status).send(deletedData);
    });

/**
 * @function deleteList
 * Allows for bulk deletion of resources based on a list of IDs provided in the request query. This function ensures efficient and secure deletion of multiple entries.
 *
 * @param {Object} service - The service object containing business logic for bulk deletions.
 * @param {Function} deleteByIdFunction - The specific function on the service object to handle bulk deletions.
 */
const deleteList = (service, deleteByIdFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        const requester = getRequesterId(req);
        const ids = req.query.ids.split(',');
        const deletedListData = await service[deleteByIdFunction](
            requester,
            ids
        );

        loggerService.warn(
            `Multiple entities [${ids.join(', ')}] deleted by ${requester} at ${req.originalUrl}`
        );

        deletedListData.route = req.originalUrl;
        res.status(deletedListData.status).send(deletedListData);
    });

const controller = {
    createNewUser,
    signup,
    verify,
    resendVerification,
    requestNewPassword,
    resetPassword,
    login,
    logout,

    createWithId,
    create,
    getList,
    getById,
    getByRequester,
    updateById,
    updateByRequester,
    deleteById,
    deleteList,
};

export default controller;
