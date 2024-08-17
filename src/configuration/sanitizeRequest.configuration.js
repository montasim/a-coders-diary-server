'use strict';

/**
 * @fileoverview This module configures and implements a sanitization middleware using DOMPurify with a JSDOM window object.
 * It is designed to cleanse incoming request data (body, query parameters, and URL parameters) in an Express application
 * to prevent Cross-Site Scripting (XSS) attacks and other input-related vulnerabilities. The middleware integrates a
 * recursive sanitization function that cleans all string fields within objects, including nested objects, using DOMPurify,
 * which removes potentially malicious code from the input. This helps in securing the application by ensuring that all
 * incoming data is sanitized before any processing or storage operations.
 *
 * @requires module:dompurify Sanitizes HTML and prevents XSS attacks.
 * @requires module:jsdom Provides a DOM implementation on Node.js that DOMPurify can use to sanitize content.
 * @requires module:service/logger.service Custom logging service to handle errors and information logging.
 */

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import loggerService from '../service/logger.service.js';

// Create a JSDOM window object to use with DOMPurify
const { window } = new JSDOM('');
const dompurify = DOMPurify(window);

/**
 * Recursively sanitizes all string values within an object to prevent Cross-Site Scripting (XSS) attacks.
 * This function utilizes DOMPurify, configured with a JSDOM window object, to cleanse any potentially malicious
 * content from strings. The sanitization process also handles nested objects and arrays by using a recursive
 * approach and a WeakSet to avoid issues with circular references. This ensures that every string, no matter
 * how deeply nested within the object, is sanitized effectively. The function is crucial for maintaining the
 * integrity and security of data before it is processed or stored by the application.
 *
 * @param {Object} obj - The object containing potentially unsafe strings to be sanitized.
 * @description Cleanses all strings within an object of harmful or malicious code using DOMPurify.
 */
const sanitize = (obj) => {
    const seen = new WeakSet(); // Avoid circular reference issues

    // Recursively sanitize objects and arrays
    const recurSanitize = (object) => {
        if (seen.has(object)) {
            return;
        }
        seen.add(object);

        Object.keys(object).forEach((key) => {
            const value = object[key];
            if (typeof value === 'string') {
                object[key] = dompurify.sanitize(value);
            } else if (value && typeof value === 'object') {
                // Check for non-null objects
                recurSanitize(value);
            }
        });
    };

    recurSanitize(obj);
};

/**
 * Provides middleware to sanitize all incoming request data using DOMPurify, configured to run with a JSDOM window.
 * This setup ensures comprehensive sanitization of user inputs across body, query, and URL parameters, safeguarding
 * the application against XSS and other input-based security threats. The middleware handles sanitization recursively
 * to cater to complex data structures and logs any errors encountered during the process to aid in monitoring and
 * troubleshooting potential sanitization issues.
 *
 * @module sanitizeRequestConfiguration
 * @function
 * @description Sets up middleware to sanitize request data in an Express application, enhancing security by preventing XSS.
 */
const sanitizeRequestConfiguration = (req, res, next) => {
    try {
        ['body', 'query', 'params'].forEach((part) => {
            if (req[part] && typeof req[part] === 'object') {
                sanitize(req[part]);
            }
        });
    } catch (error) {
        loggerService.error('Sanitization error:', error);

        return res.status(500).json({
            success: false,
            message: 'Error processing requestBooks, please try again later.',
        });
    }

    next();
};

export default sanitizeRequestConfiguration;
