'use strict';

/**
 * @fileoverview This file defines the service functions for managing pronouns. These services include
 * functions for creating, retrieving, updating, and deleting pronouns. The services interact with the
 * Pronouns model and utilize various utilities for logging, response handling, and validation.
 * Additionally, functions for populating related fields and managing pronouns lists are provided.
 */

import PronounsModel from './pronouns.model.js';
import httpStatus from '../../../constant/httpStatus.constants.js';
import errorResponse from '../../../utilities/errorResponse.js';
import sendResponse from '../../../utilities/sendResponse.js';
import isEmptyObject from '../../../utilities/isEmptyObject.js';
import loggerService from '../../../service/logger.service.js';
import service from '../../../shared/service.js';
import AdminActivityLoggerModel from '../admin/adminActivityLogger/adminActivityLogger.model.js';
import adminActivityLoggerConstants from '../admin/adminActivityLogger/adminActivityLogger.constants.js';

/**
 * populatePronounsFields - A helper function to populate related fields in the pronouns documents.
 *
 * @param {Object} query - The Mongoose query object.
 * @returns {Promise<Object>} - The query result with populated fields.
 */
const populatePronounsFields = async (query) => {
    return await query
        .populate({
            path: 'createdBy',
            select: 'name image department designation isActive',
        })
        .populate({
            path: 'updatedBy',
            select: 'name image department designation isActive',
        });
};

const pronounsListParamsMapping = {};

/**
 * createPronouns - Service function to create a new pronoun. This function checks for the existence
 * of a pronoun with the same name, creates the pronoun if it doesn't exist, and logs the creation action.
 *
 * @param {Object} requester - The user creating the pronoun.
 * @param {Object} newPronounsData - The data for the new pronoun.
 * @returns {Promise<Object>} - The created pronoun or an error response.
 */
const createPronouns = async (requester, newPronounsData) => {
    try {
        const exists = await PronounsModel.exists({
            name: newPronounsData.name,
        });
        if (exists) {
            return sendResponse(
                {},
                `Pronouns name "${newPronounsData.name}" already exists.`,
                httpStatus.BAD_REQUEST
            );
        }

        newPronounsData.createdBy = requester;

        const newPronouns = await PronounsModel.create(newPronounsData);
        // Populate the necessary fields after creation
        const populatedPronouns = await populatePronounsFields(
            PronounsModel.findById(newPronouns._id)
        );

        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.CREATE,
            description: `${newPronounsData.name} created successfully.`,
            details: JSON.stringify(populatedPronouns),
        });

        return sendResponse(
            populatedPronouns,
            'Pronouns created successfully.',
            httpStatus.CREATED
        );
    } catch (error) {
        loggerService.error(`Failed to create pronouns: ${error}`);

        return errorResponse(
            error.message || 'Failed to create pronouns.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * getPronounsList - Service function to retrieve a list of pronouns based on provided parameters.
 * This function utilizes a shared service to handle the retrieval and mapping of parameters.
 *
 * @param {Object} params - The query parameters for retrieving the pronouns list.
 * @returns {Promise<Object>} - The retrieved list of pronouns.
 */
const getPronounsList = async (params) => {
    return service.getResourceList(
        PronounsModel,
        populatePronounsFields,
        params,
        pronounsListParamsMapping,
        'pronouns'
    );
};

/**
 * getPronounsById - Service function to retrieve a pronoun by its ID. This function utilizes a shared
 * service to handle the retrieval and population of related fields.
 *
 * @param {String} pronounsId - The ID of the pronoun to retrieve.
 * @returns {Promise<Object>} - The retrieved pronoun or an error response.
 */
const getPronounsById = async (pronounsId) => {
    return service.getResourceById(
        PronounsModel,
        populatePronounsFields,
        pronounsId,
        'pronouns'
    );
};

/**
 * updatePronounsById - Service function to update a pronoun by its ID. This function checks for the
 * existence of the pronoun, updates it with the provided data, and logs the update action.
 *
 * @param {Object} requester - The user updating the pronoun.
 * @param {String} pronounsId - The ID of the pronoun to update.
 * @param {Object} updateData - The data to update the pronoun with.
 * @returns {Promise<Object>} - The updated pronoun or an error response.
 */
const updatePronounsById = async (requester, pronounsId, updateData) => {
    try {
        if (isEmptyObject(updateData)) {
            return errorResponse(
                'Please provide update data.',
                httpStatus.BAD_REQUEST
            );
        }

        updateData.updatedBy = requester;

        // Attempt to update the pronouns
        const updatedPronouns = await PronounsModel.findByIdAndUpdate(
            pronounsId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPronouns) {
            return sendResponse(
                {},
                'Pronouns not found.',
                httpStatus.NOT_FOUND
            );
        }

        // Optionally populate if necessary (could be omitted based on requirements)
        const populatedPronouns = await populatePronounsFields(
            PronounsModel.findById(updatedPronouns._id)
        );

        await AdminActivityLoggerModel.create({
            user: requester,
            action: adminActivityLoggerConstants.actionTypes.UPDATE,
            description: `${pronounsId} updated successfully.`,
            details: JSON.stringify(populatedPronouns),
            affectedId: pronounsId,
        });

        return sendResponse(
            populatedPronouns,
            'Pronouns updated successfully.',
            httpStatus.OK
        );
    } catch (error) {
        // Handle specific errors, like duplicate names, here
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return sendResponse(
                {},
                `Pronouns name "${updateData.name}" already exists.`,
                httpStatus.BAD_REQUEST
            );
        }

        loggerService.error(`Failed to update pronouns: ${error}`);

        return errorResponse(
            error.message || 'Failed to update pronouns.',
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

/**
 * deletePronounsList - Service function to delete a list of pronouns by their IDs. This function
 * utilizes a shared service to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the pronouns.
 * @param {Array<String>} pronounsIds - The IDs of the pronouns to delete.
 * @returns {Promise<Object>} - The result of the deletion process.
 */
const deletePronounsList = async (requester, pronounsIds) => {
    return await service.deleteResourcesByList(
        requester,
        PronounsModel,
        pronounsIds,
        'pronouns'
    );
};

/**
 * deletePronounsById - Service function to delete a pronoun by its ID. This function utilizes a
 * shared service to handle the deletion process.
 *
 * @param {Object} requester - The user deleting the pronoun.
 * @param {String} pronounsId - The ID of the pronoun to delete.
 * @returns {Promise<Object>} - The result of the deletion process.
 */
const deletePronounsById = async (requester, pronounsId) => {
    return service.deleteResourceById(
        requester,
        PronounsModel,
        pronounsId,
        'pronouns'
    );
};

/**
 * pronounsService - Object containing all the defined service functions for pronouns management:
 *
 * - createPronouns: Service function to create a new pronoun.
 * - getPronounsList: Service function to retrieve a list of pronouns based on provided parameters.
 * - getPronounsById: Service function to retrieve a pronoun by its ID.
 * - updatePronounsById: Service function to update a pronoun by its ID.
 * - deletePronounsList: Service function to delete a list of pronouns by their IDs.
 * - deletePronounsById: Service function to delete a pronoun by its ID.
 */
const pronounsService = {
    createPronouns,
    getPronounsList,
    getPronounsById,
    updatePronounsById,
    deletePronounsList,
    deletePronounsById,
};

export default pronounsService;
