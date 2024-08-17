'use strict';

/**
 * @fileoverview This module sets up a comprehensive logging service using the Winston library.
 * It includes console logging, file logging with daily rotation, and MongoDB logging, making it suitable for various environments,
 * especially development and production. The logging levels and formats are configured to capture detailed logs and store them
 * efficiently based on the environment.
 *
 * The primary functionalities include:
 * - Console logging for development with colored output.
 * - File logging with daily rotation, categorized by log levels such as debug, info, warn, error, and fatal.
 * - MongoDB logging to store logs in a capped collection, useful for long-term log storage and querying.
 *
 * The logger is configured to adjust its transports based on whether the environment is production or not, enabling detailed
 * logging during development and more streamlined logging in production.
 */

import mongoose from 'mongoose';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { MongoDB } from 'winston-mongodb';

import configuration from '../configuration/configuration.js';
import environment from '../constant/envTypes.constants.js';

// Check if the environment is production
const isProduction = configuration.env === environment.PRODUCTION;

/**
 * Creates and configures a Winston logger instance for the application.
 *
 * This logger service captures logs at the 'debug' level and above, formatting them with timestamps and custom messages.
 * It supports multiple transports including:
 * - Console transport for colored and formatted log output on the console, primarily used during development.
 * - MongoDB transport for storing logs in a MongoDB collection, useful for long-term storage and analysis.
 * - Daily rotating file transports for saving logs to files, categorized by log levels such as debug, info, warn, error, and fatal.
 *   These logs are rotated daily, zipped for compression, and limited to a maximum size and number of files to manage disk usage.
 *
 * The logger adjusts its configuration based on the environment (development or production), enabling more detailed logging
 * during development and more streamlined logging in production.
 *
 * @constant {Object} loggerService - The configured Winston logger instance.
 * @example
 * import loggerService from './services/loggerService.js';
 *
 * loggerService.info('This is an informational message');
 * loggerService.error('This is an error message');
 */
const loggerService = winston.createLogger({
    level: 'debug', // This will capture all logs at level 'debug' and above
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        // Console transport for output on the console
        new winston.transports.Console({
            level: 'debug', // Consider setting this to 'info' in production if 'debug' is too verbose
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
        }),
        // MongoDB transport for saving logs to the database
        new MongoDB({
            level: 'info',
            db: mongoose.connection, // Use the existing mongoose connection
            collection: 'log',
            storeHost: true,
            capped: true,
            cappedMax: 10000,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
        // Conditionally add file transports based on the environment
        ...(!isProduction
            ? [
                  new DailyRotateFile({
                      level: 'debug',
                      filename: 'logs/debug-%DATE%.log',
                      datePattern: 'YYYY-MM-DD',
                      zippedArchive: true,
                      maxSize: '20m',
                      maxFiles: '14d',
                  }),
                  new DailyRotateFile({
                      level: 'info',
                      filename: 'logs/info-%DATE%.log',
                      datePattern: 'YYYY-MM-DD',
                      zippedArchive: true,
                      maxSize: '20m',
                      maxFiles: '14d',
                  }),
                  new DailyRotateFile({
                      level: 'warn',
                      filename: 'logs/warn-%DATE%.log',
                      datePattern: 'YYYY-MM-DD',
                      zippedArchive: true,
                      maxSize: '20m',
                      maxFiles: '14d',
                  }),
                  new DailyRotateFile({
                      level: 'error',
                      filename: 'logs/error-%DATE%.log',
                      datePattern: 'YYYY-MM-DD',
                      zippedArchive: true,
                      maxSize: '20m',
                      maxFiles: '14d',
                  }),
                  new DailyRotateFile({
                      level: 'fatal',
                      filename: 'logs/fatal-%DATE%.log',
                      datePattern: 'YYYY-MM-DD',
                      zippedArchive: true,
                      maxSize: '20m',
                      maxFiles: '14d',
                  }),
              ]
            : []),
    ],
});

export default loggerService;
