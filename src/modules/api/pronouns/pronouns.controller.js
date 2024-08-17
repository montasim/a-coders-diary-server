'use strict';

/**
 * @fileoverview This file defines the controller functions for managing pronouns. These functions
 * handle the creation, retrieval, updating, and deletion of pronouns by interacting with the
 * pronouns service. Each function utilizes a shared controller to streamline the handling of
 * standard CRUD operations.
 */

import controller from '../../../shared/controller.js';
import pronounsService from './pronouns.service.js';
import routesConstants from '../../../constant/routes.constants.js';

/**
 * pronounsController - Object containing all the defined controller functions for pronouns management:
 *
 * - createPronouns: Controller function to handle the creation of a new pronoun.
 * - getPronounsList: Controller function to handle the retrieval of a list of pronouns.
 * - getPronounsById: Controller function to handle the retrieval of a pronoun by its ID.
 * - updatePronounsById: Controller function to handle the updating of a pronoun by its ID.
 * - deletePronounsById: Controller function to handle the deletion of a pronoun by its ID.
 * - deletePronounsList: Controller function to handle the deletion of a list of pronouns.
 */
const pronounsController = {
    /**
     * createPronouns - Controller function to handle the creation of a new pronoun. This function
     * delegates the creation logic to the pronouns service and uses a shared controller method
     * to handle the request and response.
     *
     * @param {Object} req - The request object containing the pronoun data to create.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    createPronouns: controller.create(pronounsService, 'createPronouns'),

    /**
     * getPronounsList - Controller function to handle the retrieval of a list of pronouns. This function
     * delegates the retrieval logic to the pronouns service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the query parameters.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    getPronounsList: controller.getList(pronounsService, 'getPronounsList'),

    /**
     * getPronounsById - Controller function to handle the retrieval of a pronoun by its ID. This function
     * delegates the retrieval logic to the pronouns service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the pronoun ID.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    getPronounsById: controller.getById(
        pronounsService,
        'getPronounsById',
        routesConstants.pronouns.params
    ),

    /**
     * updatePronounsById - Controller function to handle the updating of a pronoun by its ID. This function
     * delegates the update logic to the pronouns service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the pronoun ID and update data.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    updatePronounsById: controller.updateById(
        pronounsService,
        'updatePronounsById',
        routesConstants.pronouns.params
    ),

    /**
     * deletePronounsById - Controller function to handle the deletion of a pronoun by its ID. This function
     * delegates the deletion logic to the pronouns service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the pronoun ID.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    deletePronounsById: controller.deleteById(
        pronounsService,
        'deletePronounsById',
        routesConstants.pronouns.params
    ),

    /**
     * deletePronounsList - Controller function to handle the deletion of a list of pronouns. This function
     * delegates the deletion logic to the pronouns service and uses a shared controller method to handle
     * the request and response.
     *
     * @param {Object} req - The request object containing the list of pronoun IDs.
     * @param {Object} res - The response object to send the result or error.
     * @param {Function} next - The next middleware function in the stack.
     */
    deletePronounsList: controller.deleteList(
        pronounsService,
        'deletePronounsList'
    ),
};

export default pronounsController;
