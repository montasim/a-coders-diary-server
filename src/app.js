'use strict';

/**
 * @fileoverview This file sets up the main Express application with various middleware for security,
 * logging, body parsing, data sanitization, routing, and error handling. It imports configurations
 * for Helmet, CORS, compression, request sanitization, HPP, and Morgan, and applies these
 * configurations to the Express app. The app also includes the main routes and error handling middleware.
 */

/**
 * The main Express application setup. This function configures the Express app with various middleware
 * and settings, including:
 *
 * - Security middleware: Helmet for HTTP headers security, CORS for cross-origin resource sharing,
 *   and HPP for HTTP parameter pollution protection.
 * - Compression middleware: Configured to compress HTTP responses.
 * - Logging middleware: Morgan for HTTP request logging.
 * - Body parsing middleware: Configured to parse JSON and URL-encoded bodies with a unified size limit.
 * - Request sanitization middleware: Configured to sanitize incoming request data.
 * - Routing: Includes the main application routes.
 * - Error handling middleware: Configured to handle errors globally.
 *
 * @returns {Object} - The configured Express application instance.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import helmetConfiguration from './configuration/helmet.configuration.js';
import corsConfiguration from './configuration/cors.configuration.js';
import compressionConfiguration from './configuration/compression.configuration.js';
import sanitizeRequestConfiguration from './configuration/sanitizeRequest.configuration.js';

import appRoutes from './routes.js';
import errorHandlingService from './service/errorHandling.service.js';
import hppConfiguration from './configuration/hpp.configuration.js';
import morganConfiguration from './configuration/morgan.configuration.js';

const app = express();

// Security middleware
app.use(helmet(helmetConfiguration));
app.use(cors(corsConfiguration));
app.use(hppConfiguration());
app.use(compressionConfiguration);

// Morgan HTTP requestBooks loggerService setup
app.use(morganConfiguration);

// Body parsing middleware
app.use(express.json({ limit: '20mb' })); // unified the limit for JSON
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Sanitize requestBooks data
app.use(sanitizeRequestConfiguration);

// Routes
app.use('/', appRoutes);

// Error handling middleware
app.use(errorHandlingService);

export default app;
