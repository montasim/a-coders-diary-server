'use strict';

/**
 * @fileoverview This file defines and exports constants used for logging admin activities.
 * It includes various action types that represent different activities performed by admin users.
 */

/**
 * actionTypes - An object that defines various action types for logging admin activities.
 *
 * @property {string} CREATE - Represents the create action.
 * @property {string} UPDATE - Represents the update action.
 * @property {string} DELETE - Represents the delete action.
 * @property {string} FETCH - Represents the fetch action.
 * @property {string} LOGIN - Represents the login action.
 * @property {string} ERROR - Represents the error action.
 */
const actionTypes = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    FETCH: 'fetch',
    LOGIN: 'login',
    ERROR: 'error',
};

/**
 * adminActivityLoggerConstants - An object that holds constants for logging admin activities.
 * These constants include action types that represent various activities performed by admin users.
 *
 * @typedef {Object} AdminActivityLoggerConstants
 * @property {Object} actionTypes - An object containing action types for admin activities.
 */
const adminActivityLoggerConstants = {
    actionTypes,
};

export default adminActivityLoggerConstants;
