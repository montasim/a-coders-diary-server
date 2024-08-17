'use strict';

/**
 * @fileoverview This file exports a function `validateFile` which validates a file based on its
 * type, size, and optional extensions. It ensures that the file meets the specified criteria
 * for type, size, and extension before it can be accepted for further processing.
 */

/**
 * validateFile - A function that validates a file based on its type, size, and optional extensions.
 * It checks if the file's MIME type is in the list of allowed types, if its size does not exceed
 * the maximum allowed size, and if its extension is in the list of allowed extensions (if specified).
 * The function returns an object containing a boolean `isValid` status and a validation message.
 *
 * @function
 * @param {Object} file - The file object to validate.
 * @param {number} maxSize - Maximum file size in bytes.
 * @param {Array<string>} allowedTypes - Array of allowed MIME types.
 * @param {Array<string>} [allowedExtensions] - Optional array of allowed file extensions.
 * @returns {Object} - An object with a boolean `isValid` status and a validation message.
 */
const validateFile = (file, maxSize, allowedTypes, allowedExtensions = []) => {
    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
        return {
            isValid: false,
            message: `Invalid file type. Allowed types are: ${allowedTypes.join(', ')}.`,
        };
    }

    // Check file size
    if (file.size > maxSize) {
        return {
            isValid: false,
            message: `File size should not exceed ${maxSize / 1024 / 1024}MB.`,
        };
    }

    // Check file extension if extensions are specified
    if (allowedExtensions.length > 0) {
        const extension = file.originalname.split('.').pop();
        if (!allowedExtensions.includes(extension.toLowerCase())) {
            return {
                isValid: false,
                message: `Invalid file extension. Allowed extensions are: ${allowedExtensions.join(', ')}.`,
            };
        }
    }

    return {
        isValid: true,
        message: 'File is valid.',
    };
};

export default validateFile;
