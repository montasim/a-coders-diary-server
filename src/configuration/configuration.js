'use strict';

/**
 * @fileoverview This module configures and validates environment variables for the application
 * using dotenv and Joi. It imports configurations, applies environment-specific settings,
 * and validates all environmental variables against a schema to ensure they meet the required
 * format and values before the application runs. The module helps prevent runtime errors due
 * to misconfiguration and facilitates easier management of configuration settings across
 * different deployment environments (development, testing, staging, production).
 *
 * @requires module:dotenv Used to load and parse environment variables from a .env file.
 * @requires module:joi Used for schema description and environment validation.
 * @requires module:constant/envTypes.constants Constants defining environment types.
 */

import dotenv from 'dotenv';
import Joi from 'joi';

import environment from '../constant/envTypes.constants.js';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || environment.DEVELOPMENT}`,
});

/**
 * Converts a given environment variable to an integer. If the conversion fails (i.e., the result is NaN),
 * it returns a specified default value. This function is useful for ensuring that environmental configurations
 * that are expected to be numeric are indeed treated as such, with a fallback mechanism in case of misconfiguration
 * or absence.
 *
 * @param {string} envVar - The environment variable to be parsed.
 * @param {number} defaultValue - The fallback value to use if parsing fails.
 * @returns {number} The parsed integer or the default value.
 */
const getInt = (envVar, defaultValue) => {
    const parsed = parseInt(envVar, 10);

    return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Retrieves an environment variable and provides a default value if the specified variable is undefined, null, or an
 * empty string. This function is crucial for configuration management, ensuring that no environment variable is left
 * unset, thereby avoiding potential runtime errors or misconfigurations in the application's operational environment.
 *
 * @param {string} envVar - The environment variable to retrieve.
 * @param {*} defaultValue - The default value to return if the specified environment variable is not set.
 * @returns {*} The value of the environment variable or the default value if the variable is not set.
 */
const getEnvVar = (envVar, defaultValue) => {
    if (envVar === undefined || envVar === null || envVar === '') {
        return defaultValue;
    }

    return envVar;
};

// Base MongoDB URL which might be appended with '-test' for test environment
const mongoDbUrl =
    getEnvVar(process.env.MONGODB_URL, '') +
    (process.env.NODE_ENV === environment.TEST ? '-test' : '');

/**
 * Defines a schema for validating environment variables using Joi. This schema ensures that all necessary
 * environment variables are not only present but also conform to expected formats and values. Each variable
 * is thoroughly defined with requirements such as data type, allowed values, and mandatory status. This
 * validation schema is crucial for maintaining the integrity and consistency of the application's configuration,
 * preventing runtime errors caused by misconfiguration or missing environment variables.
 *
 * The schema includes validations for various operational parameters such as the application environment, server port,
 * database URLs, authentication tokens, CORS settings, rate limiting, SMTP details for email sending, and more. It ensures
 * that all configurations are correctly set according to the operational requirements of different environments like
 * development, testing, staging, or production.
 */
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(
            environment.PRODUCTION,
            environment.STAGING,
            environment.DEVELOPMENT,
            environment.TEST
        )
        .required()
        .description('The application environment.'),
    GITHUB_REPOSITORY: Joi.string()
        .required()
        .description('GitHub repository URL.'),
    VERSION: Joi.string()
        .valid('v1', 'v2', 'v3', 'v4', 'v5')
        .required()
        .description('The API version to use.'),
    PORT: Joi.number().required().description('The server port.'),
    MONGODB_URL: Joi.string().required().description('MongoDB URL.'),
    JWT_SECRET: Joi.string().required().description('JWT secret key.'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .required()
        .description('Minutes after which access tokens expire.'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
        .required()
        .description('Days after which refresh tokens expire.'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        .required()
        .description('Minutes after which reset password token expires.'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
        .required()
        .description('Minutes after which verify email token expires.'),
    BASIC_TOKEN: Joi.string()
        .required()
        .description('Basic token for authentication.'),
    MAXIMUM_LOGIN_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of login attempts.'),
    MAXIMUM_RESET_PASSWORD_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of reset password attempts.'),
    MAXIMUM_VERIFY_EMAIL_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of verify email attempts.'),
    MAXIMUM_CHANGE_EMAIL_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of change email attempts.'),
    MAXIMUM_CHANGE_PASSWORD_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of change password attempts.'),
    MAXIMUM_ACTIVE_SESSIONS: Joi.number()
        .required()
        .description('Maximum number of active sessions.'),
    LOCK_DURATION_HOUR: Joi.number()
        .required()
        .description('Duration in hours to lock the account.'),
    TIMEOUT_IN_SECONDS: Joi.number()
        .required()
        .description('Timeout in seconds.'),
    CACHE_TTL_IN_SECONDS: Joi.number()
        .required()
        .description('Cache TTL in seconds.'),
    JSON_PAYLOAD_LIMIT: Joi.number()
        .required()
        .description('JSON payload limit in bytes.'),
    CORS_ORIGIN: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required()
        .description('CORS origin.'),
    CORS_METHODS: Joi.string().required().description('CORS methods.'),
    RATE_LIMIT_WINDOW_MS: Joi.number()
        .required()
        .description('Rate limit window in milliseconds.'),
    RATE_LIMIT_MAX: Joi.number()
        .required()
        .description('Maximum number of requests per rate limit window.'),
    SMTP_HOST: Joi.string()
        .required()
        .description('Server that will send the emails.'),
    SMTP_PORT: Joi.number()
        .required()
        .description('Port to connect to the email server.'),
    SMTP_USERNAME: Joi.string()
        .required()
        .description('Username for email server.'),
    SMTP_PASSWORD: Joi.string()
        .required()
        .description('Password for email server.'),
    SMTP_MAX_CONNECTION_RETRY_ATTEMPTS: Joi.number()
        .required()
        .description('Maximum number of connection retry attempts.'),
    EMAIL_FROM: Joi.string()
        .required()
        .description('The "from" field in the emails sent by the app.'),
    ADMIN_EMAIL: Joi.string().email().required().description('Admin email.'),
    ADMIN_PASSWORD: Joi.string().required().description('Admin password.'),
    GOOGLE_DRIVE_SCOPE: Joi.string()
        .required()
        .description('Scope for Google Drive API.'),
    GOOGLE_DRIVE_CLIENT_EMAIL: Joi.string()
        .required()
        .description('Client email for Google Drive API.'),
    GOOGLE_DRIVE_PRIVATE_KEY: Joi.string()
        .required()
        .description('Private key for Google Drive API.'),
    GOOGLE_DRIVE_FOLDER_KEY: Joi.string()
        .required()
        .description('Folder key for Google Drive API.'),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env, {
    abortEarly: false,
});

if (error) {
    throw new Error(
        `Config validation error: ${error.details.map((x) => x.message).join(', ')}`
    );
}

/**
 * Loads environment configurations based on the current NODE_ENV setting, validates all required
 * environment variables using a Joi schema, and constructs a comprehensive configuration object
 * for the application. This object includes settings for the server, database, authentication,
 * email, security, and more. The module ensures that all configurations are valid, current, and
 * appropriately set for the running environment, contributing to the robustness and security
 * of the application.
 *
 * @module configuration
 * @function
 * @description Configures and validates all necessary environment variables and settings for the application.
 */
const configuration = {
    env: getEnvVar(envVars.NODE_ENV, environment.DEVELOPMENT),
    github: {
        repository: getEnvVar(envVars.GITHUB_REPOSITORY, ''),
    },
    version: getEnvVar(envVars.VERSION, 'v1'),
    port: getInt(getEnvVar(envVars.PORT, 3000), 3000),
    mongoose: {
        url: mongoDbUrl,
    },
    jwt: {
        secret: getEnvVar(envVars.JWT_SECRET, 'defaultSecret'),
        accessExpirationMinutes: getInt(
            envVars.JWT_ACCESS_EXPIRATION_MINUTES,
            30
        ),
        refreshExpirationDays: getInt(envVars.JWT_REFRESH_EXPIRATION_DAYS, 30),
        resetPasswordExpirationMinutes: getInt(
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
            10
        ),
        verifyEmailExpirationMinutes: getInt(
            envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
            10
        ),
    },
    auth: {
        basicToken: getEnvVar(envVars.BASIC_TOKEN, 'defaultBasicToken'),
        loginAttempts: getInt(envVars.MAXIMUM_LOGIN_ATTEMPTS, 5),
        resetPasswordAttempts: getInt(
            envVars.MAXIMUM_RESET_PASSWORD_ATTEMPTS,
            5
        ),
        verifyEmailAttempts: getInt(envVars.MAXIMUM_VERIFY_EMAIL_ATTEMPTS, 5),
        changeEmailAttempts: getInt(envVars.MAXIMUM_CHANGE_EMAIL_ATTEMPTS, 5),
        changePasswordAttempts: getInt(
            envVars.MAXIMUM_CHANGE_PASSWORD_ATTEMPTS,
            5
        ),
        activeSessions: getInt(envVars.MAXIMUM_ACTIVE_SESSIONS, 3),
        lockDuration: getInt(envVars.LOCK_DURATION_HOUR, 1),
    },
    timeout: getInt(envVars.TIMEOUT_IN_SECONDS, 30),
    cache: {
        timeout: getInt(envVars.CACHE_TTL_IN_SECONDS, 60),
    },
    jsonPayloadLimit: getInt(envVars.JSON_PAYLOAD_LIMIT, 1000000),
    cors: {
        origin: getEnvVar(envVars.CORS_ORIGIN, '')
            .split(',')
            .map((origin) => origin.trim()),
        methods: getEnvVar(envVars.CORS_METHODS, '')
            .split(',')
            .map((method) => method.trim()),
    },
    rateLimit: {
        windowMs: getInt(envVars.RATE_LIMIT_WINDOW_MS, 60000),
        max: getInt(envVars.RATE_LIMIT_MAX, 100),
    },
    email: {
        smtp: {
            host: getEnvVar(envVars.SMTP_HOST, 'localhost'),
            port: getInt(envVars.SMTP_PORT, 587),
            auth: {
                user: getEnvVar(envVars.SMTP_USERNAME, ''),
                pass: getEnvVar(envVars.SMTP_PASSWORD, ''),
            },
            maxConnectionAttempts: getInt(
                envVars.SMTP_MAX_CONNECTION_RETRY_ATTEMPTS,
                587
            ),
        },
        from: getEnvVar(envVars.EMAIL_FROM, 'no-reply@example.com'),
    },
    admin: {
        email: getEnvVar(envVars.ADMIN_EMAIL, 'admin@example.com'),
        password: getEnvVar(envVars.ADMIN_PASSWORD, ''),
    },
    googleDrive: {
        scope: getEnvVar(envVars.GOOGLE_DRIVE_SCOPE, ''),
        client: getEnvVar(envVars.GOOGLE_DRIVE_CLIENT_EMAIL, ''),
        privateKey: getEnvVar(envVars.GOOGLE_DRIVE_PRIVATE_KEY, ''),
        folderKey: getEnvVar(envVars.GOOGLE_DRIVE_FOLDER_KEY, ''),
    },
};

export default configuration;
