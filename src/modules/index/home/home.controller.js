'use strict';

/**
 * @fileoverview This module defines the controller for handling operations related to the home service.
 * It leverages the shared controller utilities to retrieve a list of items from the home service.
 *
 * The `homeController` object includes a method to:
 * - Retrieve a list of items from the home service.
 */

import controller from '../../../shared/controller.js';
import homeService from './home.service.js';

/**
 * Retrieves a list of items from the home service.
 *
 * This function uses the `getList` method from the shared controller utilities to fetch a list of items.
 * It delegates the actual service logic to the `homeService`.
 *
 * @function
 * @name homeController.getList
 * @param {Object} request - The request object containing any query parameters for filtering the list.
 * @param {Object} response - The response object used to send back the list of items.
 *
 * @returns {Promise<void>} - A promise that resolves with the list of items from the home service.
 */
const homeController = controller.getList(homeService);

export default homeController;
