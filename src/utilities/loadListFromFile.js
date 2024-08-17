'use strict';

/**
 * @fileoverview This file exports an asynchronous function `loadListFromFile` which loads
 * a list from a specified text file and returns it as a Set. The function handles the
 * loading of various types of lists such as blocked email domains, common passwords,
 * or temporary email domains from specified files. It ensures robust error handling
 * and logs errors using a logger service.
 */

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import loggerService from '../service/logger.service.js';

// Derive the __dirname equivalent for ES6 modules using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * loadListFromFile - An asynchronous function that loads a list from a specified text file
 * and returns it as a Set. It reads the file content, splits it into lines, trims each line,
 * converts them to lowercase, and stores them in a Set to ensure uniqueness. In case of an error
 * during the file reading process, it logs the error and returns an empty Set to allow continued operation.
 *
 * @function
 * @async
 * @param {string} filePathRelative - The relative path to the text file.
 * @returns {Promise<Set<string>>} - A promise that resolves to a Set containing the items from the file.
 */
const loadListFromFile = async (filePathRelative) => {
    const filePath = join(__dirname, filePathRelative);

    try {
        const data = await fs.readFile(filePath, { encoding: 'utf-8' });
        const lines = data.split('\n').map((line) => line.trim().toLowerCase());

        return new Set(lines);
    } catch (error) {
        loggerService.error(`Error loading list from file ${filePath}:`, error);

        return new Set(); // Return an empty set on error to allow continued operation
    }
};

export default loadListFromFile;
