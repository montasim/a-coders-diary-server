'use strict';

/**
 * @fileoverview This file exports an asynchronous function `getRequestedDeviceDetails`
 * which extracts detailed information about the device making the request. It uses the
 * `express-useragent` library to parse the user-agent string and the `request-ip` library
 * to get the client's IP address. The function also determines the preferred language
 * and the type of device (Desktop, Tablet, Mobile).
 */

import expressUseragent from 'express-useragent';
import requestIp from 'request-ip';

/**
 * getRequestedDeviceDetails - An asynchronous function that extracts detailed information
 * about the requesting device from the Express request object. It retrieves the operating
 * system, browser, browser version, device type, client IP address, and preferred language.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the following
 * device details: operating system, browser, browser version, IP address, preferred language,
 * and device type.
 */
const getRequestedDeviceDetails = async (req) => {
    const { headers } = req;
    const userAgentString = headers['user-agent'];
    const userAgent = expressUseragent.parse(userAgentString);

    // Extract device information using destructuring and default values
    const {
        os = 'Unknown',
        browser = 'Unknown',
        version = 'Unknown',
        isDesktop,
        isTablet,
        isMobile,
    } = userAgent;

    // Get client IP address
    const ip = requestIp.getClientIp(req) || 'Unknown';

    // Get preferred language
    const language = headers['accept-language']?.split(',')[0] || 'Unknown';

    // Determine device type
    const device = isDesktop
        ? 'Desktop'
        : isTablet
          ? 'Tablet'
          : isMobile
            ? 'Mobile'
            : 'Unknown';

    return {
        os,
        browser,
        version,
        ip,
        language,
        device,
    };
};

export default getRequestedDeviceDetails;
