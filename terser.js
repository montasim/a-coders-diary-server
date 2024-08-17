/**
 * @fileoverview This script processes files by minifying JavaScript files using Terser and copying other file types.
 * It reads configurations from a build.json, respects ignore patterns, and logs the process summary while tracking file sizes.
 * This script is intended to be part of a build process, ensuring that only necessary files are included in the output directory
 * and that JavaScript files are optimized for production.
 */

import fs from 'fs/promises';
import path from 'path';
import { globSync } from 'glob';
import { minify } from 'terser';

const ROOT_DIR = '.';
const OUTPUT_DIR = path.join(ROOT_DIR, 'build');
const CONFIG_FILE = path.join(ROOT_DIR, 'terserrc.json');
const DEFAULT_IGNORE_PATTERNS = ['node_modules/**', `${OUTPUT_DIR}/**`];

/**
 * Loads the configuration from the specified JSON file.
 * @param {string} filePath - The path to the configuration file.
 * @returns {Promise<Object|null>} A promise that resolves to the configuration object or null if an error occurs.
 */
const loadConfig = async (filePath) => {
    try {
        const configData = await fs.readFile(filePath, 'utf8');

        return JSON.parse(configData);
    } catch (error) {
        console.error(
            `Failed to load configuration from ${filePath}. Please check if the file exists and is correctly formatted. Error: ${error}`
        );

        return null;
    }
};

/**
 * Ensures that the specified directory exists; creates it if it does not.
 * @param {string} directory - The directory to ensure.
 * @returns {Promise<void>} A promise that resolves when the directory is verified or created.
 */
const ensureDirectoryExists = async (directory) => {
    try {
        await fs.mkdir(directory, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') {
            console.error(
                `Failed to create directory ${directory}. Error: ${error}`
            );

            throw error;
        }
    }
};

/**
 * Retrieves the size of the specified file.
 * @param {string} filePath - The file path to check.
 * @returns {Promise<number>} A promise that resolves to the size of the file in bytes.
 */
const getFileSize = async (filePath) => {
    try {
        const stats = await fs.stat(filePath);

        return stats.size;
    } catch {
        console.error(
            `Failed to get file size for ${filePath}. File may not exist or access may be denied.`
        );

        return 0;
    }
};

/**
 * Converts a size in bytes to kilobytes, formatted as a string rounded to two decimal places.
 * @param {number} bytes - The size in bytes.
 * @returns {string} The size in kilobytes, rounded to two decimal places.
 */
const bytesToKilobytes = (bytes) => (bytes / 1024).toFixed(2);

/**
 * Minifies a JavaScript file using Terser with the provided options.
 * @param {string} file - The filename.
 * @param {string} srcPath - The source path of the file.
 * @param {string} destPath - The destination path after processing.
 * @param {Object} options - Terser configuration options.
 * @param {Object} sizeTracker - Tracker for original and minified sizes.
 * @returns {Promise<string>} A promise that resolves to 'minified' upon successful minification.
 */
const minifyJavaScript = async (
    file,
    srcPath,
    destPath,
    options,
    sizeTracker
) => {
    try {
        const fileContent = await fs.readFile(srcPath, 'utf8');
        const originalSize = await getFileSize(srcPath);
        const terserResult = await minify(fileContent, options);

        if (terserResult.error) {
            throw new Error(
                `Terser minification failed for ${file}: ${terserResult.error}`
            );
        }

        await fs.writeFile(destPath, terserResult.code, 'utf8');

        const newSize = await getFileSize(destPath);

        sizeTracker.originalTotal += originalSize;
        sizeTracker.minifiedTotal += newSize;

        return 'minified';
    } catch (error) {
        console.error(`Error during the minification of ${file}. ${error}`);

        throw error;
    }
};

/**
 * Copies a file from a source path to a destination path.
 * @param {string} srcPath - The source path of the file.
 * @param {string} destPath - The destination path after copying.
 * @returns {Promise<string>} A promise that resolves to 'copied' upon successful copying.
 */
const copyFile = async (srcPath, destPath) => {
    try {
        await fs.copyFile(srcPath, destPath);

        return 'copied';
    } catch (error) {
        console.error(
            `Failed to copy file from ${srcPath} to ${destPath}. Error: ${error}`
        );

        throw error;
    }
};

/**
 * Processes a list of files, minifying JavaScript files and copying other file types based on the configuration.
 * @param {Array<string>} files - The list of files to process.
 * @param {string} rootDir - The root directory for source files.
 * @param {string} outputDir - The output directory for processed files.
 * @param {Object} config - Configuration for processing.
 * @returns {Promise<Object>} A promise that resolves to an object containing the process statistics and size tracking.
 */
const processFiles = async (files, rootDir, outputDir, config) => {
    const stats = { minified: 0, copied: 0, failed: 0 };
    const sizeTracker = { originalTotal: 0, minifiedTotal: 0 };

    await Promise.all(
        files.map(async (file) => {
            const srcPath = path.join(rootDir, file);
            const destPath = path.join(outputDir, file);

            try {
                await ensureDirectoryExists(path.dirname(destPath));

                if (file.endsWith('.js')) {
                    await minifyJavaScript(
                        file,
                        srcPath,
                        destPath,
                        config,
                        sizeTracker
                    );
                    stats.minified++;
                } else {
                    await copyFile(srcPath, destPath);
                    stats.copied++;
                }
            } catch (error) {
                console.error(`Error processing file ${file}. ${error}`);

                stats.failed++;
            }
        })
    );

    return { stats, sizeTracker };
};

/**
 * The main function that initializes the file processing.
 */
const main = async () => {
    try {
        await ensureDirectoryExists(OUTPUT_DIR);

        const config = await loadConfig(CONFIG_FILE);

        if (!config) {
            console.error(
                'Configuration is missing or invalid. Processing cannot continue.'
            );
            return;
        }

        const ignorePatterns = config.ignore
            ? config.ignore.concat(DEFAULT_IGNORE_PATTERNS)
            : DEFAULT_IGNORE_PATTERNS;
        const allFiles = globSync('**/*', {
            ignore: ignorePatterns,
            nodir: true,
        });
        const { stats, sizeTracker } = await processFiles(
            allFiles,
            ROOT_DIR,
            OUTPUT_DIR,
            config
        );

        console.table({
            Total: allFiles.length,
            Minified: stats.minified,
            Copied: stats.copied,
            Failed: stats.failed,
            'Original Size (KB)': parseFloat(
                bytesToKilobytes(sizeTracker.originalTotal)
            ),
            'Minified Size (KB)': parseFloat(
                bytesToKilobytes(sizeTracker.minifiedTotal)
            ),
        });
    } catch (error) {
        console.error(`Failed to execute the main process. ${error}`);
    }
};

main().catch((error) =>
    console.error(`An unexpected error occurred: ${error}`)
);
