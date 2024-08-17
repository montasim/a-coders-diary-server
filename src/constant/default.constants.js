'use strict';

/**
 * @fileoverview This module defines and exports default constants used throughout the application, specifically
 * for default image URLs. It provides organized and easy-to-reference image links for various user profiles based
 * on gender. Centralizing these image URLs in a single module helps maintain consistency in default images used across
 * different parts of the application and simplifies updates or changes to these resources.
 *
 * By storing these URLs in a constants file, the application can easily manage default images without hardcoding URLs
 * multiple times throughout the codebase, thereby reducing redundancy and potential errors. This method also ensures
 * that any changes to the image sources need only be updated in one location.
 */

const images = {
    user: {
        male: 'https://drive.google.com/uc?export=view&id=1YvPc76F0FoDvJSws6rdGPxBnYvd3icHZ',
        female: 'https://drive.google.com/uc?export=view&id=1yJN6Im5E2aAF9hFIzn38DFvfbreFng4f',
    },
};

/**
 * Contains and exports default constants, particularly URLs for user profile images. This module is designed to
 * streamline the management of default resources like images, making them easily accessible and modifiable from a
 * single point in the application.
 *
 * @module defaultConstants
 * @property {Object} images - Contains default image URLs categorized by user gender.
 * @description Organizes and provides access to default image constants used across the application.
 */
const defaultConstants = {
    images,
};

export default defaultConstants;
