'use strict';

/**
 * @fileoverview This module defines constants for different access types within the application.
 * It provides a standardized way to reference user roles and permissions across the codebase,
 * facilitating easier management and verification of access controls. The constants defined here
 * include 'ADMIN' for administrative access, 'USER' for regular user access, and 'BOTH' for cases
 * where functionalities are shared between admins and users. Utilizing these constants helps
 * prevent errors and inconsistencies in role-based logic throughout the application.
 */

/**
 * Exports constants for various access types to be used throughout the application to manage
 * and check user permissions and roles. This approach centralizes role definitions and makes
 * the code more maintainable and less error-prone by avoiding hard-coded strings for user roles.
 *
 * @module accessTypesConstants
 * @property {string} ADMIN - Represents administrative access rights.
 * @property {string} USER - Represents standard user access rights.
 * @property {string} BOTH - Represents shared access rights for both users and admins.
 * @description Provides a central definition of user access types to streamline role management and access checks.
 */
const accessTypesConstants = {
    ADMIN: 'admin',
    USER: 'user',
    BOTH: 'both',
};

export default accessTypesConstants;
