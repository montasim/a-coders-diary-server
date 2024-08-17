'use strict';

/**
 * @fileoverview This module defines a collection of constants used throughout the application.
 * It centralizes various settings and predefined values, such as maximum and minimum lengths for user inputs
 * (like usernames and passwords), URLs for social media profiles, confirmation texts for critical actions,
 * and default names for roles. By centralizing these constants, the application ensures consistency and
 * reduces the likelihood of errors associated with the duplication of literal values. This approach also
 * simplifies the process of updating values as changes can be made in one place and reflected throughout
 * the application.
 *
 * The constants are organized into different categories:
 * - `lengths`: Defines the minimum and maximum allowable lengths for various user inputs.
 * - `urls`: Provides a central reference for URLs, particularly social media links.
 * - `confirmationText`: Stores specific text for confirmatory actions to prevent accidental submissions.
 * - `defaultName`: Contains default names for certain roles or identifiers in the application.
 */

const lengths = {
    WEBSITE_URL_MAX: 50,

    USERNAME_MIN: 3,
    USERNAME_MAX: 10,

    EMAIL_MIN: 5,
    EMAIL_MAX: 100,

    MOBILE_MIN: 11,
    MOBILE_MAX: 14,

    PASSWORD_MIN: 8,
    PASSWORD_MAX: 30,

    EXTERNAL_AUTH_ID_MAX: 100,

    IMAGE: {
        FILE_ID_MAX: 100,
        SHAREABLE_LINK: 500,
        DOWNLOAD_LINK: 500,
    },
};

const urls = {
    FACEBOOK: 'https://www.facebook.com',
    TWITTER: 'https://twitter.com',
    LINKEDIN: 'https://linkedin.com',
    GITHUB: 'https://github.com',
};

const confirmationText = {
    deleteUserAccount: 'Delete my account',
};

const defaultName = {
    adminRole: 'Admin',
};

/**
 * Provides a structured and centralized collection of various constants needed for input validation,
 * configuration of external links, and other hardcoded values that are used across the application.
 * This method of organization helps in maintaining a clean and manageable codebase, promoting reuse,
 * and minimizing hard-coded values scattered throughout the code.
 *
 * @module constants
 * @property {Object} lengths - Contains definitions for input lengths.
 * @property {Object} urls - Centralized social media and other relevant URLs.
 * @property {Object} confirmationText - Texts used for user confirmations to avoid accidental actions.
 * @property {Object} defaultName - Default names for roles or identifiers within the application.
 * @description Centralizes important constants for easy maintenance and consistency across the application.
 */
const constants = {
    lengths,
    urls,
    confirmationText,
    defaultName,
};

export default constants;
