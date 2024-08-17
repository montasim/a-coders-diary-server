'use strict';

/**
 * @fileoverview This module defines and exports constants for different environment types used within the application.
 * These environment constants are essential for configuring the application differently based on the current runtime
 * environment such as development, staging, user acceptance testing (UAT), test, and production. Using these constants
 * helps in applying specific settings, features, or behaviors that are appropriate for each environment, ensuring that
 * operations such as testing, development, and deployment are handled correctly.
 *
 * By centralizing these environment identifiers, the module aids in maintaining clear and consistent environment
 * management throughout the application's configuration and operational logic. This approach prevents errors related to
 * environment misconfigurations and facilitates easier updates and checks against the current environment.
 */

/**
 * Exports a set of predefined constants representing various operational environments of the application. This categorization
 * supports differentiated application behavior and configuration settings, such as connecting to different databases or
 * enabling/disabling certain features depending on the environment. Using these constants across the application ensures
 * that environment-specific logic is consistently and correctly applied.
 *
 * @module environment
 * @property {string} DEVELOPMENT - Represents the development environment.
 * @property {string} STAGING - Represents the staging environment used for pre-production testing.
 * @property {string} UAT - Represents the user acceptance testing environment.
 * @property {string} TEST - Represents the test environment used primarily for automated tests.
 * @property {string} PRODUCTION - Represents the production environment where the application is deployed to end-users.
 * @description Centralizes environment type definitions to manage configuration and behavior across different stages of the application lifecycle.
 */
const environment = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    UAT: 'uat',
    TEST: 'test',
    PRODUCTION: 'production',
};

export default environment;
