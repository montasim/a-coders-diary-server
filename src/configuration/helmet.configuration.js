'use strict';

/**
 * @fileoverview This module configures the Helmet middleware settings for the application's Express server.
 * Helmet helps secure Express apps by setting various HTTP headers to prevent common web vulnerabilities.
 * This configuration specifically sets policies for the Content Security Policy (CSP) and Referrer Policy,
 * which are vital for enhancing the security of web applications by controlling resources the browser is allowed
 * to load and managing referrer information sent with requests.
 *
 * The Content Security Policy in this configuration restricts the sources from which various types of content
 * can be loaded, including scripts, images, and styles, essentially preventing cross-site scripting (XSS) and
 * data injection attacks. The Referrer Policy setting controls the amount of referrer information that is included
 * with requests made from the application to other websites, enhancing privacy and data security.
 */

/**
 * Configures security policies for the application using Helmet, a middleware for Express servers that sets
 * HTTP headers returned by your Express apps to protect against common web vulnerabilities. This configuration
 * details specific directives for content security and referrer policies, providing robust defense mechanisms
 * against various web security threats.
 *
 * @module helmetConfiguration
 * @property {Object} contentSecurityPolicy - Defines the sources of trusted content for the application.
 * @property {Object} referrerPolicy - Specifies how much referrer information should be included with requests.
 * @description Provides a set of security configurations to enhance the application's defense against common web vulnerabilities.
 */
const helmetConfiguration = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Only allow content from the current domain
            scriptSrc: ["'self'"], // Only allow scripts from the current domain
            objectSrc: ["'none'"], // Disallow plugins (Flash, Silverlight, etc.)
            imgSrc: ["'self'"], // Only allow images from the current domain
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles and CSS from self
            upgradeInsecureRequests: [], // Upgrade all HTTP requests to HTTPS
        },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Only send the origin of the document as the referrer in all other cases
};

export default helmetConfiguration;
